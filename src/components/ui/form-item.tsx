import * as React from "react"

import { Field } from "./field"

type FormItemProps = Omit<
  React.ComponentProps<typeof Field>,
  "children" | "label" | "description"
> & {
  label?: React.ReactNode
  help?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  children: React.ReactElement
}

function FormItem({
  label,
  help,
  error,
  required,
  children,
  ...props
}: FormItemProps) {
  const fieldLabel =
    label === undefined ? undefined : (
      <>
        {label}
        {required && (
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        )}
      </>
    )

  return (
    <Field
      label={fieldLabel}
      description={error ? <span role="alert">{error}</span> : help}
      data-invalid={!!error || undefined}
      {...props}
    >
      {children}
    </Field>
  )
}

export { FormItem }
export type { FormItemProps }
