import { ObjectId } from "./ObjectId";

export interface BaseEntity {
  _id: ObjectId;
  createdAt?: Date;
}
