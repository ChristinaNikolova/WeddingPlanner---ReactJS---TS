import { useState, useEffect } from "react";
import FormGuest from "../Form/FormGuest";
import FormButton from "../../shared/Buttons/Form/FormButton";
import * as guestsService from "../../../services/guests";
import { formNames } from "../../../utils/constants/global";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import type { GuestProps } from "../../../interfaces/props/GuestProps";

interface UpdateGuestProps {
  guestId: string;
  plannerId: string;
  onCancelFormHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  finish: () => void;
}

const UpdateGuest = ({
  guestId,
  plannerId,
  onCancelFormHandler,
  finish,
}: UpdateGuestProps) => {
  const formName = formNames.UPDATE;
  const [serverError, setServerError] = useState<ErrorProps[]>([]);
  const [guest, setGuest] = useState<GuestProps | undefined>(undefined);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    guestsService
      .getById(plannerId, guestId)
      .then((res) => setGuest(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [serverError]);

  // todo type..
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
      .update(
        guestId,
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

  // todo 1 /2 ifs
  if (!guest) {
    return null;
  }

  if (
    !guest.firstName ||
    !guest.lastName ||
    !guest.gender ||
    !guest.age ||
    !guest.side ||
    !guest.role ||
    !guest.mainDish
  ) {
    return null;
  }

  return (
    <FormGuest
      firstName={guest.firstName}
      lastName={guest.lastName}
      gender={guest.gender}
      age={guest.age}
      side={guest.side}
      role={guest.role}
      table={guest.table}
      mainDish={guest.mainDish}
      confirmed={guest.confirmed}
      serverError={serverError}
      onSubmitHandler={onSubmitHandler}
      checkIsDisabled={checkIsDisabled}
    >
      <FormButton
        formName={formName}
        isDisabled={isDisabled}
        onCancelFormHandler={onCancelFormHandler}
      />
    </FormGuest>
  );
};

export default UpdateGuest;
