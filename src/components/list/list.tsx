"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ListFooter } from "./list-footer";
import { ListHeader } from "./list-header";

export function List<T extends { id: string | number }>({
  className,
  items,
  renderItem,
  loading = true,
  skeleton,
  emptyNode = <p className="text-center">No items found</p>,

  // Header Props
  filterProps,
  sortProps,
  onSearch,

  // Footer Props
  itemsPerPage = 20,
  totalItems,
  currentPage = 1,
  onPageChange,
  showDetails,
}: Readonly<ListProps<T>>) {
  let body: ReactNode;
  if (!loading && items.length === 0) {
    body = emptyNode;
  } else {
    body = (
      <>
        <div>
          <ListHeader onSearch={onSearch} filterProps={filterProps} sortProps={sortProps} />
          <hr />
        </div>
        {loading ? (
          <ul className={cn("flex flex-wrap ", className)}>
            {Array.from({ length: 10 }).map((_, index) => (
              <li key={`item-${index + 1}`} className="flex justify-center items-center h-96">
                {skeleton ?? (
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <ul className={cn("flex flex-wrap ", className)}>
            {items.map((item, index) => (
              <li key={`${item.id}-${index}`}>{renderItem(item)}</li>
            ))}
          </ul>
        )}
        <ListFooter
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalItems={totalItems ?? 0}
          itemsPerPage={itemsPerPage}
        />
      </>
    );
  }
  return <div className="space-y-12">{body}</div>;
}
