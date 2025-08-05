import { api } from "./api";
import { requester } from "./requester";
import type { EventProps } from "../interfaces/props/events/EventProps";
import type { EventModel } from "../interfaces/models/EventModel";
import { httpMethods, serviceNames } from "../utils/constants/global";
import { handleServiceError } from "../utils/helpers/errorHandler";

export const all = async (plannerId: string): Promise<EventProps[]> => {
  try {
    const response = await requester(
      `${api.public.events}/${plannerId}`,
      httpMethods.GET
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.EVENTS);
  }
};

export const create = async (
  plannerId: string,
  event: EventModel
): Promise<EventProps> => {
  try {
    const response = await requester(
      `${api.public.events}/${plannerId}`,
      httpMethods.POST,
      {
        ...event,
      }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.EVENTS);
  }
};

export const heightlight = async (
  plannerId: string,
  eventId: string
): Promise<EventProps> => {
  try {
    const response = await requester(
      `${api.public.events}/${plannerId}/${eventId}`,
      httpMethods.POST
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.EVENTS);
  }
};

export const deleteById = async (id: string): Promise<EventProps> => {
  try {
    const response = await requester(
      `${api.public.events}/${id}`,
      httpMethods.DELETE
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.EVENTS);
  }
};

export const getById = async (
  plannerId: string,
  eventId: string
): Promise<EventProps> => {
  try {
    const response = await requester(
      `${api.public.events}/${plannerId}/${eventId}`,
      httpMethods.GET
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.EVENTS);
  }
};

export const update = async (
  id: string,
  event: EventModel
): Promise<EventProps> => {
  try {
    const response = await requester(
      `${api.public.events}/${id}`,
      httpMethods.PUT,
      {
        ...event,
      }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.EVENTS);
  }
};
