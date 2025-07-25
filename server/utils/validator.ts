import global from "./constants/global";

const { errors } = global;

function validateEnum<T extends Record<string, string>>(
  value: string,
  enumObject: T,
  fieldName: string
): T[keyof T] {
  if (!Object.values(enumObject).includes(value as T[keyof T])) {
    throw new Error(errors.INVALID_ENUM(fieldName, value));
  }

  return value as T[keyof T];
}

export default {
  validateEnum,
};
