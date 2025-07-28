export const article = {
  TITLE_MIN_LEN: 5,
  TITLE_MAX_LEN: 100,
  CONTENT_MIN_LEN: 100,
  CONTENT_MAX_LEN: 3000,
} as const;

export const auth = {
  NAME_MIN_LEN: 1,
  NAME_MAX_LEN: 50,
  PASSWORD_MIN_LEN: 6,
  PASSWORD_MAX_LEN: 50,
} as const;

export const category = {
  NAME_MIN_LEN: 3,
  NAME_MAX_LEN: 30,
  DEFAULT_CATEGORY_SELECTED_ID: "6886f98d7e37c7dcfaac40a6",
} as const;

export const cost = {
  TITLE_MIN_LEN: 3,
  TITLE_MAX_LEN: 80,
  PRICE_MIN: 1,
} as const;

export const event = {
  TITLE_MIN_LEN: 5,
  TITLE_MAX_LEN: 25,
} as const;

export const guest = {
  NAME_MIN_LEN: 1,
  NAME_MAX_LEN: 50,
} as const;

export const note = {
  DESC_MIN_LEN: 5,
  DESC_MAX_LEN: 1500,
} as const;

export const planner = {
  DESC_MIN_LEN: 4,
  DESC_MAX_LEN: 500,
  LOCATION_MIN_LEN: 4,
  LOCATION_MAX_LEN: 100,
  BUDGET_MIN: 1,
  NAME_REGEX: /^[A-Za-z]{1,50}([ ][A-Za-z]{1,50})$/g,
  DATE_REGEX: /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/g,
} as const;

export const subtask = {
  DESC_MIN_LEN: 5,
  DESC_MAX_LEN: 400,
} as const;

export const task = {
  TITLE_MIN_LEN: 5,
  TITLE_MAX_LEN: 100,
  DESC_MIN_LEN: 10,
  DESC_MAX_LEN: 500,
} as const;
