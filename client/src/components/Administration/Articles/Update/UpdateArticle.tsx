import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import FormArticle from "../Form/FormArticle";
import * as articlesService from "../../../../services/articles";
import { formNames } from "../../../../utils/constants/global";
import type { ErrorProps } from "../../../../interfaces/props/shared/ErrorProps";
import type { ArticleDetailsProps } from "../../../../interfaces/props/articles/ArticleDetailsProps";
import type { ArticleModel } from "../../../../interfaces/props/models/ArticleModel";

const UpdateArticle = () => {
  const formName = formNames.UPDATE;
  const navigate = useNavigate();
  const { id } = useParams();

  const [article, setArticle] = useState<ArticleDetailsProps | undefined>(
    undefined
  );
  const [serverError, setServerError] = useState<ErrorProps[]>([]);

  useEffect(() => {
    articlesService
      .getById(id!)
      .then((data) => setArticle(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [serverError]);

  // todo now update this everywhere....
  const submitHandler = (article: ArticleModel): void => {
    articlesService
      .update(id!, article)
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
    navigate(`/blog/${id}`);
  };

  if (
    !article ||
    !article.title ||
    !article.content ||
    !article.image ||
    !article.jumboImage ||
    !article.category
  ) {
    return null;
  }

  return (
    <FormArticle
      formName={formName}
      title={article.title}
      content={article.content.join(" ")}
      image={article.image}
      jumboImage={article.jumboImage}
      category={article.category}
      serverError={serverError}
      onSubmitHandler={submitHandler}
      onCancelFormHandler={onCancelFormHandler}
    />
  );
};

export default UpdateArticle;
