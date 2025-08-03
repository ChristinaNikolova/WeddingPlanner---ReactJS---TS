import type { FormName } from "../../../../utils/constants/global";

export interface FormButtonProps {
  formName: FormName;
  isDisabled?: boolean;
  onCancelFormHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
