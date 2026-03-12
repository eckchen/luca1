import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/*
 * Performance note:
 * Use transition-[color,background-color,border-color,box-shadow,opacity,transform]
 * instead of transition-all to avoid triggering expensive layout recalculations.
 * Only compositor-friendly properties are transitioned.
 */
const TRANSITION = "transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-200 ease-out"

const buttonVariants = cva(
  [
    // Layout & typography
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-md text-sm font-medium select-none cursor-pointer",
    // Icons
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 shrink-0",
    // Transitions (performance-safe)
    TRANSITION,
    // Focus ring — keyboard accessible
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
    // Active feedback (scale + slight darken) — pure CSS, zero JS
    "active:scale-[0.97] active:brightness-90",
    // Disabled
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
    // Invalid
    "aria-invalid:ring-2 aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  ],
  {
    variants: {
      variant: {
        /*
         * PRIMARY — solid, highest visual weight
         * Use for the main call-to-action on a page.
         */
        default:
          "bg-primary text-primary-foreground shadow-sm " +
          "hover:bg-primary/88 hover:shadow-md",

        /*
         * SECONDARY — muted fill, medium visual weight
         * Use for supporting actions next to a primary button.
         */
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs " +
          "hover:bg-secondary/72",

        /*
         * OUTLINE — border only, low visual weight
         * Use when you need multiple actions of equal priority.
         */
        outline:
          "border border-input bg-background shadow-xs " +
          "hover:bg-accent hover:text-accent-foreground hover:border-input/60 " +
          "dark:bg-input/30 dark:border-input dark:hover:bg-input/50",

        /*
         * GHOST — no background, lowest visual weight
         * Use for tertiary actions or toolbar icons.
         */
        ghost:
          "hover:bg-accent hover:text-accent-foreground " +
          "dark:hover:bg-accent/50",

        /*
         * DESTRUCTIVE — red, danger signal
         * Use only for irreversible actions (delete, remove).
         */
        destructive:
          "bg-destructive text-white shadow-sm " +
          "hover:bg-destructive/88 " +
          "focus-visible:ring-destructive/50 " +
          "dark:bg-destructive/70 dark:hover:bg-destructive/90",

        /*
         * LINK — text-only with underline on hover
         * Use for inline navigation links styled as buttons.
         */
        link:
          "text-primary underline-offset-4 hover:underline " +
          "active:scale-100 active:brightness-100",
      },

      size: {
        sm:       "h-8 rounded-md px-3 gap-1.5 text-xs has-[>svg]:px-2.5",
        default:  "h-9 px-4 py-2 has-[>svg]:px-3",
        lg:       "h-11 rounded-md px-6 text-base has-[>svg]:px-4",
        // Icon-only variants — always square, equal touch targets
        "icon-sm": "size-8 rounded-md",
        icon:      "size-9",
        "icon-lg": "size-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
