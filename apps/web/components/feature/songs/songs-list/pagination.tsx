"use client";
import { searchParams } from "@/components/searchParams";
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@ui/components/pagination";
import { useQueryState } from "nuqs";
import { useTransition } from "react";

const SIBLINGS = 1;
const DEFAULT_PAGE_ITEMS = 1 + SIBLINGS * 2 + 4;
type PagesProps = { totalPages: number };
export const Pages = ({ totalPages }: PagesProps) => {
  const [isLoading, startTransition] = useTransition();
  const [page, setPage] = useQueryState(
    "page",
    searchParams.page.withOptions({ startTransition, shallow: false })
  );
  const pageItemsCount = Math.min(DEFAULT_PAGE_ITEMS, totalPages);
  if (pageItemsCount <= 1) return null;

  const middlePosition = ~~((pageItemsCount + 1) / 2);

  const enableCursor =
    pageItemsCount == DEFAULT_PAGE_ITEMS
      ? page >= middlePosition && page - 1 <= totalPages - middlePosition
      : false;

  const selectedPosition = enableCursor
    ? middlePosition
    : page <= middlePosition
      ? page
      : page - totalPages + pageItemsCount;

  return (
    <Pagination>
      <PaginationContent>
        {Array.from(Array(pageItemsCount)).map((_, i) => {
          const distance = i + 1 - selectedPosition;
          const isDotted =
            (i == 1 && page + distance != 2) ||
            (i == pageItemsCount - 2 && page + distance != totalPages - 1);

          const pageNumber =
            i == 0
              ? 1
              : i == pageItemsCount - 1
                ? totalPages
                : isDotted
                  ? Math.min(
                      Math.max(
                        1,
                        page + (pageItemsCount - 2) * Math.sign(distance)
                      ),
                      totalPages
                    )
                  : page + distance;

          const display = isDotted ? <PaginationEllipsis /> : pageNumber;

          return (
            <PaginationItem key={i}>
              <PaginationButton
                onClick={() => setPage(pageNumber)}
                isActive={i + 1 === selectedPosition}
                disabled={isLoading}
              >
                {display}
              </PaginationButton>
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
};
