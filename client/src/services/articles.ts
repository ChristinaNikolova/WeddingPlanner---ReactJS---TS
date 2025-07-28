import { api } from "./api";
import { requester } from "./requester";
import type { ArticleProps } from "../interfaces/ArticleProps";
import { httpMethods } from "../utils/constants/global";
import { handleServiceError } from "../utils/helpers/errorHandler";

const SERVICE_NAME = "Articles";

// export const create = (
//   title: string,
//   content: string,
//   image: string,
//   jumboImage: string,
//   category: string
// ) => {
//   return requester(api.admin.articles, httpMethods.POST, {
//     title,
//     content,
//     image,
//     jumboImage,
//     category,
//   })
//     .then((res) => res.json())
//     .catch((err) => console.error(err));
// };

// export const update = (
//   id: string,
//   title: string,
//   content: string,
//   image: string,
//   jumboImage: string,
//   category: string
// ) => {
//   return requester(`${api.admin.articles}/${id}`, httpMethods.PUT, {
//     title,
//     content,
//     image,
//     jumboImage,
//     category,
//   })
//     .then((res) => res.json())
//     .catch((err) => console.error(err));
// };

// export const deleteById = (id: string) => {
//   return requester(`${api.admin.articles}/${id}`, httpMethods.DELETE)
//     .then((res) => res.json())
//     .catch((err) => console.error(err));
// };

export const all = async (
  currentPage = 1,
  selectedCategory: string,
  query = ""
): Promise<ArticleProps[]> => {
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

    // todo all func??? => constants
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    handleServiceError(error, SERVICE_NAME);
    throw error;
  }
};

export const getById = async (id: string): Promise<ArticleProps> => {
  try {
    const response = await requester(
      `${api.public.articles}/${id}`,
      httpMethods.GET
    );

    //todo do we need this here
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    handleServiceError(error, SERVICE_NAME);
    throw error;
  }
};

export const like = async (id: string): Promise<ArticleProps> => {
  try {
    const response = await requester(
      `${api.public.articles}/${id}`,
      httpMethods.POST
    );

    //todo do we need this here
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    handleServiceError(error, SERVICE_NAME);
    throw error;
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

    // todo all func??? => constants
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    handleServiceError(error, SERVICE_NAME);
    throw error;
  }
};
