/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { Button as AriaButton } from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "src/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-primary bg-background text-primary hover:bg-primary/10",
        secondary:
          "border border-primary bg-background hover:bg-accent hover:text-accent-foreground",
        default:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        destructive:
          "border border-input bg-background text-destructive hover:bg-destructive/10",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-8 min-w-[32px] rounded-md px-1 text-xs",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  onPress?: (e: any) => void;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const classNames = cn(buttonVariants({ variant, size, className }));

    if (asChild) {
      const child = React.Children.only(<>{children}</>) as React.ReactElement<any>;
      return React.cloneElement(child, {
        className: cn(classNames, child.props.className),
        ref,
        disabled: disabled || loading,
        ...props
      });
    }

    return (
      <AriaButton
        className={classNames}
        isDisabled={disabled || loading}
        ref={ref as any}
        {...(props as any)}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin text-current"
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
