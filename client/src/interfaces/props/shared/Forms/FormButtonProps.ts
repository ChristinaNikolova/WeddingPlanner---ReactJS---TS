import type { FormName } from "../../../../utils/constants/global";

export interface FormButtonProps {
  formName: FormName | undefined;
  isDisabled?: boolean;
  onCancelFormHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
