import { BaseEntity } from "./BaseEntry";

export interface Guest extends BaseEntity {
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  side: string;
  role: string;
  table: string;
  mainDish: string;
  confirmed: boolean;
}
