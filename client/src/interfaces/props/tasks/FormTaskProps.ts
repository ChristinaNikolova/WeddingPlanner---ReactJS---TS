import type { TaskModel } from "../../models/TaskModel";
import type { BaseForm } from "../costs/BaseForm";

export interface FormTaskProps extends BaseForm, TaskModel {
  onSubmitHandler: (
    e: React.FormEvent<HTMLFormElement>,
    task: TaskModel
  ) => void;
  formCanceled?: boolean;
}
