import { BaseEntity } from "./BaseEntry";
import { ObjectId } from "./ObjectId";

export interface Planner extends BaseEntity {
  title: string;
  description: string;
  date: string;
  budget: number;
  location: string;
  bride: ObjectId;
  groom: ObjectId;
  creator: ObjectId;
  notes: ObjectId[];
  guests: ObjectId[];
  tasks: ObjectId[];
  costs: ObjectId[];
  events: ObjectId[];
}
