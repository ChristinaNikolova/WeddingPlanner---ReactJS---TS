import type { GuestModel } from "../../models/GuestModel";
import type { ErrorProps } from "../shared/Errors/ErrorProps";

// todo do this for all props
export interface GuestProps extends GuestModel {
  id: string;
  message?: ErrorProps[];
}
