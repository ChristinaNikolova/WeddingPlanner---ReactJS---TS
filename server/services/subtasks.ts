import { InputObjectId } from "../interfaces/dbmodels/InputObjectId";
import { SubtaskDocument } from "../interfaces/dbmodels/SubtaskDocument";
import { SubtaskViewModel } from "../interfaces/viewmodels/SubtaskViewModel";
import SubtaskModel from "../models/Subtask";
import TaskModel from "../models/Task";
import subtask from "../utils/mapper/subtask";
import global from "../utils/constants/global";

const { subtaskViewModel } = subtask;
const { errors } = global;

async function create(
  taskId: InputObjectId,
  description: string
): Promise<SubtaskDocument> {
  const subtask = new SubtaskModel({
    description,
  });

  const result = await subtask.save();
  const task = await TaskModel.findById(taskId);

  if (!task) {
    throw new Error(errors.TASK_NOT_FOUND);
  }

  (task.subtasks as InputObjectId[]).push(result._id);
  task.target++;
  await task.save();

  return result;
}

async function done(
  taskId: InputObjectId,
  subtaskId: InputObjectId
): Promise<SubtaskDocument> {
  const subtask = await SubtaskModel.findById(subtaskId);

  if (!subtask) {
    throw new Error(errors.SUBTASK_NOT_FOUND);
  }

  subtask.isDone = !subtask.isDone;
  subtask.save();

  const task = await TaskModel.findById(taskId);

  if (!task) {
    throw new Error(errors.TASK_NOT_FOUND);
  }

  subtask.isDone ? task.progress++ : task.progress--;
  await task.save();

  return subtask;
}

async function deleteById(
  taskId: InputObjectId,
  subtaskId: InputObjectId
): Promise<SubtaskDocument | null> {
  const subtask = await SubtaskModel.findById(subtaskId);
  const task = await TaskModel.findById(taskId);

  if (!task) {
    throw new Error(errors.TASK_NOT_FOUND);
  }

  if (!subtask) {
    throw new Error(errors.SUBTASK_NOT_FOUND);
  }

  task.target--;

  if (subtask.isDone) {
    task.progress--;
  }

  await task.save();

  return SubtaskModel.findByIdAndDelete(subtaskId);
}

async function getById(
  id: InputObjectId,
  hasToCast: boolean
): Promise<SubtaskDocument | SubtaskViewModel> {
  const subtask = await SubtaskModel.findById(id);

  if (!subtask) {
    throw new Error(errors.SUBTASK_NOT_FOUND);
  }

  return hasToCast ? subtaskViewModel(subtask) : subtask;
}

async function update(
  id: InputObjectId,
  description: string
): Promise<SubtaskDocument> {
  const subtask = (await getById(id, false)) as SubtaskDocument;

  subtask.description = description;
  await subtask.save();

  return subtask;
}

export default {
  create,
  done,
  deleteById,
  update,
  getById,
};
