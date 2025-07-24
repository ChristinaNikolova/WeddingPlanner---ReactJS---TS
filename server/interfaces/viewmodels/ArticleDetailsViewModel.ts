import { ObjectId } from "../ObjectId";
import { ArticleBaseViewModel } from "./ArticleBaseViewModel";
import { CategoryViewModel } from "./CategoryViewModel";

export interface ArticleDetailsViewModel extends ArticleBaseViewModel {
  content: string[];
  jumboImage: string;
  likesCount: number;
  likes: number | ObjectId[];
  category: CategoryViewModel;
}
