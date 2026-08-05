import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, KeyRound, Shield, Sparkles, Wallet } from "lucide-react";
import { CButton, Card, CuspMark, Divider, SectionLabel } from "./primitives";
import {
  BiometricScan,
  GoogleAccountPicker,
  GoogleButton,
  GoogleLogo,
  LearnLink,
  LearnSheet,
  PinPad,
  SecureWalletStep,
  StepRunner,
} from "./auth";
import type { GoogleAccount } from "./session";
import { useCusp } from "./store";
import { WORDS } from "./data";
import { TipCard } from "./tips";
import { cn } from "@/lib/utils";

export function Splash() {
  const { setStage, session, hydrated } = useCusp();
  useEffect(() => {
    if (!hydrated) return undefined;
    const t = setTimeout(
      () => setStage(session.walletExists && session.signedIn ? "lock" : "brand"),
      2200,
    );
    return () => clearTimeout(t);
  }, [setStage, hydrated, session.walletExists, session.signedIn]);

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden">
      <div className="animate-emerge relative">
        <div className="absolute inset-0 -m-16 rounded-full bg-[radial-gradient(circle,var(--gold-soft),transparent_65%)] opacity-60 blur-2xl" />
        <CuspMark className="relative size-44" />
      </div>
    </div>
  );
}

function Screen({
  children,
  onBack,
  title,
}: {
  children: React.ReactNode;
  onBack?: () => void;
  title?: string;
}) {
  return (
    <div className="animate-rise flex min-h-dvh flex-col px-6 pt-6 pb-10">
      {(onBack || title) && (
        <div className="mb-6 flex h-9 items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="press flex size-9 items-center justify-center rounded-full border border-border bg-card"
              aria-label="Back"
            >
              <ArrowLeft className="size-4" />
            </button>
          )}
          {title && <SectionLabel>{title}</SectionLabel>}
        </div>
      )}
      {children}
    </div>
  );
}

export function BrandScreen() {
  const { setStage } = useCusp();
  return (
    <div className="animate-rise flex min-h-dvh flex-col items-center justify-center px-8 text-center">
      <CuspMark className="size-28" />
      <h1 className="mt-8 text-4xl font-medium tracking-[0.18em] uppercase">Cusp</h1>
      <div className="mt-4 h-px w-16 bg-gold" />
      <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-muted-foreground">
        Your simple gateway to digital ownership.
      </p>
      <CButton size="lg" className="mt-12 w-full max-w-xs" onClick={() => setStage("select")}>
        Continue
      </CButton>
    </div>
  );
}

export function WalletSelect() {
  const { setStage } = useCusp();
  const options = [
    {
      icon: Sparkles,
      title: "Create New Wallet",
      desc: "Create a brand-new self-custodial wallet.",
      cta: "Create New Wallet",
      go: () => setStage("create"),
    },
    {
      icon: Wallet,
      title: "Import Existing Wallet",
      desc: "Restore your existing wallet using Google or your recovery phrase.",
      cta: "Import Existing Wallet",
      go: () => setStage("import"),
    },
  ];
  return (
    <Screen onBack={() => setStage("brand")} title="Get started">
      <h2 className="text-2xl font-medium tracking-tight">Set up your wallet</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Two ways in. Both keep your keys entirely yours.
      </p>
      <div className="mt-8 flex flex-col gap-4">
        {options.map((o) => (
          <Card key={o.title} ticks className="hero-light p-6">
            <o.icon className="size-5 text-foreground/60" strokeWidth={1.4} />
            <h3 className="mt-4 text-lg font-medium tracking-tight">{o.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.desc}</p>
            <CButton className="mt-5 w-full" onClick={o.go}>
              {o.cta}
            </CButton>
          </Card>
        ))}
      </div>
    </Screen>
  );
}

function ProgressRun({ label, onDone }: { label: string; onDone: () => void }) {
  const [pct, setPct] = useState(6);
  useEffect(() => {
    const i = setInterval(() => setPct((p) => (p >= 100 ? 100 : p + 4)), 70);
    return () => clearInterval(i);
  }, []);
  useEffect(() => {
    if (pct >= 100) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [pct, onDone]);
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-10 text-center">
      <CuspMark className="size-24 animate-pulse" />
      <p className="mt-8 text-sm text-foreground">{label}</p>
      <div className="mt-5 h-[3px] w-56 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-gold transition-[width] duration-200 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mono-num mt-3 text-xs text-muted-foreground">{pct}%</p>
    </div>
  );
}

function WalletReady({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="animate-rise flex min-h-dvh flex-col items-center justify-center px-8 text-center">
      <div className="flex size-16 items-center justify-center rounded-full border border-gold/50 bg-gold-soft/40">
        <Check className="size-7 text-gold" strokeWidth={1.6} />
      </div>
      <h2 className="mt-7 text-2xl font-medium tracking-tight">Wallet created</h2>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
        Your Cusp wallet is ready. You hold the keys — nobody else can move your assets.
      </p>
      <TipCard
        id="wallet-created"
        label="Did you know?"
        title="🎉 Wallet Created"
        body="Your crypto isn't stored inside this app. Your wallet securely holds the keys that prove ownership of your assets."
        action="Got it"
        className="mt-8 w-full max-w-xs text-left"
      />
      <CButton size="lg" className="mt-10 w-full max-w-xs" onClick={onContinue}>
        Continue to Dashboard
      </CButton>
    </div>
  );
}

type CreateStep =
  | "method"
  | "google"
  | "picker"
  | "authing"
  | "phrase"
  | "confirm"
  | "pin"
  | "pinConfirm"
  | "secure"
  | "scan"
  | "creating"
  | "done";

export function CreateWallet() {
  const { setStage, setWalletMethod, updateSession, setPinSet, setBiometrics } = useCusp();
  const [step, setStep] = useState<CreateStep>("method");
  const [learn, setLearn] = useState(false);
  const [account, setAccount] = useState<GoogleAccount | null>(null);
  const [method, setMethod] = useState<"google" | "phrase">("google");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState<string | null>(null);
  const [scanKind, setScanKind] = useState<"fingerprint" | "pattern">("fingerprint");
  const [unlockChoice, setUnlockChoice] = useState<"fingerprint" | "pattern" | "skip">("skip");
  const phrase = useMemo(() => WORDS, []);
  const checkIndexes = useMemo(() => [2, 6, 10], []);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [error, setError] = useState<string | null>(null);

  const finish = () => {
    updateSession({
      walletExists: true,
      firstLaunchDone: true,
      authMethod: method,
      googleAccount: account,
      walletName: "My Wallet",
      pin,
      fingerprint: unlockChoice === "fingerprint",
      pattern: unlockChoice === "pattern",
    });
    setPinSet(true);
    setBiometrics(unlockChoice === "fingerprint");
    setWalletMethod(method);
    setStep("done");
  };

  if (step === "creating")
    return (
      <StepRunner
        steps={[
          "Creating your wallet…",
          "Generating Bitcoin & Stacks addresses…",
          "Securing wallet…",
          "Preparing dashboard…",
        ]}
        finalLabel="Wallet Ready"
        onDone={finish}
      />
    );
  if (step === "done") return <WalletReady onContinue={() => setStage("app")} />;

  if (step === "scan")
    return (
      <BiometricScan
        kind={scanKind}
        label={scanKind === "fingerprint" ? "Touch the sensor to enrol…" : "Draw your pattern…"}
        onDone={() => setStep("creating")}
      />
    );

  if (step === "secure")
    return (
      <SecureWalletStep
        onChoose={(c) => {
          setUnlockChoice(c);
          if (c === "skip") {
            setStep("creating");
            return;
          }
          setScanKind(c);
          setStep("scan");
        }}
      />
    );

  if (step === "pin")
    return (
      <PinPad
        key="pin-create"
        title="Create your Cusp PIN"
        subtitle="Choose a six-digit PIN. It unlocks Cusp on this device and never leaves it."
        onComplete={(p) => {
          setPin(p);
          setPinError(null);
          setStep("pinConfirm");
        }}
        onBack={() => setStep("method")}
      />
    );

  if (step === "pinConfirm")
    return (
      <PinPad
        key="pin-confirm"
        title="Confirm your PIN"
        subtitle="Enter the same six digits again."
        error={pinError}
        onComplete={(p) => {
          if (p !== pin) {
            setPinError("Those PINs don't match. Try once more.");
            return;
          }
          setPinError(null);
          setStep("secure");
        }}
        onBack={() => setStep("pin")}
      />
    );

  if (step === "authing")
    return (
      <StepRunner
        steps={["Authenticating…", "Verifying identity…"]}
        finalLabel="Identity verified."
        onDone={() => setStep("pin")}
      />
    );

  if (step === "picker")
    return (
      <GoogleAccountPicker
        onCancel={() => setStep("google")}
        onPick={(a) => {
          setAccount(a);
          setMethod("google");
          setStep("authing");
        }}
      />
    );

  if (step === "google") {
    return (
      <Screen onBack={() => setStep("method")} title="Create · Google">
        <h2 className="text-2xl font-medium tracking-tight">Continue with Google</h2>
        <Card className="mt-6 p-5">
          <div className="flex items-start gap-3">
            <Shield className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
            <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>Google is used only to verify your identity.</p>
              <p>Your wallet remains completely self-custodial.</p>
              <p>Google cannot access your assets.</p>
            </div>
          </div>
        </Card>
        <div className="mt-6">
          <GoogleButton label="Continue with Google" onClick={() => setStep("picker")} />
          <LearnLink onClick={() => setLearn(true)} />
        </div>
        <LearnSheet open={learn} onClose={() => setLearn(false)} />
      </Screen>
    );
  }

  if (step === "phrase") {
    return (
      <Screen onBack={() => setStep("method")} title="Create · Recovery phrase">
        <h2 className="text-2xl font-medium tracking-tight">Your recovery phrase</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Write these 12 words down in order and keep them offline. Anyone with this phrase controls
          your wallet.
        </p>
        <Card ticks className="mt-6 grid grid-cols-2 gap-x-3 gap-y-2.5 p-5">
          {phrase.map((w, i) => (
            <div key={w} className="flex items-baseline gap-2 border-b border-border/70 pb-1.5">
              <span className="mono-num w-5 text-[0.7rem] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mono-num text-sm">{w}</span>
            </div>
          ))}
        </Card>
        <CButton size="lg" className="mt-6 w-full" onClick={() => setStep("confirm")}>
          I've written it down <ArrowRight className="size-4" />
        </CButton>
        <TipCard
          id="phrase-security"
          label="Security tip"
          title="Never share your recovery phrase"
          body="Not even with Cusp support. Anyone with access to it can control your wallet."
          className="mt-4"
        />
      </Screen>
    );
  }

  if (step === "confirm") {
    const verify = () => {
      const ok = checkIndexes.every(
        (i) => (answers[i] ?? "").trim().toLowerCase() === (phrase[i] ?? "").toLowerCase(),
      );
      if (!ok) {
        setError("Those words don't match your recovery phrase. Check the order and try again.");
        return;
      }
      setError(null);
      setMethod("phrase");
      setAccount(null);
      setStep("pin");
    };
    return (
      <Screen onBack={() => setStep("phrase")} title="Create · Confirm">
        <h2 className="text-2xl font-medium tracking-tight">Confirm your phrase</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the following words to confirm you saved the phrase.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          {checkIndexes.map((i) => (
            <label key={i} className="block">
              <SectionLabel>Word {i + 1}</SectionLabel>
              <input
                value={answers[i] ?? ""}
                onChange={(e) => setAnswers((a) => ({ ...a, [i]: e.target.value }))}
                placeholder="Type the word"
                className="mono-num mt-2 h-12 w-full rounded-xl border border-input bg-card px-4 text-sm outline-none placeholder:font-sans placeholder:text-muted-foreground/70 focus:border-gold focus:ring-1 focus:ring-gold/40"
              />
            </label>
          ))}
        </div>
        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        <CButton size="lg" className="mt-6 w-full" onClick={verify}>
          Confirm and create wallet
        </CButton>
      </Screen>
    );
  }

  return (
    <Screen onBack={() => setStage("select")} title="Create wallet">
      <h2 className="text-2xl font-medium tracking-tight">Choose how to create</h2>
      <div className="mt-7 flex flex-col gap-4">
        <Card ticks className="hero-light p-6">
          <div className="flex items-center gap-2">
            <GoogleLogo />
            <span className="rounded-full border border-gold/50 bg-gold-soft/40 px-2 py-0.5 text-[0.65rem] tracking-wide text-foreground/70 uppercase">
              Recommended
            </span>
          </div>
          <h3 className="mt-4 text-lg font-medium tracking-tight">Continue with Google</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Google verifies your identity only. Your keys stay with you.
          </p>
          <div className="mt-5">
            <GoogleButton label="Continue with Google" onClick={() => setStep("google")} />
            <LearnLink onClick={() => setLearn(true)} />
          </div>
        </Card>
        <Card className="p-6">
          <KeyRound className="size-5 text-foreground/60" strokeWidth={1.4} />
          <h3 className="mt-4 text-lg font-medium tracking-tight">Secret Recovery Phrase</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Generate a 12-word phrase and store it yourself.
          </p>
          <CButton variant="outline" className="mt-5 w-full" onClick={() => setStep("phrase")}>
            Create with recovery phrase
          </CButton>
        </Card>
      </div>
      <LearnSheet open={learn} onClose={() => setLearn(false)} />
    </Screen>
  );
}

type ImportStep = "method" | "google" | "picker" | "authing" | "phrase" | "pin" | "creating" | "done";

export function ImportWallet() {
  const { setStage, updateSession, setPinSet, setWalletMethod } = useCusp();
  const [step, setStep] = useState<ImportStep>("method");
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<GoogleAccount | null>(null);
  const [method, setMethod] = useState<"google" | "phrase">("phrase");
  const [pin, setPin] = useState("");

  const words = value.trim().split(/\s+/).filter(Boolean);
  const valid = words.length === 12 || words.length === 24;

  if (step === "creating")
    return (
      <ProgressRun
        label="Restoring your Cusp Wallet…"
        onDone={() => {
          updateSession({
            walletExists: true,
            firstLaunchDone: true,
            authMethod: method,
            googleAccount: account,
            pin,
            fingerprint: false,
            pattern: false,
          });
          setPinSet(true);
          setWalletMethod(method);
          setStep("done");
        }}
      />
    );

  if (step === "pin")
    return (
      <PinPad
        title="Create your Cusp PIN"
        subtitle="Six digits to unlock this restored wallet on this device."
        onComplete={(p) => {
          setPin(p);
          setStep("creating");
        }}
        onBack={() => setStep("method")}
      />
    );

  if (step === "authing")
    return (
      <StepRunner
        steps={["Authenticating…", "Verifying identity…"]}
        finalLabel="Identity verified."
        onDone={() => setStep("pin")}
      />
    );

  if (step === "picker")
    return (
      <GoogleAccountPicker
        onCancel={() => setStep("google")}
        onPick={(a) => {
          setAccount(a);
          setMethod("google");
          setStep("authing");
        }}
      />
    );
  if (step === "done")
    return (
      <div className="animate-rise flex min-h-dvh flex-col items-center justify-center px-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-full border border-gold/50 bg-gold-soft/40">
          <Check className="size-7 text-gold" strokeWidth={1.6} />
        </div>
        <h2 className="mt-7 text-2xl font-medium tracking-tight">Wallet restored</h2>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Welcome back. Your accounts have been recovered on this device.
        </p>
        <CButton size="lg" className="mt-10 w-full max-w-xs" onClick={() => setStage("app")}>
          Continue to Dashboard
        </CButton>
      </div>
    );

  if (step === "phrase") {
    return (
      <Screen onBack={() => setStep("method")} title="Import · Recovery phrase">
        <h2 className="text-2xl font-medium tracking-tight">Enter your recovery phrase</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Paste or type your 12 or 24 words, separated by spaces.
        </p>
        <textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
          rows={5}
          placeholder="anchor beacon cinder …"
          className={cn(
            "mono-num mt-6 w-full resize-none rounded-xl border bg-card p-4 text-sm leading-relaxed outline-none placeholder:font-sans placeholder:text-muted-foreground/70 focus:ring-1",
            error
              ? "border-destructive focus:ring-destructive/30"
              : "border-input focus:border-gold focus:ring-gold/40",
          )}
        />
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="mono-num text-muted-foreground">{words.length} words</span>
          <span className={cn("mono-num", valid ? "text-gold" : "text-muted-foreground")}>
            {valid ? "Valid length" : "Needs 12 or 24"}
          </span>
        </div>
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        <CButton
          size="lg"
          className="mt-6 w-full"
          onClick={() => {
            if (!valid) {
              setError("A recovery phrase must be exactly 12 or 24 words.");
              return;
            }
            setMethod("phrase");
            setStep("pin");
          }}
        >
          Restore wallet
        </CButton>
      </Screen>
    );
  }

  if (step === "google") {
    return (
      <Screen onBack={() => setStep("method")} title="Import · Google">
        <h2 className="text-2xl font-medium tracking-tight">Continue with Google</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          For users who previously created a Cusp wallet using Google.
        </p>
        <div className="mt-8">
          <GoogleButton label="Continue with Google" onClick={() => setStep("picker")} />
        </div>
      </Screen>
    );
  }

  return (
    <Screen onBack={() => setStage("select")} title="Import wallet">
      <h2 className="text-2xl font-medium tracking-tight">Restore your wallet</h2>
      <div className="mt-7 flex flex-col gap-4">
        <Card ticks className="hero-light p-6">
          <GoogleLogo />
          <h3 className="mt-4 text-lg font-medium tracking-tight">Continue with Google</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            For users who previously created a Cusp wallet using Google.
          </p>
          <div className="mt-5">
            <GoogleButton label="Continue with Google" onClick={() => setStep("google")} />
          </div>
        </Card>
        <div className="flex items-center gap-4">
          <Divider className="flex-1" />
          <span className="text-xs text-muted-foreground">or</span>
          <Divider className="flex-1" />
        </div>
        <Card className="p-6">
          <KeyRound className="size-5 text-foreground/60" strokeWidth={1.4} />
          <h3 className="mt-4 text-lg font-medium tracking-tight">Import Recovery Phrase</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Accepts 12 or 24 words.
          </p>
          <CButton variant="outline" className="mt-5 w-full" onClick={() => setStep("phrase")}>
            Enter recovery phrase
          </CButton>
        </Card>
      </div>
    </Screen>
  );
}