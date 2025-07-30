import { Link } from "react-router-dom";
import type { PaginationProps } from "../../../interfaces/PaginationProps";
import { directions } from "../../../utils/constants/global";
import styles from "./Pagination.module.css";

const Pagination = ({
  currentPage,
  pagesCount,
  selectedCategory,
  onClickHandler,
}: PaginationProps) => {
  return (
    <div className={styles["pagination-wrapper"]}>
      {currentPage !== 1 && (
        <Link
          onClick={() => onClickHandler(directions.PREV)}
          className={styles["pagination"]}
          to={`/blog?page=${currentPage - 1}&category=${selectedCategory.name}`}
        >
          Newer posts
        </Link>
      )}
      {currentPage !== pagesCount && (
        <Link
          onClick={() => onClickHandler(directions.NEXT)}
          className={styles["pagination"]}
          to={`/blog?page=${currentPage + 1}&category=${selectedCategory.name}`}
        >
          Older posts
        </Link>
      )}
    </div>
  );
};

export default Pagination;
