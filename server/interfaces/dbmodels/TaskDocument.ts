import { BaseEntry } from "../BaseEntry";
import { InputObjectId } from "../InputObjectId";
import { SubtaskDocument } from "./SubtaskDocument";

export interface TaskDocument extends BaseEntry {
  title: string;
  description: string;
  // todo enum
  timespan: string;
  //    {
  //     type: String;
  //     required: [true, "Time span is required"];
  //     enum: [
  //       "one year",
  //       "nine months",
  //       "six months",
  //       "three months",
  //       "one month",
  //       "three weeks",
  //       "two weeks",
  //       "one week",
  //       "one day",
  //       "wedding day"
  //     ];
  //   };
  progress: number;
  target: number;
  // todo this two??
  subtasks: InputObjectId[] | SubtaskDocument[];
}
