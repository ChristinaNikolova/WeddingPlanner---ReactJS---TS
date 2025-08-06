import { useState, useEffect } from "react";
import FormCost from "../Form/FormCost";
import FormButton from "../../shared/Buttons/Form/FormButton";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import type { CostModel } from "../../../interfaces/models/CostModel";
import type { CreateCostProps } from "../../../interfaces/props/costs/CreateCostProps";
import * as costsService from "../../../services/costs";
import { formNames } from "../../../utils/constants/global";

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
    inputCost: CostModel,
    e?: React.FormEvent<HTMLFormElement>
  ): void => {
    costsService
      .create(plannerId, inputCost, category)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }
        setFormCanceled(true);
        setServerError([]);
        finish(e!);
      })
      .catch((err) => console.error(err));
  };

  const checkIsDisabled = (isDisabled: boolean): void => {
    setFormCanceled(false);
    setIsDisabled(!!isDisabled);
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
