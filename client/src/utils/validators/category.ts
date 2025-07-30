import { category as categoryModel } from "../constants/model";
import { global as globalErrors } from "../constants/errors";

export const validName = (name: string): string => {
  return name &&
    name.length >= categoryModel.NAME_MIN_LEN &&
    name.length <= categoryModel.NAME_MAX_LEN
    ? ""
    : globalErrors.NAME(categoryModel.NAME_MIN_LEN, categoryModel.NAME_MAX_LEN);
};

export const validImage = (image: string): string => {
  return image ? "" : globalErrors.IMAGE;
};
