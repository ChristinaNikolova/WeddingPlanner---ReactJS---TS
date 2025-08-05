import type { NoteModel } from "../../models/NoteModel";
import type { BaseFormProps } from "../shared/Forms/BaseFormProps";

export interface FormNoteProps extends BaseFormProps<NoteModel>, NoteModel {}
