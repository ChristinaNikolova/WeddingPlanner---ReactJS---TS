import { TokenPayload } from "./TokenPayload";

export interface AuthResponse {
  user?: TokenPayload;
  accessToken?: string;
}
