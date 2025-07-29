import type { TagProps } from "./TagProps";

export interface InputProps extends TagProps {
  type: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurHandler: (event: React.FocusEvent<HTMLInputElement>) => void;
  checked: boolean;
}
