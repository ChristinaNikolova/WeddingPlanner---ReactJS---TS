import { api } from "./api";
import { requester } from "./requester";
import type { SubtaskProps } from "../interfaces/props/SubtaskProps";
import { httpMethods, serviceNames } from "../utils/constants/global";
import { handleServiceError } from "../utils/helpers/errorHandler";

export const create = async (
  taskId: string,
  description: string
): Promise<SubtaskProps> => {
  try {
    const response = await requester(
      `${api.public.subtasks}/${taskId}`,
      httpMethods.POST,
      {
        description,
      }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.SUBTASKS);
  }
};

export const done = async (
  taskId: string,
  subtaskId: string
): Promise<SubtaskProps> => {
  try {
    const response = await requester(
      `${api.public.subtasks}/${taskId}/${subtaskId}`,
      httpMethods.POST
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.SUBTASKS);
  }
};

export const deleteById = async (
  taskId: string,
  subtaskId: string
): Promise<SubtaskProps> => {
  try {
    const response = await requester(
      `${api.public.subtasks}/${taskId}/${subtaskId}`,
      httpMethods.DELETE
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.SUBTASKS);
  }
};

export const getById = async (id: string): Promise<SubtaskProps> => {
  try {
    const response = await requester(
      `${api.public.subtasks}/${id}`,
      httpMethods.GET
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.SUBTASKS);
  }
};

export const update = async (
  id: string,
  description: string
): Promise<SubtaskProps> => {
  try {
    const response = await requester(
      `${api.public.subtasks}/${id}`,
      httpMethods.PUT,
      { description }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.SUBTASKS);
  }
};
