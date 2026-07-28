import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { Label } from "./label"

const fieldVariants = cva("group/field flex w-full gap-3", {
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row items-center",
      responsive:
        "flex-col @md/field-group:flex-row @md/field-group:items-center",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

type FieldControlProps = {
  id?: string
  "aria-labelledby"?: string
  "aria-describedby"?: string
}

type FieldProps = Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof fieldVariants> & {
    label?: React.ReactNode
    description?: React.ReactNode
    htmlFor?: string
    children: React.ReactElement
  }

function Field({
  label,
  description,
  htmlFor,
  children,
  className,
  orientation = "vertical",
  ...props
}: FieldProps) {
  const child = children as React.ReactElement<FieldControlProps>
  const generatedId = React.useId()
  const controlId = htmlFor ?? child.props.id ?? `${generatedId}-control`
  const labelId = `${controlId}-label`
  const descriptionId = `${controlId}-description`
  const control = React.cloneElement(child, {
    id: controlId,
    "aria-labelledby":
      child.props["aria-labelledby"] ?? (label ? labelId : undefined),
    "aria-describedby":
      child.props["aria-describedby"] ??
      (description ? descriptionId : undefined),
  })

  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    >
      {label !== undefined && (
        <Label
          id={labelId}
          htmlFor={controlId}
          data-slot="field-label"
          className="w-fit leading-relaxed group-data-[disabled=true]/field:opacity-50"
        >
          {label}
        </Label>
      )}

      {control}

      {description !== undefined && (
        <p
          id={descriptionId}
          data-slot="field-description"
          className="text-left text-sm leading-normal font-normal tracking-normal text-muted-foreground normal-case group-data-[invalid=true]/field:text-destructive"
        >
          {description}
        </p>
      )}
    </div>
  )
}

export { Field }
export type { FieldProps }
