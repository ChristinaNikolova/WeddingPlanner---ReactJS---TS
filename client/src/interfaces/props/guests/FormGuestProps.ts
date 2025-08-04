import type { GuestModel } from "../../models/GuestModel";
import type { BaseForm } from "../costs/BaseForm";

export interface FormGuestProps extends BaseForm, GuestModel {
  // todo make it generic
  onSubmitHandler: (guest: GuestModel) => void;
}
