import type { FormName } from "../../../utils/constants/global";
import type { ErrorProps } from "../shared/ErrorProps";

export interface FormCategoryProps {
  formName: FormName;
  name: string;
  image: string;
  serverError: ErrorProps[];
  onSubmitHandler: (name: string, image: string) => void;
  onCancelFormHandler: (event: React.MouseEvent<HTMLElement>) => void;
}
