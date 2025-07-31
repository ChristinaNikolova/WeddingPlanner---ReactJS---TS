import { guest as guestModel } from "../constants/model";
import { global as globalErrors } from "../constants/errors";

export const validName = (name: string): string => {
  return name &&
    name.length >= guestModel.NAME_MIN_LEN &&
    name.length <= guestModel.NAME_MAX_LEN
    ? ""
    : globalErrors.NAME(guestModel.NAME_MIN_LEN, guestModel.NAME_MAX_LEN);
};
