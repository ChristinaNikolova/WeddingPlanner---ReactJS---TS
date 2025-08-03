import { global } from "../constants/errors";

export const handleServiceError = (
  error: unknown,
  serviceName?: string
): never => {
  console.error(global.SERVER_ERROR(serviceName));
  throw error;
};
