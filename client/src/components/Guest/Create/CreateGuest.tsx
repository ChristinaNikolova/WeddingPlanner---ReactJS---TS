import { useState, useEffect } from "react";
import FormGuest from "../Form/FormGuest";
import FormButton from "../../shared/Buttons/Form/FormButton";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import type { CreateGuestProps } from "../../../interfaces/props/guests/CreateGuestProps";
import * as guestsService from "../../../services/guests";
import { formNames } from "../../../utils/constants/global";
import type { GuestModel } from "../../../interfaces/models/GuestModel";

const CreateGuest = ({
  plannerId,
  isHidden,
  onCancelFormHandler,
  finish,
}: CreateGuestProps) => {
  const formName = formNames.CREATE;
  const [serverError, setServerError] = useState<ErrorProps[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (guestInput: GuestModel): void => {
    guestsService
      .create(plannerId, guestInput)
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

  const checkIsDisabled = (disable: boolean): void => {
    setIsDisabled(!!disable);
  };

  const onCancelForm = (): void => {
    setServerError([]);
    onCancelFormHandler();
  };

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
};

export default CreateGuest;
