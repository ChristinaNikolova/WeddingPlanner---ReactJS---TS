import { useState, useEffect } from "react";
import FormEvent from "../Form/FormEvent";
import FormButton from "../../shared/Buttons/Form/FormButton";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import type { EventModel } from "../../../interfaces/models/EventModel";
import type { CreateEventProps } from "../../../interfaces/props/events/CreateEventProps";
import * as eventsService from "../../../services/events";
import { formNames } from "../../../utils/constants/global";

const CreateEvent = ({
  plannerId,
  isHidden,
  onCancelFormHandler,
  finish,
}: CreateEventProps) => {
  const formName = formNames.CREATE;

  const [serverError, setServerError] = useState<ErrorProps[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (inputEvent: EventModel): void => {
    eventsService
      .create(plannerId, inputEvent)
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

  const checkIsDisabled = (disable: boolean): void => {
    setIsDisabled(!!disable);
  };

  const onCancelForm = (): void => {
    setServerError([]);
    onCancelFormHandler();
  };

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
};

export default CreateEvent;
