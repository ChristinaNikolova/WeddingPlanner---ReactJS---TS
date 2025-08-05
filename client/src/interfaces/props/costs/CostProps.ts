import type { CostModel } from "../../models/CostModel";
import type { ErrorProps } from "../shared/Errors/ErrorProps";

export interface CostProps extends CostModel {
  id: string;
  category: string;
  message?: ErrorProps[];
}
