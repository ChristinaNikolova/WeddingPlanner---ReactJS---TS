import { useState, useEffect } from "react";
import Input from "../../../shared/Tags/Input/Input";
import ClientError from "../../../shared/Errors/ClientError/ClientError";
import ServerError from "../../../shared/Errors/ServerError/ServerError";
import FormButton from "../../../shared/Buttons/Form/FormButton";
import Bottom from "../../../shared/Images/Bottom/Bottom";
import * as helpers from "../../../../utils/helpers/form";
import * as constants from "../../../../utils/constants/images";
import * as validator from "../../../../utils/validators/category";
import styles from "./FormCategory.module.css";
import type { FormCategoryProps } from "../../../../interfaces/props/categories/FormCategoryProps";

const FormCategory = ({
  formName,
  name,
  image,
  serverError,
  onSubmitHandler,
  onCancelFormHandler,
}: FormCategoryProps) => {
  const [values, setValues] = useState({
    name: name,
    image: image,
  });

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [nameError, setNameError] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");

  useEffect(() => {
    checkDisabled();
  }, [values, nameError, imageError]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const validateName = (): void => {
    setNameError(validator.validName(values.name));
  };

  const validateImage = (): void => {
    setImageError(validator.validImage(values.image));
  };

  const checkDisabled = (): void => {
    setIsDisabled(helpers.isButtonDisabled(values, [nameError, imageError]));
  };

  const onSubmitHelperHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setNameError(validator.validName(values.name));
    setImageError(validator.validImage(values.image));

    if (nameError || imageError) {
      return;
    }

    onSubmitHandler(values.name, values.image);
  };

  return (
    <section className="section-background">
      {serverError && <ServerError errors={serverError} />}
      <div className="section-title-wrapper">
        <h2 className="section-title">{formName} Category</h2>
      </div>
      <div className="form-wrapper-center">
        <form
          onSubmit={onSubmitHelperHandler}
          className={[styles["create-category-form"], "form-width"].join(" ")}
        >
          <div className="form-wrapper">
            <Input
              name="name"
              type="text"
              label="Name"
              value={values.name}
              onChangeHandler={changeHandler}
              onBlurHandler={validateName}
            />
            {nameError && <ClientError message={nameError} />}
          </div>
          <div className="form-wrapper">
            <Input
              name="image"
              type="url"
              label="Image"
              value={values.image}
              onChangeHandler={changeHandler}
              onBlurHandler={validateImage}
            />
            {imageError && <ClientError message={imageError} />}
          </div>
          <FormButton
            formName={formName}
            isDisabled={isDisabled}
            onCancelFormHandler={onCancelFormHandler}
          />
        </form>
        <Bottom
          first={constants.bottom.FIRST}
          second={constants.bottom.SECOND}
          third={constants.bottom.THIRD}
        />
      </div>
    </section>
  );
};

export default FormCategory;
