import type { FormName } from "../../../../utils/constants/global";
import type { ErrorProps } from "../Errors/ErrorProps";

export interface FormProps {
  formName: FormName;
  image: string;
  serverError: ErrorProps[];
  onCancelFormHandler: (event: React.MouseEvent<HTMLElement>) => void;
}
