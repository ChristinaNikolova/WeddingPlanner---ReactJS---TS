import type { SubtaskProps } from "./SubtaskProps";

export interface SubtasksAllProps {
  taskId: string;
  subtasks: SubtaskProps[];
  loadTasks: () => void;
  onCancelFormHandler: (e: React.SyntheticEvent<HTMLElement>) => void;
}
