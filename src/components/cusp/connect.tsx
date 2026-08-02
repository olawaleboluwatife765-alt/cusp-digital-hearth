import { useState } from "react";
import { Check, Link2, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { CButton, Card, SectionLabel, SketchGlyph, TokenGlyph } from "./primitives";
import { RECENT_CONNECTIONS } from "./data";
import { TipBanner } from "./tips";
import { useCusp } from "./store";

export function ConnectScreen() {
  const { connections, connect, disconnect } = useCusp();
  const apps = connections;
  const [request, setRequest] = useState<{ name: string; url: string } | null>({
    name: "Bitflow",
    url: "app.bitflow.finance",
  });

  return (
    <div className="flex flex-col gap-5 px-5 pt-4 pb-8">
      <div>
        <h2 className="text-xl font-medium tracking-tight">Connections</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Every app sees only what you allow. Nothing more.
        </p>
      </div>

      <section>
        <SectionLabel>Connection requests</SectionLabel>
        {request ? (
          <Card ticks className="hero-light mt-3 p-5">
            <div className="flex items-center gap-3">
              <TokenGlyph symbol={request.name} className="rounded-xl" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{request.name}</p>
                <p className="mono-num text-xs text-muted-foreground">{request.url}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {["View your wallet address", "Request transaction signatures"].map((p) => (
                <p key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={1.6} />
                  {p}
                </p>
              ))}
              <p className="flex items-start gap-2 text-xs text-muted-foreground">
                <X className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.6} />
                Only your public wallet address is shared unless you approve more
              </p>
            </div>
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
                  setRequest(null);
                  toast("Request declined");
                }}
              >
                Decline
              </CButton>
              <CButton
                className="flex-1"
                onClick={() => {
                  connect({
                    name: request.name,
                    url: request.url,
                    verified: true,
                    connected: "Connected just now",
                    permissions: [
                      "View wallet address",
                      "Read balances",
                      "Request transaction approvals",
                    ],
                  });
                  setRequest(null);
                  toast.success(`${request.name} connected`);
                }}
              >
                Approve
              </CButton>
            </div>
          </Card>
        ) : (
          <Card className="mt-3 px-5 py-6 text-center">
            <p className="text-sm text-muted-foreground">No pending requests.</p>
          </Card>
        )}
      </section>

      <section>
        <SectionLabel>Connected apps</SectionLabel>
        {apps.length === 0 ? (
          <Card className="mt-3 flex flex-col items-center px-8 py-12 text-center">
            <SketchGlyph kind="connect" />
            <h3 className="mt-5 text-base font-medium">No apps connected.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Apps you connect from Explore will appear here.
            </p>
          </Card>
        ) : (
          <div className="mt-3 flex flex-col gap-3">
            {apps.map((a) => (
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
    </div>
  );
}