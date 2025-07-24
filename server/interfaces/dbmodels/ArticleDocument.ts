import { BaseEntry } from "../BaseEntry";
import { ObjectId } from "../ObjectId";
import { CategoryDocument } from "./CategoryDocument";

export interface ArticleDocument extends BaseEntry {
  title: string;
  content: string;
  image: string;
  jumboImage: string;
  // todo ???  CategoryDocument | ObjectId ???
  category: CategoryDocument;
  likes: ObjectId[] ;
}
