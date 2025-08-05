import type { GuestModel } from "../../models/GuestModel";

export interface SingleGuestProps extends GuestModel {
  id: string;
  isEditIconHidden: boolean;
  onDeleteHandler: (id: string) => void;
  onShowFormHandler: (id: string) => void;
}
