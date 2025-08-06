import type { ArticleModel } from "../../models/ArticleModel";
import type { BaseFormProps } from "../shared/Forms/BaseFormProps";

export interface FormArticleProps
  extends BaseFormProps<ArticleModel>,
    ArticleModel {}
