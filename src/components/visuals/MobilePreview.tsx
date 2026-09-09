import { Icon } from "@/components/ui/Icon";
import { BarChart } from "./Charts";

/** Mobile app screen used inside the hero phone frame. */
export function MobileAppScreen() {
  return (
    <div className="bg-white px-3 pt-7 pb-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[7.5px] font-semibold tracking-[0.12em] text-ink/40 uppercase">
            Good morning
          </p>
          <p className="font-display text-[11px] font-extrabold text-ink">Dashboard</p>
        </div>
        <span className="grid h-6 w-6 place-items-center rounded-full bg-navy text-white">
          <Icon name="bolt" size={11} />
        </span>
      </div>

      <div className="mt-2.5 rounded-lg bg-navy p-2.5 text-white">
        <p className="text-[7.5px] tracking-[0.12em] text-white/55 uppercase">Today</p>
        <p className="mt-0.5 font-display text-base font-extrabold">₦186,400</p>
        <div className="mt-2 h-8">
          <BarChart values={[30, 48, 40, 66, 58, 84, 72]} accentIndex={5} />
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {[
          { label: "Orders", value: "42" },
          { label: "Pending", value: "6" },
        ].map((item) => (
          <div key={item.label} className="rounded-lg border border-line bg-mist p-2">
            <p className="text-[7px] tracking-[0.1em] text-ink/40 uppercase">{item.label}</p>
            <p className="font-display text-[12px] font-extrabold text-ink">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-2 space-y-1.5">
        {["New order received", "Payment confirmed"].map((line) => (
          <div key={line} className="flex items-center gap-1.5 rounded-lg border border-line p-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span className="truncate text-[8px] font-medium text-ink/70">{line}</span>
          </div>
        ))}
      </div>

      <div className="mt-2.5 flex items-center justify-around border-t border-line pt-2">
        {(["dashboard", "cart", "growth", "globe"] as const).map((name, index) => (
          <Icon
            key={name}
            name={name}
            size={12}
            className={index === 0 ? "text-navy" : "text-ink/25"}
          />
        ))}
      </div>
    </div>
  );
}
