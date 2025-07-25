import { BaseEntry } from "../BaseEntry";

export interface EventDocument extends BaseEntry {
  title: string;
  startTime: Date;
  endTime: Date;
  duration: string;
  isHighlighted: boolean;
}
