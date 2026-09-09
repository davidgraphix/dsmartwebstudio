import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";
import { AreaChart, BarChart, DonutChart, Sparkline } from "./Charts";

/**
 * Admin dashboard mockup.
 *
 * Presentational only — figures are illustrative interface content, not client
 * results. `compact` powers the hero; the full variant anchors the dashboard
 * section.
 */

const NAV: { label: string; icon: IconName; active?: boolean }[] = [
  { label: "Overview", icon: "dashboard", active: true },
  { label: "Orders", icon: "cart" },
  { label: "Products", icon: "layers" },
  { label: "Customers", icon: "globe" },
  { label: "Content", icon: "pen" },
  { label: "Analytics", icon: "growth" },
];

const STATS = [
  { label: "Revenue", value: "₦4.82M", delta: "+12.4%", trend: [14, 18, 16, 24, 22, 30, 34] },
  { label: "Orders", value: "1,284", delta: "+8.1%", trend: [10, 14, 12, 18, 22, 20, 28] },
  { label: "Customers", value: "3,942", delta: "+5.6%", trend: [8, 12, 15, 14, 20, 24, 26] },
  { label: "Conversion", value: "4.7%", delta: "+1.2%", trend: [6, 9, 8, 13, 12, 16, 19] },
];

const ORDERS = [
  { id: "#DS-2481", customer: "Adeola Stores", amount: "₦248,000", status: "Paid" },
  { id: "#DS-2480", customer: "Northgate Ltd", amount: "₦92,500", status: "Processing" },
  { id: "#DS-2479", customer: "Bright Interiors", amount: "₦415,000", status: "Paid" },
  { id: "#DS-2478", customer: "Kola Logistics", amount: "₦67,200", status: "Pending" },
];

const STATUS_TONE: Record<string, string> = {
  Paid: "bg-[#28C840]/15 text-[#4ade80]",
  Processing: "bg-gold/15 text-gold",
  Pending: "bg-white/10 text-white/55",
};

export function DashboardPreview({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex bg-navy-950 text-white", className)}>
      {/* Sidebar */}
      <aside
        className={cn(
          "hidden shrink-0 flex-col gap-1 border-r border-white/8 bg-white/[0.02] p-3 sm:flex",
          compact ? "w-32" : "w-40 lg:w-48",
        )}
        aria-hidden="true"
      >
        <div className="mb-4 flex items-center gap-2 px-1.5 pt-1">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-gold text-[10px] font-extrabold text-ink">
            D
          </span>
          <span className="font-display text-[11px] font-bold tracking-tight">Admin</span>
        </div>
        {NAV.map((item) => (
          <div
            key={item.label}
            className={cn(
              "flex items-center gap-2 rounded-lg px-2.5 py-2 text-[10.5px] font-medium transition-colors",
              item.active ? "bg-gold/12 text-gold" : "text-white/45",
            )}
          >
            <Icon name={item.icon} size={13} />
            <span className="truncate">{item.label}</span>
          </div>
        ))}
        <div className="mt-auto rounded-lg border border-white/8 bg-white/[0.03] p-2.5">
          <p className="text-[9px] font-semibold tracking-[0.1em] text-white/40 uppercase">Storage</p>
          <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[64%] rounded-full bg-gold" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1">
        {/* Top bar */}
        <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2.5 sm:gap-3 sm:px-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-white/[0.05] px-2.5 py-1.5">
            <Icon name="search" size={12} className="shrink-0 text-white/35" />
            <span className="truncate text-[10px] text-white/35">Search orders, products…</span>
          </div>
          <div className="relative hidden h-6 w-6 place-items-center rounded-lg bg-white/[0.05] sm:grid">
            <Icon name="bolt" size={12} className="text-white/45" />
            <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-gold" />
          </div>
          <div className="h-6 w-6 shrink-0 rounded-full bg-linear-to-br from-gold to-gold-600" />
        </div>

        <div className={cn("space-y-2.5 p-3 sm:space-y-3 sm:p-4", compact && "space-y-2 p-2.5")}>
          {/* Stat cards */}
          <div className={cn("grid gap-2 sm:gap-2.5", compact ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-4")}>
            {STATS.slice(0, compact ? 2 : 4).map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/8 bg-white/[0.03] p-2.5 sm:p-3"
              >
                <p className="text-[8.5px] font-semibold tracking-[0.12em] text-white/40 uppercase">
                  {stat.label}
                </p>
                <div className="mt-1 flex items-end justify-between gap-2">
                  <span className="font-display text-sm font-extrabold tracking-tight sm:text-base">
                    {stat.value}
                  </span>
                  <Sparkline points={stat.trend} className="h-4 w-10 text-gold/70 sm:w-12" />
                </div>
                <span className="mt-0.5 inline-block text-[9px] font-semibold text-[#4ade80]">
                  {stat.delta}
                </span>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className={cn("grid gap-2 sm:gap-2.5", compact ? "grid-cols-1" : "lg:grid-cols-3")}>
            <div
              className={cn(
                "rounded-lg border border-white/8 bg-white/[0.03] p-3",
                !compact && "lg:col-span-2",
              )}
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10px] font-semibold text-white/70">Revenue</p>
                <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[8.5px] text-white/40">
                  Last 12 months
                </span>
              </div>
              <div className={cn(compact ? "h-14" : "h-24 sm:h-32")}>
                <AreaChart />
              </div>
            </div>

            {!compact ? (
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-lg border border-white/8 bg-white/[0.03] p-3">
                  <p className="mb-2 text-[10px] font-semibold text-white/70">Traffic sources</p>
                  <div className="h-14">
                    <BarChart />
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-white/8 bg-white/[0.03] p-3">
                  <DonutChart value={78} label="Goal" className="h-14 w-14 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-white/70">Monthly target</p>
                    <p className="mt-0.5 text-[9px] leading-relaxed text-white/40">
                      Tracking ahead of plan
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Orders table */}
          {!compact ? (
            <div className="overflow-hidden rounded-lg border border-white/8 bg-white/[0.03]">
              <div className="flex items-center justify-between border-b border-white/8 px-3 py-2">
                <p className="text-[10px] font-semibold text-white/70">Recent orders</p>
                <span className="text-[9px] text-gold">View all</span>
              </div>
              <table className="w-full text-left">
                <tbody>
                  {ORDERS.map((order) => (
                    <tr key={order.id} className="border-b border-white/5 last:border-0">
                      <td className="px-3 py-2 font-mono text-[9.5px] text-white/45">{order.id}</td>
                      <td className="px-2 py-2 text-[10px] font-medium text-white/80">
                        {order.customer}
                      </td>
                      <td className="hidden px-2 py-2 text-[10px] text-white/60 sm:table-cell">
                        {order.amount}
                      </td>
                      <td className="px-3 py-2 text-right">
                        <span
                          className={cn(
                            "inline-block rounded-full px-2 py-0.5 text-[8.5px] font-semibold",
                            STATUS_TONE[order.status],
                          )}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
