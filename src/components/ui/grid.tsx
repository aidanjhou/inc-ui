/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import "apex-grid/define";
import { cn } from "src/lib/utils";

// Re-export types from apex-grid for convenience
export type {
  ColumnConfiguration,
  DataType,
} from "apex-grid";


export interface GridProps<T extends object = any>
  extends React.HTMLAttributes<HTMLElement> {
  /** Grid data rows */
  data?: T[];
  /** Column configuration */
  columns?: Array<{
    key: string;
    headerText?: string;
    type?: string;
    sort?: boolean;
    filter?: boolean;
    resizable?: boolean;
    hidden?: boolean;
    [key: string]: unknown;
  }>;
  /** Auto-generate columns from data keys */
  autoGenerate?: boolean;
  /** Grid height */
  height?: number | string;
  /** Minimum grid height */
  minHeight?: number | string;
}

const Grid = React.forwardRef<HTMLElement, GridProps>(
  (
    {
      className,
      data = [],
      columns,
      autoGenerate,
      height = 400,
      minHeight,
      style,
      ...props
    },
    ref
  ) => {
    const gridRef = React.useRef<HTMLElement | null>(null);

    // Sync data to the web component
    React.useEffect(() => {
      const el = gridRef.current;
      if (!el) return;
      (el as any).data = data;
    }, [data]);

    // Sync columns to the web component
    React.useEffect(() => {
      const el = gridRef.current;
      if (!el) return;
      if (columns !== undefined) {
        (el as any).columns = columns;
      }
    }, [columns]);

    // Sync autoGenerate to the web component
    React.useEffect(() => {
      const el = gridRef.current;
      if (!el) return;
      if (autoGenerate !== undefined) {
        (el as any).autoGenerate = autoGenerate;
      }
    }, [autoGenerate]);

    // Combine forwarded ref with internal ref
    const setRef = React.useCallback(
      (node: HTMLElement | null) => {
        gridRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      [ref]
    );

    return React.createElement("apex-grid", {
      ref: setRef,
      class: cn("apex-grid", className),
      style: {
        height: typeof height === "number" ? `${height}px` : height,
        minHeight:
          minHeight !== undefined
            ? typeof minHeight === "number"
              ? `${minHeight}px`
              : minHeight
            : undefined,
        ...style,
      },
      ...props,
    });
  }
);
Grid.displayName = "Grid";

export { Grid };
