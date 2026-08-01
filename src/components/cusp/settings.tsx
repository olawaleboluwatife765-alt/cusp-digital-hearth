import { useState } from "react";
import {
  Bell,
  ChevronRight,
  Fingerprint,
  Globe,
  HelpCircle,
  Info,
  KeyRound,
  Languages,
  Palette,
  Shield,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CuspMark, SectionLabel } from "./primitives";
import { SHORT_ADDRESS } from "./store";

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
  const [currency] = useState("USD");
  return (
    <div className="flex flex-col gap-5 px-5 pt-4 pb-8">
      <Card ticks className="hero-light flex items-center gap-4 p-5">
        <CuspMark className="size-12" />
        <div className="min-w-0">
          <p className="text-sm font-medium">My Wallet</p>
          <p className="mono-num text-xs text-muted-foreground">{SHORT_ADDRESS}</p>
        </div>
      </Card>

      <section>
        <SectionLabel>Account</SectionLabel>
        <Card className="mt-3 px-5">
          <div className="divide-y divide-border/70">
            <Row icon={User} label="Profile" />
            <Row icon={Palette} label="Appearance" value="Paper" />
            <Row icon={Bell} label="Notifications" />
          </div>
        </Card>
      </section>

      <section>
        <SectionLabel>Security</SectionLabel>
        <Card className="mt-3 px-5">
          <div className="divide-y divide-border/70">
            <Row icon={Shield} label="Security" />
            <Row icon={KeyRound} label="Recovery Center" value="Not backed up" />
            <Row icon={Fingerprint} label="Biometrics" value="On" />
          </div>
        </Card>
      </section>

      <section>
        <SectionLabel>Preferences</SectionLabel>
        <Card className="mt-3 px-5">
          <div className="divide-y divide-border/70">
            <Row icon={Globe} label="Currency" value={currency} />
            <Row icon={Languages} label="Language" value="English" />
          </div>
        </Card>
      </section>

      <section>
        <SectionLabel>Support</SectionLabel>
        <Card className="mt-3 px-5">
          <div className="divide-y divide-border/70">
            <Row icon={HelpCircle} label="Help" />
            <Row icon={Info} label="About Cusp" value="v0.1.0" />
          </div>
        </Card>
      </section>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        Designed for a decentralized future.
      </p>
    </div>
  );
}