import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "./button"

type PaginationProps = Omit<
  React.ComponentProps<"nav">,
  "children" | "onChange"
> & {
  total: number
  pageSize?: number
  current?: number
  defaultCurrent?: number
  siblingCount?: number
  disabled?: boolean
  hideOnSinglePage?: boolean
  onChange?: (page: number, pageSize: number) => void
}

type PaginationItem = number | "ellipsis-start" | "ellipsis-end"

function clampPage(page: number, pageCount: number) {
  const normalizedPage = Number.isFinite(page) ? Math.trunc(page) : 1
  return Math.min(Math.max(1, normalizedPage), pageCount)
}

function getPaginationItems(
  pageCount: number,
  current: number,
  siblingCount: number
): PaginationItem[] {
  const visibleCount = siblingCount * 2 + 5

  if (pageCount <= visibleCount) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }

  const left = Math.max(current - siblingCount, 2)
  const right = Math.min(current + siblingCount, pageCount - 1)
  const items: PaginationItem[] = [1]

  if (left > 2) {
    items.push("ellipsis-start")
  } else {
    for (let page = 2; page < left; page += 1) {
      items.push(page)
    }
  }

  for (let page = left; page <= right; page += 1) {
    items.push(page)
  }

  if (right < pageCount - 1) {
    items.push("ellipsis-end")
  } else {
    for (let page = right + 1; page < pageCount; page += 1) {
      items.push(page)
    }
  }

  items.push(pageCount)
  return items
}

function Pagination({
  total,
  pageSize = 10,
  current,
  defaultCurrent = 1,
  siblingCount = 1,
  disabled = false,
  hideOnSinglePage = false,
  onChange,
  className,
  ...props
}: PaginationProps) {
  const normalizedPageSize = Number.isFinite(pageSize)
    ? Math.max(1, Math.trunc(pageSize))
    : 10
  const normalizedTotal = Number.isFinite(total) ? Math.max(0, total) : 0
  const pageCount = Math.max(1, Math.ceil(normalizedTotal / normalizedPageSize))
  const [internalCurrent, setInternalCurrent] = React.useState(() =>
    clampPage(defaultCurrent, pageCount)
  )
  const activePage = clampPage(current ?? internalCurrent, pageCount)
  const items = getPaginationItems(
    pageCount,
    activePage,
    Number.isFinite(siblingCount) ? Math.max(0, Math.trunc(siblingCount)) : 1
  )

  const selectPage = (page: number) => {
    const nextPage = clampPage(page, pageCount)

    if (disabled || nextPage === activePage) {
      return
    }

    if (current === undefined) {
      setInternalCurrent(nextPage)
    }

    onChange?.(nextPage, normalizedPageSize)
  }

  if (hideOnSinglePage && pageCount <= 1) {
    return null
  }

  return (
    <nav
      aria-label="分页"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    >
      <ul data-slot="pagination-content" className="flex items-center gap-1">
        <li>
          <Button
            variant="ghost"
            size="sm"
            aria-label="前往上一页"
            disabled={disabled || activePage === 1}
            onClick={() => selectPage(activePage - 1)}
            className="px-2 sm:px-3"
          >
            <ChevronLeftIcon data-icon="inline-start" />
            <span className="hidden sm:inline">上一页</span>
          </Button>
        </li>

        {items.map((item) =>
          typeof item === "number" ? (
            <li key={item}>
              <Button
                variant={item === activePage ? "outline" : "ghost"}
                size="icon-sm"
                aria-label={`第 ${item} 页`}
                aria-current={item === activePage ? "page" : undefined}
                disabled={disabled}
                onClick={() => selectPage(item)}
              >
                {item}
              </Button>
            </li>
          ) : (
            <li key={item}>
              <span
                data-slot="pagination-ellipsis"
                aria-hidden="true"
                className="flex size-9 items-center justify-center [&_svg]:size-4"
              >
                <MoreHorizontalIcon />
              </span>
            </li>
          )
        )}

        <li>
          <Button
            variant="ghost"
            size="sm"
            aria-label="前往下一页"
            disabled={disabled || activePage === pageCount}
            onClick={() => selectPage(activePage + 1)}
            className="px-2 sm:px-3"
          >
            <span className="hidden sm:inline">下一页</span>
            <ChevronRightIcon data-icon="inline-end" />
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export { Pagination }
export type { PaginationProps }
