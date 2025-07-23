import { BaseEntry } from "../BaseEntry";

export interface UserDocument extends BaseEntry {
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
}
