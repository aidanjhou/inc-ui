import * as React from "react";
import {
  MenuTrigger as AriaMenuTrigger,
  Popover as AriaPopover,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  SubmenuTrigger as AriaSubmenuTrigger,
  Separator as AriaSeparator,
  Header as AriaHeader,
} from "react-aria-components";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "src/lib/utils";

// ------------------------------------------------------------------
// DropdownMenu
// ------------------------------------------------------------------

interface DropdownMenuProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  open,
  defaultOpen,
  onOpenChange,
  children,
}) => {
  return (
    <AriaMenuTrigger
      isOpen={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {children}
    </AriaMenuTrigger>
  );
};
DropdownMenu.displayName = "DropdownMenu";

// ------------------------------------------------------------------
// DropdownMenuTrigger
// ------------------------------------------------------------------

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  { children: React.ReactNode; asChild?: boolean; className?: string }
>(({ children, className, asChild, ...props }, ref) => {
  if (asChild) {
    const child = React.Children.only(children);
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        ...props,
        ref,
        className: cn((child.props as any)?.className, className),
      });
    }
  }
  return <>{children}</>;
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

// ------------------------------------------------------------------
// DropdownMenuContent
// ------------------------------------------------------------------

const placementMap = {
  start: "bottom start" as const,
  center: "bottom" as const,
  end: "bottom end" as const,
};

interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof AriaMenu> {
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, align = "start", children, ...props }, ref) => {
  // Wrap standalone DropdownMenuLabel elements in MenuSection so the
  // collection system renders them correctly (Header must be inside MenuSection).
  const processedChildren = React.useMemo(() => {
    return React.Children.map(children as React.ReactNode, (child) => {
      if (!React.isValidElement(child)) return child;
      if (child.type === DropdownMenuLabel) {
        return <AriaMenuSection>{child}</AriaMenuSection>;
      }
      return child;
    });
  }, [children]);

  return (
    <AriaPopover
      placement={placementMap[align] ?? "bottom start"}
      offset={sideOffset}
      className={({ isEntering, isExiting }) =>
        cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none",
          isEntering &&
          "animate-in fade-in-0 zoom-in-95 duration-100",
          isExiting &&
          "animate-out fade-out-0 zoom-out-95 duration-75",
          className,
        )
      }
    >
      <AriaMenu
        ref={ref}
        className="outline-none"
        {...props}
      >
        {processedChildren as React.ReactNode}
      </AriaMenu>
    </AriaPopover>
  );
});
DropdownMenuContent.displayName = "DropdownMenuContent";

// ------------------------------------------------------------------
// DropdownMenuItem
// ------------------------------------------------------------------

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof AriaMenuItem> & {
    inset?: boolean;
    onClick?: () => void;
  }
>(({ className, inset, children, onClick, ...props }, ref) => {
  return (
    <AriaMenuItem
      ref={ref}
      onAction={onClick}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[focused]:bg-accent data-[focused]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        inset && "pl-8",
        className,
      )}
      {...props}
    >
      <>{children}</>
    </AriaMenuItem>
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

// ------------------------------------------------------------------
// DropdownMenuCheckboxItem
// ------------------------------------------------------------------

const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof AriaMenuItem> & {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  }
>(({ className, children, checked, onCheckedChange, ...props }, ref) => {
  return (
    <AriaMenuItem
      ref={ref}
      onAction={() => onCheckedChange?.(!checked)}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[focused]:bg-accent data-[focused]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <Check className="h-4 w-4" />}
      </span>
      <>{children}</>
    </AriaMenuItem>
  );
});
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

// ------------------------------------------------------------------
// DropdownMenuRadioItem
// ------------------------------------------------------------------

const DropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof AriaMenuItem> & {
    checked?: boolean;
  }
>(({ className, children, checked, ...props }, ref) => {
  return (
    <AriaMenuItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[focused]:bg-accent data-[focused]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <Circle className="h-2 w-2 fill-current" />}
      </span>
      <>{children}</>
    </AriaMenuItem>
  );
});
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

// ------------------------------------------------------------------
// DropdownMenuLabel
// ------------------------------------------------------------------

const DropdownMenuLabel = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof AriaHeader> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <AriaHeader
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

// ------------------------------------------------------------------
// DropdownMenuSeparator
// ------------------------------------------------------------------

const DropdownMenuSeparator = React.forwardRef<
  HTMLHRElement,
  React.ComponentPropsWithoutRef<typeof AriaSeparator>
>(({ className, ...props }, ref) => (
  <AriaSeparator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

// ------------------------------------------------------------------
// DropdownMenuShortcut
// ------------------------------------------------------------------

const DropdownMenuShortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
    {...props}
  />
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// ------------------------------------------------------------------
// DropdownMenuGroup
// ------------------------------------------------------------------

const DropdownMenuGroup = React.Fragment;

// ------------------------------------------------------------------
// DropdownMenuPortal
// ------------------------------------------------------------------

/** No-op; AriaPopover renders into a portal automatically. */
const DropdownMenuPortal = React.Fragment;

// ------------------------------------------------------------------
// DropdownMenuRadioGroup
// ------------------------------------------------------------------

const DropdownMenuRadioGroup = React.Fragment;

// ------------------------------------------------------------------
// DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent
// ------------------------------------------------------------------

const DropdownMenuSub = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof AriaSubmenuTrigger>
>((props, ref) => <AriaSubmenuTrigger ref={ref} {...props} />);
DropdownMenuSub.displayName = "DropdownMenuSub";

const DropdownMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof AriaMenuItem> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <AriaMenuItem
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[focused]:bg-accent data-[focused]:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    <>{children}</>
    <ChevronRight className="ml-auto" />
  </AriaMenuItem>
));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

const DropdownMenuSubContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof AriaMenu>
>(({ className, children, ...props }, ref) => (
  <AriaPopover
    className={({ isEntering, isExiting }) =>
      cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg outline-none",
        isEntering && "animate-in fade-in-0 zoom-in-95 duration-100",
        isExiting && "animate-out fade-out-0 zoom-out-95 duration-75",
        className,
      )
    }
  >
    <AriaMenu ref={ref} className="outline-none" {...props}>
      {children as React.ReactNode}
    </AriaMenu>
  </AriaPopover>
));
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

// ------------------------------------------------------------------
// Exports
// ------------------------------------------------------------------

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
