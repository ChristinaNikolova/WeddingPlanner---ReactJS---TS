import type { ErrorProps } from "../shared/Errors/ErrorProps";

export interface CategoryProps {
  id: string;
  name: string;
  image: string;
  message?: ErrorProps[];
}
