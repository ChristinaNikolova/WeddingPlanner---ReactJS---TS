// todo organise better
export interface AuthResponse {
  accessToken: string;
  user: User;
}

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}
