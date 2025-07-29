import type { TagProps } from "./TagProps";

export interface TextAreaProps extends TagProps {
  rows: number;
  onChangeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlurHandler: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}
