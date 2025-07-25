import { BaseEntry } from "../BaseEntry";
import { Timespan } from "../enums/Timespan";
import { InputObjectId } from "../InputObjectId";
import { SubtaskDocument } from "./SubtaskDocument";

export interface TaskDocument extends BaseEntry {
  title: string;
  description: string;
  timespan: Timespan;
  progress: number;
  target: number;
  // todo this two??
  subtasks: InputObjectId[] | SubtaskDocument[];
}
