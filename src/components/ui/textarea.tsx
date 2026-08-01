import * as React from "react"

import { cn } from "../../lib/utils"

type TextareaProps = React.ComponentProps<"textarea"> & {
  size?: "xs" | "sm" | "default" | "lg"
  error?: boolean
}

function Textarea({
  className,
  size = "default",
  error = false,
  "aria-invalid": ariaInvalid,
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      data-size={size}
      data-error={error || undefined}
      aria-invalid={error || ariaInvalid || undefined}
      className={cn(
        "field-sizing-content w-full resize-none rounded-sm bg-transparent px-3 py-2.5 text-sm ring ring-input transition-[color,ring-color,box-shadow] outline-none placeholder:text-muted-foreground focus:ring-3 focus:ring-ring2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-destructive/50 aria-invalid:focus:ring-destructive/50 data-[size=default]:min-h-20 data-[size=lg]:min-h-24 data-[size=lg]:px-4 data-[size=lg]:py-3 data-[size=sm]:min-h-16 data-[size=sm]:py-2 data-[size=xs]:min-h-14 data-[size=xs]:px-2 data-[size=xs]:py-1.5 data-[size=xs]:text-xs",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
export type { TextareaProps }
