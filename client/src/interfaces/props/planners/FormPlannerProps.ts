import type { PlannerModel } from "../../models/PlannerModel";
import type { BaseFormProps } from "../shared/Forms/BaseFormProps";

export interface FormPlannerProps
  extends BaseFormProps<PlannerModel>,
    PlannerModel {}
