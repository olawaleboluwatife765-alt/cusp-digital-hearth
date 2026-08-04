import { useCallback, useEffect, useState } from "react";
import { Check, Delete, Fingerprint, Grid3x3, Info, Shield, X } from "lucide-react";
import { CButton, Card, CuspMark, ErrorNote, SectionLabel, SuccessMark } from "./primitives";
import { GOOGLE_ACCOUNTS } from "./data";
import { useCusp } from "./store";
import type { GoogleAccount } from "./session";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------- */
/* Google                                                            */
/* ---------------------------------------------------------------- */

export function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("size-5", className)} aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.5 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.2 17.7 9.5 24 9.5Z" />
      <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9.1h12.4c-.5 2.9-2.1 5.3-4.6 6.9l7.2 5.6c4.2-3.9 7.1-9.7 7.1-17Z" />
      <path fill="#FBBC05" d="M10.4 28.7a14.5 14.5 0 0 1 0-9.4l-7.8-6.1a24 24 0 0 0 0 21.6l7.8-6.1Z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.2-5.6c-2 1.4-4.6 2.2-8.7 2.2-6.3 0-11.7-3.7-13.6-9.1l-7.8 6.1C6.5 42.6 14.6 48 24 48Z" />
    </svg>
  );
}

export function GoogleButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="press flex h-13 w-full items-center justify-center gap-3 rounded-xl border border-border bg-card text-[0.95rem] font-medium tracking-tight shadow-[var(--shadow-card)] hover:bg-secondary"
    >
      <GoogleLogo /> {label}
    </button>
  );
}

/** Bottom sheet explaining what Google can and cannot do. */
export function LearnSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] mx-auto flex w-full max-w-md items-end">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-foreground/25 backdrop-blur-[2px]" />
      <div className="paper-surface animate-rise relative w-full rounded-t-3xl border-t border-border px-6 pt-5 pb-8 shadow-[var(--shadow-lift)]">
        <div className="mx-auto h-1 w-10 rounded-full bg-border" />
        <button onClick={onClose} aria-label="Close" className="press absolute top-4 right-5 text-muted-foreground hover:text-foreground">
          <X className="size-4" strokeWidth={1.6} />
        </button>
        <SectionLabel className="mt-5">Why Google?</SectionLabel>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Google is only used to verify your identity and simplify onboarding.
        </p>
        <div className="mt-5 space-y-3">
          <Card className="p-4">
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Google can</p>
            <p className="mt-2 flex items-center gap-2 text-sm">
              <Check className="size-4 text-gold" strokeWidth={1.6} /> Verify your identity
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Google cannot</p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {["Access your wallet", "View your recovery phrase", "Sign transactions", "Move your assets"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <X className="size-3.5 text-muted-foreground" strokeWidth={1.6} /> {t}
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-foreground/70">
          Your wallet always remains self-custodial.
        </p>
        <CButton size="lg" className="mt-5 w-full" onClick={onClose}>
          Got it
        </CButton>
      </div>
    </div>
  );
}

export function LearnLink({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="press mt-3 flex w-full items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
      <Info className="size-3.5" strokeWidth={1.6} /> Learn how this works
    </button>
  );
}

export function GoogleAccountPicker({
  onPick,
  onCancel,
}: {
  onPick: (a: GoogleAccount) => void;
  onCancel: () => void;
}) {
  return (
    <div className="animate-rise flex min-h-dvh flex-col justify-center px-6 py-10">
      <Card ticks className="p-6">
        <div className="flex items-center gap-2">
          <GoogleLogo className="size-6" />
          <span className="text-sm font-medium">Choose an account</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">to continue to Cusp</p>
        <div className="mt-5 divide-y divide-border/70">
          {GOOGLE_ACCOUNTS.map((a) => (
            <button
              key={a.email}
              onClick={() => onPick({ ...a })}
              className="press flex w-full items-center gap-3 py-3.5 text-left"
            >
              <span className="flex size-9 items-center justify-center rounded-full border border-border bg-secondary text-xs font-medium">
                {a.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm">{a.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{a.email}</span>
              </span>
            </button>
          ))}
        </div>
        <CButton variant="quiet" className="mt-4 w-full" onClick={onCancel}>
          Cancel
        </CButton>
      </Card>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Simulated sign-in — no real Google account is used.
      </p>
    </div>
  );
}

/** Sequenced status runner: Authenticating → Verifying → Verified. */
export function StepRunner({
  steps,
  finalLabel,
  onDone,
  stepMs = 1100,
}: {
  steps: string[];
  finalLabel?: string;
  onDone: () => void;
  stepMs?: number;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= steps.length) {
      const t = setTimeout(onDone, 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setI((n) => n + 1), stepMs);
    return () => clearTimeout(t);
  }, [i, steps.length, onDone, stepMs]);

  const done = i >= steps.length;
  return (
    <div role="status" aria-live="polite" className="animate-rise flex min-h-dvh flex-col items-center justify-center px-10">
      {done ? <SuccessMark /> : <CuspMark className="size-20 animate-pulse" />}
      <div className="mt-8 w-full max-w-xs space-y-3">
        {steps.map((s, n) => (
          <div
            key={s}
            className={cn(
              "flex items-center gap-3 text-sm transition-opacity duration-500",
              n < i ? "text-muted-foreground" : n === i ? "text-foreground" : "opacity-35",
            )}
          >
            <span
              className={cn(
                "flex size-5 items-center justify-center rounded-full border",
                n < i ? "border-gold/60 bg-gold-soft/50" : "border-border",
              )}
            >
              {n < i ? (
                <Check className="size-3 text-gold" strokeWidth={2} />
              ) : (
                <span className={cn("size-1.5 rounded-full", n === i ? "animate-pulse bg-gold" : "bg-border")} />
              )}
            </span>
            {s}
          </div>
        ))}
      </div>
      {done && finalLabel && <p className="mt-8 text-sm font-medium tracking-tight">{finalLabel}</p>}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* PIN                                                               */
/* ---------------------------------------------------------------- */

export function PinPad({
  title,
  subtitle,
  onComplete,
  error,
  onBack,
  footer,
}: {
  title: string;
  subtitle?: string;
  onComplete: (pin: string) => void;
  error?: string | null;
  onBack?: () => void;
  footer?: React.ReactNode;
}) {
  const [pin, setPin] = useState("");

  useEffect(() => {
    if (error) setPin("");
  }, [error]);

  const push = useCallback(
    (d: string) => {
      setPin((p) => {
        if (p.length >= 6) return p;
        const next = p + d;
        if (next.length === 6) setTimeout(() => onComplete(next), 160);
        return next;
      });
    },
    [onComplete],
  );

  return (
    <div className="animate-rise flex min-h-dvh flex-col items-center justify-center px-8 py-10 text-center">
      <CuspMark className="size-14" />
      <h2 className="mt-6 text-xl font-medium tracking-tight">{title}</h2>
      {subtitle && <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{subtitle}</p>}
      <div className={cn("mt-8 flex items-center gap-3", error && "animate-pulse")} aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "size-3 rounded-full border transition-colors",
              i < pin.length ? "border-gold bg-gold" : "border-border bg-transparent",
            )}
          />
        ))}
      </div>
      {error && <div className="w-full max-w-xs"><ErrorNote>{error}</ErrorNote></div>}
      <div className="mt-8 grid w-full max-w-[16rem] grid-cols-3 gap-3">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
          <button key={d} onClick={() => push(d)} className="press mono-num h-14 rounded-xl border border-border bg-card text-lg hover:bg-secondary">
            {d}
          </button>
        ))}
        <span />
        <button onClick={() => push("0")} className="press mono-num h-14 rounded-xl border border-border bg-card text-lg hover:bg-secondary">
          0
        </button>
        <button
          onClick={() => setPin((p) => p.slice(0, -1))}
          aria-label="Delete"
          className="press flex h-14 items-center justify-center rounded-xl text-muted-foreground hover:text-foreground"
        >
          <Delete className="size-5" strokeWidth={1.5} />
        </button>
      </div>
      {footer && <div className="mt-7 w-full max-w-xs">{footer}</div>}
      {onBack && (
        <CButton variant="quiet" className="mt-4" onClick={onBack}>
          Back
        </CButton>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Biometrics simulation                                             */
/* ---------------------------------------------------------------- */

export function BiometricScan({
  kind,
  label,
  onDone,
}: {
  kind: "fingerprint" | "pattern";
  label: string;
  onDone: () => void;
}) {
  const [phase, setPhase] = useState<"scan" | "ok">("scan");
  useEffect(() => {
    const t = setTimeout(() => setPhase("ok"), 1500);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (phase !== "ok") return undefined;
    const t = setTimeout(onDone, 900);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  const Icon = kind === "fingerprint" ? Fingerprint : Grid3x3;
  return (
    <div role="status" aria-live="polite" className="animate-rise flex min-h-dvh flex-col items-center justify-center px-10 text-center">
      {phase === "ok" ? (
        <SuccessMark />
      ) : (
        <div className="relative flex size-24 items-center justify-center rounded-full border border-gold/40 bg-gold-soft/25">
          <span className="absolute inset-0 animate-ping rounded-full border border-gold/30" />
          <Icon className="size-10 text-foreground/70 animate-pulse" strokeWidth={1.2} />
        </div>
      )}
      <p className="mt-7 text-sm">{phase === "ok" ? "Verified" : label}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Secure your wallet                                                */
/* ---------------------------------------------------------------- */

export function SecureWalletStep({
  onChoose,
}: {
  onChoose: (choice: "fingerprint" | "pattern" | "skip") => void;
}) {
  return (
    <div className="animate-rise flex min-h-dvh flex-col justify-center px-6 py-10">
      <div className="flex items-center gap-2">
        <Shield className="size-4 text-gold" strokeWidth={1.5} />
        <SectionLabel>Secure your wallet</SectionLabel>
      </div>
      <h2 className="mt-4 text-2xl font-medium tracking-tight">Choose how you want to unlock Cusp</h2>
      <div className="mt-7 flex flex-col gap-4">
        <Card ticks className="hero-light p-6">
          <div className="flex items-center gap-2">
            <Fingerprint className="size-5 text-foreground/60" strokeWidth={1.4} />
            <span className="rounded-full border border-gold/50 bg-gold-soft/40 px-2 py-0.5 text-[0.65rem] tracking-wide text-foreground/70 uppercase">
              Recommended
            </span>
          </div>
          <h3 className="mt-4 text-lg font-medium tracking-tight">Enable Fingerprint</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Unlock instantly with a simulated fingerprint check.
          </p>
          <CButton className="mt-5 w-full" onClick={() => onChoose("fingerprint")}>
            Enable Fingerprint
          </CButton>
        </Card>
        <Card className="p-6">
          <Grid3x3 className="size-5 text-foreground/60" strokeWidth={1.4} />
          <h3 className="mt-4 text-lg font-medium tracking-tight">Use Device Pattern</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Prototype simulation of a device pattern lock.
          </p>
          <CButton variant="outline" className="mt-5 w-full" onClick={() => onChoose("pattern")}>
            Use Device Pattern
          </CButton>
        </Card>
        <CButton variant="quiet" className="w-full" onClick={() => onChoose("skip")}>
          Skip for now
        </CButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Lock screen                                                       */
/* ---------------------------------------------------------------- */

export function LockScreen() {
  const { session, unlock } = useCusp();
  const [mode, setMode] = useState<"idle" | "scanning" | "pin">("idle");
  const [error, setError] = useState<string | null>(null);

  const identity = session.googleAccount?.email ?? session.walletName;

  if (mode === "scanning")
    return <BiometricScan kind={session.fingerprint ? "fingerprint" : "pattern"} label="Verifying it's you…" onDone={unlock} />;

  if (mode === "pin")
    return (
      <PinPad
        title="Enter your Cusp PIN"
        subtitle={identity}
        error={error}
        onComplete={(p) => {
          if (session.pin && p === session.pin) {
            setError(null);
            unlock();
          } else {
            setError("That PIN doesn't match. Try again.");
          }
        }}
        footer={
          (session.fingerprint || session.pattern) && (
            <CButton variant="outline" className="w-full" onClick={() => { setError(null); setMode("idle"); }}>
              Use {session.fingerprint ? "fingerprint" : "pattern"} instead
            </CButton>
          )
        }
      />
    );

  return (
    <div className="animate-rise flex min-h-dvh flex-col items-center justify-center px-8 text-center">
      <CuspMark className="size-24" />
      <h1 className="mt-7 text-xl font-medium tracking-tight">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">{session.walletName}</p>
      {session.googleAccount && (
        <p className="mono-num mt-1 text-xs text-muted-foreground">{session.googleAccount.email}</p>
      )}
      <button
        onClick={() => setMode(session.fingerprint || session.pattern ? "scanning" : "pin")}
        aria-label="Unlock with biometrics"
        className="press mt-10 flex size-20 items-center justify-center rounded-full border border-gold/40 bg-gold-soft/25"
      >
        {session.pattern && !session.fingerprint ? (
          <Grid3x3 className="size-8 text-foreground/70" strokeWidth={1.2} />
        ) : (
          <Fingerprint className="size-8 text-foreground/70" strokeWidth={1.2} />
        )}
      </button>
      <CButton
        size="lg"
        className="mt-8 w-full max-w-xs"
        onClick={() => setMode(session.fingerprint || session.pattern ? "scanning" : "pin")}
      >
        Unlock
      </CButton>
      <CButton variant="quiet" className="mt-3" onClick={() => setMode("pin")}>
        Use PIN instead
      </CButton>
    </div>
  );
}
