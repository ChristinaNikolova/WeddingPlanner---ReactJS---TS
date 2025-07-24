import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthResponse } from "../interfaces/AuthResponse";
import { TokenPayload } from "../interfaces/TokenPayload";
import { UserDocument } from "../interfaces/dbmodels/UserDocument";
import UserModel from "../models/User";
import TokenBlacklistModel from "../models/TokenBlacklist";
import global from "../utils/constants/global";

const { errors, important } = global;

async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  let user = await getUserByEmail(email);

  if (user) {
    throw new Error(errors.EMAIL_TAKEN);
  }

  const hashedPassword = await hash(password, 10);

  user = new UserModel({
    firstName,
    lastName,
    email,
    hashedPassword,
  });

  await user.save();

  return createToken(user);
}

async function login(email: string, password: string): Promise<AuthResponse> {
  let user = await getUserByEmail(email);

  if (!user) {
    throw new Error(errors.LOGIN);
  }

  const match = await compare(password, user.hashedPassword);

  if (!match) {
    throw new Error(errors.LOGIN);
  }

  return createToken(user);
}

async function logout(token: string): Promise<void> {
  const result = new TokenBlacklistModel({
    token,
  });

  await result.save();
}

function createToken(user: UserDocument): AuthResponse {
  const payload = {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  return {
    user: payload,
    accessToken: jwt.sign(payload, important.SECRET),
  };
}

async function parseToken(token: string): Promise<TokenPayload> {
  let cleanToken = token;
  if (token[0] === '"' && token[token.length - 1] === '"') {
    cleanToken = token.replace(/^"(.*)"$/, "$1");
  }

  const result = await TokenBlacklistModel.find({ token: cleanToken });

  if (result.length) {
    throw new Error(errors.TOKEN_EXIST);
  }

  try {
    const decoded = jwt.verify(cleanToken, important.SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    throw new Error(errors.TOKEN_INVALID);
  }
}

async function getUserByEmail(email: string): Promise<UserDocument | null> {
  return await UserModel.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
}

export default {
  register,
  login,
  logout,
  parseToken,
};
