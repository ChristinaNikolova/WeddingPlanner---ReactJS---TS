export interface FormButtonProps {
  formName: string;
  isDisabled: boolean;
  onCancelFormHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
