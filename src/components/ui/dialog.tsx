/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import {
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  Dialog as AriaDialog,
  Heading as AriaHeading
} from "react-aria-components";
import { X } from "lucide-react";

import { cn } from "src/lib/utils";
import { Button } from "./button";

const DialogContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
} | null>(null);

interface DialogProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Dialog = ({ open, defaultOpen, onOpenChange, children }: DialogProps) => {
  const [isOpenState, setIsOpenState] = React.useState(defaultOpen || false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : isOpenState;

  const setIsOpen = React.useCallback(
    (val: boolean) => {
      if (!isControlled) {
        setIsOpenState(val);
      }
      onOpenChange?.(val);
    },
    [isControlled, onOpenChange]
  );

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
};
Dialog.displayName = "Dialog";

const DialogTrigger = ({ children }: { children: React.ReactElement<any>; asChild?: boolean }) => {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("DialogTrigger must be used within Dialog");
  const { setIsOpen } = context;

  return React.cloneElement(React.Children.only(<>{children}</>) as React.ReactElement<any>, {
    onPress: () => setIsOpen(true),
    onClick: (e: any) => {
      children.props.onClick?.(e);
      setIsOpen(true);
    }
  });
};
DialogTrigger.displayName = "DialogTrigger";

const DialogClose = ({ children }: { children: React.ReactElement<any>; asChild?: boolean }) => {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("DialogClose must be used within Dialog");
  const { setIsOpen } = context;

  return React.cloneElement(React.Children.only(<>{children}</>) as React.ReactElement<any>, {
    onPress: () => setIsOpen(false),
    onClick: (e: any) => {
      children.props.onClick?.(e);
      setIsOpen(false);
    }
  });
};
DialogClose.displayName = "DialogClose";

const DialogPortal = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
DialogPortal.displayName = "DialogPortal";

const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof AriaModalOverlay>
>((({ className, ...props }, ref) => (
  <AriaModalOverlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[entering]:animate-in data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[entering]:fade-in-0",
      className
    )}
    {...props}
  />
)));
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof AriaDialog> & { className?: string }
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("DialogContent must be used within Dialog");
  const { isOpen, setIsOpen } = context;

  return (
    <AriaModalOverlay
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      className={({ isEntering, isExiting }) => cn(
        "fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4",
        isEntering && "animate-in fade-in-0 duration-200",
        isExiting && "animate-out fade-out-0 duration-200"
      )}
    >
      <AriaModal
        className={({ isEntering, isExiting }) => cn(
          "w-full max-w-lg overflow-hidden border bg-background shadow-lg sm:rounded-lg focus:outline-none",
          isEntering && "animate-in fade-in-0 zoom-in-95 duration-200",
          isExiting && "animate-out fade-out-0 zoom-out-95 duration-200",
          className
        )}
      >
        <AriaDialog
          ref={ref}
          className="relative outline-none p-6 gap-4 grid"
          {...props}
        >
          {({ close }) => (
            <>
              {typeof children === "function" ? children({ close }) : children}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 h-7 w-7 p-0 rounded-md text-muted-foreground hover:text-foreground"
                onPress={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </>
          )}
        </AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
});
DialogContent.displayName = "DialogContent";

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof AriaHeading>
>(({ className, ...props }, ref) => (
  <AriaHeading
    slot="title"
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
};
