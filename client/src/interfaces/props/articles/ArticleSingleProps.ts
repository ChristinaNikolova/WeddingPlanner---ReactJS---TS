import type { ArticleProps } from "./ArticleProps";

export interface ArticleSingleProps extends ArticleProps {
  className: string;
  categoryName: string;
  currentPage?: string;
  selectedCategory?: string;
}
