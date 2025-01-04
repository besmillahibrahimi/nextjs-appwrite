"use client";

import { Pagination } from "./pagination";

export function ListFooter({
  currentPage,
  onPageChange,
  totalItems,
  itemsPerPage = 10,
  showDetails = false,
}: Readonly<IListFooterProps>) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-4 space-y-4 sm:space-y-0">
      {showDetails && (
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">{endItem}</span> of{" "}
          <span className="font-medium">{totalItems}</span> results
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil((totalItems ?? 0) / itemsPerPage)}
        onPageChange={onPageChange}
      />
    </div>
  );
}
