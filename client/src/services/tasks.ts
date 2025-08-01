import { api } from "./api";
import { requester } from "./requester";
import type { TaskProps } from "../interfaces/props/TaskProps";
import { httpMethods, serviceNames } from "../utils/constants/global";
import { handleServiceError } from "../utils/helpers/errorHandler";

export const all = async (plannerId: string): Promise<TaskProps[]> => {
  try {
    const response = await requester(
      `${api.public.tasks}/${plannerId}`,
      httpMethods.GET
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.TASKS);
  }
};

export const create = async (
  plannerId: string,
  title: string,
  description: string,
  timespan: string
): Promise<TaskProps> => {
  try {
    const response = await requester(
      `${api.public.tasks}/${plannerId}`,
      httpMethods.POST,
      {
        title,
        description,
        timespan,
      }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.TASKS);
  }
};

export const deleteById = async (id: string): Promise<TaskProps> => {
  try {
    const response = await requester(
      `${api.public.tasks}/${id}`,
      httpMethods.DELETE
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.TASKS);
  }
};

export const getById = async (
  plannerId: string,
  taskId: string
): Promise<TaskProps> => {
  try {
    const response = await requester(
      `${api.public.tasks}/${plannerId}/${taskId}`,
      httpMethods.GET
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.TASKS);
  }
};

export const update = async (
  id: string,
  title: string,
  description: string
): Promise<TaskProps> => {
  try {
    const response = await requester(
      `${api.public.tasks}/${id}`,
      httpMethods.PUT,
      {
        title,
        description,
      }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.TASKS);
  }
};
