import { SubtaskViewModel } from "./SubtaskViewModel";

export interface TaskViewModel {
  id: string;
  title: string;
  description: string;
  timespan: string;
  progress: number;
  target: number;
  subtasks: SubtaskViewModel[];
}
