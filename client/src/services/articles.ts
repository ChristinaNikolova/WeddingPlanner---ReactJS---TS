import { api } from "./api";
// import { requester } from "./requester";
import { httpMethods } from "../utils/constants/global";

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

// export const all = (currentPage = 1, selectedCategory: string, query = "") => {
//   return fetch(
//     `${api.public.articles}/${currentPage}/${selectedCategory}?query=${query}`,
//     {
//       method: httpMethods.GET,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   )
//     .then((res) => res.json())
//     .catch((err) => console.error(err));
// };

// export const getById = (id: string) => {
//   return requester(`${api.public.articles}/${id}`, httpMethods.GET)
//     .then((res) => res.json())
//     .catch((err) => console.error(err));
// };

// export const like = (id: string) => {
//   return requester(`${api.public.articles}/${id}`, httpMethods.POST)
//     .then((res) => res.json())
//     .catch((err) => console.error(err));
// };

export const getLastThree = () => {
  return fetch(`${api.public.articles}`, {
    method: httpMethods.GET,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
