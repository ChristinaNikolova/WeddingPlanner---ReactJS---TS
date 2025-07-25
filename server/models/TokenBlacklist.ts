import { Schema, model } from "mongoose";

const tokenBlacklistSchema = new Schema({
  token: {
    type: String,
    default: "",
  },
});

// todo <TokenDocument>
const TokenBlacklistModel = model("TokenBlacklist", tokenBlacklistSchema);

export default TokenBlacklistModel;
