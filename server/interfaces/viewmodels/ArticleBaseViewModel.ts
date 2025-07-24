import { ObjectId } from "mongoose";

export interface ArticleBaseViewModel {
  id: string;
  title: string;
  shortContent: string;
  image: string;
  createdAt: string;
}
