export const parseTime = (time: string): string => {
  return parseDate(time).toLocaleTimeString();
};

export const parseDate = (time: string): Date => {
  const [hour, minutes] = time.split(":");
  return new Date("", "", "", hour, minutes);
};

// todo check return type here
export const getDifference = (
  start: string,
  end: string
): (string | number)[] => {
  const difference =
    new Date("01/01/2007 " + end) - new Date("01/01/2007 " + start);

  let hours = formatTime(Math.floor((difference / (1000 * 60 * 60)) % 24));
  let minutes = formatTime(Math.floor((difference / (1000 * 60)) % 60));

  if (hours.toString().includes("-") || minutes.toString().includes("-")) {
    hours = "00";
    minutes = "00";
  }

  return [hours, minutes];
};

// todo check if only string possible
const formatTime = (time: number): string | number => {
  return time <= 9 ? `0${time}` : time;
};
