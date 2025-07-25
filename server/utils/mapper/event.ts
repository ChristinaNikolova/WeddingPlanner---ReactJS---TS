import { EventDocument } from "../../interfaces/dbmodels/EventDocument";
import { EventViewModel } from "../../interfaces/viewmodels/EventViewModel";
import parser from "../parser";

const { extractTimeFromDate, getTotalMinutes } = parser;

function eventViewModel(event: EventDocument): EventViewModel {
  return {
    id: event._id.toString(),
    title: event.title,
    startTime: extractTimeFromDate(event.startTime),
    endTime: extractTimeFromDate(event.endTime),
    duration: getTotalMinutes(event.duration),
    isHighlighted: event.isHighlighted,
  };
}

export default {
  eventViewModel,
};
