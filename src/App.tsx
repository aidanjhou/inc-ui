import { useState, useEffect, type SVGProps } from "react"
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
  Info,
  XCircle
} from "lucide-react"

import { cn } from "./lib/utils"
import { Button } from "./components/ui/button"

import { Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/ui/card"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./components/ui/dialog"
import { Input } from "./components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "./components/ui/dropdown-menu"
import { Toaster } from "./components/ui/toaster"
import { useToast } from "./hooks/use-toast"

const GithubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

function App() {
  const { toast } = useToast()
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")
  const [copiedText, setCopiedText] = useState<string | null>(null)

  // Button Playground States
  const [btnVariant, setBtnVariant] = useState<"primary" | "default" | "destructive" | "outline" | "secondary" | "ghost" | "link">("primary")
  const [btnSize, setBtnSize] = useState<"default" | "xs" | "sm" | "lg" | "icon">("default")
  const [btnLoading, setBtnLoading] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [btnIcon, setBtnIcon] = useState(false)

  // Card Playground States
  const [cardGlass, setCardGlass] = useState(true)
  const [cardHoverable, setCardHoverable] = useState(true)

  // Input Playground States
  const [inputDisabled, setInputDisabled] = useState(false)
  const [inputError, setInputError] = useState(false)
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [theme])

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(id)
    setTimeout(() => setCopiedText(null), 2000)
    toast({
      title: "Code copied",
      description: "Component source code copied to clipboard.",
    })
  }

  // Component Code Strings
  const buttonCode = `import { Button } from 'inc-ui'
import { Sparkles } from 'lucide-react'

export default function Demo() {
  return (
    <Button 
      variant="${btnVariant}" 
      size="${btnSize}"${btnLoading ? " loading" : ""}${btnDisabled ? " disabled" : ""}
    >
      ${btnIcon ? '<Sparkles className="mr-2 h-4 w-4" /> ' : ""}Click Me
    </Button>
  )
}`

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
        <Button variant="outline" size="sm" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  )
}`

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
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`

  const dropdownCode = `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuShortcut, Button } from 'inc-ui'
import { User, Settings, LogOut } from 'lucide-react'

export default function Demo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">My Account</Button>
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
}`

  const toastCode = `import { Button, useToast } from 'inc-ui'

export default function Demo() {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          variant: "success",
          title: "System Update",
          description: "All libraries packages compiled successfully.",
        })
      }}
    >
      Show Success Toast
    </Button>
  )
}`

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300 select-none">
      <Toaster />

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
            <a href="#modals" className="hover:text-foreground">Modals</a>
            <a href="#dropdowns" className="hover:text-foreground">Menus</a>
            <a href="#toasts" className="hover:text-foreground">Notifications</a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full hover:bg-muted"
            >
              {theme === "dark" ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-800" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              asChild
              className="hidden sm:inline-flex rounded-full"
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
            <Button size="lg" className="w-full sm:w-auto glow-primary" onClick={(e) => {
              e.preventDefault();
              document.getElementById("buttons")?.scrollIntoView({ behavior: "smooth" });
            }}>
              Explore Components
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <a href="https://github.com/aidanjhou/inc-ui" target="_blank" rel="noreferrer">
                <GithubIcon className="mr-2 h-5 w-5" /> GitHub Project
              </a>
            </Button>
          </div>
        </section>

        <hr className="border-border" />

        {/* 1. BUTTON SECTION */}
        <section id="buttons" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Button</h2>
            <p className="text-muted-foreground">Triggers actions and visual responses with full loading spinner integration.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Component Interactive Preview */}
            <div className="lg:col-span-7 flex flex-col justify-between border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner relative overflow-hidden">
              <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md">
                <Button size="sm" variant={activeTab === "preview" ? "secondary" : "ghost"} onClick={() => setActiveTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={activeTab === "code" ? "secondary" : "ghost"} onClick={() => setActiveTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              <div className="flex-1 flex items-center justify-center min-h-[200px]">
                {activeTab === "preview" ? (
                  <Button
                    variant={btnVariant}
                    size={btnSize}
                    loading={btnLoading}
                    disabled={btnDisabled}
                  >
                    {btnIcon && <Sparkles className="mr-2 h-4 w-4" />}
                    Interactive Action
                  </Button>
                ) : (
                  <div className="w-full relative">
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                      <code>{buttonCode}</code>
                    </pre>
                    <Button
                      size="icon"
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
                    {["primary", "default", "destructive", "outline", "secondary", "ghost", "link"].map((v) => (
                      <Button
                        key={v}
                        size="sm"
                        variant={btnVariant === v ? "primary" : "outline"}
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
                    {["default", "xs", "sm", "lg", "icon"].map((s) => (
                      <Button
                        key={s}
                        size="sm"
                        variant={btnSize === s ? "primary" : "outline"}
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
                    <label className="flex items-center space-x-2 text-sm font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={btnIcon}
                        onChange={(e) => setBtnIcon(e.target.checked)}
                        className="rounded border-input text-primary focus:ring-ring h-4 w-4"
                      />
                      <span>Include Icon</span>
                    </label>
                  </div>
                </div>
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
                <Button size="sm" variant={activeTab === "preview" ? "secondary" : "ghost"} onClick={() => setActiveTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={activeTab === "code" ? "secondary" : "ghost"} onClick={() => setActiveTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              {activeTab === "preview" ? (
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
                    <Button variant="outline" size="sm">Manage Stream</Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="w-full relative">
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                    <code>{cardCode}</code>
                  </pre>
                  <Button
                    size="icon"
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
        </section>

        <hr className="border-border" />

        {/* 3. INPUT SECTION */}
        <section id="inputs" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Input</h2>
            <p className="text-muted-foreground">Accepts alphanumeric inputs with clear accessibility states.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Preview */}
            <div className="lg:col-span-7 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col justify-center items-center relative min-h-[280px]">
              <div className="w-full max-w-sm space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold tracking-tight">Interactive Input Field</label>
                  <Input
                    placeholder="Enter some text..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={inputDisabled}
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
            </div>

            {/* Controls */}
            <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col space-y-6 shadow-sm">
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Playground Settings</h3>
              
              <div className="space-y-4">
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
                <Button size="sm" variant={activeTab === "preview" ? "secondary" : "ghost"} onClick={() => setActiveTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={activeTab === "code" ? "secondary" : "ghost"} onClick={() => setActiveTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              {activeTab === "preview" ? (
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
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button type="submit" onClick={() => {
                            toast({
                              title: "Profile Updated",
                              description: "Account credentials changed successfully.",
                            })
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
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                    onClick={() => copyToClipboard(dialogCode, "dialog")}
                  >
                    {copiedText === "dialog" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>

            {/* Documentation Info */}
            <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Features Included</h3>
                <ul className="space-y-2 text-sm font-semibold text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-emerald-500 mr-2" /> Focus lock trapping</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-emerald-500 mr-2" /> Escape key closure</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-emerald-500 mr-2" /> Animation fade-in and scale</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-emerald-500 mr-2" /> Fully accessible WAI-ARIA layout</li>
                </ul>
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
                <Button size="sm" variant={activeTab === "preview" ? "secondary" : "ghost"} onClick={() => setActiveTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={activeTab === "code" ? "secondary" : "ghost"} onClick={() => setActiveTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              {activeTab === "preview" ? (
                <div className="flex flex-col items-center space-y-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Options Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => {
                          toast({ title: "Profile clicked", description: "Redirecting to your user page." })
                        }}>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          toast({ title: "Settings clicked", description: "Loading developer config panel." })
                        }}>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive" onClick={() => {
                        toast({ title: "Logged out", description: "Session terminated successfully." })
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
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                    onClick={() => copyToClipboard(dropdownCode, "dropdown")}
                  >
                    {copiedText === "dropdown" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>

            {/* Doc Info */}
            <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Configuration Features</h3>
                <ul className="space-y-2 text-sm font-semibold text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-emerald-500 mr-2" /> Keyboard selection arrow bindings</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-emerald-500 mr-2" /> Action separator borders</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-emerald-500 mr-2" /> Dropdown alignment properties</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-emerald-500 mr-2" /> Submenu embedding options</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* 6. TOAST NOTIFICATION SECTION */}
        <section id="toasts" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Toast (Notifications)</h2>
            <p className="text-muted-foreground">Pops alerts on the screen corner using programmatic function calls.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Preview */}
            <div className="lg:col-span-7 border border-border bg-card/40 rounded-2xl p-6 sm:p-10 shadow-inner flex flex-col justify-center items-center relative min-h-[250px]">
              <div className="absolute top-3 right-3 flex space-x-1 bg-muted/50 p-1 rounded-md">
                <Button size="sm" variant={activeTab === "preview" ? "secondary" : "ghost"} onClick={() => setActiveTab("preview")}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                </Button>
                <Button size="sm" variant={activeTab === "code" ? "secondary" : "ghost"} onClick={() => setActiveTab("code")}>
                  <Code className="mr-1.5 h-3.5 w-3.5" /> Code
                </Button>
              </div>

              {activeTab === "preview" ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        toast({
                          variant: "success",
                          title: "Successful Build",
                          description: "The React package was compiled without warnings.",
                        })
                      }}
                      className="border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-500"
                    >
                      <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" /> Success Toast
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => {
                        toast({
                          variant: "warning",
                          title: "Low Disk Space",
                          description: "Repository storage reaches 89% full.",
                        })
                      }}
                      className="border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-500"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" /> Warning Toast
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => {
                        toast({
                          variant: "destructive",
                          title: "Compilation Error",
                          description: "Import symbol not found on compile.",
                        })
                      }}
                      className="border-red-500/30 hover:bg-red-500/10 hover:text-red-500"
                    >
                      <XCircle className="h-4 w-4 mr-2 text-red-500" /> Error Toast
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => {
                        toast({
                          variant: "info",
                          title: "System Update",
                          description: "A new version of inc-ui packages is available.",
                        })
                      }}
                      className="border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-500"
                    >
                      <Info className="h-4 w-4 mr-2 text-blue-500" /> Info Toast
                    </Button>
                  </div>
                  <p className="text-xs text-center text-muted-foreground font-medium">Triggers reactive layout popups in the lower-right workspace viewport.</p>
                </div>
              ) : (
                <div className="w-full relative">
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto border border-slate-800 font-mono">
                    <code>{toastCode}</code>
                  </pre>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                    onClick={() => copyToClipboard(toastCode, "toast")}
                  >
                    {copiedText === "toast" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>

            {/* Doc Info */}
            <div className="lg:col-span-5 border border-border bg-card rounded-2xl p-6 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Features</h3>
                <ul className="space-y-2 text-sm font-semibold text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-emerald-500 mr-2" /> Stacking and auto-dismiss timing</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-emerald-500 mr-2" /> Support action buttons inside toasts</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-emerald-500 mr-2" /> Animated slide-out triggers</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-emerald-500 mr-2" /> Dismissible click bounds</li>
                </ul>
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
  )
}

export default App
