import { api } from "./api";
import { requester } from "./requester";
import type { PlannerProps } from "../interfaces/props/PlannerProps";
import { httpMethods, serviceNames } from "../utils/constants/global";
import { handleServiceError } from "../utils/helpers/errorHandler";

export const all = async (): Promise<PlannerProps[]> => {
  try {
    const response = await requester(`${api.public.planners}`, httpMethods.GET);
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.PLANNERS);
  }
};

export const create = async (
  description: string,
  date: string,
  budget: string,
  location: string,
  bride: string,
  groom: string
): Promise<PlannerProps> => {
  try {
    const response = await requester(
      `${api.public.planners}`,
      httpMethods.POST,
      {
        description,
        date,
        budget,
        location,
        bride,
        groom,
      }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.PLANNERS);
  }
};

export const getById = async (id: string): Promise<PlannerProps> => {
  try {
    const response = await requester(
      `${api.public.planners}/${id}`,
      httpMethods.GET
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.PLANNERS);
  }
};

export const deleteById = async (id: string): Promise<PlannerProps> => {
  try {
    const response = await requester(
      `${api.public.planners}/${id}`,
      httpMethods.DELETE
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.PLANNERS);
  }
};

export const update = async (
  id: string,
  description: string,
  date: string,
  budget: string,
  location: string,
  bride: string,
  brideId: string,
  groom: string,
  groomId: string
): Promise<PlannerProps> => {
  try {
    const response = await requester(
      `${api.public.planners}/${id}`,
      httpMethods.PUT,
      {
        description,
        date,
        budget,
        location,
        bride,
        brideId,
        groom,
        groomId,
      }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.PLANNERS);
  }
};
