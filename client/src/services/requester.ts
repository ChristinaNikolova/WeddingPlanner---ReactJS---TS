import type { RequestData } from "../interfaces/types/RequestData";
import { getToken } from "./auth";
import { global } from "../utils/constants/errors";

export const requester = (
  url: string,
  method: string,
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
  }).then((response) => {
    if (!response.ok) {
      throw new Error(global.RESPONSE(response.status));
    }
    return response;
  });
};
