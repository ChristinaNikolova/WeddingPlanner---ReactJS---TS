import { api } from "./api";
import { requester } from "./requester";
import type { AuthResponse } from "../interfaces/AuthResponse";
import { httpMethods, serviceNames } from "../utils/constants/global";
import { handleServiceError } from "../utils/helpers/errorHandler";

// todo register + login = interface???
export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await requester(
      api.auth.register,
      httpMethods.POST,
      {
        firstName,
        lastName,
        email,
        password,
      },
      false
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.AUTH);
  }
};

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await requester(
      api.auth.login,
      httpMethods.POST,
      {
        email,
        password,
      },
      false
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.AUTH);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await requester(api.auth.logout, httpMethods.GET);
  } catch (error) {
    handleServiceError(error, serviceNames.AUTH);
  }
};

export const getToken = (): string | null => {
  return sessionStorage.getItem("authToken");
};
