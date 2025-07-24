import { ArticleDocument } from "../interfaces/dbmodels/ArticleDocument";
import { InputObjectId } from "../interfaces/InputObjectId";
import ArticleModel from "../models/Article";
import { ArticleListViewModel } from "../interfaces/viewmodels/ArticleListViewModel";
import { ArticleDetailsViewModel } from "../interfaces/viewmodels/ArticleDetailsViewModel";
import article from "../utils/mapper/article";
import global from "../utils/constants/global";

const { articleListViewModel, articleDetailsViewModel } = article;
const { errors } = global;

async function create(
  title: string,
  content: string,
  image: string,
  jumboImage: string,
  category: InputObjectId
): Promise<ArticleDocument> {
  let article = await getByTitle(title);

  if (article) {
    throw new Error(errors.TITEL_TAKEN);
  }

  article = new ArticleModel({
    title,
    content,
    image,
    jumboImage,
    category,
  });

  await article.save();

  return article;
}

async function update(
  id: InputObjectId,
  title: string,
  content: string,
  image: string,
  jumboImage: string,
  category: InputObjectId
): Promise<ArticleDocument> {
  const article = (await getById(id, false)) as ArticleDocument;

  if (article.title.toLowerCase() !== title.toLowerCase()) {
    const result = await getByTitle(title);

    if (result) {
      throw new Error(errors.TITEL_TAKEN);
    }
  }

  article.title = title;
  article.content = content;
  article.image = image;
  article.jumboImage = jumboImage;
  article.category = category;

  await article.save();

  return article;
}

async function all(
  take: number,
  skip: number,
  selectedCategory: InputObjectId,
  searchedQuery: string
): Promise<ArticleListViewModel[]> {
  return (
    await ArticleModel.find(
      selectedCategory ? { category: selectedCategory } : {}
    )
      .find(
        searchedQuery ? { title: { $regex: searchedQuery, $options: "i" } } : {}
      )
      .populate("category", "name")
      .sort({ createdAt: -1, title: 1 })
      .skip(skip)
      .limit(take)
  ).map(articleListViewModel);
}

async function getTotalCount(
  selectedCategory: InputObjectId,
  searchedQuery: string
): Promise<number> {
  return (
    await ArticleModel.find(
      selectedCategory ? { category: selectedCategory } : {}
    ).find(
      searchedQuery ? { title: { $regex: searchedQuery, $options: "i" } } : {}
    )
  ).length;
}

async function getById(
  id: InputObjectId,
  hasToCast: boolean
): Promise<ArticleDetailsViewModel | ArticleDocument> {
  const article = await ArticleModel.findById(id).populate(
    "category",
    "name image"
  );

  if (!article) {
    throw new Error(errors.ARTICLE_NOT_FOUND);
  }

  return hasToCast ? articleDetailsViewModel(article) : article;
}

async function like(
  id: InputObjectId,
  userId: InputObjectId
): Promise<ArticleDocument> {
  const article = await ArticleModel.findById(id);

  if (!article) {
    throw new Error(errors.ARTICLE_NOT_FOUND);
  }

  if (article.likes.includes(userId)) {
    const index = article.likes.indexOf(userId);
    article.likes.splice(index, 1);
  } else {
    article.likes.push(userId);
  }

  return article.save();
}

async function getByTitle(title: string): Promise<ArticleDocument | null> {
  return await ArticleModel.findOne({ title }).collation({
    locale: "en",
    strength: 2,
  });
}

async function deleteById(id: InputObjectId): Promise<void | null> {
  return ArticleModel.findByIdAndDelete(id);
}

async function getLastThree(): Promise<ArticleListViewModel[]> {
  return (
    await ArticleModel.find({}).sort({ createdAt: -1, title: 1 }).limit(3)
  ).map(articleListViewModel);
}

export default {
  create,
  all,
  getTotalCount,
  getById,
  like,
  deleteById,
  update,
  getLastThree,
};
