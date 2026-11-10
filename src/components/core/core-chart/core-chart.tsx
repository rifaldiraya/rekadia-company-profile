"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import type { ECharts, EChartsOption, SetOptionOpts } from "echarts";

export interface CoreChartProps {
  option: EChartsOption;
  setOptionOpts?: SetOptionOpts;
  height?: number | string;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
  theme?: string | object;
  onChartReady?: (instance: ECharts) => void;
}

export function CoreChart({
  option,
  setOptionOpts,
  height = 400,
  width = "100%",
  className,
  style,
  theme,
  onChartReady,
}: CoreChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ECharts | null>(null);
  const onChartReadyRef = useRef(onChartReady);

  onChartReadyRef.current = onChartReady;

  useEffect(() => {
    if (!containerRef.current) return;

    let disposed = false;

    import("echarts").then((echarts) => {
      if (disposed || !containerRef.current) return;

      const instance = echarts.init(containerRef.current, theme);
      chartRef.current = instance;
      instance.setOption(option, setOptionOpts);
      onChartReadyRef.current?.(instance);
    });

    return () => {
      disposed = true;
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, [theme]);

  useEffect(() => {
    chartRef.current?.setOption(option, setOptionOpts);
  }, [option, setOptionOpts]);

  useEffect(() => {
    const handleResize = () => chartRef.current?.resize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width, height, ...style }}
    />
  );
}
