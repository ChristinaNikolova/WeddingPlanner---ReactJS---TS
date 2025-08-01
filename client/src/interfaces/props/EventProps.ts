import type { ErrorProps } from "./shared/Errors/ErrorProps";

export interface EventProps {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  duration: number;
  isHighlighted: boolean;
  message?: ErrorProps[];
}
