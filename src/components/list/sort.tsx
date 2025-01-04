"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, SortAsc, SortDesc } from "lucide-react";

export function SortDropdown<T>({ sortOptions, onSort, sort }: Readonly<SortDropdownProps<T>>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            className="flex justify-between items-center"
            key={String(option.value)}
            onClick={() => onSort?.(option.value, !sort?.ascending)}
          >
            {option.label}
            {sort?.sortBy === option.value && (sort?.ascending ? <SortAsc /> : <SortDesc />)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
