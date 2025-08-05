import type { BaseModel } from "../../models/BaseModel";
import type { CostModel } from "../../models/CostModel";

export interface CostProps extends BaseModel, CostModel {
  category: string;
}
