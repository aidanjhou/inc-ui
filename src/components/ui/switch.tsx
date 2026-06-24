import * as React from "react"
import {
  SwitchField as AriaSwitchField,
  SwitchButton as AriaSwitchButton,
  type SwitchFieldProps as AriaSwitchFieldProps,
} from "react-aria-components"
import { cn } from "../../lib/utils"

const switchSizeConfig = {
  xs: { button: "h-5 min-w-5 rounded-sm px-1 text-xs font-normal gap-1", track: "h-[14px] w-[26px]", thumb: "h-[10px] w-[10px] group-data-[selected]:translate-x-3", desc: "text-[10px] ml-[34px]" },
  sm: { button: "h-6 min-w-6 rounded px-1.5 text-xs font-normal gap-1", track: "h-4 w-8", thumb: "h-3 w-3 group-data-[selected]:translate-x-4", desc: "text-xs ml-[42px]" },
  default: { button: "h-7 min-w-7 rounded px-2 text-xs font-medium gap-2", track: "h-5 w-9", thumb: "h-4 w-4 group-data-[selected]:translate-x-4", desc: "text-xs ml-[52px]" },
  lg: { button: "h-8 min-w-8 rounded-md px-3 text-sm font-medium gap-2", track: "h-6 w-11", thumb: "h-5 w-5 group-data-[selected]:translate-x-5", desc: "text-sm ml-16" },
  xl: { button: "h-9 min-w-9 rounded-md px-4 text-sm font-semibold gap-3", track: "h-7 w-14", thumb: "h-6 w-6 group-data-[selected]:translate-x-7", desc: "text-base ml-[84px]" },
  xxl: { button: "h-10 min-w-10 rounded-md px-5 text-base font-semibold gap-3", track: "h-8 w-16", thumb: "h-7 w-7 group-data-[selected]:translate-x-8", desc: "text-lg ml-24" },
};

export type SwitchSize = keyof typeof switchSizeConfig;

export interface SwitchProps extends AriaSwitchFieldProps {
  description?: React.ReactNode;
  size?: SwitchSize;
  children?: React.ReactNode | ((values: any) => React.ReactNode);
}

const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(
  ({ className, children, description, size = "default", ...props }, ref) => {
    const config = switchSizeConfig[size] || switchSizeConfig.default;

    return (
      <AriaSwitchField
        ref={ref}
        className={cn(
          "group flex flex-col gap-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 transition-opacity",
          className
        )}
        {...props}
      >
        <AriaSwitchButton className={cn(
          "inline-flex items-center justify-start whitespace-nowrap text-foreground focus:outline-none transition-colors w-fit", 
          config.button
        )}>
          {(values) => (
            <>
              <div className={cn("shrink-0 cursor-pointer inline-flex items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background group-data-[selected]:bg-primary bg-input", config.track)}>
                <div className={cn("pointer-events-none rounded-full bg-background shadow-sm ring-0 transition-transform", config.thumb)} />
              </div>
              {typeof children === "function" ? children(values) : children}
            </>
          )}
        </AriaSwitchButton>
        {description && <p className={cn("text-muted-foreground", config.desc)}>{description}</p>}
      </AriaSwitchField>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
