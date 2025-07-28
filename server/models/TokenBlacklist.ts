import { Schema, model } from "mongoose";

const tokenBlacklistSchema = new Schema({
  token: {
    type: String,
    default: "",
  },
});

const TokenBlacklistModel = model("TokenBlacklist", tokenBlacklistSchema);

export default TokenBlacklistModel;
