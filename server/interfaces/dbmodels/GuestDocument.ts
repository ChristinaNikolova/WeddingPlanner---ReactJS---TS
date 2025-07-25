import { BaseEntry } from "../BaseEntry";

export interface GuestDocument extends BaseEntry {
  firstName: string;
  lastName: string;
  // todo enum?
  gender: string;
  //   {
  //     type: String;
  //     required: [true, "Gender is required"];
  //     enum: ["male", "female"];
  //   };
  // todo enum?
  age: string;
  //   {
  //     type: String;
  //     required: [true, "Age is required"];
  //     enum: ["adult", "child", "baby"];
  //   };
  // todo enum?
  side: string;
  //    {
  //     type: String;
  //     required: [true, "Side is required"];
  //     enum: ["bride", "groom"];
  //   };
  // todo enum?
  role: string;
  //   {
  //     type: String;
  //     required: [true, "Role is required"];
  //     enum: [
  //       "bride",
  //       "groom",
  //       "best man",
  //       "maid of honor",
  //       "bridesmaid",
  //       "groomsman",
  //       "parent",
  //       "sister",
  //       "brother",
  //       "family member",
  //       "friend"
  //     ];
  //   };
  table: string;
  // todo enum?
  mainDish: string;
  //   {
  //     type: String;
  //     enum: ["no info", "meat", "fish", "veggies"];
  //     default: "no info";
  //   };
  confirmed: boolean;
}
