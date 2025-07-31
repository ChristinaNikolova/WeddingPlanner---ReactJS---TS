import { api } from "./api";
import { requester } from "./requester";
import type { ArticleResponse } from "../interfaces/ArticleResponse";
import { httpMethods, serviceNames } from "../utils/constants/global";
import { handleServiceError } from "../utils/helpers/errorHandler";
import type { ArticleModel } from "../interfaces/models/ArticleModel";
import type { ArticleProps } from "../interfaces/props/articles/ArticleProps";
import type { ArticleDetailsProps } from "../interfaces/props/articles/ArticleDetailsProps";

export const create = async (article: ArticleModel): Promise<ArticleProps> => {
  try {
    const response = await requester(api.admin.articles, httpMethods.POST, {
      ...article,
    });
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.ARTICLES);
  }
};

export const update = async (
  id: string,
  article: ArticleModel
): Promise<ArticleProps> => {
  try {
    const response = await requester(
      `${api.admin.articles}/${id}`,
      httpMethods.PUT,
      {
        ...article,
      }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.ARTICLES);
  }
};

export const deleteById = async (id: string): Promise<ArticleProps> => {
  try {
    const response = await requester(
      `${api.admin.articles}/${id}`,
      httpMethods.DELETE
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.ARTICLES);
  }
};

export const all = async (
  currentPage = "1",
  selectedCategory: string,
  query = ""
): Promise<ArticleResponse> => {
  try {
    const response = await fetch(
      `${api.public.articles}/${currentPage}/${selectedCategory}?query=${query}`,
      {
        method: httpMethods.GET,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.ARTICLES);
  }
};

export const getById = async (id: string): Promise<ArticleDetailsProps> => {
  try {
    const response = await requester(
      `${api.public.articles}/${id}`,
      httpMethods.GET
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.ARTICLES);
  }
};

export const like = async (id: string): Promise<ArticleDetailsProps> => {
  try {
    const response = await requester(
      `${api.public.articles}/${id}`,
      httpMethods.POST
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.ARTICLES);
  }
};

export const getLastThree = async (): Promise<ArticleProps[]> => {
  try {
    const response = await fetch(`${api.public.articles}`, {
      method: httpMethods.GET,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.ARTICLES);
  }
};
