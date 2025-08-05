import type { BaseModel } from "../../models/BaseModel";
import type { SubtaskModel } from "../../models/SubtaskModel";

export interface SubtaskProps extends BaseModel, SubtaskModel {
  isDone: boolean;
}
