import type { FormName } from "../../../utils/constants/global";
import type { CategoryProps } from "../categories/CategoryProps";
import type { ErrorProps } from "../shared/ErrorProps";

export interface FormArticleProps {
  formName: FormName;
  title: string;
  content: string;
  image: string;
  jumboImage: string;
  category?: CategoryProps;
  serverError: ErrorProps[];
  onSubmitHandler: (
    title: string,
    content: string,
    image: string,
    jumboImage: string,
    category: string
  ) => void;
  onCancelFormHandler: (event: React.MouseEvent<HTMLElement>) => void;
}
