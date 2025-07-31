import type { ArticleDetailsProps } from "./ArticleDetailsProps";

export interface ArticlesListProps {
  articles?: ArticleDetailsProps[];
  currentPage?: string;
  pagesCount?: number;
  selectedCategory?: string;
  pathToImage?: string;
}
