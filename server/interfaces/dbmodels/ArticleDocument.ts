import { BaseEntry } from "../BaseEntry";
import { InputObjectId } from "../InputObjectId";
import { CategoryDocument } from "./CategoryDocument";

export interface ArticleDocument extends BaseEntry {
  title: string;
  content: string;
  image: string;
  jumboImage: string;
  category: InputObjectId | CategoryDocument;
  likes: InputObjectId[];
}
