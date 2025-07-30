import type { ArticleDetailsProps } from "./ArticleDetailsProps";

export interface ArticleResponse {
  articles: ArticleDetailsProps[];
  pagesCount: number;
  currentPage: string;
}
