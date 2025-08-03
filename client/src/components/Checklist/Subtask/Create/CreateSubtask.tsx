import { useState, useEffect } from "react";
import FormSubtask from "../Form/FormSubtask";
import FormButton from "../../../shared/Buttons/Form/FormButton";
import * as subtasksService from "../../../../services/subtasks";
import { formNames } from "../../../../utils/constants/global";
import type { ErrorProps } from "../../../../interfaces/props/shared/Errors/ErrorProps";

interface CreateSubtaskProps {
  taskId: string;
  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCancelFormHandler: (e: any) => void;
  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  finish: (e: any) => void;
}

const CreateSubtask = ({
  taskId,
  onCancelFormHandler,
  finish,
}: CreateSubtaskProps) => {
  const formName = formNames.CREATE;
  const [serverError, setServerError] = useState<ErrorProps[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [formCanceled, setFormCanceled] = useState<boolean>(false);

  useEffect(() => {}, [serverError]);

  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitHandler = (e: any, description: string): void => {
    subtasksService
      .create(taskId, description)
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

  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCancelForm = (e: any): void => {
    setFormCanceled(true);
    setServerError([]);
    onCancelFormHandler(e);
  };

  return (
    <FormSubtask
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
    </FormSubtask>
  );
};

export default CreateSubtask;
