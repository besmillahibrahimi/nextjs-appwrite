type BAutocompleteProps<T> = BSelectBaseProps<T> & {
  searchKey?: keyof T;
  valueKey?: keyof T;
};
