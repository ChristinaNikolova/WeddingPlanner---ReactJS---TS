import type { ErrorProps } from "../shared/ErrorProps";

export interface CategoryProps {
  id?: string;
  name: string;
  image?: string;
  message?: ErrorProps[];
}
