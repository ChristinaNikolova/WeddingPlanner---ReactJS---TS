export const global = {
  SERVER_ERROR(serviceName = ""): string {
    return serviceName ? `${serviceName} service error:` : "Service error:";
  },
  TITLE(min: number, max: number): string {
    return `Title should be between ${min} and ${max} characters long`;
  },
  DESC(min: number, max: number): string {
    return `Description should be between ${min} and ${max} characters long`;
  },
  IMAGE: "Image is required",
  NAME(min: number, max: number): string {
    return `Name should be between ${min} and ${max} characters long`;
  },
} as const;

export const article = {
  CONTENT(min: number, max: number): string {
    return `Content should be between ${min} and ${max} characters long`;
  },
  CATEGORY: "Please select category",
} as const;

export const auth = {
  EMAIL: "Invalid email",
  PASSWORD(min: number, max: number): string {
    return `Password should be between ${min} and ${max} characters long`;
  },
  REPEAT_PASSWORD: "Passwords do not match",
} as const;

export const cost = {
  PRICE: "Price should be a positive number",
} as const;

export const event = {
  TIME: "End time should be after the start time",
} as const;

export const planner = {
  BUDGET: "Budget should be a positive number",
  LOCATION(min: number, max: number): string {
    return `Location should be between ${min} and ${max} characters long`;
  },
  NAME: "Name should contain first and last name",
  DATE: "Date should be in format DD.MM.YYYY",
} as const;
