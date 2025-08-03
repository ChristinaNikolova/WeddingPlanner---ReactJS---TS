import { useEffect, useState, type ReactNode } from "react";
import ServerError from "../../../shared/Errors/ServerError/ServerError";
import ClientError from "../../../shared/Errors/ClientError/ClientError";
import Input from "../../../shared/Tags/Input/Input";
import TextArea from "../../../shared/Tags/TextArea/TextArea";
import * as validator from "../../../../utils/validators/task";
import * as helpers from "../../../../utils/helpers/form";
import {
  formNames,
  displayStyles,
  type FormName,
} from "../../../../utils/constants/global";
import type { ErrorProps } from "../../../../interfaces/props/shared/Errors/ErrorProps";

interface FormTaskProps {
  title: string;
  description: string;
  formName: FormName;
  serverError: ErrorProps[];
  children: ReactNode;
  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmitHandler: (e: any, title: string, description: string) => void;
  checkIsDisabled: (isDisabled: boolean) => void;
  formCanceled?: boolean;
}

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
  // todo add type here
  const [values, setValues] = useState({
    title: title,
    description: description,
  });

  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  // todo add type here
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

  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeHandler = (e: any): void => {
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
    checkIsDisabled(isDisabled);
  };

  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitHelperHandler = (e: any): void => {
    e.preventDefault();

    setTitleError(validator.validTitle(values.title));
    setDescriptionError(validator.validDescription(values.description));

    if (titleError || descriptionError) {
      return;
    }

    onSubmitHandler(e, values.title, values.description);
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
