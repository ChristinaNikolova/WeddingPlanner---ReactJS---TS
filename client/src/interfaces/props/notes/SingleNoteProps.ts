import type { NoteModel } from "../../models/NoteModel";

export interface SingleNoteProps extends NoteModel {
  id: string;
  createdAt: string;
  isEditIconHidden: boolean;
  onDeleteHandler: (noteId: string) => void;
  onShowFormHandler: (noteId: string) => void;
}
