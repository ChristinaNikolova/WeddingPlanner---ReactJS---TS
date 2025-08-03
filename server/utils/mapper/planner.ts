import { CostDocument } from "../../interfaces/dbmodels/CostDocument";
import { EventDocument } from "../../interfaces/dbmodels/EventDocument";
import { GuestDocument } from "../../interfaces/dbmodels/GuestDocument";
import { PlannerDocument } from "../../interfaces/dbmodels/PlannerDocument";
import { PlannerViewModel } from "../../interfaces/viewmodels/PlannerViewModel";
import { PlannerExtendedViewModel } from "../../interfaces/viewmodels/PlannerExtendedViewModel";
import { SubtaskDocument } from "../../interfaces/dbmodels/SubtaskDocument";
import { TaskDocument } from "../../interfaces/dbmodels/TaskDocument";

function plannerLinkViewModel(planner: PlannerDocument): PlannerViewModel {
  return {
    id: planner._id.toString(),
    title: planner.title,
  };
}

function plannerViewModel(planner: PlannerDocument): PlannerExtendedViewModel {
  return {
    id: planner._id.toString(),
    title: planner.title,
    description: planner.description,
    date: planner.date,
    budget: planner.budget.toFixed(2),
    bride: getFullName(planner.bride as GuestDocument),
    brideId: (planner.bride as GuestDocument)._id.toString(),
    groom: getFullName(planner.groom as GuestDocument),
    groomId: (planner.groom as GuestDocument)._id.toString(),
    location: planner.location,
    actualCosts: calculateActualCosts(planner.costs as CostDocument[]),
    totalGuests: planner.guests.length,
    brideGuests: getSideGuestsCount(planner.guests as GuestDocument[], "bride"),
    groomGuests: getSideGuestsCount(planner.guests as GuestDocument[], "groom"),
    confirmedGuests: getConfirmedGuestsCount(planner.guests as GuestDocument[]),
    totalTasks: getTotalTasks(planner.tasks as TaskDocument[]),
    totalDoneTasks: getTotalDoneTasks(planner.tasks as TaskDocument[]),
    totalEvents: planner.events.length,
    highlightedEvents: getHighlightedEventsCount(
      planner.events as EventDocument[]
    ),
    notes: planner.notes.length,
  };
}

function getTotalTasks(tasks: TaskDocument[]): number {
  return tasks.reduce((acc, task) => acc + (task.subtasks?.length ?? 0), 0);
}

function getTotalDoneTasks(tasks: TaskDocument[]): number {
  return tasks
    .flatMap((task) => (task.subtasks as SubtaskDocument[]) ?? [])
    .filter((subtask: SubtaskDocument) => subtask.isDone).length;
}

function getHighlightedEventsCount(events: EventDocument[]): number {
  return events.filter((e) => e.isHighlighted).length;
}

function getConfirmedGuestsCount(guests: GuestDocument[]): number {
  return guests.filter((g) => g.confirmed).length;
}

function getSideGuestsCount(guests: GuestDocument[], side: string): number {
  return guests.filter((g) => g.side === side).length;
}

function getFullName(person: GuestDocument): string {
  return person.firstName + " " + person.lastName;
}

function calculateActualCosts(costs: CostDocument[]): string {
  return costs.reduce((acc, curr) => curr.price + acc, 0).toFixed(2);
}

export default {
  plannerLinkViewModel,
  plannerViewModel,
};
