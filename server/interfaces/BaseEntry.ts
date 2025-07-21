import { ObjectId } from "./ObjectId";

export interface BaseEntity {
  id: ObjectId;
  createdAt?: Date;
}
