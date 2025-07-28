const baseUrl = "http://localhost:3030" as const;

const auth = {
  register: `${baseUrl}/auth/register`,
  login: `${baseUrl}/auth/login`,
  logout: `${baseUrl}/auth/logout`,
} as const;

const admin = {
  articles: `${baseUrl}/admin/articles`,
  categories: `${baseUrl}/admin/categories`,
} as const;

const publicApi = {
  articles: `${baseUrl}/articles`,
  categories: `${baseUrl}/categories`,
  users: `${baseUrl}/users`,
  planners: `${baseUrl}/planners`,
  guests: `${baseUrl}/guests`,
  costs: `${baseUrl}/costs`,
  notes: `${baseUrl}/notes`,
  events: `${baseUrl}/events`,
  tasks: `${baseUrl}/tasks`,
  subtasks: `${baseUrl}/subtasks`,
} as const;

export const api = {
  auth,
  admin,
  public: publicApi,
} as const;
