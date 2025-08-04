import { useState, useEffect } from "react";
import ClientError from "../../shared/Errors/ClientError/ClientError";
import ServerError from "../../shared/Errors/ServerError/ServerError";
import Input from "../../shared/Tags/Input/Input";
import type { CostModel } from "../../../interfaces/models/CostModel";
import type { FormCostProps } from "../../../interfaces/props/costs/FormCostProps";
import * as validator from "../../../utils/validators/cost";
import * as helpers from "../../../utils/helpers/form";
import { formNames, displayStyles } from "../../../utils/constants/global";

const FormCost = ({
  title,
  price,
  formName,
  serverError,
  children,
  formCanceled,
  onSubmitHandler,
  checkIsDisabled,
}: FormCostProps) => {
  const [values, setValues] = useState<CostModel>({
    title,
    price,
  });
  const [titleError, setTitleError] = useState<string>("");
  const [priceError, setPriceError] = useState<string>("");
  const [currentStyle, setCurrentStyle] = useState<string>(displayStyles.NONE);

  useEffect(() => {
    if (formName !== formNames.UPDATE) {
      setValues({
        title: "",
        price: "",
      });
      setTitleError("");
      setPriceError("");
    }
  }, [formCanceled]);

  useEffect(() => {
    if (formName === formNames.UPDATE) {
      setCurrentStyle(displayStyles.FLEX);
    }
  }, []);

  useEffect(() => {
    checkDisabled();
  }, [values, titleError, priceError]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const validateTitle = (): void => {
    setTitleError(validator.validTitle(values.title));
  };

  const validatePrice = (): void => {
    setPriceError(validator.validPrice(Number(values.price)));
  };

  const checkDisabled = (): void => {
    const isDisabled = helpers.isButtonDisabled(values, [
      titleError,
      priceError,
    ]);
    checkIsDisabled(isDisabled);
  };

  const onSubmitHelperHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setTitleError(validator.validTitle(values.title));
    setPriceError(validator.validPrice(Number(values.price)));

    if (titleError || priceError) {
      return;
    }

    const cost = {
      title: values.title,
      price: values.price,
    };

    onSubmitHandler(e, cost);
  };

  return (
    <div className="form-wrapper-center" style={{ display: currentStyle }}>
      <form
        onSubmit={onSubmitHelperHandler}
        className="form-width form-error-message-width"
      >
        {serverError && <ServerError errors={serverError} />}
        <div className="form-wrapper">
          <Input
            name="title"
            type="text"
            label="Title"
            value={values.title}
            onChangeHandler={changeHandler}
            onBlurHandler={validateTitle}
          />
          {titleError && <ClientError message={titleError} />}
        </div>
        <div className="form-wrapper">
          <Input
            name="price"
            type="number"
            label="Price"
            value={values.price}
            onChangeHandler={changeHandler}
            onBlurHandler={validatePrice}
          />
          {priceError && <ClientError message={priceError} />}
        </div>
        {children}
      </form>
    </div>
  );
};

export default FormCost;
