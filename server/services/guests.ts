import PlannerModel from "../models/Planner";
import GuestModel from "../models/Guest";
import { InputObjectId } from "../interfaces/dbmodels/InputObjectId";
import { GuestViewModel } from "../interfaces/viewmodels/GuestViewModel";
import { GuestDocument } from "../interfaces/dbmodels/GuestDocument";
import { Gender } from "../interfaces/enums/Gender";
import { Age } from "../interfaces/enums/Age";
import { Side } from "../interfaces/enums/Side";
import { Role } from "../interfaces/enums/Role";
import { MainDish } from "../interfaces/enums/MainDish";
import guest from "../utils/mapper/guest";
import global from "../utils/constants/global";
import validator from "../utils/validator";

const { guestViewModel } = guest;
const { errors } = global;
const { validateEnum } = validator;

async function all(plannerId: InputObjectId): Promise<GuestViewModel[]> {
  const planner = await PlannerModel.findById(plannerId).populate("guests");

  if (!planner) {
    throw new Error(errors.PLANNER_NOT_FOUND);
  }

  return (planner.guests as GuestDocument[]).map(guestViewModel);
}

async function create(
  firstName: string,
  lastName: string,
  gender: string,
  age: string,
  side: string,
  role: string,
  table: string,
  mainDish: string,
  confirmed: boolean,
  plannerId?: InputObjectId
): Promise<GuestDocument> {
  const guest = new GuestModel({
    firstName,
    lastName,
    gender,
    age,
    side,
    role,
    table,
    mainDish,
    confirmed: confirmed,
  });

  const result = await guest.save();

  if (plannerId) {
    const planner = await PlannerModel.findById(plannerId);

    if (!planner) {
      throw new Error(errors.PLANNER_NOT_FOUND);
    }

    (planner.guests as InputObjectId[]).push(result._id);
    await planner.save();
  }

  return result;
}

async function update(
  id: InputObjectId,
  firstName: string,
  lastName: string,
  gender: string,
  age: string,
  side: string,
  role: string,
  table: string,
  mainDish: string,
  confirmed: boolean
): Promise<GuestDocument> {
  const guest = (await getById(id, false)) as GuestDocument;

  guest.firstName = firstName;
  guest.lastName = lastName;
  guest.gender = validateEnum(gender, Gender, "gender");
  guest.age = validateEnum(age, Age, "age");
  guest.side = validateEnum(side, Side, "side");
  guest.role = validateEnum(role, Role, "role");
  guest.table = table;
  guest.mainDish = validateEnum(mainDish, MainDish, "mainDish");
  guest.confirmed = confirmed;

  await guest.save();

  return guest;
}

async function getById(
  id: InputObjectId,
  hasToCast: boolean
): Promise<GuestDocument | GuestViewModel> {
  const guest = await GuestModel.findById(id);

  if (!guest) {
    throw new Error(errors.GUEST_NOT_FOUND);
  }

  return hasToCast ? guestViewModel(guest) : guest;
}

async function deleteById(id: InputObjectId): Promise<GuestDocument | null> {
  return GuestModel.findByIdAndDelete(id);
}

export default {
  create,
  update,
  all,
  deleteById,
  getById,
};
