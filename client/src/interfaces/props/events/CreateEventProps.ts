export interface CreateEventProps {
  plannerId: string;
  isHidden: boolean;
  onCancelFormHandler: () => void;
  finish: () => void;
}
