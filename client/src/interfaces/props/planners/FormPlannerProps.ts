import type { PlannerModel } from "../../models/PlannerModel";
import type { BaseForm } from "../costs/BaseForm";

export interface FormPlannerProps extends BaseForm, PlannerModel {
  onSubmitHandler: (planner: PlannerModel) => void;
  onCancelFormHandler: (event: React.MouseEvent<HTMLElement>) => void;
}
