import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormCategory from "../Form/FormCategory";
import * as categoriesService from "../../../../services/categories";
import { formNames } from "../../../../utils/constants/global";
import type { ErrorProps } from "../../../../interfaces/props/shared/ErrorProps";
import type { CategoryProps } from "../../../../interfaces/props/categories/CategoryProps";
import type { CreateCategory } from "../../../../interfaces/props/categories/CreateCategory";

const UpdateCategory = () => {
  const formName = formNames.UPDATE;
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState<CategoryProps | undefined>(
    undefined
  );
  const [serverError, setServerError] = useState<ErrorProps[]>([]);

  useEffect(() => {
    categoriesService
      .getById(id!)
      .then((data) => setCategory(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [serverError]);

  const submitHandler = (category: CreateCategory): void => {
    categoriesService
      .update(id!, category.name, category.image)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }

        onCancelFormHandler();
      })
      .catch((err) => console.error(err));
  };

  const onCancelFormHandler = (): void => {
    navigate("/administration/categories");
  };

  if (!category || !category.name || !category.image) {
    return null;
  }

  return (
    <FormCategory
      formName={formName}
      name={category.name}
      image={category.image}
      serverError={serverError}
      onSubmitHandler={submitHandler}
      onCancelFormHandler={onCancelFormHandler}
    />
  );
};

export default UpdateCategory;
