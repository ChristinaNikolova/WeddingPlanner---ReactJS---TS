import type { CategoryProps } from "./CategoryProps";
import type { ErrorProps } from "./ErrorProps";

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
