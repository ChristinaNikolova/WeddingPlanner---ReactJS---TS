const important = {
  CONNECTION_STRING: "mongodb://localhost:27017/weddingplanner-ts",
  SECRET: "my-very-very-secret",
};

// TODO CHECK IF NUMBER
const errors = {
  REQUEST: "Request error",
  INVALID_URL: "Invalid url",
  INVALID_EMAIL: "Invalid email",
  PASSWORD(min: number, max: number) {
    return `Password should be between ${min} and ${max} characters long`;
  },
  SELECT_CATEGORY: "Please select category",
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
};

export default {
  important,
  errors,
};
