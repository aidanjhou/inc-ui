import { useState, useEffect, type SVGProps } from "react";
import {
  Sun,
  Moon,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Settings,
  User,
  LogOut,
  Code,
  Eye,
  Component,
  CheckCircle,
  AlertTriangle,
  Laptop,
  Smartphone
} from "lucide-react";
import {
  CheckCircleIcon,
  InfoCircleIcon,
  ExclamationCircleIcon,
  CloseCircleIcon,
  LoadingIcon
} from "./components/ui/icons";

import { cn } from "./lib/utils";
import { Button } from "./components/ui/button";
import { Select } from "./components/ui/select";
import { DatetimeSelect } from "./components/ui/datetime-select";
import { Calendar, RangeCalendar } from "./components/ui/calendar";
import { CalendarSelect } from "./components/ui/calendar-select";
import { RangeCalendarSelect } from "./components/ui/calendar-range-select";
import { CascaderSelect, type CascaderOption } from "./components/ui/cascader-select";
import { useUIConfig } from "./context/UIConfigContext";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "./components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Checkbox, CheckboxGroup } from "./components/ui/checkbox";
import { Tree } from "./components/ui/tree";
import { Radio, RadioGroup } from "./components/ui/radio";
import { Switch } from "./components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuShortcut
} from "./components/ui/dropdown-menu";
import { MessagePrompter } from "./components/ui/message";
import { message } from "./hooks/message";
import { Loading } from "./components/ui/loading";
import { Chart } from "./components/ui/chart";
import { Grid } from "./components/ui/grid";
import { RegionSelect, RegionDisplay, RegionBadge, countryCodeToFlag } from "./components/ui/region-select";
import type { Region } from "./data/regions";
import { getCountryByCode, getRegions, getCountriesByRegion } from "./data/regions";

const GithubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);



function InputPlayground() {
  const [inputTab, setInputTab] = useState<"preview" | "code">("preview");
  const [inputDisabled, setInputDisabled] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [inputSize, setInputSize] = useState<"xs" | "sm" | "default" | "lg" | "xl" | "xxl">("default");
  const [inputValue, setInputValue] = useState("");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
    message.success("Component source code copied to clipboard.");
  };

  const inputCode = `import { Input } from 'inc-ui'

export default function Demo() {
  const [value, setValue] = useState("")

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-bold">Standard Input</label>
        <Input
          placeholder="Enter some text..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="\${inputSize}"
        />
      </div>
      <div>
        <label className="text-sm font-bold">Disabled Input</label>
        <Input placeholder="Disabled field" disabled />
      </div>
      <div>
        <label className="text-sm font-bold">Input with Error</label>
        <Input
          placeholder="Invalid value"
          className="border-destructive focus-visible:ring-destructive"
        />
        <p className="text-xs text-destructive mt-1">Validation error message.</p>
      </div>
    </div>
  )
}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Preview */}
      <div className="lg:col-span-7 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col justify-center items-center relative min-h-[280px]">
        <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md">
          <Button size="sm" variant={inputTab === "preview" ? "secondary" : "ghost"} onClick={() => setInputTab("preview")}>
            <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
          </Button>
          <Button size="sm" variant={inputTab === "code" ? "secondary" : "ghost"} onClick={() => setInputTab("code")}>
            <Code className="mr-1.5 h-3.5 w-3.5" /> Code
          </Button>
        </div>

        {inputTab === "preview" ? (
          <div className="w-full max-w-sm space-y-4 pt-8">
            <div className="space-y-2">
              <label className="text-sm font-bold tracking-tight">Interactive Input Field</label>
              <Input
                placeholder="Enter some text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={inputDisabled}
                size={inputSize}
                className={cn(inputError && "border-destructive focus-visible:ring-destructive")}
              />
              {inputError && (
                <p className="text-xs text-destructive font-medium flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" /> Input validation failed. Please check criteria.
                </p>
              )}
            </div>
            {inputValue && (
              <p className="text-xs text-muted-foreground font-semibold">Value length: {inputValue.length} chars</p>
            )}
          </div>
        ) : (
          <div className="w-full relative pt-8">
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
              <code>{inputCode}</code>
            </pre>
            <Button
              icon
              variant="ghost"
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              onClick={() => copyToClipboard(inputCode, "input")}
            >
              {copiedText === "input" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col space-y-6 shadow-sm">
        <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Playground Settings</h3>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Size</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {["xs", "sm", "default", "lg", "xl", "xxl"].map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={inputSize === s ? "primary" : "secondary"}
                  onClick={() => setInputSize(s as any)}
                  className="text-xs px-0"
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Modifiers</label>
            <div className="flex flex-col gap-3 mt-2">
              <label className="flex items-center space-x-2 text-sm font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={inputDisabled}
                  onChange={(e) => setInputDisabled(e.target.checked)}
                  className="rounded border-input text-primary focus:ring-ring h-4 w-4"
                />
                <span>Disabled State</span>
              </label>

              <label className="flex items-center space-x-2 text-sm font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={inputError}
                  onChange={(e) => setInputError(e.target.checked)}
                  className="rounded border-input text-primary focus:ring-ring h-4 w-4"
                />
                <span>Validation Error Border</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckboxPlayground() {
  const [checkboxTab, setCheckboxTab] = useState<"preview" | "code">("preview");
  const [checkboxSize, setCheckboxSize] = useState<"xs" | "sm" | "default" | "lg" | "xl" | "xxl">("default");
  const [multiValue, setMultiValue] = useState<any>("");
  const [allowInverse, setAllowInverse] = useState(true);
  const [allowPartial, setAllowPartial] = useState(true);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
    message.success("Component source code copied to clipboard.");
  };

  const getSupportedStatesText = () => {
    if (allowInverse && allowPartial) return `"" | "1" | "0.5" | "0"`;
    if (allowInverse && !allowPartial) return `"" | "1" | "0"`;
    if (!allowInverse && allowPartial) return `"" | "1" | "0.5"`;
    return `"" | "1"`;
  };

  const checkboxCode = `import { Checkbox, CheckboxGroup } from 'inc-ui'
import { useState } from 'react'

export default function Demo() {
  const [value, setValue] = useState("") // ${getSupportedStatesText()}

  return (
    <div className="space-y-6">
      {/* Standard Group */}
      <CheckboxGroup label="Optional Services">
        <Checkbox value="wifi"${checkboxSize !== "default" ? ` size="${checkboxSize}"` : ""}>Wi-Fi</Checkbox>
        <Checkbox value="parking" description="Includes overnight parking"${checkboxSize !== "default" ? ` size="${checkboxSize}"` : ""}>Parking Space</Checkbox>
      </CheckboxGroup>

      {/* Multi-State Checkbox */}
      <Checkbox
        allowInverse={${allowInverse}}
        allowPartial={${allowPartial}}
        value={value}
        onChange={setValue}
        description={\`Current Value: "\${value}"\`}
        ${checkboxSize !== "default" ? `size="${checkboxSize}"` : ""}
      >
        Interactive Multi-State Checkbox
      </Checkbox>
    </div>
  )
}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Preview */}
      <div className="lg:col-span-7 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col justify-center items-center relative min-h-[280px]">
        <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md">
          <Button size="sm" variant={checkboxTab === "preview" ? "secondary" : "ghost"} onClick={() => setCheckboxTab("preview")}>
            <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
          </Button>
          <Button size="sm" variant={checkboxTab === "code" ? "secondary" : "ghost"} onClick={() => setCheckboxTab("code")}>
            <Code className="mr-1.5 h-3.5 w-3.5" /> Code
          </Button>
        </div>

        {checkboxTab === "preview" ? (
          <div className="w-full max-w-sm space-y-6 pt-8">
            <CheckboxGroup label="Optional Services">
              <Checkbox value="wifi" size={checkboxSize}>Wi-Fi</Checkbox>
              <Checkbox value="parking" description="Includes overnight parking" size={checkboxSize}>Parking Space</Checkbox>
              <Checkbox value="breakfast" isDisabled size={checkboxSize}>Breakfast (Sold Out)</Checkbox>
            </CheckboxGroup>

            <div className="pt-6 border-t border-border space-y-4">
              <h4 className="text-sm font-bold tracking-tight text-foreground">Multi-State Checkbox</h4>
              <Checkbox
                allowInverse={allowInverse}
                allowPartial={allowPartial}
                value={multiValue}
                onChange={setMultiValue}
                size={checkboxSize}
                description={multiValue === "" ? 'Status: Unselected (value: "")' : `Status: Selected (value: "${multiValue}")`}
              >
                Interactive Multi-State Checkbox
              </Checkbox>
            </div>

            <div className="pt-6 border-t border-border space-y-4">
              <h4 className="text-sm font-bold tracking-tight text-foreground">Disabled States (Showcase)</h4>
              <div className="grid grid-cols-2 gap-4">
                <Checkbox isDisabled value="" size={checkboxSize} description='Unselected ("")'>
                  Disabled Empty
                </Checkbox>
                <Checkbox isDisabled value="1" size={checkboxSize} description='Selected ("1")'>
                  Disabled Yes
                </Checkbox>
                {allowPartial && (
                  <Checkbox isDisabled value="0.5" size={checkboxSize} description='Partial ("0.5")'>
                    Disabled Partial
                  </Checkbox>
                )}
                {allowInverse && (
                  <Checkbox isDisabled value="0" size={checkboxSize} description='Inverse ("0")'>
                    Disabled No
                  </Checkbox>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full relative pt-8">
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
              <code>{checkboxCode}</code>
            </pre>
            <Button
              icon
              variant="ghost"
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              onClick={() => copyToClipboard(checkboxCode, "checkbox")}
            >
              {copiedText === "checkbox" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col space-y-6 shadow-sm">
        <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Playground Settings</h3>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Size</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {["xs", "sm", "default", "lg", "xl", "xxl"].map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={checkboxSize === s ? "primary" : "secondary"}
                  onClick={() => setCheckboxSize(s as any)}
                  className="text-xs px-0"
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Multi-State Settings</label>
            <div className="flex flex-col gap-3 mt-2">
              <label className="flex items-center space-x-2 text-sm font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowInverse}
                  onChange={(e) => {
                    setAllowInverse(e.target.checked);
                    setMultiValue((prev: any) => {
                      if (!e.target.checked && prev === "0") return "";
                      return prev;
                    });
                  }}
                  className="rounded border-input text-primary focus:ring-ring h-4 w-4"
                />
                <span>Allow Inverse (0) State</span>
              </label>

              <label className="flex items-center space-x-2 text-sm font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowPartial}
                  onChange={(e) => {
                    setAllowPartial(e.target.checked);
                    setMultiValue((prev: any) => {
                      if (!e.target.checked && prev === "0.5") return allowInverse ? "0" : "";
                      return prev;
                    });
                  }}
                  className="rounded border-input text-primary focus:ring-ring h-4 w-4"
                />
                <span>Allow Partial (0.5) State</span>
              </label>

              <div className="text-xs text-muted-foreground">
                <span className="font-semibold">Supported States:</span>{" "}
                {getSupportedStatesText()}
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">API Reference</h3>
            <div className="space-y-4 pt-2">
              <div>
                <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;CheckboxGroup /&gt;</code>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Groups multiple checkboxes together.</p>
              </div>
              <div>
                <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;Checkbox value description size /&gt;</code>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Individual checkbox item.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TreePlayground() {
  const [treeTab, setTreeTab] = useState<"preview" | "code">("preview");
  const [treeSize, setTreeSize] = useState<"xs" | "sm" | "default" | "lg" | "xl" | "xxl">("default");
  const [checkedKeys, setCheckedKeys] = useState<string[]>([
    "internet-1",
    "dev-1",
    "search-google",
    "search-dictionary",
    "services-1"
  ]);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
    message.success("Component source code copied to clipboard.");
  };

  const treeData = [
    {
      id: "internet",
      label: "互联网",
      children: [
        { id: "internet-1", label: "共享互联网", shortcut: "⌥⌘I" },
        { id: "internet-2", label: "网络诊断", shortcut: "⌥⌘D" }
      ]
    },
    {
      id: "development",
      label: "开发",
      children: [
        { id: "dev-1", label: "显示源文件", shortcut: "⌥⌘U" },
        { id: "dev-2", label: "运行代码", shortcut: "⌃⌥⌘R" },
        { id: "dev-3", label: "检查元素", shortcut: "⌥⌘I" }
      ]
    },
    {
      id: "search",
      label: "搜索",
      children: [
        { id: "search-focus", label: "聚焦", shortcut: "⇧⌘F" },
        { id: "search-google", label: "用“Google”搜索", shortcut: "⇧⌘L" },
        { id: "search-dictionary", label: "在词典中查询" }
      ]
    },
    {
      id: "services",
      label: "服务",
      children: [
        { id: "services-1", label: "发送邮件", shortcut: "⇧⌘E" },
        { id: "services-2", label: "新建便签", shortcut: "⌥⌘N" }
      ]
    }
  ];

  const treeCode = `import { Tree, type TreeNode } from 'inc-ui'
import { useState } from 'react'

export default function Demo() {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([
    "internet-1",
    "dev-1",
    "search-google",
    "search-dictionary",
    "services-1"
  ])

  const treeData: TreeNode[] = [
    {
      id: "internet",
      label: "互联网",
      children: [
        { id: "internet-1", label: "共享互联网", shortcut: "⌥⌘I" },
        { id: "internet-2", label: "网络诊断", shortcut: "⌥⌘D" }
      ]
    },
    {
      id: "development",
      label: "开发",
      children: [
        { id: "dev-1", label: "显示源文件", shortcut: "⌥⌘U" },
        { id: "dev-2", label: "运行代码", shortcut: "⌃⌥⌘R" },
        { id: "dev-3", label: "检查元素", shortcut: "⌥⌘I" }
      ]
    },
    {
      id: "search",
      label: "搜索",
      children: [
        { id: "search-focus", label: "聚焦", shortcut: "⇧⌘F" },
        { id: "search-google", label: "用“Google”搜索", shortcut: "⇧⌘L" },
        { id: "search-dictionary", label: "在词典中查询" }
      ]
    }
  ]

  return (
    <Tree
      data={treeData}
      checkedKeys={checkedKeys}
      onCheck={setCheckedKeys}
      size="${treeSize}"
      defaultExpandedKeys={["search", "development"]}
      className="w-full max-w-md bg-background border border-border rounded-xl p-3"
    />
  )
}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Preview */}
      <div className="lg:col-span-7 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col justify-center items-center relative min-h-[380px]">
        <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md">
          <Button size="sm" variant={treeTab === "preview" ? "secondary" : "ghost"} onClick={() => setTreeTab("preview")}>
            <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
          </Button>
          <Button size="sm" variant={treeTab === "code" ? "secondary" : "ghost"} onClick={() => setTreeTab("code")}>
            <Code className="mr-1.5 h-3.5 w-3.5" /> Code
          </Button>
        </div>

        {treeTab === "preview" ? (
          <div className="w-full max-w-md space-y-4 pt-8">
            <Tree
              data={treeData}
              checkedKeys={checkedKeys}
              onCheck={setCheckedKeys}
              size={treeSize}
              defaultExpandedKeys={["search", "development"]}
              className="bg-background/80 backdrop-blur-sm shadow-md"
            />
            <div className="text-xs text-muted-foreground font-semibold bg-muted/30 p-3 rounded-lg border border-border/40">
              <span className="font-bold text-foreground">Checked Leaf Keys:</span>{" "}
              {checkedKeys.length > 0 ? checkedKeys.join(", ") : "None"}
            </div>
          </div>
        ) : (
          <div className="w-full relative pt-8">
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
              <code>{treeCode}</code>
            </pre>
            <Button
              icon
              variant="ghost"
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              onClick={() => copyToClipboard(treeCode, "tree")}
            >
              {copiedText === "tree" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col space-y-6 shadow-sm">
        <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Playground Settings</h3>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Size</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {["xs", "sm", "default", "lg", "xl", "xxl"].map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={treeSize === s ? "primary" : "secondary"}
                  onClick={() => setTreeSize(s as any)}
                  className="text-xs px-0"
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Premium Features</h4>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside">
              <li>Automatic parent indeterminate (`0.5`) and fully checked (`1`) state calculations.</li>
              <li>Smooth collapse/expand transitions for sub-nodes.</li>
              <li>macOS Keyboard Shortcut style displays.</li>
              <li>Propagates selections recursively on parent checkbox interaction.</li>
            </ul>
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">API Reference</h3>
            <div className="space-y-4 pt-2">
              <div>
                <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;Tree data checkedKeys onCheck size /&gt;</code>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Render tree list with hierarchical checkboxes and dynamic sizing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RadioPlayground() {
  const [radioTab, setRadioTab] = useState<"preview" | "code">("preview");
  const [radioSize, setRadioSize] = useState<"xs" | "sm" | "default" | "lg" | "xl" | "xxl">("default");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
    message.success("Component source code copied to clipboard.");
  };

  const radioCode = `import { Radio, RadioGroup } from 'inc-ui'

export default function Demo() {
  return (
    <RadioGroup label="Notification Preference" defaultValue="email">
      <Radio value="email" description="Receive updates via email"${radioSize !== "default" ? ` size="${radioSize}"` : ""}>Email</Radio>
      <Radio value="sms" description="Receive updates via SMS"${radioSize !== "default" ? ` size="${radioSize}"` : ""}>SMS</Radio>
      <Radio value="push" isDisabled${radioSize !== "default" ? ` size="${radioSize}"` : ""}>Push Notification (Not Supported)</Radio>
    </RadioGroup>
  )
}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Preview */}
      <div className="lg:col-span-7 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col justify-center items-center relative min-h-[280px]">
        <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md">
          <Button size="sm" variant={radioTab === "preview" ? "secondary" : "ghost"} onClick={() => setRadioTab("preview")}>
            <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
          </Button>
          <Button size="sm" variant={radioTab === "code" ? "secondary" : "ghost"} onClick={() => setRadioTab("code")}>
            <Code className="mr-1.5 h-3.5 w-3.5" /> Code
          </Button>
        </div>

        {radioTab === "preview" ? (
          <div className="w-full max-w-sm space-y-4 pt-8">
            <RadioGroup label="Notification Preference" defaultValue="email">
              <Radio value="email" description="Receive updates via email" size={radioSize}>Email</Radio>
              <Radio value="sms" description="Receive updates via SMS" size={radioSize}>SMS</Radio>
              <Radio value="push" isDisabled size={radioSize}>Push Notification (Not Supported)</Radio>
            </RadioGroup>
          </div>
        ) : (
          <div className="w-full relative pt-8">
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
              <code>{radioCode}</code>
            </pre>
            <Button
              icon
              variant="ghost"
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              onClick={() => copyToClipboard(radioCode, "radio")}
            >
              {copiedText === "radio" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col space-y-6 shadow-sm">
        <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Playground Settings</h3>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Size</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {["xs", "sm", "default", "lg", "xl", "xxl"].map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={radioSize === s ? "primary" : "secondary"}
                  onClick={() => setRadioSize(s as any)}
                  className="text-xs px-0"
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">API Reference</h3>
            <div className="space-y-4 pt-2">
              <div>
                <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;RadioGroup /&gt;</code>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Groups multiple radio buttons together. Supports vertical and horizontal orientation.</p>
              </div>
              <div>
                <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;Radio value description size /&gt;</code>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Individual radio item.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SwitchPlayground() {
  const [switchTab, setSwitchTab] = useState<"preview" | "code">("preview");
  const [switchSize, setSwitchSize] = useState<"xs" | "sm" | "default" | "lg" | "xl" | "xxl">("default");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
    message.success("Component source code copied to clipboard.");
  };

  const switchCode = `import { Switch } from 'inc-ui'

export default function Demo() {
  return (
    <div className="flex flex-col gap-4">
      <Switch${switchSize !== "default" ? ` size="${switchSize}"` : ""}>Airplane Mode</Switch>
      <Switch description="Get notified when someone messages you"${switchSize !== "default" ? ` size="${switchSize}"` : ""}>Email Notifications</Switch>
      <Switch isDisabled${switchSize !== "default" ? ` size="${switchSize}"` : ""}>Bluetooth (Unavailable)</Switch>
    </div>
  )
}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Preview */}
      <div className="lg:col-span-7 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col justify-center items-center relative min-h-[280px]">
        <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md">
          <Button size="sm" variant={switchTab === "preview" ? "secondary" : "ghost"} onClick={() => setSwitchTab("preview")}>
            <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
          </Button>
          <Button size="sm" variant={switchTab === "code" ? "secondary" : "ghost"} onClick={() => setSwitchTab("code")}>
            <Code className="mr-1.5 h-3.5 w-3.5" /> Code
          </Button>
        </div>

        {switchTab === "preview" ? (
          <div className="w-full max-w-sm space-y-4 pt-8">
            <div className="flex flex-col gap-4">
              <Switch size={switchSize}>Airplane Mode</Switch>
              <Switch description="Get notified when someone messages you" size={switchSize}>Email Notifications</Switch>
              <Switch isDisabled size={switchSize}>Bluetooth (Unavailable)</Switch>
            </div>
          </div>
        ) : (
          <div className="w-full relative pt-8">
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
              <code>{switchCode}</code>
            </pre>
            <Button
              icon
              variant="ghost"
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              onClick={() => copyToClipboard(switchCode, "switch")}
            >
              {copiedText === "switch" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col space-y-6 shadow-sm">
        <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Playground Settings</h3>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Size</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {["xs", "sm", "default", "lg", "xl", "xxl"].map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={switchSize === s ? "primary" : "secondary"}
                  onClick={() => setSwitchSize(s as any)}
                  className="text-xs px-0"
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">API Reference</h3>
            <div className="space-y-4 pt-2">
              <div>
                <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;Switch value description size /&gt;</code>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Toggle switch control.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const { theme, setTheme, platform, setPlatform, language, setLanguage } = useUIConfig();
  const [buttonTab, setButtonTab] = useState<"preview" | "code">("preview");
  const [cardTab, setCardTab] = useState<"preview" | "code">("preview");
  const [selectTab, setSelectTab] = useState<"preview" | "code">("preview");
  const [modalTab, setModalTab] = useState<"preview" | "code">("preview");
  const [dropdownTab, setDropdownTab] = useState<"preview" | "code">("preview");
  const [messageTab, setMessageTab] = useState<"preview" | "code">("preview");
  const [loadingTab, setLoadingTab] = useState<"preview" | "code">("preview");
  const [chartTab, setChartTab] = useState<"preview" | "code">("preview");
  const [gridTab, setGridTab] = useState<"preview" | "code">("preview");
  const [regionTab, setRegionTab] = useState<"preview" | "code">("preview");
  const [selectedRegion, setSelectedRegion] = useState<Region | "all">("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Select Playground States
  const [selectVariant, setSelectVariant] = useState<"dropdown" | "picker" | "action-sheet" | "bottom-modal" | "center-modal" | null>(null);
  const [selectSize, setSelectSize] = useState<"xs" | "sm" | "default" | "lg" | "xl" | "xxl">("default");
  const [selectAlign, setSelectAlign] = useState<"auto" | "start" | "end">("auto");
  const [selectValue, setSelectValue] = useState<string>("");
  const [selectManyValue, setSelectManyValue] = useState<string>("");
  const [selectJaValue, setSelectJaValue] = useState<string>("");
  const [selectCustomValue, setSelectCustomValue] = useState<string>("");
  const [datetimeValue, setDatetimeValue] = useState<string>("");
  const [calendarValue, setCalendarValue] = useState<string>("");
  const [calendarSelectValue, setCalendarSelectValue] = useState<string>("");
  const [calendarTab, setCalendarTab] = useState<"preview" | "code">("preview");
  const [calendarVariant, setCalendarVariant] = useState<"dropdown" | "picker" | "action-sheet" | "bottom-modal" | "center-modal" | null>(null);
  const [calendarAlign, setCalendarAlign] = useState<"auto" | "start" | "end">("auto");
  const [rangeCalendarValue, setRangeCalendarValue] = useState<string>("");
  const [rangeCalendarSelectValue, setRangeCalendarSelectValue] = useState<string>("");
  const [rangeCalendarTab, setRangeCalendarTab] = useState<"preview" | "code">("preview");
  const [rangeCalendarVariant, setRangeCalendarVariant] = useState<"dropdown" | "picker" | "action-sheet" | "bottom-modal" | "center-modal" | null>(null);
  const [rangeCalendarAlign, setRangeCalendarAlign] = useState<"auto" | "start" | "end">("auto");

  // Cascader Playground States
  const [cascaderValue, setCascaderValue] = useState<string>("");
  const [cascaderTab, setCascaderTab] = useState<"preview" | "code">("preview");
  const [cascaderVariant, setCascaderVariant] = useState<"dropdown" | "picker" | "action-sheet" | "bottom-modal" | "center-modal" | null>(null);
  const [cascaderSize, setCascaderSize] = useState<"xs" | "sm" | "default" | "lg" | "xl" | "xxl">("default");
  const [cascaderAlign, setCascaderAlign] = useState<"auto" | "start" | "end">("auto");

  // Button Playground States
  const [btnVariant, setBtnVariant] = useState<"primary" | "secondary" | "solid" | "default" | "destructive" | "ghost" | "link" | "icon">("primary");
  const [btnSize, setBtnSize] = useState<"xs" | "sm" | "default" | "lg" | "xl" | "xxl">("default");
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  // Card Playground States
  const [cardGlass, setCardGlass] = useState(true);
  const [cardHoverable, setCardHoverable] = useState(true);

  // Card Playground States
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [loadingVariant, setLoadingVariant] = useState<"loading" | "success" | "error" | "warning" | "info" | "none">("loading");
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
    message.success("Component source code copied to clipboard.");
  };

  // Component Code Strings
  const buttonCode = `import { Button } from 'inc-ui'
import { Sparkles } from 'lucide-react'

export default function Demo() {
  return (
    <Button 
      variant="${btnVariant}" 
      size="${btnSize}"${btnLoading ? " loading" : ""}${btnDisabled ? " disabled" : ""}
    >
      Click Me
    </Button>
  )
}`;

  const cardCode = `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from 'inc-ui'

export default function Demo() {
  return (
    <Card ${cardGlass ? "glass" : ""} ${cardHoverable ? "hoverable" : ""}>
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
        <CardDescription>Monthly growth and active metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-extrabold">+24.8%</div>
        <p className="text-xs text-muted-foreground mt-1">+12% increase from last week</p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" size="sm" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  )
}`;

  const dialogCode = `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button } from 'inc-ui'

export default function Demo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Settings</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Account Profile</DialogTitle>
          <DialogDescription>Modify your developer settings and dashboard credentials.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input placeholder="Username" defaultValue="aidanjhou" />
          <Input placeholder="Email Address" defaultValue="dev@inc-ui.design" type="email" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`;

  const dropdownCode = `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuShortcut, Button } from 'inc-ui'
import { User, Settings, LogOut } from 'lucide-react'

export default function Demo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">My Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" /> Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" /> Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" /> Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`;

  const messageCode = `import { Button, MessagePrompter, message } from 'inc-ui'
import { CheckCircleIcon, InfoCircleIcon, ExclamationCircleIcon, CloseCircleIcon } from 'inc-ui/icons'

const LoadingIcon = () => (
  <svg className="h-4 w-4 mr-2 animate-spin" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
)

export default function App() {
  return (
    <>
      <MessagePrompter />

      <Button
        onClick={() => message("Copied to clipboard.")}
      >
        <div className="flex items-center gap-2">Default Message</div>
      </Button>

      <Button
        onClick={() =>
          message.success("Profile updated.", {
            description: "Your changes have been saved successfully.",
            duration: 3
          })
        }
      >
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="h-4 w-4 text-emerald-500" /> Success Message
        </div>
      </Button>

      <Button
        onClick={() =>
          message.warning("Storage almost full.", {
            description: "Repository storage reaches 89% capacity.",
            duration: 3
          })
        }
      >
        <div className="flex items-center gap-2">
          <ExclamationCircleIcon className="h-4 w-4 text-amber-500" /> Warning Message
        </div>
      </Button>

      <Button
        onClick={() =>
          message.error("Build failed.", {
            description: "Import symbol not found on compile. Check src/index.ts line 42.",
            duration: 3
          })
        }
      >
        <div className="flex items-center gap-2">
          <CloseCircleIcon className="h-4 w-4 text-red-500" /> Error Message
        </div>
      </Button>

      <Button
        onClick={() =>
          message.info("New version available.", {
            description: "inc-ui v0.2.0 has been released. See changelog for details.",
            duration: 3
          })
        }
      >
        <div className="flex items-center gap-2">
          <InfoCircleIcon className="h-4 w-4 text-blue-500" /> Info Message
        </div>
      </Button>

      <Button
        onClick={() => {
          const id = message.loading("Loading data process...", { duration: 0 })
          setTimeout(() => {
            message.destroy(id)
            message.success("Data loaded successfully!", {
              description: "All records synced.",
              duration: 3
            })
          }, 2000)
        }}
      >
        <div className="flex items-center gap-2">
          <LoadingIcon /> Loading → Update
        </div>
      </Button>
    </>
  )
}`;

  const loadingCode = `import { useState } from "react"
import { Loading, Button } from "inc-ui"

export default function Demo() {
  const [open, setOpen] = useState(false)
  const [variant, setVariant] = useState<"loading" | "success">("loading")
  const [text, setText] = useState("")

  const run = () => {
    setVariant("loading")
    setText("Processing...")
    setOpen(true)
    setTimeout(() => {
      setVariant("success")
      setText("Completed successfully!")
    }, 2000)
    setTimeout(() => setOpen(false), 3500)
  }

  return (
    <>
      <Button onClick={run}>Loading → Success</Button>

      <Loading open={open} onOpenChange={setOpen} variant={variant}>
        {text}
      </Loading>
    </>
  )
}`;

  const selectOptions = [
    { label: "Option 1: React.js", value: "react", other: "Popular" },
    { label: "Option 2: Vue.js", value: 2, other: "Progressive" },
    { label: "Option 3: Svelte", value: "svelte", other: "Compiler" },
    { label: "Option 4: Next.js", value: 4, other: "Meta-framework" },
    { label: "Option 5: SolidJS", value: "solid", other: "Reactive" }
  ];

  const manyOptions = Array.from({ length: 101 }, (_, i) => ({
    label: `Option ${i + 1}`,
    value: `val-${i + 1}`
  }));

  const selectCode = `import { Select } from "inc-ui"

export default function Demo() {
  const frameworks = [
    { label: "Option 1: React.js", value: "react", other: "Popular" },
    { label: "Option 2: Vue.js", value: 2, other: "Progressive" },
    { label: "Option 3: Svelte", value: "svelte", other: "Compiler" },
  ]

  const languages = [
    { name: "JavaScript", id: "js" },
    { name: "TypeScript", id: "ts" },
    { name: "Rust", id: "rs" },
  ]

  const largeOptions = Array.from({ length: 101 }, (_, i) => ({
    label: \`Option \${i + 1}\`,
    value: \`val-\${i + 1}\`,
  }))

  const fruits = [
    { label: "リンゴ (Apple)", value: "apple" },
    { label: "バナナ (Banana)", value: "banana" },
    { label: "オレンジ (Orange)", value: "orange" },
  ]

  return (
    <div className="space-y-4">
      {/* 1. Choose framework (Default Keys: label/value) */}
      <Select
        options={frameworks}
        placeholder="Select framework..."
        ${selectSize !== "default" ? `size="${selectSize}"\n        ` : ""}variant=${selectVariant ? `"${selectVariant}"` : "undefined"}
        label="Choose Framework"
        onChange={(value, option) => console.log(value, option)}
      />

      {/* 2. Choose language (Custom Keys: name/id) */}
      <Select
        options={languages}
        optionLabelKey="name"
        optionValueKey="id"
        placeholder="Select language..."
        ${selectSize !== "default" ? `size="${selectSize}"\n        ` : ""}variant=${selectVariant ? `"${selectVariant}"` : "undefined"}
        label="Choose Language"
        onChange={(value) => console.log(value)}
      />

      {/* 3. Large options list (101 items, automatically triggers search) */}
      <Select
        options={largeOptions}
        placeholder="Select an option (101 items)..."
        ${selectSize !== "default" ? `size="${selectSize}"\n        ` : ""}variant=${selectVariant ? `"${selectVariant}"` : "undefined"}
        label="Choose from 101 Options"
        onChange={(value) => console.log(value)}
      />

      {/* 4. Empty options list (0 items, showing empty state) */}
      <Select
        options={[]}
        placeholder="Select an option (0 items)..."
        ${selectSize !== "default" ? `size="${selectSize}"\n        ` : ""}variant=${selectVariant ? `"${selectVariant}"` : "undefined"}
        label="Empty Options"
        onChange={(value) => console.log(value)}
      />

      {/* 5. Custom Translations (Demonstrates external Japanese completion) */}
      <Select
        options={fruits}
        placeholder="Please choose..."
        ${selectSize !== "default" ? `size="${selectSize}"\n        ` : ""}variant=${selectVariant ? `"${selectVariant}"` : "undefined"}
        translations={{
          ja: {
            cancel: "取消",
            done: "完了",
            placeholder: "選択してください...",
            noData: "データなし"
          }
        }}
        label="Custom Translations"
        onChange={(value) => console.log(value)}
      />

      {/* 6. Custom renderContent (Demonstrates custom content/grid/calendar) */}
      <Select
        placeholder="Custom color grid..."
        ${selectSize !== "default" ? `size="${selectSize}"\n        ` : ""}variant=${selectVariant ? `"${selectVariant}"` : "undefined"}
        label="Custom renderContent Grid"
        value={selectCustomValue}
        onChange={(value) => console.log(value)}
        renderContent={({ value, onChange, close }) => {
          const colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "indigo", "teal"];
          return (
            <div className="p-3 grid grid-cols-3 gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  style={{ backgroundColor: c }}
                  className={\`w-8 h-8 rounded-full border border-border \${value === c ? "ring-2 ring-primary" : ""}\`}
                  onClick={() => {
                    onChange(c);
                    close();
                  }}
                />
              ))}
            </div>
          );
        }}
      />
    </div>
  )
}`;

  const cascaderOptions: CascaderOption[] = [
    {
      value: "frontend",
      label: "Frontend",
      children: [
        {
          value: "react",
          label: "React",
          children: [
            { value: "nextjs", label: "Next.js" },
            { value: "vite", label: "Vite" }
          ]
        },
        { value: "vue", label: "Vue" }
      ]
    },
    {
      value: "backend",
      label: "Backend",
      children: [
        { value: "node", label: "Node.js" },
        { value: "python", label: "Python" }
      ]
    }
  ];

  const cascaderCode = `import { CascaderSelect } from "inc-ui"

export default function Demo() {
  const options = [
    {
      value: "frontend",
      label: "Frontend",
      children: [
        {
          value: "react",
          label: "React",
          children: [
            { value: "nextjs", label: "Next.js" },
            { value: "vite", label: "Vite" }
          ]
        },
        { value: "vue", label: "Vue" }
      ]
    },
    {
      value: "backend",
      label: "Backend",
      children: [
        { value: "node", label: "Node.js" },
        { value: "python", label: "Python" }
      ]
    }
  ];

  return (
    <CascaderSelect
      options={options}
      placeholder="Select technology..."
      variant="dropdown"
      onChange={(val) => console.log(val)}
    />
  )
}`;

  // Chart code strings
  const barChartCode = `import { Chart } from 'inc-ui'

export default function BarChart() {
  const options = {
    chart: { toolbar: { show: false } },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    colors: ['#6366f1'],
    plotOptions: { bar: { borderRadius: 4 } },
    dataLabels: { enabled: false },
    grid: { borderColor: '#e2e8f0', strokeDashArray: 4 }
  }
  const series = [{ name: 'Revenue', data: [30, 40, 35, 50, 49, 60] }]

  return <Chart options={options} series={series} type="bar" height={300} />
}`;

  const lineChartCode = `import { Chart } from 'inc-ui'

export default function LineChart() {
  const options = {
    chart: { toolbar: { show: false } },
    xaxis: { categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'] },
    colors: ['#8b5cf6'],
    stroke: { curve: 'straight', width: 2 },
    dataLabels: { enabled: false },
    grid: { borderColor: '#e2e8f0', strokeDashArray: 4 }
  }
  const series = [{ name: 'Users', data: [120, 250, 180, 310, 290, 400] }]

  return <Chart options={options} series={series} type="line" height={300} />
}`;

  const donutChartCode = `import { Chart } from 'inc-ui'

export default function DonutChart() {
  const options = {
    chart: { toolbar: { show: false } },
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    colors: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef'],
    responsive: [{
      breakpoint: 480,
      options: { chart: { width: 200 }, legend: { position: 'bottom' } }
    }],
    legend: { position: 'bottom' },
    dataLabels: { enabled: true, formatter: (val: number) => val.toFixed(0) + '%' }
  }
  const series = [44, 28, 18, 10]

  return <Chart options={options} series={series} type="donut" height={300} />
}`;

  const areaChartCode = `import { Chart } from 'inc-ui'

export default function AreaChart() {
  const options = {
    chart: { toolbar: { show: false } },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    colors: ['#06b6d4'],
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.1 } },
    dataLabels: { enabled: false },
    grid: { borderColor: '#e2e8f0', strokeDashArray: 4 }
  }
  const series = [{ name: 'Visitors', data: [180, 250, 300, 220, 380, 420, 510] }]

  return <Chart options={options} series={series} type="area" height={300} />
}`;

  const pieChartCode = `import { Chart } from 'inc-ui'

export default function PieChart() {
  const options = {
    chart: { toolbar: { show: false } },
    labels: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Others'],
    colors: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#f472b6'],
    responsive: [{
      breakpoint: 480,
      options: { chart: { width: 200 }, legend: { position: 'bottom' } }
    }],
    legend: { position: 'bottom' },
    dataLabels: { enabled: true, formatter: (val: number) => val.toFixed(0) + '%' }
  }
  const series = [42, 28, 16, 10, 4]

  return <Chart options={options} series={series} type="pie" height={300} />
}`;

  const heatmapChartCode = `import { Chart } from 'inc-ui'

export default function HeatmapChart() {
  const options = {
    chart: { toolbar: { show: false } },
    colors: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef'],
    dataLabels: { enabled: false },
    grid: { borderColor: '#e2e8f0', strokeDashArray: 4 }
  }
  const series = [
    { name: 'Week 1', data: [{ x: 'Mon', y: 30 }, { x: 'Tue', y: 40 }, { x: 'Wed', y: 35 }, { x: 'Thu', y: 50 }, { x: 'Fri', y: 49 }] },
    { name: 'Week 2', data: [{ x: 'Mon', y: 23 }, { x: 'Tue', y: 14 }, { x: 'Wed', y: 18 }, { x: 'Thu', y: 45 }, { x: 'Fri', y: 32 }] },
    { name: 'Week 3', data: [{ x: 'Mon', y: 42 }, { x: 'Tue', y: 28 }, { x: 'Wed', y: 36 }, { x: 'Thu', y: 20 }, { x: 'Fri', y: 33 }] },
  ]

  return <Chart options={options} series={series} type="heatmap" height={220} />
}`;

  const rangeBarChartCode = `import { Chart } from 'inc-ui'

export default function RangeBarChart() {
  const options = {
    chart: { toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, horizontal: true } },
    xaxis: { type: 'numeric' },
    colors: ['#6366f1'],
    dataLabels: { enabled: false },
    grid: { borderColor: '#e2e8f0', strokeDashArray: 4 }
  }
  const series = [{
    data: [
      { x: 'Task A', y: [2, 8] },
      { x: 'Task B', y: [4, 12] },
      { x: 'Task C', y: [3, 7] },
      { x: 'Task D', y: [1, 9] },
    ]
  }]

  return <Chart options={options} series={series} type="rangeBar" height={220} />
}`;

  const swimlaneChartCode = `import { Chart } from 'inc-ui'

export default function SwimlaneChart() {
  const options = {
    chart: { toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, horizontal: true, rangeBarGroupRows: true } },
    colors: ['#6366f1', '#8b5cf6', '#a855f7', '#f59e0b'],
    xaxis: { type: 'numeric', min: 0, max: 20, tickAmount: 10 },
    dataLabels: { enabled: false },
    grid: { borderColor: '#e2e8f0', strokeDashArray: 4 }
  }
  const series = [
    {
      name: 'Design',
      data: [
        { x: 'Research', y: [0, 5] },
        { x: 'Wireframe', y: [3, 8] },
        { x: 'Prototype', y: [6, 12] },
      ]
    },
    {
      name: 'Frontend',
      data: [
        { x: 'Setup', y: [2, 7] },
        { x: 'Components', y: [5, 13] },
        { x: 'Integration', y: [11, 16] },
      ]
    },
    {
      name: 'Backend',
      data: [
        { x: 'API Design', y: [1, 6] },
        { x: 'Database', y: [4, 10] },
        { x: 'Deployment', y: [9, 15] },
      ]
    },
    {
      name: 'QA',
      data: [
        { x: 'Testing', y: [8, 14] },
        { x: 'Bug Fixes', y: [12, 17] },
        { x: 'Release', y: [15, 18] },
      ]
    },
  ]

  return <Chart options={options} series={series} type="rangeBar" height={220} />
}`;

  const gridCode = `import { Grid } from 'inc-ui'

export default function DataTable() {
  const data = [
    { id: '1', firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', age: 34, active: true, priority: 'High' },
    { id: '2', firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com', age: 28, active: true, priority: 'Standard' },
    { id: '3', firstName: 'Carol', lastName: 'Williams', email: 'carol@example.com', age: 45, active: false, priority: 'Low' },
    { id: '4', firstName: 'David', lastName: 'Brown', email: 'david@example.com', age: 31, active: true, priority: 'High' },
    { id: '5', firstName: 'Eva', lastName: 'Davis', email: 'eva@example.com', age: 27, active: true, priority: 'Standard' },
    { id: '6', firstName: 'Frank', lastName: 'Miller', email: 'frank@example.com', age: 52, active: false, priority: 'Low' },
    { id: '7', firstName: 'Grace', lastName: 'Wilson', email: 'grace@example.com', age: 39, active: true, priority: 'High' },
    { id: '8', firstName: 'Henry', lastName: 'Moore', email: 'henry@example.com', age: 41, active: true, priority: 'Standard' },
    { id: '9', firstName: 'Irene', lastName: 'Taylor', email: 'irene@example.com', age: 36, active: false, priority: 'High' },
    { id: '10', firstName: 'Jack', lastName: 'Anderson', email: 'jack@example.com', age: 29, active: true, priority: 'Low' },
  ]

  const columns = [
    { key: 'firstName', headerText: 'First Name', sort: true, filter: true, resizable: true },
    { key: 'lastName', headerText: 'Last Name', sort: true, filter: true, resizable: true },
    { key: 'email', headerText: 'Email Address' },
    { key: 'age', headerText: 'Age', type: 'number', sort: true, filter: true },
    { key: 'priority', headerText: 'Priority', sort: true },
    { key: 'active', headerText: 'Active', type: 'boolean' },
  ]

  return <Grid data={data} columns={columns} height={400} />
}`;

  const regionCode = `import { RegionSelect, RegionDisplay, RegionBadge } from 'inc-ui'

export default function CountrySelector() {
  const [code, setCode] = useState("")
  const [region, setRegion] = useState("all")

  return (
    <div className="space-y-4 max-w-md">
      <RegionSelect
        region={region}
        value={code}
        onChange={(code) => setCode(code)}
      />
    </div>
  )
}`

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300 select-none">
      <MessagePrompter />

      <Loading
        open={loadingOpen}
        onOpenChange={setLoadingOpen}
        variant={loadingVariant}
      >
        {loadingText}
      </Loading>

      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-violet-600/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] bg-pink-500/5 dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-border transition-all duration-300">
        <div className="container max-w-7xl h-16 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center space-x-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg glow-primary">
              <Component className="h-5 w-5 animate-pulse" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
              inc-ui
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary border border-border text-secondary-foreground">
              v0.1.0
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-muted-foreground">
            <a href="#overview" className="hover:text-foreground">Overview</a>
            <a href="#buttons" className="hover:text-foreground">Buttons</a>
            <a href="#cards" className="hover:text-foreground">Cards</a>
            <a href="#inputs" className="hover:text-foreground">Inputs</a>
            <a href="#selects" className="hover:text-foreground">Selects</a>
            <a href="#cascader" className="hover:text-foreground">Cascader</a>
            <a href="#calendar" className="hover:text-foreground">Calendar</a>
            <a href="#range-calendar" className="hover:text-foreground">Range</a>
            <a href="#modals" className="hover:text-foreground">Modals</a>
            <a href="#dropdowns" className="hover:text-foreground">Menus</a>
            <a href="#message" className="hover:text-foreground">Message</a>
            <a href="#loading" className="hover:text-foreground">Loading</a>
            <a href="#charts" className="hover:text-foreground">Charts</a>
            <a href="#regions" className="hover:text-foreground">Regions</a>
            <a href="#grid" className="hover:text-foreground">Grid</a>
            <a href="#tree" className="hover:text-foreground">Tree</a>
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              icon
              size="xl"
              className="rounded-full"
              onClick={() => setPlatform(platform === "desktop" ? "mobile" : "desktop")}
              title={`Switch platform (currently: ${platform})`}
            >
              {platform === "desktop" ? <Laptop className="h-6 w-6 text-indigo-500" /> : <Smartphone className="h-6 w-6 text-indigo-500" />}
            </Button>
            <Button
              variant="ghost"
              icon
              size="xl"
              className="rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-6 w-6 text-amber-400" /> : <Moon className="h-6 w-6 text-slate-800" />}
            </Button>
            <Button
              variant="secondary"
              icon
              size="xl"
              asChild
              className="rounded-full"
            >
              <a href="https://github.com/aidanjhou/inc-ui" target="_blank" rel="noreferrer">
                <GithubIcon className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 container max-w-7xl px-4 sm:px-8 py-12 flex flex-col space-y-20">

        {/* Hero Section */}
        <section id="overview" className="flex flex-col items-center text-center space-y-6 pt-8 pb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 animate-spin" />
            <span>Tailwind v3 + shadcn primitives design system</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-3xl leading-[1.1]">
            Build Stunning Interfaces With <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">inc-ui Components</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl font-medium">
            An elegant React UI library providing atomic components, styled layouts, and animations. Customise themes using CSS variables and expand using Tailwind utility tags.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button size="xxl" className="w-full sm:w-auto glow-primary" onClick={(e) => {
              e.preventDefault();
              document.getElementById("buttons")?.scrollIntoView({ behavior: "smooth" });
            }}>
              Explore Components
            </Button>
            <Button variant="secondary" size="xxl" className="w-full sm:w-auto" asChild>
              <a href="https://github.com/aidanjhou/inc-ui" target="_blank" rel="noreferrer">
                <GithubIcon className="mr-2 h-5 w-5" /> GitHub Project
              </a>
            </Button>
          </div>
        </section>

        <hr className="border-border" />

        {/* 4. CHECKBOX SECTION */}
        <section id="checkbox" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Checkbox</h2>
            <p className="text-muted-foreground">A control that allows the user to toggle between checked and not checked.</p>
          </div>

          <CheckboxPlayground />
        </section>

        <hr className="border-border" />

        {/* TREE SECTION */}
        <section id="tree" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Tree (macOS Keyboard Settings Style)</h2>
            <p className="text-muted-foreground">A hierarchical tree component with multi-state checkboxes and shortcut labels, perfect for settings and complex selections.</p>
          </div>

          <TreePlayground />
        </section>

        <hr className="border-border" />

        {/* 5. RADIO SECTION */}
        <section id="radio" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Radio</h2>
            <p className="text-muted-foreground">A set of checkable buttons, known as radio buttons, where no more than one of the buttons can be checked at a time.</p>
          </div>

          <RadioPlayground />
        </section>

        <hr className="border-border" />

        {/* 6. SWITCH SECTION */}
        <section id="switch" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Switch</h2>
            <p className="text-muted-foreground">A control that allows the user to toggle between checked and not checked.</p>
          </div>

          <SwitchPlayground />
        </section>

        <hr className="border-border" />

        {/* 7. BUTTON SECTION */}
        <section id="buttons" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Button</h2>
            <p className="text-muted-foreground">Triggers actions and visual responses with full loading spinner integration.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Component Interactive Preview */}
            <div className="lg:col-span-7 flex flex-col justify-between border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner relative overflow-hidden">
              <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md">
                <Button size="sm" variant={buttonTab === "preview" ? "secondary" : "ghost"} onClick={() => setButtonTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={buttonTab === "code" ? "secondary" : "ghost"} onClick={() => setButtonTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              <div className="flex-1 flex items-center justify-center min-h-[200px]">
                {buttonTab === "preview" ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <Button
                        variant={btnVariant}
                        size={btnSize}
                        loading={btnLoading}
                        disabled={btnDisabled}
                        onClick={() => {
                          message.success("Button clicked!");
                        }}
                      >
                        {!btnLoading && <>
                          <Sparkles className="size-[1em]" />
                        </>}
                        <div>Interactive Action</div>
                      </Button>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        variant={btnVariant}
                        icon
                        size={btnSize}
                        loading={btnLoading}
                        disabled={btnDisabled}
                        onClick={() => {
                          message.success("Button clicked!");
                        }}
                      >
                        {!btnLoading && <>
                          <Sparkles className="size-[1em]" />
                        </>}
                      </Button>
                      <Button
                        variant={btnVariant}
                        icon
                        size={btnSize}
                        className="rounded-full"
                        loading={btnLoading}
                        disabled={btnDisabled}
                        onClick={() => {
                          message.success("Button clicked!");
                        }}
                      >
                        {!btnLoading && <>
                          <Sparkles className="size-[1em]" />
                        </>}
                      </Button>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        variant="none"
                        size={btnSize}
                        className={cn([
                          btnVariant === "primary" ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:opacity-90 transition-opacity" : "",
                          btnVariant === "secondary" ? `
                            border border-transparent bg-background text-primary
                            [background:linear-gradient(hsl(var(--background))_0_0)_padding-box,linear-gradient(to_right,hsl(var(--primary)),hsl(var(--primary)/0.4))_border-box]
                            hover:[background:linear-gradient(hsl(var(--primary)/0.1)_0_0)_padding-box,linear-gradient(hsl(var(--background))_0_0)_padding-box,linear-gradient(to_right,hsl(var(--primary)),hsl(var(--primary)/0.4))_border-box]
                          ` : "",
                          btnVariant === "solid" ? "bg-gradient-to-br from-input to-input/10 text-foreground hover:opacity-70 transition-opacity" : "",
                          btnVariant === "default" ? `
                            border border-transparent bg-background text-foreground
                            [background:linear-gradient(hsl(var(--background))_0_0)_padding-box,linear-gradient(to_right,hsl(var(--input)),hsl(var(--input)/0.1))_border-box]
                            hover:[background:linear-gradient(hsl(var(--foreground)/0.1)_0_0)_padding-box,linear-gradient(hsl(var(--background))_0_0)_padding-box,linear-gradient(to_right,hsl(var(--input)),hsl(var(--input)/0.1))_border-box]
                          ` : "",
                          btnVariant === "destructive" ? "bg-gradient-to-r from-destructive/10 to-destructive/5 text-destructive hover:opacity-70 transition-opacity" : "",
                          btnVariant === "ghost" ? "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-accent hover:to-transparent transition-all" : "",
                          btnVariant === "link" ? "bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent hover:underline decoration-primary underline-offset-4 transition-all" : ""
                        ])}
                      >
                        {!btnLoading && <>
                          <Sparkles className="size-[1em]" />
                        </>}
                        <div>AI Action</div>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full relative">
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                      <code>{buttonCode}</code>
                    </pre>
                    <Button
                      icon
                      variant="ghost"
                      className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(buttonCode, "btn")}
                    >
                      {copiedText === "btn" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Controls Panel */}
            <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col space-y-6 shadow-sm">
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Playground Settings</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Variant</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["primary", "secondary", "solid", "default", "destructive", "ghost", "link"].map((v) => (
                      <Button
                        key={v}
                        size="sm"
                        variant={btnVariant === v ? "primary" : "secondary"}
                        onClick={() => setBtnVariant(v as any)}
                        className="text-xs"
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Size</label>
                  <div className="grid grid-cols-5 gap-2">
                    {["xs", "sm", "default", "lg", "xl", "xxl"].map((s) => (
                      <Button
                        key={s}
                        size="sm"
                        variant={btnSize === s ? "primary" : "secondary"}
                        onClick={() => setBtnSize(s as any)}
                        className="text-xs"
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Modifiers</label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={btnLoading}
                        onChange={(e) => setBtnLoading(e.target.checked)}
                        className="rounded border-input text-primary focus:ring-ring h-4 w-4"
                      />
                      <span>Loading State</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={btnDisabled}
                        onChange={(e) => setBtnDisabled(e.target.checked)}
                        className="rounded border-input text-primary focus:ring-ring h-4 w-4"
                      />
                      <span>Disabled</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Link as Button demo */}
          <div className="border border-border bg-card/40 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[120px] shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild variant="primary">
                <a href="https://github.com/aidanjhou/inc-ui" target="_blank" rel="noreferrer">
                  <GithubIcon className="h-4 w-4" /> Primary Link
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href="https://github.com/aidanjhou/inc-ui" target="_blank" rel="noreferrer">
                  <GithubIcon className="h-4 w-4" /> Secondary Link
                </a>
              </Button>
              <Button asChild variant="link">
                <a href="https://github.com/aidanjhou/inc-ui" target="_blank" rel="noreferrer">
                  Text Link
                </a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4 font-medium">Use <code className="text-xs font-mono">asChild</code> to render as any HTML element.</p>
          </div>

          {/* API Reference */}
          <div className="lg:col-span-12 border border-border bg-card rounded-2xl p-6 flex flex-col justify-between shadow-sm select-text">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">API Reference</h3>
                <div className="space-y-4">
                  <div>
                    <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;Button variant size icon loading disabled asChild className&gt;children&lt;/Button&gt;</code>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">A React component wrapping <code className="text-xs font-mono">react-aria-components/Button</code>. Built with CVA variant props for consistent styling.</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/40 pt-4">
                <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Button Props</h4>
                <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">variant</code>: "primary" | "secondary" | "solid" | "default" | "destructive" | "ghost" | "link" (default: "default")</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">size</code>: "xs" | "sm" | "default" | "lg" | "xl" | "xxl" (default: "default")</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">icon</code>: boolean</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">loading</code>: boolean — shows animated spinner, disables interaction</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">disabled</code>: boolean</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">asChild</code>: boolean — renders as a child element via Radix Slot, merges styles into it</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">className</code>: string — Tailwind classes via cn()</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* 2. CARD SECTION */}
        <section id="cards" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Card</h2>
            <p className="text-muted-foreground">Containers for widgets, graphs, metrics, and structured content with glassmorphism controls.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Preview */}
            <div className="lg:col-span-7 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col justify-center items-center relative min-h-[350px]">
              <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md">
                <Button size="sm" variant={cardTab === "preview" ? "secondary" : "ghost"} onClick={() => setCardTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={cardTab === "code" ? "secondary" : "ghost"} onClick={() => setCardTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              {cardTab === "preview" ? (
                <Card glass={cardGlass} hoverable={cardHoverable} className="w-full max-w-md shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold">Sales Metrics</CardTitle>
                      <span className="p-1.5 bg-indigo-500/10 rounded text-indigo-500">
                        <Sparkles className="h-4 w-4" />
                      </span>
                    </div>
                    <CardDescription>Live revenue stream generated today.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-4xl font-extrabold tracking-tight">$14,240.85</div>
                    <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full w-max">
                      <span>+14.2% today</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t border-border/30 pt-4 mt-2">
                    <span className="text-xs text-muted-foreground font-medium">Synced 2m ago</span>
                    <Button variant="secondary" size="sm">Manage Stream</Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="w-full relative">
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                    <code>{cardCode}</code>
                  </pre>
                  <Button
                    icon
                    variant="ghost"
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                    onClick={() => copyToClipboard(cardCode, "card")}
                  >
                    {copiedText === "card" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col space-y-6 shadow-sm">
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Playground Settings</h3>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                  <div className="space-y-0.5">
                    <span className="font-bold text-sm block">Glassmorphism Overlay</span>
                    <span className="text-xs text-muted-foreground">Blurs components into the canvas background</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={cardGlass}
                    onChange={(e) => setCardGlass(e.target.checked)}
                    className="rounded border-input text-primary focus:ring-ring h-4 w-4"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                  <div className="space-y-0.5">
                    <span className="font-bold text-sm block">Hover Scale Effect</span>
                    <span className="text-xs text-muted-foreground">Slightly elevates cards on mouse pointer hover</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={cardHoverable}
                    onChange={(e) => setCardHoverable(e.target.checked)}
                    className="rounded border-input text-primary focus:ring-ring h-4 w-4"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* API Reference */}
          <div className="lg:col-span-12 border border-border bg-card rounded-2xl p-6 flex flex-col justify-between shadow-sm select-text">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">API Reference</h3>
                <div className="space-y-4">
                  <div>
                    <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;Card glass hoverable&gt;&lt;CardHeader&gt;...&lt;/CardHeader&gt;&lt;CardContent&gt;...&lt;/CardContent&gt;&lt;CardFooter&gt;...&lt;/CardFooter&gt;&lt;/Card&gt;</code>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">A composite card container with optional glassmorphism and hover effects. Built as a set of compound components.</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/40 pt-4">
                <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Card Props</h4>
                <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">glass</code>: boolean — enables glassmorphism backdrop blur</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">hoverable</code>: boolean — enables hover translate-y and shadow effects</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">className</code>: string — Tailwind classes via cn()</span></li>
                </ul>
              </div>

              <div className="border-t border-border/40 pt-4">
                <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Card Sub-components</h4>
                <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">CardHeader</code> — container with flex column layout + padding</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">CardTitle</code> — heading text (2xl, font-semibold)</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">CardDescription</code> — secondary text below title</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">CardContent</code> — main content area with p-6 pt-0</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">CardFooter</code> — flex row with p-6 pt-0</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* 3. INPUT SECTION */}
        <section id="inputs" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Input</h2>
            <p className="text-muted-foreground">Accepts alphanumeric inputs with clear accessibility states.</p>
          </div>

          <InputPlayground />

          {/* API Reference */}
          <div className="lg:col-span-12 border border-border bg-card rounded-2xl p-6 flex flex-col justify-between shadow-sm select-text">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">API Reference</h3>
                <div className="space-y-4">
                  <div>
                    <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;Input placeholder value onChange disabled /&gt;</code>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">A styled input field extending native <code className="text-xs font-mono">&lt;input&gt;</code> with full ARIA support and Tailwind theming.</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/40 pt-4">
                <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Input Props</h4>
                <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">placeholder</code>: string</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">value</code>: string — controlled value</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">onChange</code>: (e: ChangeEvent) =&gt; void</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">disabled</code>: boolean</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">type</code>: string — HTML input type (default: "text")</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">className</code>: string — Tailwind classes via cn()</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">...native props</code>: All standard HTML input attributes are supported</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* 3.5. SELECT SECTION */}
        <section id="selects" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Select</h2>
            <p className="text-muted-foreground">Premium select dropdown component supporting 5 responsive variants.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Preview */}
            <div className="lg:col-span-7 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col justify-between relative min-h-[300px]">
              <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md z-10">
                <Button size="sm" variant={selectTab === "preview" ? "secondary" : "ghost"} onClick={() => setSelectTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={selectTab === "code" ? "secondary" : "ghost"} onClick={() => setSelectTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              <div className="flex-1 flex items-center justify-center min-h-[200px] w-full">
                {selectTab === "preview" ? (
                  <div className="w-full max-w-xs space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Choose framework (Default Keys: label/value)</label>
                      <Select
                        options={selectOptions}
                        placeholder="Select framework..."
                        size={selectSize}
                        variant={selectVariant || undefined}
                        value={selectValue}
                        align={selectAlign === "auto" ? undefined : selectAlign}
                        onChange={(value, option) => {
                          setSelectValue(value);
                          message.info(`Value: "${value}" (type: ${typeof option.value}), Extra: "${option.other || "none"}"`);
                        }}
                        label="Choose Framework"
                      />
                      {selectValue && (
                        <p className="text-xs text-muted-foreground font-semibold mt-1.5">Selected Value: <span className="text-primary font-bold">{selectValue}</span></p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-border/40">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Choose language (Custom Keys: name/id)</label>
                      <Select
                        options={[
                          { name: "JavaScript", id: "js" },
                          { name: "TypeScript", id: "ts" },
                          { name: "Rust", id: "rs" }
                        ]}
                        optionLabelKey="name"
                        optionValueKey="id"
                        placeholder="Select language..."
                        size={selectSize}
                        variant={selectVariant || undefined}
                        align={selectAlign === "auto" ? undefined : selectAlign}
                        onChange={(value, option) => {
                          message.info(`Value: "${value}" (Custom id), Name: "${option.name}"`);
                        }}
                        label="Choose Language"
                      />
                    </div>

                    <div className="pt-2 border-t border-border/40">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Large options list (101 items)</label>
                      <Select
                        options={manyOptions}
                        placeholder="Select an option (101 items)..."
                        size={selectSize}
                        variant={selectVariant || undefined}
                        value={selectManyValue}
                        align={selectAlign === "auto" ? undefined : selectAlign}
                        onChange={(value, option) => {
                          setSelectManyValue(value);
                          message.info(`Selected: ${option.label} (Value: ${value})`);
                        }}
                        label="Choose from 101 Options"
                      />
                      {selectManyValue && (
                        <p className="text-xs text-muted-foreground font-semibold mt-1.5">Selected Option: <span className="text-primary font-bold">{selectManyValue}</span></p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-border/40">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Empty options list (0 items)</label>
                      <Select
                        options={[]}
                        placeholder="Select an option (0 items)..."
                        size={selectSize}
                        variant={selectVariant || undefined}
                        align={selectAlign === "auto" ? undefined : selectAlign}
                        onChange={(value) => {
                          message.info(`Value: "${value}"`);
                        }}
                        label="Empty Options"
                      />
                    </div>

                    <div className="pt-2 border-t border-border/40">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Custom Translations (Demonstrates external Japanese completion)</label>
                      <Select
                        options={[
                          { label: "リンゴ (Apple)", value: "apple" },
                          { label: "バナナ (Banana)", value: "banana" },
                          { label: "オレンジ (Orange)", value: "orange" }
                        ]}
                        placeholder="Please choose..."
                        size={selectSize}
                        variant={selectVariant || undefined}
                        value={selectJaValue}
                        align={selectAlign === "auto" ? undefined : selectAlign}
                        onChange={(value, option) => {
                          setSelectJaValue(value);
                          message.info(`Selected: ${option.label} (Value: ${value})`);
                        }}
                        translations={{
                          ja: {
                            cancel: "取消",
                            done: "完了",
                            placeholder: "選択してください...",
                            noData: "データなし"
                          }
                        }}
                        label="Custom Translations"
                      />
                      {selectJaValue && (
                        <p className="text-xs text-muted-foreground font-semibold mt-1.5">Selected Japanese Option: <span className="text-primary font-bold">{selectJaValue}</span></p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-border/40">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Custom renderContent (Color Grid Demo)</label>
                      <Select
                        placeholder="Custom color grid..."
                        size={selectSize}
                        variant={selectVariant || undefined}
                        value={selectCustomValue}
                        align={selectAlign === "auto" ? undefined : selectAlign}
                        onChange={(value) => {
                          setSelectCustomValue(value);
                          message.info(`You selected: ${value}`);
                        }}
                        label="Custom Color Grid"
                        renderContent={({ value: activeValue, onChange, close }) => {
                          const colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "indigo", "teal"];
                          return (
                            <div className="p-3 grid grid-cols-3 gap-2">
                              {colors.map((c) => (
                                <button
                                  key={c}
                                  style={{ backgroundColor: c }}
                                  className={`w-8 h-8 rounded-full border border-border transition-all ${activeValue === c ? "ring-2 ring-primary scale-110" : "hover:scale-105"}`}
                                  onClick={() => {
                                    onChange(c);
                                    close();
                                  }}
                                />
                              ))}
                            </div>
                          );
                        }}
                      />
                      {selectCustomValue && (
                        <p className="text-xs text-muted-foreground font-semibold mt-1.5 flex items-center gap-1.5">
                          Selected Color:{" "}
                          <span
                            className="inline-block w-3 h-3 rounded-full border border-border"
                            style={{ backgroundColor: selectCustomValue }}
                          />{" "}
                          <span className="text-primary font-bold">{selectCustomValue}</span>
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-border/40">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">DatetimeSelect (Pure Date & Time selector)</label>
                      <DatetimeSelect
                        placeholder="Select date and time..."
                        size={selectSize}
                        variant={selectVariant || undefined}
                        value={datetimeValue}
                        align={selectAlign === "auto" ? undefined : selectAlign}
                        onChange={(val) => {
                          setDatetimeValue(val);
                          message.info(`You selected: ${val}`);
                        }}
                        label="Datetime Picker"
                      />
                      {datetimeValue && (
                        <p className="text-xs text-muted-foreground font-semibold mt-1.5">Selected Datetime: <span className="text-primary font-bold">{datetimeValue}</span></p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="w-full relative">
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                      <code>{selectCode}</code>
                    </pre>
                    <Button
                      icon
                      variant="ghost"
                      className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(selectCode, "select")}
                    >
                      {copiedText === "select" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col space-y-6 shadow-sm">
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Playground Settings</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Variant</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant={selectVariant === null ? "primary" : "secondary"}
                      onClick={() => setSelectVariant(null)}
                      className="text-xs w-full"
                    >
                      Default ({platform === "mobile" ? "picker" : "dropdown"})
                    </Button>
                    {(["dropdown", "picker", "action-sheet", "bottom-modal", "center-modal"] as const).map((v) => (
                      <Button
                        key={v}
                        size="sm"
                        variant={selectVariant === v ? "primary" : "secondary"}
                        onClick={() => setSelectVariant(v)}
                        className="text-xs w-full"
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Size</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["xs", "sm", "default", "lg", "xl", "xxl"] as const).map((s) => (
                      <Button
                        key={s}
                        size="sm"
                        variant={selectSize === s ? "primary" : "secondary"}
                        onClick={() => setSelectSize(s)}
                        className="text-xs w-full"
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Dropdown Alignment</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["auto", "start", "end"] as const).map((a) => (
                      <Button
                        key={a}
                        size="sm"
                        variant={selectAlign === a ? "primary" : "secondary"}
                        onClick={() => setSelectAlign(a)}
                        className="text-xs w-full"
                      >
                        {a === "auto" ? "Auto (Dynamic)" : a}
                      </Button>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-normal mt-1">
                    Auto alignment checks screen space dynamically: left-aligned if it fits, right-aligned otherwise.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Platform</label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={platform === "desktop" ? "primary" : "secondary"}
                      onClick={() => setPlatform("desktop")}
                      className="flex-1 text-xs"
                    >
                      <Laptop className="h-3.5 w-3.5 mr-1" /> Desktop
                    </Button>
                    <Button
                      size="sm"
                      variant={platform === "mobile" ? "primary" : "secondary"}
                      onClick={() => setPlatform("mobile")}
                      className="flex-1 text-xs"
                    >
                      <Smartphone className="h-3.5 w-3.5 mr-1" /> Mobile
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-normal mt-1">
                    Changing the platform changes the default Select behavior (desktop defaults to <strong>dropdown</strong>, mobile defaults to <strong>picker</strong>).
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Language</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["en-US", "zh-CN", "zh-TW", "ja-JP"] as const).map((lang) => (
                      <Button
                        key={lang}
                        size="sm"
                        variant={language === lang ? "primary" : "secondary"}
                        onClick={() => setLanguage(lang)}
                        className="text-xs w-full"
                      >
                        {lang}
                      </Button>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-normal mt-1">
                    Changing the active language updates the placeholders, button actions, and empty states inside the Select components dynamically.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* API Reference */}
          <div className="lg:col-span-12 border border-border bg-card rounded-2xl p-6 flex flex-col justify-between shadow-sm select-text">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">API Reference</h3>
                <div className="space-y-4">
                  <div>
                    <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;Select options placeholder variant value onChange /&gt;</code>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">A versatile select component supporting 5 display variants (dropdown, picker, action-sheet, bottom-modal, center-modal), search, custom content rendering, and multi-language translations.</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/40 pt-4">
                <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Select Props</h4>
                <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">options</code>: SelectOption[] — array of options with label/value</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">variant</code>: "dropdown" | "picker" | "action-sheet" | "bottom-modal" | "center-modal"</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">size</code>: "xs" | "sm" | "default" | "lg" | "xl" | "xxl" (default: "default")</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">value</code>: string — controlled selected value</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">onChange</code>: (value: string, option: SelectOption) =&gt; void</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">optionLabelKey</code>: string — custom label key (default: "label")</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">optionValueKey</code>: string — custom value key (default: "value")</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">placeholder</code>: string</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">renderContent</code>: (context) =&gt; ReactNode — custom content renderer</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">translations</code>: Record&lt;string, Partial&lt;SelectTranslations&gt;&gt; — custom i18n</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">disabled</code>: boolean</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">showSearch</code>: "always" | "auto" | "none" (default: "auto")</span></li>
                  <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">align</code>: "start" | "center" | "end" — dropdown alignment</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* 3.6. CASCADER SELECT SECTION */}
        <section id="cascader" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">CascaderSelect</h2>
            <p className="text-muted-foreground">Select from a hierarchical set of options with multi-level dropdowns.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Preview */}
            <div className="lg:col-span-7 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col justify-between relative min-h-[300px]">
              <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md z-10">
                <Button size="sm" variant={cascaderTab === "preview" ? "secondary" : "ghost"} onClick={() => setCascaderTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={cascaderTab === "code" ? "secondary" : "ghost"} onClick={() => setCascaderTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              <div className="flex-1 flex items-center justify-center min-h-[200px] w-full">
                {cascaderTab === "preview" ? (
                  <div className="w-full max-w-xs space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Hierarchical Select</label>
                      <CascaderSelect
                        options={cascaderOptions}
                        placeholder="Select technology..."
                        variant={cascaderVariant || undefined}
                        size={cascaderSize}
                        value={cascaderValue}
                        align={cascaderAlign === "auto" ? undefined : cascaderAlign}
                        onChange={(val) => {
                          setCascaderValue(String(val));
                          message.info(`You selected: ${val}`);
                        }}
                        label="Technology Picker"
                      />
                      {cascaderValue && (
                        <p className="text-xs text-muted-foreground font-semibold mt-1.5">Selected Value: <span className="text-primary font-bold">{cascaderValue}</span></p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="w-full relative">
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                      <code>{cascaderCode}</code>
                    </pre>
                    <Button
                      icon
                      variant="ghost"
                      className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(cascaderCode, "cascader")}
                    >
                      {copiedText === "cascader" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col space-y-6 shadow-sm">
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Playground Settings</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cascader Variant</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant={cascaderVariant === null ? "primary" : "secondary"}
                      onClick={() => setCascaderVariant(null)}
                      className="text-xs w-full"
                    >
                      Default ({platform === "mobile" ? "picker" : "dropdown"})
                    </Button>
                    {(["dropdown", "picker", "action-sheet", "bottom-modal", "center-modal"] as const).map((v) => (
                      <Button
                        key={v}
                        size="sm"
                        variant={cascaderVariant === v ? "primary" : "secondary"}
                        onClick={() => setCascaderVariant(v)}
                        className="text-xs w-full"
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cascader Size</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["xs", "sm", "default", "lg", "xl", "xxl"] as const).map((s) => (
                      <Button
                        key={s}
                        size="sm"
                        variant={cascaderSize === s ? "primary" : "secondary"}
                        onClick={() => setCascaderSize(s)}
                        className="text-xs w-full"
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Dropdown Alignment</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["auto", "start", "end"] as const).map((a) => (
                      <Button
                        key={a}
                        size="sm"
                        variant={cascaderAlign === a ? "primary" : "secondary"}
                        onClick={() => setCascaderAlign(a)}
                        className="text-xs w-full"
                      >
                        {a === "auto" ? "Auto" : a}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* 3.7. CALENDAR SECTION */}
        <section id="calendar" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
            <p className="text-muted-foreground">Pure date selection calendar with month navigation and dropdown selector.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Preview */}
            <div className="lg:col-span-7 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col justify-between relative min-h-[300px]">
              <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md z-10">
                <Button size="sm" variant={calendarTab === "preview" ? "secondary" : "ghost"} onClick={() => setCalendarTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={calendarTab === "code" ? "secondary" : "ghost"} onClick={() => setCalendarTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              <div className="flex-1 flex items-center justify-center min-h-[200px] w-full">
                {calendarTab === "preview" ? (
                  <div className="w-full max-w-xs space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Calendar (Standalone)</label>
                      <div className="border border-border rounded-xl p-3 bg-card shadow-sm">
                        <Calendar
                          value={calendarValue}
                          onChange={(val) => {
                            setCalendarValue(val);
                            message.info(`Selected date: ${val}`);
                          }}
                        />
                      </div>
                      {calendarValue && (
                        <p className="text-xs text-muted-foreground font-semibold mt-1.5">Selected: <span className="text-primary font-bold">{calendarValue}</span></p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-border/40">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">CalendarSelect (Date picker dropdown)</label>
                      <CalendarSelect
                        placeholder="Pick a date..."
                        variant={calendarVariant || undefined}
                        value={calendarSelectValue}
                        align={calendarAlign === "auto" ? undefined : calendarAlign}
                        onChange={(val) => {
                          setCalendarSelectValue(val);
                          message.info(`You selected: ${val}`);
                        }}
                        label="Date Picker"
                      />
                      {calendarSelectValue && (
                        <p className="text-xs text-muted-foreground font-semibold mt-1.5">Selected Date: <span className="text-primary font-bold">{calendarSelectValue}</span></p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="w-full relative">
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                      <code>{`import { Calendar, CalendarSelect } from "inc-ui"

// Standalone Calendar (controlled)
<Calendar
  value={value}
  onChange={(val) => console.log(val)}
/>

// Standalone Calendar (uncontrolled with default)
<Calendar
  defaultValue={String(new Date().getTime())}
  onChange={(val) => console.log(val)}
/>

// CalendarSelect (dropdown date picker)
<CalendarSelect
  placeholder="Pick a date..."
  value={value}
  variant="dropdown"
  align="start"
  onChange={(val) => console.log(val)}
/>`}</code>
                    </pre>
                    <Button
                      icon
                      variant="ghost"
                      className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(`import { Calendar, CalendarSelect } from "inc-ui"\n\n// Standalone Calendar (controlled)\n<Calendar\n  value={value}\n  onChange={(val) => console.log(val)}\n/>\n\n// Standalone Calendar (uncontrolled with default)\n<Calendar\n  defaultValue={String(new Date().getTime())}\n  onChange={(val) => console.log(val)}\n/>\n\n// CalendarSelect (dropdown date picker)\n<CalendarSelect\n  placeholder="Pick a date..."\n  value={value}\n  variant="dropdown"\n  align="start"\n  onChange={(val) => console.log(val)}\n/>`, "calendar")}
                    >
                      {copiedText === "calendar" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Controls + API Reference */}
            <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col space-y-6 shadow-sm">
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Playground Settings</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">CalendarSelect Variant</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant={calendarVariant === null ? "primary" : "secondary"}
                      onClick={() => setCalendarVariant(null)}
                      className="text-xs w-full"
                    >
                      Default ({platform === "mobile" ? "picker" : "dropdown"})
                    </Button>
                    {(["dropdown", "picker", "action-sheet", "bottom-modal", "center-modal"] as const).map((v) => (
                      <Button
                        key={v}
                        size="sm"
                        variant={calendarVariant === v ? "primary" : "secondary"}
                        onClick={() => setCalendarVariant(v)}
                        className="text-xs w-full"
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Dropdown Alignment</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["auto", "start", "end"] as const).map((a) => (
                      <Button
                        key={a}
                        size="sm"
                        variant={calendarAlign === a ? "primary" : "secondary"}
                        onClick={() => setCalendarAlign(a)}
                        className="text-xs w-full"
                      >
                        {a === "auto" ? "Auto (Dynamic)" : a}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6 mt-auto">
                <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-3">API Reference</h4>
                <div className="space-y-4">
                  <div>
                    <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;Calendar value onChange /&gt;</code>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">Pure calendar with month navigation. Supports controlled/uncontrolled.</p>
                    <ul className="mt-2 space-y-1 text-xs font-semibold text-muted-foreground">
                      <li className="flex items-start"><CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">value</code>: string — ms timestamp</span></li>
                      <li className="flex items-start"><CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">defaultValue</code>: string — initial value</span></li>
                      <li className="flex items-start"><CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">onChange</code>: (value: string) =&gt; void</span></li>
                      <li className="flex items-start"><CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">className</code>: string</span></li>
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-border/40">
                    <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;CalendarSelect placeholder variant value onChange /&gt;</code>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">Date picker dropdown combining Select with Calendar.</p>
                    <ul className="mt-2 space-y-1 text-xs font-semibold text-muted-foreground">
                      <li className="flex items-start"><CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">variant</code>: 5 display variants</span></li>
                      <li className="flex items-start"><CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">placeholder</code>: string</span></li>
                      <li className="flex items-start"><CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">align</code>: "start" | "center" | "end"</span></li>
                      <li className="flex items-start"><CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">disabled</code>: boolean</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* 3.7. RANGE CALENDAR SECTION */}
        <section id="range-calendar" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">RangeCalendar</h2>
            <p className="text-muted-foreground">Range date selection calendar with month navigation and dropdown selector.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Preview */}
            <div className="lg:col-span-7 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col justify-between relative min-h-[300px]">
              <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md z-10">
                <Button size="sm" variant={rangeCalendarTab === "preview" ? "secondary" : "ghost"} onClick={() => setRangeCalendarTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={rangeCalendarTab === "code" ? "secondary" : "ghost"} onClick={() => setRangeCalendarTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              <div className="flex-1 flex items-center justify-center min-h-[200px] w-full">
                {rangeCalendarTab === "preview" ? (
                  <div className="w-full max-w-xs space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">RangeCalendar (Standalone)</label>
                      <div className="border border-border rounded-xl p-3 bg-card shadow-sm">
                        <RangeCalendar
                          value={rangeCalendarValue}
                          onChange={(val) => {
                            setRangeCalendarValue(val);
                            message.info(`Selected range: ${val}`);
                          }}
                        />
                      </div>
                      {rangeCalendarValue && (
                        <p className="text-xs text-muted-foreground font-semibold mt-1.5">Range: <span className="text-primary font-bold">{rangeCalendarValue}</span></p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-border/40">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">RangeCalendarSelect (Range picker dropdown)</label>
                      <RangeCalendarSelect
                        placeholder="Pick a date range..."
                        variant={rangeCalendarVariant || undefined}
                        value={rangeCalendarSelectValue}
                        align={rangeCalendarAlign === "auto" ? undefined : rangeCalendarAlign}
                        onChange={(val) => {
                          setRangeCalendarSelectValue(val);
                          message.info(`You selected range: ${val}`);
                        }}
                        label="Date Range Picker"
                      />
                      {rangeCalendarSelectValue && (
                        <p className="text-xs text-muted-foreground font-semibold mt-1.5">Selected Range: <span className="text-primary font-bold">{rangeCalendarSelectValue}</span></p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="w-full relative">
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                      <code>{`import { RangeCalendar, RangeCalendarSelect, formatDateRange } from "inc-ui"

// Standalone RangeCalendar (controlled)
<RangeCalendar
  value={value}
  onChange={(val) => console.log(val)}
/>

// Standalone RangeCalendar (uncontrolled with default)
<RangeCalendar
  defaultValue={\`\${startTs},\${endTs}\`}
  onChange={(val) => console.log(val)}
/>

// RangeCalendarSelect (dropdown range date picker)
<RangeCalendarSelect
  placeholder="Pick a date range..."
  value={value}
  variant="dropdown"
  align="start"
  onChange={(val) => console.log(val)}
/>

// Format range for display
formatDateRange(value) // => "2024-06-18 - 2024-06-25"`}</code>
                    </pre>
                    <Button
                      icon
                      variant="ghost"
                      className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(`import { RangeCalendar, RangeCalendarSelect, formatDateRange } from "inc-ui"\n\n// Standalone RangeCalendar (controlled)\n<RangeCalendar\n  value={value}\n  onChange={(val) => console.log(val)}\n/>\n\n// Standalone RangeCalendar (uncontrolled with default)\n<RangeCalendar\n  defaultValue={\`\${startTs},\${endTs}\`}\n  onChange={(val) => console.log(val)}\n/>\n\n// RangeCalendarSelect (dropdown range date picker)\n<RangeCalendarSelect\n  placeholder="Pick a date range..."\n  value={value}\n  variant="dropdown"\n  align="start"\n  onChange={(val) => console.log(val)}\n/>\n\n// Format range for display\nformatDateRange(value) // => "2024-06-18 - 2024-06-25"`, "rangeCalendar")}
                    >
                      {copiedText === "rangeCalendar" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Controls + API Reference */}
            <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col space-y-6 shadow-sm">
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Playground Settings</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">RangeCalendarSelect Variant</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant={rangeCalendarVariant === null ? "primary" : "secondary"}
                      onClick={() => setRangeCalendarVariant(null)}
                      className="text-xs w-full"
                    >
                      Default ({platform === "mobile" ? "picker" : "dropdown"})
                    </Button>
                    {(["dropdown", "picker", "action-sheet", "bottom-modal", "center-modal"] as const).map((v) => (
                      <Button
                        key={v}
                        size="sm"
                        variant={rangeCalendarVariant === v ? "primary" : "secondary"}
                        onClick={() => setRangeCalendarVariant(v)}
                        className="text-xs w-full"
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Dropdown Alignment</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["auto", "start", "end"] as const).map((a) => (
                      <Button
                        key={a}
                        size="sm"
                        variant={rangeCalendarAlign === a ? "primary" : "secondary"}
                        onClick={() => setRangeCalendarAlign(a)}
                        className="text-xs w-full"
                      >
                        {a === "auto" ? "Auto (Dynamic)" : a}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6 mt-auto">
                <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-3">API Reference</h4>
                <div className="space-y-4">
                  <div>
                    <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;RangeCalendar value onChange /&gt;</code>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">Range calendar with month navigation and anchor-based selection.</p>
                    <ul className="mt-2 space-y-1 text-xs font-semibold text-muted-foreground">
                      <li className="flex items-start"><CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">value</code>: string — "startTs,endTs"</span></li>
                      <li className="flex items-start"><CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">defaultValue</code>: string — initial range</span></li>
                      <li className="flex items-start"><CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">onChange</code>: (value: string) =&gt; void</span></li>
                      <li className="flex items-start"><CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">className</code>: string</span></li>
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-border/40">
                    <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;RangeCalendarSelect placeholder variant value onChange /&gt;</code>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">Range date picker dropdown combining Select with RangeCalendar.</p>
                    <ul className="mt-2 space-y-1 text-xs font-semibold text-muted-foreground">
                      <li className="flex items-start"><CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">variant</code>: 5 display variants</span></li>
                      <li className="flex items-start"><CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">placeholder</code>: string</span></li>
                      <li className="flex items-start"><CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">align</code>: "start" | "center" | "end"</span></li>
                      <li className="flex items-start"><CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">disabled</code>: boolean</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* 4. DIALOG / MODAL SECTION */}
        <section id="modals" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Dialog (Modal)</h2>
            <p className="text-muted-foreground">Overlay dialogs popping over the canvas with smooth animation and blurs.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Preview */}
            <div className="lg:col-span-7 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col justify-center items-center relative min-h-[250px]">
              <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md">
                <Button size="sm" variant={modalTab === "preview" ? "secondary" : "ghost"} onClick={() => setModalTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={modalTab === "code" ? "secondary" : "ghost"} onClick={() => setModalTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              {modalTab === "preview" ? (
                <div className="flex flex-col items-center space-y-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="glow-primary">Edit Account Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="name" className="text-right text-sm font-semibold">
                            Name
                          </label>
                          <Input id="name" defaultValue="Aidan Zhou" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="email" className="text-right text-sm font-semibold">
                            Email
                          </label>
                          <Input id="email" type="email" defaultValue="aidan@inc-ui.io" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button type="submit" onClick={() => {
                            message.success("Account credentials changed successfully.");
                          }}>Save changes</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <p className="text-xs text-muted-foreground font-medium">Triggers modal overlay with backdrop filter blur.</p>
                </div>
              ) : (
                <div className="w-full relative">
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                    <code>{dialogCode}</code>
                  </pre>
                  <Button
                    icon
                    variant="ghost"
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                    onClick={() => copyToClipboard(dialogCode, "dialog")}
                  >
                    {copiedText === "dialog" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>

            {/* API Reference */}
            <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col justify-between shadow-sm select-text">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">API Reference</h3>
                  <div className="space-y-4">
                    <div>
                      <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;Dialog open onOpenChange&gt;&lt;DialogTrigger&gt;...&lt;/DialogTrigger&gt;&lt;DialogContent&gt;...&lt;/DialogContent&gt;&lt;/Dialog&gt;</code>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">Modal dialog built on Adobe React ARIA <code className="text-xs font-mono">ModalOverlay</code> + <code className="text-xs font-mono">Modal</code> + <code className="text-xs font-mono">Dialog</code> with focus trapping and animation.</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Dialog Props</h4>
                  <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">open</code>: boolean — controlled open state</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">defaultOpen</code>: boolean — initial open state</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">onOpenChange</code>: (open: boolean) =&gt; void</span></li>
                  </ul>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Dialog Sub-components</h4>
                  <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">DialogTrigger</code> — clones child with onClick to open</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">DialogContent</code> — modal overlay + content + close button</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">DialogHeader</code> — flex column header layout</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">DialogTitle</code> — ARIA heading with slot="title"</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">DialogDescription</code> — secondary text content</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">DialogFooter</code> — flex row-reverse on mobile, row on desktop</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">DialogClose</code> — clones child with onClick to close</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* 5. DROPDOWN MENU SECTION */}
        <section id="dropdowns" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Dropdown Menu</h2>
            <p className="text-muted-foreground">Clean popovers representing item lists or contextual dropdown options.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Preview */}
            <div className="lg:col-span-7 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col justify-center items-center relative min-h-[250px]">
              <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md">
                <Button size="sm" variant={dropdownTab === "preview" ? "secondary" : "ghost"} onClick={() => setDropdownTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={dropdownTab === "code" ? "secondary" : "ghost"} onClick={() => setDropdownTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              {dropdownTab === "preview" ? (
                <div className="flex flex-col items-center space-y-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary">Options Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => {
                          message.info("Redirecting to your user page.");
                        }}>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          message.info("Loading developer config panel.");
                        }}>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive" onClick={() => {
                        message.success("Session terminated successfully.");
                      }}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <p className="text-xs text-muted-foreground font-medium">Click to show actions list with shortcuts.</p>
                </div>
              ) : (
                <div className="w-full relative">
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                    <code>{dropdownCode}</code>
                  </pre>
                  <Button
                    icon
                    variant="ghost"
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                    onClick={() => copyToClipboard(dropdownCode, "dropdown")}
                  >
                    {copiedText === "dropdown" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>

            {/* API Reference */}
            <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col justify-between shadow-sm select-text">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">API Reference</h3>
                  <div className="space-y-4">
                    <div>
                      <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;DropdownMenu&gt;&lt;DropdownMenuTrigger&gt;...&lt;/DropdownMenuTrigger&gt;&lt;DropdownMenuContent&gt;...&lt;/DropdownMenuContent&gt;&lt;/DropdownMenu&gt;</code>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">A popover menu built on Adobe React ARIA <code className="text-xs font-mono">MenuTrigger</code> + <code className="text-xs font-mono">Popover</code> + <code className="text-xs font-mono">Menu</code> with keyboard navigation support.</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">DropdownMenu Props</h4>
                  <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">open</code>: boolean — controlled open state</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">defaultOpen</code>: boolean</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">onOpenChange</code>: (open: boolean) =&gt; void</span></li>
                  </ul>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">DropdownMenu Sub-components</h4>
                  <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">DropdownMenuTrigger</code> — wraps trigger element</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">DropdownMenuContent</code> — popover panel with items</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">DropdownMenuItem</code> — clickable action item</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">DropdownMenuSeparator</code> — horizontal divider</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">DropdownMenuLabel</code> — section heading label</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">DropdownMenuGroup</code> — groups related items</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">DropdownMenuShortcut</code> — keyboard shortcut label</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">DropdownMenuCheckboxItem</code> — checkbox menu item</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">DropdownMenuRadioItem</code> — radio menu item</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">DropdownMenuSub</code> — nested submenu trigger</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* 6. MESSAGE SECTION */}
        <section id="message" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Message (Global Prompts)</h2>
            <p className="text-muted-foreground">Display global dynamic prompts at the top center of the screen.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Preview */}
            <div className="lg:col-span-12 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col justify-start items-center relative gap-6">
              <div className="flex space-x-1 bg-muted/50 p-1 rounded-md">
                <Button size="sm" variant={messageTab === "preview" ? "secondary" : "ghost"} onClick={() => setMessageTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={messageTab === "code" ? "secondary" : "ghost"} onClick={() => setMessageTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              {messageTab === "preview" ? (
                <div className="space-y-4 w-full">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        message("Copied to clipboard.");
                      }}
                      className="border-border hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-2">
                        None Message
                      </div>
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() => {
                        message.success("Profile updated.", {
                          description: "Your changes have been saved successfully.",
                          duration: 3
                        });
                      }}
                      className="border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-500"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-emerald-500" /> Success Message
                      </div>
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() => {
                        message.warning("Storage almost full.", {
                          description: "Repository storage reaches 89% capacity.",
                          duration: 3
                        });
                      }}
                      className="border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-500"
                    >
                      <div className="flex items-center gap-2">
                        <ExclamationCircleIcon className="h-4 w-4 text-amber-500" /> Warning Message
                      </div>
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() => {
                        message.error("Build failed.", {
                          description: "Import symbol not found on compile. Check src/index.ts line 42.",
                          duration: 3
                        });
                      }}
                      className="border-red-500/30 hover:bg-red-500/10 hover:text-red-500"
                    >
                      <div className="flex items-center gap-2">
                        <CloseCircleIcon className="h-4 w-4 text-red-500" /> Error Message
                      </div>
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() => {
                        message.info("New version available.", {
                          description: "inc-ui v0.2.0 has been released. See changelog for details.",
                          duration: 3
                        });
                      }}
                      className="border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-500"
                    >
                      <div className="flex items-center gap-2">
                        <InfoCircleIcon className="h-4 w-4 text-blue-500" /> Info Message
                      </div>
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() => {
                        const id = message.loading("Loading data process...", { duration: 0 });
                        setTimeout(() => {
                          message.destroy(id);
                          message.success("Data loaded successfully!", {
                            description: "All records synced.",
                            duration: 3
                          });
                        }, 2000);
                      }}
                      className="border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-500"
                    >
                      <div className="flex items-center gap-2">
                        <LoadingIcon /> Loading → Update
                      </div>
                    </Button>
                  </div>
                  <p className="text-xs text-center text-muted-foreground font-medium">Triggers reactive layout popups in the top-center viewport.</p>
                </div>
              ) : (
                <div className="w-full relative">
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                    <code>{messageCode}</code>
                  </pre>
                  <Button
                    icon
                    variant="ghost"
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                    onClick={() => copyToClipboard(messageCode, "message")}
                  >
                    {copiedText === "message" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>

            {/* API Reference */}
            <div className="lg:col-span-12 border border-border bg-card rounded-2xl p-6 flex flex-col justify-between shadow-sm select-text">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">API Reference</h3>
                  <div className="space-y-4">
                    <div>
                      <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">message(content, options?)</code>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">Show a message. Use <code className="text-xs font-mono">options.variant</code> to set the type. Default: <code className="text-xs font-mono">"none"</code> (no icon). Returns: id (string | number).</p>
                    </div>
                    <div>
                      <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">message.[variant](content, options?)</code>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">Shorthand methods. Variants: <code className="text-xs font-mono">none | success | error | warning | info | loading</code>. Returns: id (string | number).</p>
                    </div>
                    <div>
                      <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">message.update(id, variant, content, options?)</code>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">Update an existing message in place by id (e.g. loading → success).</p>
                    </div>
                    <div>
                      <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">message.destroy(id?)</code>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">Dismiss by id, or clear all.</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">MessagePrompter Props</h4>
                  <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">position</code>: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right" (default: "top-center")</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">visibleMessages</code>: number (default: 3)</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">className</code>: string</span></li>
                  </ul>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">MessageOptions</h4>
                  <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">variant</code>: "none" | "success" | "error" | "warning" | "info" | "loading"</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">description</code>: ReactNode</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">duration</code>: number (seconds)</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">onClose</code>: () =&gt; void</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">icon</code>: ReactNode</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">className</code>: string</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">style</code>: CSSProperties</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* 7. LOADING SECTION */}
        <section id="loading" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Loading</h2>
            <p className="text-muted-foreground">Full-screen centered overlay with variant icons, independent of Sonner.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Preview */}
            <div className="lg:col-span-7 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col justify-center items-center relative min-h-[250px]">
              <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md">
                <Button size="sm" variant={loadingTab === "preview" ? "secondary" : "ghost"} onClick={() => setLoadingTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={loadingTab === "code" ? "secondary" : "ghost"} onClick={() => setLoadingTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              {loadingTab === "preview" ? (
                <div className="space-y-4 w-full">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {/* Loading → Success */}
                    <Button
                      variant="secondary"
                      className="border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-500"
                      onClick={() => {
                        setLoadingVariant("loading");
                        setLoadingText("Processing...");
                        setLoadingOpen(true);
                        setTimeout(() => {
                          setLoadingVariant("success");
                          setLoadingText("Completed successfully!");
                        }, 2000);
                        setTimeout(() => setLoadingOpen(false), 3500);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <LoadingIcon /> → <CheckCircleIcon className="h-4 w-4 text-emerald-500" /> Success
                      </div>
                    </Button>

                    {/* Loading → Error */}
                    <Button
                      variant="secondary"
                      className="border-red-500/30 hover:bg-red-500/10 hover:text-red-500"
                      onClick={() => {
                        setLoadingVariant("loading");
                        setLoadingText("Submitting...");
                        setLoadingOpen(true);
                        setTimeout(() => {
                          setLoadingVariant("error");
                          setLoadingText("Submission failed. Please retry.");
                        }, 2000);
                        setTimeout(() => setLoadingOpen(false), 3500);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <LoadingIcon /> → <CloseCircleIcon className="h-4 w-4 text-red-500" /> Error
                      </div>
                    </Button>

                    {/* Loading → Warning */}
                    <Button
                      variant="secondary"
                      className="border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-500"
                      onClick={() => {
                        setLoadingVariant("loading");
                        setLoadingText("Verifying...");
                        setLoadingOpen(true);
                        setTimeout(() => {
                          setLoadingVariant("warning");
                          setLoadingText("Completed with warnings.");
                        }, 2000);
                        setTimeout(() => setLoadingOpen(false), 3500);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <LoadingIcon /> → <ExclamationCircleIcon className="h-4 w-4 text-amber-500" /> Warning
                      </div>
                    </Button>

                    {/* Loading → Info */}
                    <Button
                      variant="secondary"
                      className="border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-500"
                      onClick={() => {
                        setLoadingVariant("loading");
                        setLoadingText("Checking updates...");
                        setLoadingOpen(true);
                        setTimeout(() => {
                          setLoadingVariant("info");
                          setLoadingText("New version v2.1 available.");
                        }, 2000);
                        setTimeout(() => setLoadingOpen(false), 3500);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <LoadingIcon /> → <InfoCircleIcon className="h-4 w-4 text-blue-500" /> Info
                      </div>
                    </Button>

                    {/* Loading → None */}
                    <Button
                      variant="secondary"
                      className="border-border hover:bg-muted/50"
                      onClick={() => {
                        setLoadingVariant("loading");
                        setLoadingText("Loading...");
                        setLoadingOpen(true);
                        setTimeout(() => {
                          setLoadingVariant("none");
                          setLoadingText("Done.");
                        }, 2000);
                        setTimeout(() => setLoadingOpen(false), 3500);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <LoadingIcon /> → None (no icon)
                      </div>
                    </Button>
                  </div>
                  <p className="text-xs text-center text-muted-foreground font-medium">Shows loading spinner for 2s, then transitions to target state for 1.5s.</p>
                </div>
              ) : (
                <div className="w-full relative">
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                    <code>{loadingCode}</code>
                  </pre>
                  <Button
                    icon
                    variant="ghost"
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                    onClick={() => copyToClipboard(loadingCode, "loading")}
                  >
                    {copiedText === "loading" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>

            {/* API Reference */}
            <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col justify-between shadow-sm select-text">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">API Reference</h3>
                  <div className="space-y-4">
                    <div>
                      <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;Loading open onOpenChange variant&gt;description&lt;/Loading&gt;</code>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">Full-screen centered overlay built on Adobe React ARIA <code className="text-xs font-mono">ModalOverlay</code> + <code className="text-xs font-mono">Modal</code> + <code className="text-xs font-mono">Dialog</code>. Typical lifecycle: loading → success | error | warning | info | none.</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Loading Props</h4>
                  <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">open</code>: boolean (default: true)</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">onOpenChange</code>: (open: boolean) =&gt; void</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">variant</code>: "none" | "loading" | "success" | "error" | "warning" | "info" (default: "loading")</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">label</code>: string — accessible name (defaults to children text)</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">className</code>: string</span></li>
                  </ul>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Built on Adobe React ARIA</h4>
                  <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">ModalOverlay</code> — backdrop + dismiss (Escape / click)</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">Modal</code> — focus scope + trap</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">Dialog</code> — <code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">role="dialog"</code> + <code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">aria-modal</code> + <code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">aria-label</code></span></li>
                  </ul>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Icon mapping (same as Message)</h4>
                  <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">"none"</code> — no icon</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">"loading"</code> — <LoadingIcon className="inline-block h-[1em] w-auto align-[-0.2em] ml-0.5" /></span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">"success"</code> — <CheckCircleIcon className="inline-block h-[1em] w-auto align-[-0.2em] text-success ml-0.5" /></span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">"error"</code> — <CloseCircleIcon className="inline-block h-[1em] w-auto align-[-0.2em] text-destructive ml-0.5" /></span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">"warning"</code> — <ExclamationCircleIcon className="inline-block h-[1em] w-auto align-[-0.2em] text-warning ml-0.5" /></span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">"info"</code> — <InfoCircleIcon className="inline-block h-[1em] w-auto align-[-0.2em] text-info ml-0.5" /></span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* 8. CHART SECTION */}
        <section id="charts" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Chart</h2>
            <p className="text-muted-foreground">Versatile data visualization powered by ApexCharts. Bar, line, donut, and more.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Preview */}
            <div className="lg:col-span-12 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col relative min-h-[400px]">
              <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md z-10">
                <Button size="sm" variant={chartTab === "preview" ? "secondary" : "ghost"} onClick={() => setChartTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={chartTab === "code" ? "secondary" : "ghost"} onClick={() => setChartTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              {chartTab === "preview" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {/* Bar Chart */}
                  <div className="border border-border rounded-xl bg-card p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold">Bar</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500">Revenue</span>
                    </div>
                    <Chart
                      options={{
                        chart: { toolbar: { show: false } },
                        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
                        colors: ['#6366f1'],
                        plotOptions: { bar: { borderRadius: 4 } },
                        dataLabels: { enabled: false },
                        grid: { borderColor: '#e2e8f0', strokeDashArray: 4 }
                      }}
                      series={[{ name: 'Revenue', data: [30, 40, 35, 50, 49, 60] }]}
                      type="bar"
                      height={220}
                    />
                  </div>

                  {/* Line Chart */}
                  <div className="border border-border rounded-xl bg-card p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold">Line</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-500">Users</span>
                    </div>
                    <Chart
                      options={{
                        chart: { toolbar: { show: false } },
                        xaxis: { categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'] },
                        colors: ['#8b5cf6'],
                        stroke: { curve: 'straight', width: 2 },
                        dataLabels: { enabled: false },
                        grid: { borderColor: '#e2e8f0', strokeDashArray: 4 }
                      }}
                      series={[{ name: 'Users', data: [120, 250, 180, 310, 290, 400] }]}
                      type="line"
                      height={220}
                    />
                  </div>

                  {/* Area Chart */}
                  <div className="border border-border rounded-xl bg-card p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold">Area</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500">Visitors</span>
                    </div>
                    <Chart
                      options={{
                        chart: { toolbar: { show: false } },
                        xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
                        colors: ['#06b6d4'],
                        stroke: { curve: 'smooth', width: 2 },
                        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.1 } },
                        dataLabels: { enabled: false },
                        grid: { borderColor: '#e2e8f0', strokeDashArray: 4 }
                      }}
                      series={[{ name: 'Visitors', data: [180, 250, 300, 220, 380, 420, 510] }]}
                      type="area"
                      height={220}
                    />
                  </div>

                  {/* Pie Chart */}
                  <div className="border border-border rounded-xl bg-card p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold">Pie</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500">Browsers</span>
                    </div>
                    <Chart
                      options={{
                        chart: { toolbar: { show: false } },
                        labels: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Others'],
                        colors: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#f472b6'],
                        responsive: [{
                          breakpoint: 480,
                          options: { chart: { width: 200 }, legend: { position: 'bottom' } }
                        }],
                        legend: { position: 'bottom' },
                        dataLabels: { enabled: true, formatter: (val: number) => val.toFixed(0) + '%' }
                      }}
                      series={[42, 28, 16, 10, 4]}
                      type="pie"
                      height={220}
                    />
                  </div>

                  {/* Donut Chart */}
                  <div className="border border-border rounded-xl bg-card p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold">Donut</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-500">Share</span>
                    </div>
                    <Chart
                      options={{
                        chart: { toolbar: { show: false } },
                        labels: ['Product A', 'Product B', 'Product C', 'Product D'],
                        colors: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef'],
                        responsive: [{
                          breakpoint: 480,
                          options: { chart: { width: 200 }, legend: { position: 'bottom' } }
                        }],
                        legend: { position: 'bottom' },
                        dataLabels: { enabled: true, formatter: (val: number) => val.toFixed(0) + '%' }
                      }}
                      series={[44, 28, 18, 10]}
                      type="donut"
                      height={220}
                    />
                  </div>

                  {/* Heatmap Chart */}
                  <div className="border border-border rounded-xl bg-card p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold">Heatmap</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500">Activity</span>
                    </div>
                    <Chart
                      options={{
                        chart: { toolbar: { show: false } },
                        colors: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef'],
                        dataLabels: { enabled: false },
                        grid: { borderColor: '#e2e8f0', strokeDashArray: 4 }
                      }}
                      series={[
                        { name: 'Week 1', data: [{ x: 'Mon', y: 30 }, { x: 'Tue', y: 40 }, { x: 'Wed', y: 35 }, { x: 'Thu', y: 50 }, { x: 'Fri', y: 49 }] },
                        { name: 'Week 2', data: [{ x: 'Mon', y: 23 }, { x: 'Tue', y: 14 }, { x: 'Wed', y: 18 }, { x: 'Thu', y: 45 }, { x: 'Fri', y: 32 }] },
                        { name: 'Week 3', data: [{ x: 'Mon', y: 42 }, { x: 'Tue', y: 28 }, { x: 'Wed', y: 36 }, { x: 'Thu', y: 20 }, { x: 'Fri', y: 33 }] },
                      ]}
                      type="heatmap"
                      height={220}
                    />
                  </div>

                  {/* RangeBar Chart */}
                  <div className="border border-border rounded-xl bg-card p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold">RangeBar</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-500">Range</span>
                    </div>
                    <Chart
                      options={{
                        chart: { toolbar: { show: false } },
                        plotOptions: { bar: { borderRadius: 4, horizontal: true } },
                        xaxis: { type: 'numeric' },
                        colors: ['#6366f1'],
                        dataLabels: { enabled: false },
                        grid: { borderColor: '#e2e8f0', strokeDashArray: 4 }
                      }}
                      series={[{
                        data: [
                          { x: 'Task A', y: [2, 8] },
                          { x: 'Task B', y: [4, 12] },
                          { x: 'Task C', y: [3, 7] },
                          { x: 'Task D', y: [1, 9] },
                        ]
                      }]}
                      type="rangeBar"
                      height={220}
                    />
                  </div>

                  {/* Swimlane Chart */}
                  <div className="border border-border rounded-xl bg-card p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold">Swimlane</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500">Gantt</span>
                    </div>
                    <Chart
                      options={{
                        chart: { toolbar: { show: false } },
                        plotOptions: { bar: { borderRadius: 4, horizontal: true, rangeBarGroupRows: true } },
                        colors: ['#6366f1', '#8b5cf6', '#a855f7', '#f59e0b'],
                        xaxis: { type: 'numeric', min: 0, max: 20, tickAmount: 10 },
                        dataLabels: { enabled: false },
                        grid: { borderColor: '#e2e8f0', strokeDashArray: 4 }
                      }}
                      series={[
                        { name: 'Design', data: [{ x: 'Research', y: [0, 5] }, { x: 'Wireframe', y: [3, 8] }, { x: 'Prototype', y: [6, 12] }] },
                        { name: 'Frontend', data: [{ x: 'Setup', y: [2, 7] }, { x: 'Components', y: [5, 13] }, { x: 'Integration', y: [11, 16] }] },
                        { name: 'Backend', data: [{ x: 'API Design', y: [1, 6] }, { x: 'Database', y: [4, 10] }, { x: 'Deployment', y: [9, 15] }] },
                        { name: 'QA', data: [{ x: 'Testing', y: [8, 14] }, { x: 'Bug Fixes', y: [12, 17] }, { x: 'Release', y: [15, 18] }] },
                      ]}
                      type="rangeBar"
                      height={220}
                    />
                  </div>

                  {/* Grid Data Table */}
                  <div className="border border-border rounded-xl bg-card p-3 space-y-3 lg:col-span-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold">Grid</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">Table</span>
                    </div>
                    <Grid
                      data={[
                        { id: '1', name: 'Acme Inc', mrr: 8420, seats: 18, active: true, growth: '+12%' },
                        { id: '2', name: 'Linear', mrr: 7280, seats: 14, active: true, growth: '+8%' },
                        { id: '3', name: 'Vercel', mrr: 5940, seats: 9, active: false, growth: '-3%' },
                        { id: '4', name: 'Notion', mrr: 4820, seats: 21, active: true, growth: '+21%' },
                        { id: '5', name: 'Stripe', mrr: 4260, seats: 6, active: true, growth: '+5%' },
                        { id: '6', name: 'Figma', mrr: 3840, seats: 12, active: false, growth: '-6%' },
                        { id: '7', name: 'Retool', mrr: 3210, seats: 4, active: true, growth: '+14%' },
                        { id: '8', name: 'Loom', mrr: 3520, seats: 8, active: true, growth: '+8%' },
                        { id: '9', name: 'Webflow', mrr: 2980, seats: 10, active: false, growth: '-10%' },
                        { id: '10', name: 'Airtable', mrr: 2640, seats: 7, active: true, growth: '+3%' },
                      ]}
                      columns={[
                        { key: 'name', headerText: 'Company', sort: true, filter: true, resizable: true },
                        { key: 'mrr', headerText: 'MRR', type: 'number', sort: true, filter: true },
                        { key: 'seats', headerText: 'Seats', type: 'number', sort: true },
                        { key: 'active', headerText: 'Active', type: 'boolean' },
                        { key: 'growth', headerText: 'Growth', sort: true },
                      ]}
                      height={320}
                      style={{ '--ag-radius': '8px' } as React.CSSProperties}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full space-y-6">
                  <div className="relative">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Bar Chart</h3>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                      <code>{barChartCode}</code>
                    </pre>
                    <Button
                      icon
                      variant="ghost"
                      className="absolute top-8 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(barChartCode, "chart-bar")}
                    >
                      {copiedText === "chart-bar" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="relative">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Line Chart</h3>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                      <code>{lineChartCode}</code>
                    </pre>
                    <Button
                      icon
                      variant="ghost"
                      className="absolute top-8 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(lineChartCode, "chart-line")}
                    >
                      {copiedText === "chart-line" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="relative">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Area Chart</h3>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                      <code>{areaChartCode}</code>
                    </pre>
                    <Button
                      icon
                      variant="ghost"
                      className="absolute top-8 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(areaChartCode, "chart-area")}
                    >
                      {copiedText === "chart-area" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="relative">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Pie Chart</h3>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                      <code>{pieChartCode}</code>
                    </pre>
                    <Button
                      icon
                      variant="ghost"
                      className="absolute top-8 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(pieChartCode, "chart-pie")}
                    >
                      {copiedText === "chart-pie" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="relative">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Donut Chart</h3>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                      <code>{donutChartCode}</code>
                    </pre>
                    <Button
                      icon
                      variant="ghost"
                      className="absolute top-8 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(donutChartCode, "chart-donut")}
                    >
                      {copiedText === "chart-donut" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="relative">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Heatmap Chart</h3>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                      <code>{heatmapChartCode}</code>
                    </pre>
                    <Button
                      icon
                      variant="ghost"
                      className="absolute top-8 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(heatmapChartCode, "chart-heatmap")}
                    >
                      {copiedText === "chart-heatmap" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="relative">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">RangeBar Chart</h3>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                      <code>{rangeBarChartCode}</code>
                    </pre>
                    <Button
                      icon
                      variant="ghost"
                      className="absolute top-8 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(rangeBarChartCode, "chart-rangebar")}
                    >
                      {copiedText === "chart-rangebar" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="relative">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Swimlane Chart</h3>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                      <code>{swimlaneChartCode}</code>
                    </pre>
                    <Button
                      icon
                      variant="ghost"
                      className="absolute top-8 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(swimlaneChartCode, "chart-swimlane")}
                    >
                      {copiedText === "chart-swimlane" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="relative">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Grid (Data Table)</h3>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                      <code>{gridCode}</code>
                    </pre>
                    <Button
                      icon
                      variant="ghost"
                      className="absolute top-8 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(gridCode, "chart-grid")}
                    >
                      {copiedText === "chart-grid" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* API Reference */}
            <div className="lg:col-span-12 border border-border bg-card rounded-2xl p-6 flex flex-col justify-between shadow-sm select-text">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">API Reference</h3>
                  <div className="space-y-4">
                    <div>
                      <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;Chart options series type height /&gt;</code>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">A React component wrapping ApexCharts directly. Supports all ApexCharts chart types.</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Chart Props</h4>
                  <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">options</code>: ApexOptions — full ApexCharts config (excluding series)</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">series</code>: ApexAxisChartSeries | ApexNonAxisChartSeries — data</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">type</code>: "line" | "area" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "rangeBar" | "radar" | "polarArea"</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">height</code>: number | string (default: 350)</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">width</code>: number | string (default: "100%")</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">loading</code>: boolean — shows spinner overlay</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">className</code>: string — Tailwind classes via cn()</span></li>
                  </ul>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Supported Chart Types</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold text-muted-foreground">
                    {["line", "area", "bar", "pie", "donut", "radialBar", "scatter", "bubble", "heatmap", "candlestick", "radar", "polarArea"].map((t) => (
                      <div key={t} className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 shrink-0" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* 9. REGION SECTION */}
        <section id="regions" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Regions</h2>
            <p className="text-muted-foreground">ISO 3166-1 country data spanning Asia, Europe, Africa, North America, Latin America, and Oceania. Browse and select countries with the <code className="font-mono bg-muted px-1 py-0.5 rounded text-primary text-xs">RegionSelect</code> component.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Preview */}
            <div className="lg:col-span-12 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col relative min-h-[400px]">
              <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md z-10">
                <Button size="sm" variant={regionTab === "preview" ? "secondary" : "ghost"} onClick={() => setRegionTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={regionTab === "code" ? "secondary" : "ghost"} onClick={() => setRegionTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              {regionTab === "preview" ? (
                <div className="w-full max-w-xl space-y-6">
                  {/* Region filter buttons */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Filter by Region</label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={selectedRegion === "all" ? "secondary" : "ghost"}
                        onClick={() => { setSelectedRegion("all"); setSelectedCountry(""); }}
                      >
                        All
                      </Button>
                      {getRegions().map((r) => (
                        <Button
                          key={r}
                          size="sm"
                          variant={selectedRegion === r ? "secondary" : "ghost"}
                          onClick={() => { setSelectedRegion(r); setSelectedCountry(""); }}
                        >
                          <RegionBadge region={r} className="bg-transparent dark:bg-transparent p-0 text-inherit dark:text-inherit" />
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* RegionSelect */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">RegionSelect</label>
                    <RegionSelect
                      region={selectedRegion}
                      value={selectedCountry}
                      onChange={(code) => setSelectedCountry(code)}
                      placeholder="Select a country..."
                      showSearch="auto"
                    />
                  </div>

                  {/* Selected country info */}
                  {selectedCountry && (() => {
                    const found = getCountryByCode(selectedCountry);
                    return found ? (
                      <div className="flex items-center justify-between border border-border rounded-xl p-4 bg-card/60">
                        <RegionDisplay country={found} showFlag showCode showRegion />
                      </div>
                    ) : null;
                  })()}

                  {/* Region breakdown */}
                  <div className="border-t border-border/40 pt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Countries by Region</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {getRegions().map((r) => {
                        const list = getCountriesByRegion(r);
                        return (
                          <div key={r} className="border border-border rounded-xl p-3 bg-card/40 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <RegionBadge region={r} />
                              <span className="text-[10px] font-mono text-muted-foreground">{list.length}</span>
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-4 space-y-0.5">
                              {list.slice(0, 8).map((c) => (
                                <div key={c.code} className="truncate">
                                  {countryCodeToFlag(c.code)} {c.name}
                                </div>
                              ))}
                              {list.length > 8 && (
                                <div className="text-muted-foreground/60 pt-0.5">+{list.length - 8} more</div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full space-y-4">
                  <div className="relative">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">RegionSelect &amp; RegionDisplay</h3>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                      <code>{regionCode}</code>
                    </pre>
                    <Button
                      icon
                      variant="ghost"
                      className="absolute top-8 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(regionCode, "region")}
                    >
                      {copiedText === "region" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* API Reference */}
            <div className="lg:col-span-12 border border-border bg-card rounded-2xl p-6 flex flex-col justify-between shadow-sm select-text">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">API Reference</h3>
                  <div className="space-y-4">
                    <div>
                      <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;RegionSelect region value onChange /&gt;</code>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">A country selector with flag support, ISO codes, and region filtering. Built on top of <code className="font-mono bg-muted px-1 py-0.5 rounded text-primary">&lt;Select /&gt;</code>.</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">RegionSelect Props</h4>
                  <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">region</code>: Region | "all" — filter by region (default: "all")</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">value</code>: string — ISO alpha-2 country code</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">onChange</code>: (code: string, country: Country) =&gt; void</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">placeholder</code>: string (default: "Select country...")</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">variant</code>: dropdown | picker | action-sheet | bottom-modal | center-modal</span></li>
                  </ul>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Utility Exports</h4>
                  <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">RegionDisplay</code> — renders flag + country name + optional code/region badge</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">RegionBadge</code> — colored badge for a region name</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">countryCodeToFlag</code> — converts ISO alpha-2 to flag emoji</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">countries</code> — full ISO 3166-1 country array</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">getCountriesByRegion</code>, <code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">getCountryByCode</code>, <code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">getCountryByAlpha3</code></span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* 10. GRID SECTION */}
        <section id="grid" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Grid</h2>
            <p className="text-muted-foreground">A lightweight data table powered by ApexGrid web component. Sorting, filtering, and resizable columns out of the box.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Preview */}
            <div className="lg:col-span-12 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col relative min-h-[400px]">
              <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md z-10">
                <Button size="sm" variant={gridTab === "preview" ? "secondary" : "ghost"} onClick={() => setGridTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={gridTab === "code" ? "secondary" : "ghost"} onClick={() => setGridTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              {gridTab === "preview" ? (
                <div className="w-full">
                  <Grid
                    data={[
                      { id: '1', firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', age: 34, active: true, priority: 'High' },
                      { id: '2', firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com', age: 28, active: true, priority: 'Standard' },
                      { id: '3', firstName: 'Carol', lastName: 'Williams', email: 'carol@example.com', age: 45, active: false, priority: 'Low' },
                      { id: '4', firstName: 'David', lastName: 'Brown', email: 'david@example.com', age: 31, active: true, priority: 'High' },
                      { id: '5', firstName: 'Eva', lastName: 'Davis', email: 'eva@example.com', age: 27, active: true, priority: 'Standard' },
                      { id: '6', firstName: 'Frank', lastName: 'Miller', email: 'frank@example.com', age: 52, active: false, priority: 'Low' },
                      { id: '7', firstName: 'Grace', lastName: 'Wilson', email: 'grace@example.com', age: 39, active: true, priority: 'High' },
                      { id: '8', firstName: 'Henry', lastName: 'Moore', email: 'henry@example.com', age: 41, active: true, priority: 'Standard' },
                      { id: '9', firstName: 'Irene', lastName: 'Taylor', email: 'irene@example.com', age: 36, active: false, priority: 'High' },
                      { id: '10', firstName: 'Jack', lastName: 'Anderson', email: 'jack@example.com', age: 29, active: true, priority: 'Low' },
                    ]}
                    columns={[
                      { key: 'firstName', headerText: 'First Name', sort: true, filter: true, resizable: true },
                      { key: 'lastName', headerText: 'Last Name', sort: true, filter: true, resizable: true },
                      { key: 'email', headerText: 'Email Address' },
                      { key: 'age', headerText: 'Age', type: 'number', sort: true, filter: true },
                      { key: 'priority', headerText: 'Priority', sort: true },
                      { key: 'active', headerText: 'Active', type: 'boolean' },
                    ]}
                    height={400}
                  />
                </div>
              ) : (
                <div className="w-full relative">
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                    <code>{gridCode}</code>
                  </pre>
                  <Button
                    icon
                    variant="ghost"
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                    onClick={() => copyToClipboard(gridCode, "grid-main")}
                  >
                    {copiedText === "grid-main" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>

            {/* API Reference */}
            <div className="lg:col-span-12 border border-border bg-card rounded-2xl p-6 flex flex-col justify-between shadow-sm select-text">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">API Reference</h3>
                  <div className="space-y-4">
                    <div>
                      <code className="text-[11px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">&lt;Grid data columns height /&gt;</code>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">A React wrapper for the ApexGrid web component. Supports sorting, filtering, resizable columns, and auto-generation.</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Grid Props</h4>
                  <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">data</code>: T[] — array of data objects</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">columns</code>: ColumnConfig[] — column definitions with key, headerText, sort, filter, resizable, etc.</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">autoGenerate</code>: boolean — auto-generate columns from data keys</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">height</code>: number | string (default: 400)</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">style</code>: CSSProperties — supports <code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">--ag-*</code> CSS custom properties for theming</span></li>
                    <li className="flex items-start"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 shrink-0" /> <span><code className="font-mono bg-muted px-1 py-0.2 rounded text-primary">className</code>: string — Tailwind classes via cn()</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-24 py-12">
        <div className="container max-w-7xl px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between text-muted-foreground font-semibold text-sm">
          <span>&copy; 2026 inc-ui UI Registry. MIT Licensed.</span>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://github.com/aidanjhou/inc-ui" target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
            <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer" className="hover:text-foreground flex items-center">
              Powered by shadcn/ui <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
