import type { CostModel } from "../../models/CostModel";
import type { BaseFormProps } from "../shared/Forms/BaseFormProps";

export interface FormCostProps extends BaseFormProps<CostModel>, CostModel {
  formCanceled?: boolean;
}
