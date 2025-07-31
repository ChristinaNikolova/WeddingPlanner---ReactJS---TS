import type { CategoryProps } from "../categories/CategoryDetailsProps";
import type { TagProps } from "./TagProps";

export interface SelectProps extends TagProps {
  onChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlurHandler: (event: React.FocusEvent<HTMLSelectElement>) => void;
  categories: (CategoryProps | string)[];
}
