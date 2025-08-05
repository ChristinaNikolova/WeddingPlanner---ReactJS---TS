import type { CostModel } from "../../models/CostModel";

export interface SingleCostProps extends CostModel {
  index: number;
  costId: string;
  id: string;
  onEditHandler: (id: string, index: number) => void;
  onDeleteHandler: (id: string) => void;
}
