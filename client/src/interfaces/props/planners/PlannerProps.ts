import type { PlannerModel } from "../../models/PlannerModel";
import type { ErrorProps } from "../shared/Errors/ErrorProps";

export interface PlannerProps extends PlannerModel {
  // base
  id: string;
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
  message?: ErrorProps[];
}
