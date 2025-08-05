import { useState, useEffect } from "react";
import FormEvent from "../Form/FormEvent";
import FormButton from "../../shared/Buttons/Form/FormButton";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import type { EventProps } from "../../../interfaces/props/events/EventProps";
import type { EventModel } from "../../../interfaces/models/EventModel";
import type { UpdateEventProps } from "../../../interfaces/props/events/UpdateEventProps";
import * as eventsService from "../../../services/events";
import { formNames } from "../../../utils/constants/global";

const UpdateEvent = ({
  eventId,
  plannerId,
  onCancelFormHandler,
  finish,
}: UpdateEventProps) => {
  const formName = formNames.UPDATE;
  const [serverError, setServerError] = useState<ErrorProps[]>([]);
  const [event, setEvent] = useState<EventProps | undefined>(undefined);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    eventsService
      .getById(plannerId, eventId)
      .then((res) => setEvent(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (inputEvent: EventModel): void => {
    eventsService
      .update(eventId, inputEvent)
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

  if (
    !event ||
    !event?.title ||
    !event?.startTime ||
    !event?.endTime ||
    !event?.duration
  ) {
    return null;
  }

  return (
    <FormEvent
      title={event.title}
      startTime={event.startTime}
      endTime={event.endTime}
      duration={event.duration}
      serverError={serverError}
      onSubmitHandler={onSubmitHandler}
      checkIsDisabled={checkIsDisabled}
    >
      <FormButton
        formName={formName}
        isDisabled={isDisabled}
        onCancelFormHandler={onCancelFormHandler}
      />
    </FormEvent>
  );
};

export default UpdateEvent;
