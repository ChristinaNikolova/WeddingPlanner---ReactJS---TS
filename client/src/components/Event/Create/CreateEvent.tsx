import { useState, useEffect } from "react";
import FormEvent from "../Form/FormEvent";
import FormButton from "../../shared/Buttons/Form/FormButton";
import * as eventsService from "../../../services/events";
import { formNames } from "../../../utils/constants/global";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";

interface CreateEventProps {
  plannerId: string;
  isHidden: boolean;
  onCancelFormHandler: () => void;
  finish: () => void;
}

function CreateEvent({
  plannerId,
  isHidden,
  onCancelFormHandler,
  finish,
}: CreateEventProps) {
  const formName = formNames.CREATE;
  const [serverError, setServerError] = useState<ErrorProps[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (
    title: string,
    startTime: Date,
    endTime: Date,
    duration: number
  ): void => {
    eventsService
      .create(plannerId, title, startTime, endTime, duration)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }
        setServerError([]);
        finish();
      })
      .catch((err) => console.error(err));
  };

  function checkIsDisabled(disable: boolean): void {
    setIsDisabled(!!disable);
  }

  function onCancelForm(): void {
    setServerError([]);
    onCancelFormHandler();
  }

  return (
    <>
      {!isHidden && (
        <FormEvent
          title={""}
          startTime={""}
          endTime={""}
          duration={""}
          serverError={serverError}
          onSubmitHandler={onSubmitHandler}
          checkIsDisabled={checkIsDisabled}
        >
          <FormButton
            formName={formName}
            isDisabled={isDisabled}
            onCancelFormHandler={onCancelForm}
          />
        </FormEvent>
      )}
    </>
  );
}

export default CreateEvent;
