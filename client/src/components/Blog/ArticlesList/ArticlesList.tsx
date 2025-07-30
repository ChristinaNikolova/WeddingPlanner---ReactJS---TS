import type { ArticleProps } from "../../../interfaces/ArticleProps";
import ArticleSingle from "../ArticleSingle/ArticleSingle";
import styles from "./ArticlesList.module.css";

// todo create sub interfaces
interface ArticlesListProps {
  articles: ArticleProps[];
  currentPage?: number;
  selectedCategory?: string;
}
const ArticlesList = ({
  articles,
  currentPage,
  selectedCategory,
}: ArticlesListProps) => {
  return (
    <>
      {articles.length ? (
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
