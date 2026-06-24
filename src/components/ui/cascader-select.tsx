import * as React from "react";
import { ChevronRight, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { Select } from "./select";
import { useUIConfig } from "../../context/UIConfigContext";

export interface CascaderOption {
  value: string | number;
  label: string;
  children?: CascaderOption[] | null;
}

export interface CascaderSelectProps {
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  options: CascaderOption[];
  loadChildren?: (value: string | number) => Promise<CascaderOption[]>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  dropdownClassName?: string;
  variant?: "dropdown" | "picker" | "action-sheet" | "bottom-modal" | "center-modal";
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "xxl";
  label?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "end" | "center";
  maxLevel?: number;
  language?: string;
}

// ------------------------------------------------------------------
// CascaderSelectContent
// ------------------------------------------------------------------

interface CascaderSelectContentProps {
  value: string;
  close: () => void;
  onConfirm: (val: string) => void;
  options: CascaderOption[];
  loadChildren?: (value: string | number) => Promise<CascaderOption[]>;
  maxLevel?: number;
  language?: string;
  setLoadedOptions: React.Dispatch<React.SetStateAction<CascaderOption[]>>;
}

const findPath = (val: string | number, opts: CascaderOption[], currentPath: (string | number)[] = []): (string | number)[] | null => {
  for (const opt of opts) {
    if (String(opt.value) === String(val)) {
      return [...currentPath, opt.value];
    }
    if (opt.children && opt.children.length > 0) {
      const found = findPath(val, opt.children, [...currentPath, opt.value]);
      if (found) return found;
    }
  }
  return null;
};

function CascaderSelectContent({
  value,
  close,
  onConfirm,
  options,
  loadChildren,
  maxLevel,
  language,
  setLoadedOptions
}: CascaderSelectContentProps) {
  const isZh = language === "zh-CN" || language === "zh";
  const [tempPath, setTempPath] = React.useState<(string | number)[]>([]);
  const [fullPath, setFullPath] = React.useState<(string | number)[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const activeCol1Ref = React.useRef<HTMLButtonElement>(null);
  const activeCol2Ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (value) {
      const path = findPath(value, options);
      setFullPath(path || [value]);
      if (path && path.length > 0) {
        setTempPath([path[0]]);
      } else {
        setTempPath([value]);
      }
    } else {
      setFullPath([]);
      setTempPath([]);
    }
  }, [value, options]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (activeCol1Ref.current) {
        const el = activeCol1Ref.current;
        const container = el.parentElement;
        if (container) {
          container.scrollTop = el.offsetTop;
        }
      }
      if (activeCol2Ref.current) {
        const el = activeCol2Ref.current;
        const container = el.parentElement;
        if (container) {
          container.scrollTop = el.offsetTop;
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [tempPath, value]);

  const getChildrenByValue = (val: string | number) => {
    const path = findPath(val, options);
    if (!path) return [];

    let currentOptions = options;
    for (const id of path) {
      const option = currentOptions.find(o => String(o.value) === String(id));
      if (option) {
        currentOptions = option.children || [];
      } else {
        return [];
      }
    }
    return currentOptions;
  };

  const getWindowOptions = (windowIndex: 0 | 1) => {
    if (tempPath.length === 0) {
      return windowIndex === 0 ? options : [];
    }

    if (tempPath.length === 1) {
      if (windowIndex === 0) return options;
      return getChildrenByValue(tempPath[0]);
    }

    const targetVal = windowIndex === 0 ? tempPath[tempPath.length - 2] : tempPath[tempPath.length - 1];
    return getChildrenByValue(targetVal);
  };

  const handleSelect = async (option: CascaderOption, level: number) => {
    const newPath = tempPath.slice(0, level);
    newPath.push(option.value);
    setTempPath(newPath);

    const isMaxLevel = maxLevel !== undefined && level === maxLevel - 1;

    if (isMaxLevel) {
      onConfirm(String(option.value));
      close();
      return;
    }

    if (option.children === null && loadChildren) {
      setIsLoading(true);
      try {
        const children = await loadChildren(option.value);
        setLoadedOptions(prev => {
          const updateChildren = (opts: CascaderOption[]): CascaderOption[] => {
            return opts.map(o => {
              if (String(o.value) === String(option.value)) {
                return { ...o, children };
              }
              if (o.children) {
                return { ...o, children: updateChildren(o.children) };
              }
              return o;
            });
          };
          return updateChildren(prev);
        });
        if (children.length === 0) {
          onConfirm(String(option.value));
          close();
        }
      } catch (error) {
        console.error("Failed to load children:", error);
      } finally {
        setIsLoading(false);
      }
    } else if (!option.children || option.children.length === 0) {
      onConfirm(String(option.value));
      close();
    }
  };

  const column1Level = Math.max(0, tempPath.length - 1);
  const column2Level = tempPath.length;

  return (
    <div className={cn("flex flex-col max-h-60", tempPath.length > 0 ? "w-full min-w-[320px]" : "w-auto min-w-[160px]")} onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-1 overflow-hidden">
        {/* Column 1 */}
        <div className={cn("relative border-r overflow-y-auto", tempPath.length > 0 ? "w-1/2 border-border" : "w-full border-transparent")}>
          {getWindowOptions(0).map((option) => {
            const isSelected = String(tempPath[tempPath.length - 1]) === String(option.value);
            return (
              <button
                key={option.value}
                ref={isSelected ? activeCol1Ref : undefined}
                type="button"
                onClick={() => handleSelect(option, column1Level)}
                className={cn(
                  "w-full px-3 py-2 text-left text-sm hover:bg-accent flex items-center justify-between transition-colors",
                  isSelected ? "bg-primary/10 text-primary font-medium" : "text-foreground"
                )}
              >
                <span className="truncate mr-2">{option.label}</span>
                {((option.children && option.children.length > 0) || (option.children === null && loadChildren)) && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Column 2 */}
        {tempPath.length > 0 && (
          <div className="relative w-1/2 overflow-y-auto">
            {isLoading ? (
              <div className="px-4 py-2 text-sm text-muted-foreground italic">{isZh ? "加载中..." : "Loading..."}</div>
            ) : (
              getWindowOptions(1).map((option) => {
                const isSelected = fullPath.map(String).includes(String(option.value));
                return (
                  <button
                    key={option.value}
                    ref={isSelected ? activeCol2Ref : undefined}
                    type="button"
                    onClick={() => handleSelect(option, column2Level)}
                    className={cn(
                      "w-full px-3 py-2 text-left text-sm hover:bg-accent flex items-center justify-between transition-colors",
                      isSelected ? "bg-primary/10 text-primary font-medium" : "text-foreground"
                    )}
                  >
                    <span className="truncate mr-2">{option.label}</span>
                    {String(value) === String(option.value) && <Check className="h-4 w-4 text-primary flex-shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// CascaderSelect
// ------------------------------------------------------------------

function CascaderSelect(props: CascaderSelectProps) {
  const {
    value: controlledValue,
    defaultValue,
    onChange,
    options: initialOptions = [],
    loadChildren,
    placeholder = "Select...",
    disabled = false,
    className,
    triggerClassName,
    dropdownClassName,
    variant,
    size,
    label,
    open,
    onOpenChange,
    align,
    maxLevel,
    language
  } = props;

  const uiConfig = useUIConfig();
  const platform = uiConfig ? uiConfig.platform : "desktop";
  const activeVariant = variant || (platform === "mobile" ? "picker" : "dropdown");
  const isActionSheet = activeVariant === "action-sheet";

  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue !== undefined ? String(defaultValue) : undefined);
  const isValueControlled = "value" in props;
  const activeValue = isValueControlled ? (controlledValue !== undefined ? String(controlledValue) : undefined) : internalValue;

  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpenControlled = "open" in props;
  const activeOpen = isOpenControlled ? open : internalOpen;

  const [loadedOptions, setLoadedOptions] = React.useState<CascaderOption[]>(initialOptions);

  React.useEffect(() => {
    setLoadedOptions(initialOptions);
  }, [initialOptions]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpenControlled) {
      setInternalOpen(isOpen);
    }
    onOpenChange?.(isOpen);
  };

  const handleConfirm = (val?: string) => {
    const finalVal = val !== undefined ? val : (activeValue || "");
    if (!isValueControlled) {
      setInternalValue(finalVal);
    }
    onChange?.(finalVal);
  };

  const confirmRef = React.useRef<(() => void) | undefined>(undefined);

  const getSelectedLabel = () => {
    if (!activeValue) return "";

    const path = findPath(activeValue, loadedOptions);
    if (path) {
      const labels: string[] = [];
      let currentOptions = loadedOptions;
      for (const val of path) {
        const option = currentOptions.find(o => String(o.value) === String(val));
        if (option) {
          labels.push(option.label);
          currentOptions = option.children || [];
        } else {
          break;
        }
      }
      return labels.join(" / ");
    }

    return String(activeValue);
  };

  const selectOptions = React.useMemo(() => {
    if (!activeValue) return undefined;
    return [{
      value: activeValue,
      label: getSelectedLabel()
    }];
  }, [activeValue, loadedOptions]);

  return (
    <Select
      value={activeValue}
      onChange={(val) => handleConfirm(val)}
      options={selectOptions}
      confirmRef={confirmRef}
      placeholder={placeholder}
      disabled={disabled}
      className={cn("w-auto h-auto max-h-none", dropdownClassName, className)}
      triggerClassName={triggerClassName}
      variant={variant}
      size={size}
      label={label}
      open={activeOpen}
      onOpenChange={handleOpenChange}
      showConfirm={isActionSheet}
      align={align}
      renderContent={({ value: currentVal, close }) => (
        <CascaderSelectContent
          value={currentVal || ""}
          close={close}
          onConfirm={(val) => handleConfirm(val)}
          options={loadedOptions}
          loadChildren={loadChildren}
          maxLevel={maxLevel}
          language={language}
          setLoadedOptions={setLoadedOptions}
        />
      )}
      onOk={(val) => {
        handleConfirm(val);
      }}
    />
  );
}

CascaderSelect.displayName = "CascaderSelect";

export { CascaderSelect };
