import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "../../lib/utils"
import { Label } from "./label"

type RadioGroupProps = RadioGroupPrimitive.Props

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-3", className)}
      {...props}
    />
  )
}

type RadioProps = RadioPrimitive.Root.Props & {
  text?: React.ReactNode
}

function Radio({ text, id, className, ...props }: RadioProps) {
  const generatedId = React.useId()
  const radioId = id ?? generatedId
  const control = (
    <RadioPrimitive.Root
      id={radioId}
      data-slot="radio"
      className={cn(
        "peer relative flex aspect-square size-4.5 shrink-0 rounded-full border border-input bg-transparent transition-[background-color,border-color,box-shadow] duration-150 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring2 focus-visible:ring-2 focus-visible:ring-ring2 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-indicator"
        className="flex size-full items-center justify-center transition-[opacity,transform] duration-150 data-ending-style:scale-50 data-ending-style:opacity-0 data-starting-style:scale-50 data-starting-style:opacity-0 motion-reduce:transition-none"
      >
        <span className="size-2 rounded-full bg-primary-foreground" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )

  if (text === undefined) {
    return control
  }

  return (
    <div data-slot="radio-field" className="flex items-center gap-3">
      {control}
      <Label
        htmlFor={radioId}
        className="font-normal peer-aria-disabled:cursor-not-allowed peer-aria-disabled:opacity-50"
      >
        {text}
      </Label>
    </div>
  )
}

export { Radio, RadioGroup }
export type { RadioGroupProps, RadioProps }
