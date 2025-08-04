import type { NoteModel } from "../../models/NoteModel";
import type { BaseForm } from "../costs/BaseForm";

export interface FormNoteProps extends BaseForm, NoteModel {
  onSubmitHandler: (note: NoteModel) => void;
}
