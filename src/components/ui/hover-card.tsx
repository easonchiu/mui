import * as React from "react"
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"

import { cn } from "../../lib/utils"

type HoverCardContentProps = PreviewCardPrimitive.Popup.Props &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >

type HoverCardProps = Omit<PreviewCardPrimitive.Root.Props, "children"> & {
  trigger: React.ReactElement
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  delay?: number
  closeDelay?: number
  contentProps?: Omit<HoverCardContentProps, "children">
}

function HoverCard({
  trigger,
  title,
  description,
  children,
  delay = 150,
  closeDelay = 200,
  contentProps,
  ...props
}: HoverCardProps) {
  return (
    <PreviewCardPrimitive.Root data-slot="hover-card" {...props}>
      <PreviewCardPrimitive.Trigger
        data-slot="hover-card-trigger"
        render={trigger}
        delay={delay}
        closeDelay={closeDelay}
      />
      <HoverCardContent {...contentProps}>
        {(title !== undefined || description !== undefined) && (
          <div data-slot="hover-card-header" className="flex flex-col gap-1">
            {title !== undefined && (
              <div
                data-slot="hover-card-title"
                className="font-heading text-sm font-semibold"
              >
                {title}
              </div>
            )}
            {description !== undefined && (
              <div
                data-slot="hover-card-description"
                className="text-sm leading-relaxed text-muted-foreground"
              >
                {description}
              </div>
            )}
          </div>
        )}
        {children}
      </HoverCardContent>
    </PreviewCardPrimitive.Root>
  )
}

function HoverCardContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 4,
  ...props
}: HoverCardContentProps) {
  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(
            "z-50 flex w-72 origin-(--transform-origin) flex-col gap-3 rounded-xs bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

export { HoverCard }
export type { HoverCardProps }
