import type { SubtaskModel } from "../../models/SubtaskModel";

export interface SingleSubtaskProps extends SubtaskModel {
  taskId: string;
  subtaskId: string;
  id: string;
  isDone: boolean;
  onDoneSubtask: (taskId: string, id: string) => void;
  onEditHandler: (id: string) => void;
  onDeleteHandler: (taskId: string, id: string) => void;
}
