import type { CategoryProps } from "../../categories/CategoryProps";
import type { TagProps } from "./TagProps";

export interface SelectProps extends TagProps {
  onChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlurHandler?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  // todo update roles
  categories: (CategoryProps | string)[];
}
