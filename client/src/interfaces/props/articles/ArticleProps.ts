import type { CategoryProps } from "../categories/CategoryProps";
import type { ErrorProps } from "../shared/ErrorProps";

export interface ArticleProps {
  id: string;
  title: string;
  shortContent: string;
  image: string;
  category: CategoryProps;
  createdAt: string;
  message?: ErrorProps[];
  likes: string[]
}
