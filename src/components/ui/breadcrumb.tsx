import * as React from "react"
import { ChevronRightIcon } from "lucide-react"

type BreadcrumbItem = {
  key?: React.Key
  title: React.ReactNode
  href?: string
}

type BreadcrumbProps = Omit<React.ComponentProps<"nav">, "children"> & {
  items: ReadonlyArray<BreadcrumbItem>
  separator?: React.ReactNode
  itemRender?: (
    item: BreadcrumbItem,
    index: number,
    items: ReadonlyArray<BreadcrumbItem>
  ) => React.ReactNode
}

function Breadcrumb({
  items,
  separator = <ChevronRightIcon />,
  itemRender,
  className,
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={className}
      {...props}
    >
      <ol
        data-slot="breadcrumb-list"
        className="flex flex-wrap items-center gap-1.5 text-xs tracking-wide wrap-break-word text-muted-foreground uppercase sm:gap-2.5"
      >
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1
          const content = itemRender?.(item, index, items)

          return (
            <React.Fragment
              key={item.key ?? `${item.href ?? "breadcrumb"}-${index}`}
            >
              <li
                data-slot="breadcrumb-item"
                className="inline-flex items-center gap-1.5"
              >
                {isCurrent ? (
                  <span
                    data-slot="breadcrumb-page"
                    aria-current="page"
                    className="font-normal text-foreground"
                  >
                    {content ?? item.title}
                  </span>
                ) : content !== undefined ? (
                  content
                ) : item.href ? (
                  <a
                    data-slot="breadcrumb-link"
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </li>

              {!isCurrent && (
                <li
                  data-slot="breadcrumb-separator"
                  role="presentation"
                  aria-hidden="true"
                  className="[&>svg]:size-3.5"
                >
                  {separator}
                </li>
              )}
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

export { Breadcrumb }
export type { BreadcrumbItem, BreadcrumbProps }
