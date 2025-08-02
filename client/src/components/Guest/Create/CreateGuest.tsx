import { useState, useEffect } from "react";
import FormGuest from "../Form/FormGuest";
import FormButton from "../../shared/Buttons/Form/FormButton";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import * as guestsService from "../../../services/guests";
import { formNames } from "../../../utils/constants/global";

interface CreateGuestProps {
  plannerId: string;
  isHidden: boolean;
  // todo check elements here
  onCancelFormHandler: () => void;
  finish: () => void;
}

function CreateGuest({
  plannerId,
  isHidden,
  onCancelFormHandler,
  finish,
}: CreateGuestProps) {
  const formName = formNames.CREATE;
  const [serverError, setServerError] = useState<ErrorProps[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {}, [serverError]);

  // todo add type here
  const onSubmitHandler = (
    firstName: string,
    lastName: string,
    gender: string,
    age: string,
    side: string,
    role: string,
    table: string,
    mainDish: string,
    confirmed: string
  ): void => {
    guestsService
      .create(
        plannerId,
        firstName,
        lastName,
        gender,
        age,
        side,
        role,
        table,
        mainDish,
        confirmed
      )
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

  function onCancelForm(): void {
    setServerError([]);
    onCancelFormHandler();
  }

  return (
    <>
      {!isHidden && (
        <FormGuest
          firstName={""}
          lastName={""}
          gender={"male"}
          age={"adult"}
          side={"bride"}
          role={"bride"}
          table={""}
          mainDish={"no info"}
          confirmed={""}
          serverError={serverError}
          onSubmitHandler={onSubmitHandler}
          checkIsDisabled={checkIsDisabled}
        >
          <FormButton
            formName={formName}
            isDisabled={isDisabled}
            onCancelFormHandler={onCancelForm}
          />
        </FormGuest>
      )}
    </>
  );
}

export default CreateGuest;
