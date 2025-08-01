import { useState, useEffect, useRef, type ReactNode } from "react";
import ServerError from "../../shared/Errors/ServerError/ServerError";
import ClientError from "../../shared/Errors/ClientError/ClientError";
import Input from "../../shared/Tags/Input/Input";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import { getDifference, parseDate } from "../../../utils/helpers/datetime";
import * as validator from "../../../utils/validators/event";
import * as helpers from "../../../utils/helpers/form";
import styles from "./FormEvent.module.css";

// todo add interfeca for submit handler
interface FormEventProps {
  title: string;
  startTime: string;
  endTime: string;
  duration: string;
  serverError: ErrorProps[];
  children: ReactNode;
  onSubmitHandler: (
    title: string,
    startTime: Date,
    endTime: Date,
    duration: number
  ) => void;
  checkIsDisabled: (disable: boolean) => void;
}

function FormEvent({
  title,
  startTime,
  endTime,
  duration,
  serverError,
  children,
  onSubmitHandler,
  checkIsDisabled,
}: FormEventProps) {
  // todo add interface
  const [values, setValues] = useState({
    title: title,
    startTime: startTime,
    endTime: endTime,
    duration: duration,
  });

  const [titleError, setTitleError] = useState<string>("");
  const [startTimeError, setStartTimeError] = useState<string>("");
  const [endTimeError, setEndTimeError] = useState<string>("");

  const durationRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!formRef.current) return;
    formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (values.startTime && values.endTime) {
      const [hours, minutes] = getDifference(values.startTime, values.endTime);

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
    setStartTimeError(validator.validTime(values.startTime, values.endTime));
  };

  const validateEndTime = (): void => {
    setEndTimeError(validator.validTime(values.startTime, values.endTime));
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
    setStartTimeError(validator.validTime(values.startTime, values.endTime));
    setEndTimeError(validator.validTime(values.startTime, values.endTime));

    if (titleError || startTimeError || endTimeError) {
      return;
    }

    onSubmitHandler(
      values.title,
      parseDate(values.startTime),
      parseDate(values.endTime),
      Number(values.duration)
    );
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
            value={values.startTime}
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
            value={values.endTime}
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
}

export default FormEvent;
