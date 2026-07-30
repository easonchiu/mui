import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { Label } from "./label"

type CheckboxProps = CheckboxPrimitive.Root.Props & {
  text?: React.ReactNode
}

function Checkbox({ text, id, className, ...props }: CheckboxProps) {
  const generatedId = React.useId()
  const checkboxId = id ?? generatedId
  const control = (
    <CheckboxPrimitive.Root
      id={checkboxId}
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4.5 shrink-0 items-center justify-center rounded-sm border border-input bg-transparent transition-[background-color,border-color,box-shadow,color] duration-150 outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-[opacity,transform] duration-150 data-ending-style:scale-50 data-ending-style:opacity-0 data-starting-style:scale-50 data-starting-style:opacity-0 motion-reduce:transition-none [&>svg]:size-3.5"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )

  if (text === undefined) {
    return control
  }

  return (
    <div data-slot="checkbox-field" className="flex items-center gap-3">
      {control}
      <Label
        htmlFor={checkboxId}
        className="peer-aria-disabled:cursor-not-allowed peer-aria-disabled:opacity-50"
      >
        {text}
      </Label>
    </div>
  )
}

export { Checkbox }
export type { CheckboxProps }
