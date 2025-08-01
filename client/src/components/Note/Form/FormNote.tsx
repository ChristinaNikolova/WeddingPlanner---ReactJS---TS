import { useState, useEffect, useRef, type ReactNode } from "react";
import ClientError from "../../shared/Errors/ClientError/ClientError";
import ServerError from "../../shared/Errors/ServerError/ServerError";
import TextArea from "../../shared/Tags/TextArea/TextArea";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import * as validator from "../../../utils/validators/note";
import * as helpers from "../../../utils/helpers/form";

// todo add interface
interface FormNoteProps {
  description: string;
  serverError: ErrorProps[];
  children: ReactNode;
  onSubmitHandler: (description: string) => void;
  checkIsDisabled: (isDisabled: boolean) => void;
}

const FormNote = ({
  description,
  serverError,
  children,
  onSubmitHandler,
  checkIsDisabled,
}: FormNoteProps) => {
  // todo add type
  const [values, setValues] = useState({
    description: description,
  });
  const [descriptionError, setDescriptionError] = useState<string>("");

  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!formRef.current) return;
    formRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
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
    checkIsDisabled(isDisabled);
  };

  const onSubmitHelperHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setDescriptionError(validator.validDescription(values.description));

    if (descriptionError) {
      return;
    }

    onSubmitHandler(values.description);
  };

  return (
    <div ref={formRef} className="form-wrapper-center">
      <form
        onSubmit={onSubmitHelperHandler}
        className="form-width form-error-message-width"
      >
        {serverError && <ServerError errors={serverError} />}
        <div className="form-wrapper">
          <TextArea
            name="description"
            label="Note"
            value={values.description}
            rows={10}
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

export default FormNote;
