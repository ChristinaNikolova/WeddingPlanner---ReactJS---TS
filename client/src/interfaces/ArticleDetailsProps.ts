import type { CategoryProps } from "./CategoryProps";

export interface ArticleDetailsProps {
  id: string;
  title: string;
  jumboImage: string;
  content: string[];
  shortContent: string;
  image: string;
  likesCount: number;
  likes: string[];
  createdAt: string;
  category: CategoryProps;
  selectedCategory?: string;
}
