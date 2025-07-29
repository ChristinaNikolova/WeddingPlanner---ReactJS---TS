import type { CategoryProps } from "./CategoryProps";

export interface PaginationProps {
  currentPage: number;
  pagesCount: number;
  selectedCategory: CategoryProps;
  onClickHandler: (direction: string) => void;
}
