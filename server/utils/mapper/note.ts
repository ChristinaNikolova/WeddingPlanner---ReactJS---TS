import parser from "../parser";

const { formatCreatedAt } = parser;

function noteViewModel(note) {
  return {
    id: note._id,
    description: note.description,
    createdAt: formatCreatedAt(note.createdAt),
  };
}

export default noteViewModel;
