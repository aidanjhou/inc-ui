// Import CSS styling
import "./index.css";

// Export utility helpers
export { cn } from "./lib/utils";

// Export Button components
export { Button, buttonVariants } from "./components/ui/button";
export type { ButtonProps } from "./components/ui/button";

// Export Card components
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
} from "./components/ui/card";

// Export Dialog (Modal) components
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
} from "./components/ui/dialog";

// Export Input components
export { Input } from "./components/ui/input";

// Export Dropdown Menu components
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup
} from "./components/ui/dropdown-menu";

export { MessagePrompter, Message } from "./components/ui/message";
export type { MessagePrompterProps, MessageProps, MessageVariant } from "./components/ui/message";
export { message } from "./hooks/message";
export type { MessageOptions } from "./hooks/message";

export { Loading } from "./components/ui/loading";
export type { LoadingProps, LoadingVariant } from "./components/ui/loading";

// Export UIConfig Context & Provider
export { UIConfigContext, UIConfigProvider, useUIConfig } from "./context/UIConfigContext";
export type { UIConfigContextType, UIConfigProviderProps } from "./context/UIConfigContext";

// Export Select component
export { Select } from "./components/ui/select";
export type { SelectProps, SelectOption } from "./components/ui/select";

// Export DatetimeSelect component
export { DatetimeSelect } from "./components/ui/datetime-select";
export type { DatetimeSelectProps } from "./components/ui/datetime-select";

// Export Calendar component
export { Calendar } from "./components/ui/calendar";
export type { CalendarProps } from "./components/ui/calendar";

// Export CalendarSelect component
export { CalendarSelect } from "./components/ui/calendar-select";
export type { CalendarSelectProps } from "./components/ui/calendar-select";

// Export RangeCalendar component
export { RangeCalendar, formatDateRange } from "./components/ui/calendar";
export type { RangeCalendarProps } from "./components/ui/calendar";

// Export RangeCalendarSelect component
export { RangeCalendarSelect } from "./components/ui/calendar-range-select";
export type { RangeCalendarSelectProps } from "./components/ui/calendar-range-select";

// Export Chart component
export { Chart } from "./components/ui/chart";
export type { ChartProps, ChartType, ApexOptions } from "./components/ui/chart";

// Export Grid component
export { Grid } from "./components/ui/grid";
export type { GridProps } from "./components/ui/grid";

// Export Switch component
export { Switch } from "./components/ui/switch";
export type { SwitchProps } from "./components/ui/switch";

// Export Region/Country data & components
export {
  countries,
  regions,
  getRegions,
  getCountriesByRegion,
  getCountryByCode,
  getCountryByAlpha3,
} from "./data/regions";
export type { Country, Region } from "./data/regions";

export {
  RegionSelect,
  RegionDisplay,
  RegionBadge,
  countryCodeToFlag,
} from "./components/ui/region-select";
export type { RegionSelectProps, RegionDisplayProps, RegionBadgeProps } from "./components/ui/region-select";

// Export CascaderSelect component
export { CascaderSelect } from "./components/ui/cascader-select";
export type { CascaderSelectProps, CascaderOption } from "./components/ui/cascader-select";

// Export Checkbox components
export { Checkbox, CheckboxGroup } from "./components/ui/checkbox";
export type { CheckboxProps } from "./components/ui/checkbox";

// Export Tree components
export { Tree } from "./components/ui/tree";
export type { TreeProps, TreeNode } from "./components/ui/tree";

// Export Radio components
export { Radio, RadioGroup } from "./components/ui/radio";
export type { RadioProps } from "./components/ui/radio";
