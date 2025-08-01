import { useState, useEffect } from "react";
import FormNote from "../Form/FormNote";
import FormButton from "../../shared/Buttons/Form/FormButton";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import * as notesService from "../../../services/notes";
import { formNames } from "../../../utils/constants/global";

interface CreateNoteProps {
  plannerId: string;
  isHidden: boolean;
  onCancelFormHandler: () => void;
  finish: () => void;
}


// interface FormNoteProps {
//   description: string;
//   serverError: ErrorProps[];
//   children: ReactNode;
//   onSubmitHandler: (description: string) => void;
//   checkIsDisabled: (isDisabled: boolean) => void;
// }

// interface SingleNoteProps {
//   id: string;
//   description: string;
//   createdAt: string;
//   isEditIconHidden: boolean;
//   onDeleteHandler: (noteId: string) => void;
//   onShowFormHandler: (noteId: string) => void;
// }

// interface UpdateNoteProps {
//   noteId: string;
//   plannerId: string;
//   onCancelFormHandler: (event: React.MouseEvent<HTMLElement>) => void;
//   finish: () => void;
// }

function CreateNote({
  plannerId,
  isHidden,
  onCancelFormHandler,
  finish,
}: CreateNoteProps) {
  const formName = formNames.CREATE;
  const [serverError, setServerError] = useState<ErrorProps[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (description: string): void => {
    notesService
      .create(plannerId, description)
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

  function onCancelForm(): void {
    setServerError([]);
    onCancelFormHandler();
  }

  function checkIsDisabled(disable: boolean): void {
    setIsDisabled(!!disable);
  }

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
}

export default CreateNote;
