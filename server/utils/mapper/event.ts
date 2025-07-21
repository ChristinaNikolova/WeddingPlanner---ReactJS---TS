import parser from "../parser";

const { extractTimeFromDate, getTotalMinutes } = parser;

function eventViewModel(event) {
  return {
    id: event._id,
    title: event.title,
    startTime: extractTimeFromDate(event.startTime),
    endTime: extractTimeFromDate(event.endTime),
    duration: getTotalMinutes(event.duration),
    isHighlighted: event.isHighlighted,
  };
}

export default eventViewModel;
