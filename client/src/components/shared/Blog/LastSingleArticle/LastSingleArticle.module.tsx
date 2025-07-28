import { Link } from "react-router-dom";

import styles from "./LastSingleArticle.module.css";

interface LastSingleArticleProps {
  id: string;
  title: string;
  shortContent: string;
  image: string;
}

function LastSingleArticle({
  id,
  title,
  shortContent,
  image,
}: LastSingleArticleProps) {
  return (
    <div className={styles["last-three-articles-current-article-wrapper"]}>
      <img
        className={`${styles["last-three-articles-current-article-image"]} img img-shadow`}
        src={image}
        alt={title}
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
    </div>
  );
}

export default LastSingleArticle;
