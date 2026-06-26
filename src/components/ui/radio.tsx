import * as React from "react"
import {
  RadioField as AriaRadioField,
  RadioButton as AriaRadioButton,
  RadioGroup as AriaRadioGroup,
  type RadioFieldProps as AriaRadioFieldProps,
  type RadioGroupProps as AriaRadioGroupProps,
  Label,
  RadioGroupStateContext
} from "react-aria-components"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

const RadioGroup = React.forwardRef<HTMLDivElement, AriaRadioGroupProps & { label?: string; orientation?: "vertical" | "horizontal" }>(
  ({ className, label, orientation = "vertical", children, ...props }, ref) => (
    <AriaRadioGroup
      ref={ref}
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-col gap-2" : "flex-row gap-4",
        className
      )}
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
    </AriaRadioGroup>
  )
)
RadioGroup.displayName = "RadioGroup"

const radioSizeConfig = {
  xs: { button: "h-5 min-w-5 rounded-sm px-1 text-xs font-normal gap-1", box: "h-3 w-3", icon: "h-1.5 w-1.5", desc: "text-[10px] ml-5" },
  sm: { button: "h-6 min-w-6 rounded px-1.5 text-xs font-normal gap-1", box: "h-3.5 w-3.5", icon: "h-2 w-2", desc: "text-xs ml-6" },
  default: { button: "h-7 min-w-7 rounded px-2 text-xs font-medium gap-2", box: "h-4 w-4", icon: "h-2.5 w-2.5", desc: "text-xs ml-8" },
  lg: { button: "h-8 min-w-8 rounded-md px-3 text-sm font-medium gap-2", box: "h-[18px] w-[18px]", icon: "h-2.5 w-2.5", desc: "text-sm ml-[38px]" },
  xl: { button: "h-9 min-w-9 rounded-md px-4 text-sm font-semibold gap-3", box: "h-5 w-5", icon: "h-3 w-3", desc: "text-base ml-12" },
  xxl: { button: "h-10 min-w-10 rounded-md px-5 text-base font-semibold gap-3", box: "h-6 w-6", icon: "h-3.5 w-3.5", desc: "text-lg ml-14" },
};

export type RadioSize = keyof typeof radioSizeConfig;

export type RadioValue = "" | "0" | "1";

export interface RadioProps extends Omit<AriaRadioFieldProps, 'value' | 'onChange'> {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  allowInverse?: boolean;
  pure?: boolean;
  description?: React.ReactNode;
  size?: RadioSize;
  children?: React.ReactNode | ((values: any) => React.ReactNode);
}

const getNextValue = (current: RadioValue, allowInverse: boolean): RadioValue => {
  if (allowInverse) {
    switch (current) {
      case "": return "1";
      case "1": return "0";
      case "0": return "";
      default: return "1";
    }
  } else {
    switch (current) {
      case "": return "1";
      case "1": return "";
      default: return "1";
    }
  }
};

const Radio = React.forwardRef<HTMLDivElement, RadioProps>(
  ({ className, children, description, size = "default", value, defaultValue, onChange, allowInverse = false, pure = false, ...props }, ref) => {
    const config = radioSizeConfig[size] || radioSizeConfig.default;
    const groupState = React.useContext(RadioGroupStateContext);

    // Check if we are in multi-state mode (either allowInverse is true, or value/defaultValue matches RadioValue)
    const isMultiState = React.useMemo(() => {
      const isValueMulti = (val: any) => val === "" || val === "0" || val === "1";
      return allowInverse || isValueMulti(value) || isValueMulti(defaultValue);
    }, [allowInverse, value, defaultValue]);

    // Uncontrolled state for multi-state mode
    const [uncontrolledValue, setUncontrolledValue] = React.useState<RadioValue>(() => {
      const initial = defaultValue !== undefined ? defaultValue : "";
      return (initial === "" || initial === "0" || initial === "1") ? initial : "";
    });

    const currentValue = React.useMemo<RadioValue>(() => {
      if (!isMultiState) return "";
      if (groupState) {
        if (groupState.selectedValue === value) return "1";
        if (groupState.selectedValue === "0" || groupState.selectedValue === `${value}-inverse`) return "0";
        return "";
      }
      const val = value !== undefined ? value : uncontrolledValue;
      return (val === "" || val === "0" || val === "1") ? val : "";
    }, [isMultiState, value, uncontrolledValue, groupState?.selectedValue]);

    const handleToggle = React.useCallback((e: React.PointerEvent | React.MouseEvent) => {
      if (!isMultiState) return;
      if ('button' in e && e.button !== 0) return;

      e.preventDefault();
      e.stopPropagation();
      
      // Manually focus the radio button for keyboard accessibility
      const buttonEl = (e.currentTarget as HTMLElement).querySelector('[role="radio"]');
      if (buttonEl instanceof HTMLElement) {
        buttonEl.focus();
      }

      const nextValue = getNextValue(currentValue, allowInverse);

      if (groupState) {
        if (nextValue === "1") {
          groupState.setSelectedValue(value);
        } else if (nextValue === "0") {
          if (value === "1") {
            groupState.setSelectedValue("0");
          } else {
            groupState.setSelectedValue(`${value}-inverse`);
          }
        } else {
          groupState.setSelectedValue("");
        }
      } else {
        if (value === undefined) {
          setUncontrolledValue(nextValue);
        }
        onChange?.(nextValue);
      }
    }, [isMultiState, currentValue, allowInverse, value, groupState, onChange]);

    const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
      if (!isMultiState) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();

        const nextValue = getNextValue(currentValue, allowInverse);

        if (groupState) {
          if (nextValue === "1") {
            groupState.setSelectedValue(value);
          } else if (nextValue === "0") {
            if (value === "1") {
              groupState.setSelectedValue("0");
            } else {
              groupState.setSelectedValue(`${value}-inverse`);
            }
          } else {
            groupState.setSelectedValue("");
          }
        } else {
          if (value === undefined) {
            setUncontrolledValue(nextValue);
          }
          onChange?.(nextValue);
        }
      }
    }, [isMultiState, currentValue, allowInverse, value, groupState, onChange]);

    // ARIA properties mapped from multi-state values
    const ariaProps = React.useMemo(() => {
      if (!isMultiState) return {};
      return {
        isSelected: currentValue === "1"
      };
    }, [isMultiState, currentValue]);

    const resolvedProps = isMultiState 
      ? { ...props, ...ariaProps, value }
      : { ...props, value, defaultValue, onChange };

    return (
      <AriaRadioField
        ref={ref}
        className={cn(
          "group flex flex-col gap-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 transition-opacity",
          pure ? "w-fit h-fit" : "",
          className
        )}
        {...resolvedProps}
      >
        <div
          onPointerDownCapture={isMultiState ? handleToggle : undefined}
          onKeyDownCapture={isMultiState ? handleKeyDown : undefined}
          className="w-fit h-fit"
        >
          <AriaRadioButton 
            className={cn(
              "inline-flex items-center justify-start whitespace-nowrap text-foreground focus:outline-none transition-colors w-fit", 
              pure ? "h-fit p-0 min-w-0" : config.button
            )}
          >
            {(values) => (
              <>
                <div className={cn(
                  "shrink-0 items-center justify-center rounded-full border border-primary text-primary ring-offset-background transition-colors flex",
                  config.box,
                  "group-data-[focus-visible]:outline-none group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-ring group-data-[focus-visible]:ring-offset-2"
                )}>
                  {isMultiState ? (
                    currentValue === "1" ? (
                      <div className={cn("rounded-full bg-primary", config.icon)} />
                    ) : currentValue === "0" ? (
                      <X className={config.icon} />
                    ) : null
                  ) : (
                    values.isSelected && (
                      <div className={cn("rounded-full bg-primary", config.icon)} />
                    )
                  )}
                </div>
                {typeof children === "function" ? children(values) : children}
              </>
            )}
          </AriaRadioButton>
        </div>
        {description && <p className={cn("text-muted-foreground", config.desc)}>{description}</p>}
      </AriaRadioField>
    )
  }
)
Radio.displayName = "Radio"

export { Radio, RadioGroup }
