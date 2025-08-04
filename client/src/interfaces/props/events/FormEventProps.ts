import type { EventModel } from "../../models/EventModel";
import type { BaseForm } from "../costs/BaseForm";

export interface FormEventProps extends BaseForm, EventModel {
  onSubmitHandler: (event: EventModel) => void;
}
