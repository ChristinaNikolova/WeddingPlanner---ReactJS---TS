import { InputObjectId } from "../interfaces/dbmodels/InputObjectId";
import { PlannerDocument } from "../interfaces/dbmodels/PlannerDocument";
import { PlannerViewModel } from "../interfaces/viewmodels/PlannerViewModel";
import guests from "./guests";
import PlannerModel from "../models/Planner";
import planner from "../utils/mapper/planner";

const { create: createGuest, update: updateGuest } = guests;
const { plannerViewModel } = planner;

async function allByUserId(userId: InputObjectId): Promise<PlannerViewModel[]> {
  return (
    await PlannerModel.find({ creator: userId }).sort({
      createdAt: -1,
    })
  ).map(plannerViewModel);
}

async function create(
  description: string,
  date: string,
  budget: number,
  location: string,
  bride: string,
  groom: string,
  userId: InputObjectId
): Promise<PlannerDocument> {
  const [brideFirstName, brideLastName] = splitName(bride);
  const brideAsGuestResult = await createGuest(
    brideFirstName,
    brideLastName,
    "female",
    "adult",
    "bride",
    "bride",
    "",
    "no info",
    true
  );

  const [groomFirstName, groomLastName] = splitName(groom);
  const groomAsGuestResult = await createGuest(
    groomFirstName,
    groomLastName,
    "male",
    "adult",
    "groom",
    "groom",
    "",
    "no info",
    true
  );

  const planner = new PlannerModel({
    title: `${bride} & ${groom}`,
    description,
    date,
    budget: Number(budget),
    location,
    bride: brideAsGuestResult._id,
    groom: groomAsGuestResult._id,
    creator: userId,
  });

  await planner.save();

  (planner.guests as InputObjectId[]).push(brideAsGuestResult._id);
  (planner.guests as InputObjectId[]).push(groomAsGuestResult._id);

  await planner.save();

  return planner;
}

async function getById(
  id: InputObjectId,
  hasToCast: boolean
): Promise<PlannerDocument | PlannerViewModel> {
  const planner = await PlannerModel.findById(id)
    .populate("bride", "firstName lastName")
    .populate("groom", "firstName lastName")
    .populate("guests", "confirmed side")
    .populate("costs", "price")
    .populate({
      path: "tasks",
      populate: {
        path: "subtasks",
      },
    })
    .populate("notes")
    .populate("events", "isHighlighted");

  if (!planner) {
    throw new Error(errors.PLANNER_NOT_FOUND);
  }

  return hasToCast ? plannerViewModel(planner) : planner;
}

async function deleteById(id: InputObjectId): Promise<PlannerDocument | null> {
  return PlannerModel.findByIdAndDelete(id);
}

async function update(
  id: InputObjectId,
  description: string,
  date: string,
  budget: string,
  location: string,
  bride: string,
  brideId: InputObjectId,
  groom: string,
  groomId: InputObjectId
): Promise<PlannerDocument> {
  const planner = (await getById(id, false)) as PlannerDocument;

  const [brideFirstName, brideLastName] = splitName(bride);
  await updateGuest(
    brideId,
    brideFirstName,
    brideLastName,
    "female",
    "adult",
    "bride",
    "bride",
    "",
    "no info",
    true
  );

  const [groomFirstName, groomLastName] = splitName(groom);
  await updateGuest(
    groomId,
    groomFirstName,
    groomLastName,
    "male",
    "adult",
    "groom",
    "groom",
    "",
    "no info",
    true
  );

  planner.title = `${bride} & ${groom}`;
  planner.description = description;
  planner.date = date;
  planner.budget = Number(budget);
  planner.location = location;
  planner.description = description;

  await planner.save();

  return planner;
}

function splitName(name: string): string[] {
  return name.split(" ").map((n) => n.trim());
}

export default {
  allByUserId,
  create,
  getById,
  deleteById,
  update,
};
