import type { ReactNode } from "react";
import type { EventModel } from "../../models/EventModel";
import type { ErrorProps } from "../shared/Errors/ErrorProps";

export interface FormEventProps {
  title: string;
  startTime: string;
  endTime: string;
  duration: string;
  serverError: ErrorProps[];
  children: ReactNode;
  onSubmitHandler: (event: EventModel) => void;
  checkIsDisabled: (disable: boolean) => void;
}
