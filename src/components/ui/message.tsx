import * as React from "react";
import { Toaster as SonnerToaster } from "sonner";
import { cn } from "../../lib/utils";
import {
  CheckCircleIcon,
  CloseCircleIcon,
  ExclamationCircleIcon,
  InfoCircleIcon,
  LoadingIcon
} from "./icons";

// ── Variant shared types ───────────────────────────────────────────────

export type MessageVariant = "none" | "success" | "error" | "warning" | "info" | "loading";

const variantIcon: Record<MessageVariant, React.ReactNode | null> = {
  none: null,
  success: <CheckCircleIcon />,
  error: <CloseCircleIcon />,
  warning: <ExclamationCircleIcon />,
  info: <InfoCircleIcon />,
  loading: <LoadingIcon />,
};

export const variantClassName: Record<MessageVariant, string> = {
  none: "!bg-black-50",
  loading: "",
  success: cn(
    "!border-success/30 !text-success !bg-success-90",
    "dark:!border-success/40 dark:!bg-success-30"
  ),
  error: cn(
    "!border-destructive/30 !text-destructive !bg-destructive-90",
    "dark:!border-destructive/40 dark:!bg-destructive-30"
  ),
  warning: cn(
    "!border-warning/30 !text-warning !bg-warning-90",
    "dark:!border-warning/40 dark:!bg-warning-30"
  ),
  info: cn(
    "!border-info/30 !text-info !bg-info-90",
    "dark:!border-info/40 dark:!bg-info-30"
  ),
};

// ── Message component ──────────────────────────────────────────────────

export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MessageVariant;
  description?: React.ReactNode;
  /** Custom icon element. Overrides variant icon. */
  icon?: React.ReactNode;
}

export function Message({ variant = "none", description, icon, className, children, ...props }: MessageProps) {
  const resolvedIcon = icon !== undefined ? icon : variantIcon[variant];

  return (
    <div className={cn("flex items-start gap-3", className)} {...props}>
      {resolvedIcon && (
        <div className="mt-0.5 shrink-0">{resolvedIcon}</div>
      )}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-sm font-semibold">{children}</span>
        {description && (
          <span className="text-sm text-muted-foreground">{description}</span>
        )}
      </div>
    </div>
  );
}

// ── MessagePrompter (Sonner wrapper) ───────────────────────────────────

export interface MessagePrompterProps extends React.ComponentProps<typeof SonnerToaster> {
  /** Position of the toaster. Default: "top-center". */
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
  /** Maximum number of visible messages. Default: 3. */
  visibleMessages?: number;
}

export function MessagePrompter({
  className,
  position = "top-center",
  visibleMessages = 3,
  ...props
}: MessagePrompterProps) {
  return (
    <SonnerToaster
      position={position}
      visibleToasts={visibleMessages}
      className={cn("toaster group", className)}
      toastOptions={{
        classNames: {
          toast: cn(
            "group toast",
            "group-[.toaster]:bg-background",
            "group-[.toaster]:text-foreground",
            "group-[.toaster]:border-border",
            "group-[.toaster]:shadow-lg",
            "group-[.toaster]:pointer-events-auto"
          ),
          title: "group-[.toast]:text-foreground group-[.toast]:font-semibold",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: cn(
            "group-[.toast]:bg-primary",
            "group-[.toast]:text-primary-foreground",
            "group-[.toast]:hover:bg-primary/90"
          ),
          cancelButton: cn(
            "group-[.toast]:bg-muted",
            "group-[.toast]:text-muted-foreground",
            "group-[.toast]:hover:bg-muted/80"
          )
        }
      }}
      {...props}
    />
  );
}
