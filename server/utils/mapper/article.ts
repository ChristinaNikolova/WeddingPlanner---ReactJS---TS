import { ArticleDocument } from "../../interfaces/dbmodels/ArticleDocument";
import { CategoryDocument } from "../../interfaces/dbmodels/CategoryDocument";
import { ArticleListViewModel } from "../../interfaces/viewmodels/ArticleListViewModel";
import { ArticleDetailsViewModel } from "../../interfaces/viewmodels/ArticleDetailsViewModel";
import category from "./category";
import parser from "../parser";

const { categoryNameViewModel, categoryViewModel } = category;
const { formatCreatedAt } = parser;

function articleListViewModel(article: ArticleDocument): ArticleListViewModel {
  return {
    id: article._id.toString(),
    title: article.title,
    shortContent: article.content.slice(0, 200) + "...",
    image: article.image,
    category: categoryNameViewModel(article.category as CategoryDocument),
    createdAt: formatCreatedAt(article.createdAt),
  };
}

function articleDetailsViewModel(
  article: ArticleDocument
): ArticleDetailsViewModel {
  return {
    id: article._id.toString(),
    title: article.title,
    shortContent: article.content.slice(0, article.content.indexOf(".") + 1),
    content: splitContentIntoArray(
      article.content.slice(article.content.indexOf(".") + 1)
    ),
    image: article.image,
    jumboImage: article.jumboImage,
    likesCount: article.likes.length,
    likes: article.likes,
    category: categoryViewModel(article.category as CategoryDocument),
    createdAt: formatCreatedAt(article.createdAt),
  };
}

function splitContentIntoArray(content: string): string[] {
  let sentences = content
    .split(".")
    .map((x) => x.trim())
    .filter((x) => x !== "")
    .map((x) => x + ".");

  let result = [];

  while (sentences.length > 0) {
    const currentGroupSentences = sentences.splice(0, 5);
    result.push(currentGroupSentences.join(""));
  }

  return result;
}

export default {
  articleListViewModel,
  articleDetailsViewModel,
};
