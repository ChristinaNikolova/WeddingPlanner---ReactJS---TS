import type { ErrorProps } from "./shared/Errors/ErrorProps";

// todo check confimmed
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
  confirmed: string;
  message?: ErrorProps[];
}

// todo check why the article returns objectId
