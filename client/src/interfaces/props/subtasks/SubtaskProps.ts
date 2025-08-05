import type { SubtaskModel } from "../../models/SubtaskModel";
import type { ErrorProps } from "../shared/Errors/ErrorProps";

export interface SubtaskProps extends SubtaskModel {
  id: string;
  isDone: boolean;
  message?: ErrorProps[];
}
