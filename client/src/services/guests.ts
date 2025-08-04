import { api } from "./api";
import { requester } from "./requester";
import type { GuestProps } from "../interfaces/props/guests/GuestProps";
import type { GuestModel } from "../interfaces/models/GuestModel";
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

export const create = async (
  plannerId: string,
  guest: GuestModel
): Promise<GuestProps> => {
  try {
    const response = await requester(
      `${api.public.guests}/${plannerId}`,
      httpMethods.POST,
      {
        ...guest,
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

export const update = async (
  id: string,
  guest: GuestModel
): Promise<GuestProps> => {
  try {
    const response = await requester(
      `${api.public.guests}/${id}`,
      httpMethods.PUT,
      {
        ...guest,
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
