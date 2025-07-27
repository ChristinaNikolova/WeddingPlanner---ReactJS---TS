import { NoteDocument } from "../interfaces/dbmodels/NoteDocument";
import { InputObjectId } from "../interfaces/dbmodels/InputObjectId";
import { NoteViewModel } from "../interfaces/viewmodels/NoteViewModel";
import PlannerModel from "../models/Planner";
import note from "../utils/mapper/note";
import global from "../utils/constants/global";
import NoteModel from "../models/Note";

const { noteViewModel } = note;
const { errors } = global;

async function all(plannerId: InputObjectId): Promise<NoteViewModel[]> {
  const planner = await PlannerModel.findById(plannerId).populate("notes");

  if (!planner) {
    throw new Error(errors.PLANNER_NOT_FOUND);
  }

  return (planner.notes as NoteDocument[])
    .sort((a, b) => {
      const aCreated = a.createdAt?.getTime() || 0;
      const bCreated = b.createdAt?.getTime() || 0;
      return bCreated - aCreated;
    })
    .map(noteViewModel);
}

async function create(
  plannerId: InputObjectId,
  description: string
): Promise<NoteDocument> {
  const note = new NoteModel({
    description,
  });

  const result = await note.save();

  const planner = await PlannerModel.findById(plannerId);

  if (!planner) {
    throw new Error(errors.PLANNER_NOT_FOUND);
  }

  (planner.notes as InputObjectId[]).push(result._id);
  await planner.save();

  return result;
}

async function deleteById(id: InputObjectId): Promise<NoteDocument | null> {
  return NoteModel.findByIdAndDelete(id);
}

async function getById(
  id: InputObjectId,
  hasToCast: boolean
): Promise<NoteDocument | NoteViewModel> {
  const note = await NoteModel.findById(id);

  if (!note) {
    throw new Error(errors.NOTE_NOT_FOUND);
  }

  return hasToCast ? noteViewModel(note) : note;
}

async function update(
  id: InputObjectId,
  description: string
): Promise<NoteDocument> {
  const note = (await getById(id, false)) as NoteDocument;

  note.description = description;
  await note.save();

  return note;
}

export default {
  all,
  create,
  deleteById,
  update,
  getById,
};
