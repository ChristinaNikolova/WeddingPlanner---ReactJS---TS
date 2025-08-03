import type { CategoryModel } from "../../models/CategoryModel";
import type { ErrorProps } from "../shared/Errors/ErrorProps";
import type { FormButtonProps } from "../shared/Forms/FormButtonProps";

export interface FormCategoryProps extends FormButtonProps {
  name: string;
  onSubmitHandler: (category: CategoryModel) => void;
  // todo extract
  image: string;
  serverError: ErrorProps[];
}
