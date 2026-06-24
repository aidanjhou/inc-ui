import * as React from "react";
import { cn } from "../../lib/utils";
import { Select } from "./select";
import { RangeCalendar, formatDateRange } from "./calendar";
import { Button } from "./button";
import { useUIConfig } from "../../context/UIConfigContext";

export interface RangeCalendarSelectProps {
  value?: string; // Format: "startTimestamp,endTimestamp"
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
// RangeCalendarSelectContent
// ------------------------------------------------------------------

interface RangeCalendarSelectContentProps {
  value: string;
  close: () => void;
  onConfirm: (val: string) => void;
  confirmRef?: React.RefObject<(() => void) | undefined>;
  variant?: string;
}

function RangeCalendarSelectContent({
  value,
  close,
  onConfirm,
  confirmRef,
  variant
}: RangeCalendarSelectContentProps) {
  const isModal = variant !== "dropdown";
  const hasExternalCancel = variant === "picker" || variant === "action-sheet";
  const hasExternalConfirm = variant === "picker" || variant === "action-sheet";

  const [tempValue, setTempValue] = React.useState<string>(value || "");

  // Sync tempValue when controlled value changes externally
  React.useEffect(() => {
    setTempValue(value || "");
  }, [value]);

  // Check if range is complete (both start and end are selected)
  const isRangeComplete = React.useMemo(() => {
    if (!tempValue) return false;
    const parts = tempValue.split(",");
    return parts.length === 2 && !!parts[0] && !!parts[1];
  }, [tempValue]);

  // Display text for the currently selected/previewed range
  const rangeDisplay = React.useMemo(() => {
    if (!tempValue) return "";
    return formatDateRange(tempValue);
  }, [tempValue]);

  // Assign the submit behavior to confirmRef
  React.useEffect(() => {
    if (confirmRef) {
      confirmRef.current = () => {
        if (isRangeComplete) {
          onConfirm(tempValue);
          close();
        }
      };
    }
  }, [confirmRef, tempValue, onConfirm, close, isRangeComplete]);

  return (
    <div className={cn("flex flex-col p-3 w-80 max-w-full text-foreground select-none", isModal && "mx-auto")} onClick={(e) => e.stopPropagation()}>
      <RangeCalendar
        value={tempValue}
        onChange={(val) => {
          setTempValue(val);
        }}
      />
      {/* Bottom Actions */}
      <div className="flex items-center justify-between border-t border-border mt-3 pt-2.5">
        <span className="text-[10px] text-muted-foreground font-semibold tracking-wider font-mono">
          {rangeDisplay}
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
              className={cn("h-8 px-3 text-xs font-semibold rounded-md", !isRangeComplete && "opacity-50")}
              disabled={!isRangeComplete}
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
// RangeCalendarSelect
// ------------------------------------------------------------------

function RangeCalendarSelect(props: RangeCalendarSelectProps) {
  const {
    value: controlledValue,
    defaultValue,
    onChange,
    placeholder = "Select date range...",
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
  // displays the human-readable date range representation instead of the raw timestamp string.
  const options = React.useMemo(() => {
    if (!activeValue) return undefined;
    return [{
      value: activeValue,
      label: formatDateRange(activeValue)
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
        <RangeCalendarSelectContent
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

RangeCalendarSelect.displayName = "RangeCalendarSelect";

export { RangeCalendarSelect };
