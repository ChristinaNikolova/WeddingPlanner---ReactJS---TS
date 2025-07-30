import type { ErrorProps } from "./ErrorProps";

export interface CategoryProps {
  id?: string;
  name: string;
  image?: string;
  message?: ErrorProps[];
}
