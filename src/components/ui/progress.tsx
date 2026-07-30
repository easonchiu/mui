import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import { cn } from "../../lib/utils"

type ProgressProps = Omit<
  ProgressPrimitive.Root.Props,
  "children" | "value"
> & {
  value?: number | null
  label?: React.ReactNode
  showValue?: boolean
}

function Progress({
  className,
  value = null,
  label,
  showValue = true,
  ...props
}: ProgressProps) {
  const hasHeader = label !== undefined || (showValue && value !== null)

  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn("grid w-full gap-2", className)}
      {...props}
    >
      {hasHeader && (
        <div data-slot="progress-header" className="flex items-center gap-3">
          {label !== undefined && (
            <ProgressPrimitive.Label
              data-slot="progress-label"
              className="text-sm font-medium"
            >
              {label}
            </ProgressPrimitive.Label>
          )}

          {showValue && value !== null && (
            <ProgressPrimitive.Value
              data-slot="progress-value"
              className="ml-auto text-sm text-muted-foreground tabular-nums"
            />
          )}
        </div>
      )}

      <ProgressPrimitive.Track
        data-slot="progress-track"
        className="relative h-2 w-full overflow-hidden rounded-full bg-muted"
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="h-full rounded-full bg-primary transition-all duration-300 ease-out data-indeterminate:w-1/3 data-indeterminate:animate-pulse"
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

export { Progress }
export type { ProgressProps }
