export const parseTime = (time: string): string => {
  return parseDate(time).toLocaleTimeString();
};

export const parseDate = (time: string): Date => {
  const [hour, minutes] = time.split(":");
  return new Date(0, 0, 0, Number(hour), Number(minutes));
};

export const getDifference = (start: string, end: string): string[] => {
  const difference =
    new Date("01/01/2007 " + end).getTime() -
    new Date("01/01/2007 " + start).getTime();

  let hours = formatTime(Math.floor((difference / (1000 * 60 * 60)) % 24));
  let minutes = formatTime(Math.floor((difference / (1000 * 60)) % 60));

  if (difference < 0) {
    hours = "00";
    minutes = "00";
  }

  return [hours, minutes];
};

const formatTime = (time: number): string => {
  return time <= 9 ? `0${time}` : time.toString();
};
