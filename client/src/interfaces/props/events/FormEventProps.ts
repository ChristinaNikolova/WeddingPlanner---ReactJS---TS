import type { EventModel } from "../../models/EventModel";
import type { BaseFormProps } from "../shared/Forms/BaseFormProps";

export interface FormEventProps extends BaseFormProps<EventModel>, EventModel {}
