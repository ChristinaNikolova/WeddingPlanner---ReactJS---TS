import { useState, useEffect } from "react";
import FormSubtask from "../Form/FormSubtask";
import FormButton from "../../../shared/Buttons/Form/FormButton";
import type { ErrorProps } from "../../../../interfaces/props/shared/Errors/ErrorProps";
import type { CreateSubtaskProps } from "../../../../interfaces/props/subtasks/CreateSubtaskProps";
import * as subtasksService from "../../../../services/subtasks";
import { formNames } from "../../../../utils/constants/global";
import type { SubtaskModel } from "../../../../interfaces/models/SubtaskModel";

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

  const onSubmitHandler = (
    e: React.FormEvent<HTMLFormElement>,
    subtask: SubtaskModel
  ): void => {
    subtasksService
      .create(taskId, subtask)
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
    onCancelFormHandler!(e);
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
