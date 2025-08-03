import type { ErrorProps } from "./shared/Errors/ErrorProps";

export interface SubtaskProps {
  id: string;
  description: string;
  isDone: boolean;
  message?: ErrorProps[];
}
