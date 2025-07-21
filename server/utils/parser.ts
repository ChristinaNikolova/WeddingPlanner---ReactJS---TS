import global from "./constants/global";

// TODO ADD Type Guard, interface
function mapErrors(err: any) {
  if (Array.isArray(err)) {
    return err;
  } else if (err.name === "ValidationError") {
    return Object.values(err.errors).map((e: any) => ({ msg: e.message }));
  } else if (typeof err.message === "string") {
    return [{ msg: err.message }];
  }

  return [{ msg: global.errors.REQUEST }];
}
