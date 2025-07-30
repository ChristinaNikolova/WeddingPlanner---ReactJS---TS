import { api } from "./api";
import { requester } from "./requester";
import { httpMethods, serviceNames } from "../utils/constants/global";
import type { CategoryProps } from "../interfaces/CategoryProps";
import { handleServiceError } from "../utils/helpers/errorHandler";

export const create = async (
  name: string,
  image: string
): Promise<CategoryProps> => {
  try {
    const response = await requester(api.admin.categories, httpMethods.POST, {
      name,
      image,
    });
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.CATEGORIES);
  }
};

export const update = async (
  id: string,
  name: string,
  image: string
): Promise<CategoryProps> => {
  try {
    const response = await requester(
      `${api.admin.categories}/${id}`,
      httpMethods.PUT,
      {
        name,
        image,
      }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.CATEGORIES);
  }
};

export const deleteById = async (
  id: string
): Promise<CategoryProps | undefined> => {
  try {
    const response = await requester(
      `${api.admin.categories}/${id}`,
      httpMethods.DELETE
    );

    if (response.status !== 204) {
      return response.json();
    }
    return undefined;
  } catch (error) {
    return handleServiceError(error, serviceNames.CATEGORIES);
  }
};

export const all = async (): Promise<CategoryProps[]> => {
  try {
    const response = await requester(
      api.public.categories,
      httpMethods.GET,
      undefined,
      false
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.CATEGORIES);
  }
};

export const getById = async (id: string): Promise<CategoryProps> => {
  try {
    const response = await requester(
      `${api.admin.categories}/${id}`,
      httpMethods.GET
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.CATEGORIES);
  }
};
