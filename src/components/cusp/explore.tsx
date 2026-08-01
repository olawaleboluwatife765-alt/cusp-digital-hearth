import { useMemo, useState } from "react";
import { ArrowRight, ChevronRight, Search, TrendingDown, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { CButton, Card, SectionLabel, SketchGlyph, TokenGlyph } from "./primitives";
import { APPS, APP_CATEGORIES, EVENTS, LEARN, MARKET, NEWS } from "./data";
import { useCusp } from "./store";
import { cn } from "@/lib/utils";

export function ExploreScreen() {
  const [top, setTop] = useState<"apps" | "pulse">("apps");
  return (
    <div className="flex flex-col gap-5 px-5 pt-4 pb-8">
      <div className="relative grid grid-cols-2 rounded-xl border border-border bg-secondary/70 p-1">
        <div
          className="absolute top-1 bottom-1 left-1 rounded-lg bg-card shadow-[var(--shadow-card)] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.4,0.5,1)]"
          style={{
            width: "calc((100% - 0.5rem) / 2)",
            transform: `translateX(${top === "apps" ? 0 : 100}%)`,
          }}
        />
        {(["apps", "pulse"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setTop(k)}
            className={cn(
              "relative z-10 h-9 text-[0.8rem] font-medium capitalize transition-colors",
              top === k ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {k}
          </button>
        ))}
      </div>
      {top === "apps" ? <AppsTab /> : <PulseTab />}
    </div>
  );
}

function AppsTab() {
  const { completeTask } = useCusp();
  const [cat, setCat] = useState<(typeof APP_CATEGORIES)[number]>("Featured");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const base = cat === "Featured" ? APPS.filter((a) => a.featured) : APPS.filter((a) => a.category === cat);
    const query = q.trim().toLowerCase();
    if (!query) return base;
    return APPS.filter(
      (a) => a.name.toLowerCase().includes(query) || a.tagline.toLowerCase().includes(query),
    );
  }, [cat, q]);

  return (
    <div className="animate-rise flex flex-col gap-4">
      <div className="relative">
        <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search apps"
          className="h-11 w-full rounded-xl border border-input bg-card pr-4 pl-11 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/40"
        />
      </div>

      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
        {APP_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "press h-8 shrink-0 rounded-full border px-3.5 text-[0.78rem] transition-colors",
              c === cat
                ? "border-gold/60 bg-gold-soft/50 text-foreground"
                : "border-border bg-card text-muted-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <Card className="flex flex-col items-center px-8 py-12 text-center">
          <SketchGlyph kind="search" />
          <h3 className="mt-5 text-base font-medium">No apps found.</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different search or browse another category.
          </p>
        </Card>
      ) : (
        <Card className="px-5">
          <div className="divide-y divide-border/70">
            {list.map((a) => (
              <button
                key={a.name}
                onClick={() => {
                  completeTask("explore");
                  toast(`Opening ${a.name}`, { description: "Simulated in this prototype." });
                }}
                className="press flex w-full items-center gap-3 py-3.5 text-left"
              >
                <TokenGlyph symbol={a.name} className="rounded-xl" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{a.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.tagline}</p>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function PulseTab() {
  return (
    <div className="animate-rise flex flex-col gap-5">
      <section>
        <SectionLabel>Market</SectionLabel>
        <div className="no-scrollbar -mx-5 mt-3 flex gap-3 overflow-x-auto px-5">
          {MARKET.map((m) => (
            <Card key={m.symbol} className="w-36 shrink-0 p-4">
              <p className="mono-num text-xs text-muted-foreground">{m.symbol}</p>
              <p className="mono-num mt-2 text-[0.95rem]">{m.price}</p>
              <p
                className={cn(
                  "mono-num mt-1.5 flex items-center gap-1 text-xs",
                  m.up ? "text-gold" : "text-muted-foreground",
                )}
              >
                {m.up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                {m.change}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <Card ticks className="hero-light p-6">
        <SectionLabel>Featured project</SectionLabel>
        <h3 className="mt-3 text-2xl font-medium tracking-tight">ALEX</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The leading DeFi hub built on Stacks — swaps, pools and Bitcoin-backed yield.
        </p>
        <CButton
          variant="outline"
          size="sm"
          className="mt-5"
          onClick={() => toast("ALEX", { description: "Simulated in this prototype." })}
        >
          Learn more <ArrowRight className="size-3.5" />
        </CButton>
      </Card>

      <section>
        <SectionLabel>News</SectionLabel>
        <Card className="mt-3 px-5">
          <div className="divide-y divide-border/70">
            {NEWS.map((n) => (
              <div key={n.title} className="flex items-center gap-3 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {n.tag} · {n.when}
                  </p>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section>
        <SectionLabel>Events</SectionLabel>
        <Card className="mt-3 px-5">
          <div className="divide-y divide-border/70">
            {EVENTS.map((e) => (
              <div key={e.title} className="flex items-center gap-3 py-3.5">
                <span className="mono-num w-14 shrink-0 text-xs text-gold">{e.when}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{e.title}</p>
                  <p className="text-xs text-muted-foreground">{e.place}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <SectionLabel>Learn</SectionLabel>
          <span className="text-xs text-muted-foreground">See all</span>
        </div>
        <Card className="mt-3 px-5">
          <div className="divide-y divide-border/70">
            {LEARN.map((l) => (
              <div key={l} className="flex items-center gap-3 py-3.5">
                <p className="flex-1 text-sm">{l}</p>
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}