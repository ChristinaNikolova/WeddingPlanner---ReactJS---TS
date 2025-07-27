import { SubtaskDocument } from "../../interfaces/dbmodels/SubtaskDocument";
import { TaskDocument } from "../../interfaces/dbmodels/TaskDocument";
import { TaskViewModel } from "../../interfaces/viewmodels/TaskViewModel";
import subtask from "./subtask";

const { subtaskViewModel } = subtask;

function taskViewModel(task: TaskDocument): TaskViewModel {
  return {
    id: task._id.toString(),
    title: task.title,
    description: task.description,
    timespan: task.timespan.toString(),
    progress: task.progress,
    target: task.target,
    subtasks: (task.subtasks as SubtaskDocument[]).map(subtaskViewModel),
  };
}

export default {
  taskViewModel,
};
