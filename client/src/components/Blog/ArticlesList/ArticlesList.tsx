import ArticleSingle from "../ArticleSingle/ArticleSingle";
import type { ArticlesListProps } from "../../../interfaces/props/articles/ArticleListProps";
import styles from "./ArticlesList.module.css";

const ArticlesList = ({
  articles,
  currentPage,
  selectedCategory,
}: ArticlesListProps) => {
  return (
    <>
      {articles?.length ? (
        <div className={styles["articles-list-blog"]}>
          {articles.map((a, i) => (
            <ArticleSingle
              key={a.id}
              id={a.id}
              className={i % 2 === 0 ? "left" : "right"}
              title={a.title}
              image={a.image}
              shortContent={a.shortContent}
              createdAt={a.createdAt}
              categoryName={a.category.name}
              currentPage={currentPage}
              selectedCategory={selectedCategory}
              jumboImage=""
              content=""
              category=""
            />
          ))}
        </div>
      ) : (
        <p className="empty">No Articles Yet</p>
      )}
    </>
  );
};

export default ArticlesList;
