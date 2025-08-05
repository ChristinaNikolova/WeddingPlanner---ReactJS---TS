import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SingleTask from "../Single/SingleTask";
import CreateTask from "../Create/CreateTask";
import UpdateTask from "../Update/UpdateTask";
import AddButton from "../../../shared/Buttons/Add/AddButton";
import SubtasksAll from "../../Subtask/All/SubtasksAll";
import type { TaskProps } from "../../../../interfaces/props/tasks/TaskProps";
import {
  timespans,
  displayStyles,
  addButtonTexts,
} from "../../../../utils/constants/global";
import { cancelForm } from "../../../../utils/helpers/form";
import * as tasksService from "../../../../services/tasks";
import styles from "./TasksAll.module.css";

const ChecklistAll = () => {
  const { id: plannerId } = useParams();
  const tasksAllRef = useRef<HTMLElement | null>(null);

  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [taskId, setTaskId] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<string>("");
  const [timespan, setTimespan] = useState<string>("");

  useEffect(() => {
    loadTasks();
    if (tasksAllRef.current) {
      tasksAllRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  const onShowTaskFormHandler = (e: React.MouseEvent<HTMLElement>): void => {
    const target = e.target as HTMLElement;
    const targetFormElement = target.parentElement?.parentElement
      ?.nextSibling as HTMLElement;
    targetFormElement.style.display = displayStyles.FLEX;

    const timeSpanValue = (
      (targetFormElement?.previousSibling as HTMLElement)
        ?.children[0] as HTMLElement
    ).innerText.toLowerCase();
    setTimespan(timeSpanValue);
  };

  const onCancelFormHandler = (e: React.SyntheticEvent<HTMLElement>): void => {
    cancelForm(e.target as HTMLElement);
    setTaskId("");
    setCurrentIndex("");
  };

  const onDeleteHandler = (id: string): void => {
    tasksService
      .deleteById(id)
      .then(() => loadTasks())
      .catch((err) => console.error(err));
  };

  const onEditHandler = (id: string, index: number): void => {
    setTaskId(id);
    setCurrentIndex(index.toString());
  };

  const loadTasks = (): void => {
    tasksService
      .all(plannerId!)
      .then((res) => setTasks(res))
      .catch((err) => console.error(err));
  };

  const finish = (e: React.FormEvent<HTMLFormElement>): void => {
    onCancelFormHandler(e);
    loadTasks();
  };

  return (
    <section
      ref={tasksAllRef}
      id={styles["checklist-all"]}
      className="section-planner section-background"
    >
      <div className="section-title-wrapper">
        <h2 className="section-title">The big day</h2>
      </div>
      <div className={styles["checklist-all-main-content-wrapper"]}>
        {timespans.map((time, index) => (
          <div key={index} className={styles["checklist-all-timespan-wrapper"]}>
            <div className={styles["checklist-all-timespan-content-wrapper"]}>
              <div className={styles["checklist-all-timespan-title-wrapper"]}>
                <p className={styles["checklist-all-timespan"]}>{time}</p>
                {!taskId && (
                  <AddButton
                    classNames={[]}
                    text={addButtonTexts.TASK}
                    isEmptyString={false}
                    onShowFormHandler={onShowTaskFormHandler}
                  />
                )}
              </div>
              {taskId && index === Number(currentIndex) && (
                <UpdateTask
                  plannerId={plannerId!}
                  taskId={taskId}
                  onCancelFormHandler={onCancelFormHandler}
                  finish={finish}
                />
              )}
              {!taskId && (
                <CreateTask
                  plannerId={plannerId!}
                  timespan={timespan}
                  onCancelFormHandler={onCancelFormHandler}
                  finish={finish}
                />
              )}
              <div className={styles["checklist-all-line"]}></div>
              <div className={styles["checklist-all-tasks-content-wrapper"]}>
                {tasks.filter((t) => t.timespan === time).length > 0 ? (
                  tasks
                    .filter((t) => t.timespan === time)
                    .map((t) => (
                      <SingleTask
                        key={t.id}
                        index={index}
                        taskId={taskId}
                        id={t.id}
                        title={t.title}
                        description={t.description}
                        progress={t.progress}
                        target={t.target}
                        onEditHandler={onEditHandler}
                        onDeleteHandler={onDeleteHandler}
                      >
                        <SubtasksAll
                          taskId={t.id}
                          subtasks={t.subtasks}
                          onCancelFormHandler={onCancelFormHandler}
                          loadTasks={loadTasks}
                        />
                      </SingleTask>
                    ))
                ) : (
                  <p className={styles["checklist-all-empty-tasks"]}>
                    No tasks yet
                  </p>
                )}
              </div>
            </div>
            <p className={styles["checklist-all-end-content"]}>***</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChecklistAll;
