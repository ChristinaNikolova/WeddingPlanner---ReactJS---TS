export interface AddButtonProps {
  classNames: string[];
  text: string;
  isEmptyString: boolean;
  onShowFormHandler:
    | ((noteId: string) => void)
    | ((event: React.MouseEvent<HTMLElement>) => void);
}
