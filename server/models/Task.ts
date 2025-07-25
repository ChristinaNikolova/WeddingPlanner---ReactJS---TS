import { Schema, model, Types } from "mongoose";
import { TaskDocument } from "../interfaces/dbmodels/TaskDocument";
import modelConstants from "../utils/constants/model";

const { ObjectId } = Types;
const { task } = modelConstants;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [
        task.TITLE_MIN_LEN,
        `Title should be at least ${task.TITLE_MIN_LEN} characters long`,
      ],
      maxlength: [
        task.TITLE_MAX_LEN,
        `Title should be maximal ${task.TITLE_MAX_LEN} characters long`,
      ],
    },
    description: {
      type: String,
      minlength: [
        task.DESC_MIN_LEN,
        `Description should be at least ${task.DESC_MIN_LEN} characters long`,
      ],
      maxlength: [
        task.DESC_MAX_LEN,
        `Description should be maximal ${task.DESC_MAX_LEN} characters long`,
      ],
      default: "",
    },
    timespan: {
      type: String,
      required: [true, "Time span is required"],
      enum: [
        "one year",
        "nine months",
        "six months",
        "three months",
        "one month",
        "three weeks",
        "two weeks",
        "one week",
        "one day",
        "wedding day",
      ],
    },
    progress: {
      type: Number,
      default: 0,
    },
    target: {
      type: Number,
      default: 0,
    },
    subtasks: {
      type: [ObjectId],
      ref: "Subtask",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel = model<TaskDocument>("Task", taskSchema);

export default TaskModel;
