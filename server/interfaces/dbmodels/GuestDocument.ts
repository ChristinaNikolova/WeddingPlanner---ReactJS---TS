import { BaseEntry } from "./BaseEntry";
import { Age } from "../enums/Age";
import { Gender } from "../enums/Gender";
import { MainDish } from "../enums/MainDish";
import { Role } from "../enums/Role";
import { Side } from "../enums/Side";

export interface GuestDocument extends BaseEntry {
  firstName: string;
  lastName: string;
  gender: Gender;
  age: Age;
  side: Side;
  role: Role;
  table: string;
  mainDish: MainDish;
  confirmed: boolean;
}
