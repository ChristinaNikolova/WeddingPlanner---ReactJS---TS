import { Schema, model, Types } from "mongoose";
import modelConstants from "../utils/constants/model";

const { ObjectId } = Types;
const { cost } = modelConstants;

const costSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [
      cost.TITLE_MIN_LEN,
      `Title should be at least ${cost.TITLE_MIN_LEN} characters long`,
    ],
    maxlength: [
      cost.TITLE_MAX_LEN,
      `Title should be maximal ${cost.TITLE_MAX_LEN} characters long`,
    ],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [cost.PRICE_MIN, "Price should be a positive number"],
  },
  category: {
    type: ObjectId,
    ref: "Category",
    required: true,
  },
});

const CostModel = model("Cost", costSchema);

export default CostModel;
