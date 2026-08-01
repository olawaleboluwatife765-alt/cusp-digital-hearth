import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import markAsset from "@/assets/cusp-mark.jpg.asset.json";

export function CuspMark({ className }: { className?: string }) {
  return (
    <img
      src={markAsset.url}
      alt="Cusp logo"
      className={cn("select-none object-contain mix-blend-multiply", className)}
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