import { BaseEntry } from "../BaseEntry";
import { InputObjectId } from "../InputObjectId";
import { CostDocument } from "./CostDocument";
import { EventDocument } from "./EventDocument";
import { GuestDocument } from "./GuestDocument";
import { NoteDocument } from "./NoteDocument";
import { TaskDocument } from "./TaskDocument";
import { UserDocument } from "./UserDocument";

export interface PlannerDocument extends BaseEntry {
  title: string;
  description: string;
  date: string;
  budget: number;
  location: string;
  // todo 2??
  bride: InputObjectId | GuestDocument;
  // todo 2??
  groom: InputObjectId | GuestDocument;
  // todo 2??
  creator: InputObjectId | UserDocument;
  // todo 2??
  notes: InputObjectId[] | NoteDocument[];
  // todo 2??
  guests: InputObjectId[] | GuestDocument[];
  // todo 2??
  tasks: InputObjectId[] | TaskDocument[];
  // todo 2??
  costs: InputObjectId[] | CostDocument[];
  // todo 2??
  events: InputObjectId[] | EventDocument[];
}
