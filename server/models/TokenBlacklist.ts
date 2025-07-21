import { Schema, model } from "mongoose";

const tokenBlacklistSchema = new Schema({
  token: {
    type: String,
    default: "",
  },
});

const TokenBlacklist = model("TokenBlacklist", tokenBlacklistSchema);

export default TokenBlacklist;
