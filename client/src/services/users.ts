import { api } from "./api";
import { requester } from "./requester";
import { httpMethods, serviceNames } from "../utils/constants/global";
import { handleServiceError } from "../utils/helpers/errorHandler";
import type { ArticleProps } from "../interfaces/ArticleProps";

export const getFav = async (): Promise<ArticleProps[]> => {
  try {
    const response = await requester(
      `${api.public.users}/articles`,
      httpMethods.GET
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.USERS);
  }
};
