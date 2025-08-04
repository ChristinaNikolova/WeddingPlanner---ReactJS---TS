import type { GuestModel } from "../../models/GuestModel";

export interface SingleGuestProps extends GuestModel {
  id: string;
  isEditIconHidden: boolean;
  // todo add generic
  onDeleteHandler: (id: string) => void;
  onShowFormHandler: (id: string) => void;
}
