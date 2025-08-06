import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormArticle from "../Form/FormArticle";
import type { ErrorProps } from "../../../../interfaces/props/shared/Errors/ErrorProps";
import type { ArticleModel } from "../../../../interfaces/models/ArticleModel";
import * as articlesService from "../../../../services/articles";
import { formNames } from "../../../../utils/constants/global";

const CreateArticle = () => {
  const formName = formNames.CREATE;
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<ErrorProps[]>([]);

  useEffect(() => {}, [serverError]);

  const submitHandler = (inputArticle: ArticleModel): void => {
    articlesService
      .create(inputArticle)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }
        navigate(`/blog/${data.id}`);
      })
      .catch((err) => console.error(err));
  };

  const onCancelFormHandler = (): void => {
    navigate(`/blog`);
  };

  return (
    <FormArticle
      formName={formName}
      title={""}
      content={""}
      image={""}
      jumboImage={""}
      category={""}
      serverError={serverError}
      onSubmitHandler={submitHandler}
      onCancelFormHandler={onCancelFormHandler}
    />
  );
};

export default CreateArticle;
