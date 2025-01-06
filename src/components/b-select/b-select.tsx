import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Button } from "../ui/button";

export default function BSelect<T>({
  options,
  getLabel,
  getValue,
  renderOption,
  placeholder = "Select an option",
  ...props
}: Readonly<BSelectProps<T>>) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<T[]>(
    props.value
      ? Array.isArray(props.value)
        ? props.value
        : [props.value]
      : [],
  );

  function getOptionValue(value: T): string | null | number {
    if (getValue) return getValue(value);
    if (typeof value !== "object" || !value) return String(value);

    if ("id" in value) {
      return value.id as string;
    }
    if ("value" in value) {
      return value.value as string;
    }

    return value as unknown as string;
  }

  function getOptionLabel(value: T): ReactNode {
    if (getLabel) return getLabel(value);

    if (typeof value !== "object" || !value) return value as ReactNode;

    if ("label" in value) return value.label as string;

    return value as unknown as string;
  }

  const handleSelect = (option: T) => {
    let newSelected: T[];
    if (!props.multiple) {
      newSelected = [option];
    } else {
      newSelected = selected.some(
        (item) => getOptionValue(item) === getOptionValue(option),
      )
        ? selected.filter(
            (item) => getOptionValue(item) !== getOptionValue(option),
          )
        : [...selected, option];
    }
    setSelected(newSelected);
    props.multiple ? props.onChange?.(newSelected) : props.onChange?.(option);
  };

  const handleRemove = (option: T) => {
    const newSelected = selected.filter(
      (item) => getOptionValue(item) !== getOptionValue(option),
    );
    setSelected(newSelected);
    props.multiple && props.onChange?.(newSelected);
  };

  const getSinglePlaceholder = () =>
    selected.length > 0 ? getOptionLabel(selected[0]) : placeholder;
  const getMulitpPlaceholder = () =>
    selected.length > 0 ? (
      <div className="flex flex-wrap gap-2 p-2">
        {selected.map((option) => (
          <div
            key={getOptionValue(option)}
            className="flex items-center gap-x-2 border rounded px-1"
          >
            {getOptionLabel(option)}
            <button type="button" onClick={() => handleRemove(option)}>
              <X
                size={"15"}
                className="hover:scale-125 hover:rotate-180 transition-all duration-300"
              />
            </button>
          </div>
        ))}
      </div>
    ) : (
      <Button
        type="button"
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role="combobox"
        aria-controls="options"
        aria-expanded={open}
        className="w-full justify-start px-2 py-0 text-base font-normal"
      >
        {placeholder}
      </Button>
    );

  return (
    <div className="">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          className={cn(
            " bg-input rounded-md border-0 hover:bg-input/80 hover:border ",
            props.multiple ? "min-h-11 h-max" : "h-11",
          )}
        >
          {!props.multiple ? (
            <Button
              // biome-ignore lint/a11y/useSemanticElements: <explanation>
              role="combobox"
              type="button"
              aria-controls="options"
              aria-expanded={open}
              className="w-full justify-between text-base font-normal px-3"
            >
              {getSinglePlaceholder()}
            </Button>
          ) : (
            getMulitpPlaceholder()
          )}
        </PopoverTrigger>
        <PopoverContent className="!w-full p-0 ">
          <Command className="w-full ">
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandGroup>
                {options?.map((option) => (
                  <CommandItem
                    key={getOptionValue(option)}
                    onSelect={() => handleSelect(option)}
                  >
                    <div>
                      <span className="absolute right-2 flex top-0 bottom-0 my-auto h-3.5 w-3.5 items-center justify-center">
                        {selected.some(
                          (item) =>
                            getOptionValue(item) === getOptionValue(option),
                        ) && "✓"}
                      </span>
                    </div>
                    {renderOption
                      ? renderOption(option)
                      : getOptionLabel(option)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
