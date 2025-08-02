import type { ErrorProps } from "./shared/Errors/ErrorProps";

export interface GuestProps {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  side: string;
  role: string;
  table: string;
  mainDish: string;
  confirmed: boolean;
  message?: ErrorProps[];
}

// todo check why the article returns objectId
