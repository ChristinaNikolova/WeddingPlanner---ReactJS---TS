import { SubtaskDocument } from "../../interfaces/dbmodels/SubtaskDocument";
import { SubtaskViewModel } from "../../interfaces/viewmodels/SubtaskViewModel";

function subtaskViewModel(subtask: SubtaskDocument): SubtaskViewModel {
  return {
    id: subtask._id.toString(),
    description: subtask.description,
    isDone: subtask.isDone,
  };
}

export default {
  subtaskViewModel,
};
