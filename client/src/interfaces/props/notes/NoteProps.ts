import type { ErrorProps } from "../shared/Errors/ErrorProps";

export interface NoteProps {
  id: string;
  description: string;
  createdAt: string;
  message?: ErrorProps[];
}
