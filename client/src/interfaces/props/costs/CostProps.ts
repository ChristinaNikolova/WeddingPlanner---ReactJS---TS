import type { ErrorProps } from "../shared/Errors/ErrorProps";

export interface CostProps {
  id: string;
  title: string;
  price: string;
  category: string;
  message?: ErrorProps[];
}
// todo rename?
