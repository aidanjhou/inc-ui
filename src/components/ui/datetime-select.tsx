import * as React from "react";
import { cn } from "../../lib/utils";
import { Select } from "./select";
import { Button } from "./button";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useUIConfig } from "../../context/UIConfigContext";

export interface DatetimeSelectProps {
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

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Helper to format date object to YYYY-MM-DD HH:mm:ss string for human-readable display
const formatDateTime = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};

// Helper to parse value which is a millisecond timestamp string or fallback to human readable string
const parseDateTime = (str?: string): Date => {
  if (!str) return new Date();
  if (/^\d+$/.test(str)) {
    return new Date(Number(str));
  }
  const match = str.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/);
  if (match) {
    const [, yyyy, mm, dd, hh, min, ss] = match;
    return new Date(Number(yyyy), Number(mm) - 1, Number(dd), Number(hh), Number(min), Number(ss));
  }
  const matchNoSec = str.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})$/);
  if (matchNoSec) {
    const [, yyyy, mm, dd, hh, min] = matchNoSec;
    return new Date(Number(yyyy), Number(mm) - 1, Number(dd), Number(hh), Number(min), 0);
  }
  const parsed = new Date(str);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
};

interface DatetimeSelectContentProps {
  value: string;
  close: () => void;
  onConfirm: (val: string) => void;
  confirmRef?: React.RefObject<(() => void) | undefined>;
  variant?: string;
}

function DatetimeSelectContent({
  value,
  close,
  onConfirm,
  confirmRef,
  variant
}: DatetimeSelectContentProps) {
  const isModal = variant !== "dropdown";
  const hasExternalCancel = variant === "picker" || variant === "action-sheet";
  const hasExternalConfirm = variant === "picker" || variant === "action-sheet";
  const parsed = parseDateTime(value);
  const [tempDate, setTempDate] = React.useState<Date>(parsed);

  // Calendar month navigation state
  const [navYear, setNavYear] = React.useState(parsed.getFullYear());
  const [navMonth, setNavMonth] = React.useState(parsed.getMonth());

  const hoursRef = React.useRef<HTMLDivElement | null>(null);
  const minutesRef = React.useRef<HTMLDivElement | null>(null);
  const secondsRef = React.useRef<HTMLDivElement | null>(null);

  // Auto-scroll selected options to the top of scroll areas
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const x = window.scrollX;
      const y = window.scrollY;
      let scrolled = false;

      [hoursRef, minutesRef, secondsRef].forEach((ref) => {
        if (ref.current) {
          const activeBtn = ref.current.querySelector('[data-selected="true"]');
          if (activeBtn instanceof HTMLElement) {
            let parent = activeBtn.parentElement;
            while (parent && parent !== document.body) {
              const style = window.getComputedStyle(parent);
              if (style.overflowY === "auto" || style.overflowY === "scroll") {
                const paddingTop = style.paddingTop;
                if (paddingTop) {
                  activeBtn.style.scrollMarginTop = paddingTop;
                }
                break;
              }
              parent = parent.parentElement;
            }
            activeBtn.scrollIntoView({ block: "start", behavior: "auto" });
            scrolled = true;
          }
        }
      });
      
      if (scrolled) {
        window.scrollTo(x, y);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Refresh internal nav view state and tempDate if current selection changes externally
  React.useEffect(() => {
    const fresh = parseDateTime(value);
    setNavYear(fresh.getFullYear());
    setNavMonth(fresh.getMonth());
    setTempDate(fresh);
  }, [value]);

  // Assign the submit behavior to confirmRef
  React.useEffect(() => {
    if (confirmRef) {
      confirmRef.current = () => {
        onConfirm(String(tempDate.getTime()));
        close();
      };
    }
  }, [confirmRef, tempDate, onConfirm, close]);

  // Calendar Calculations
  const daysInMonth = new Date(navYear, navMonth + 1, 0).getDate();
  const firstDayIndex = new Date(navYear, navMonth, 1).getDay();
  const prevDaysInMonth = new Date(navYear, navMonth, 0).getDate();

  const cells: { date: Date; isCurrentMonth: boolean; key: string }[] = [];

  // Previous month days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = prevDaysInMonth - i;
    cells.push({
      date: new Date(navYear, navMonth - 1, d, tempDate.getHours(), tempDate.getMinutes(), tempDate.getSeconds()),
      isCurrentMonth: false,
      key: `prev-${d}`
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      date: new Date(navYear, navMonth, d, tempDate.getHours(), tempDate.getMinutes(), tempDate.getSeconds()),
      isCurrentMonth: true,
      key: `curr-${d}`
    });
  }

  // Next month days to fill grid
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({
      date: new Date(navYear, navMonth + 1, d, tempDate.getHours(), tempDate.getMinutes(), tempDate.getSeconds()),
      isCurrentMonth: false,
      key: `next-${d}`
    });
  }

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navMonth === 0) {
      setNavMonth(11);
      setNavYear((prev) => prev - 1);
    } else {
      setNavMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navMonth === 11) {
      setNavMonth(0);
      setNavYear((prev) => prev + 1);
    } else {
      setNavMonth((prev) => prev + 1);
    }
  };

  const handleDateSelect = (cellDate: Date) => {
    const updated = new Date(
      cellDate.getFullYear(),
      cellDate.getMonth(),
      cellDate.getDate(),
      tempDate.getHours(),
      tempDate.getMinutes(),
      tempDate.getSeconds()
    );
    setTempDate(updated);
  };

  const handleHourSelect = (h: number) => {
    const updated = new Date(
      tempDate.getFullYear(),
      tempDate.getMonth(),
      tempDate.getDate(),
      h,
      tempDate.getMinutes(),
      tempDate.getSeconds()
    );
    setTempDate(updated);
  };

  const handleMinuteSelect = (m: number) => {
    const updated = new Date(
      tempDate.getFullYear(),
      tempDate.getMonth(),
      tempDate.getDate(),
      tempDate.getHours(),
      m,
      tempDate.getSeconds()
    );
    setTempDate(updated);
  };

  const handleSecondSelect = (s: number) => {
    const updated = new Date(
      tempDate.getFullYear(),
      tempDate.getMonth(),
      tempDate.getDate(),
      tempDate.getHours(),
      tempDate.getMinutes(),
      s
    );
    setTempDate(updated);
  };

  const handleDoneClick = () => {
    confirmRef?.current?.();
  };

  return (
    <div className={cn("flex flex-col p-3 w-96 max-w-full text-foreground select-none", isModal && "mx-auto")} onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-row gap-4">
        {/* Calendar Section */}
        <div className="flex-1 flex flex-col">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">
              {MONTH_NAMES[navMonth]} {navYear}
            </span>
            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                icon size="sm"
                className="h-7 w-7 p-0 rounded-md"
                onClick={handlePrevMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                icon size="sm"
                className="h-7 w-7 p-0 rounded-md"
                onClick={handleNextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Weekdays header */}
          <div className="grid grid-cols-7 text-center text-[10px] font-bold text-muted-foreground uppercase mb-1">
            {WEEKDAYS.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
            {cells.map((cell) => {
              const isSelected =
                tempDate.getFullYear() === cell.date.getFullYear() &&
                tempDate.getMonth() === cell.date.getMonth() &&
                tempDate.getDate() === cell.date.getDate();

              const isToday = (() => {
                const today = new Date();
                return (
                  today.getFullYear() === cell.date.getFullYear() &&
                  today.getMonth() === cell.date.getMonth() &&
                  today.getDate() === cell.date.getDate()
                );
              })();

              return (
                <button
                  key={cell.key}
                  type="button"
                  className={cn(
                    "h-8 w-8 rounded-md flex items-center justify-center font-medium transition-colors cursor-pointer",
                    !cell.isCurrentMonth && "text-muted-foreground/40",
                    cell.isCurrentMonth && !isSelected && "hover:bg-accent hover:text-accent-foreground",
                    isToday && !isSelected && "border border-primary text-primary",
                    isSelected && "bg-primary text-primary-foreground font-semibold"
                  )}
                  onClick={() => handleDateSelect(cell.date)}
                >
                  {cell.date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Section */}
        <div className="flex flex-col gap-2 border-l border-border pl-3 w-36">
          <div className="flex items-center gap-1 mb-1 justify-center text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            <Clock className="h-3 w-3" />
            <span>Time</span>
          </div>

          <div className="flex gap-1 flex-1 h-[240px]">
            {/* Hours */}
            <div ref={hoursRef} className="flex-1 overflow-y-auto pr-0.5 border-r border-border/30 h-[240px]">
              {Array.from({ length: 24 }).map((_, h) => {
                const selected = tempDate.getHours() === h;
                return (
                  <button
                    key={h}
                    type="button"
                    data-selected={selected ? "true" : "false"}
                    className={cn(
                      "w-full text-center text-xs h-6 flex items-center justify-center rounded-md font-medium transition-colors block cursor-pointer",
                      selected ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={() => handleHourSelect(h)}
                  >
                    {String(h).padStart(2, "0")}
                  </button>
                );
              })}
            </div>

            {/* Minutes */}
            <div ref={minutesRef} className="flex-1 overflow-y-auto pr-0.5 border-r border-border/30 h-[240px]">
              {Array.from({ length: 60 }).map((_, m) => {
                const selected = tempDate.getMinutes() === m;
                return (
                  <button
                    key={m}
                    type="button"
                    data-selected={selected ? "true" : "false"}
                    className={cn(
                      "w-full text-center text-xs h-6 flex items-center justify-center rounded-md font-medium transition-colors block cursor-pointer",
                      selected ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={() => handleMinuteSelect(m)}
                  >
                    {String(m).padStart(2, "0")}
                  </button>
                );
              })}
            </div>

            {/* Seconds */}
            <div ref={secondsRef} className="flex-1 overflow-y-auto pl-0.5 h-[240px]">
              {Array.from({ length: 60 }).map((_, s) => {
                const selected = tempDate.getSeconds() === s;
                return (
                  <button
                    key={s}
                    type="button"
                    data-selected={selected ? "true" : "false"}
                    className={cn(
                      "w-full text-center text-xs h-6 flex items-center justify-center rounded-md font-medium transition-colors block cursor-pointer",
                      selected ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={() => handleSecondSelect(s)}
                  >
                    {String(s).padStart(2, "0")}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between border-t border-border mt-3 pt-2.5">
        <span className="text-[10px] text-muted-foreground font-semibold tracking-wider font-mono">
          {formatDateTime(tempDate)}
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
              onClick={handleDoneClick}
            >
              Confirm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function DatetimeSelect(props: DatetimeSelectProps) {
  const {
    value: controlledValue,
    defaultValue,
    onChange,
    placeholder = "Select date & time...",
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
    const dateObj = parseDateTime(activeValue);
    return [{
      value: activeValue,
      label: formatDateTime(dateObj)
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
        <DatetimeSelectContent
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
