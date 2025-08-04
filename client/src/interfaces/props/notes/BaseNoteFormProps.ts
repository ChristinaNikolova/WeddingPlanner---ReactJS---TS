export interface BaseNoteFormProps {
  plannerId: string;
  finish: () => void;
  onCancelFormHandler: (event?: React.MouseEvent<HTMLElement>) => void;
}
