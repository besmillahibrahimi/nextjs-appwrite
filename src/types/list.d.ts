type ISortOption<T> = {
  label: string;
  value: keyof T;
};

type ISort<T> = { sortBy: keyof T; ascending?: boolean };
type SortDropdownProps<T> = {
  sort?: ISort<T>;
  sortOptions: ISortOption<T>[];
  onSort?: (sortBy: keyof T, ascending?: boolean) => void;
};

type FilterDialogProps<T> = {
  filterSchema: IFilterSchema<Partial<T>>;
  filter?: IFilterState<T>;
  onFilter?: (filters: Partial<IFilterState<T>>) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

type FieldSchema<T> = FilterField<T> & {
  label: React.ReactNode;
};

type IFilterSchemaItemInput<T> = FieldSchema<T> & {
  type: "input";
};

type IFilterSchemaItemCheckbox<T> = FieldSchema<T> & {
  type: "checkbox";
};

type IFilterSchemaItemRadio<T> = FieldSchema<T> & {
  type: "radio";
  options: string[];
};
type IFilterSchemaItemSelect<T> = FieldSchema<T> & {
  type: "select";
  options: string[];
};

type IFilterSchemaItemBSelect<T, Option> = FieldSchema<T> & {
  type: "b-select";
  options: Option[];
  multiple?: boolean;
};

type IFilterSchemaItemRange<T> = FieldSchema<T> & {
  type: "range";
  min: number;
  max: number;
};

type IFilterSchema<T> = {
  [K in keyof T]:
    | IFilterSchemaItemInput<T[K]>
    | IFilterSchemaItemCheckbox<T[K]>
    | IFilterSchemaItemRadio<T[K]>
    | IFilterSchemaItemSelect<T[K]>
    | IFilterSchemaItemBSelect<T[K]>
    | IFilterSchemaItemRange<T[K]>;
};

type IFilterState<T> = Filter<T>;

type IListHeaderProps<T> = {
  onSearch?: (query: string) => void;
  sortProps?: SortDropdownProps<T>;
  filterProps?: FilterDialogProps<T>;
};

type IListFooterProps = {
  currentPage: number;
  onPageChange?: (page: number) => void;
  totalItems: number;
  itemsPerPage?: number;
  showDetails?: boolean;
};

type ListProps<T> = IListHeaderProps<T> &
  IListFooterProps & {
    className?: string;
    items: T[];
    loading?: boolean;
    renderItem: (item: T) => React.ReactNode;
    skeleton?: React.ReactNode;
    emptyNode?: React.ReactNode;
  };
