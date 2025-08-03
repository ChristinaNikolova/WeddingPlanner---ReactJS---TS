import { useState, useEffect } from "react";
import FormSubtask from "../Form/FormSubtask";
import FormButton from "../../../shared/Buttons/Form/FormButton";
import * as subtasksService from "../../../../services/subtasks";
import { formNames } from "../../../../utils/constants/global";
import type { ErrorProps } from "../../../../interfaces/props/shared/Errors/ErrorProps";
import type { SubtaskProps } from "../../../../interfaces/props/SubtaskProps";

interface UpdateSubtaskProps {
  subtaskId: string;
  onCancelFormHelperHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  // todo check type here
  finish: (test: string) => void;
}

const UpdateSubtask = ({
  subtaskId,
  onCancelFormHelperHandler,
  finish,
}: UpdateSubtaskProps) => {
  const formName = formNames.UPDATE;
  const [serverError, setServerError] = useState<ErrorProps[]>([]);
  const [subtask, setSubtask] = useState<SubtaskProps | undefined>(undefined);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    subtasksService
      .getById(subtaskId)
      .then((res) => setSubtask(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [serverError]);

  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitHandler = (e: any, description: string): void => {
    subtasksService
      .update(subtaskId, description)
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

  function checkIsDisabled(disable: boolean): void {
    setIsDisabled(!!disable);
  }

  if (!subtask || !subtask.description) {
    return null;
  }

  return (
    <FormSubtask
      description={subtask.description}
      formName={formName}
      serverError={serverError}
      onSubmitHandler={onSubmitHandler}
      checkIsDisabled={checkIsDisabled}
    >
      <FormButton
        formName={formName}
        isDisabled={isDisabled}
        onCancelFormHandler={onCancelFormHelperHandler}
      />
    </FormSubtask>
  );
};

export default UpdateSubtask;
