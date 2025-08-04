import { useState, useEffect, useRef } from "react";
import ClientError from "../../shared/Errors/ClientError/ClientError";
import ServerError from "../../shared/Errors/ServerError/ServerError";
import TextArea from "../../shared/Tags/TextArea/TextArea";
import type { FormNoteProps } from "../../../interfaces/props/notes/FormNoteProps";
import type { NoteModel } from "../../../interfaces/models/NoteModel";
import * as validator from "../../../utils/validators/note";
import * as helpers from "../../../utils/helpers/form";

const FormNote = ({
  description,
  serverError,
  children,
  onSubmitHandler,
  checkIsDisabled,
}: FormNoteProps) => {
  const formRef = useRef<HTMLDivElement | null>(null);
  const [values, setValues] = useState<NoteModel>({
    description,
  });
  const [descriptionError, setDescriptionError] = useState<string>("");

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

    const note = {
      description: values.description,
    };

    onSubmitHandler(note);
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
