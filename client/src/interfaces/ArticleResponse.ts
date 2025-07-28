import type { ArticleProps } from "./ArticleProps";

export interface ArticleResponse {
  articles: ArticleProps[];
  pagesCount: number;
  currentPage: number;
}
