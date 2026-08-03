import { useState } from "react";
import {
  Bell,
  BookUser,
  ChevronDown,
  Compass,
  Copy,
  HelpCircle,
  Home,
  Info,
  KeyRound,
  Link2,
  Network,
  Settings,
  Shield,
  Wallet,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { CButton, Card, CuspMark, SectionLabel } from "./primitives";
import { NETWORKS } from "./data";
import { SHORT_ADDRESS, useCusp, type NetworkKey, type TabKey } from "./store";
import { cn } from "@/lib/utils";

const NAV: { key: TabKey; label: string; icon: typeof Home }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "explore", label: "Explore", icon: Compass },
  { key: "connect", label: "Connect", icon: Link2 },
  { key: "settings", label: "Settings", icon: Settings },
];

export function TopBar() {
  const { setDrawerOpen, openScreen, unread } = useCusp();
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border/80 bg-paper/85 px-5 py-3 backdrop-blur-md">
      <button
        onClick={() => setDrawerOpen(true)}
        aria-label="Open menu"
        className="press shrink-0"
      >
        <CuspMark className="size-9" />
      </button>
      <div className="flex-1 text-center">
        <p className="flex items-center justify-center gap-1 text-sm font-medium tracking-tight">
          My Wallet <ChevronDown className="size-3.5 text-muted-foreground" />
        </p>
        <button
          onClick={() => {
            void navigator.clipboard?.writeText(SHORT_ADDRESS);
            toast.success("Address copied");
          }}
          className="mono-num mt-0.5 flex items-center justify-center gap-1.5 text-[0.7rem] text-muted-foreground"
        >
          {SHORT_ADDRESS} <Copy className="size-3" />
        </button>
      </div>
      <button
        onClick={() => openScreen("notifications")}
        aria-label="Notifications"
        className="press relative flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card"
      >
        <Bell className="size-4" strokeWidth={1.5} />
        {unread > 0 && <span className="absolute top-1.5 right-2 size-1.5 rounded-full bg-gold" />}
      </button>
    </header>
  );
}

export function NetworkBanner() {
  const { network, openScreen } = useCusp();
  if (network === "mainnet") return null;
  return (
    <button
      onClick={() => openScreen("networks")}
      className="press flex w-full items-center justify-center gap-2 border-b border-amber-500/40 bg-amber-500/8 px-5 py-2 text-[0.7rem] text-foreground/75"
    >
      <span className={cn("size-1.5 rounded-full", NETWORKS[network].dot)} />
      {NETWORKS[network].label} — test assets with no real value
    </button>
  );
}

export function BottomNav() {
  const { tab, setTab } = useCusp();
  return (
    <nav className="sticky bottom-0 z-30 grid grid-cols-4 border-t border-border/80 bg-paper/90 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] backdrop-blur-md">
      {NAV.map((n) => {
        const active = n.key === tab;
        return (
          <button
            key={n.key}
            onClick={() => setTab(n.key)}
            className="press flex flex-col items-center gap-1.5 py-1"
          >
            <n.icon
              className={cn("size-[1.15rem]", active ? "text-gold" : "text-muted-foreground")}
              strokeWidth={active ? 1.7 : 1.4}
            />
            <span
              className={cn(
                "text-[0.68rem]",
                active ? "font-medium text-gold" : "text-muted-foreground",
              )}
            >
              {n.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export function NavDrawer() {
  const { drawerOpen, setDrawerOpen, network, setNetwork, openScreen } = useCusp();
  const [pending, setPending] = useState<NetworkKey | null>(null);
  const [netOpen, setNetOpen] = useState(false);

  const items = [
    { icon: Wallet, label: "Manage Wallets", onClick: () => { setDrawerOpen(false); openScreen("manageWallets"); } },
    { icon: Shield, label: "Security Center", onClick: () => { setDrawerOpen(false); openScreen("security"); } },
    { icon: KeyRound, label: "Recovery Center", onClick: () => { setDrawerOpen(false); openScreen("recovery"); } },
    { icon: BookUser, label: "Address Book", onClick: () => { setDrawerOpen(false); openScreen("addressBook"); } },
    { icon: Link2, label: "Connected Apps", onClick: () => { setDrawerOpen(false); openScreen("connectedApps"); } },
    { icon: Network, label: "Networks", onClick: () => setNetOpen(true) },
    { icon: HelpCircle, label: "Help & Support", onClick: () => { setDrawerOpen(false); openScreen("help"); } },
    { icon: Info, label: "About Cusp", onClick: () => { setDrawerOpen(false); openScreen("about"); } },
  ];

  return (
    <>
      <div
        onClick={() => setDrawerOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-graphite/35 transition-opacity duration-300",
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        className={cn(
          "paper-surface fixed inset-y-0 left-0 z-50 flex w-[19rem] max-w-[86vw] flex-col border-r border-border shadow-[var(--shadow-lift)] transition-transform duration-350 [transition-timing-function:var(--ease-calm)]",
          drawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-start justify-between px-6 pt-7">
          <div>
            <CuspMark className="size-14" />
            <p className="mt-3 text-lg tracking-[0.2em] uppercase">Cusp</p>
            <p className="mt-1 text-xs text-muted-foreground">Own what's next.</p>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="press flex size-8 items-center justify-center rounded-full border border-border bg-card"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-7 flex-1 overflow-y-auto px-4 pb-6">
          {items.map((i) => (
            <button
              key={i.label}
              onClick={() =>
                i.onClick
                  ? i.onClick()
                  : toast(i.label, { description: "Simulated in this prototype." })
              }
              className="press flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-secondary"
            >
              <i.icon className="size-[1.05rem] text-foreground/60" strokeWidth={1.5} />
              <span className="text-sm">{i.label}</span>
            </button>
          ))}

          <Card className="mt-5 p-4">
            <SectionLabel>Network</SectionLabel>
            <button
              onClick={() => setNetOpen(true)}
              className="press mt-2 flex w-full items-center gap-2"
            >
              <span className={cn("size-2 rounded-full", NETWORKS[network].dot)} />
              <span className="flex-1 text-left text-sm">{NETWORKS[network].label}</span>
              <span className="text-xs text-muted-foreground">Change</span>
            </button>
          </Card>
        </div>

        <p className="px-6 pb-7 text-[0.65rem] leading-relaxed text-muted-foreground">
          v0.1.0 — Designed for a decentralized future.
        </p>
      </aside>

      {/* Network sheet */}
      <div
        className={cn(
          "fixed inset-0 z-60 transition-opacity duration-300",
          netOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="absolute inset-0 bg-graphite/35" onClick={() => setNetOpen(false)} />
        <div
          className={cn(
            "paper-surface absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-border p-6 shadow-[var(--shadow-lift)] transition-transform duration-350 [transition-timing-function:var(--ease-calm)]",
            netOpen ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border" />
          <SectionLabel>Network</SectionLabel>
          <div className="mt-3 flex flex-col gap-2">
            {(Object.keys(NETWORKS) as NetworkKey[]).map((k) => (
              <button
                key={k}
                onClick={() => (k === network ? setNetOpen(false) : setPending(k))}
                className={cn(
                  "press draft-card flex items-center gap-3 p-4 text-left",
                  k === network && "border-gold/60",
                )}
              >
                <span className={cn("size-2 rounded-full", NETWORKS[k].dot)} />
                <span className="flex-1">
                  <span className="block text-sm font-medium">{NETWORKS[k].label}</span>
                  <span className="block text-xs text-muted-foreground">{NETWORKS[k].note}</span>
                </span>
                {k === network && <span className="text-xs text-gold">Active</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation dialog */}
      {pending && (
        <div className="fixed inset-0 z-70 flex items-center justify-center px-8">
          <div className="absolute inset-0 bg-graphite/45" onClick={() => setPending(null)} />
          <Card ticks className="animate-rise relative w-full max-w-sm p-6">
            <h3 className="text-lg font-medium tracking-tight">
              Switch to {NETWORKS[pending].label}?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {pending === "mainnet"
                ? "Mainnet uses real assets with real value."
                : "Test networks use test assets with no real value. Balances and transactions here are not real."}
            </p>
            <div className="mt-6 flex gap-3">
              <CButton variant="outline" className="flex-1" onClick={() => setPending(null)}>
                Cancel
              </CButton>
              <CButton
                className="flex-1"
                onClick={() => {
                  setNetwork(pending);
                  setPending(null);
                  setNetOpen(false);
                  toast.success(`Network changed to ${NETWORKS[pending].label}`);
                }}
              >
                Switch
              </CButton>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}