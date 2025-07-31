import type { ArticleDetailsProps } from "./ArticleDetailsProps";

export interface ArticlesListProps {
  articles?: ArticleDetailsProps[];
  currentPage?: string;
  selectedCategory?: string;
  pathToImage?: string;
}
