import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "src/lib/utils";

const inputVariants = cva(
  "w-full flex items-center justify-between file:border-0 file:bg-transparent file:text-sm file:font-medium [&>span]:line-clamp-1 focus:outline-none transition-colors bg-background border border-input text-foreground data-[placeholder]:text-muted-foreground cursor-text hover:bg-primary/5 hover:border-primary hover:text-foreground hover:data-[placeholder]:text-foreground focus:bg-primary/5 focus:border-primary focus:text-foreground focus:data-[placeholder]:text-foreground disabled:bg-muted disabled:border-muted disabled:text-foreground disabled:data-[placeholder]:text-muted-foreground disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        xs: "h-5 rounded-sm px-1 text-xs font-normal",
        sm: "h-6 rounded px-1.5 text-xs font-normal",
        default: "h-7 rounded px-2 text-xs font-medium",
        lg: "h-8 rounded-md px-3 text-sm font-medium",
        xl: "h-9 rounded-md px-4 text-sm font-semibold",
        xxl: "h-10 rounded-md px-5 text-base font-semibold",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, ...props }, ref) => {
    return (
      <input
        type={type}
        {...(!props?.value ? { "data-placeholder": "" } : {})}
        className={cn(inputVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
