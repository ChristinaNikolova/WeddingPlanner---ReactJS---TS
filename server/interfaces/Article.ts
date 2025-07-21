import { BaseEntity } from "./BaseEntry";
import { ObjectId } from "./ObjectId";

export interface Article extends BaseEntity {
  title: string;
  content: string;
  image: string;
  jumboImage: string;
  category: ObjectId;
  likes: ObjectId[];
}
