import type { ArticleModel } from "../../models/ArticleModel";
import type { BaseModel } from "../../models/BaseModel";

export interface ArticleProps extends BaseModel, ArticleModel {
  shortContent: string;
  createdAt?: string;
}
