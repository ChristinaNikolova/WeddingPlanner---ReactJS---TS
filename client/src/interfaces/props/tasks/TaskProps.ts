import type { TaskModel } from "../../models/TaskModel";
import type { ErrorProps } from "../shared/Errors/ErrorProps";
import type { SubtaskProps } from "../subtasks/SubtaskProps";

export interface TaskProps extends TaskModel {
  id: string;
  timespan: string;
  progress: number;
  target: number;
  subtasks: SubtaskProps[];
  message?: ErrorProps[];
}
