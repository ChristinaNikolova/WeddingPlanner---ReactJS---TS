import type { EventModel } from "../../models/EventModel";

export interface SingleEventProps extends EventModel {
  id: string;
  isHighlighted: boolean;
  isEditIconHidden: boolean;
  onHeightlightHandler: (eventId: string) => void;
  onDeleteHandler: (eventId: string) => void;
  onShowFormHandler: (eventId: string) => void;
}
