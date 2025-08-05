export interface BaseCostFormProps {
  plannerId: string;
  onCancelFormHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  finish: (e: React.FormEvent<HTMLFormElement>) => void;
}
