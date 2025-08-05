import type { ReactNode } from "react";
import type { FormName } from "../../../../utils/constants/global";
import type { ErrorProps } from "../Errors/ErrorProps";
import type { CostModel } from "../../../models/CostModel";
import type { EventModel } from "../../../models/EventModel";
import type { GuestModel } from "../../../models/GuestModel";
import type { NoteModel } from "../../../models/NoteModel";
import type { PlannerModel } from "../../../models/PlannerModel";
import type { SubtaskModel } from "../../../models/SubtaskModel";
import type { TaskModel } from "../../../models/TaskModel";

export interface BaseFormProps<
  T extends
    | CostModel
    | EventModel
    | GuestModel
    | NoteModel
    | PlannerModel
    | SubtaskModel
    | TaskModel
> {
  formName?: FormName;
  image?: string;
  serverError: ErrorProps[];
  children?: ReactNode;
  checkIsDisabled?: (isDisabled: boolean) => void;
  onCancelFormHandler: (event: React.MouseEvent<HTMLElement>) => void;
  onSubmitHandler: (e: React.FormEvent<HTMLFormElement>, input: T) => void;
}
