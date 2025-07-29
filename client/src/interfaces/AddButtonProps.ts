export interface AddButtonProps {
  classNames: string;
  text: string;
  isEmptyString: boolean;
  onShowFormHandler: (event: React.MouseEvent<HTMLElement> | string) => void;
}
