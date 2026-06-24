/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { Button as AriaButton } from "react-aria-components";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "src/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "border border-primary bg-background text-primary hover:bg-primary/10",
        solid:
          "bg-input text-foreground hover:bg-input/70",
        default:
          "border border-input bg-background text-foreground hover:bg-foreground/10",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/15",
        none: "",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "border border-input bg-background text-foreground hover:bg-foreground/10",
      },
      size: {
        xs: "h-5 min-w-5 rounded-sm px-1 text-xs font-normal leading-none gap-1",
        sm: "h-6 min-w-6 rounded px-1.5 text-xs font-normal gap-1",
        default: "h-7 min-w-7 rounded px-2 text-xs font-medium gap-2",
        lg: "h-8 min-w-8 rounded-md px-3 text-sm font-medium gap-2",
        xl: "h-9 min-w-9 rounded-md px-4 text-sm font-semibold gap-3",
        xxl: "h-10 min-w-10 rounded-md px-5 text-base font-semibold gap-3"
      },
      icon: {
        true: "",
        false: ""
      }
    },
    compoundVariants: [
      {
        icon: true,
        className: "px-0"
      }
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      icon: false
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: boolean;
  loading?: boolean;
  onPress?: (e: any) => void;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, icon = false, loading = false, children, disabled, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, icon, className }))}
          ref={ref}
          aria-disabled={disabled || loading || undefined}
          {...(props as any)}
        >
          {children}
        </Slot>
      );
    }

    return (
      <AriaButton
        className={cn(buttonVariants({ variant, size, icon, className }))}
        isDisabled={disabled || loading}
        ref={ref as any}
        {...(props as any)}
      >
        {loading && (
          <svg
            className="animate-spin text-current size-[1em]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </AriaButton>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
