import type {
  DishName,
  GenderName,
  PeopleName,
  RoleName,
  SideName,
} from "../../utils/constants/global";

export interface GuestModel {
  firstName: string;
  lastName: string;
  gender: GenderName;
  age: PeopleName;
  role: RoleName;
  mainDish: DishName;
  side: SideName;
  table: string;
  confirmed: string;
}
