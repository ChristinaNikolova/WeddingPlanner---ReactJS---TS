//todo extends PlannerViewModel
export interface PlannerProps {
  // base
  id: string;
  title: string;

  // extended
  description: string;
  date: string;
  budget: string;
  bride: string;
  brideId: string;
  groom: string;
  groomId: string;
  location: string;
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
