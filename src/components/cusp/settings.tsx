import {
  Bell,
  ChevronRight,
  Code2,
  Fingerprint,
  Globe,
  HelpCircle,
  Info,
  KeyRound,
  Languages,
  LogOut,
  Network,
  Palette,
  Shield,
  User,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CButton, Card, ConfirmDialog, CuspMark, SectionLabel } from "./primitives";
import { NETWORKS } from "./data";
import { SHORT_ADDRESS, useCusp } from "./store";
import { THEME_OPTIONS } from "./theme";

function Row({
  icon: Icon,
  label,
  value,
  onClick,
}: {
  icon: typeof User;
  label: string;
  value?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick ?? (() => toast(label, { description: "Simulated in this prototype." }))}
      className="press flex w-full items-center gap-3 py-3.5 text-left"
    >
      <Icon className="size-4 text-foreground/60" strokeWidth={1.5} />
      <span className="flex-1 text-sm">{label}</span>
      {value && <span className="mono-num text-xs text-muted-foreground">{value}</span>}
      <ChevronRight className="size-4 text-muted-foreground" />
    </button>
  );
}

export function SettingsScreen() {
  const { currency, language, biometrics, network, openScreen, session, theme, signOut } = useCusp();
  const [logout, setLogout] = useState(false);
  const identity = session.bnsName ?? SHORT_ADDRESS;
  const themeLabel = THEME_OPTIONS.find((t) => t.key === theme)?.label ?? "Paper";
  return (
    <div className="flex flex-col gap-5 px-5 pt-4 pb-8">
      <Card ticks className="hero-light flex items-center gap-4 p-5">
        <CuspMark className="size-12" />
        <div className="min-w-0">
          <p className="text-sm font-medium">{session.walletName}</p>
          <p className="mono-num text-xs text-muted-foreground">{identity}</p>
          {session.googleAccount && (
            <p className="truncate text-xs text-muted-foreground">{session.googleAccount.email}</p>
          )}
        </div>
      </Card>

      <section>
        <SectionLabel>Account</SectionLabel>
        <Card className="mt-3 px-5">
          <div className="divide-y divide-border/70">
            <Row
              icon={UserCircle}
              label="Account & session"
              value={session.googleAccount ? session.googleAccount.name.split(" ")[0] : "Phrase"}
              onClick={() => openScreen("account")}
            />
            <Row icon={User} label="Profile" onClick={() => openScreen("profile")} />
            <Row icon={Palette} label="Appearance" value={themeLabel} onClick={() => openScreen("appearance")} />
            <Row icon={Bell} label="Notifications" onClick={() => openScreen("notifications")} />
            <Row icon={LogOut} label="Log out" onClick={() => setLogout(true)} />
          </div>
        </Card>
      </section>

      <section>
        <SectionLabel>Security</SectionLabel>
        <Card className="mt-3 px-5">
          <div className="divide-y divide-border/70">
            <Row icon={Shield} label="Security" onClick={() => openScreen("security")} />
            <Row icon={KeyRound} label="Recovery Center" onClick={() => openScreen("recovery")} />
            <Row icon={Fingerprint} label="Biometrics" value={biometrics ? "On" : "Off"} onClick={() => openScreen("security")} />
          </div>
        </Card>
      </section>

      <section>
        <SectionLabel>Preferences</SectionLabel>
        <Card className="mt-3 px-5">
          <div className="divide-y divide-border/70">
            <Row icon={Globe} label="Currency" value={currency} onClick={() => openScreen("currency")} />
            <Row icon={Languages} label="Language" value={language} onClick={() => openScreen("language")} />
            <Row icon={Network} label="Networks" value={NETWORKS[network].label} onClick={() => openScreen("networks")} />
          </div>
        </Card>
      </section>

      <section>
        <SectionLabel>Support</SectionLabel>
        <Card className="mt-3 px-5">
          <div className="divide-y divide-border/70">
            <Row icon={HelpCircle} label="Help" onClick={() => openScreen("help")} />
            <Row icon={Info} label="About Cusp" value="v0.1.0" onClick={() => openScreen("about")} />
          </div>
        </Card>
      </section>

      <section>
        <SectionLabel>Legal</SectionLabel>
        <Card className="mt-3 px-5">
          <div className="divide-y divide-border/70">
            <Row icon={Info} label="Privacy" onClick={() => openScreen("privacy")} />
            <Row icon={Info} label="Terms" onClick={() => openScreen("terms")} />
            <Row icon={Info} label="Licenses" onClick={() => openScreen("licenses")} />
          </div>
        </Card>
      </section>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        Designed for a decentralized future.
      </p>

      <section>
        <SectionLabel>Developer</SectionLabel>
        <Card className="mt-3 px-5">
          <div className="divide-y divide-border/70">
            <Row icon={Code2} label="Prototype tools" value="Reset" onClick={() => openScreen("developer")} />
          </div>
        </Card>
        <p className="mt-2 text-center text-[0.65rem] text-muted-foreground">
          For testing and demonstrations only.
        </p>
      </section>

      <ConfirmDialog
        open={logout}
        title="Log out of Cusp?"
        description="You'll be signed out on this device. You can sign back in anytime using the same Google account or restore your wallet with your recovery phrase."
        confirmLabel="Log Out"
        danger
        onCancel={() => setLogout(false)}
        onConfirm={() => {
          setLogout(false);
          signOut();
          toast.success("Signed out of Cusp");
        }}
      />
    </div>
  );
}