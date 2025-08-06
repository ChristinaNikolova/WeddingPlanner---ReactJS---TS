import { useState, useEffect } from "react";
import FormNote from "../Form/FormNote";
import FormButton from "../../shared/Buttons/Form/FormButton";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import type { CreateNoteProps } from "../../../interfaces/props/notes/CreateNoteProps";
import type { NoteModel } from "../../../interfaces/models/NoteModel";
import * as notesService from "../../../services/notes";
import { formNames } from "../../../utils/constants/global";

const CreateNote = ({
  plannerId,
  isHidden,
  onCancelFormHandler,
  finish,
}: CreateNoteProps) => {
  const formName = formNames.CREATE;

  const [serverError, setServerError] = useState<ErrorProps[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (inputNote: NoteModel): void => {
    notesService
      .create(plannerId, inputNote)
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

  const onCancelForm = (): void => {
    setServerError([]);
    onCancelFormHandler();
  };

  const checkIsDisabled = (disable: boolean): void => {
    setIsDisabled(!!disable);
  };

  return (
    <>
      {!isHidden && (
        <FormNote
          description={""}
          serverError={serverError}
          onSubmitHandler={onSubmitHandler}
          checkIsDisabled={checkIsDisabled}
        >
          <FormButton
            formName={formName}
            isDisabled={isDisabled}
            onCancelFormHandler={onCancelForm}
          />
        </FormNote>
      )}
    </>
  );
};

export default CreateNote;
