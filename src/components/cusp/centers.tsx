import { useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  Fingerprint,
  KeyRound,
  Laptop,
  LifeBuoy,
  Link2,
  Lock,
  ShieldCheck,
  Timer,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  CButton,
  Card,
  CopyButton,
  EmptyState,
  InfoNote,
  ListRow,
  ScoreRing,
  SectionLabel,
  SkeletonCard,
  StatusPill,
  SubScreen,
  SuccessPanel,
  Toggle,
  useSettled,
} from "./primitives";
import {
  EMERGENCY_STEPS,
  LEARN,
  PERMISSION_EXPLAIN,
  RECOVERY_CHECKLIST,
  SECURITY_ACTIVITY,
  SECURITY_RECOMMENDATIONS,
  SECURITY_TIPS,
  WORDS,
} from "./data";
import { useCusp } from "./store";
import { cn } from "@/lib/utils";

/* ----------------------------- Security Center ---------------------------- */

export function SecurityScreen() {
  const {
    securityScore,
    biometrics,
    setBiometrics,
    autoLock,
    pinSet,
    setPinSet,
    phraseBackedUp,
    googleVerified,
    connections,
    sessions,
    openScreen,
    setLocked,
  } = useCusp();
  const ready = useSettled();

  const tone = securityScore >= 80 ? "good" : securityScore >= 60 ? "neutral" : "warn";
  const open = securityScore >= 100 ? 0 : undefined;

  if (!ready)
    return (
      <SubScreen title="Security Center">
        <div className="flex flex-col gap-4">
          <SkeletonCard rows={2} />
          <SkeletonCard rows={4} />
          <SkeletonCard rows={3} />
        </div>
      </SubScreen>
    );

  return (
    <SubScreen title="Security Center">
      <Card ticks className="hero-light flex items-center gap-5 p-5">
        <ScoreRing score={securityScore} />
        <div className="min-w-0">
          <SectionLabel>Security score</SectionLabel>
          <p className="mt-2 text-sm leading-relaxed text-foreground/75">
            {securityScore >= 90
              ? "Excellent. Your wallet is protected and recoverable."
              : securityScore >= 70
                ? "Good. A couple of steps left to be fully protected."
                : "Let's strengthen this. Start with your recovery phrase."}
          </p>
          <button
            onClick={() => openScreen("recommendations")}
            className="press mt-3 text-xs text-gold underline underline-offset-4"
          >
            {open === 0 ? "Review recommendations" : "See recommendations"}
          </button>
        </div>
      </Card>

      <SectionLabel className="mt-6">Identity & recovery</SectionLabel>
      <Card className="mt-3 px-5">
        <div className="divide-y divide-border/70">
          <ListRow
            icon={ShieldCheck}
            label="Google identity"
            desc="Used only to confirm it's you"
            right={<StatusPill tone={googleVerified ? "good" : "warn"}>{googleVerified ? "Verified" : "Not linked"}</StatusPill>}
            onClick={() => openScreen("googleIdentity")}
          />
          <ListRow
            icon={KeyRound}
            label="Recovery phrase"
            desc="The only way to restore this wallet"
            right={<StatusPill tone={phraseBackedUp ? "good" : "warn"}>{phraseBackedUp ? "Backed up" : "Not verified"}</StatusPill>}
            onClick={() => openScreen("recovery")}
          />
        </div>
      </Card>

      <SectionLabel className="mt-6">Device protection</SectionLabel>
      <Card className="mt-3 px-5">
        <div className="divide-y divide-border/70">
          <ListRow
            icon={Fingerprint}
            label="Biometrics"
            desc="Face or fingerprint on this device"
            right={<Toggle checked={biometrics} onChange={(v) => { setBiometrics(v); toast.success(v ? "Biometrics on" : "Biometrics off"); }} label="Biometrics" />}
          />
          <ListRow
            icon={Lock}
            label="Wallet PIN"
            value={pinSet ? "Set" : "Not set"}
            onClick={() => {
              setPinSet(true);
              toast.success("PIN updated");
            }}
          />
          <ListRow icon={Timer} label="Auto-lock timer" value={autoLock} onClick={() => openScreen("autolock")} />
          <ListRow
            icon={Lock}
            label="Lock wallet now"
            onClick={() => {
              setLocked(true);
              toast("Wallet locked");
            }}
          />
        </div>
      </Card>

      <SectionLabel className="mt-6">Access</SectionLabel>
      <Card className="mt-3 px-5">
        <div className="divide-y divide-border/70">
          <ListRow
            icon={Link2}
            label="Connected apps"
            value={`${connections.length}`}
            onClick={() => openScreen("connectedApps")}
          />
          <ListRow
            icon={Laptop}
            label="Active sessions"
            value={`${sessions.length}`}
            onClick={() => openScreen("sessions")}
          />
          <ListRow
            icon={ShieldCheck}
            label="Recent security activity"
            onClick={() => openScreen("securityActivity")}
          />
        </div>
      </Card>

      <SectionLabel className="mt-6">Good habits</SectionLabel>
      <Card className={cn("mt-3 p-5", tone === "warn" && "border-amber-500/40")}>
        <div className="space-y-2.5">
          {SECURITY_TIPS.map((t) => (
            <p key={t} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={1.6} />
              {t}
            </p>
          ))}
        </div>
      </Card>
    </SubScreen>
  );
}

export function RecommendationsScreen() {
  const { phraseBackedUp, pinSet, setPinSet, biometrics, setBiometrics, openScreen, setTab, closeAll } =
    useCusp();
  const done: Record<string, boolean> = {
    verify: phraseBackedUp,
    pin: pinSet,
    biometrics,
    review: false,
  };
  const act = (id: string) => {
    if (id === "verify") openScreen("verifyPhrase");
    if (id === "pin") {
      setPinSet(true);
      toast.success("PIN updated");
    }
    if (id === "biometrics") {
      setBiometrics(true);
      toast.success("Biometrics on");
    }
    if (id === "review") {
      closeAll();
      setTab("connect");
    }
  };
  return (
    <SubScreen title="Recommendations">
      <p className="text-sm text-muted-foreground">
        Small steps, each one raising your security score.
      </p>
      <div className="mt-4 flex flex-col gap-3">
        {SECURITY_RECOMMENDATIONS.map((r) => (
          <Card key={r.id} className="p-5">
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border",
                  done[r.id] ? "border-gold/60 bg-gold-soft/50" : "border-border bg-secondary",
                )}
              >
                {done[r.id] ? <Check className="size-3.5 text-gold" strokeWidth={2} /> : null}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{r.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{r.body}</p>
              </div>
            </div>
            {!done[r.id] && (
              <CButton variant="outline" size="sm" className="mt-4" onClick={() => act(r.id)}>
                Do this now
              </CButton>
            )}
          </Card>
        ))}
      </div>
    </SubScreen>
  );
}

export function GoogleIdentityScreen() {
  const { googleVerified, setGoogleVerified } = useCusp();
  return (
    <SubScreen title="Google identity">
      <Card ticks className="hero-light p-5">
        <SectionLabel>Status</SectionLabel>
        <div className="mt-3 flex items-center gap-3">
          <StatusPill tone={googleVerified ? "good" : "warn"}>
            {googleVerified ? "Verified" : "Not linked"}
          </StatusPill>
          <span className="mono-num text-xs text-muted-foreground">you@gmail.com</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-foreground/75">
          Google only confirms that it's you at sign-in. It never holds your keys, sees your
          balances, or approves transactions.
        </p>
      </Card>

      <Card className="mt-4 p-5">
        <SectionLabel>What Google can and cannot do</SectionLabel>
        <div className="mt-3 space-y-2">
          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <Check className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={2} />
            Confirm your identity when you sign in on a new device.
          </p>
          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <X className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.6} />
            Access your recovery phrase, keys, or funds.
          </p>
          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <X className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.6} />
            Restore your wallet on its own — only your phrase can do that.
          </p>
        </div>
      </Card>

      <div className="mt-4">
        <CButton
          variant="outline"
          className="w-full"
          onClick={() => {
            setGoogleVerified(!googleVerified);
            toast(googleVerified ? "Google identity unlinked" : "Google identity verified");
          }}
        >
          {googleVerified ? "Unlink Google identity" : "Verify with Google"}
        </CButton>
      </div>
      <div className="mt-4">
        <InfoNote>Unlinking never affects your wallet — your keys stay on this device.</InfoNote>
      </div>
    </SubScreen>
  );
}

export function SessionsScreen() {
  const { sessions, revokeSession } = useCusp();
  return (
    <SubScreen title="Active sessions">
      {sessions.length === 0 ? (
        <EmptyState glyph="connect" title="No active sessions." body="Sign in again to start a new session." />
      ) : (
        <div className="flex flex-col gap-3">
          {sessions.map((s) => (
            <Card key={s.id} className="p-5">
              <div className="flex items-start gap-3">
                <Laptop className="mt-0.5 size-4 shrink-0 text-foreground/60" strokeWidth={1.5} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{s.device}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{s.place}</p>
                  <p className="mono-num mt-1 text-[0.65rem] text-muted-foreground">
                    {s.ip} · {s.when}
                  </p>
                </div>
                {s.current ? (
                  <StatusPill tone="good">This device</StatusPill>
                ) : (
                  <CButton
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      revokeSession(s.id);
                      toast(`Signed out of ${s.device}`);
                    }}
                  >
                    Sign out
                  </CButton>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
      <div className="mt-4">
        <InfoNote>Ending a session never moves funds. Your keys never leave this device.</InfoNote>
      </div>
    </SubScreen>
  );
}

export function SecurityActivityScreen() {
  const ready = useSettled(420);
  return (
    <SubScreen title="Security activity">
      {!ready ? (
        <SkeletonCard rows={5} />
      ) : (
        <Card className="px-5">
          <div className="divide-y divide-border/70">
            {SECURITY_ACTIVITY.map((a) => (
              <div key={a.id} className="flex gap-3 py-3.5">
                <span
                  className={cn(
                    "mt-1.5 size-1.5 shrink-0 rounded-full",
                    a.tone === "ok" && "bg-gold",
                    a.tone === "warn" && "bg-amber-500",
                    a.tone === "note" && "bg-border",
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.detail}</p>
                  <p className="mono-num mt-1 text-[0.65rem] text-muted-foreground">{a.when}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      <div className="mt-4">
        <InfoNote>See something you don't recognise? Open Security Center and lock your wallet.</InfoNote>
      </div>
    </SubScreen>
  );
}

/* ----------------------------- Recovery Center ---------------------------- */

export function RecoveryScreen() {
  const { phraseBackedUp, checklist, openScreen } = useCusp();
  const complete = RECOVERY_CHECKLIST.filter(
    (c) => checklist.includes(c.id) || (c.id === "verified" && phraseBackedUp),
  ).length;
  return (
    <SubScreen title="Recovery Center">
      <Card ticks className="hero-light p-5">
        <SectionLabel>Backup status</SectionLabel>
        <div className="mt-3 flex items-center gap-3">
          <StatusPill tone={phraseBackedUp ? "good" : "warn"}>
            {phraseBackedUp ? "Verified" : "Not verified"}
          </StatusPill>
          <span className="mono-num text-xs text-muted-foreground">
            {complete}/{RECOVERY_CHECKLIST.length} checklist
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-foreground/75">
          {phraseBackedUp
            ? "Your 12-word phrase has been confirmed. Keep it offline and never share it."
            : "Verifying takes two minutes and proves your written copy can restore this wallet."}
        </p>
        <CButton size="sm" className="mt-4" onClick={() => openScreen("verifyPhrase")}>
          {phraseBackedUp ? "Verify again" : "Verify recovery phrase"}
        </CButton>
      </Card>

      <Card className="mt-4 px-5">
        <div className="divide-y divide-border/70">
          <ListRow
            icon={Check}
            label="Recovery checklist"
            value={`${complete}/${RECOVERY_CHECKLIST.length}`}
            onClick={() => openScreen("recoveryChecklist")}
          />
          <ListRow icon={LifeBuoy} label="Emergency recovery guidance" onClick={() => openScreen("emergency")} />
          <ListRow icon={BookOpen} label="Learn about self-custody" onClick={() => openScreen("learn")} />
          <ListRow
            icon={KeyRound}
            label="Restore a wallet"
            onClick={() => toast("Restore", { description: "Available from the sign-in screen." })}
          />
        </div>
      </Card>

      <SectionLabel className="mt-6">Why this matters</SectionLabel>
      <div className="mt-3 flex flex-col gap-3">
        {LEARN.slice(3).map((l) => (
          <Card key={l.title} className="p-5">
            <h3 className="text-sm font-medium">{l.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{l.body}</p>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <InfoNote>Cusp support will never ask for your recovery phrase.</InfoNote>
      </div>
    </SubScreen>
  );
}

export function RecoveryChecklistScreen() {
  const { checklist, toggleChecklist, phraseBackedUp, openScreen } = useCusp();
  return (
    <SubScreen title="Recovery checklist">
      <p className="text-sm text-muted-foreground">
        Tick each item once it's genuinely true. Nothing here leaves your device.
      </p>
      <Card className="mt-4 px-5">
        <div className="divide-y divide-border/70">
          {RECOVERY_CHECKLIST.map((c) => {
            const on = c.id === "verified" ? phraseBackedUp : checklist.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() =>
                  c.id === "verified" ? openScreen("verifyPhrase") : toggleChecklist(c.id)
                }
                className="press flex w-full items-start gap-3 py-3.5 text-left"
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border",
                    on ? "border-gold/60 bg-gold-soft/50" : "border-border bg-secondary",
                  )}
                >
                  {on ? <Check className="size-3 text-gold" strokeWidth={2.4} /> : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm">{c.label}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{c.detail}</span>
                </span>
              </button>
            );
          })}
        </div>
      </Card>
    </SubScreen>
  );
}

export function EmergencyScreen() {
  return (
    <SubScreen title="Emergency guidance">
      <p className="text-sm text-muted-foreground">
        Calm, specific steps for the moments that matter most.
      </p>
      <div className="mt-4 flex flex-col gap-3">
        {EMERGENCY_STEPS.map((s) => (
          <Card key={s.title} className="p-5">
            <h3 className="text-sm font-medium">{s.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <InfoNote>
          Self-custody means no one can freeze or reverse a transfer for you — including Cusp.
        </InfoNote>
      </div>
    </SubScreen>
  );
}

export function VerifyPhraseScreen() {
  const { setPhraseBackedUp, back } = useCusp();
  const [step, setStep] = useState<"intro" | "quiz" | "done">("intro");
  const [picked, setPicked] = useState<string | null>(null);
  const [wrong, setWrong] = useState(false);

  const target = WORDS[6]!;
  const options = useMemo(() => {
    const set = new Set<string>([target]);
    let i = 0;
    while (set.size < 4) set.add(WORDS[(i++ * 3 + 1) % WORDS.length]!);
    return [...set].sort();
  }, [target]);

  if (step === "done")
    return (
      <SubScreen title="Recovery verified">
        <SuccessPanel
          title="Recovery phrase verified"
          body="Your written copy is correct. You can restore this wallet on any device."
        >
          <CButton className="mt-7 w-full" onClick={back}>
            Back to Recovery Center
          </CButton>
        </SuccessPanel>
      </SubScreen>
    );

  if (step === "quiz")
    return (
      <SubScreen title="Verify phrase">
        <SectionLabel>Confirm word 7</SectionLabel>
        <p className="mt-2 text-sm text-muted-foreground">
          Select the seventh word of your recovery phrase.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {options.map((w) => (
            <button
              key={w}
              onClick={() => {
                setPicked(w);
                setWrong(false);
              }}
              className={cn(
                "press draft-card mono-num px-4 py-4 text-sm",
                picked === w && "border-gold/70 bg-gold-soft/30",
              )}
            >
              {w}
            </button>
          ))}
        </div>
        {wrong && (
          <p role="alert" className="mt-4 text-xs text-destructive">
            That isn't word 7. Check your written copy and try again.
          </p>
        )}
        <div className="mt-6">
          <CButton
            size="lg"
            className="w-full"
            disabled={!picked}
            onClick={() => {
              if (picked !== target) {
                setWrong(true);
                return;
              }
              setPhraseBackedUp(true);
              setStep("done");
            }}
          >
            Confirm
          </CButton>
        </div>
      </SubScreen>
    );

  return (
    <SubScreen
      title="Verify phrase"
      footer={
        <CButton size="lg" className="w-full" onClick={() => setStep("quiz")}>
          I have my phrase ready
        </CButton>
      }
    >
      <Card ticks className="hero-light p-5">
        <SectionLabel>Before you begin</SectionLabel>
        <p className="mt-3 text-sm leading-relaxed text-foreground/75">
          Find your written 12-word phrase. Cusp will ask you to confirm one word — never the
          whole phrase, and never through a message or a call.
        </p>
      </Card>
      <Card className="mt-4 p-5">
        <div className="space-y-2.5">
          {[
            "Make sure no one can see your screen.",
            "Keep the phrase on paper, not in a photo.",
            "Word order is part of the secret.",
          ].map((t) => (
            <p key={t} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={1.6} />
              {t}
            </p>
          ))}
        </div>
      </Card>
    </SubScreen>
  );
}

/* --------------------------- Permission history --------------------------- */

export function PermissionHistoryScreen() {
  const { permissionHistory } = useCusp();
  return (
    <SubScreen title="Permission history">
      {permissionHistory.length === 0 ? (
        <EmptyState glyph="connect" title="Nothing here yet." body="Approvals and revocations will be recorded here." />
      ) : (
        <Card className="px-5">
          <div className="divide-y divide-border/70">
            {permissionHistory.map((p) => (
              <div key={p.id} className="py-3.5">
                <div className="flex items-center gap-2">
                  <p className="flex-1 text-sm font-medium">{p.app}</p>
                  <StatusPill tone={p.action === "granted" ? "good" : p.action === "rejected" ? "warn" : "neutral"}>
                    {p.action}
                  </StatusPill>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.detail}</p>
                <p className="mono-num mt-1 text-[0.65rem] text-muted-foreground">{p.when}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
      <div className="mt-4">
        <InfoNote>Permissions are stored on this device and can be revoked at any time.</InfoNote>
      </div>
    </SubScreen>
  );
}

/* -------------------------- Permission explainer -------------------------- */

export function PermissionExplainer({ permissions }: { permissions: string[] }) {
  return (
    <div className="space-y-3">
      {permissions.map((p) => {
        const e = PERMISSION_EXPLAIN.find((x) => x.key === p);
        return (
          <div key={p} className="rounded-xl border border-border bg-secondary/40 p-3.5">
            <p className="flex items-start gap-2 text-xs font-medium">
              <Check className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={2} />
              {p}
            </p>
            {e && (
              <>
                <p className="mt-1.5 pl-5 text-[0.7rem] leading-relaxed text-muted-foreground">
                  {e.can}
                </p>
                <p className="mt-1 flex items-start gap-2 pl-5 text-[0.7rem] leading-relaxed text-muted-foreground">
                  <X className="mt-0.5 size-3 shrink-0" strokeWidth={1.6} />
                  {e.cannot}
                </p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export { CopyButton };
