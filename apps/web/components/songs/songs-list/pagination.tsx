import { generateSearchParamsString } from "@/utils/generateSearchParamsString";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@ui/components/pagination";

const SIBLINGS = 1;
const DEFAULT_PAGE_ITEMS = 1 + SIBLINGS * 2 + 4;
type PagesProps = {
  currentPage: number;
  totalPages: number;
  searchParams?: SearchParams;
};
export const Pages = ({
  currentPage,
  totalPages,
  searchParams,
}: PagesProps) => {
  const pageItemsCount = Math.min(DEFAULT_PAGE_ITEMS, totalPages);
  if (pageItemsCount <= 1) return null;

  const middlePosition = ~~((pageItemsCount + 1) / 2);

  const enableCursor =
    pageItemsCount == DEFAULT_PAGE_ITEMS
      ? currentPage >= middlePosition &&
        currentPage - 1 <= totalPages - middlePosition
      : false;

  const selectedPosition = enableCursor
    ? middlePosition
    : currentPage <= middlePosition
      ? currentPage
      : currentPage - totalPages + pageItemsCount;

  return (
    <Pagination>
      <PaginationContent>
        {Array.from(Array(pageItemsCount)).map((_, i) => {
          const distance = i + 1 - selectedPosition;
          const isDotted =
            (i == 1 && currentPage + distance != 2) ||
            (i == pageItemsCount - 2 &&
              currentPage + distance != totalPages - 1);

          const pageNumber =
            i == 0
              ? 1
              : i == pageItemsCount - 1
                ? totalPages
                : isDotted
                  ? Math.min(
                      Math.max(
                        1,
                        currentPage + (pageItemsCount - 2) * Math.sign(distance)
                      ),
                      totalPages
                    )
                  : currentPage + distance;

          const display = isDotted ? <PaginationEllipsis /> : pageNumber;

          const href = generateSearchParamsString(searchParams, {
            page: pageNumber.toString(),
          });
          return (
            <PaginationItem key={i}>
              <PaginationLink href={href} isActive={i + 1 === selectedPosition}>
                {display}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
};
