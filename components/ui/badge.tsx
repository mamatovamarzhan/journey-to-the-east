import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Small chip — used on hero (floating facts), city cards, story cards.
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "bg-uz-turquoise/10 text-uz-turquoise border border-uz-turquoise/20",
        terracotta:
          "bg-uz-terracotta/15 text-uz-terracotta-deep border border-uz-terracotta/30",
        ochre:
          "bg-uz-ochre/15 text-uz-ochre border border-uz-ochre/30",
        cream:
          "bg-uz-cream-deep text-uz-charcoal border border-uz-ochre/30",
        glass:
          "glass-dark text-uz-cream backdrop-blur-md",
        outline:
          "border border-border text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
