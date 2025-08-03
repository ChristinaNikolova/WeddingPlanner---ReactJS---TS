import { ErrorWithMessage } from "../interfaces/errors/ErrorWithMessage";
import { ValidationError } from "../interfaces/errors/ValidationError";
import global from "./constants/global";

const { errors } = global;

function mapErrors(err: unknown): ErrorWithMessage[] {
  if (Array.isArray(err)) {
    return err;
  }

  if (isValidationError(err)) {
    return Object.values((err as ValidationError).errors).map((e) => ({
      message: e.message,
    }));
  }

  if (isErrorWithMessage(err)) {
    return [{ message: err.message }];
  }

  return [{ message: errors.REQUEST }];
}

function isValidationError(err: unknown): err is ValidationError {
  return (
    err != undefined &&
    typeof err === "object" &&
    "name" in err &&
    err.name === "ValidationError" &&
    "errors" in err
  );
}

function isErrorWithMessage(err: unknown): err is ErrorWithMessage {
  return (
    err != undefined &&
    typeof err === "object" &&
    "message" in err &&
    typeof err.message === "string"
  );
}

function formatCreatedAt(createdAt: Date | undefined): string {
  if (!createdAt) {
    return "";
  }

  return (
    createdAt.getDate() +
    "/" +
    (createdAt.getMonth() + 1) +
    "/" +
    createdAt.getFullYear().toString().slice(-2)
  );
}

function extractTimeFromDate(date: Date): string {
  let time = date.toLocaleTimeString();
  time = time.split(" ")[0];
  time = time.slice(0, time.lastIndexOf(":"));
  return time;
}

function getTotalMinutes(duration: string): number {
  const [hours, minutes] = duration.split(":");
  const result = Number(hours) * 60 + Number(minutes);
  return result;
}

export default {
  mapErrors,
  formatCreatedAt,
  extractTimeFromDate,
  getTotalMinutes,
};
