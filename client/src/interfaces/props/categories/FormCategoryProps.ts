import type { FormProps } from "../shared/FormProps";
import type { CreateCategory } from "./CreateCategory";

export interface FormCategoryProps extends FormProps {
  name: string;
  onSubmitHandler: (category: CreateCategory) => void;
}
