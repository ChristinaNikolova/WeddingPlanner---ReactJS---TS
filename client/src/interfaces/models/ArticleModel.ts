import type { CategoryProps } from "../props/categories/CategoryProps";

export interface ArticleModel {
  title: string;
  content: string | string[];
  image: string;
  jumboImage: string;
  category: CategoryProps | string;
}
