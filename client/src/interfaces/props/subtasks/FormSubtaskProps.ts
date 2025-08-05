import type { SubtaskModel } from "../../models/SubtaskModel";
import type { BaseForm } from "../costs/BaseForm";

export interface FormSubtaskProps extends BaseForm, SubtaskModel {
  onSubmitHandler: (
    e: React.FormEvent<HTMLFormElement>,
    subtask: SubtaskModel
  ) => void;
  formCanceled?: boolean;
}
