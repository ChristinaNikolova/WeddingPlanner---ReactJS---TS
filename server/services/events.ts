import { EventDocument } from "../interfaces/dbmodels/EventDocument";
import { InputObjectId } from "../interfaces/dbmodels/InputObjectId";
import { EventViewModel } from "../interfaces/viewmodels/EventViewModel";
import PlannerModel from "../models/Planner";
import EventModel from "../models/Event";
import event from "../utils/mapper/event";
import global from "../utils/constants/global";

const { eventViewModel } = event;
const { errors } = global;

async function all(plannerId: InputObjectId): Promise<EventViewModel[]> {
  const planner = await PlannerModel.findById(plannerId).populate("events");

  if (!planner) {
    throw new Error(errors.PLANNER_NOT_FOUND);
  }

  return (planner.events as EventDocument[])
    .sort((a, b) => Number(a.startTime) - Number(b.startTime))
    .map(eventViewModel);
}

async function create(
  plannerId: InputObjectId,
  title: string,
  startTime: Date,
  endTime: Date,
  duration: string
): Promise<EventDocument> {
  const event = new EventModel({
    title,
    startTime,
    endTime,
    duration,
  });

  const result = await event.save();

  const planner = await PlannerModel.findById(plannerId);

  if (!planner) {
    throw new Error(errors.PLANNER_NOT_FOUND);
  }

  (planner.events as InputObjectId[]).push(result._id);
  await planner.save();

  return result;
}

async function heightlight(id: InputObjectId): Promise<EventDocument> {
  const event = (await EventModel.findById(id)) as EventDocument;
  event.isHighlighted = !event.isHighlighted;

  return event.save();
}

async function deleteById(id: InputObjectId): Promise<EventDocument | null> {
  return EventModel.findByIdAndDelete(id);
}

async function getById(
  id: InputObjectId,
  hasToCast: boolean
): Promise<EventDocument | EventViewModel> {
  const event = await EventModel.findById(id);

  if (!event) {
    throw new Error(errors.EVENT_NOT_FOUND);
  }

  return hasToCast ? eventViewModel(event) : event;
}

async function update(
  id: InputObjectId,
  title: string,
  startTime: Date,
  endTime: Date,
  duration: string
): Promise<EventDocument> {
  const event = (await getById(id, false)) as EventDocument;

  event.title = title;
  event.startTime = startTime;
  event.endTime = endTime;
  event.duration = duration;

  await event.save();

  return event;
}

export default {
  all,
  create,
  heightlight,
  deleteById,
  getById,
  update,
};
