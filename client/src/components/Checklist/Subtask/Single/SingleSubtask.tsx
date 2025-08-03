import { displayStyles, tagNames } from "../../../../utils/constants/global";
import styles from "./SingleSubtask.module.css";

interface SingleSubtaskProps {
  taskId: string;
  subtaskId: string;
  id: string;
  description: string;
  isDone: boolean;
  onDoneSubtask: (taskId: string, id: string) => void;
  onEditHandler: (id: string) => void;
  onDeleteHandler: (taskId: string, id: string) => void;
}

const SingleSubtask = ({
  taskId,
  subtaskId,
  id,
  description,
  isDone,
  onDoneSubtask,
  onEditHandler,
  onDeleteHandler,
}: SingleSubtaskProps) => {
  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMouseEnterHandler = (e: any): void => {
    if (e.target.nodeName !== tagNames.P) {
      return;
    }

    e.target.children[0].style.display = displayStyles.INLINE_BLOCK;
  };

  const onMouseLeaveHandler = (): void => {
    Array.from(
      document.getElementsByClassName("subtask-icons-wrapper")
    ).forEach((el) => {
      (el as HTMLElement).style.display = displayStyles.NONE;
    });
  };

  const getStyles = (isDone: boolean): string => {
    return isDone
      ? `${styles["checklist-all-current-task-current-subtask"]} ${styles["checklist-all-current-task-current-subtask-heightlight"]}`
      : styles["checklist-all-current-task-current-subtask"];
  };

  return (
    <div key={id} className={getStyles(isDone)}>
      {isDone ? (
        <i
          onClick={() => onDoneSubtask(taskId, id)}
          className="fa-solid fa-square-check"
        ></i>
      ) : (
        <i
          onClick={() => onDoneSubtask(taskId, id)}
          className="fa-solid fa-square"
        ></i>
      )}
      <p
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        className={
          styles["checklist-all-current-task-current-subtask-description"]
        }
      >
        {description}
        <span
          className={`${styles["checklist-all-current-task-current-subtask-icons-wrapper"]} subtask-icons-wrapper`}
          style={{ display: displayStyles.NONE }}
        >
          {!subtaskId && (
            <i
              onClick={() => onEditHandler(id)}
              className="fa-solid fa-pen"
            ></i>
          )}
          <i
            onClick={() => onDeleteHandler(taskId, id)}
            className="fa-solid fa-trash"
          ></i>
        </span>
      </p>
    </div>
  );
};

export default SingleSubtask;
