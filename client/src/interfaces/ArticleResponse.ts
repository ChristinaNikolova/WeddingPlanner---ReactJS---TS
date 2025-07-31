import type { ArticleDetailsProps } from "./props/articles/ArticleDetailsProps";

export interface ArticleResponse {
  articles: ArticleDetailsProps[];
  pagesCount: number;
  currentPage: string;
}
