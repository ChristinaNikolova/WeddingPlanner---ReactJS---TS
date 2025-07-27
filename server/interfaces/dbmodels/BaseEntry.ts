import { Document } from "mongoose";
import { InputObjectId } from "./InputObjectId";

export interface BaseEntry extends Document {
  _id: InputObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
