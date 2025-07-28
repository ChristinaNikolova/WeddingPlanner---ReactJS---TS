import { BaseEntry } from "./BaseEntry";
import { InputObjectId } from "./InputObjectId";

export interface CostDocument extends BaseEntry {
  title: string;
  price: number;
  category: InputObjectId;
}
