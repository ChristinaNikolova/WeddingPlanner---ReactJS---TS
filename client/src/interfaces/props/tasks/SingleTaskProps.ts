import type { ReactNode } from "react";
import type { TaskModel } from "../../models/TaskModel";

export interface SingleTaskProps extends TaskModel {
  index: number;
  taskId: string;
  id: string;
  progress: number;
  target: number;
  children: ReactNode;
  onEditHandler: (id: string, index: number) => void;
  onDeleteHandler: (id: string) => void;
}
