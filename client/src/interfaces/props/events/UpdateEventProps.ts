export interface UpdateEventProps {
  eventId: string;
  plannerId: string;
  onCancelFormHandler: () => void;
  finish: () => void;
}
