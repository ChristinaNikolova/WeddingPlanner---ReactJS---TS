import type { ButtonText } from "../../../../utils/constants/global";

export interface AddButtonProps {
  classNames: string[];
  text: ButtonText;
  isEmptyString: boolean;
  onShowFormHandler:
    | ((noteId: string) => void)
    | ((event: React.MouseEvent<HTMLElement>) => void);
}
