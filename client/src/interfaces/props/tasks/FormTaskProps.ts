import type { TaskModel } from "../../models/TaskModel";
import type { BaseFormProps } from "../shared/Forms/BaseFormProps";

export interface FormTaskProps extends BaseFormProps<TaskModel>, TaskModel {
  formCanceled?: boolean;
}
