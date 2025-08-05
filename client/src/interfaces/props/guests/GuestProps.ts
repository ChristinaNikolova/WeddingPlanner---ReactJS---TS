import type { BaseModel } from "../../models/BaseModel";
import type { GuestModel } from "../../models/GuestModel";

// todo do this for all props
export interface GuestProps extends BaseModel, GuestModel {}
