import type { ErrorProps } from "../shared/Errors/ErrorProps";
import type { CategoryBaseProps } from "./CategoryBaseProps";

export interface CategoryProps extends CategoryBaseProps {
  id: string;
  message?: ErrorProps[];
}
