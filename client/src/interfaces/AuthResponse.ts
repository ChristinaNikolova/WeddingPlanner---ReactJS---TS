import type { ErrorProps } from "./props/shared/Errors/ErrorProps";
export interface AuthResponse {
  accessToken: string;
  user: User;
  message?: ErrorProps[];
}
interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}
