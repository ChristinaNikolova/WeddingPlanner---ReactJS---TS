import { BaseEntity } from "./BaseEntry";

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  hashedPassword: string;
}
