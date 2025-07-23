import CategoryModel from "../models/Category";
import global from "../utils/constants/global";
import { CategoryDocument } from "../interfaces/dbmodels/CategoryDocument";
import { CategoryViewModel } from "../interfaces/viewmodels/CategoryViewModel";
import category from "../utils/mapper/category";

const { errors } = global;
const { categoryViewModel } = category;

async function create(name: string, image: string): Promise<CategoryDocument> {
  let category = await getByName(name);

  if (category) {
    throw new Error(errors.NAME_TAKEN);
  }

  category = new CategoryModel({
    name,
    image,
  });

  await category.save();
  return category;
}

async function all(): Promise<CategoryViewModel[]> {
  return (await CategoryModel.find({}).sort({ name: 1 })).map(
    categoryViewModel
  );
}

async function deleteById(id: string): Promise<void | null> {
  return CategoryModel.findByIdAndDelete(id);
}

async function update(
  id: string,
  name: string,
  image: string
): Promise<CategoryDocument> {
  const category = await getById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  if (category.name.toLowerCase() !== name.toLowerCase()) {
    const result = await getByName(name);

    if (result) {
      throw new Error(errors.NAME_TAKEN);
    }
  }

  category.name = name;
  category.image = image;

  await category.save();

  return category;
}

async function getById(id: string): Promise<CategoryDocument | null> {
  return CategoryModel.findById(id);
}

async function getByName(name: string): Promise<CategoryDocument | null> {
  return await CategoryModel.findOne({ name }).collation({
    locale: "en",
    strength: 2,
  });
}

export default {
  create,
  all,
  deleteById,
  getById,
  update,
};
