import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormCategory from "../Form/FormCategory";
import type { ErrorProps } from "../../../../interfaces/props/shared/Errors/ErrorProps";
import type { CategoryModel } from "../../../../interfaces/models/CategoryModel";
import * as categoriesService from "../../../../services/categories";
import { formNames } from "../../../../utils/constants/global";

const CreateCategory = () => {
  const formName = formNames.CREATE;
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<ErrorProps[]>([]);

  useEffect(() => {}, [serverError]);

  const submitHandler = (inputCategory: CategoryModel): void => {
    categoriesService
      .create(inputCategory)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }
        navigate("/administration/categories");
      })
      .catch((err) => console.error(err));
  };

  const onCancelFormHandler = (): void => {
    navigate("/administration/categories");
  };

  return (
    <FormCategory
      formName={formName}
      name={""}
      image={""}
      serverError={serverError}
      onSubmitHandler={submitHandler}
      onCancelFormHandler={onCancelFormHandler}
    />
  );
};

export default CreateCategory;
