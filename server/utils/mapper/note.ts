import { NoteDocument } from "../../interfaces/dbmodels/NoteDocument";
import { NoteViewModel } from "../../interfaces/viewmodels/NoteViewModel";
import parser from "../parser";

const { formatCreatedAt } = parser;

function noteViewModel(note: NoteDocument): NoteViewModel {
  return {
    id: note._id.toString(),
    description: note.description,
    createdAt: formatCreatedAt(note.createdAt),
  };
}

export default {
  noteViewModel,
};
