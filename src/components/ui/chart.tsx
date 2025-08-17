"use client"

import * as React from "react"
import {
  Label,
  PolarGrid,
  RadialBar,
  RadialBarChart as RadialBarChartPrimitive,
  type RadialBarChartProps,
  Tooltip,
  type TooltipProps,
} from "recharts"

import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config?: any
    id?: string
  }
>(({ id = "chart", className, children, config, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-chart={id}
      style={
        {
          "--chart-font-family": "var(--font-sans)",
        } as React.CSSProperties
      }
      className={cn(
        "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_path]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-radial-bar-sector]:fill-primary [&_.recharts-reference-line-line]:stroke-border [&_.recharts-sector[role=tooltip]]:outline-none [&_.recharts-surface]:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
ChartContainer.displayName = "Chart"

const ChartTooltip = Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipProps<any, any> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    if (!active || !payload?.length) {
      return null
    }

    const item = payload[0]
    const id = nameKey ? item.payload[nameKey] : (item.name || 'value')
    const value = formatter?.(item.value, id, item, 0, payload) ?? item.value
    const finalLabel =
      (labelKey ? item.payload[labelKey] : label) ?? item.name
    const indicatorColor = color ?? item.color

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border bg-background p-2.5 text-sm shadow-xl [&>svg]:size-3",
          className
        )}
      >
        {!hideLabel ? (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter?.(finalLabel, payload) ?? finalLabel}
          </div>
        ) : null}
        <div className="grid gap-1.5">
          <div className="flex items-center gap-2 font-medium leading-none">
            {!hideIndicator && (
              <span
                className={cn(
                  "h-2.5 w-2.5 shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                  {
                    "h-2.5 w-2.5": indicator === "dot",
                    "w-1": indicator === "line",
                    "w-0 border-[1.5px] border-dashed bg-transparent":
                      indicator === "dashed",
                  }
                )}
                style={
                  {
                    "--color-bg": indicatorColor,
                    "--color-border": indicatorColor,
                  } as React.CSSProperties
                }
              />
            )}
            <div className="flex-1">{id}</div>
            {value &&
                <div className="text-right font-mono font-medium tabular-nums">
                    {value}
                </div>
            }
          </div>
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = Tooltip.displayName

const RadialBarChart = React.forwardRef<
  HTMLDivElement,
  RadialBarChartProps & {
    showGrid?: boolean
    showTooltip?: boolean
  }
>(
  (
    {
      className,
      children,
      showGrid = true,
      showTooltip = true,
      ...props
    },
    ref
  ) => {
    return (
      <RadialBarChartPrimitive className={cn(className)} {...props}>
        {showGrid ? <PolarGrid gridType="circle" /> : null}
        {showTooltip ? (
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
        ) : null}
        {children}
      </RadialBarChartPrimitive>
    )
  }
)
RadialBarChart.displayName = "RadialBarChart"

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  RadialBarChart,
  // Direct Re-exports
  Label,
  RadialBar,
}
