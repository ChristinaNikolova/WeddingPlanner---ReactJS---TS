import type { CategoryModel } from "../../models/CategoryModel";
import type { FormButtonProps } from "../shared/Forms/FormButtonProps";

export interface FormCategoryProps extends FormButtonProps {
  name: string;
  onSubmitHandler: (category: CategoryModel) => void;
}
