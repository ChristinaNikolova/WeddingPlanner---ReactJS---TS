import { InputObjectId } from "../interfaces/dbmodels/InputObjectId";
import { TaskDocument } from "../interfaces/dbmodels/TaskDocument";
import { TaskViewModel } from "../interfaces/viewmodels/TaskViewModel";
import PlannerModel from "../models/Planner";
import task from "../utils/mapper/task";
import global from "../utils/constants/global";
import TaskModel from "../models/Task";

const { taskViewModel } = task;
const { errors } = global;

async function all(plannerId: InputObjectId): Promise<TaskViewModel[]> {
  const planner = await PlannerModel.findById(plannerId).populate({
    path: "tasks",
    populate: {
      path: "subtasks",
      options: {
        sort: { createdAt: -1 },
      },
    },
  });

  if (!planner) {
    throw new Error(errors.PLANNER_NOT_FOUND);
  }

  return (planner.tasks as TaskDocument[])
    .sort((a, b) => {
      const aCreated = a.createdAt?.getTime() || 0;
      const bCreated = b.createdAt?.getTime() || 0;
      return bCreated - aCreated;
    })
    .map(taskViewModel);
}

async function create(
  plannerId: InputObjectId,
  title: string,
  description: string,
  timespan: string
): Promise<TaskDocument> {
  const task = new TaskModel({
    title,
    description,
    timespan,
  });

  const result = await task.save();
  const planner = await PlannerModel.findById(plannerId);

  if (!planner) {
    throw new Error(errors.PLANNER_NOT_FOUND);
  }

  (planner.tasks as InputObjectId[]).push(result._id);
  await planner.save();

  return result;
}

async function deleteById(id: InputObjectId): Promise<TaskDocument | null> {
  return TaskModel.findByIdAndDelete(id);
}

async function getById(
  id: InputObjectId,
  hasToCast: boolean
): Promise<TaskDocument | TaskViewModel> {
  const task = await TaskModel.findById(id);

  if (!task) {
    throw new Error(errors.TASK_NOT_FOUND);
  }

  return hasToCast ? taskViewModel(task) : task;
}

async function update(
  id: InputObjectId,
  title: string,
  description: string
): Promise<TaskDocument> {
  const task = (await getById(id, false)) as TaskDocument;

  task.title = title;
  task.description = description;
  await task.save();

  return task;
}

export default {
  all,
  create,
  deleteById,
  getById,
  update,
};
