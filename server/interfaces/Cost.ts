import { BaseEntity } from "./BaseEntry";
import { ObjectId } from "./ObjectId";

export interface Cost extends BaseEntity {
  title: string;
  price: number;
  category: ObjectId;
}
