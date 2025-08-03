import { useState, useEffect, type ReactNode } from "react";
import ClientError from "../../../shared/Errors/ClientError/ClientError";
import ServerError from "../../../shared/Errors/ServerError/ServerError";
import TextArea from "../../../shared/Tags/TextArea/TextArea";
import * as validator from "../../../../utils/validators/subtask";
import * as helpers from "../../../../utils/helpers/form";
import {
  formNames,
  displayStyles,
  type FormName,
} from "../../../../utils/constants/global";
import type { ErrorProps } from "../../../../interfaces/props/shared/Errors/ErrorProps";

// todo interface...
interface FormSubtaskProps {
  description: string;
  formName: FormName;
  serverError: ErrorProps[];
  children: ReactNode;
  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmitHandler: (e: any, id: string) => void;
  checkIsDisabled: (isDisabled: boolean) => void;
  formCanceled?: boolean;
}

const FormSubtask = ({
  description,
  formName,
  serverError,
  children,
  onSubmitHandler,
  checkIsDisabled,
  formCanceled,
}: FormSubtaskProps) => {
  // todo add type
  const [values, setValues] = useState({
    description: description,
  });
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [currentStyle, setCurrentStyle] = useState<string>(displayStyles.NONE);

  useEffect(() => {
    if (formName !== formNames.UPDATE) {
      setValues({
        description: "",
      });
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
  }, [values, descriptionError]);

  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeHandler = (e: any): void => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const validateDescription = (): void => {
    setDescriptionError(validator.validDescription(values.description));
  };

  const checkDisabled = (): void => {
    const isDisabled = helpers.isButtonDisabled(values, [descriptionError]);
    checkIsDisabled(isDisabled);
  };

  // todo any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitHelperHandler = (e: any): void => {
    e.preventDefault();

    setDescriptionError(validator.validDescription(values.description));

    if (descriptionError) {
      return;
    }

    onSubmitHandler(e, values.description);
  };

  return (
    <div className="form-wrapper-center" style={{ display: currentStyle }}>
      <form
        onSubmit={onSubmitHelperHandler}
        className="form-width form-error-message-width"
      >
        {serverError && <ServerError errors={serverError} />}
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

export default FormSubtask;
