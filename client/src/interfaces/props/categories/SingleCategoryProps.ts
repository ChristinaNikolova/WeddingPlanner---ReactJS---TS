import type { CategoryProps } from "./CategoryProps";

export interface SingleCategoryProps extends CategoryProps {
  onDeleteHandler: (id: string) => void;
}
