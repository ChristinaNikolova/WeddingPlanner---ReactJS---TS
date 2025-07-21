import { Schema, model } from "mongoose";
import modelConstants from "../utils/constants/model";

const { subtask } = modelConstants;

const subtaskSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [
        subtask.DESC_MIN_LEN,
        `Description should be at least ${subtask.DESC_MIN_LEN} characters long`,
      ],
      maxlength: [
        subtask.DESC_MAX_LEN,
        `Description should be maximal ${subtask.DESC_MAX_LEN} characters long`,
      ],
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Subtask = model("Subtask", subtaskSchema);

export default Subtask;
