import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import markUrl from "@/assets/cusp-mark.png";

export function CuspMark({ className }: { className?: string }) {
  return (
    <img
      src={markUrl}
      alt="Cusp logo"
      className={cn("select-none object-contain", className)}
      draggable={false}
    />
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "quiet";
  size?: "md" | "lg" | "sm";
};

export const CButton = forwardRef<HTMLButtonElement, ButtonProps>(function CButton(
  { className, variant = "primary", size = "md", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        "press inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tight disabled:pointer-events-none disabled:opacity-40",
        size === "lg" && "h-13 px-6 text-[0.95rem]",
        size === "md" && "h-11 px-5 text-sm",
        size === "sm" && "h-9 px-3.5 text-[0.8rem]",
        variant === "primary" &&
          "bg-primary text-primary-foreground shadow-[var(--shadow-card)] hover:bg-primary/92",
        variant === "outline" && "border border-border bg-card text-foreground hover:bg-secondary",
        variant === "ghost" && "text-foreground hover:bg-secondary",
        variant === "quiet" && "text-muted-foreground hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
});

export function Card({
  className,
  children,
  ticks,
}: {
  className?: string;
  children: ReactNode;
  ticks?: boolean;
}) {
  return (
    <div className={cn("draft-card", ticks && "draft-ticks", className)}>{children}</div>
  );
}

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("label-caps", className)}>{children}</p>;
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-border", className)} />;
}

export function TokenGlyph({ symbol, className }: { symbol: string; className?: string }) {
  return (
    <span
      className={cn(
        "mono-num flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-[0.7rem] font-medium text-foreground/70",
        className,
      )}
    >
      {symbol.slice(0, 4)}
    </span>
  );
}

/** Hand-drafted style empty-state illustration */
export function SketchGlyph({ kind }: { kind: "nft" | "activity" | "search" | "connect" }) {
  const stroke = "currentColor";
  return (
    <svg
      viewBox="0 0 120 96"
      className="h-24 w-32 text-foreground/35"
      fill="none"
      strokeWidth="1"
      stroke={stroke}
      aria-hidden
    >
      <path d="M4 88h112" strokeDasharray="3 4" opacity="0.5" />
      {kind === "nft" && (
        <>
          <path d="M40 30 60 18l20 12v24L60 66 40 54z" />
          <path d="M40 30 60 42l20-12M60 42v24" opacity="0.6" />
          <rect x="24" y="52" width="22" height="22" />
          <rect x="74" y="48" width="26" height="26" />
        </>
      )}
      {kind === "activity" && (
        <>
          <path d="M26 66V30l34-12 34 12v36" />
          <path d="M26 30h68M43 42h34M43 52h26" opacity="0.6" />
          <path d="M60 18v48" opacity="0.4" />
        </>
      )}
      {kind === "search" && (
        <>
          <circle cx="54" cy="42" r="20" />
          <path d="M69 57 88 74" />
          <path d="M44 42h20M54 32v20" opacity="0.5" />
        </>
      )}
      {kind === "connect" && (
        <>
          <circle cx="42" cy="46" r="16" />
          <circle cx="80" cy="46" r="16" />
          <path d="M58 46h6" />
          <path d="M42 30v32M80 30v32" opacity="0.35" strokeDasharray="3 4" />
        </>
      )}
    </svg>
  );
}
/* ------------------------------------------------------------------ */
/* Iteration 5 — interaction primitives                                */
/* ------------------------------------------------------------------ */

import { useEffect, useState } from "react";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { useCusp } from "./store";

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn("size-4 animate-spin", className)} aria-hidden />;
}

/** Full-screen calm loading state with a determinate bar. */
export function LoadingRun({
  label,
  onDone,
  duration = 1800,
}: {
  label: string;
  onDone?: () => void;
  duration?: number;
}) {
  const [pct, setPct] = useState(4);
  useEffect(() => {
    const step = Math.max(1, Math.round(100 / (duration / 60)));
    const i = setInterval(() => setPct((p) => (p >= 100 ? 100 : Math.min(100, p + step))), 60);
    return () => clearInterval(i);
  }, [duration]);
  useEffect(() => {
    if (pct < 100 || !onDone) return undefined;
    const t = setTimeout(onDone, 420);
    return () => clearTimeout(t);
  }, [pct, onDone]);
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] flex-col items-center justify-center px-10 text-center"
    >
      <CuspMark className="size-20 animate-pulse" />
      <p className="mt-7 text-sm">{label}</p>
      <div className="mt-5 h-[3px] w-52 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-gold transition-[width] duration-200 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mono-num mt-3 text-xs text-muted-foreground">{pct}%</p>
    </div>
  );
}

export function SuccessMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-emerge flex size-16 items-center justify-center rounded-full border border-gold/50 bg-gold-soft/40",
        className,
      )}
      aria-hidden
    >
      <Check className="size-7 text-gold" strokeWidth={1.6} />
    </div>
  );
}

export function SuccessPanel({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <div className="animate-rise flex flex-col items-center px-6 py-10 text-center">
      <SuccessMark />
      <h2 className="mt-6 text-xl font-medium tracking-tight">{title}</h2>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{body}</p>
      {children}
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "press relative h-6 w-11 shrink-0 rounded-full border transition-colors",
        checked ? "border-gold/60 bg-gold-soft" : "border-border bg-secondary",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-4 rounded-full bg-card shadow-[var(--shadow-card)] transition-transform duration-250 [transition-timing-function:var(--ease-calm)]",
          checked ? "translate-x-[1.45rem]" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

export function ListRow({
  icon: Icon,
  label,
  value,
  desc,
  onClick,
  right,
  danger,
}: {
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value?: string;
  desc?: string;
  onClick?: () => void;
  right?: ReactNode;
  danger?: boolean;
}) {
  const inner = (
    <>
      {Icon && <Icon className="size-4 shrink-0 text-foreground/60" strokeWidth={1.5} />}
      <span className="min-w-0 flex-1">
        <span className={cn("block text-sm", danger && "text-destructive")}>{label}</span>
        {desc && <span className="mt-0.5 block text-xs text-muted-foreground">{desc}</span>}
      </span>
      {value && <span className="mono-num text-xs text-muted-foreground">{value}</span>}
      {right}
    </>
  );
  if (!onClick)
    return <div className="flex min-h-11 w-full items-center gap-3 py-3.5">{inner}</div>;
  return (
    <button
      onClick={onClick}
      className="press flex min-h-11 w-full items-center gap-3 py-3.5 text-left"
    >
      {inner}
    </button>
  );
}

export function EmptyState({
  glyph,
  title,
  body,
  action,
  onAction,
}: {
  glyph: "nft" | "activity" | "search" | "connect";
  title: string;
  body: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <Card ticks className="flex flex-col items-center px-8 py-12 text-center">
      <SketchGlyph kind={glyph} />
      <h3 className="mt-5 text-base font-medium tracking-tight">{title}</h3>
      <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-muted-foreground">{body}</p>
      {action && (
        <CButton variant="outline" size="sm" className="mt-6" onClick={onAction}>
          {action}
        </CButton>
      )}
    </Card>
  );
}

/** Deterministic drafted "QR" block derived from the address string. */
export function QRSketch({ value, className }: { value: string; className?: string }) {
  const n = 21;
  const cells: boolean[] = [];
  let seed = 0;
  for (let i = 0; i < value.length; i++) seed = (seed * 31 + value.charCodeAt(i)) % 100000;
  let s = seed || 7;
  for (let i = 0; i < n * n; i++) {
    s = (s * 1103515245 + 12345) % 2147483648;
    cells.push((s >> 16) % 3 === 0);
  }
  const finder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
  return (
    <div
      className={cn("grid aspect-square w-full gap-[2px] bg-card p-3", className)}
      style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
      role="img"
      aria-label="QR code for your wallet address"
    >
      {cells.map((on, i) => {
        const r = Math.floor(i / n);
        const c = i % n;
        const f = finder(r, c);
        const ring =
          f &&
          ((r % 7 === 0 || r % 7 === 6 || c % 7 === 0 || c % 7 === 6) ||
            (r % 7 >= 2 && r % 7 <= 4 && c % 7 >= 2 && c % 7 <= 4));
        return (
          <span
            key={i}
            className={cn("aspect-square rounded-[1px]", (f ? ring : on) ? "bg-foreground" : "bg-transparent")}
          />
        );
      })}
    </div>
  );
}

/** Sub-screen shell used by every pushed page. */
export function SubScreen({
  title,
  children,
  footer,
}: {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const { back } = useCusp();
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border/80 bg-paper/90 px-4 py-3 backdrop-blur-md">
        <button
          onClick={back}
          aria-label="Go back"
          className="press flex size-11 items-center justify-center rounded-full border border-border bg-card"
        >
          <ArrowLeft className="size-4" />
        </button>
        <h2 className="flex-1 text-sm font-medium tracking-tight">{title}</h2>
      </header>
      <div className="flex-1 px-5 pt-4 pb-10">{children}</div>
      {footer && (
        <div className="sticky bottom-0 border-t border-border/80 bg-paper/92 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-md">
          {footer}
        </div>
      )}
    </div>
  );
}

export function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="mt-3 rounded-xl border border-destructive/40 bg-destructive/5 px-3.5 py-2.5 text-xs leading-relaxed text-destructive">
      {children}
    </p>
  );
}

export function InfoNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-gold/40 bg-gold-soft/30 px-3.5 py-2.5 text-xs leading-relaxed text-foreground/75">
      {children}
    </p>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <SectionLabel>{label}</SectionLabel>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </label>
  );
}

export const inputClass =
  "h-12 w-full rounded-xl border border-input bg-card px-4 text-sm outline-none placeholder:font-sans placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/40";

/* ------------------------------------------------------------------ */
/* Iteration 6 — status, score & loading primitives                    */
/* ------------------------------------------------------------------ */

export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block animate-pulse rounded-lg bg-secondary/80", className)}
    />
  );
}

/** Simple stacked skeleton used while a screen "loads". */
export function SkeletonCard({ rows = 3 }: { rows?: number }) {
  return (
    <Card className="p-5">
      <Skeleton className="h-3 w-24" />
      <div className="mt-4 space-y-2.5">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className={cn("h-3", i % 2 ? "w-3/5" : "w-4/5")} />
        ))}
      </div>
    </Card>
  );
}

/** Small delay hook so pushed screens can show a calm skeleton first. */
export function useSettled(ms = 520) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), ms);
    return () => clearTimeout(t);
  }, [ms]);
  return ready;
}

export function StatusPill({
  tone = "neutral",
  children,
}: {
  tone?: "good" | "warn" | "neutral";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] leading-none",
        tone === "good" && "border-gold/50 bg-gold-soft/40 text-foreground/80",
        tone === "warn" && "border-amber-500/50 bg-amber-500/8 text-foreground/80",
        tone === "neutral" && "border-border bg-secondary text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          tone === "good" && "bg-gold",
          tone === "warn" && "bg-amber-500",
          tone === "neutral" && "bg-border",
        )}
      />
      {children}
    </span>
  );
}

/** Drafted score ring — hand-plotted arc in graphite with a gold sweep. */
export function ScoreRing({ score, className }: { score: number; className?: string }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div className={cn("relative size-28 shrink-0", className)}>
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="3" className="stroke-border" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          className="stroke-gold transition-[stroke-dashoffset] duration-700 [transition-timing-function:var(--ease-calm)]"
          strokeDasharray={c}
          strokeDashoffset={c - (c * Math.min(100, Math.max(0, score))) / 100}
        />
        <circle cx="50" cy="50" r={r - 7} fill="none" strokeWidth="0.5" strokeDasharray="2 4" className="stroke-border" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="mono-num text-2xl font-light leading-none">{score}</span>
        <span className="label-caps mt-1 text-[0.55rem]">/ 100</span>
      </div>
    </div>
  );
}

/** Copy control with an inline, non-intrusive confirmation. */
export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!done) return undefined;
    const t = setTimeout(() => setDone(false), 1600);
    return () => clearTimeout(t);
  }, [done]);
  return (
    <button
      onClick={() => {
        void navigator.clipboard?.writeText(value);
        setDone(true);
      }}
      aria-label={label}
      className={cn(
        "press inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs",
        done && "border-gold/60 bg-gold-soft/40",
        className,
      )}
    >
      {done ? <Check className="size-3.5 text-gold" strokeWidth={2} /> : null}
      {done ? "Copied" : label}
    </button>
  );
}
