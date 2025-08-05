import { api } from "./api";
import { requester } from "./requester";
import type { NoteProps } from "../interfaces/props/notes/NoteProps";
import type { NoteModel } from "../interfaces/models/NoteModel";
import { httpMethods, serviceNames } from "../utils/constants/global";
import { handleServiceError } from "../utils/helpers/errorHandler";

export const all = async (plannerId: string): Promise<NoteProps[]> => {
  try {
    const response = await requester(
      `${api.public.notes}/${plannerId}`,
      httpMethods.GET
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.NOTES);
  }
};

export const create = async (
  plannerId: string,
  note: NoteModel
): Promise<NoteProps> => {
  try {
    const response = await requester(
      `${api.public.notes}/${plannerId}`,
      httpMethods.POST,
      {
        ...note,
      }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.NOTES);
  }
};

export const deleteById = async (id: string): Promise<NoteProps> => {
  try {
    const response = await requester(
      `${api.public.notes}/${id}`,
      httpMethods.DELETE
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.NOTES);
  }
};

export const getById = async (
  plannerId: string,
  noteId: string
): Promise<NoteProps> => {
  try {
    const response = await requester(
      `${api.public.notes}/${plannerId}/${noteId}`,
      httpMethods.GET
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.NOTES);
  }
};

export const update = async (
  id: string,
  note: NoteModel
): Promise<NoteProps> => {
  try {
    const response = await requester(
      `${api.public.notes}/${id}`,
      httpMethods.PUT,
      { ...note }
    );
    return response.json();
  } catch (error) {
    return handleServiceError(error, serviceNames.NOTES);
  }
};
