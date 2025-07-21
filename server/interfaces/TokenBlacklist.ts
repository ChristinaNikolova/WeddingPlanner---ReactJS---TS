import { BaseEntity } from "./BaseEntry";

export interface TokenBlacklist extends BaseEntity {
  token: string;
}
