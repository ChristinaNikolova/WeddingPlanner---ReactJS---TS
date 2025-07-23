import { CategoryDocument } from "../../interfaces/dbmodels/CategoryDocument";
import { CategoryNameViewModel } from "../../interfaces/viewmodels/CategoryNameViewModel";
import { CategoryViewModel } from "../../interfaces/viewmodels/CategoryViewModel";

function categoryViewModel(category: CategoryDocument): CategoryViewModel {
  return {
    id: category._id.toString(),
    name: category.name,
    image: category.image,
  };
}

function categoryNameViewModel(
  category: CategoryDocument
): CategoryNameViewModel {
  return {
    id: category._id.toString(),
    name: category.name,
  };
}

export default {
  categoryViewModel,
  categoryNameViewModel,
};
