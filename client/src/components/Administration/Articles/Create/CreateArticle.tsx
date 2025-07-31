import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormArticle from "../Form/FormArticle";
import * as articlesService from "../../../../services/articles";
import { formNames } from "../../../../utils/constants/global";
import type { ErrorProps } from "../../../../interfaces/props/shared/ErrorProps";
import type { CreateArticle } from "../../../../interfaces/props/articles/CreateArticle";

const CreateArticle = () => {
  const formName = formNames.CREATE;
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<ErrorProps[]>([]);

  useEffect(() => {}, [serverError]);

  const submitHandler = (article: CreateArticle): void => {
    articlesService
      .create(
        article.title,
        article.content,
        article.image,
        article.jumboImage,
        article.category
      )
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }
        // todo test _id
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
