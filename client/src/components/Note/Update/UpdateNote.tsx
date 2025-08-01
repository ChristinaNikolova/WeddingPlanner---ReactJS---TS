import { useState, useEffect } from "react";
import FormNote from "../Form/FormNote";
import FormButton from "../../shared/Buttons/Form/FormButton";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import type { NoteProps } from "../../../interfaces/props/NoteProps";
import * as notesService from "../../../services/notes";
import { formNames } from "../../../utils/constants/global";

// todo reorder interfaces
interface UpdateNoteProps {
  noteId: string;
  plannerId: string;
  onCancelFormHandler: (event: React.MouseEvent<HTMLElement>) => void;
  finish: () => void;
}

const UpdateNote = ({
  noteId,
  plannerId,
  onCancelFormHandler,
  finish,
}: UpdateNoteProps) => {
  const formName = formNames.UPDATE;
  const [serverError, setServerError] = useState<ErrorProps[]>([]);
  const [note, setNote] = useState<NoteProps | undefined>(undefined);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    notesService
      .getById(plannerId, noteId)
      .then((res) => setNote(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (description: string): void => {
    notesService
      .update(noteId, description)
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

  function checkIsDisabled(disable: boolean): void {
    setIsDisabled(!!disable);
  }

  if (!note?.description) {
    return null;
  }

  return (
    <FormNote
      description={note.description}
      serverError={serverError}
      onSubmitHandler={onSubmitHandler}
      checkIsDisabled={checkIsDisabled}
    >
      <FormButton
        formName={formName}
        isDisabled={isDisabled}
        onCancelFormHandler={onCancelFormHandler}
      />
    </FormNote>
  );
};

export default UpdateNote;
