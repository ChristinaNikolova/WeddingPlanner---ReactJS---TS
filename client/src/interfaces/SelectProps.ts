import type { CategoryProps } from "./CategoryProps";
import type { TagProps } from "./TagProps";

export interface SelectProps extends TagProps {
  onChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlurHandler: (event: React.FocusEvent<HTMLSelectElement>) => void;
  categories: (CategoryProps | string)[];
}
