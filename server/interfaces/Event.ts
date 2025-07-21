import { BaseEntity } from "./BaseEntry";

export interface Event extends BaseEntity {
  title: string;
  startTime: Date;
  endTime: Date;
  duration: string;
  isHighlighted: boolean;
}
