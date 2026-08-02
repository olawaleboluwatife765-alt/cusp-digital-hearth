import { useState } from "react";
import {
  Bell,
  BookOpen,
  Check,
  Fingerprint,
  Globe,
  KeyRound,
  Laptop,
  Link2,
  Lock,
  Shield,
  ShieldCheck,
  Timer,
  User,
} from "lucide-react";
import { toast } from "sonner";
import {
  CButton,
  Card,
  InfoNote,
  ListRow,
  SectionLabel,
  SubScreen,
  Toggle,
  EmptyState,
} from "./primitives";
import { CURRENCIES, DEVICES, LANGUAGES, LEARN, SECURITY_TIPS, type CurrencyKey } from "./data";
import { SHORT_ADDRESS, useCusp } from "./store";
import { cn } from "@/lib/utils";

export function NotificationsScreen() {
  const { notifications, markAllRead } = useCusp();
  return (
    <SubScreen title="Notifications">
      {notifications.length === 0 ? (
        <EmptyState glyph="activity" title="Nothing new." body="Updates will appear here." />
      ) : (
        <>
          <div className="flex justify-end">
            <CButton variant="quiet" size="sm" onClick={markAllRead}>
              Mark all read
            </CButton>
          </div>
          <Card className="mt-2 px-5">
            <div className="divide-y divide-border/70">
              {notifications.map((n) => (
                <div key={n.id} className="flex gap-3 py-3.5">
                  <span
                    className={cn(
                      "mt-1.5 size-1.5 shrink-0 rounded-full",
                      n.read ? "bg-border" : "bg-gold",
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{n.body}</p>
                    <p className="mono-num mt-1 text-[0.65rem] text-muted-foreground">{n.when}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </SubScreen>
  );
}

export function SecurityScreen() {
  const {
    biometrics,
    setBiometrics,
    autoLock,
    pinSet,
    setPinSet,
    phraseBackedUp,
    openScreen,
    setLocked,
  } = useCusp();
  return (
    <SubScreen title="Security Center">
      <Card ticks className="hero-light p-5">
        <SectionLabel>Security status</SectionLabel>
        <p className="mt-3 text-sm leading-relaxed text-foreground/75">
          {phraseBackedUp
            ? "Your wallet is backed up and protected on this device."
            : "One step left: verify your recovery phrase so you can always restore this wallet."}
        </p>
        {!phraseBackedUp && (
          <CButton size="sm" className="mt-4" onClick={() => openScreen("recovery")}>
            Open Recovery Center
          </CButton>
        )}
      </Card>

      <Card className="mt-4 px-5">
        <div className="divide-y divide-border/70">
          <ListRow
            icon={Fingerprint}
            label="Biometric authentication"
            right={<Toggle checked={biometrics} onChange={setBiometrics} label="Biometrics" />}
          />
          <ListRow
            icon={Lock}
            label="PIN"
            value={pinSet ? "Set" : "Not set"}
            onClick={() => {
              setPinSet(true);
              toast.success("PIN updated");
            }}
          />
          <ListRow
            icon={Timer}
            label="Auto-lock timer"
            value={autoLock}
            onClick={() => openScreen("autolock")}
          />
          <ListRow
            icon={Lock}
            label="Lock wallet now"
            onClick={() => {
              setLocked(true);
              toast("Wallet locked");
            }}
          />
          <ListRow icon={Laptop} label="Connected devices" onClick={() => openScreen("devices")} />
          <ListRow icon={Link2} label="Connected apps" onClick={() => openScreen("connectedApps")} />
          <ListRow
            icon={KeyRound}
            label="Recovery phrase status"
            value={phraseBackedUp ? "Verified" : "Not verified"}
            onClick={() => openScreen("recovery")}
          />
        </div>
      </Card>

      <SectionLabel className="mt-6">Security tips</SectionLabel>
      <Card className="mt-3 p-5">
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

export function RecoveryScreen() {
  const { phraseBackedUp, setPhraseBackedUp, openScreen } = useCusp();
  return (
    <SubScreen title="Recovery Center">
      <Card ticks className="hero-light p-5">
        <SectionLabel>Backup status</SectionLabel>
        <p className="mt-3 flex items-center gap-2 text-sm">
          <span
            className={cn("size-2 rounded-full", phraseBackedUp ? "bg-emerald-600" : "bg-amber-500")}
          />
          {phraseBackedUp ? "Recovery phrase verified" : "Recovery phrase not verified"}
        </p>
        <CButton
          size="sm"
          className="mt-4"
          onClick={() => {
            setPhraseBackedUp(true);
            toast.success("Recovery verified");
          }}
        >
          {phraseBackedUp ? "Verify again" : "Verify recovery phrase"}
        </CButton>
      </Card>

      <Card className="mt-4 px-5">
        <div className="divide-y divide-border/70">
          <ListRow
            icon={Bell}
            label="Backup reminder"
            value="Weekly"
            onClick={() => toast("Reminder set for weekly")}
          />
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

export function ConnectedAppsScreen() {
  const { connections, disconnect, setTab } = useCusp();
  return (
    <SubScreen title="Connected apps">
      {connections.length === 0 ? (
        <EmptyState
          glyph="connect"
          title="No connected apps."
          body="Apps you approve from Explore will appear here."
          action="Explore apps"
          onAction={() => setTab("explore")}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {connections.map((c) => (
            <Card key={c.name} className="p-5">
              <p className="text-sm font-medium">{c.name}</p>
              <p className="mono-num text-xs text-muted-foreground">{c.url}</p>
              <div className="mt-3 space-y-1.5">
                {c.permissions.map((p) => (
                  <p key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={2} />
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{c.connected}</span>
                <CButton
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    disconnect(c.name);
                    toast(`${c.name} disconnected`);
                  }}
                >
                  Disconnect
                </CButton>
              </div>
            </Card>
          ))}
        </div>
      )}
    </SubScreen>
  );
}

export function DevicesScreen() {
  return (
    <SubScreen title="Devices & sessions">
      <Card className="px-5">
        <div className="divide-y divide-border/70">
          {DEVICES.map((d) => (
            <ListRow
              key={d.name}
              icon={Laptop}
              label={d.name}
              desc={d.detail}
              right={
                d.current ? (
                  <span className="text-xs text-gold">This device</span>
                ) : (
                  <CButton
                    variant="quiet"
                    size="sm"
                    onClick={() => toast(`Signed out of ${d.name}`)}
                  >
                    Sign out
                  </CButton>
                )
              }
            />
          ))}
        </div>
      </Card>
      <div className="mt-4">
        <InfoNote>Signing out a device never affects your funds — your keys stay with you.</InfoNote>
      </div>
    </SubScreen>
  );
}

export function AutoLockScreen() {
  const { autoLock, setAutoLock } = useCusp();
  const options = ["Immediately", "1 minute", "5 minutes", "15 minutes", "1 hour"];
  return (
    <SubScreen title="Auto-lock timer">
      <Card className="px-5">
        <div className="divide-y divide-border/70">
          {options.map((o) => (
            <ListRow
              key={o}
              label={o}
              onClick={() => {
                setAutoLock(o);
                toast.success("Settings saved");
              }}
              right={o === autoLock ? <Check className="size-4 text-gold" /> : undefined}
            />
          ))}
        </div>
      </Card>
    </SubScreen>
  );
}

export function CurrencyScreen() {
  const { currency, setCurrency } = useCusp();
  return (
    <SubScreen title="Currency">
      <Card className="px-5">
        <div className="divide-y divide-border/70">
          {(Object.keys(CURRENCIES) as CurrencyKey[]).map((k) => (
            <ListRow
              key={k}
              icon={Globe}
              label={`${k} — ${CURRENCIES[k].label}`}
              onClick={() => {
                setCurrency(k);
                toast.success("Settings saved");
              }}
              right={k === currency ? <Check className="size-4 text-gold" /> : undefined}
            />
          ))}
        </div>
      </Card>
    </SubScreen>
  );
}

export function LanguageScreen() {
  const { language, setLanguage } = useCusp();
  return (
    <SubScreen title="Language">
      <Card className="px-5">
        <div className="divide-y divide-border/70">
          {LANGUAGES.map((l) => (
            <ListRow
              key={l}
              label={l}
              onClick={() => {
                setLanguage(l);
                toast.success("Settings saved");
              }}
              right={l === language ? <Check className="size-4 text-gold" /> : undefined}
            />
          ))}
        </div>
      </Card>
    </SubScreen>
  );
}

export function ProfileScreen() {
  const [name, setName] = useState("My Wallet");
  return (
    <SubScreen
      title="Profile"
      footer={
        <CButton size="lg" className="w-full" onClick={() => toast.success("Settings saved")}>
          Save changes
        </CButton>
      }
    >
      <Card ticks className="hero-light flex items-center gap-4 p-5">
        <span className="flex size-12 items-center justify-center rounded-full border border-border bg-secondary">
          <User className="size-5 text-foreground/60" strokeWidth={1.5} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium">{name}</p>
          <p className="mono-num text-xs text-muted-foreground">{SHORT_ADDRESS}</p>
        </div>
      </Card>
      <label className="mt-5 block">
        <SectionLabel>Wallet name</SectionLabel>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Wallet name"
          maxLength={40}
          className="mt-2 h-12 w-full rounded-xl border border-input bg-card px-4 text-sm outline-none focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/40"
        />
      </label>
    </SubScreen>
  );
}

export function AppearanceScreen() {
  const [theme, setTheme] = useState("Paper");
  return (
    <SubScreen title="Appearance">
      <Card className="px-5">
        <div className="divide-y divide-border/70">
          {["Paper", "Graphite (coming soon)", "Match system (coming soon)"].map((t) => (
            <ListRow
              key={t}
              label={t}
              onClick={() => {
                if (t !== "Paper") {
                  toast("Coming soon", { description: "Paper is the only theme for now." });
                  return;
                }
                setTheme(t);
                toast.success("Settings saved");
              }}
              right={t === theme ? <Check className="size-4 text-gold" /> : undefined}
            />
          ))}
        </div>
      </Card>
    </SubScreen>
  );
}

export function LearnScreen() {
  return (
    <SubScreen title="Learn">
      <div className="flex flex-col gap-3">
        {LEARN.map((l) => (
          <Card key={l.title} className="p-5">
            <h3 className="text-sm font-medium">{l.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{l.body}</p>
          </Card>
        ))}
      </div>
    </SubScreen>
  );
}

export function InfoPage({ title, body }: { title: string; body: string[] }) {
  return (
    <SubScreen title={title}>
      <Card className="p-5">
        {body.map((p) => (
          <p key={p} className="mb-3 text-sm leading-relaxed text-muted-foreground last:mb-0">
            {p}
          </p>
        ))}
      </Card>
    </SubScreen>
  );
}

export function HelpScreen() {
  return (
    <SubScreen title="Help & Support">
      <Card className="px-5">
        <div className="divide-y divide-border/70">
          {[
            "How do I fund my wallet?",
            "What is a recovery phrase?",
            "Is Cusp self-custodial?",
            "How do I disconnect an app?",
          ].map((q) => (
            <ListRow key={q} label={q} onClick={() => toast(q, { description: "Opens the help centre." })} />
          ))}
        </div>
      </Card>
      <Card className="mt-4 p-5">
        <Shield className="size-5 text-foreground/60" strokeWidth={1.4} />
        <h3 className="mt-3 text-sm font-medium">Contact support</h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Support will never ask for your recovery phrase or private keys.
        </p>
        <CButton variant="outline" size="sm" className="mt-4" onClick={() => toast("Message sent")}>
          Send a message
        </CButton>
      </Card>
    </SubScreen>
  );
}
