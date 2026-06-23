import * as React from "react";
import { Modal, ModalOverlay, Dialog } from "react-aria-components";
import { cn } from "../../lib/utils";
import { Message, type MessageVariant, variantClassName } from "./message";

export type LoadingVariant = MessageVariant;

export interface LoadingProps {
  /** Control visibility of the loading overlay. Default: true. */
  open?: boolean;
  /** Callback when the overlay is dismissed (Escape key or backdrop click). */
  onOpenChange?: (open: boolean) => void;
  /** Variant determines the icon displayed. Default: "loading". */
  variant?: MessageVariant;
  /** Accessible label for the dialog. Defaults to children text or variant. */
  label?: string;
  /** Additional CSS class names for the overlay. */
  className?: string;
  children?: React.ReactNode;
}

export function Loading({
  open = true,
  onOpenChange,
  variant = "loading",
  className,
  children,
  label,
}: LoadingProps) {
  const ariaLabel = label || (typeof children === "string" ? children : `Loading — ${variant}`);

  return (
    <ModalOverlay
      isOpen={open}
      onOpenChange={onOpenChange}
      isDismissable
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-background/50 backdrop-blur-[0.5px]",
        "entering:animate-in entering:fade-in entering:duration-200",
        "exiting:animate-out exiting:fade-out exiting:duration-150",
        className
      )}
    >
      <Modal>
        <Dialog aria-label={ariaLabel} className="outline-none">
          <Message
            variant={variant}
            className={cn(
              "rounded-lg border bg-background px-4 py-3 shadow-lg text-foreground",
              variantClassName[variant]
            )}
          >
            {children}
          </Message>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
