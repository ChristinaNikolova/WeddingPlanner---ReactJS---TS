import { useState, useEffect } from "react";
import ClientError from "../../../shared/Errors/ClientError/ClientError";
import ServerError from "../../../shared/Errors/ServerError/ServerError";
import TextArea from "../../../shared/Tags/TextArea/TextArea";
import type { FormSubtaskProps } from "../../../../interfaces/props/subtasks/FormSubtaskProps";
import type { SubtaskModel } from "../../../../interfaces/models/SubtaskModel";
import * as validator from "../../../../utils/validators/subtask";
import * as helpers from "../../../../utils/helpers/form";
import { formNames, displayStyles } from "../../../../utils/constants/global";

const FormSubtask = ({
  description,
  formName,
  serverError,
  children,
  onSubmitHandler,
  checkIsDisabled,
  formCanceled,
}: FormSubtaskProps) => {
  const [values, setValues] = useState<SubtaskModel>({
    description,
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

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
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
    checkIsDisabled!(isDisabled);
  };

  const onSubmitHelperHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setDescriptionError(validator.validDescription(values.description));

    if (descriptionError) {
      return;
    }

    const subtask = {
      description: values.description,
    };

    onSubmitHandler(e, subtask);
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
