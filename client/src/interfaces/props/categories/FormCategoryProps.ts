import type { FormProps } from "../shared/FormProps";
import type { CategoryModel } from "../models/CategoryModel";

export interface FormCategoryProps extends FormProps {
  name: string;
  onSubmitHandler: (category: CategoryModel) => void;
}
