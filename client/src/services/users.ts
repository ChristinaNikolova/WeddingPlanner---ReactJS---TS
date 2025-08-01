import { api } from "./api";
import { requester } from "./requester";
import type { ArticleDetailsProps } from "../interfaces/props/articles/ArticleDetailsProps";
import { httpMethods, serviceNames } from "../utils/constants/global";
import { handleServiceError } from "../utils/helpers/errorHandler";

export const getFav = async (): Promise<ArticleDetailsProps[]> => {
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
