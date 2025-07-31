import { api } from "./api";
import { requester } from "./requester";
import type { AuthModel } from "../interfaces/models/AuthModel";
import type { LoginModel } from "../interfaces/models/LoginModel";
import type { RegisterModel } from "../interfaces/models/RegisterModel";
import { httpMethods, serviceNames } from "../utils/constants/global";
import { handleServiceError } from "../utils/helpers/errorHandler";

export const register = async (
  registerData: RegisterModel
): Promise<AuthModel> => {
  try {
    const response = await requester(
      api.auth.register,
      httpMethods.POST,
      {
        ...registerData,
      },
      false
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.AUTH);
  }
};

export const login = async (loginData: LoginModel): Promise<AuthModel> => {
  try {
    const response = await requester(
      api.auth.login,
      httpMethods.POST,
      {
        ...loginData,
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
