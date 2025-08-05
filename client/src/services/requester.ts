import type { RequestData } from "../interfaces/types/RequestData";
import type { MethodName } from "../utils/constants/global";
import { getToken } from "./auth";

export const requester = (
  url: string,
  method: MethodName,
  data?: RequestData,
  isAuth = true
): Promise<Response> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = getToken();

  if (isAuth && token) {
    headers["X-Authorization"] = `Bearer ${token}`;
  }

  return fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  });
};
