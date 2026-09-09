import { cn } from "@/lib/utils";

/**
 * Deterministic mini-charts. No data library, no randomness — the same shape
 * renders on the server and the client, so there is nothing to hydrate.
 */

const AREA_POINTS = [28, 34, 30, 44, 40, 56, 52, 68, 64, 82, 76, 94];

export function AreaChart({
  className,
  stroke = "#FFD014",
  fill = "rgba(255,208,20,0.18)",
  points = AREA_POINTS,
}: {
  className?: string;
  stroke?: string;
  fill?: string;
  points?: number[];
}) {
  const width = 320;
  const height = 110;
  const max = Math.max(...points) * 1.12;
  const step = width / (points.length - 1);

  const coords = points.map((value, index) => {
    const x = index * step;
    const y = height - (value / max) * height;
    return [x, y] as const;
  });

  // Smooth the line with mid-point quadratic curves.
  const line = coords.reduce((path, [x, y], index) => {
    if (index === 0) return `M ${x} ${y}`;
    const [px, py] = coords[index - 1]!;
    const cx = (px + x) / 2;
    return `${path} Q ${px} ${py} ${cx} ${(py + y) / 2} T ${x} ${y}`;
  }, "");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("h-full w-full", className)}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={`${line} L ${width} ${height} L 0 ${height} Z`} fill={fill} />
      <path d={line} fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function BarChart({
  values = [38, 54, 46, 72, 60, 88, 76, 96],
  className,
  barClassName,
  accentIndex = 5,
}: {
  values?: number[];
  className?: string;
  barClassName?: string;
  accentIndex?: number;
}) {
  const max = Math.max(...values);
  return (
    <div className={cn("flex h-full items-end gap-1.5", className)} aria-hidden="true">
      {values.map((value, index) => (
        <div
          key={index}
          className={cn(
            "flex-1 origin-bottom rounded-t-[3px] animate-[bar-rise_1s_var(--ease-out-expo)_both]",
            index === accentIndex ? "bg-gold" : "bg-white/18",
            barClassName,
          )}
          style={{
            height: `${(value / max) * 100}%`,
            animationDelay: `${index * 55}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function Sparkline({
  className,
  stroke = "currentColor",
  points = [12, 18, 14, 24, 20, 32, 28, 40],
}: {
  className?: string;
  stroke?: string;
  points?: number[];
}) {
  const width = 90;
  const height = 26;
  const max = Math.max(...points);
  const step = width / (points.length - 1);
  const d = points
    .map((value, index) => {
      const x = index * step;
      const y = height - (value / max) * (height - 3) - 1.5;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn("h-6 w-20", className)} aria-hidden="true">
      <path d={d} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DonutChart({
  value = 72,
  className,
  label,
}: {
  value?: number;
  className?: string;
  label?: string;
}) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("relative grid place-items-center", className)}>
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7" />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="#FFD014"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute text-center">
        <span className="block font-display text-lg font-extrabold text-white">{value}</span>
        {label ? (
          <span className="block text-[8px] font-semibold tracking-[0.14em] text-white/45 uppercase">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
