import type { CategoryProps } from "../categories/CategoryProps";

export interface PaginationProps {
  currentPage: string;
  pagesCount: number;
  selectedCategory: CategoryProps;
  onClickHandler: (direction: string) => void;
}
