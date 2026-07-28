import * as React from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "../../lib/utils"
import { Label } from "./label"

type SwitchProps = SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
  text?: React.ReactNode
}

function Switch({
  text,
  id,
  className,
  size = "default",
  disabled,
  ...props
}: SwitchProps) {
  const generatedId = React.useId()
  const switchId = id ?? generatedId
  const control = (
    <SwitchPrimitive.Root
      id={switchId}
      data-slot="switch"
      data-size={size}
      disabled={disabled}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-xs border transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 data-[size=default]:h-4.5 data-[size=default]:w-8.25 data-[size=sm]:h-3.5 data-[size=sm]:w-6.25 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-unchecked:border-input/50 data-unchecked:bg-input data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-[1px] bg-background ring-0 transition-transform group-data-[size=default]/switch:size-3.5 group-data-[size=sm]/switch:size-2.5 data-checked:translate-x-[calc(100%+2px)] dark:data-checked:bg-primary-foreground data-unchecked:translate-x-0.25 dark:data-unchecked:bg-foreground"
      />
    </SwitchPrimitive.Root>
  )

  if (text === undefined) {
    return control
  }

  return (
    <div data-slot="switch-field" className="flex items-center gap-3">
      {control}
      <Label
        htmlFor={switchId}
        className={cn(
          "text-sm font-normal tracking-normal normal-case",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {text}
      </Label>
    </div>
  )
}

export { Switch }
export type { SwitchProps }
