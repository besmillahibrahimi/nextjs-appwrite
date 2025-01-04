"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { FilterIcon } from "lucide-react";
import { useEffect, useState } from "react";
import BSelect from "../b-select";

export function FilterDialog<T>({
  filterSchema,
  onFilter,
  filter,
  title = "Filter Options",
  description,
}: Readonly<FilterDialogProps<T>>) {
  const [filters, setFilters] = useState<Partial<IFilterState<T>>>(filter ?? {});

  useEffect(() => {
    setFilters(filter ?? {});
  }, [filter]);

  const handleFilterChange = (key: string, value: string | boolean | number | string[], operator: FilterOperator) => {
    setFilters((prev) => ({ ...prev, [key]: { value, operator: operator } }));
  };

  const handleApplyFilters = () => {
    onFilter?.(filters);
  };
  const clearFilters = () => {
    const clearedFilters: Partial<IFilterState<T>> = {};
    Object.keys(filterSchema)?.forEach((k) => {
      const key = k as keyof T;
      if (filterSchema[key])
        clearedFilters[key] = {
          value: (filterSchema[key].type === "checkbox" ? false : "") as any,
          operator: filterSchema[key].operator,
        };
    });
    setFilters(clearedFilters);
    onFilter?.(clearedFilters);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <FilterIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="Dialog for filtering a list." className="">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Object.keys(filterSchema).map((k) => {
            let key = k as keyof T;
            const item = filterSchema[key];
            if (!item) return null;
            return (
              <div key={k} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={k} className="text-right">
                  {item.label}
                </Label>
                {item.type === "input" && (
                  <Input
                    id={k}
                    className="col-span-3"
                    value={(filters[key]?.value as string) ?? ""}
                    onChange={(e) => handleFilterChange(k, e.target.value, item.operator)}
                  />
                )}
                {item.type === "checkbox" && (
                  <Checkbox
                    id={k}
                    checked={(filters[key]?.value as boolean) || false}
                    onCheckedChange={(checked) => handleFilterChange(k, checked, item.operator)}
                  />
                )}
                {item.type === "radio" && item.options && (
                  <RadioGroup
                    className="col-span-3"
                    value={filters[key]?.value as string}
                    onValueChange={(value) => handleFilterChange(k, value, item.operator)}
                  >
                    {item.options.map((option: string) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`${k}-${option}`} />
                        <Label htmlFor={`${k}-${option}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                {item.type === "select" && item.options && (
                  <Select
                    value={filters[key]?.value as string}
                    onValueChange={(value) => handleFilterChange(k, value, item.operator)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {item.options.map((option: string) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {item.type === "b-select" && (
                  <BSelect
                    options={item.options}
                    value={filters[key]?.value}
                    multiple={item.multiple}
                    onChange={(value: any) => handleFilterChange(k, value, item.operator)}
                  />
                )}
                {item.type === "range" && (
                  <Slider
                    className="col-span-3"
                    min={item.min}
                    max={item.max}
                    step={1}
                    value={[(filters[key]?.value as number) || item.min]}
                    onValueChange={([value]) => handleFilterChange(k, value, item.operator)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button size={"default"} type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <div className="flex space-x-3 items-center">
            <DialogClose asChild>
              <Button size={"default"} onClick={clearFilters} type="button" variant="outline">
                Clear
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button size={"default"} onClick={handleApplyFilters}>
                Apply Filters
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
