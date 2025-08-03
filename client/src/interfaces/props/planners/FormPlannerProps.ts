import type { PlannerModel } from "../../models/PlannerModel";
import type { FormProps } from "../shared/Forms/FormProps";

export interface FormPlannerProps extends FormProps {
  description: string;
  date: string;
  budget: string;
  location: string;
  bride: string;
  groom: string;
  onSubmitHandler: (planner: PlannerModel) => void;
}
