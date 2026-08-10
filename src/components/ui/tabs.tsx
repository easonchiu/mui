import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-md p-1 text-muted-foreground group-data-horizontal/tabs:h-10 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type TabsItem = {
  key: string
  label: React.ReactNode
  disabled?: boolean
}

type TabsProps = Omit<
  TabsPrimitive.Root.Props,
  "children" | "value" | "defaultValue" | "onChange" | "onValueChange"
> &
  VariantProps<typeof tabsListVariants> & {
    items: ReadonlyArray<TabsItem>
    activeKey: string
    onChange?: (activeKey: string) => void
    children?: React.ReactNode
    listClassName?: string
    contentClassName?: string
  }

function Tabs({
  items,
  activeKey,
  onChange,
  children,
  variant = "default",
  orientation = "horizontal",
  className,
  listClassName,
  contentClassName,
  ...props
}: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      value={activeKey}
      orientation={orientation}
      onValueChange={(value) => {
        if (value !== null) {
          onChange?.(String(value))
        }
      }}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    >
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-variant={variant}
        className={cn(tabsListVariants({ variant }), listClassName)}
      >
        {items.map((item) => (
          <TabsPrimitive.Tab
            key={item.key}
            value={item.key}
            disabled={item.disabled}
            data-slot="tabs-trigger"
            className={cn(
              "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-2 rounded-sm border border-transparent px-4 py-1.5 text-sm tracking-wider whitespace-nowrap text-foreground/60 uppercase transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start group-data-vertical/tabs:px-4 group-data-vertical/tabs:py-2 focus-visible:border-ring2 focus-visible:ring-3 focus-visible:ring-ring2 focus-visible:outline-1 focus-visible:outline-ring2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 [&:not([aria-disabled=true]):hover]:text-foreground dark:[&:not([aria-disabled=true]):hover]:text-foreground",
              "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent group-data-[variant=line]/tabs-list:data-active:shadow-none dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
              "data-active:bg-background data-active:text-foreground data-active:shadow-sm/5 dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
              "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100"
            )}
          >
            {item.label}
          </TabsPrimitive.Tab>
        ))}
      </TabsPrimitive.List>

      {children !== undefined && (
        <TabsPrimitive.Panel
          value={activeKey}
          data-slot="tabs-content"
          className={cn("flex-1 text-sm outline-none", contentClassName)}
        >
          {children}
        </TabsPrimitive.Panel>
      )}
    </TabsPrimitive.Root>
  )
}

export { Tabs }
export type { TabsItem, TabsProps }
