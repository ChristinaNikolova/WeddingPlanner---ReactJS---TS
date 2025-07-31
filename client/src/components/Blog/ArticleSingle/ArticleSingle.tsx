import { Link } from "react-router-dom";
import type { ArticleSingleProps } from "../../../interfaces/props/articles/ArticleSingleProps";
import styles from "./ArticleSingle.module.css";

const ArticleSingle = ({
  id,
  className,
  title,
  image,
  shortContent,
  createdAt,
  categoryName,
  currentPage,
  selectedCategory,
}: ArticleSingleProps) => {
  return (
    <article
      className={styles["article-single"]}
      style={{ flexDirection: className === "left" ? "row-reverse" : "row" }}
    >
      <div className={styles["article-single-content-wrapper"]}>
        <h5 className={styles["article-single-title"]}>{title}</h5>
        <p className={styles["article-single-date"]}>{createdAt}</p>
        <h6 className={styles["article-single-category"]}>{categoryName}</h6>
        <p className={styles["article-single-short-content"]}>{shortContent}</p>
        <Link
          className="btn"
          to={`/blog/${id}`}
          state={{ page: currentPage, category: selectedCategory }}
        >
          Read more
        </Link>
      </div>
      <img
        className={`${styles["article-single-image"]} img img-shadow`}
        src={image}
        alt={title}
      />
    </article>
  );
};

export default ArticleSingle;
