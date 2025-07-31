import type { ArticleDetailsProps } from "./props/articles/ArticleDetailsProps";

// todo use article props interfaces
export interface ArticleResponse {
  articles: ArticleDetailsProps[];
  pagesCount: number;
  currentPage: string;
}
