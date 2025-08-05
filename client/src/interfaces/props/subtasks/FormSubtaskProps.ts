import type { SubtaskModel } from "../../models/SubtaskModel";
import type { BaseFormProps } from "../shared/Forms/BaseFormProps";

export interface FormSubtaskProps
  extends BaseFormProps<SubtaskModel>,
    SubtaskModel {
  formCanceled?: boolean;
}
