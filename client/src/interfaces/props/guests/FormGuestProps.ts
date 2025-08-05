import type { GuestModel } from "../../models/GuestModel";
import type { BaseFormProps } from "../shared/Forms/BaseFormProps";

export interface FormGuestProps extends BaseFormProps<GuestModel>, GuestModel {}
