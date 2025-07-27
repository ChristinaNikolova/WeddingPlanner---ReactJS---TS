import { BaseEntry } from "./BaseEntry";
import { InputObjectId } from "./InputObjectId";
import { CategoryDocument } from "./CategoryDocument";

export interface CostDocument extends BaseEntry {
  title: string;
  price: number;
  // todo do I need both here
  category: InputObjectId | CategoryDocument;
}
