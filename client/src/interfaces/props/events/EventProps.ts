import type { BaseModel } from "../../models/BaseModel";
import type { EventModel } from "../../models/EventModel";

export interface EventProps extends BaseModel, EventModel {
  isHighlighted: boolean;
}
