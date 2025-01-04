type BSelectBaseProps<T> = {
  getLabel?: (item: T) => React.ReactNode;
  getValue?: (item: T) => string | number;

  options: T[];

  renderOption?: (item: T) => React.ReactNode;

  placeholder?: React.ReactNode;
};

type SingleSelection<T> = BSelectBaseProps<T> & {
  multiple?: false | undefined;

  value?: T;
  onChange?: (value: T) => void;
};

type MultipelSelection<T> = BSelectBaseProps<T> & {
  multiple: true;

  value?: T[];
  onChange?: (value: T[]) => void;
};

type BSelectProps<T> = SingleSelection<T> | MultipelSelection<T>;
