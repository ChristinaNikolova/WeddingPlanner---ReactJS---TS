import { useState, useEffect } from "react";
import LastSingleArticle from "../LastSingleArticle/LastSingleArticle";
import type { ArticleProps } from "../../../../interfaces/props/articles/ArticleProps";
import * as articlesService from "../../../../services/articles";
import styles from "./LastThreeArticles.module.css";

const LastThreeArticles = () => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);

  useEffect(() => {
    articlesService
      .getLastThree()
      .then((res) => setArticles(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className={styles["last-three-articles-section-wrapper"]}>
      <h3 className={styles["last-three-artilces-title"]}>Recent articles</h3>
      <div className={styles["last-three-articles-wrapper"]}>
        {articles.map((article) => (
          <LastSingleArticle
            key={article.id}
            id={article.id}
            title={article.title}
            shortContent={article.shortContent}
            image={article.image}
          />
        ))}
      </div>
    </section>
  );
};

export default LastThreeArticles;
