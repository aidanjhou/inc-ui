/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/preserve-manual-memoization */

import * as React from "react";
import { Check, ChevronDown, X, ChevronUp, Search } from "lucide-react";
import { cn } from "../../lib/utils";
import { useUIConfig } from "../../context/UIConfigContext";
import {
  Popover as AriaPopover,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  Dialog as AriaDialog,
  Heading as AriaHeading
} from "react-aria-components";
import { Button } from "./button";

const SelectContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

const DialogPrimitive = {
  Title: React.forwardRef<HTMLHeadingElement, any>(({ className, ...props }, ref) => (
    <AriaHeading
      slot="title"
      ref={ref}
      className={className}
      {...props}
    />
  )),
  CloseTrigger: React.forwardRef<HTMLButtonElement, any>(({ children, asChild, onClick, ...props }, ref) => {
    const ctx = React.useContext(SelectContext);
    const handleClose = (e: any) => {
      onClick?.(e);
      ctx?.setOpen(false);
    };

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<any>;
      return React.cloneElement(child, {
        onClick: (e: any) => {
          child.props.onClick?.(e);
          handleClose(e);
        }
      });
    }

    return (
      <button
        ref={ref}
        onClick={handleClose}
        {...props}
      >
        {children}
      </button>
    );
  })
};

export type SelectOption = any

export interface SelectTranslations {
  cancel: string
  done: string
  placeholder: string
  noData: string
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, option: SelectOption) => void;
  options?: SelectOption[];
  optionLabelKey?: string;
  optionValueKey?: string;
  placeholder?: string;
  variant?: "dropdown" | "picker" | "action-sheet" | "bottom-modal" | "center-modal";
  label?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  showSearch?: "always" | "auto" | "none";
  translations?: Record<string, Partial<SelectTranslations>>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  renderContent?: (context: {
    value?: string;
    onChange: (value: string, option?: SelectOption) => void;
    close: () => void;
    onOk?: () => void;
  }) => React.ReactNode;
  showConfirm?: boolean;
  onOk?: (value: string) => void;
  confirmRef?: React.RefObject<(() => void) | undefined>;
  align?: "start" | "end" | "center";
}

const defaultTranslations: Record<string, SelectTranslations> = {
  en: {
    cancel: "Cancel",
    done: "Done",
    placeholder: "Select...",
    noData: "No data"
  },
  zh: {
    cancel: "取消",
    done: "确定",
    placeholder: "请选择...",
    noData: "暂无数据"
  },
  "zh-tw": {
    cancel: "取消",
    done: "確定",
    placeholder: "請選擇...",
    noData: "暫無數據"
  }
};

const getTranslations = (lang: string, dict: Record<string, SelectTranslations>) => {
  const normalized = lang.toLowerCase();
  if (normalized === "zh-tw" || normalized === "zh-hk" || normalized.startsWith("zh-hant")) {
    return dict["zh-tw"] || dict["en"];
  }
  if (normalized.startsWith("zh")) {
    return dict["zh"] || dict["en"];
  }
  return dict[normalized] || dict[normalized.split("-")[0]] || dict["en"];
};

export function Select(props: SelectProps) {
  const {
    value: controlledValue,
    defaultValue,
    onChange,
    options,
    optionLabelKey = "label",
    optionValueKey = "value",
    placeholder,
    variant,
    label,
    disabled = false,
    className,
    triggerClassName,
    showSearch = "auto",
    translations: customTranslations,
    open: controlledOpen,
    onOpenChange,
    renderContent,
    showConfirm,
    onOk,
    confirmRef,
    align
  } = props;

  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpenControlled = "open" in props;
  const open = isOpenControlled ? controlledOpen : internalOpen;

  const [internalValue, setInternalValue] = React.useState<string | undefined>(() => {
    return ("defaultValue" in props) ? defaultValue : undefined;
  });
  const isValueControlled = "value" in props;
  const value = isValueControlled ? controlledValue : internalValue;

  const handleSelect = (optionOrValue: SelectOption | string, option?: SelectOption) => {
    let stringValue: string;
    let selectedOpt: SelectOption;
    if (typeof optionOrValue === "object" && optionOrValue !== null) {
      stringValue = String(optionOrValue[optionValueKey]);
      selectedOpt = optionOrValue;
    } else {
      stringValue = String(optionOrValue);
      selectedOpt = option || { [optionValueKey]: stringValue, [optionLabelKey]: stringValue };
    }
    if (!isValueControlled) {
      setInternalValue(stringValue);
    }
    onChange?.(stringValue, selectedOpt);
  };

  const handleConfirmClick = () => {
    if (confirmRef?.current) {
      confirmRef.current();
    } else {
      onOk?.(value || "");
      handleOpenChange(false);
    }
  };

  const mergedTranslations = React.useMemo(() => {
    const merged = { ...defaultTranslations };
    if (customTranslations) {
      for (const [lang, custom] of Object.entries(customTranslations)) {
        merged[lang] = {
          ...defaultTranslations.en,
          ...defaultTranslations[lang],
          ...custom
        } as SelectTranslations;
      }
    }
    return merged;
  }, [customTranslations]);

  const uiConfig = useUIConfig();
  const activeLanguage = uiConfig ? uiConfig.language : "en-US";
  const t = getTranslations(activeLanguage, mergedTranslations);
  const resolvedPlaceholder = placeholder || t.placeholder;

  const platform = uiConfig ? uiConfig.platform : "desktop";
  const activeVariant = variant || (platform === "mobile" ? "picker" : "dropdown");

  const selectedOption = React.useMemo(
    () => options?.find((o) => String(o[optionValueKey]) === value),
    [options, value, optionValueKey]
  );

  const shouldShowSearch = !renderContent && (showSearch === "always" || (showSearch === "auto" && options && options.length > 30));

  const [searchQuery, setSearchQuery] = React.useState("");
  const [matchIndex, setMatchIndex] = React.useState(0);
  const handleOpenChange = React.useCallback((isOpen: boolean) => {
    if (!isOpenControlled) {
      setInternalOpen(isOpen);
    }
    onOpenChange?.(isOpen);
    if (!isOpen) {
      setSearchQuery("");
      setMatchIndex(0);
    }
  }, [isOpenControlled, onOpenChange]);
  const contextValue = React.useMemo(() => ({
    open: open || false,
    setOpen: handleOpenChange
  }), [open, handleOpenChange]);

  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const searchInputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (open && shouldShowSearch && platform === "desktop") {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open, shouldShowSearch, platform]);

  const matches = React.useMemo(() => {
    if (!searchQuery || !options) return [];
    const query = searchQuery.toLowerCase();
    return options.filter((option) =>
      String(option[optionLabelKey]).toLowerCase().includes(query)
    );
  }, [options, searchQuery, optionLabelKey]);

  const scrollToMatchIndex = React.useCallback((index: number, currentMatches: SelectOption[]) => {
    if (currentMatches.length === 0) return;
    const matchedOption = currentMatches[index];
    if (!matchedOption) return;
    const val = String(matchedOption[optionValueKey]);
    const container = scrollContainerRef.current;
    if (container) {
      const element = container.querySelector(`[data-value="${CSS.escape(val)}"]`) as HTMLElement | null;
      if (element) {
        let parent = element.parentElement;
        while (parent && parent !== document.body) {
          const style = window.getComputedStyle(parent);
          if (style.overflowY === "auto" || style.overflowY === "scroll") {
            const paddingTop = style.paddingTop;
            if (paddingTop) {
              element.style.scrollMarginTop = paddingTop;
            }
            break;
          }
          parent = parent.parentElement;
        }
        
        // Use scrollIntoView but prevent page jump (mimicking Radix/Shadcn scroll prevention)
        const x = window.scrollX;
        const y = window.scrollY;
        element.scrollIntoView({ block: "start", behavior: "auto" });
        window.scrollTo(x, y);
      }
    }
  }, [optionValueKey]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setMatchIndex(0);
    if (!options) return;
    const query = val.toLowerCase();
    const newMatches = options.filter((option) =>
      String(option[optionLabelKey]).toLowerCase().includes(query)
    );
    if (newMatches.length > 0) {
      setTimeout(() => {
        scrollToMatchIndex(0, newMatches);
      }, 0);
    }
  };

  const handleNextMatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (matches.length === 0) return;
    const nextIndex = (matchIndex + 1) % matches.length;
    setMatchIndex(nextIndex);
    scrollToMatchIndex(nextIndex, matches);
  };

  const handlePrevMatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (matches.length === 0) return;
    const prevIndex = (matchIndex - 1 + matches.length) % matches.length;
    setMatchIndex(prevIndex);
    scrollToMatchIndex(prevIndex, matches);
  };

  const searchBar = shouldShowSearch ? (
    <div
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        if (e.key !== "Escape" && e.key !== "Tab") {
          e.stopPropagation();
        }
      }}
      className="flex items-center gap-1.5 p-1.5 border rounded-lg bg-muted/30 border-border"
    >
      <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0 ml-1" />
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="flex-1 h-7 bg-transparent text-xs text-foreground placeholder-muted-foreground focus:outline-none"
      />
      {searchQuery && (
        <span className="text-[10px] text-muted-foreground font-mono select-none px-1">
          {matches.length > 0 ? String(matchIndex + 1) + "/" + String(matches.length) : "0/0"}
        </span>
      )}
      <div className="flex items-center gap-0.5 border-l border-border pl-1.5">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 p-0 rounded text-muted-foreground hover:text-foreground"
          onPointerDown={(e) => e.preventDefault()}
          onClick={handlePrevMatch}
          disabled={matches.length <= 1}
        >
          <ChevronUp className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 p-0 rounded text-muted-foreground hover:text-foreground"
          onPointerDown={(e) => e.preventDefault()}
          onClick={handleNextMatch}
          disabled={matches.length <= 1}
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  ) : null;

  const selectedRef = React.useCallback((node: HTMLElement | null) => {
    if (node) {
      setTimeout(() => {
        let parent = node.parentElement;
        while (parent && parent !== document.body) {
          const style = window.getComputedStyle(parent);
          if (style.overflowY === "auto" || style.overflowY === "scroll") {
            const paddingTop = style.paddingTop;
            if (paddingTop) {
              node.style.scrollMarginTop = paddingTop;
            }
            break;
          }
          parent = parent.parentElement;
        }
        
        // Use scrollIntoView but prevent page jump (mimicking Radix/Shadcn scroll prevention)
        const x = window.scrollX;
        const y = window.scrollY;
        node.scrollIntoView({ block: "start", behavior: "auto" });
        window.scrollTo(x, y);
      }, 250);
    }
  }, []);

  const placementMap = {
    start: "bottom start",
    center: "bottom",
    end: "bottom end"
  } as const;
  const placement = placementMap[align || "start"];

  // 1. Dropdown variant (standard desktop select)
  if (activeVariant === "dropdown") {
    return (
      <SelectContext.Provider value={contextValue}>
        <button
          ref={triggerRef}
          {...(!selectedOption ? { "data-placeholder": "" } : {})}
          className={cn(
            "w-full h-10 flex items-center justify-between px-3 py-2 rounded-md text-sm [&>span]:line-clamp-1 focus:outline-none transition-colors select-none",
            "bg-background border border-input text-foreground data-[placeholder]:text-muted-foreground cursor-pointer text-left",
            "hover:bg-primary/5 hover:border-primary hover:text-foreground hover:data-[placeholder]:text-foreground",
            "focus:bg-primary/5 focus:border-primary focus:text-foreground focus:data-[placeholder]:text-foreground",
            open && "bg-primary/5 border-primary text-foreground data-[placeholder]:text-foreground",
            "disabled:bg-muted disabled:border-muted disabled:text-foreground disabled:data-[placeholder]:text-muted-foreground disabled:cursor-not-allowed",
            triggerClassName
          )}
          onClick={() => {
            if (!disabled) {
              handleOpenChange(true);
            }
          }}
        >
          <span>
            {selectedOption ? String(selectedOption[optionLabelKey]) : (value || resolvedPlaceholder)}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50 shrink-0 ml-2" />
        </button>
        <AriaPopover
          isOpen={open}
          onOpenChange={handleOpenChange}
          triggerRef={triggerRef as React.RefObject<HTMLButtonElement>}
          placement={placement}
          offset={4}
          className={({ isEntering, isExiting }) => cn(
            "z-50 min-w-[8rem] max-h-60 flex flex-col rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none",
            "w-[var(--trigger-width)]",
            isEntering && "animate-in fade-in-0 zoom-in-95 duration-100",
            isExiting && "animate-out fade-out-0 zoom-out-95 duration-75",
            className
          )}
        >
          {shouldShowSearch && <div className="mb-1">{searchBar}</div>}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto space-y-1"
          >
            {renderContent ? (
              // eslint-disable-next-line react-hooks/refs
              renderContent({
                value,
                onChange: handleSelect,
                close: () => handleOpenChange(false),
                onOk: handleConfirmClick
              })
            ) : !options || options.length === 0 ? (
              <div className="flex items-center justify-center py-6 text-xs text-muted-foreground select-none">
                {t.noData}
              </div>
            ) : (
              <AriaMenu className="outline-none" aria-label="Select Options">
                {options.map((option) => {
                  const isSelected = value === String(option[optionValueKey]);
                  const optionVal = String(option[optionValueKey]);
                  const optionLabel = String(option[optionLabelKey]);
                  const isMatched = searchQuery && optionLabel.toLowerCase().includes(searchQuery.toLowerCase());
                  const isActiveMatch = isMatched && matches[matchIndex] && String(matches[matchIndex][optionValueKey]) === optionVal;

                  return (
                    <AriaMenuItem
                      key={optionVal}
                      id={optionVal}
                      textValue={optionLabel}
                      ref={isSelected ? selectedRef : undefined}
                      className={cn(
                        "relative flex cursor-default select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none border border-transparent transition-colors focus:bg-accent focus:text-accent-foreground data-[focused]:bg-accent data-[focused]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                        isMatched && "bg-primary/5",
                        isActiveMatch && "border-primary"
                      )}
                      onAction={() => {
                        handleSelect(option);
                        handleOpenChange(false);
                      }}
                    >
                      <span>{optionLabel}</span>
                      {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
                    </AriaMenuItem>
                  );
                })}
              </AriaMenu>
            )}
          </div>
        </AriaPopover>
      </SelectContext.Provider>
    );
  }

  // 2-5. Dialog-based variants: picker, action-sheet, bottom-modal, center-modal
  let contentClassName = "";
  let modalContent = null;

  if (activeVariant === "picker") {
    contentClassName = "fixed inset-x-0 bottom-0 z-50 flex flex-col max-h-[45vh] border-t bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom rounded-t-xl overflow-hidden focus:outline-none";
    modalContent = (
      <>
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20">
          <DialogPrimitive.CloseTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {t.cancel}
          </DialogPrimitive.CloseTrigger>
          <span className="text-sm font-semibold">{label || resolvedPlaceholder}</span>
          <DialogPrimitive.CloseTrigger 
            className="text-sm font-semibold text-primary hover:text-primary/80"
            onClick={handleConfirmClick}
          >
            {t.done}
          </DialogPrimitive.CloseTrigger>
        </div>
        {shouldShowSearch && (
          <div className="px-4 pt-3 pb-2 border-b border-border">
            {searchBar}
          </div>
        )}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 pt-1 pb-4 space-y-1">
          {renderContent ? (
            // eslint-disable-next-line react-hooks/refs
            renderContent({
              value,
              onChange: handleSelect,
              close: () => handleOpenChange(false),
              onOk: handleConfirmClick
            })
          ) : !options || options.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-sm text-muted-foreground select-none">
              {t.noData}
            </div>
          ) : (
            options.map((option) => {
              const isSelected = value === String(option[optionValueKey]);
              const optionVal = String(option[optionValueKey]);
              const optionLabel = String(option[optionLabelKey]);
              const isMatched = searchQuery && optionLabel.toLowerCase().includes(searchQuery.toLowerCase());
              const isActiveMatch = isMatched && matches[matchIndex] && String(matches[matchIndex][optionValueKey]) === optionVal;

              return (
                <button
                  key={optionVal}
                  data-value={optionVal}
                  ref={isSelected ? selectedRef : undefined}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-3 text-sm font-medium rounded-md border border-transparent hover:bg-accent hover:text-accent-foreground active:bg-accent/80 transition-colors",
                    isSelected && "text-primary bg-accent/30 font-semibold",
                    isMatched && "bg-primary/5",
                    isActiveMatch && "border-primary"
                  )}
                  onClick={() => {
                    handleSelect(option);
                    handleOpenChange(false);
                  }}
                >
                  <span>{optionLabel}</span>
                  {isSelected && <Check className="h-4.5 w-4.5 text-primary shrink-0" />}
                </button>
              );
            })
          )}
        </div>
      </>
    );
  } else if (activeVariant === "action-sheet") {
    contentClassName = "fixed inset-x-4 bottom-4 z-50 flex flex-col gap-2 max-h-[80vh] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom focus:outline-none";
    modalContent = (
      <>
        <div className="flex flex-col rounded-xl bg-popover text-popover-foreground border overflow-hidden shadow-xl">
          {label && (
            <div className="px-4 py-3 text-center text-xs font-medium text-muted-foreground border-b border-border">
              {label}
            </div>
          )}
          {shouldShowSearch && (
            <div className="p-2 border-b bg-muted/5">
              {searchBar}
            </div>
          )}
          <div ref={scrollContainerRef} className="overflow-y-auto max-h-[50vh] divide-y divide-border">
            {renderContent ? (
              // eslint-disable-next-line react-hooks/refs
              renderContent({
                value,
                onChange: handleSelect,
                close: () => handleOpenChange(false),
                onOk: handleConfirmClick
              })
            ) : !options || options.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-sm text-muted-foreground select-none bg-popover">
                {t.noData}
              </div>
            ) : (
              options.map((option) => {
                const isSelected = value === String(option[optionValueKey]);
                const optionVal = String(option[optionValueKey]);
                const optionLabel = String(option[optionLabelKey]);
                const isMatched = searchQuery && optionLabel.toLowerCase().includes(searchQuery.toLowerCase());
                const isActiveMatch = isMatched && matches[matchIndex] && String(matches[matchIndex][optionValueKey]) === optionVal;

                return (
                  <button
                    key={optionVal}
                    data-value={optionVal}
                    ref={isSelected ? selectedRef : undefined}
                    className={cn(
                      "w-full px-4 py-3.5 text-center text-sm font-medium border border-transparent hover:bg-accent hover:text-accent-foreground active:bg-accent/80 transition-colors flex justify-center items-center gap-2",
                      isSelected && "text-primary bg-accent/30 font-semibold",
                      isMatched && "bg-primary/5",
                      isActiveMatch && "border-primary"
                    )}
                    onClick={() => {
                      handleSelect(option);
                      handleOpenChange(false);
                    }}
                  >
                    {optionLabel}
                    {isSelected && <Check className="h-4.5 w-4.5 text-primary shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
        {showConfirm && (
          <button
            onClick={handleConfirmClick}
            className="w-full py-3.5 text-center text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg focus:outline-none"
          >
            {t.done}
          </button>
        )}
        <DialogPrimitive.CloseTrigger asChild>
          <button className="w-full py-3.5 text-center text-sm font-semibold rounded-xl bg-popover text-popover-foreground border hover:bg-accent transition-colors shadow-lg focus:outline-none">
            {t.cancel}
          </button>
        </DialogPrimitive.CloseTrigger>
      </>
    );
  } else if (activeVariant === "bottom-modal") {
    contentClassName = "fixed inset-x-0 bottom-0 z-50 flex flex-col h-[50vh] max-h-[50vh] border-t bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom rounded-t-xl overflow-hidden focus:outline-none";
    modalContent = (
      <>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <DialogPrimitive.Title className="text-lg font-semibold leading-none tracking-tight">
            {label || resolvedPlaceholder}
          </DialogPrimitive.Title>
          <DialogPrimitive.CloseTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 p-0 rounded-md text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.CloseTrigger>
        </div>
        {shouldShowSearch && (
          <div className="px-6 pt-3 pb-2 border-b border-border">
            {searchBar}
          </div>
        )}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-6 pt-1 pb-6">
          <div className="space-y-1">
            {renderContent ? (
              // eslint-disable-next-line react-hooks/refs
              renderContent({
                value,
                onChange: handleSelect,
                close: () => handleOpenChange(false),
                onOk: handleConfirmClick
              })
            ) : !options || options.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-sm text-muted-foreground select-none">
                {t.noData}
              </div>
            ) : (
              options.map((option) => {
                const isSelected = value === String(option[optionValueKey]);
                const optionVal = String(option[optionValueKey]);
                const optionLabel = String(option[optionLabelKey]);
                const isMatched = searchQuery && optionLabel.toLowerCase().includes(searchQuery.toLowerCase());
                const isActiveMatch = isMatched && matches[matchIndex] && String(matches[matchIndex][optionValueKey]) === optionVal;

                return (
                  <button
                    key={optionVal}
                    data-value={optionVal}
                    ref={isSelected ? selectedRef : undefined}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-3 text-sm font-medium border border-transparent hover:bg-accent hover:text-accent-foreground transition-colors",
                      isSelected && "bg-accent text-accent-foreground font-semibold",
                      isMatched && "bg-primary/5",
                      isActiveMatch && "border-primary"
                    )}
                    onClick={() => {
                      handleSelect(option);
                      handleOpenChange(false);
                    }}
                  >
                    <span>{optionLabel}</span>
                    {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </>
    );
  } else if (activeVariant === "center-modal") {
    contentClassName = "fixed left-[50%] top-[50%] z-50 flex flex-col w-[90vw] sm:w-[450px] h-[50vh] translate-x-[-50%] translate-y-[-50%] border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg overflow-hidden focus:outline-none";
    modalContent = (
      <>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <DialogPrimitive.Title className="text-lg font-semibold leading-none tracking-tight">
            {label || resolvedPlaceholder}
          </DialogPrimitive.Title>
          <DialogPrimitive.CloseTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 p-0 rounded-md text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.CloseTrigger>
        </div>
        {shouldShowSearch && (
          <div className="px-6 pt-3 pb-2 border-b border-border">
            {searchBar}
          </div>
        )}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-6 pt-1 pb-6">
          <div className="space-y-1">
            {renderContent ? (
              // eslint-disable-next-line react-hooks/refs
              renderContent({
                value,
                onChange: handleSelect,
                close: () => handleOpenChange(false),
                onOk: handleConfirmClick
              })
            ) : !options || options.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-sm text-muted-foreground select-none">
                {t.noData}
              </div>
            ) : (
              options.map((option) => {
                const isSelected = value === String(option[optionValueKey]);
                const optionVal = String(option[optionValueKey]);
                const optionLabel = String(option[optionLabelKey]);
                const isMatched = searchQuery && optionLabel.toLowerCase().includes(searchQuery.toLowerCase());
                const isActiveMatch = isMatched && matches[matchIndex] && String(matches[matchIndex][optionValueKey]) === optionVal;

                return (
                  <button
                    key={optionVal}
                    data-value={optionVal}
                    ref={isSelected ? selectedRef : undefined}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-3 text-sm font-medium border border-transparent hover:bg-accent hover:text-accent-foreground transition-colors",
                      isSelected && "bg-accent text-accent-foreground font-semibold",
                      isMatched && "bg-primary/5",
                      isActiveMatch && "border-primary"
                    )}
                    onClick={() => {
                      handleSelect(option);
                      handleOpenChange(false);
                    }}
                  >
                    <span>{optionLabel}</span>
                    {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <SelectContext.Provider value={contextValue}>
      <button
        ref={triggerRef}
        {...(!selectedOption ? { "data-placeholder": "" } : {})}
        className={cn(
          "w-full h-10 flex items-center justify-between px-3 py-2 rounded-md text-sm [&>span]:line-clamp-1 focus:outline-none transition-colors select-none",
          "bg-background border border-input text-foreground data-[placeholder]:text-muted-foreground cursor-pointer text-left",
          "hover:bg-primary/5 hover:border-primary hover:text-foreground hover:data-[placeholder]:text-foreground",
          "focus:bg-primary/5 focus:border-primary focus:text-foreground focus:data-[placeholder]:text-foreground",
          open && "bg-primary/5 border-primary text-foreground data-[placeholder]:text-foreground",
          "disabled:bg-muted disabled:border-muted disabled:text-foreground disabled:data-[placeholder]:text-muted-foreground disabled:cursor-not-allowed",
          triggerClassName
        )}
        onClick={() => {
          if (!disabled) {
            handleOpenChange(true);
          }
        }}
      >
        <span>
          {selectedOption ? String(selectedOption[optionLabelKey]) : (value || resolvedPlaceholder)}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50 shrink-0 ml-2" />
      </button>

      <AriaModalOverlay
        isOpen={open}
        onOpenChange={handleOpenChange}
        className={({ isEntering, isExiting }) => cn(
          "fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4",
          isEntering && "animate-in fade-in-0 duration-200",
          isExiting && "animate-out fade-out-0 duration-200"
        )}
      >
        <AriaModal
          className={({ isEntering, isExiting }) => cn(
            contentClassName,
            isEntering && "animate-in fade-in-0 zoom-in-95 duration-200",
            isExiting && "animate-out fade-out-0 zoom-out-95 duration-200",
            className
          )}
        >
          <AriaDialog className="outline-none h-full flex flex-col">
            {modalContent}
          </AriaDialog>
        </AriaModal>
      </AriaModalOverlay>
    </SelectContext.Provider>
  );
}
