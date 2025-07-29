// todo organise better ,
// todo remove any
export interface AuthResponse {
  accessToken: string;
  user: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message?: any;
}

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}
