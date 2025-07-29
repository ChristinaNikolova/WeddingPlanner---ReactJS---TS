import { auth as authModel } from "../constants/model";
import {
  auth as authErrors,
  global as globalErrors,
} from "../constants/errors";

export const validEmail = (email: string): string => {
  const emailRegex = new RegExp(
    "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$"
  );
  return email && emailRegex.test(email) ? "" : authErrors.EMAIL;
};

export const validName = (name: string): string => {
  return name &&
    name.length >= authModel.NAME_MIN_LEN &&
    name.length <= authModel.NAME_MAX_LEN
    ? ""
    : globalErrors.NAME(authModel.NAME_MIN_LEN, authModel.NAME_MAX_LEN);
};

export const validPassword = (password: string): string => {
  return password &&
    password.length >= authModel.PASSWORD_MIN_LEN &&
    password.length <= authModel.PASSWORD_MAX_LEN
    ? ""
    : authErrors.PASSWORD(
        authModel.PASSWORD_MIN_LEN,
        authModel.PASSWORD_MAX_LEN
      );
};

export const validPasswordMatch = (
  password: string,
  repass: string
): string => {
  return password === repass ? "" : authErrors.REPEAT_PASSWORD;
};
