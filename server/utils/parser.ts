import global from "./constants/global";

const { errors } = global;

function mapErrors(err: unknown) {
  if (Array.isArray(err)) {
    return err;
  }

  if (
    err != undefined &&
    typeof err === "object" &&
    "name" in err &&
    err.name === "ValidationError"
  ) {
    return Object.values((err as any).errors).map((e: any) => ({
      msg: e.message,
    }));
  }

  if (
    err != undefined &&
    typeof err === "object" &&
    "message" in err &&
    typeof err.message == "string"
  ) {
    return [{ msg: err.message }];
  }

  return [{ msg: errors.REQUEST }];
}

function formatCreatedAt(createdAt: Date): string {
  return (
    createdAt.getDate() +
    "/" +
    (createdAt.getMonth() + 1) +
    "/" +
    createdAt.getFullYear().toString().substr(-2)
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
