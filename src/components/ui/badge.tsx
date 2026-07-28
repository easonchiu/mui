import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-xs border-0 px-2 py-0.5 text-[12px] tracking-widest whitespace-nowrap uppercase transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/90",
        secondary:
          "bg-foreground/10 text-foreground dark:bg-foreground/15 [a]:hover:bg-foreground/15 dark:[a]:hover:bg-foreground/20",
        destructive:
          "bg-destructive text-white focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent text-foreground dark:border-foreground/30 [a]:hover:border-foreground/30 [a]:hover:bg-muted dark:[a]:hover:border-foreground/50 dark:[a]:hover:bg-muted/50",
        ghost:
          "bg-transparent text-muted-foreground [a]:hover:bg-muted [a]:hover:text-foreground dark:[a]:hover:bg-muted/50",
        link: "bg-transparent px-0 text-foreground underline decoration-foreground/40 underline-offset-4 [a]:hover:decoration-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
