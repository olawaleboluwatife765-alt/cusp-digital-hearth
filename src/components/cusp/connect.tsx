import { Check, History, Link2, ShieldAlert, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { CButton, Card, SectionLabel, SketchGlyph, StatusPill, TokenGlyph } from "./primitives";
import { NETWORKS, RECENT_CONNECTIONS } from "./data";
import { PermissionExplainer } from "./centers";
import { TipBanner } from "./tips";
import { SHORT_ADDRESS, useCusp } from "./store";

export function ConnectScreen() {
  const { connections, disconnect, pendingRequests, resolveRequest, network, openScreen } =
    useCusp();

  return (
    <div className="flex flex-col gap-5 px-5 pt-4 pb-8">
      <div>
        <h2 className="text-xl font-medium tracking-tight">Connections</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Every app sees only what you allow. Nothing more.
        </p>
      </div>

      <section>
        <div className="flex items-center justify-between">
          <SectionLabel>Connection requests</SectionLabel>
          {pendingRequests.length > 0 && (
            <span className="mono-num text-xs text-muted-foreground">
              {pendingRequests.length} pending
            </span>
          )}
        </div>
        {pendingRequests.length === 0 ? (
          <Card className="mt-3 px-5 py-6 text-center">
            <p className="text-sm text-muted-foreground">No pending requests.</p>
          </Card>
        ) : (
          <div className="mt-3 flex flex-col gap-3">
            {pendingRequests.map((r) => (
              <Card key={r.id} ticks className="hero-light p-5">
                <div className="flex items-center gap-3">
                  <TokenGlyph symbol={r.name} className="rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="mono-num text-xs text-muted-foreground">{r.url}</p>
                  </div>
                  <StatusPill tone={r.verified ? "good" : "warn"}>
                    {r.verified ? "Verified" : "Unverified"}
                  </StatusPill>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
                  <div>
                    <SectionLabel>Network</SectionLabel>
                    <p className="mt-1 text-xs">{NETWORKS[network].label}</p>
                  </div>
                  <div>
                    <SectionLabel>Wallet</SectionLabel>
                    <p className="mono-num mt-1 text-xs">{SHORT_ADDRESS}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <SectionLabel>Requested permissions</SectionLabel>
                  <div className="mt-2">
                    <PermissionExplainer permissions={r.permissions} />
                  </div>
                </div>

                {!r.verified && (
                  <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                    <ShieldAlert className="mt-0.5 size-3.5 shrink-0 text-amber-500" strokeWidth={1.6} />
                    This app hasn't been verified by the Stacks ecosystem directory. Approve only if
                    you trust it.
                  </p>
                )}

                <div className="mt-5">
                  <TipBanner id="connect-review">
                    Always review what an app is requesting before approving access.
                  </TipBanner>
                </div>

                <div className="mt-3 flex gap-3">
                  <CButton
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      resolveRequest(r.id, "reject");
                      toast(`${r.name} request rejected`);
                    }}
                  >
                    Reject
                  </CButton>
                  <CButton
                    className="flex-1"
                    onClick={() => {
                      resolveRequest(r.id, "approve");
                      toast.success(`${r.name} connected`);
                    }}
                  >
                    Approve
                  </CButton>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionLabel>Connected apps</SectionLabel>
        {connections.length === 0 ? (
          <Card className="mt-3 flex flex-col items-center px-8 py-12 text-center">
            <SketchGlyph kind="connect" />
            <h3 className="mt-5 text-base font-medium">No apps connected.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Apps you connect from Explore will appear here.
            </p>
          </Card>
        ) : (
          <div className="mt-3 flex flex-col gap-3">
            {connections.map((a) => (
              <Card key={a.name} className="p-5">
                <div className="flex items-center gap-3">
                  <TokenGlyph symbol={a.name} className="rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{a.name}</p>
                    <p className="mono-num text-xs text-muted-foreground">{a.url}</p>
                  </div>
                  <Link2 className="size-4 text-gold" strokeWidth={1.6} />
                </div>
                <div className="mt-4 border-t border-border pt-4">
                  <SectionLabel>Granted permissions</SectionLabel>
                  <div className="mt-2 space-y-1.5">
                    {a.permissions.map((p) => (
                      <p key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={2} />
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{a.connected}</span>
                  <CButton
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      disconnect(a.name);
                      toast(`${a.name} disconnected`);
                    }}
                  >
                    Disconnect
                  </CButton>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionLabel>Permission history</SectionLabel>
        <Card className="mt-3 px-5">
          <button
            onClick={() => openScreen("permissionHistory")}
            className="press flex min-h-11 w-full items-center gap-3 py-3.5 text-left"
          >
            <History className="size-4 shrink-0 text-foreground/60" strokeWidth={1.5} />
            <span className="flex-1 text-sm">Every approval and revocation</span>
            <span className="text-xs text-muted-foreground">View</span>
          </button>
        </Card>
      </section>

      <section>
        <SectionLabel>Recent connections</SectionLabel>
        <Card className="mt-3 px-5">
          <div className="divide-y divide-border/70">
            {RECENT_CONNECTIONS.map((r) => (
              <div key={r.name} className="flex items-center gap-3 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.when}</p>
                </div>
                <CButton
                  variant="quiet"
                  size="sm"
                  onClick={() => toast(`Reconnect ${r.name}`, { description: "Simulated." })}
                >
                  Reconnect
                </CButton>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <p className="flex items-start gap-2 px-1 text-xs leading-relaxed text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={1.6} />
        No app can move your assets. Every transaction still needs your approval on this device.
      </p>
    </div>
  );
}
