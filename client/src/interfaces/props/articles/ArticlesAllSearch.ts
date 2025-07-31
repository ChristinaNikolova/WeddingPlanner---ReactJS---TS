export interface ArticlesAllSearchProps {
  isSearchIconClicked: boolean;
  query: string;
  onShowSearchForm: (event: React.MouseEvent<HTMLInputElement>) => void;
  onSearch: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
