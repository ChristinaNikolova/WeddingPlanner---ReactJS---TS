import { Document } from "mongoose";
import { ObjectId } from "./ObjectId";

export interface BaseEntry extends Document {
  _id: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
