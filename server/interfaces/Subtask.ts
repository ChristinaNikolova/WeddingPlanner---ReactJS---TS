import { BaseEntity } from "./BaseEntry";

export interface Subtask extends BaseEntity {
  description: string;
  isDone: boolean;
}
