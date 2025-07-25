import { GuestDocument } from "../../interfaces/dbmodels/GuestDocument";
import { GuestViewModel } from "../../interfaces/viewmodels/GuestViewModel";

function guestViewModel(guest: GuestDocument): GuestViewModel {
  return {
    id: guest._id.toString(),
    firstName: guest.firstName,
    lastName: guest.lastName,
    gender: guest.gender,
    age: guest.age,
    side: guest.side,
    role: guest.role,
    table: guest.table,
    mainDish: guest.mainDish,
    confirmed: guest.confirmed,
  };
}

export default {
  guestViewModel,
};
