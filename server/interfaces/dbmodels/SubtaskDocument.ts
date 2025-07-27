import { BaseEntry } from "./BaseEntry";

export interface SubtaskDocument extends BaseEntry {
  description: string;
  isDone: boolean;
}
