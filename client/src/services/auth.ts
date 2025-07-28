import { api } from "./api";
import { requester } from "./requester";
import { httpMethods } from "../utils/constants/global";
import { handleServiceError } from "../utils/helpers/errorHandler";

const SERVICE_NAME = "Auth";

// todo return
export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(api.auth.register, {
      method: httpMethods.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    // todo all func??? => constants
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    handleServiceError(error, SERVICE_NAME);
    throw error;
  }
};

// todo retusrn
export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(api.auth.login, {
      method: httpMethods.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // todo all func??? => constants
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    handleServiceError(error, SERVICE_NAME);
    throw error;
  }
};

// todo return?
export const logout = async (): Promise<void> => {
  try {
    const response = await requester(api.auth.logout, httpMethods.GET);

    // todo all func??? => constants
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    handleServiceError(error, SERVICE_NAME);
    throw error;
  }
};

export const getToken = (): string | null => {
  return sessionStorage.getItem("authToken");
};
