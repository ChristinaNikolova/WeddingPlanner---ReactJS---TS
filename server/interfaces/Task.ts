import { BaseEntity } from "./BaseEntry";
import { ObjectId } from "./ObjectId";

export interface Task extends BaseEntity {
  title: string;
  description: string;
  timespan: string;
  progress: number;
  target: number;
  subtasks: ObjectId[];
}
