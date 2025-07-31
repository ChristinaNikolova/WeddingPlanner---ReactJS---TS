import type { ArticleDetailsProps } from "./ArticleDetailsProps";

export interface ArticlesListProps {
  articles?: ArticleDetailsProps[];
  currentPage?: string;
  selectedCategory?: string;
  pathToImage?: string;
}

// todo test and remove one
// export interface ArticleResponse {
//   articles: ArticleDetailsProps[];
//   pagesCount: number;
//   currentPage: string;
// }
