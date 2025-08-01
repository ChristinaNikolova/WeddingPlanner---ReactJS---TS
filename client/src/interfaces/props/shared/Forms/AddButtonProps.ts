export interface AddButtonProps {
  classNames: string[];
  text: string;
  isEmptyString: boolean;
  onShowFormHandler:
    | ((noteId: string) => void)
    | ((event: string | React.MouseEvent<HTMLElement, MouseEvent>) => void);
}
