import { useState, useEffect } from "react";
import FormCost from "../Form/FormCost";
import FormButton from "../../shared/Buttons/Form/FormButton";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import type { CostProps } from "../../../interfaces/props/CostProps";
import type { UpdateCostProps } from "../../../interfaces/props/costs/UpdateCostProps";
import type { CostModel } from "../../../interfaces/models/CostModel";
import * as costsService from "../../../services/costs";
import { formNames } from "../../../utils/constants/global";

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
    inputCost: CostModel
  ): void => {
    costsService
      .update(costId, inputCost)
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

  const checkIsDisabled = (disable: boolean): void => {
    setIsDisabled(!!disable);
  };

  if (!cost || !cost?.title || !cost?.price) {
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
