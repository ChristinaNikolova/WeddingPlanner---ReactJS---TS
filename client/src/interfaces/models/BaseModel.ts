import type { ErrorProps } from "../props/shared/Errors/ErrorProps";

export interface BaseModel {
  id: string;
  message?: ErrorProps[];
}
