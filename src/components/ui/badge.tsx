import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline: 
          "text-foreground border-border",
        success:
          "border-transparent bg-success text-primary-foreground",
        warning:
          "border-transparent bg-warning text-accent-foreground",
        info:
          "border-transparent bg-info text-primary-foreground",
        accent:
          "border-transparent bg-accent text-accent-foreground",
        festival:
          "border-transparent bg-festival-primary text-primary-foreground",
        glass:
          "bg-card/60 backdrop-blur-sm border-border/50 text-foreground",
        // Status badges for development work
        planned:
          "border-info/30 bg-info/20 text-info",
        ongoing:
          "border-warning/30 bg-warning/20 text-warning",
        completed:
          "border-success/30 bg-success/20 text-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
