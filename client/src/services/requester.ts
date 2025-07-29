import type { RequestData } from "../interfaces/types/RequestData";
import { getToken } from "./auth";
import { global } from "../utils/constants/errors";

export const requester = (
  url: string,
  method: string,
  data?: RequestData
): Promise<Response> => {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": `Bearer ${getToken()}`,
    },
    body: data ? JSON.stringify(data) : null,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(global.RESPONSE(response.status));
    }
    return response;
  });
};
