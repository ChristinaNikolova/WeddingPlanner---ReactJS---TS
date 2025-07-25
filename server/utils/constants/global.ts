const important = {
  CONNECTION_STRING: "mongodb://localhost:27017/weddingplanner-ts",
  SECRET: "my-very-secret",
};

const category = {
  DEFAULT_CATEGORY_SELECTED_ID: "638325c6bdd58333840dcc7e",
};

const pagination = {
  ARTICLES_PER_PAGE: 3,
};

const emails = {
  ADMIN: "admin@weddingplanner.com",
};

const messages = {
  REST_STARTED: "REST service started",
  REST_OPERATED: "REST service operational",
  DATABASE_CONNECTED: "Database connected",
};

const errors = {
  REQUEST: "Request error",
  INVALID_URL: "Invalid url",
  INVALID_EMAIL: "Invalid email",
  PASSWORD(min: number, max: number) {
    return `Password should be between ${min} and ${max} characters long`;
  },
  SELECT_CATEGORY: "Please select category",
  CATEGORY_NOT_FOUND: "Category not found",
  ARTICLE_NOT_FOUND: "Article not found",
  PLANNER_NOT_FOUND: "Planner not found",
  COST_NOT_FOUND: "Cost not found",
  EVENT_NOT_FOUND: "Event not found",
  GUEST_NOT_FOUND: "Guest not found",
  NOTE_NOT_FOUND: "Note not found",
  NAME_TAKEN: "Name is already taken",
  TITEL_TAKEN: "Title is already taken",
  EMAIL_TAKEN: "Email is already taken",
  LOGIN: "Incorrect email or password",
  NOT_LOGGED_IN: "Please log in",
  ALREADY_LOGGED_IN: "You are already logged in",
  TOKEN_EXIST: "Token is blacklisted",
  TOKEN_INVALID: "Invalid authorization token",
  DATABASE: "Database error",
  DATABASE_CONNECTION: "Error connecting to database",
  DATABASE_UNKNOWN_ERROR: "Unknown error during database connection.",
  AUTH_HEADER_MISSING: "Authorization header missing",
  INVALOD_AUTH_FORMAT: "Invalid authorization format",
  INVALID_ENUM(fieldName: string, value: string) {
    return `Invalid ${fieldName}: ${value}`;
  },
};

export default {
  important,
  category,
  pagination,
  emails,
  messages,
  errors,
};
