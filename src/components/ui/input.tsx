import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "../../lib/utils"

type InputProps = Omit<React.ComponentProps<"input">, "prefix" | "size"> & {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  containerClassName?: string
  size?: "xs" | "sm" | "default" | "lg"
}

function Input({
  prefix,
  suffix,
  containerClassName,
  className,
  type,
  disabled,
  size = "default",
  ...props
}: InputProps) {
  const focusInput = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button, a")) {
      return
    }

    event.currentTarget.querySelector("input")?.focus()
  }

  return (
    <div
      data-slot="input-container"
      data-disabled={disabled || undefined}
      data-size={size}
      className={cn(
        "group/input flex w-full min-w-0 items-center gap-2 rounded-xs border border-input bg-transparent px-3 transition-[color,border-color,box-shadow] focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/10 has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:ring-2 has-[[aria-invalid=true]]:ring-destructive/20 data-[size=default]:h-10 data-[size=lg]:h-11 data-[size=lg]:px-4 data-[size=sm]:h-9 data-[size=xs]:h-7 data-[size=xs]:gap-1 data-[size=xs]:px-2 dark:has-[[aria-invalid=true]]:border-destructive/50 dark:has-[[aria-invalid=true]]:ring-destructive/40 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        containerClassName
      )}
      onClick={focusInput}
    >
      {prefix !== undefined && (
        <div
          data-slot="input-prefix"
          className="flex shrink-0 items-center text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5"
        >
          {prefix}
        </div>
      )}

      <InputPrimitive
        type={type}
        disabled={disabled}
        data-slot="input"
        className={cn(
          "h-full min-w-0 flex-1 border-0 bg-transparent px-0 py-1 text-sm outline-none group-data-[size=xs]/input:text-xs file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />

      {suffix !== undefined && (
        <div
          data-slot="input-suffix"
          className="flex shrink-0 items-center text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5"
        >
          {suffix}
        </div>
      )}
    </div>
  )
}

export { Input }
export type { InputProps }
