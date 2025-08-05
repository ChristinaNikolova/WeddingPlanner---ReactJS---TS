import type { EventModel } from "../../models/EventModel";
import type { ErrorProps } from "../shared/Errors/ErrorProps";

export interface EventProps extends EventModel {
  id: string;
  isHighlighted: boolean;
  message?: ErrorProps[];
}
