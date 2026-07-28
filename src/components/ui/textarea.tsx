import * as React from "react"

import { cn } from "../../lib/utils"

type TextareaProps = React.ComponentProps<"textarea"> & {
  size?: "xs" | "sm" | "default" | "lg"
}

function Textarea({ className, size = "default", ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      data-size={size}
      className={cn(
        "field-sizing-content w-full resize-none rounded-xs border border-input bg-transparent px-3 py-2.5 text-sm transition-[color,border-color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 data-[size=default]:min-h-20 data-[size=lg]:min-h-24 data-[size=lg]:px-4 data-[size=lg]:py-3 data-[size=sm]:min-h-16 data-[size=sm]:py-2 data-[size=xs]:min-h-14 data-[size=xs]:px-2 data-[size=xs]:py-1.5 data-[size=xs]:text-xs dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
export type { TextareaProps }
