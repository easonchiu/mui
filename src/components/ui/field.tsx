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
  required?: boolean
  "aria-invalid"?: React.AriaAttributes["aria-invalid"]
  "aria-labelledby"?: string
  "aria-describedby"?: string
}

type FieldProps = Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof fieldVariants> & {
    label?: React.ReactNode
    description?: React.ReactNode
    error?: React.ReactNode
    required?: boolean
    htmlFor?: string
    children: React.ReactElement
  }

function Field({
  label,
  description,
  error,
  required,
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
  const hasError = Boolean(error)
  const descriptionContent = hasError ? error : description
  const control = React.cloneElement(child, {
    id: controlId,
    required: required ?? child.props.required,
    "aria-invalid": hasError || child.props["aria-invalid"],
    "aria-labelledby":
      child.props["aria-labelledby"] ?? (label ? labelId : undefined),
    "aria-describedby":
      [
        child.props["aria-describedby"],
        descriptionContent != null ? descriptionId : undefined,
      ]
        .filter(Boolean)
        .join(" ") || undefined,
  })

  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      data-invalid={hasError || undefined}
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
          {required && (
            <span className="text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </Label>
      )}

      {control}

      {descriptionContent !== undefined && (
        <p
          id={descriptionId}
          data-slot="field-description"
          role={hasError ? "alert" : undefined}
          className="text-left text-xs leading-normal font-normal tracking-normal text-muted-foreground normal-case group-data-[invalid=true]/field:text-[color-mix(in_oklch,var(--destructive),var(--foreground)_25%)]"
        >
          {descriptionContent}
        </p>
      )}
    </div>
  )
}

export { Field }
export type { FieldProps }
