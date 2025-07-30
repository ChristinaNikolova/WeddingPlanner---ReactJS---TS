import {
  article as articleModel,
  category as categoryModel,
} from "../constants/model";
import {
  article as articleErrors,
  global as globalErrors,
} from "../constants/errors";

export const validTitle = (title: string): string => {
  return title &&
    title.length >= articleModel.TITLE_MIN_LEN &&
    title.length <= articleModel.TITLE_MAX_LEN
    ? ""
    : globalErrors.TITLE(
        articleModel.TITLE_MIN_LEN,
        articleModel.TITLE_MAX_LEN
      );
};

export const validContent = (content: string): string => {
  return content &&
    content.length >= articleModel.CONTENT_MIN_LEN &&
    content.length <= articleModel.CONTENT_MAX_LEN
    ? ""
    : articleErrors.CONTENT(
        articleModel.CONTENT_MIN_LEN,
        articleModel.CONTENT_MAX_LEN
      );
};

export const validImage = (image: string): string => {
  return image ? "" : globalErrors.IMAGE;
};

export const validCategory = (category: string): string => {
  return category !== categoryModel.DEFAULT_CATEGORY_SELECTED_ID
    ? ""
    : articleErrors.CATEGORY;
};
