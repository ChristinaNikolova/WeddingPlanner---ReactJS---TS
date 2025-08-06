import type { CategoryModel } from "../../models/CategoryModel";
import type { BaseFormProps } from "../shared/Forms/BaseFormProps";

export interface FormCategoryProps
  extends BaseFormProps<CategoryModel>,
    CategoryModel {}
