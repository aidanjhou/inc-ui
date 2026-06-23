/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import ApexCharts from "apexcharts";
import type { ApexOptions } from "apexcharts";
import { cn } from "src/lib/utils";

export type { ApexOptions };

export type ChartType =
  | "line"
  | "area"
  | "bar"
  | "pie"
  | "donut"
  | "radialBar"
  | "scatter"
  | "bubble"
  | "heatmap"
  | "candlestick"
  | "rangeBar"
  | "radar"
  | "polarArea";

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** ApexCharts options (excluding series) */
  options?: Omit<ApexOptions, "series">;
  /** Chart data series */
  series?: ApexOptions["series"];
  /** Shortcut to set chart.type */
  type?: ChartType;
  /** Chart height (default: 350) */
  height?: number | string;
  /** Chart width (default: 100%) */
  width?: number | string;
  /** Show loading state */
  loading?: boolean;
  /** Loading overlay text */
  loadingText?: string;
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      className,
      options = {},
      series = [],
      type,
      height = 350,
      width = "100%",
      loading = false,
      loadingText = "Loading...",
      style,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const chartRef = React.useRef<ApexCharts | null>(null);

    const mergedOptions = React.useMemo<ApexOptions>(() => {
      return {
        ...options,
        chart: {
          zoom: { enabled: false },
          pan: { enabled: false },
          toolbar: { show: false },
          ...options.chart,
          type: type ?? options.chart?.type ?? "line",
        },
        series: series as any,
      };
    }, [options, series, type]);

    // Initialize / update chart
    React.useEffect(() => {
      if (loading || !containerRef.current) return;

      if (chartRef.current) {
        chartRef.current.updateOptions(mergedOptions, true, true, true);
      } else {
        const chart = new ApexCharts(containerRef.current, mergedOptions);
        chartRef.current = chart;
        chart.render();
      }

      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
          chartRef.current = null;
        }
      };
    }, [mergedOptions, loading]);

    // Combine forwarded ref with internal ref
    const setRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    return (
      <div
        ref={setRef}
        className={cn("apex-chart relative", className)}
        style={{ ...style, height, width }}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {loadingText}
            </div>
          </div>
        )}
      </div>
    );
  }
);
Chart.displayName = "Chart";

export { Chart };
