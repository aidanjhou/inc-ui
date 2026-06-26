import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

const togglerSizeConfig = {
  xs: { button: "h-4.5 w-4.5 rounded-sm p-0", icon: "h-3 w-3" },
  sm: { button: "h-5.5 w-5.5 rounded-sm p-0", icon: "h-3.5 w-3.5" },
  default: { button: "h-6.5 w-6.5 rounded p-0", icon: "h-4 w-4" },
  lg: { button: "h-7.5 w-7.5 rounded p-0", icon: "h-4.5 w-4.5" },
  xl: { button: "h-8.5 w-8.5 rounded-md p-0", icon: "h-5 w-5" },
  xxl: { button: "h-9.5 w-9.5 rounded-md p-0", icon: "h-5.5 w-5.5" },
};

export type TogglerSize = keyof typeof togglerSizeConfig;

export type TogglerDirection = "up" | "down" | "left" | "right";

const directionRotationMap: Record<TogglerDirection, string> = {
  right: "rotate-0",
  down: "rotate-90",
  left: "rotate-180",
  up: "-rotate-90"
};

export interface TogglerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  isExpanded?: boolean;
  defaultExpanded?: boolean;
  onExpandChange?: (isExpanded: boolean) => void;
  size?: TogglerSize;
  pure?: boolean;
  /**
   * Direction of the chevron when collapsed.
   * @default "right"
   */
  collapsedDirection?: TogglerDirection;
  /**
   * Direction of the chevron when expanded.
   * @default "down"
   */
  expandedDirection?: TogglerDirection;
}

const Toggler = React.forwardRef<HTMLButtonElement, TogglerProps>(
  ({ 
    className, 
    isExpanded: controlledExpanded, 
    defaultExpanded = false, 
    onExpandChange, 
    size = "default", 
    pure = false, 
    collapsedDirection = "right", 
    expandedDirection = "down", 
    onClick, 
    ...props 
  }, ref) => {
    const config = togglerSizeConfig[size] || togglerSizeConfig.default;

    // Uncontrolled state
    const [localExpanded, setLocalExpanded] = React.useState(defaultExpanded);

    const isExpanded = controlledExpanded !== undefined ? controlledExpanded : localExpanded;

    const handleToggle = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      const nextExpanded = !isExpanded;
      if (controlledExpanded === undefined) {
        setLocalExpanded(nextExpanded);
      }
      onExpandChange?.(nextExpanded);
      onClick?.(e);
    }, [isExpanded, controlledExpanded, onExpandChange, onClick]);

    const currentDirection = isExpanded ? expandedDirection : collapsedDirection;
    const rotationClass = directionRotationMap[currentDirection] || "rotate-0";

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleToggle}
        className={cn(
          "inline-flex items-center justify-center text-muted-foreground focus:outline-none transition-colors shrink-0",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
          pure 
            ? "h-fit w-fit p-0 hover:bg-transparent bg-transparent" 
            : cn("hover:bg-muted-foreground/10 rounded-md", config.button),
          className
        )}
        aria-expanded={isExpanded}
        {...props}
      >
        <ChevronRight
          className={cn(
            "transition-transform duration-200 shrink-0",
            pure ? cn("h-4 w-4", size === "xs" && "h-3 w-3", size === "sm" && "h-3.5 w-3.5", size === "lg" && "h-4.5 w-4.5", size === "xl" && "h-5 w-5", size === "xxl" && "h-5.5 w-5.5") : config.icon,
            rotationClass
          )}
        />
      </button>
    )
  }
)

Toggler.displayName = "Toggler"

export { Toggler }
