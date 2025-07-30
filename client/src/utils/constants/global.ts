// todo check all files +  add types!!!
export const emails = {
  ADMIN: "admin@weddingplanner.com",
} as const;

export const directions = {
  PREV: "prev",
  NEXT: "next",
} as const;

export const httpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export const serviceNames = {
  ARTICLES: "Articles",
  AUTH: "Auth",
  USERS: "Users",
} as const;

export const formNames = {
  CREATE: "create",
  UPDATE: "update",
} as const;

export const classNames = {
  SHOW: "show",
  HIDE: "hide",
  FORM_WIDTH: "form-width",
  CHEVRON_DOWN: "fa-chevron-down",
  CHEVRON_RIGHT: "fa-chevron-right",
} as const;

export const displayStyles = {
  FLEX: "flex",
  NONE: "none",
  INLINE_BLOCK: "inline-block",
  BLOCK: "block",
} as const;

export const people = {
  ADULT: "adult",
  CHILD: "child",
  BABY: "baby",
} as const;

export const genders = {
  MALE: "male",
  FEMALE: "female",
} as const;

export const dishes = {
  MEAT: "meat",
  FISH: "fish",
  VEGGIES: "veggies",
} as const;

export const addButtonTexts = {
  SUB_TASK: "sub-task",
  TASK: "task",
  EVENT: "event",
  GUEST: "guest",
  NOTE: "note",
  COST: "cost",
} as const;

export const tagNames = {
  P: "P",
  H4: "H4",
} as const;

export const roles = [
  "bride",
  "groom",
  "best man",
  "maid of honor",
  "bridesmaid",
  "groomsman",
  "parent",
  "sister",
  "brother",
  "family member",
  "friend",
] as const;

export const timespans = [
  "one year",
  "nine months",
  "six months",
  "three months",
  "one month",
  "three weeks",
  "two weeks",
  "one week",
  "one day",
  "wedding day",
] as const;

// тодо трябват ли ми ?
// export type HttpMethod = (typeof httpMethods)[keyof typeof httpMethods];
// export type FormName = (typeof formNames)[keyof typeof formNames];
// export type Role = (typeof roles)[number];
// export type Timespan = (typeof timespans)[number];
// export type DisplayStyle = (typeof displayStyles)[keyof typeof displayStyles];
// export type Gender = (typeof genders)[keyof typeof genders];
// export type Dish = (typeof dishes)[keyof typeof dishes];
