import type { CategoryModel } from "../../models/CategoryModel";

export interface CategoryWrapperProps extends CategoryModel {
  categoryCosts: string;
}
