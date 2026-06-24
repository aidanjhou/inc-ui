import * as React from "react";
import { cn } from "../../lib/utils";
import { Select } from "./select";
import { Calendar, formatDateOnly, parseDate } from "./calendar";
import { Button } from "./button";
import { useUIConfig } from "../../context/UIConfigContext";

export interface CalendarSelectProps {
  value?: string; // Format: millisecond timestamp string (e.g. "1718704740000")
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  variant?: "dropdown" | "picker" | "action-sheet" | "bottom-modal" | "center-modal";
  label?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "end" | "center";
}

// ------------------------------------------------------------------
// CalendarSelectContent
// ------------------------------------------------------------------

interface CalendarSelectContentProps {
  value: string;
  close: () => void;
  onConfirm: (val: string) => void;
  confirmRef?: React.RefObject<(() => void) | undefined>;
  variant?: string;
}

function CalendarSelectContent({
  value,
  close,
  onConfirm,
  confirmRef,
  variant
}: CalendarSelectContentProps) {
  const isModal = variant !== "dropdown";
  const hasExternalCancel = variant === "picker" || variant === "action-sheet";
  const hasExternalConfirm = variant === "picker" || variant === "action-sheet";

  const [tempValue, setTempValue] = React.useState<string>(value || "");

  // Sync tempValue when controlled value changes externally
  React.useEffect(() => {
    setTempValue(value || "");
  }, [value]);

  // Assign the submit behavior to confirmRef
  React.useEffect(() => {
    if (confirmRef) {
      confirmRef.current = () => {
        let valToConfirm = tempValue;
        if (!valToConfirm) {
          const now = new Date();
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          valToConfirm = String(today.getTime());
        }
        onConfirm(valToConfirm);
        close();
      };
    }
  }, [confirmRef, tempValue, onConfirm, close]);

  return (
    <div className={cn("flex flex-col p-3 w-80 max-w-full text-foreground select-none", isModal && "mx-auto")} onClick={(e) => e.stopPropagation()}>
      <Calendar
        value={tempValue}
        onChange={(val) => {
          setTempValue(val);
        }}
      />
      {/* Bottom Actions */}
      <div className="flex items-center justify-between border-t border-border mt-3 pt-2.5">
        <span className="text-[10px] text-muted-foreground font-semibold tracking-wider font-mono">
          {tempValue ? formatDateOnly(parseDate(tempValue)) : ""}
        </span>
        <div className="flex items-center gap-1.5">
          {!hasExternalCancel && (
            <Button
              type="button"
              variant="ghost"
              className="h-8 px-3 text-xs font-semibold rounded-md"
              onClick={close}
            >
              Cancel
            </Button>
          )}
          {!hasExternalConfirm && (
            <Button
              type="button"
              className="h-8 px-3 text-xs font-semibold rounded-md"
              onClick={() => {
                confirmRef?.current?.();
              }}
            >
              Confirm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// CalendarSelect
// ------------------------------------------------------------------

function CalendarSelect(props: CalendarSelectProps) {
  const {
    value: controlledValue,
    defaultValue,
    onChange,
    placeholder = "Select date...",
    disabled = false,
    className,
    triggerClassName,
    variant,
    label,
    open,
    onOpenChange,
    align
  } = props;

  const uiConfig = useUIConfig();
  const platform = uiConfig ? uiConfig.platform : "desktop";
  const activeVariant = variant || (platform === "mobile" ? "picker" : "dropdown");
  const isActionSheet = activeVariant === "action-sheet";

  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  const isValueControlled = "value" in props;
  const activeValue = isValueControlled ? controlledValue : internalValue;

  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpenControlled = "open" in props;
  const activeOpen = isOpenControlled ? open : internalOpen;

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpenControlled) {
      setInternalOpen(isOpen);
    }
    onOpenChange?.(isOpen);
  };

  const handleConfirm = (dateStr?: string) => {
    const finalVal = dateStr !== undefined ? dateStr : (activeValue || "");
    if (!isValueControlled) {
      setInternalValue(finalVal);
    }
    onChange?.(finalVal);
  };

  const confirmRef = React.useRef<(() => void) | undefined>(undefined);

  // Generate a mock options list containing a single mapping so that Select's trigger
  // displays the human-readable date representation instead of the raw millisecond string.
  const options = React.useMemo(() => {
    if (!activeValue) return undefined;
    const dateObj = parseDate(activeValue);
    return [{
      value: activeValue,
      label: formatDateOnly(dateObj)
    }];
  }, [activeValue]);

  return (
    <Select
      value={activeValue}
      onChange={(val) => handleConfirm(val)}
      options={options}
      confirmRef={confirmRef}
      placeholder={placeholder}
      disabled={disabled}
      className={cn("w-auto h-auto max-h-none", className)}
      triggerClassName={triggerClassName}
      variant={variant}
      label={label}
      open={activeOpen}
      onOpenChange={handleOpenChange}
      showConfirm={isActionSheet}
      align={align}
      renderContent={({ value: currentVal, close }) => (
        <CalendarSelectContent
          value={currentVal || ""}
          close={close}
          onConfirm={(val) => handleConfirm(val)}
          confirmRef={confirmRef}
          variant={activeVariant}
        />
      )}
      onOk={(val) => {
        handleConfirm(val);
      }}
    />
  );
}

CalendarSelect.displayName = "CalendarSelect";

export { CalendarSelect };
