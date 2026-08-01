import * as React from "react"

import { cn } from "../../lib/utils"

type GridProps = React.ComponentProps<"div"> & {
  columns?: number
}

function Grid({ columns = 3, className, children, ...props }: GridProps) {
  const columnCount =
    Number.isFinite(columns) && columns > 0 ? Math.floor(columns) : 1

  return (
    <div
      data-slot="grid"
      className={cn(
        "overflow-hidden rounded-xs border border-border/60 bg-background",
        className
      )}
      {...props}
    >
      <div
        data-slot="grid-body"
        className="-mt-px -ml-px grid w-[calc(100%+1px)] bg-background [&>*]:border-t [&>*]:border-l [&>*]:border-border/60"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

type GridItemProps = React.ComponentProps<"div">

function GridItem({ className, ...props }: GridItemProps) {
  return (
    <div
      data-slot="grid-item"
      className={cn("min-w-0 bg-background p-5", className)}
      {...props}
    />
  )
}

export { Grid, GridItem }
export type { GridItemProps, GridProps }
