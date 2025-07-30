import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormCategory from "../Form/FormCategory";
import type { CategoryProps } from "../../../../interfaces/CategoryProps";
import type { ErrorProps } from "../../../../interfaces/ErrorProps";
import * as categoriesService from "../../../../services/categories";
import { formNames } from "../../../../utils/constants/global";

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

  const submitHandler = (name: string, image: string): void => {
    categoriesService
      .update(id!, name, image)
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
