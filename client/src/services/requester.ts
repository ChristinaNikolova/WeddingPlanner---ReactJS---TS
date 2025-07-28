import type { RequestData } from "../interfaces/types/RequestData";
// import { getToken } from "./auth";

// todo check all files +  add types!!!
export const requester = (
  url: string,
  method: string,
  data?: RequestData
): Promise<Response> => {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    //   "X-Authorization": `Bearer ${getToken()}`,
    },
    body: data ? JSON.stringify(data) : null,
  });
};
