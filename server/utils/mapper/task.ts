import subtaskViewModel from "./subtask";

function taskViewModel(task) {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    timespan: task.timespan,
    progress: task.progress,
    target: task.target,
    subtasks: task.subtasks.map(subtaskViewModel),
  };
}

export default taskViewModel;
