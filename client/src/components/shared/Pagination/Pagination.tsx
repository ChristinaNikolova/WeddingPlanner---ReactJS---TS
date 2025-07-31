import { Link } from "react-router-dom";
import { directions } from "../../../utils/constants/global";
import styles from "./Pagination.module.css";
import type { PaginationProps } from "../../../interfaces/props/shared/PaginationProps";

// todo fix Number ()///
const Pagination = ({
  currentPage,
  pagesCount,
  selectedCategory,
  onClickHandler,
}: PaginationProps) => {
  return (
    <div className={styles["pagination-wrapper"]}>
      {Number(currentPage) !== 1 && (
        <Link
          onClick={() => onClickHandler(directions.PREV)}
          className={styles["pagination"]}
          to={`/blog?page=${Number(currentPage) - 1}&category=${
            selectedCategory.name
          }`}
        >
          Newer posts
        </Link>
      )}
      {Number(currentPage) !== pagesCount && (
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
