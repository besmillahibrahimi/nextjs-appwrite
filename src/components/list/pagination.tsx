"use client";

import {
  Pagination as Paginations,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  maxVisiblePages?: number;
};

function getVisiblePages(currentPage: number, totalPages: number, maxVisiblePages: number) {
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  let startPage = Math.max(currentPage - halfVisiblePages, 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
}

function getPageNumbers(currentPage: number, totalPages: number, maxVisiblePages: number) {
  const visiblePages = getVisiblePages(currentPage, totalPages, maxVisiblePages);

  const pageNumbers = [];

  if (visiblePages[0] > 1) {
    pageNumbers.push(1);
    if (visiblePages[0] > 2) pageNumbers.push(-2);
  }

  pageNumbers.push(...visiblePages);

  if (visiblePages[visiblePages.length - 1] < totalPages) {
    if (visiblePages[visiblePages.length - 1] < totalPages - 1) pageNumbers.push(-1);
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
}

function getNextPageNumber(currentPage: number, totalPages: number, cycle: number | null = null) {
  return currentPage < totalPages ? currentPage + 1 : cycle;
}

function getPreviousPageNumber(currentPage: number, cycle: number | null = null) {
  return currentPage > 1 ? currentPage - 1 : cycle;
}

export function Pagination({ currentPage, totalPages, onPageChange, maxVisiblePages = 3 }: Readonly<PaginationProps>) {
  const pageNumbers = getPageNumbers(currentPage, totalPages, maxVisiblePages);

  return (
    <Paginations>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            isActive={currentPage > 1}
            {...{
              ...(onPageChange
                ? {
                    variant: "ghost",
                    onClick: (e) => {
                      e.preventDefault();
                      if (currentPage > 1) onPageChange?.(currentPage - 1);
                    },
                  }
                : {
                    href: `?page=${getPreviousPageNumber(currentPage)}`,
                  }),
            }}
          />
        </PaginationItem>
        {pageNumbers.map((pageNumber, index) => (
          <PaginationItem key={`page-item-${pageNumber}-${index}`}>
            {pageNumber === -1 || pageNumber === -2 ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                {...{
                  ...(onPageChange
                    ? {
                        variant: "ghost",
                        onClick: (e) => {
                          e.preventDefault();
                          onPageChange?.(pageNumber);
                        },
                      }
                    : {
                        href: `?page=${pageNumber}`,
                      }),
                }}
                isActive={currentPage === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            {...{
              ...(onPageChange
                ? {
                    variant: "ghost",
                    onClick: (e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) onPageChange?.(currentPage + 1);
                    },
                  }
                : {
                    href: `?page=${getNextPageNumber(currentPage, totalPages)}`,
                  }),
            }}
            isActive={currentPage < totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Paginations>
  );
}
