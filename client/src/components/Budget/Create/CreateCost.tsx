import { useState, useEffect } from "react";
import FormCost from "../Form/FormCost";
import FormButton from "../../shared/Buttons/Form/FormButton";
import * as costsService from "../../../services/costs";
import { formNames } from "../../../utils/constants/global";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";

interface CreateCostProps {
  plannerId: string;
  category: string;
  onCancelFormHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  finish: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CreateCost = ({
  plannerId,
  category,
  onCancelFormHandler,
  finish,
}: CreateCostProps) => {
  const formName = formNames.CREATE;
  const [serverError, setServerError] = useState<ErrorProps[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [formCanceled, setFormCanceled] = useState<boolean>(false);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (
    e: React.FormEvent<HTMLFormElement>,
    title: string,
    price: string
  ): void => {
    costsService
      .create(plannerId, title, price, category)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }
        setFormCanceled(true);
        setServerError([]);
        finish(e);
      })
      .catch((err) => console.error(err));
  };

  const checkIsDisabled = (disable: boolean): void => {
    setFormCanceled(false);
    setIsDisabled(!!disable);
  };

  const onCancelForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setFormCanceled(true);
    setServerError([]);
    onCancelFormHandler(e);
  };

  return (
    <FormCost
      title={""}
      price={""}
      formName={formName}
      serverError={serverError}
      onSubmitHandler={onSubmitHandler}
      checkIsDisabled={checkIsDisabled}
      formCanceled={formCanceled}
    >
      <FormButton
        formName={formName}
        isDisabled={isDisabled}
        onCancelFormHandler={onCancelForm}
      />
    </FormCost>
  );
};

export default CreateCost;
