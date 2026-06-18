import * as React from "react";

import { cn } from "src/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        {...(!props?.value ? { "data-placeholder": "" } : {})}
        className={cn(
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "w-full h-10 flex items-center justify-between px-3 py-2 rounded-md text-sm [&>span]:line-clamp-1 focus:outline-none transition-colors",
          "bg-background border border-input text-foreground data-[placeholder]:text-muted-foreground cursor-text",
          "hover:bg-primary/5 hover:border-primary hover:text-foreground hover:data-[placeholder]:text-foreground",
          "focus:bg-primary/5 focus:border-primary focus:text-foreground focus:data-[placeholder]:text-foreground",
          "disabled:bg-muted disabled:border-muted disabled:text-foreground disabled:data-[placeholder]:text-muted-foreground disabled:cursor-not-allowed",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
