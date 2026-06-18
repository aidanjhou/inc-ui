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

// Export Toast & Notification system
export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction
} from "./components/ui/toast";
export { Toaster } from "./components/ui/toaster";
export { useToast, toast } from "./hooks/use-toast";

// Export UIConfig Context & Provider
export { UIConfigContext, UIConfigProvider, useUIConfig } from "./context/UIConfigContext";
export type { UIConfigContextType, UIConfigProviderProps } from "./context/UIConfigContext";

// Export Select component
export { Select } from "./components/ui/select";
export type { SelectProps, SelectOption } from "./components/ui/select";

