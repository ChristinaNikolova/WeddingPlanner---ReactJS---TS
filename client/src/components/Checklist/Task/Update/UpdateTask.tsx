import { useState, useEffect } from "react";
import FormTask from "../Form/FormTask";
import FormButton from "../../../shared/Buttons/Form/FormButton";
import * as tasksService from "../../../../services/tasks";
import { formNames } from "../../../../utils/constants/global";
import type { ErrorProps } from "../../../../interfaces/props/shared/Errors/ErrorProps";
import type { TaskProps } from "../../../../interfaces/props/TaskProps";

interface UpdateTaskProps {
  plannerId: string;
  taskId: string;
  onCancelFormHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  finish: (e: any) => void;
}

const UpdateTask = ({
  plannerId,
  taskId,
  onCancelFormHandler,
  finish,
}: UpdateTaskProps) => {
  const formName = formNames.UPDATE;
  const [serverError, setServerError] = useState<ErrorProps[]>([]);
  const [task, setTask] = useState<TaskProps | undefined>(undefined);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    tasksService
      .getById(plannerId, taskId)
      .then((res) => setTask(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (
    // todo any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e: any,
    title: string,
    description: string
  ): void => {
    tasksService
      .update(taskId, title, description)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }
        setServerError([]);
        finish(e);
      })
      .catch((err) => console.error(err));
  };

  const checkIsDisabled = (disable: boolean): void => {
    setIsDisabled(!!disable);
  };

  if (!task || !task.title || !task.description) {
    return null;
  }

  return (
    <FormTask
      title={task.title}
      description={task.description}
      formName={formName}
      serverError={serverError}
      onSubmitHandler={onSubmitHandler}
      checkIsDisabled={checkIsDisabled}
    >
      <FormButton
        formName={formName}
        isDisabled={isDisabled}
        onCancelFormHandler={onCancelFormHandler}
      />
    </FormTask>
  );
};

export default UpdateTask;
