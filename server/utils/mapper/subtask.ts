function subtaskViewModel(subtask) {
  return {
    id: subtask._id,
    description: subtask.description,
    isDone: subtask.isDone,
  };
}

export default subtaskViewModel;
