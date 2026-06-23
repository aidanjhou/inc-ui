import * as React from "react";
import { toast as sonnerToast } from "sonner";
import { cn } from "../lib/utils";
import { Message, type MessageVariant, variantClassName } from "../components/ui/message";

export type { MessageVariant } from "../components/ui/message";

export interface MessageOptions {
  position?: string;
  /** Duration in seconds before auto-dismiss. 0 or Infinity to disable. */
  duration?: number;
  /** Callback fired when the message is dismissed. */
  onClose?: () => void;
  /** Custom icon element. Overrides variant icon. */
  icon?: React.ReactNode;
  /** Additional CSS class names for the toast container. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
  /** Message variant. Default: "none". */
  variant?: MessageVariant;
  /** Optional description rendered below the main content. */
  description?: React.ReactNode;
}

function resolveOptions(
  content: React.ReactNode,
  durationOrOptions?: number | MessageOptions | (() => void),
  onClose?: () => void
): { content: React.ReactNode; options: Record<string, unknown> } {
  let duration: number | undefined;
  let finalOnClose: (() => void) | undefined;
  let icon: React.ReactNode | undefined;
  let className: string | undefined;
  let style: React.CSSProperties | undefined;

  if (durationOrOptions && typeof durationOrOptions === "object" && !Array.isArray(durationOrOptions)) {
    const opts = durationOrOptions as MessageOptions;
    duration = opts.duration !== undefined ? opts.duration * 1000 : undefined;
    finalOnClose = opts.onClose;
    icon = opts.icon;
    className = opts.className;
    style = opts.style;
  } else if (typeof durationOrOptions === "number") {
    duration = durationOrOptions * 1000;
    finalOnClose = onClose;
  } else if (typeof durationOrOptions === "function") {
    finalOnClose = durationOrOptions;
  }

  return {
    content,
    options: {
      duration,
      onDismiss: finalOnClose,
      onAutoClose: finalOnClose,
      icon,
      className,
      style
    }
  };
}

function buildToastContent(
  variant: MessageVariant,
  content: React.ReactNode,
  description?: React.ReactNode,
  customIcon?: React.ReactNode
) {
  return React.createElement(
    Message,
    { variant, description, icon: customIcon },
    content
  );
}

function buildToast(
  variant: MessageVariant,
  content: React.ReactNode,
  options?: MessageOptions
) {
  const { content: c, options: rawOpts } = resolveOptions(content, options);
  const v = options?.variant || variant;
  const desc = options?.description;
  const customIcon = options?.icon;

  const { icon: _, ...opts } = rawOpts;

  return sonnerToast(
    buildToastContent(v, c, desc, customIcon),
    {
      ...opts,
      className: cn(variantClassName[v], opts.className as string | undefined),
    }
  );
}

/**
 * Imperative message API.
 *
 * @example
 * import { message } from "inc-ui"
 *
 * message("Copied to clipboard")
 * message.success("Profile updated.", {
 *   description: "Your changes have been saved successfully."
 * })
 * message.error("Build failed.", { duration: 5 })
 *
 * const id = message.loading("Uploading...")
 * message.destroy(id)
 *
 * // Advanced: raw sonner API
 * message.toast.promise(fetchUser(), {
 *   loading: "Loading...",
 *   success: (u) => `Welcome, ${u.name}!`,
 *   error: "Failed"
 * })
 */
export const message = Object.assign(
  function message(content: React.ReactNode, options?: MessageOptions) {
    return buildToast(options?.variant || "none", content, options);
  },
  {
    default: (content: React.ReactNode, options?: MessageOptions) =>
      buildToast("none", content, options),
    success: (content: React.ReactNode, options?: MessageOptions) =>
      buildToast("success", content, options),
    error: (content: React.ReactNode, options?: MessageOptions) =>
      buildToast("error", content, options),
    warning: (content: React.ReactNode, options?: MessageOptions) =>
      buildToast("warning", content, options),
    info: (content: React.ReactNode, options?: MessageOptions) =>
      buildToast("info", content, options),
    loading: (content: React.ReactNode, options?: MessageOptions) =>
      buildToast("loading", content, options),
    update: (
      id: string | number,
      variant: MessageVariant,
      content: React.ReactNode,
      options?: Omit<MessageOptions, "variant">
    ) => {
      const { content: c, options: rawOpts } = resolveOptions(content, options);
      const desc = options?.description;
      const customIcon = options?.icon;

      const { icon: _, ...opts } = rawOpts;

      return sonnerToast(
        buildToastContent(variant, c, desc, customIcon),
        {
          id,
          ...opts,
          className: cn(variantClassName[variant], opts.className as string | undefined),
        }
      );
    },
    destroy: (id?: string | number) => {
      if (id !== undefined) {
        sonnerToast.dismiss(id);
      } else {
        sonnerToast.dismiss();
      }
    }
  }
);
