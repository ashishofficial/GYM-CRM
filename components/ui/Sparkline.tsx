import { cn } from "@/lib/utils";

interface Props {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  className?: string;
}

/**
 * Tiny inline SVG sparkline. Zero runtime deps, sub-1ms render.
 * Use for KPI cards where Recharts would be overkill.
 */
export function Sparkline({
  data,
  width = 110,
  height = 36,
  stroke = "#3346f5",
  fill,
  className,
}: Props) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const pad = 3;
  const innerH = height - pad * 2;

  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = pad + innerH - ((v - min) / range) * innerH;
    return [x, y] as const;
  });

  const linePath = points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  const lastX = points[points.length - 1][0];
  const lastY = points[points.length - 1][1];
  const gradId = `spark-${stroke.replace("#", "")}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={cn("overflow-visible", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill ?? stroke} stopOpacity={0.25} />
          <stop offset="100%" stopColor={fill ?? stroke} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path
        d={linePath}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={lastX} cy={lastY} r={2.5} fill={stroke} />
    </svg>
  );
}
