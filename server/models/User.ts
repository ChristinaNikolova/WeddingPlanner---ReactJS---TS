import { Schema, model } from "mongoose";
import modelConstants from "../utils/constants/model";

const { user } = modelConstants;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [
      user.NAME_MIN_LEN,
      `First name should be at least ${user.NAME_MIN_LEN} character long`,
    ],
    maxlength: [
      user.NAME_MAX_LEN,
      `First name should be maximal ${user.NAME_MAX_LEN} character long`,
    ],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [
      user.NAME_MIN_LEN,
      `Last name should be at least ${user.NAME_MIN_LEN} character long`,
    ],
    maxlength: [
      user.NAME_MAX_LEN,
      `Last name should be maximal ${user.NAME_MAX_LEN} character long`,
    ],
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

userSchema.index(
  { email: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const User = model("User", userSchema);

export default User;
