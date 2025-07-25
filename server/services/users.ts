import ArticleModel from "../models/Article";
import { InputObjectId } from "../interfaces/InputObjectId";
import article from "../utils/mapper/article";
import { ArticleListViewModel } from "../interfaces/viewmodels/ArticleListViewModel";

const { articleListViewModel } = article;

async function getFavArticles(
  userId: InputObjectId
): Promise<ArticleListViewModel[]> {
  return (await ArticleModel.find({}))
    .filter((a) => a.likes.includes(userId))
    .map(articleListViewModel);
}

export default {
  getFavArticles,
};
