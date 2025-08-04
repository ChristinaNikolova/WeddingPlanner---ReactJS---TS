import type { FormName } from "../../../utils/constants/global";
import type { ErrorProps } from "../shared/Errors/ErrorProps";

// todo make it shared
export interface BaseForm {
  formName: FormName;
  serverError: ErrorProps[];
  //   children: ReactNode;
  //   formCanceled?: boolean;
  //   onSubmitHandler: (
  //     e: React.FormEvent<HTMLFormElement>,
  //     cost: CostModel
  //   ) => void;
  //   checkIsDisabled: (isDisabled: boolean) => void;
}
