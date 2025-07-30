import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormCategory from "../Form/FormCategory";
import * as categoriesService from "../../../../services/categories";
import { formNames } from "../../../../utils/constants/global";
import type { CategoryProps } from "../../../../interfaces/CategoryProps";

const UpdateCategory = () => {
  const formName = formNames.UPDATE;
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState<CategoryProps | {}>({});
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    categoriesService
      .getById(id!)
      .then((data) => setCategory(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [serverError]);

  const submitHandler = (name: string, image: string) => {
    categoriesService
      .update(id, name, image)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }

        onCancelFormHandler();
      })
      .catch((err) => console.error(err));
  };

  const onCancelFormHandler = () => {
    navigate("/administration/categories");
  };

  if (!category.name || !category.image) {
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
