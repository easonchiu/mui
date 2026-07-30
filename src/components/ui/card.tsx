import * as React from "react"

import { cn } from "../../lib/utils"

type CardProps = Omit<React.ComponentProps<"div">, "children" | "title"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  extra?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  size?: "default" | "sm"
}

function Card({
  title,
  description,
  extra,
  footer,
  children,
  className,
  size = "default",
  ...props
}: CardProps) {
  const hasHeader =
    title !== undefined || description !== undefined || extra !== undefined

  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-sm shadow-lg/5 bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/5 [--card-spacing:--spacing(5)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] *:[img:first-child]:rounded-none *:[img:last-child]:rounded-none",
        className
      )}
      {...props}
    >
      {hasHeader && (
        <div
          data-slot="card-header"
          className="grid auto-rows-min items-start gap-1.5 px-(--card-spacing) has-[>[data-slot=card-description]]:grid-rows-[auto_auto] has-[>[data-slot=card-extra]]:grid-cols-[1fr_auto]"
        >
          {title !== undefined && (
            <div
              data-slot="card-title"
              className="font-heading text-lg font-semibold tracking-wider uppercase"
            >
              {title}
            </div>
          )}

          {description !== undefined && (
            <div
              data-slot="card-description"
              className="text-sm leading-relaxed text-muted-foreground"
            >
              {description}
            </div>
          )}

          {extra !== undefined && (
            <div
              data-slot="card-extra"
              className="col-start-2 row-span-2 row-start-1 self-start justify-self-end"
            >
              {extra}
            </div>
          )}
        </div>
      )}

      {children !== undefined && (
        <div data-slot="card-content" className="px-(--card-spacing)">
          {children}
        </div>
      )}

      {footer !== undefined && (
        <div
          data-slot="card-footer"
          className="flex items-center px-(--card-spacing)"
        >
          {footer}
        </div>
      )}
    </div>
  )
}

export { Card }
export type { CardProps }
