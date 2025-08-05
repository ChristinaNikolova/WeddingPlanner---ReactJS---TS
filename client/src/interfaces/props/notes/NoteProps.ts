import type { NoteModel } from "../../models/NoteModel";
import type { ErrorProps } from "../shared/Errors/ErrorProps";

export interface NoteProps extends NoteModel {
  id: string;
  createdAt: string;
  message?: ErrorProps[];
}
