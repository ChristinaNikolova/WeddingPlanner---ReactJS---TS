import type { CategoryProps } from "../categories/CategoryProps";

export interface PaginationProps {
  currentPage: number;
  pagesCount: number;
  selectedCategory: CategoryProps;
  onClickHandler: (direction: string) => void;
}
