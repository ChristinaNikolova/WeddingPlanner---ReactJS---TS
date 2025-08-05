import type { BaseModel } from "../../models/BaseModel";
import type { PlannerModel } from "../../models/PlannerModel";

export interface PlannerProps extends BaseModel, PlannerModel {
  title: string;
  brideId: string;
  groomId: string;
  actualCosts: string;
  totalGuests: number;
  brideGuests: number;
  groomGuests: number;
  confirmedGuests: number;
  totalTasks: number;
  totalDoneTasks: number;
  totalEvents: number;
  highlightedEvents: number;
  notes: number;
}
