import type { CreateArticle } from "./CreateArticle";
import type { CategoryProps } from "../categories/CategoryProps";
import type { FormProps } from "../shared/FormProps";

export interface FormArticleProps extends FormProps {
  title: string;
  content: string;
  jumboImage: string;
  category: CategoryProps | string;
  onSubmitHandler: (article: CreateArticle) => void;
}
