import type { BaseModel } from "../../models/BaseModel";
import type { NoteModel } from "../../models/NoteModel";

export interface NoteProps extends BaseModel, NoteModel {
  createdAt: string;
}
