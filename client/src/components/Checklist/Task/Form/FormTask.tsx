import { useEffect, useState } from "react";
import ServerError from "../../../shared/Errors/ServerError/ServerError";
import ClientError from "../../../shared/Errors/ClientError/ClientError";
import Input from "../../../shared/Tags/Input/Input";
import TextArea from "../../../shared/Tags/TextArea/TextArea";
import type { FormTaskProps } from "../../../../interfaces/props/tasks/FormTaskProps";
import type { TaskModel } from "../../../../interfaces/models/TaskModel";
import * as validator from "../../../../utils/validators/task";
import * as helpers from "../../../../utils/helpers/form";
import { formNames, displayStyles } from "../../../../utils/constants/global";

const FormTask = ({
  title,
  description,
  formName,
  serverError,
  children,
  onSubmitHandler,
  checkIsDisabled,
  formCanceled,
}: FormTaskProps) => {
  const [values, setValues] = useState<TaskModel>({
    title,
    description,
  });
  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [currentStyle, setCurrentStyle] = useState<string>(displayStyles.NONE);

  useEffect(() => {
    if (formName !== formNames.UPDATE) {
      setValues({
        title: "",
        description: "",
      });
      setTitleError("");
      setDescriptionError("");
    }
  }, [formCanceled]);

  useEffect(() => {
    if (formName === formNames.UPDATE) {
      setCurrentStyle(displayStyles.FLEX);
    }
  }, []);

  useEffect(() => {
    checkDisabled();
  }, [values, titleError, descriptionError]);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const validateTitle = (): void => {
    setTitleError(validator.validTitle(values.title));
  };

  const validateDescription = (): void => {
    setDescriptionError(validator.validDescription(values.description));
  };

  const checkDisabled = (): void => {
    const isDisabled = helpers.isButtonDisabled(values, [
      titleError,
      descriptionError,
    ]);
    checkIsDisabled!(isDisabled);
  };

  const onSubmitHelperHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setTitleError(validator.validTitle(values.title));
    setDescriptionError(validator.validDescription(values.description));

    if (titleError || descriptionError) {
      return;
    }

    const task = {
      title: values.title,
      description: values.description,
    };

    onSubmitHandler(e, task);
  };

  return (
    <div className="form-wrapper-center" style={{ display: currentStyle }}>
      <form
        onSubmit={onSubmitHelperHandler}
        className="form-width form-error-message-width"
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
          <TextArea
            name="description"
            label="Description"
            value={values.description}
            rows={4}
            onChangeHandler={changeHandler}
            onBlurHandler={validateDescription}
          />
          {descriptionError && <ClientError message={descriptionError} />}
        </div>
        {children}
      </form>
    </div>
  );
};

export default FormTask;
