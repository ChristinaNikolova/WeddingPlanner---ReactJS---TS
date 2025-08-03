import { useState, useEffect, useRef } from "react";
import ServerError from "../../shared/Errors/ServerError/ServerError";
import ClientError from "../../shared/Errors/ClientError/ClientError";
import Input from "../../shared/Tags/Input/Input";
import type { FormEventProps } from "../../../interfaces/props/events/FormEventProps";
import type { EventModel } from "../../../interfaces/models/EventModel";
import { getDifference, parseDate } from "../../../utils/helpers/datetime";
import * as validator from "../../../utils/validators/event";
import * as helpers from "../../../utils/helpers/form";
import styles from "./FormEvent.module.css";

const FormEvent = ({
  title,
  startTime,
  endTime,
  duration,
  serverError,
  children,
  onSubmitHandler,
  checkIsDisabled,
}: FormEventProps) => {
  const durationRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  const [values, setValues] = useState<EventModel>({
    title,
    startTime,
    endTime,
    duration,
  });
  const [titleError, setTitleError] = useState<string>("");
  const [startTimeError, setStartTimeError] = useState<string>("");
  const [endTimeError, setEndTimeError] = useState<string>("");

  useEffect(() => {
    if (!formRef.current) return;
    formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (values.startTime && values.endTime) {
      const [hours, minutes] = getDifference(
        values.startTime as string,
        values.endTime as string
      );

      if (!durationRef.current) return;
      durationRef.current.value = `${hours}:${minutes}`;
      values.duration = `${hours}:${minutes}`;
    }

    checkDisabled();
  }, [values, titleError, startTimeError, endTimeError]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const validateTitle = (): void => {
    setTitleError(validator.validTitle(values.title));
  };

  const validateStartTime = (): void => {
    setStartTimeError(
      validator.validTime(values.startTime as string, values.endTime as string)
    );
  };

  const validateEndTime = (): void => {
    setEndTimeError(
      validator.validTime(values.startTime as string, values.endTime as string)
    );
  };

  const checkDisabled = (): void => {
    const isDisabled = helpers.isButtonDisabled(values, [
      titleError,
      startTimeError,
      endTimeError,
    ]);
    checkIsDisabled(isDisabled);
  };

  const onSubmitHelperHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setTitleError(validator.validTitle(values.title));
    setStartTimeError(
      validator.validTime(values.startTime as string, values.endTime as string)
    );
    setEndTimeError(
      validator.validTime(values.startTime as string, values.endTime as string)
    );

    if (titleError || startTimeError || endTimeError) {
      return;
    }

    const event: EventModel = {
      title: values.title,
      startTime: parseDate(values.startTime as string),
      endTime: parseDate(values.endTime as string),
      duration: values.duration,
    };

    onSubmitHandler(event);
  };

  return (
    <div ref={formRef} className="form-wrapper-center">
      <form
        onSubmit={onSubmitHelperHandler}
        className={[styles["event-form"], "form-error-message-width"].join(" ")}
      >
        {serverError && <ServerError errors={serverError} />}
        <div className="form-wrapper">
          <Input
            name="title"
            type="text"
            label="Title"
            value={values.title}
            onChangeHandler={changeHandler}
            onBlurHandler={validateTitle}
          />
          {titleError && <ClientError message={titleError} />}
        </div>
        <div className="form-wrapper">
          <Input
            name="startTime"
            type="time"
            label="Start Time"
            value={values.startTime as string}
            onChangeHandler={changeHandler}
            onBlurHandler={validateStartTime}
          />
          {startTimeError && <ClientError message={startTimeError} />}
        </div>
        <div className="form-wrapper">
          <Input
            name="endTime"
            type="time"
            label="End Time"
            value={values.endTime as string}
            onChangeHandler={changeHandler}
            onBlurHandler={validateEndTime}
          />
          {endTimeError && <ClientError message={endTimeError} />}
        </div>
        <div className="form-wrapper">
          <label className="label" htmlFor="duration">
            Duration
          </label>
          <input
            ref={durationRef}
            className="input"
            id="duration"
            name="duration"
            type="text"
            readOnly
          />
        </div>
        {children}
      </form>
    </div>
  );
};

export default FormEvent;
