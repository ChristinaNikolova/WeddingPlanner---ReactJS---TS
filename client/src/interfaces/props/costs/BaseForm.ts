import type { ReactNode } from "react";
import type { FormName } from "../../../utils/constants/global";
import type { ErrorProps } from "../shared/Errors/ErrorProps";

// todo make it shared
export interface BaseForm {
  formName?: FormName;
  serverError: ErrorProps[];
  children?: ReactNode;
  checkIsDisabled?: (isDisabled: boolean) => void;
}
