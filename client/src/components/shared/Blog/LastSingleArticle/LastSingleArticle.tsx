import { Link } from "react-router-dom";
import styles from "./LastSingleArticle.module.css";
import type { ArticleProps } from "../../../../interfaces/props/articles/ArticleProps";

// todo ad lazy to the images
const LastSingleArticle = ({
  id,
  title,
  shortContent,
  image,
}: ArticleProps) => {
  return (
    <article className={styles["last-three-articles-current-article-wrapper"]}>
      <img
        className={`${styles["last-three-articles-current-article-image"]} img img-shadow`}
        src={image}
        alt={title}
        loading="lazy"
      />
      <h5 className={styles["last-three-articles-current-article-title"]}>
        {title}
      </h5>
      <p
        className={styles["last-three-articles-current-article-short-content"]}
      >
        {shortContent}
      </p>
      <Link className="btn" to={`/blog/${id}`}>
        Read more
      </Link>
    </article>
  );
};

export default LastSingleArticle;
