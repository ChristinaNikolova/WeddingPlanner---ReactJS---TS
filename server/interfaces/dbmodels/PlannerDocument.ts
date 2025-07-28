import { BaseEntry } from "./BaseEntry";
import { InputObjectId } from "./InputObjectId";
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
  bride: GuestDocument;
  groom: GuestDocument;
  creator: UserDocument;
  notes: InputObjectId[] | NoteDocument[];
  guests: InputObjectId[] | GuestDocument[];
  tasks: InputObjectId[] | TaskDocument[];
  costs: InputObjectId[] | CostDocument[];
  events: InputObjectId[] | EventDocument[];
}
