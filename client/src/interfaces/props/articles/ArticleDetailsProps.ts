import type { CategoryProps } from "../categories/CategoryProps";
import type { ArticleProps } from "./ArticleProps";

export interface ArticleDetailsProps extends ArticleProps {
  jumboImage: string;
  content: string[];
  likesCount: number;
  likes: string[];
  category: CategoryProps;
  categoryName: string;
  selectedCategory?: string;
}
