import { api } from "./api";
import { requester } from "./requester";
import type { PlannerProps } from "../interfaces/props/planners/PlannerProps";
import type { PlannerModel } from "../interfaces/models/PlannerModel";
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

export const create = async (planner: PlannerModel): Promise<PlannerProps> => {
  try {
    const response = await requester(
      `${api.public.planners}`,
      httpMethods.POST,
      {
        ...planner,
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
  planner: PlannerModel,
  brideId: string,
  groomId: string
): Promise<PlannerProps> => {
  try {
    const response = await requester(
      `${api.public.planners}/${id}`,
      httpMethods.PUT,
      {
        ...planner,
        brideId,
        groomId,
      }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.PLANNERS);
  }
};
