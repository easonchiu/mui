import * as React from "react"
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"

import { cn } from "../../lib/utils"

type HoverCardContentProps = PreviewCardPrimitive.Popup.Props &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >

type HoverCardAlign = NonNullable<
  PreviewCardPrimitive.Positioner.Props["align"]
>

type HoverCardProps = Omit<PreviewCardPrimitive.Root.Props, "children"> & {
  trigger: React.ReactElement
  align?: HoverCardAlign
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  delay?: number
  closeDelay?: number
  contentProps?: Omit<HoverCardContentProps, "children">
}

function HoverCard({
  trigger,
  align,
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
      <HoverCardContent {...contentProps} align={align ?? contentProps?.align}>
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
  side = "top",
  sideOffset = 12,
  align = "center",
  alignOffset = 0,
  children,
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
            "z-50 flex w-72 origin-(--transform-origin) flex-col gap-3 rounded-sm bg-popover p-4 text-sm text-popover-foreground shadow-lg/10 ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          {children}
          <PreviewCardPrimitive.Arrow
            data-slot="hover-card-arrow"
            className="z-50 size-2.5 translate-y-[calc(-50%+0.5px)] rotate-45 rounded-none border-foreground/25 dark:border-foreground/10 bg-popover data-[side=bottom]:top-1 data-[side=bottom]:rounded-tl-xs data-[side=bottom]:border-t data-[side=bottom]:border-l data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:translate-x-[1.5px] data-[side=inline-end]:-translate-y-1/2 data-[side=inline-end]:rounded-bl-xs data-[side=inline-end]:border-b data-[side=inline-end]:border-l data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:translate-x-[-1.5px] data-[side=inline-start]:-translate-y-1/2 data-[side=inline-start]:rounded-tr-xs data-[side=inline-start]:border-t data-[side=inline-start]:border-r data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=left]:rounded-tr-xs data-[side=left]:border-t data-[side=left]:border-r data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=right]:rounded-bl-xs data-[side=right]:border-b data-[side=right]:border-l data-[side=top]:-bottom-2.5 data-[side=top]:rounded-br-xs data-[side=top]:border-r data-[side=top]:border-b"
          />
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

export { HoverCard }
export type { HoverCardAlign, HoverCardProps }
