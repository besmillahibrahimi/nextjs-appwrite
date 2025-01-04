import type { ComponentProps, ReactNode } from "react";
import type { Control, ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox, type CheckboxProps } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import type { SelectProps } from "@radix-ui/react-select";
import BSelect from "./b-select";

type BaseProps<T extends FieldValues> = {
  className?: string;
  name: Path<T>;
  control: Control<T>;
  label?: ReactNode;
  helper?: ReactNode;
  render?: (field: ControllerRenderProps<T, Path<T>>) => ReactNode;
};
type FieldInputProps<T extends FieldValues> = BaseProps<T> & {
  type: "input";
  inputProps?: ComponentProps<"input">;
};
type FieldCheckboxProps<T extends FieldValues> = BaseProps<T> & {
  type: "checkbox";
  checkboxProps?: CheckboxProps;
};
type FieldBSelectProps<T extends FieldValues, Option> = BaseProps<T> & {
  type: "b-select";
  selectProps: BSelectProps<Option>;
};
type FieldSelectProps<T extends FieldValues> = BaseProps<T> & {
  type: "select";
  selectProps?: SelectProps;
  options: string[];
};
type InputFieldProps<T extends FieldValues, Option> =
  | FieldInputProps<T>
  | FieldCheckboxProps<T>
  | FieldSelectProps<T>
  | FieldBSelectProps<T, Option>;

export function InputField<T extends FieldValues, Option = unknown>(props: Readonly<InputFieldProps<T, Option>>) {
  const { control, name, type, label, render, className, helper } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {(() => {
              if (render) {
                return render(field);
              }

              let Com: React.ReactNode;
              switch (type) {
                case "input":
                  if (props.inputProps?.type === "number")
                    Com = (
                      <Input
                        {...props.inputProps}
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    );
                  else Com = <Input {...props.inputProps} {...field} />;
                  break;
                case "checkbox":
                  Com = (
                    <Checkbox
                      onCheckedChange={field.onChange}
                      checked={field.value}
                      {...field}
                      {...props.checkboxProps}
                    />
                  );
                  break;
                case "select":
                  Com = (
                    <Select onValueChange={field.onChange} defaultValue={field.value} {...props.selectProps}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {props.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                  break;
                case "b-select":
                  Com = (
                    <BSelect
                      value={field.value}
                      onChange={(value: Option | Option[]) => field.onChange(value)}
                      {...props.selectProps}
                    />
                  );
                  break;
                default:
                  throw new Error("Invalid type");
              }
              return Com;
            })()}
          </FormControl>
          {helper && <FormDescription>{helper}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
