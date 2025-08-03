import { useState } from "react";
import AddButton from "../../../shared/Buttons/Add/AddButton";
import CreateSubtask from "../Create/CreateSubtask";
import SingleSubtask from "../Single/SingleSubtask";
import UpdateSubtask from "../Update/UpdateSubtask";
import * as subtasksService from "../../../../services/subtasks";
import {
  addButtonTexts,
  displayStyles,
} from "../../../../utils/constants/global";
import styles from "./SubtasksAll.module.css";
import type { SubtaskProps } from "../../../../interfaces/props/SubtaskProps";

interface SubtasksAllProps {
  taskId: string;
  subtasks: SubtaskProps[];
  loadTasks: () => void;
  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCancelFormHandler: (e: any) => void;
}

const SubtasksAll = ({
  taskId,
  subtasks,
  loadTasks,
  onCancelFormHandler,
}: SubtasksAllProps) => {
  const [subtaskId, setSubtaskId] = useState<string>("");

  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onShowSubTaskFormHandler = (e: any): void => {
    const targetFormElement =
      e.target.parentElement.parentElement.parentElement.children[1]
        .children[0];
    targetFormElement.style.display = displayStyles.FLEX;
  };

  const onDoneSubtask = (taskId: string, subtaskId: string): void => {
    subtasksService
      .done(taskId, subtaskId)
      .then(() => {
        loadTasks();
      })
      .catch((err) => console.error(err));
  };

  const onEditHandler = (id: string): void => {
    setSubtaskId(id);
  };

  const onDeleteHandler = (taskId: string, subtaskId: string): void => {
    subtasksService
      .deleteById(taskId, subtaskId)
      .then(() => {
        loadTasks();
      })
      .catch((err) => console.error(err));
  };

  const onCancelFormHelperHandler = () => {
    setSubtaskId("");
  };

  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finish = (e: any): void => {
    onCancelFormHelperHandler();
    onCancelFormHandler(e);
    loadTasks();
  };

  return (
    <div className={styles["checklist-all-current-task-subtasks-wrapper"]}>
      <h6 className={styles["checklist-all-current-task-subtasks-title"]}>
        Sub-tasks
      </h6>
      <div
        className={styles["checklist-all-current-task-subtasks-form-wrapper"]}
      >
        {subtaskId ? (
          <UpdateSubtask
            subtaskId={subtaskId}
            onCancelFormHelperHandler={onCancelFormHelperHandler}
            finish={finish}
          />
        ) : (
          <CreateSubtask
            taskId={taskId}
            onCancelFormHandler={onCancelFormHandler}
            finish={finish}
          />
        )}
      </div>
      {subtasks.length > 0 ? (
        subtasks.map((st) => (
          <SingleSubtask
            key={st.id}
            taskId={taskId}
            subtaskId={subtaskId}
            id={st.id}
            description={st.description}
            isDone={st.isDone}
            onDoneSubtask={onDoneSubtask}
            onEditHandler={onEditHandler}
            onDeleteHandler={onDeleteHandler}
          />
        ))
      ) : (
        <p className={styles["checklist-all-empty-subtasks"]}>
          No sub-tasks yet
        </p>
      )}
      <div
        className={
          styles["checklist-all-current-task-subtasks-form-icon-wrapper"]
        }
      >
        {!subtaskId && (
          <AddButton
            classNames={[]}
            text={addButtonTexts.SUB_TASK}
            isEmptyString={false}
            onShowFormHandler={onShowSubTaskFormHandler}
          />
        )}
      </div>
    </div>
  );
};

export default SubtasksAll;
