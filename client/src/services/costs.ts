import { api } from "./api";
import { requester } from "./requester";
import type { ArticleProps } from "../interfaces/props/articles/ArticleProps";
import type { CostProps } from "../interfaces/props/CostProps";
import { httpMethods, serviceNames } from "../utils/constants/global";
import { handleServiceError } from "../utils/helpers/errorHandler";

export const all = async (plannerId: string): Promise<CostProps[]> => {
  try {
    const response = await requester(
      `${api.public.costs}/${plannerId}`,
      httpMethods.GET
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.COSTS);
  }
};

export const create = async (
  plannerId: string,
  title: string,
  price: string,
  category: string
): Promise<ArticleProps> => {
  try {
    const response = await requester(
      `${api.public.costs}/${plannerId}`,
      httpMethods.POST,
      {
        title,
        price,
        category,
      }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.COSTS);
  }
};

export const deleteById = async (id: string): Promise<CostProps> => {
  try {
    const response = await requester(
      `${api.public.costs}/${id}`,
      httpMethods.DELETE
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.COSTS);
  }
};

export const getById = async (
  plannerId: string,
  costId: string
): Promise<CostProps> => {
  try {
    const response = await requester(
      `${api.public.costs}/${plannerId}/${costId}`,
      httpMethods.GET
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.COSTS);
  }
};

export const update = async (
  id: string,
  title: string,
  price: string
): Promise<CostProps> => {
  try {
    const response = await requester(
      `${api.public.costs}/${id}`,
      httpMethods.PUT,
      {
        title,
        price,
      }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.COSTS);
  }
};
