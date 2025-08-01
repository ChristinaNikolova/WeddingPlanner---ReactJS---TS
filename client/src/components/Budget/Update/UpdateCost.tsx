import { useState, useEffect } from "react";
import FormCost from "../Form/FormCost";
import FormButton from "../../shared/Buttons/Form/FormButton";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import * as costsService from "../../../services/costs";
import { formNames } from "../../../utils/constants/global";
import type { CostProps } from "../../../interfaces/props/CostProps";

// todo interface...
interface UpdateCostProps {
  plannerId: string;
  costId: string;
  // todo check elements here
  onCancelFormHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  finish: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UpdateCost = ({
  plannerId,
  costId,
  onCancelFormHandler,
  finish,
}: UpdateCostProps) => {
  const formName = formNames.UPDATE;
  const [serverError, setServerError] = useState<ErrorProps[]>([]);
  const [cost, setCost] = useState<CostProps | undefined>(undefined);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    costsService
      .getById(plannerId, costId)
      .then((res) => setCost(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [serverError]);

  const onSubmitHandler = (
    e: React.FormEvent<HTMLFormElement>,
    title: string,
    price: string
  ): void => {
    costsService
      .update(costId, title, price)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }
        setServerError([]);
        finish(e);
      })
      .catch((err) => console.error(err));
  };

  function checkIsDisabled(disable: boolean): void {
    setIsDisabled(!!disable);
  }

  if (!cost?.title || !cost?.price) {
    return null;
  }

  return (
    <FormCost
      title={cost.title}
      price={cost.price}
      formName={formName}
      serverError={serverError}
      onSubmitHandler={onSubmitHandler}
      checkIsDisabled={checkIsDisabled}
    >
      <FormButton
        formName={formName}
        isDisabled={isDisabled}
        onCancelFormHandler={onCancelFormHandler}
      />
    </FormCost>
  );
};

export default UpdateCost;
