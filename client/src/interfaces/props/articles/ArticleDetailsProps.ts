import type { ArticleProps } from "./ArticleProps";

export interface ArticleDetailsProps extends ArticleProps {
  likesCount: number;
  likes: string[];
  categoryName: string;
  selectedCategory?: string;
}
