import { ErrorWithMessage } from "../interfaces/ErrorWithMessage";
import { ValidationError } from "../interfaces/ValidationError";
import global from "./constants/global";

const { errors } = global;

// todo extract interface
interface ErrorResponse {
  msg: string;
}

function mapErrors(err: unknown): ErrorResponse[] {
  if (Array.isArray(err)) {
    return err;
  }

  if (isValidationError(err)) {
    return Object.values((err as ValidationError).errors).map((e) => ({
      msg: e.message,
    }));
  }

  if (isErrorWithMessage(err)) {
    return [{ msg: err.message }];
  }

  return [{ msg: errors.REQUEST }];
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

// todo
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

// todo check if two elements
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
