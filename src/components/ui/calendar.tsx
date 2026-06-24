import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import solarlunar from "solarlunar";
import {
  Calendar as AriaCalendar,
  CalendarGrid,
  CalendarGridHeader,
  CalendarGridBody,
  CalendarCell,
  CalendarHeaderCell,
  RangeCalendar as AriaRangeCalendar,
  type CalendarProps as AriaCalendarProps
} from "react-aria-components";
import { CalendarDate, getLocalTimeZone, toCalendarDate } from "@internationalized/date";
import type { DateRange } from "react-stately/useRangeCalendarState";

export interface CalendarProps {
  value?: string; // Format: millisecond timestamp string (e.g. "1718704740000")
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

// Helper to format date object to YYYY-MM-DD string
export const formatDateOnly = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

// Helper to format range string to display format
export const formatDateRange = (rangeStr?: string): string => {
  if (!rangeStr) return "";
  const parts = rangeStr.split(",");
  if (parts.length < 2 || !parts[0] || !parts[1]) return "";
  return `${formatDateOnly(parseDate(parts[0]))} - ${formatDateOnly(parseDate(parts[1]))}`;
};

// Helper to parse value which is a millisecond timestamp string
export const parseDate = (str?: string): Date => {
  if (!str) return new Date();
  if (/^\d+$/.test(str)) {
    return new Date(Number(str));
  }
  const match = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const [, yyyy, mm, dd] = match;
    return new Date(Number(yyyy), Number(mm) - 1, Number(dd), 0, 0, 0, 0);
  }
  const parsed = new Date(str);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
};

// Convert millisecond timestamp string to CalendarDate
const tsToCalendarDate = (ts?: string): CalendarDate => {
  const d = parseDate(ts);
  return new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
};

// Convert CalendarDate to millisecond timestamp string
const calendarDateToTs = (cd: CalendarDate): string => {
  const d = cd.toDate(getLocalTimeZone());
  return String(d.getTime());
};

function Calendar(props: CalendarProps) {
  const { value, defaultValue, onChange, className } = props;
  const isControlled = "value" in props;

  const [internalDate, setInternalDate] = React.useState<CalendarDate>(() =>
    tsToCalendarDate(defaultValue)
  );

  const activeDate = isControlled ? tsToCalendarDate(value) : internalDate;

  const handleChange: AriaCalendarProps<CalendarDate>["onChange"] = (newDate) => {
    if (!isControlled) {
      setInternalDate(newDate);
    }
    onChange?.(calendarDateToTs(newDate));
  };

  return (
    <AriaCalendar
      value={activeDate}
      onChange={handleChange}
      className={cn("w-full", className)}
    >
      {({ state }) => {
        const month = state.visibleRange.start.month;
        const year = state.visibleRange.start.year;

        return (
          <div className="flex flex-col select-none">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">
                {new Date(year, month - 1).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </span>
              <div className="flex items-center gap-0.5">
                <Button
                  variant="ghost"
                  icon size="sm"
                  className="h-7 w-7 p-0 rounded-md"
                  slot="previous"
                  onPress={() => state.focusPreviousPage()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  icon size="sm"
                  className="h-7 w-7 p-0 rounded-md"
                  slot="next"
                  onPress={() => state.focusNextPage()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <CalendarGrid className="w-full">
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="text-center text-[10px] font-bold text-muted-foreground uppercase py-1">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className={({ isSelected, isToday, isOutsideMonth, isDisabled }) =>
                      cn(
                        "h-10 w-10 rounded-md flex items-center justify-center font-medium text-xs transition-colors cursor-pointer outline-none",
                        isOutsideMonth && "text-muted-foreground/40",
                        !isOutsideMonth && !isSelected && "hover:bg-accent hover:text-accent-foreground",
                        isToday && !isSelected && "border border-primary text-primary",
                        isSelected && "bg-primary text-primary-foreground font-semibold",
                        isDisabled && "opacity-40 cursor-not-allowed"
                      )
                    }
                  >
                    {({ formattedDate }) => {
                      const lunar = solarlunar.solar2lunar(date.year, date.month, date.day);
                      const lunarText = lunar.term || (lunar.dayCn === '初一' ? lunar.monthCn : lunar.dayCn);
                      return (
                        <div className="flex flex-col items-center justify-center leading-none mt-1">
                          <span>{formattedDate}</span>
                          <span className="text-[9px] scale-90 opacity-60 mt-[2px]">{lunarText}</span>
                        </div>
                      );
                    }}
                  </CalendarCell>
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </div>
        );
      }}
    </AriaCalendar>
  );
}

Calendar.displayName = "Calendar";

// ------------------------------------------------------------------
// RangeCalendar
// ------------------------------------------------------------------

export interface RangeCalendarProps {
  value?: string; // Format: "startTimestamp,endTimestamp"
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

// Parse "startTs,endTs" string to DateRange
const tsRangeToDateRange = (rangeStr?: string): DateRange | null => {
  if (!rangeStr) return null;
  const parts = rangeStr.split(",");
  if (parts.length < 2 || !parts[0] || !parts[1]) return null;
  return {
    start: tsToCalendarDate(parts[0]),
    end: tsToCalendarDate(parts[1])
  };
};

// Convert DateRange to "startTs,endTs" string
const dateRangeToTsRange = (range: DateRange): string => {
  if (!range) return "";
  return `${calendarDateToTs(toCalendarDate(range.start))},${calendarDateToTs(toCalendarDate(range.end))}`;
};

function RangeCalendar(props: RangeCalendarProps) {
  const { value, defaultValue, onChange, className } = props;
  const isControlled = "value" in props;

  const [internalRange, setInternalRange] = React.useState<DateRange | null>(() =>
    tsRangeToDateRange(defaultValue)
  );

  const activeRange = isControlled ? tsRangeToDateRange(value) : internalRange;

  const handleChange: (range: DateRange) => void = (newRange) => {
    if (!isControlled) {
      setInternalRange(newRange);
    }
    onChange?.(dateRangeToTsRange(newRange));
  };

  return (
    <AriaRangeCalendar
      value={activeRange}
      onChange={handleChange}
      className={cn("w-full", className)}
    >
      {({ state }) => {
        const month = state.visibleRange.start.month;
        const year = state.visibleRange.start.year;

        return (
          <div className="flex flex-col select-none">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">
                {new Date(year, month - 1).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </span>
              <div className="flex items-center gap-0.5">
                <Button
                  variant="ghost"
                  icon size="sm"
                  className="h-7 w-7 p-0 rounded-md"
                  slot="previous"
                  onPress={() => state.focusPreviousPage()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  icon size="sm"
                  className="h-7 w-7 p-0 rounded-md"
                  slot="next"
                  onPress={() => state.focusNextPage()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <CalendarGrid className="w-full">
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="text-center text-[10px] font-bold text-muted-foreground uppercase py-1">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className={({ isSelected, isToday, isOutsideMonth, isDisabled, isSelectionStart, isSelectionEnd }) =>
                      cn(
                        "h-10 w-10 flex items-center justify-center font-medium text-xs transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        isOutsideMonth && "text-muted-foreground/40",
                        !isOutsideMonth && !isSelected && "hover:bg-accent hover:text-accent-foreground",
                        isToday && !isSelected && "border border-primary text-primary rounded-md",
                        isSelected && "bg-primary/10",
                        isSelectionStart && "bg-primary text-primary-foreground rounded-l-md",
                        isSelectionEnd && "bg-primary text-primary-foreground rounded-r-md",
                        isSelectionStart && isSelectionEnd && "rounded-md",
                        isDisabled && "opacity-40 cursor-not-allowed"
                      )
                    }
                  >
                    {({ formattedDate }) => {
                      const lunar = solarlunar.solar2lunar(date.year, date.month, date.day);
                      const lunarText = lunar.term || (lunar.dayCn === '初一' ? lunar.monthCn : lunar.dayCn);
                      return (
                        <div className="flex flex-col items-center justify-center leading-none mt-1">
                          <span>{formattedDate}</span>
                          <span className="text-[9px] scale-90 opacity-60 mt-[2px]">{lunarText}</span>
                        </div>
                      );
                    }}
                  </CalendarCell>
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </div>
        );
      }}
    </AriaRangeCalendar>
  );
}

RangeCalendar.displayName = "RangeCalendar";

export { Calendar, RangeCalendar };
