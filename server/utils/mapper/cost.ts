import { CostDocument } from "../../interfaces/dbmodels/CostDocument";
import { CostViewModel } from "../../interfaces/viewmodels/CostViewModel";

function costViewModel(cost: CostDocument): CostViewModel {
  return {
    id: cost._id.toString(),
    title: cost.title,
    price: Number(cost.price).toFixed(2),
    category: cost.category as string,
  };
}

export default {
  costViewModel,
};
