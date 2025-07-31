import type { ErrorProps } from "../props/shared/Errors/ErrorProps";

export interface AuthModel {
  accessToken: string;
  user: UserModel;
  message?: ErrorProps[];
}

interface UserModel {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}
