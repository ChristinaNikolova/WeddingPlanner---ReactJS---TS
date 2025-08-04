export interface BaseGuestFormProps {
  plannerId: string;
  onCancelFormHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  finish: () => void;
}
