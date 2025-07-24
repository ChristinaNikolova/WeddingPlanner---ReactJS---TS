import { Schema, model, Types } from "mongoose";
import { ArticleDocument } from "../interfaces/dbmodels/ArticleDocument";
import modelConstants from "../utils/constants/model";

const { ObjectId } = Types;
const { article } = modelConstants;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [
        article.TITLE_MIN_LEN,
        `Title should be at least ${article.TITLE_MIN_LEN} characters long`,
      ],
      maxlength: [
        article.TITLE_MAX_LEN,
        `Title should be maximal ${article.TITLE_MAX_LEN} characters long`,
      ],
      unique: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [
        article.CONTENT_MIN_LEN,
        `Content should be at least ${article.CONTENT_MIN_LEN} characters long`,
      ],
      maxlength: [
        article.CONTENT_MAX_LEN,
        `Content should be maximal ${article.CONTENT_MAX_LEN} characters long`,
      ],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    jumboImage: {
      type: String,
      required: [true, "Jumbo image is required"],
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    likes: {
      type: [ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

articleSchema.index(
  { title: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const ArticleModel = model<ArticleDocument>("Article", articleSchema);

export default ArticleModel;
