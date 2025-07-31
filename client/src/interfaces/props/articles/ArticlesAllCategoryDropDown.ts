export interface ArticlesAllCategoryDropDownProps {
  selectedCategoryName: string;
  onCategoryHandler: (event: React.MouseEvent<HTMLElement>) => void;
  onRemoveCategotyHandler: (event: React.MouseEvent<HTMLElement>) => void;
}
