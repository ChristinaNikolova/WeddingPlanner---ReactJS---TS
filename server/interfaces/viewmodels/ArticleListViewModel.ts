import { ArticleBaseViewModel } from "./ArticleBaseViewModel";
import { CategoryNameViewModel } from "./CategoryNameViewModel";

export interface ArticleListViewModel extends ArticleBaseViewModel {
  category: CategoryNameViewModel;
}
