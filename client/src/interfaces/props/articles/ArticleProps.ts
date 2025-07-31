import type { ErrorProps } from "../shared/Errors/ErrorProps";

export interface ArticleProps {
  id: string;
  title: string;
  shortContent: string;
  image: string;
  createdAt?: string;
  message?: ErrorProps[];
}
