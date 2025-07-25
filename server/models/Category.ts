import { Schema, model } from "mongoose";
import { CategoryDocument } from "../interfaces/dbmodels/CategoryDocument";
import modelConstants from "../utils/constants/model";

const { category } = modelConstants;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [
      category.NAME_MIN_LEN,
      `Name should be at least ${category.NAME_MIN_LEN} characters long`,
    ],
    maxlength: [
      category.NAME_MAX_LEN,
      `Name should be maximal ${category.NAME_MAX_LEN} characters long`,
    ],
    unique: true,
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
});

categorySchema.index(
  { name: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const CategoryModel = model<CategoryDocument>("Category", categorySchema);

export default CategoryModel;
