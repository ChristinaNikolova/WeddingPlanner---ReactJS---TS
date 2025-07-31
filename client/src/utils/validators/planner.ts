import { planner as plannerModel } from "../constants/model";
import {
  planner as plannerErrors,
  global as globalErrors,
} from "../constants/errors";

export const validDescription = (description: string): string => {
  return description &&
    description.length >= plannerModel.DESC_MIN_LEN &&
    description.length <= plannerModel.DESC_MAX_LEN
    ? ""
    : globalErrors.DESC(plannerModel.DESC_MIN_LEN, plannerModel.DESC_MAX_LEN);
};

export const validBudget = (budget: number): string => {
  return budget && budget >= plannerModel.BUDGET_MIN
    ? ""
    : plannerErrors.BUDGET;
};

export const validLocation = (location: string): string => {
  return location &&
    location.length >= plannerModel.LOCATION_MIN_LEN &&
    location.length <= plannerModel.LOCATION_MAX_LEN
    ? ""
    : plannerErrors.LOCATION(
        plannerModel.LOCATION_MIN_LEN,
        plannerModel.LOCATION_MAX_LEN
      );
};

export const validName = (name: string): string => {
  return name.match(plannerModel.NAME_REGEX) ? "" : plannerErrors.NAME;
};

export const validDate = (date: string): string => {
  return date.match(plannerModel.DATE_REGEX) ? "" : plannerErrors.DATE;
};
