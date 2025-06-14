import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "animate-spin rounded-full border-solid border-r-transparent",
  {
    variants: {
      size: {
        xs: "h-3 w-3 border-[1.5px]",
        sm: "h-4 w-4 border-[1.5px]",
        md: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-2",
        xl: "h-12 w-12 border-[3px]",
        "2xl": "h-16 w-16 border-4",
      },
      variant: {
        default: "border-primary",
        secondary: "border-secondary",
        destructive: "border-destructive",
        muted: "border-muted-foreground",
        accent: "border-accent-foreground",
        brand: "border-brand-500",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /**
   * Show spinner with overlay background
   */
  overlay?: boolean;
  /**
   * Text to display alongside the spinner
   */
  label?: string;
  /**
   * Position of the label relative to the spinner
   */
  labelPosition?: "top" | "bottom" | "left" | "right";
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      className,
      size,
      variant,
      overlay = false,
      label,
      labelPosition = "bottom",
      ...props
    },
    ref
  ) => {
    const spinner = (
      <div
        ref={ref}
        className={cn(spinnerVariants({ size, variant }), className)}
        role="status"
        aria-label={label || "Loading..."}
        {...props}
      />
    );

    const content = label ? (
      <div
        className={cn(
          "flex items-center gap-2",
          labelPosition === "top" && "flex-col-reverse",
          labelPosition === "bottom" && "flex-col",
          labelPosition === "left" && "flex-row-reverse",
          labelPosition === "right" && "flex-row"
        )}
      >
        {spinner}
        <span className="text-sm text-muted-foreground" aria-hidden="true">
          {label}
        </span>
      </div>
    ) : (
      spinner
    );

    if (overlay) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          {content}
        </div>
      );
    }

    return content;
  }
);

Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
