export interface BaseSubtaskFormProps {
  finish: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancelFormHelperHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancelFormHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
