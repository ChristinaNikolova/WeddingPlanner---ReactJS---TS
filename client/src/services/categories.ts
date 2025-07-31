import { api } from "./api";
import { requester } from "./requester";
import { httpMethods, serviceNames } from "../utils/constants/global";
import { handleServiceError } from "../utils/helpers/errorHandler";
import type { CategoryProps } from "../interfaces/props/categories/CategoryProps";
import type { CategoryModel } from "../interfaces/models/CategoryModel";

export const create = async (
  category: CategoryModel
): Promise<CategoryProps> => {
  try {
    const response = await requester(api.admin.categories, httpMethods.POST, {
      ...category,
    });
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.CATEGORIES);
  }
};

export const update = async (
  id: string,
  category: CategoryModel
): Promise<CategoryProps> => {
  try {
    const response = await requester(
      `${api.admin.categories}/${id}`,
      httpMethods.PUT,
      {
        ...category,
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
