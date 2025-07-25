import { CostDocument } from "../interfaces/dbmodels/CostDocument";
import { PlannerDocument } from "../interfaces/dbmodels/PlannerDocument";
import { InputObjectId } from "../interfaces/InputObjectId";
import { CostViewModel } from "../interfaces/viewmodels/CostViewModel";
import CostModel from "../models/Cost";
import PlannerModel from "../models/Planner";
import cost from "../utils/mapper/cost";

const { costViewModel } = cost;

async function all(plannerId: InputObjectId): Promise<CostViewModel[]> {
  const planner = await PlannerModel.findById(plannerId).populate("costs");

  if (!planner) {
    //todo add error
    throw new Error("no planner");
  }

  return (planner.costs as CostDocument[])
    .sort((a, b) => a.title.localeCompare(b.title))
    .map(costViewModel);
}

async function create(
  plannerId: InputObjectId,
  title: string,
  price: string,
  category: InputObjectId
): Promise<CostDocument> {
  const cost = new CostModel({
    title,
    price: Number(price),
    category,
  });

  const result = await cost.save();

  const planner = await PlannerModel.findById(plannerId);

  if (!planner) {
    // todo add error
    throw new Error("No planner");
  }

  (planner.costs as InputObjectId[]).push(result._id);
  await planner.save();

  return result;
}

async function deleteById(id: InputObjectId): Promise<CostDocument | null> {
  return CostModel.findByIdAndDelete(id);
}

async function getById(
  id: InputObjectId,
  hasToCast: boolean
): Promise<CostViewModel | CostDocument> {
  const cost = await CostModel.findById(id);

  if (!cost) {
    // todo add error
    throw new Error("No cost");
  }

  return hasToCast ? costViewModel(cost) : cost;
}

async function update(
  id: InputObjectId,
  title: string,
  price: string
): Promise<CostDocument> {
  const cost = (await getById(id, false)) as CostDocument;

  cost.title = title;
  cost.price = Number(price);

  await cost.save();

  return cost;
}

export default {
  all,
  create,
  deleteById,
  update,
  getById,
};
