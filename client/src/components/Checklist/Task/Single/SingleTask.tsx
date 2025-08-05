import type { SingleTaskProps } from "../../../../interfaces/props/tasks/SingleTaskProps";
import { displayStyles, tagNames } from "../../../../utils/constants/global";
import { toggleWithTargetContent } from "../../../../utils/helpers/dropdown";
import styles from "./SingleTask.module.css";

// todo string/number
const SingleTask = ({
  index,
  taskId,
  id,
  title,
  description,
  progress,
  target,
  children,
  onEditHandler,
  onDeleteHandler,
}: SingleTaskProps) => {
  const onMouseEnterHandler = (
    e: React.MouseEvent<HTMLHeadingElement>
  ): void => {
    const target = e.target as HTMLElement;

    if (target.nodeName !== tagNames.H4) {
      return;
    }

    (target.children[0] as HTMLElement).style.display =
      displayStyles.INLINE_BLOCK;
  };

  const onMouseLeaveHandler = (): void => {
    Array.from(
      document.getElementsByClassName("checklist-all-current-task-icons")
    ).forEach((el) => {
      (el as HTMLElement).style.display = displayStyles.NONE;
    });
  };

  const onShowContent = (e: React.MouseEvent<HTMLElement>): void => {
    const targetIcon = e.target as HTMLElement;
    const targetElement = targetIcon?.parentElement?.parentElement
      ?.parentElement?.nextSibling as HTMLElement;
    toggleWithTargetContent(targetElement, targetIcon);
  };

  return (
    <div key={id} className={styles["checklist-all-current-task-wrapper"]}>
      <div className={styles["checklist-all-current-task-header-wrapper"]}>
        <h4
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          className={styles["checklist-all-current-task-header-title"]}
        >
          {title}
          <span
            className="checklist-all-current-task-icons"
            style={{ display: displayStyles.NONE }}
          >
            {!taskId && (
              <i
                onClick={() => onEditHandler(id, index)}
                className="fa-solid fa-pen"
              ></i>
            )}
            <i
              onClick={() => onDeleteHandler(id)}
              className="fa-solid fa-trash"
            ></i>
          </span>
        </h4>
        <div
          className={
            styles["checklist-all-current-task-header-content-wrapper"]
          }
        >
          <div
            className={
              styles[
                "checklist-all-current-task-header-content-progress-wrapper"
              ]
            }
          >
            <span className={styles["checklist-all-current-task-progress"]}>
              {progress}
            </span>
            <span className={styles["checklist-all-current-task-delimiter"]}>
              /
            </span>
            <span className={styles["checklist-all-current-task-target"]}>
              {target}
            </span>
          </div>
          <div
            className={
              styles["checklist-all-current-task-header-content-icon-wrapper"]
            }
          >
            <i
              onClick={onShowContent}
              className="fa-solid fa-chevron-right"
            ></i>
          </div>
        </div>
      </div>
      <div
        className={styles["checklist-all-current-task-info-wrapper"]}
        style={{ display: displayStyles.NONE }}
      >
        <p className={styles["checklist-all-current-task-info-desc"]}>
          {description}
        </p>
        {children}
      </div>
    </div>
  );
};

export default SingleTask;
