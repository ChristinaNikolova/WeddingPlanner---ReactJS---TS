import type { BaseModel } from "../../models/BaseModel";
import type { TaskModel } from "../../models/TaskModel";
import type { SubtaskProps } from "../subtasks/SubtaskProps";

export interface TaskProps extends BaseModel, TaskModel {
  timespan: string;
  progress: number;
  target: number;
  subtasks: SubtaskProps[];
}
