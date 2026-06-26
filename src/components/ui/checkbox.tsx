import * as React from "react"
import {
  CheckboxField as AriaCheckboxField,
  CheckboxButton as AriaCheckboxButton,
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxFieldProps as AriaCheckboxFieldProps,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  Label
} from "react-aria-components"
import { Check, Minus, X } from "lucide-react"
import { cn } from "../../lib/utils"

const CheckboxGroup = React.forwardRef<HTMLDivElement, AriaCheckboxGroupProps & { label?: string }>(
  ({ className, label, children, ...props }, ref) => (
    <AriaCheckboxGroup
      ref={ref}
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {typeof children === "function" ? (
        (values) => (
          <>
            {label && <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</Label>}
            {children(values)}
          </>
        )
      ) : (
        <>
          {label && <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</Label>}
          {children}
        </>
      )}
    </AriaCheckboxGroup>
  )
)
CheckboxGroup.displayName = "CheckboxGroup"

const checkboxSizeConfig = {
  xs: { button: "h-5 min-w-5 rounded-sm px-1 text-xs font-normal gap-1", box: "h-3 w-3", icon: "h-2 w-2", desc: "text-[10px] ml-5" },
  sm: { button: "h-6 min-w-6 rounded px-1.5 text-xs font-normal gap-1", box: "h-3.5 w-3.5", icon: "h-2.5 w-2.5", desc: "text-xs ml-6" },
  default: { button: "h-7 min-w-7 rounded px-2 text-xs font-medium gap-2", box: "h-4 w-4", icon: "h-3 w-3", desc: "text-xs ml-8" },
  lg: { button: "h-8 min-w-8 rounded-md px-3 text-sm font-medium gap-2", box: "h-[18px] w-[18px]", icon: "h-3.5 w-3.5", desc: "text-sm ml-[38px]" },
  xl: { button: "h-9 min-w-9 rounded-md px-4 text-sm font-semibold gap-3", box: "h-5 w-5", icon: "h-4 w-4", desc: "text-base ml-12" },
  xxl: { button: "h-10 min-w-10 rounded-md px-5 text-base font-semibold gap-3", box: "h-6 w-6", icon: "h-5 w-5", desc: "text-lg ml-14" },
};

export type CheckboxSize = keyof typeof checkboxSizeConfig;

export type CheckboxValue = "" | "0" | "0.5" | "1";

export interface CheckboxProps extends Omit<AriaCheckboxFieldProps, 'onChange'> {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  allowInverse?: boolean;
  allowPartial?: boolean;
  pure?: boolean;
  description?: React.ReactNode;
  size?: CheckboxSize;
  children?: React.ReactNode | ((values: any) => React.ReactNode);
}

const getNextValue = (
  current: CheckboxValue,
  allowInverse: boolean,
  allowPartial: boolean
): CheckboxValue => {
  if (allowInverse && allowPartial) {
    switch (current) {
      case "": return "1";
      case "1": return "0.5";
      case "0.5": return "0";
      case "0": return "";
      default: return "1";
    }
  } else if (allowInverse && !allowPartial) {
    switch (current) {
      case "": return "1";
      case "1": return "0";
      case "0": return "";
      default: return "1";
    }
  } else if (!allowInverse && allowPartial) {
    switch (current) {
      case "": return "1";
      case "1": return "0.5";
      case "0.5": return "";
      default: return "1";
    }
  } else {
    // Both false: standard "" and "1"
    switch (current) {
      case "": return "1";
      case "1": return "";
      default: return "1";
    }
  }
};

const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  ({ className, children, description, size = "default", value, defaultValue, onChange, allowInverse = false, allowPartial = false, pure = false, ...props }, ref) => {
    const config = checkboxSizeConfig[size] || checkboxSizeConfig.default;

    // Check if we are in multi-state mode (either allowInverse/allowPartial is true, or value/defaultValue matches CheckboxValue)
    const isMultiState = React.useMemo(() => {
      const isValueMulti = (val: any) => val === "" || val === "0" || val === "0.5" || val === "1";
      return allowInverse || allowPartial || isValueMulti(value) || isValueMulti(defaultValue);
    }, [allowInverse, allowPartial, value, defaultValue]);

    // Uncontrolled state for multi-state mode
    const [uncontrolledValue, setUncontrolledValue] = React.useState<CheckboxValue>(() => {
      const initial = defaultValue !== undefined ? defaultValue : "";
      return (initial === "" || initial === "0" || initial === "0.5" || initial === "1") ? initial : "";
    });

    const currentValue = React.useMemo<CheckboxValue>(() => {
      if (!isMultiState) return "";
      const val = value !== undefined ? value : uncontrolledValue;
      return (val === "" || val === "0" || val === "0.5" || val === "1") ? val : "";
    }, [isMultiState, value, uncontrolledValue]);

    const handleAriaChange = React.useCallback(() => {
      if (!isMultiState) return;
      const nextValue = getNextValue(currentValue, allowInverse, allowPartial);
      if (value === undefined) {
        setUncontrolledValue(nextValue);
      }
      onChange?.(nextValue);
    }, [isMultiState, currentValue, allowInverse, allowPartial, value, onChange]);

    // ARIA properties mapped from multi-state values
    const ariaProps = React.useMemo(() => {
      if (!isMultiState) return {};
      return {
        isSelected: currentValue === "1",
        isIndeterminate: currentValue === "0.5",
        onChange: handleAriaChange
      };
    }, [isMultiState, currentValue, handleAriaChange]);

    const resolvedProps = isMultiState 
      ? { ...props, ...ariaProps }
      : { ...props, value, defaultValue, onChange };

    return (
      <AriaCheckboxField
        ref={ref}
        className={cn(
          "group flex flex-col gap-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 transition-opacity",
          pure ? "w-fit h-fit" : "",
          className
        )}
        {...resolvedProps}
      >
        <AriaCheckboxButton className={cn(
          "inline-flex items-center justify-start whitespace-nowrap text-foreground focus:outline-none transition-colors w-fit", 
          pure ? "h-fit p-0 min-w-0" : config.button
        )}>
          {(values) => (
            <>
              <div className={cn(
                "shrink-0 items-center justify-center rounded-sm border ring-offset-background transition-colors flex",
                config.box,
                // Custom styling based on our multi-state value
                isMultiState 
                  ? (
                    currentValue === "" 
                      ? "border-primary bg-transparent"
                      : "border-primary bg-primary text-primary-foreground"
                  )
                  : "border-primary group-data-[selected]:bg-primary group-data-[selected]:text-primary-foreground group-data-[indeterminate]:bg-primary group-data-[indeterminate]:text-primary-foreground",
                "group-data-[focus-visible]:outline-none group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-ring group-data-[focus-visible]:ring-offset-2"
              )}>
                {isMultiState ? (
                  currentValue === "0.5" ? (
                    <Minus className={config.icon} />
                  ) : currentValue === "1" ? (
                    <Check className={config.icon} />
                  ) : currentValue === "0" ? (
                    <X className={config.icon} />
                  ) : null
                ) : (
                  values.isIndeterminate ? (
                    <Minus className={config.icon} />
                  ) : values.isSelected ? (
                    <Check className={config.icon} />
                  ) : null
                )}
              </div>
              {typeof children === "function" ? children(values) : children}
            </>
          )}
        </AriaCheckboxButton>
        {description && <p className={cn("text-muted-foreground", config.desc)}>{description}</p>}
      </AriaCheckboxField>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox, CheckboxGroup }
