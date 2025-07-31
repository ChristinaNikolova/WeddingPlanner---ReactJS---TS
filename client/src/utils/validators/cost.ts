import { cost as costModel } from "../constants/model";
import {
  cost as costErrors,
  global as globalErrors,
} from "../constants/errors";

export const validTitle = (title: string): string => {
  return title &&
    title.length >= costModel.TITLE_MIN_LEN &&
    title.length <= costModel.TITLE_MAX_LEN
    ? ""
    : globalErrors.TITLE(costModel.TITLE_MIN_LEN, costModel.TITLE_MAX_LEN);
};

export const validPrice = (price: number): string => {
  return price && price >= costModel.PRICE_MIN ? "" : costErrors.PRICE;
};
