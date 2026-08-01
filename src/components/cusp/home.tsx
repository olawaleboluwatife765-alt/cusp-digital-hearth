import { useRef, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Repeat,
} from "lucide-react";
import { toast } from "sonner";
import { CButton, Card, CuspMark, SectionLabel, SketchGlyph, TokenGlyph } from "./primitives";
import { SHORT_ADDRESS, useCusp } from "./store";
import { ASSETS } from "./data";
import { cn } from "@/lib/utils";

const TABS = ["Assets", "NFTs", "Activity"] as const;

export function HomeScreen() {
  const { hideBalance, setHideBalance, tasks, completeTask } = useCusp();
  const [tab, setTab] = useState(0);
  const touchX = useRef<number | null>(null);
  const done = tasks.filter((t) => t.done).length;

  const copy = () => {
    void navigator.clipboard?.writeText(SHORT_ADDRESS);
    toast.success("Address copied");
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
    if (Math.abs(dx) > 56) setTab((t) => Math.min(2, Math.max(0, t + (dx < 0 ? 1 : -1))));
    touchX.current = null;
  };

  return (
    <div className="flex flex-col gap-5 px-5 pt-4 pb-8">
      {/* Portfolio hero */}
      <Card ticks className="hero-light animate-rise relative overflow-hidden p-6">
        <div className="pointer-events-none absolute -top-10 -right-10 opacity-[0.16]">
          <CuspMark className="size-52" />
        </div>
        <SectionLabel>Total portfolio value</SectionLabel>
        <div className="mono-num mt-3 flex items-baseline text-[2.75rem] leading-none font-light">
          {hideBalance ? (
            <span className="tracking-widest">••••••</span>
          ) : (
            <>
              <span>$0</span>
              <span className="text-gold">.00</span>
            </>
          )}
        </div>
        <p className="mono-num mt-3 text-xs text-muted-foreground">0.00% · All time</p>
        <p className="mt-5 max-w-[16rem] text-sm leading-relaxed text-foreground/70">
          Fund your wallet to begin your journey.
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <button
            onClick={() => setHideBalance(!hideBalance)}
            className="press flex items-center gap-2 text-xs text-muted-foreground"
          >
            {hideBalance ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
            {hideBalance ? "Show balance" : "Hide balance"}
          </button>
          <button onClick={copy} className="press mono-num flex items-center gap-2 text-xs">
            {SHORT_ADDRESS}
            <Copy className="size-3.5 text-muted-foreground" />
          </button>
        </div>
      </Card>

      {/* Getting started */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <SectionLabel>Getting started</SectionLabel>
          <span className="mono-num text-xs text-gold">{done}/3 Complete</span>
        </div>
        <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gold transition-[width] duration-500 ease-out"
            style={{ width: `${(done / 3) * 100}%` }}
          />
        </div>
        <div className="mt-4 flex flex-col">
          {tasks.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                if (t.done) return;
                completeTask(t.id);
                toast.success(`${t.label} — done`);
              }}
              className="press flex items-center gap-3 border-b border-border/70 py-3 text-left last:border-0"
            >
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-full border",
                  t.done ? "border-gold bg-gold-soft/50" : "border-border",
                )}
              >
                {t.done && <Check className="size-3 text-gold" strokeWidth={2.4} />}
              </span>
              <span
                className={cn(
                  "text-sm",
                  t.done ? "text-muted-foreground line-through" : "text-foreground",
                )}
              >
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </Card>

      <QuickActions />

      {/* Segmented tabs */}
      <div>
        <div className="relative grid grid-cols-3 rounded-xl border border-border bg-secondary/70 p-1">
          <div
            className="absolute top-1 bottom-1 left-1 rounded-lg bg-card shadow-[var(--shadow-card)] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.4,0.5,1)]"
            style={{ width: "calc((100% - 0.5rem) / 3)", transform: `translateX(${tab * 100}%)` }}
          />
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={cn(
                "relative z-10 h-9 text-[0.8rem] font-medium transition-colors",
                i === tab ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div
          className="mt-4 overflow-hidden"
          onTouchStart={(e) => (touchX.current = e.changedTouches[0]?.clientX ?? null)}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-400 [transition-timing-function:var(--ease-calm)]"
            style={{ transform: `translateX(-${tab * 100}%)` }}
          >
            <div className="w-full shrink-0 px-[1px]">
              <AssetsPanel />
            </div>
            <div className="w-full shrink-0 px-[1px]">
              <EmptyPanel
                glyph="nft"
                title="No collectibles yet."
                body="Your NFTs will appear here once you collect or mint your first piece."
              />
            </div>
            <div className="w-full shrink-0 px-[1px]">
              <EmptyPanel
                glyph="activity"
                title="No transactions yet."
                body="Your activity will appear here after your first transaction. Try adding funds to get started."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActions() {
  const { completeTask } = useCusp();
  const actions = [
    { icon: Plus, label: "Add Funds", note: null as string | null },
    { icon: ArrowUpRight, label: "Send", note: null },
    { icon: ArrowDownToLine, label: "Receive", note: null },
    { icon: Repeat, label: "Swap", note: "Coming Soon" },
  ];
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {actions.map((a) => (
        <button
          key={a.label}
          onClick={() => {
            if (a.label === "Swap") {
              toast("Swap is coming soon", {
                description: "STX, BTC, sBTC and SIP-010 swaps arrive in the next release.",
              });
              return;
            }
            if (a.label === "Add Funds") completeTask("fund");
            toast(`${a.label}`, { description: "Simulated in this prototype." });
          }}
          className="press draft-card flex h-[5.25rem] flex-col items-center justify-center gap-1.5 px-1"
        >
          <a.icon className="size-[1.15rem] text-foreground/75" strokeWidth={1.4} />
          <span className="text-[0.72rem] leading-none font-medium">{a.label}</span>
          {a.note && <span className="text-[0.6rem] leading-none text-gold">{a.note}</span>}
        </button>
      ))}
    </div>
  );
}

function AssetRow({ a }: { a: (typeof ASSETS)[number] }) {
  return (
    <div className="flex items-center gap-3 py-3.5">
      <TokenGlyph symbol={a.symbol} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{a.name}</p>
        <p className="mono-num text-xs text-muted-foreground">{a.symbol}</p>
      </div>
      <div className="text-right">
        <p className="mono-num text-sm">
          {a.balance} {a.symbol}
        </p>
        <p className="mono-num text-xs text-muted-foreground">{a.fiat}</p>
      </div>
    </div>
  );
}

function AssetsPanel() {
  const bitcoin = ASSETS.filter((a) => a.group === "bitcoin");
  const stacks = ASSETS.filter((a) => a.group === "stacks");
  return (
    <div className="flex flex-col gap-4">
      <Card className="px-5 py-1">
        <div className="flex items-center gap-2 border-b border-border pt-4 pb-3">
          <SectionLabel>Bitcoin</SectionLabel>
          <span className="h-px flex-1 bg-border" />
          <span className="text-[0.65rem] text-muted-foreground">BTC · sBTC</span>
        </div>
        <div className="divide-y divide-border/70">
          {bitcoin.map((a) => (
            <AssetRow key={a.symbol} a={a} />
          ))}
        </div>
      </Card>
      <Card className="px-5 py-1">
        <div className="flex items-center gap-2 border-b border-border pt-4 pb-3">
          <SectionLabel>Stacks · SIP-010</SectionLabel>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="divide-y divide-border/70">
          {stacks.map((a) => (
            <AssetRow key={a.symbol} a={a} />
          ))}
        </div>
      </Card>
      <p className="text-center text-xs text-muted-foreground">
        New wallets start empty. Balances update once you fund your wallet.
      </p>
    </div>
  );
}

function EmptyPanel({
  glyph,
  title,
  body,
}: {
  glyph: "nft" | "activity";
  title: string;
  body: string;
}) {
  const { completeTask } = useCusp();
  return (
    <Card ticks className="flex flex-col items-center px-8 py-12 text-center">
      <SketchGlyph kind={glyph} />
      <h3 className="mt-5 text-base font-medium tracking-tight">{title}</h3>
      <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-muted-foreground">{body}</p>
      <CButton
        variant="outline"
        size="sm"
        className="mt-6"
        onClick={() => {
          completeTask("fund");
          toast("Add funds", { description: "Simulated in this prototype." });
        }}
      >
        Add Funds
      </CButton>
    </Card>
  );
}