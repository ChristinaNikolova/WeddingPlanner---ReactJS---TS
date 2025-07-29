import { api } from "./api";
import { requester } from "./requester";
import type { ArticleProps } from "../interfaces/ArticleProps";
import type { ArticleResponse } from "../interfaces/ArticleResponse";
import { httpMethods, serviceNames } from "../utils/constants/global";
import { global } from "../utils/constants/errors";
import { handleServiceError } from "../utils/helpers/errorHandler";

// todo create + unpdate = interface???
export const create = async (
  title: string,
  content: string,
  image: string,
  jumboImage: string,
  category: string
): Promise<ArticleProps> => {
  try {
    const response = await requester(api.admin.articles, httpMethods.POST, {
      title,
      content,
      image,
      jumboImage,
      category,
    });
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.ARTICLES);
  }
};

export const update = async (
  id: string,
  title: string,
  content: string,
  image: string,
  jumboImage: string,
  category: string
): Promise<ArticleProps> => {
  try {
    const response = await requester(
      `${api.admin.articles}/${id}`,
      httpMethods.PUT,
      {
        title,
        content,
        image,
        jumboImage,
        category,
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
  currentPage = 1,
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

    if (!response.ok) {
      throw new Error(global.RESPONSE(response.status));
    }

    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.ARTICLES);
  }
};

export const getById = async (id: string): Promise<ArticleProps> => {
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

export const like = async (id: string): Promise<ArticleProps> => {
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

    if (!response.ok) {
      throw new Error(global.RESPONSE(response.status));
    }

    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.ARTICLES);
  }
};
