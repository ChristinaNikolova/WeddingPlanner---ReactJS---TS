import type { CategoryProps } from "./CategoryProps";

export interface ArticleProps {
  id: string;
  title: string;
  shortContent: string;
  image: string;
  category: CategoryProps;
  createdAt: string;
}
