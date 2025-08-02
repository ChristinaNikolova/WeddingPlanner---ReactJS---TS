import { api } from "./api";
import { requester } from "./requester";
import type { GuestProps } from "../interfaces/props/GuestProps";
import { httpMethods, serviceNames } from "../utils/constants/global";
import { handleServiceError } from "../utils/helpers/errorHandler";

export const all = async (plannerId: string): Promise<GuestProps[]> => {
  try {
    const response = await requester(
      `${api.public.guests}/${plannerId}`,
      httpMethods.GET
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.GUESTS);
  }
};

// todo use the types here??
export const create = async (
  plannerId: string,
  firstName: string,
  lastName: string,
  gender: string,
  age: string,
  side: string,
  role: string,
  table: string,
  mainDish: string,
  confirmed: string
): Promise<GuestProps> => {
  try {
    const response = await requester(
      `${api.public.guests}/${plannerId}`,
      httpMethods.POST,
      {
        firstName,
        lastName,
        gender,
        age,
        side,
        role,
        table,
        mainDish,
        confirmed,
      }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.GUESTS);
  }
};

export const deleteById = async (id: string): Promise<GuestProps> => {
  try {
    const response = await requester(
      `${api.public.guests}/${id}`,
      httpMethods.DELETE
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.GUESTS);
  }
};

// todo use types here??
export const update = async (
  id: string,
  firstName: string,
  lastName: string,
  gender: string,
  age: string,
  side: string,
  role: string,
  table: string,
  mainDish: string,
  confirmed: boolean
): Promise<GuestProps> => {
  try {
    const response = await requester(
      `${api.public.guests}/${id}`,
      httpMethods.PUT,
      {
        firstName,
        lastName,
        gender,
        age,
        side,
        role,
        table,
        mainDish,
        confirmed,
      }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.GUESTS);
  }
};

export const getById = async (
  plannerId: string,
  guestId: string
): Promise<GuestProps> => {
  try {
    const response = await requester(
      `${api.public.guests}/${plannerId}/${guestId}`,
      httpMethods.GET
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.GUESTS);
  }
};
