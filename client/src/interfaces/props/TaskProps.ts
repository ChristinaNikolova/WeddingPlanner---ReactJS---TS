import type { SubtaskProps } from "./SubtaskProps";

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  timespan: string;
  progress: number;
  target: number;
  subtasks: SubtaskProps[];
}
