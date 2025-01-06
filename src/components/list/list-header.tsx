"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FilterDialog } from "./filter-dialog";
import { SortDropdown } from "./sort";

export function ListHeader<T>({ onSearch, filterProps, sortProps }: Readonly<IListHeaderProps<T>>) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <Input type="search" placeholder="Search..." value={searchQuery} onChange={handleSearch} className="flex-grow" />
      {filterProps && <FilterDialog {...filterProps} />}
      {sortProps && <SortDropdown {...sortProps} />}
    </div>
  );
}
