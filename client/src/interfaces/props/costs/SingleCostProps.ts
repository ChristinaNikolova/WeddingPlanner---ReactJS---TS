import type { CostModel } from "../../models/CostModel";

export interface SingleCostProps extends CostModel {
  index: string;
  costId: string;
  id: string;
  onEditHandler: (id: string, index: string) => void;
  onDeleteHandler: (id: string) => void;
}
