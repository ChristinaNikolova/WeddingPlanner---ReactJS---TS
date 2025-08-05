import { useState, useEffect } from "react";
import FormTask from "../Form/FormTask";
import FormButton from "../../../shared/Buttons/Form/FormButton";
import type { ErrorProps } from "../../../../interfaces/props/shared/Errors/ErrorProps";
import type { TaskModel } from "../../../../interfaces/models/TaskModel";
import type { CreateTaskProps } from "../../../../interfaces/props/tasks/CreateTaskProps";
import * as tasksService from "../../../../services/tasks";
import { formNames } from "../../../../utils/constants/global";

const CreateTask = ({
  plannerId,
  timespan,
  onCancelFormHandler,
  finish,
}: CreateTaskProps) => {
  const formName = formNames.CREATE;
  const [serverError, setServerError] = useState<ErrorProps[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [formCanceled, setFormCanceled] = useState<boolean>(false);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (
    e: React.FormEvent<HTMLFormElement>,
    inputTask: TaskModel
  ): void => {
    tasksService
      .create(plannerId, inputTask, timespan)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }
        setFormCanceled(true);
        setServerError([]);
        finish(e);
      })
      .catch((err) => console.error(err));
  };

  const checkIsDisabled = (disable: boolean): void => {
    setFormCanceled(false);
    setIsDisabled(!!disable);
  };

  const onCancelForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setFormCanceled(true);
    setServerError([]);
    onCancelFormHandler(e);
  };

  return (
    <FormTask
      title={""}
      description={""}
      formName={formName}
      serverError={serverError}
      onSubmitHandler={onSubmitHandler}
      checkIsDisabled={checkIsDisabled}
      formCanceled={formCanceled}
    >
      <FormButton
        formName={formName}
        isDisabled={isDisabled}
        onCancelFormHandler={onCancelForm}
      />
    </FormTask>
  );
};

export default CreateTask;
