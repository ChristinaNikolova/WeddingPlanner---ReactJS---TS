import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import Jumbotron from "../../shared/Jumbotron/Jumbotron";
import LastThreeArticles from "../../shared/Blog/LastThreeArticles/LastThreeArticles";
import type { ArticleDetailsProps } from "../../../interfaces/props/articles/ArticleDetailsProps";
import { useAuth } from "../../../hooks/useAuth";
import * as articlesService from "../../../services/articles";
import { scrollToTop } from "../../../utils/helpers/form";
import styles from "./ArticleDetails.module.css";

const ArticleDetails = () => {
  const { userId, isAdmin } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const location = useLocation();
  const { state } = location;
  const page = state?.page ? state.page : "1";
  const category = state?.category
    ? state.category
    : { id: "default", name: "all" };

  const [article, setArticle] = useState<ArticleDetailsProps | undefined>(
    undefined
  );
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [hasToScroll, setHasToScroll] = useState<boolean>(true);

  useEffect(() => {
    articlesService
      .getById(id!)
      .then((res) => {
        setArticle(res);
        setIsLiked(setIsLikedHelper(res.likes));

        if (hasToScroll) {
          scrollToTop();
          setHasToScroll(false);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const onDeleteHandler = (): void => {
    articlesService
      .deleteById(id!)
      .then(() => {
        navigate("/blog?page=1&category=all");
      })
      .catch((err) => console.error(err));
  };

  const like = (): void => {
    articlesService
      .like(id!)
      .then((res) => {
        setIsLiked(setIsLikedHelper(res.likes));
        setHasToScroll(false);
        setArticle((prev) =>
          prev
            ? { ...prev, likes: res.likes, likesCount: res.likes.length }
            : prev
        );
      })
      .catch((err) => console.error(err));
  };

  const setIsLikedHelper = (likes: string[]): boolean => {
    return likes.includes(userId);
  };

  if (!article) {
    return;
  }

  return (
    <section className={styles["article-details"]}>
      <Jumbotron pathToImage={article.jumboImage} isHomePage={false} />
      <h1 className={styles["article-details-title"]}>{article.title}</h1>
      <div className={styles["article-details-btn-wrapper"]}>
        <Link
          to={`/blog?page=${page}&category=${category.name}`}
          state={{ category: category }}
          className="btn"
        >
          Back
        </Link>
      </div>
      <div className={styles["article-details-main-content-wrapper"]}>
        <div className={styles["article-details-list-image"]}>
          <img
            className={`${styles["article-details-image"]} img img-shadow`}
            src={article.image}
            alt={article.title}
            loading="lazy"
          />
          <ul className={styles["article-details-ul"]}>
            <li className={styles["article-details-li"]}>
              <span className={styles["article-details-li-span"]}>
                {" "}
                Category:
              </span>
              <img
                className="img"
                src={article.category?.image}
                alt={article.category?.name}
                loading="lazy"
              />
              {article.category?.name}
            </li>
            <li className={styles["article-details-li"]}>
              <span className={styles["article-details-li-span"]}>Date:</span>
              {article.createdAt}
            </li>
            <li className={styles["article-details-li"]}>
              <span className={styles["article-details-li-span"]}>Likes:</span>
              {article.likesCount}
              {isLiked ? (
                <i onClick={like} className="fa-solid fa-heart"></i>
              ) : (
                <i onClick={like} className="fa-regular fa-heart"></i>
              )}
            </li>
            {isAdmin && (
              <li className={styles["article-details-li"]}>
                <Link to={`/administration/articles/edit/${id}`}>
                  <i className="fa-solid fa-pen"></i>
                </Link>
                <i onClick={onDeleteHandler} className="fa-solid fa-trash"></i>
              </li>
            )}
          </ul>
        </div>
        <div className={styles["article-details-content"]}>
          <p className={styles["article-details-bold-content"]}>
            {article.shortContent}
          </p>
          {article.content?.map((el, i) => (
            <p key={i} className={styles["article-details-content-text"]}>
              {el}
            </p>
          ))}
        </div>
      </div>
      <div className={styles["article-details-btn-wrapper"]}>
        <Link
          to={`/blog?page=${page}&category=${category.name}`}
          state={{ category: category }}
          className="btn"
        >
          Back
        </Link>
      </div>
      <LastThreeArticles />
    </section>
  );
};

export default ArticleDetails;
