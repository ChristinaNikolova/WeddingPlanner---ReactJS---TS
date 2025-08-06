import { useState, useEffect } from "react";
import FormGuest from "../Form/FormGuest";
import FormButton from "../../shared/Buttons/Form/FormButton";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import type { CreateGuestProps } from "../../../interfaces/props/guests/CreateGuestProps";
import type { GuestModel } from "../../../interfaces/models/GuestModel";
import * as guestsService from "../../../services/guests";
import { formNames, dishes } from "../../../utils/constants/global";

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

  const onSubmitHandler = (inputGuest: GuestModel): void => {
    guestsService
      .create(plannerId, inputGuest)
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
          mainDish={dishes.NO_INFO}
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
