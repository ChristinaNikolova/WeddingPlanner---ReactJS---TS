import type { CategoryProps } from "../categories/CategoryDetailsProps";

export interface PaginationProps {
  currentPage: string;
  pagesCount: number;
  selectedCategory: CategoryProps;
  onClickHandler: (direction: string) => void;
}
