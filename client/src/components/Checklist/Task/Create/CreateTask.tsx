import { useState, useEffect } from "react";
import FormTask from "../Form/FormTask";
import FormButton from "../../../shared/Buttons/Form/FormButton";
import * as tasksService from "../../../../services/tasks";
import { formNames } from "../../../../utils/constants/global";
import type { ErrorProps } from "../../../../interfaces/props/shared/Errors/ErrorProps";

interface CreateTaskProps {
  plannerId: string;
  timespan: string;
  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCancelFormHandler: (e: any) => void;
  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  finish: (e: any) => void;
}

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
    // todo any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e: any,
    title: string,
    description: string
  ): void => {
    tasksService
      .create(plannerId, title, description, timespan)
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

  function checkIsDisabled(disable: boolean): void {
    setFormCanceled(false);
    setIsDisabled(!!disable);
  }

  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCancelForm = (e: any): void => {
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
