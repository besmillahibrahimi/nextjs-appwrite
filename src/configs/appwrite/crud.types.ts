type CrudResponse<T> = {
  data?: T;
  error?: Error;
};

type ReadResponse<T> = CrudResponse<T> & {
  total?: number;
};

type DeleteResponse = {
  success?: boolean;
  error?: Error;
};
