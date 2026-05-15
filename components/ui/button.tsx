"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button — restyled to the Journey palette.
 *
 * Variants:
 *  - primary    deep turquoise (default CTAs)
 *  - terracotta warm clay (booking/AI CTAs)
 *  - ochre      gold outline (secondary CTAs over hero imagery)
 *  - outline    cream-bordered for content surfaces
 *  - ghost      transparent, hover-tints — used in toolbars
 *  - link       underlined inline link
 *
 * Sizes follow Tailwind density: sm / md (default) / lg / xl / icon.
 */
const buttonVariants = cva(
  // Base classes shared by every variant.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-uz-turquoise text-uz-cream shadow-md hover:bg-uz-turquoise-deep hover:shadow-lg hover:-translate-y-0.5",
        terracotta:
          "bg-uz-terracotta text-uz-cream shadow-md hover:bg-uz-terracotta-deep hover:shadow-warm hover:-translate-y-0.5",
        ochre:
          "border-2 border-uz-ochre text-uz-ochre hover:bg-uz-ochre hover:text-uz-charcoal",
        outline:
          "border border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground",
        ghost:
          "bg-transparent hover:bg-secondary hover:text-secondary-foreground",
        link:
          "text-uz-turquoise underline-offset-4 hover:underline rounded-none px-0",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // `asChild` lets us render a Link or other element with the button styles
  // by composing instead of stacking elements.
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
