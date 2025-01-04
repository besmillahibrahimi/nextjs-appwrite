type FilterOperator = "eq" | "neq" | "lt" | "lte" | "gt" | "gte" | "in";

type FilterField<ValueType> = {
  value: ValueType;
  operator: FilterOperator;
};

type Filter<T> = {
  [K in keyof T]: FilterField<T[K]>;
};
