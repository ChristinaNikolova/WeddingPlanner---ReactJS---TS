export interface SingleCategoryProps {
  id: string;
  name: string;
  image?: string;
  onDeleteHandler: (id: string) => void;
}
