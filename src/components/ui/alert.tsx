import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const alertVariants = cva(
  "relative grid w-full grid-cols-[0_minmax(0,1fr)] items-start gap-x-3 gap-y-1 rounded-sm border px-4 py-3 text-sm has-[>[data-slot=alert-action]]:pr-28 has-[>svg]:grid-cols-[1rem_minmax(0,1fr)] [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default:
          "border-border/60 bg-background text-foreground dark:bg-border/40",
        warning:
          "border-yellow-500/20 bg-yellow-500/5 text-yellow-600 *:data-[slot=alert-description]:text-yellow-600 dark:border-yellow-400/10 dark:bg-yellow-400/10 dark:text-yellow-600 dark:*:data-[slot=alert-description]:text-yellow-600",
        destructive:
          "border-red-400/20 bg-red-400/5 text-red-600 *:data-[slot=alert-description]:text-red-600 dark:border-red-400/10 dark:bg-red-400/10 dark:text-red-500 dark:*:data-[slot=alert-description]:text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type AlertProps = Omit<React.ComponentProps<"div">, "title"> &
  VariantProps<typeof alertVariants> & {
    icon?: React.ReactNode
    title?: React.ReactNode
    description?: React.ReactNode
    action?: React.ReactNode
  }

function Alert({
  className,
  variant = "default",
  icon,
  title,
  description,
  action,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      data-slot="alert"
      data-variant={variant}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {icon}
      {title !== undefined && <AlertTitle>{title}</AlertTitle>}
      {(description !== undefined || children !== undefined) && (
        <AlertDescription>
          {description}
          {children}
        </AlertDescription>
      )}
      {action !== undefined && <AlertAction>{action}</AlertAction>}
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 min-w-0 leading-normal font-medium",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 min-w-0 text-sm leading-relaxed text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2.5 right-3", className)}
      {...props}
    />
  )
}

export { Alert }
export type { AlertProps }
