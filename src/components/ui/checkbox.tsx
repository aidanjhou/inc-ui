import * as React from "react"
import {
  CheckboxField as AriaCheckboxField,
  CheckboxButton as AriaCheckboxButton,
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxFieldProps as AriaCheckboxFieldProps,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  Label
} from "react-aria-components"
import { Check, Minus } from "lucide-react"
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

export interface CheckboxProps extends AriaCheckboxFieldProps {
  description?: React.ReactNode;
  size?: CheckboxSize;
  children?: React.ReactNode | ((values: any) => React.ReactNode);
}

const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  ({ className, children, description, size = "default", ...props }, ref) => {
    const config = checkboxSizeConfig[size] || checkboxSizeConfig.default;

    return (
      <AriaCheckboxField
        ref={ref}
        className={cn(
          "group flex flex-col gap-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 transition-opacity",
          className
        )}
        {...props}
      >
        <AriaCheckboxButton className={cn(
          "inline-flex items-center justify-start whitespace-nowrap text-foreground focus:outline-none transition-colors w-fit", 
          config.button
        )}>
          {(values) => (
            <>
              <div className={cn("shrink-0 items-center justify-center rounded-sm border border-primary ring-offset-background transition-colors group-data-[selected]:bg-primary group-data-[selected]:text-primary-foreground group-data-[focus-visible]:outline-none group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-ring group-data-[focus-visible]:ring-offset-2 group-data-[indeterminate]:bg-primary group-data-[indeterminate]:text-primary-foreground flex", config.box)}>
                {values.isIndeterminate ? (
                  <Minus className={config.icon} />
                ) : values.isSelected ? (
                  <Check className={config.icon} />
                ) : null}
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
