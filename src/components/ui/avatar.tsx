import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "../../lib/utils"

type AvatarProps = Omit<AvatarPrimitive.Root.Props, "children"> & {
  src?: string
  alt?: string
  fallback?: React.ReactNode
  badge?: boolean | React.ReactNode
  size?: "sm" | "default" | "lg"
}

function Avatar({
  src,
  alt = "",
  fallback,
  badge,
  className,
  size = "default",
  "aria-label": ariaLabel,
  ...props
}: AvatarProps) {
  const fallbackContent =
    fallback ??
    (alt.trim()
      ? Array.from(alt.trim()).slice(0, 2).join("").toUpperCase()
      : "?")

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      aria-label={ariaLabel || alt || undefined}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        className
      )}
      {...props}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          data-slot="avatar-image"
          className="aspect-square size-full rounded-full object-cover"
        />
      )}

      <AvatarPrimitive.Fallback
        data-slot="avatar-fallback"
        className="flex size-full items-center justify-center rounded-full bg-muted text-sm text-foreground group-data-[size=sm]/avatar:text-xs"
      >
        {fallbackContent}
      </AvatarPrimitive.Fallback>

      {badge !== undefined && badge !== false && (
        <span
          data-slot="avatar-badge"
          className={cn(
            "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background select-none",
            "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
            "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
            "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2"
          )}
        >
          {badge === true ? null : badge}
        </span>
      )}
    </AvatarPrimitive.Root>
  )
}

type AvatarGroupProps = React.ComponentProps<"div"> & {
  extra?: React.ReactNode
}

function AvatarGroup({
  className,
  children,
  extra,
  ...props
}: AvatarGroupProps) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    >
      {children}

      {extra !== undefined && (
        <div
          data-slot="avatar-group-count"
          className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=sm]/avatar-group:text-xs"
        >
          {typeof extra === "number" ? `+${extra}` : extra}
        </div>
      )}
    </div>
  )
}

export { Avatar, AvatarGroup }
export type { AvatarGroupProps, AvatarProps }
