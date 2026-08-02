import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Building2,
  ChevronRight,
  Copy,
  CreditCard,
  Repeat,
  Share2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import {
  CButton,
  Card,
  ErrorNote,
  Field,
  InfoNote,
  ListRow,
  LoadingRun,
  QRSketch,
  SectionLabel,
  SubScreen,
  SuccessPanel,
  TokenGlyph,
  EmptyState,
  inputClass,
} from "./primitives";
import {
  ADDRESS,
  SHORT_ADDRESS,
  formatAmount,
  formatFiat,
  makeHash,
  useCusp,
  type Asset,
} from "./store";
import { cn } from "@/lib/utils";

/* ---------------------------------- Send --------------------------------- */

type SendStep = "asset" | "recipient" | "amount" | "review" | "sending" | "done" | "failed";

export function SendScreen() {
  const { assets, currency, debit, addTx, settleTx, pushNotification, back, openScreen, closeAll } =
    useCusp();
  const [step, setStep] = useState<SendStep>("asset");
  const [asset, setAsset] = useState<Asset | null>(null);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [hash, setHash] = useState("");

  const num = Number(amount);
  const usd = asset ? num * asset.priceUsd : 0;

  if (step === "sending")
    return (
      <SubScreen title="Sending">
        <LoadingRun
          label="Broadcasting transaction…"
          onDone={() => {
            const id = `tx${Date.now()}`;
            const h = makeHash();
            setHash(h);
            if (!asset) return;
            debit(asset.symbol, num);
            addTx({
              id,
              kind: "send",
              symbol: asset.symbol,
              amount: num,
              usd,
              counterparty: to,
              hash: h,
              when: "Just now",
              status: "pending",
            });
            setTimeout(() => settleTx(id, "confirmed"), 1200);
            pushNotification({
              title: "Transaction completed",
              body: `You sent ${num} ${asset.symbol}.`,
              kind: "transaction",
            });
            setStep("done");
          }}
        />
      </SubScreen>
    );

  if (step === "done")
    return (
      <SubScreen title="Sent">
        <SuccessPanel
          title="Transaction successful"
          body={`${amount} ${asset?.symbol} is on its way to ${to.slice(0, 6)}…${to.slice(-4)}.`}
        >
          <Card className="mt-7 w-full p-4 text-left">
            <SectionLabel>Transaction hash</SectionLabel>
            <button
              onClick={() => {
                void navigator.clipboard?.writeText(hash);
                toast.success("Hash copied");
              }}
              className="press mono-num mt-2 flex w-full items-start gap-2 text-left text-xs break-all"
            >
              {hash}
              <Copy className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
            </button>
          </Card>
          <div className="mt-6 flex w-full gap-3">
            <CButton variant="outline" className="flex-1" onClick={() => closeAll()}>
              Done
            </CButton>
            <CButton
              className="flex-1"
              onClick={() => {
                closeAll();
                openScreen("activity");
              }}
            >
              View Activity
            </CButton>
          </div>
        </SuccessPanel>
      </SubScreen>
    );

  if (step === "failed")
    return (
      <SubScreen title="Send">
        <Card ticks className="mt-6 p-6 text-center">
          <h2 className="text-lg font-medium tracking-tight">Transaction failed</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The network didn't accept this transfer. Nothing left your wallet — you can safely try
            again.
          </p>
          <div className="mt-6 flex gap-3">
            <CButton variant="outline" className="flex-1" onClick={back}>
              Cancel
            </CButton>
            <CButton className="flex-1" onClick={() => setStep("review")}>
              Try again
            </CButton>
          </div>
        </Card>
      </SubScreen>
    );

  if (step === "asset")
    return (
      <SubScreen title="Send · Choose asset">
        <p className="text-sm text-muted-foreground">Pick the asset you'd like to send.</p>
        <Card className="mt-4 px-5">
          <div className="divide-y divide-border/70">
            {assets.map((a) => (
              <button
                key={a.symbol}
                onClick={() => {
                  setAsset(a);
                  setStep("recipient");
                }}
                className="press flex w-full items-center gap-3 py-3.5 text-left"
              >
                <TokenGlyph symbol={a.symbol} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{a.name}</span>
                  <span className="mono-num block text-xs text-muted-foreground">
                    {formatAmount(a.amount, a.decimals)} {a.symbol}
                  </span>
                </span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </Card>
      </SubScreen>
    );

  if (step === "recipient")
    return (
      <SubScreen
        title="Send · Recipient"
        footer={
          <CButton
            size="lg"
            className="w-full"
            onClick={() => {
              const v = to.trim();
              if (v.length < 8) {
                setError("That address doesn't look complete. Stacks addresses start with SP or ST.");
                return;
              }
              setError(null);
              setStep("amount");
            }}
          >
            Continue
          </CButton>
        }
      >
        <Field label="Recipient address" hint="Paste an address or pick from your address book.">
          <input
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setError(null);
            }}
            placeholder="SP…"
            aria-label="Recipient address"
            className={cn(inputClass, "mono-num", error && "border-destructive")}
          />
        </Field>
        {error && <ErrorNote>{error}</ErrorNote>}
        <Card className="mt-4 px-5">
          <div className="divide-y divide-border/70">
            <ListRow
              icon={Users}
              label="Saved · Studio wallet"
              value="SP1Q…7F4T"
              onClick={() => setTo("SP1QK8ZR3PMTQ9WD2XJ4BNC7EYUV6HFA2LX0S7F4T")}
            />
            <ListRow
              icon={Users}
              label="Saved · Cold storage"
              value="SP2M…K93A"
              onClick={() => setTo("SP2MRW9N4DFT8YXPQ6HJ3VB5CZE7LKU1GDS0K93A")}
            />
          </div>
        </Card>
      </SubScreen>
    );

  if (step === "amount" && asset)
    return (
      <SubScreen
        title="Send · Amount"
        footer={
          <CButton
            size="lg"
            className="w-full"
            onClick={() => {
              if (!num || num <= 0) {
                setError("Enter an amount greater than zero.");
                return;
              }
              if (num > asset.amount) {
                setError(
                  `Insufficient balance. You have ${formatAmount(asset.amount, asset.decimals)} ${asset.symbol}.`,
                );
                return;
              }
              setError(null);
              setStep("review");
            }}
          >
            Review
          </CButton>
        }
      >
        <Field label={`Amount in ${asset.symbol}`}>
          <input
            value={amount}
            inputMode="decimal"
            onChange={(e) => {
              setAmount(e.target.value.replace(/[^0-9.]/g, ""));
              setError(null);
            }}
            placeholder="0.00"
            aria-label={`Amount in ${asset.symbol}`}
            className={cn(inputClass, "mono-num h-16 text-2xl", error && "border-destructive")}
          />
        </Field>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="mono-num text-muted-foreground">≈ {formatFiat(usd, currency)}</span>
          <button
            onClick={() => setAmount(String(asset.amount))}
            className="press rounded-full border border-border bg-card px-3 py-1 text-[0.7rem]"
          >
            Max {formatAmount(asset.amount, asset.decimals)}
          </button>
        </div>
        {error && <ErrorNote>{error}</ErrorNote>}
        <div className="mt-5">
          <InfoNote>
            Double-check the address. Transfers on Bitcoin and Stacks can't be reversed.
          </InfoNote>
        </div>
      </SubScreen>
    );

  if (step === "review" && asset)
    return (
      <SubScreen
        title="Send · Review"
        footer={
          <div className="flex gap-3">
            <CButton variant="outline" className="flex-1" onClick={() => setStep("amount")}>
              Edit
            </CButton>
            <CButton className="flex-1" onClick={() => setStep("sending")}>
              Confirm send
            </CButton>
          </div>
        }
      >
        <Card ticks className="hero-light p-6">
          <SectionLabel>You're sending</SectionLabel>
          <p className="mono-num mt-3 text-3xl font-light">
            {amount} <span className="text-gold">{asset.symbol}</span>
          </p>
          <p className="mono-num mt-1 text-xs text-muted-foreground">
            ≈ {formatFiat(usd, currency)}
          </p>
        </Card>
        <Card className="mt-4 px-5">
          <div className="divide-y divide-border/70">
            <ListRow label="From" value={SHORT_ADDRESS} />
            <ListRow label="To" value={`${to.slice(0, 6)}…${to.slice(-4)}`} />
            <ListRow label="Network fee" value="0.0003 STX" />
            <ListRow label="Arrives in" value="~2 min" />
          </div>
        </Card>
        <div className="mt-4">
          <InfoNote>You are approving this transfer yourself. Cusp cannot move funds for you.</InfoNote>
        </div>
      </SubScreen>
    );

  return null;
}

/* -------------------------------- Receive -------------------------------- */

export function ReceiveScreen() {
  const copy = () => {
    void navigator.clipboard?.writeText(ADDRESS);
    toast.success("Address copied");
  };
  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "My Cusp wallet address", text: ADDRESS });
        return;
      }
    } catch {
      /* dismissed */
    }
    copy();
    toast("Copied instead", { description: "Sharing isn't available on this device." });
  };
  return (
    <SubScreen title="Receive">
      <p className="text-sm text-muted-foreground">
        Share this address to receive BTC, STX, sBTC and SIP-010 tokens.
      </p>
      <Card ticks className="mt-4 p-5">
        <QRSketch value={ADDRESS} className="mx-auto max-w-[15rem]" />
        <p className="mono-num mt-5 text-center text-xs leading-relaxed break-all text-foreground/80">
          {ADDRESS}
        </p>
        <div className="mt-5 flex gap-3">
          <CButton variant="outline" className="flex-1" onClick={copy}>
            <Copy className="size-4" /> Copy
          </CButton>
          <CButton className="flex-1" onClick={() => void share()}>
            <Share2 className="size-4" /> Share
          </CButton>
        </div>
      </Card>
      <div className="mt-4">
        <InfoNote>Only send Bitcoin and Stacks ecosystem assets to this address.</InfoNote>
      </div>
    </SubScreen>
  );
}

/* --------------------------------- Swap ---------------------------------- */

export function SwapScreen() {
  const { assets, currency, completeTask } = useCusp();
  const [from, setFrom] = useState("STX");
  const [to, setTo] = useState("sBTC");
  const [amount, setAmount] = useState("");
  const fromAsset = assets.find((a) => a.symbol === from);
  const toAsset = assets.find((a) => a.symbol === to);
  const out =
    fromAsset && toAsset && Number(amount)
      ? (Number(amount) * fromAsset.priceUsd) / toAsset.priceUsd
      : 0;

  return (
    <SubScreen
      title="Swap"
      footer={
        <CButton
          size="lg"
          className="w-full"
          onClick={() => {
            completeTask("swap");
            toast("Swaps arrive in the next release", {
              description: "Routing across STX, BTC, sBTC and SIP-010 is being finalised.",
            });
          }}
        >
          Notify me at launch
        </CButton>
      }
    >
      <Card ticks className="hero-light p-6 text-center">
        <SectionLabel>Coming soon</SectionLabel>
        <h2 className="mt-3 text-xl font-medium tracking-tight">Ecosystem swaps</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Swap STX, BTC, sBTC and SIP-010 tokens without leaving Cusp. You can preview the
          experience below.
        </p>
      </Card>

      <Card className="mt-4 p-5 opacity-90">
        <SectionLabel>From</SectionLabel>
        <div className="mt-2 flex items-center gap-3">
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            aria-label="Swap from asset"
            className="mono-num h-11 rounded-xl border border-input bg-card px-3 text-sm"
          >
            {assets.map((a) => (
              <option key={a.symbol}>{a.symbol}</option>
            ))}
          </select>
          <input
            value={amount}
            inputMode="decimal"
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            placeholder="0.00"
            aria-label="Swap amount"
            className={cn(inputClass, "mono-num flex-1 text-right")}
          />
        </div>
        <div className="my-4 flex items-center justify-center">
          <span className="flex size-9 items-center justify-center rounded-full border border-border bg-secondary">
            <Repeat className="size-4 text-foreground/60" strokeWidth={1.5} />
          </span>
        </div>
        <SectionLabel>To</SectionLabel>
        <div className="mt-2 flex items-center gap-3">
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            aria-label="Swap to asset"
            className="mono-num h-11 rounded-xl border border-input bg-card px-3 text-sm"
          >
            {assets.map((a) => (
              <option key={a.symbol}>{a.symbol}</option>
            ))}
          </select>
          <p className="mono-num flex-1 text-right text-sm text-muted-foreground">
            {out ? out.toFixed(6) : "0.00"}
          </p>
        </div>
        <p className="mono-num mt-3 text-right text-xs text-muted-foreground">
          ≈ {formatFiat(out * (toAsset?.priceUsd ?? 0), currency)}
        </p>
      </Card>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Rates shown are illustrative while swaps are in development.
      </p>
    </SubScreen>
  );
}

/* ------------------------------- Add funds ------------------------------- */

export function AddFundsScreen() {
  const { credit, addTx, pushNotification, completeTask, openScreen, closeAll, currency } =
    useCusp();
  const [state, setState] = useState<"choose" | "loading" | "done">("choose");
  const [method, setMethod] = useState("");

  if (state === "loading")
    return (
      <SubScreen title="Add funds">
        <LoadingRun
          label="Preparing your deposit…"
          onDone={() => {
            credit("STX", 250);
            addTx({
              id: `tx${Date.now()}`,
              kind: "fund",
              symbol: "STX",
              amount: 250,
              usd: 250 * 1.82,
              counterparty: method,
              hash: makeHash(),
              when: "Just now",
              status: "confirmed",
            });
            completeTask("fund");
            pushNotification({
              title: "Deposit received",
              body: "250 STX landed in your wallet.",
              kind: "transaction",
            });
            setState("done");
          }}
        />
      </SubScreen>
    );

  if (state === "done")
    return (
      <SubScreen title="Add funds">
        <SuccessPanel
          title="Funds added"
          body={`250 STX (${formatFiat(250 * 1.82, currency)}) is now in your wallet.`}
        >
          <div className="mt-7 flex w-full gap-3">
            <CButton variant="outline" className="flex-1" onClick={() => closeAll()}>
              Done
            </CButton>
            <CButton
              className="flex-1"
              onClick={() => {
                closeAll();
                openScreen("activity");
              }}
            >
              View Activity
            </CButton>
          </div>
        </SuccessPanel>
      </SubScreen>
    );

  const options = [
    { icon: CreditCard, label: "Debit or credit card", desc: "Fastest way to start. Simulated." },
    { icon: Building2, label: "Bank transfer", desc: "Lower cost, arrives in 1–2 days." },
    { icon: ArrowDownToLine, label: "Transfer from another wallet", desc: "Use your address or QR." },
  ];

  return (
    <SubScreen title="Add funds">
      <p className="text-sm text-muted-foreground">Choose how you'd like to fund your wallet.</p>
      <div className="mt-4 flex flex-col gap-3">
        {options.map((o) => (
          <button
            key={o.label}
            onClick={() => {
              if (o.label.startsWith("Transfer")) {
                openScreen("receive");
                return;
              }
              setMethod(o.label);
              setState("loading");
            }}
            className="press draft-card flex items-center gap-3 p-5 text-left"
          >
            <o.icon className="size-5 shrink-0 text-foreground/60" strokeWidth={1.4} />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium">{o.label}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{o.desc}</span>
            </span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>
        ))}
      </div>
      <div className="mt-5">
        <InfoNote>
          Deposits go straight to your self-custodial wallet. Cusp never holds your funds.
        </InfoNote>
      </div>
    </SubScreen>
  );
}

/* ------------------------------- Activity -------------------------------- */

export function ActivityScreen() {
  const { txs, currency, openScreen } = useCusp();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading)
    return (
      <SubScreen title="Activity">
        <LoadingRun label="Syncing portfolio…" duration={600} />
      </SubScreen>
    );

  return (
    <SubScreen title="Activity">
      {txs.length === 0 ? (
        <EmptyState
          glyph="activity"
          title="No transactions yet."
          body="Your activity will appear here after your first transaction."
          action="Add funds"
          onAction={() => openScreen("addFunds")}
        />
      ) : (
        <Card className="px-5">
          <div className="divide-y divide-border/70">
            {txs.map((t) => (
              <div key={t.id} className="flex items-center gap-3 py-3.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary">
                  {t.kind === "send" ? (
                    <ArrowUpRight className="size-4 text-foreground/70" strokeWidth={1.5} />
                  ) : (
                    <ArrowDownToLine className="size-4 text-foreground/70" strokeWidth={1.5} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium capitalize">
                    {t.kind === "fund" ? "Deposit" : t.kind}
                  </p>
                  <p className="mono-num truncate text-xs text-muted-foreground">
                    {t.when} · {t.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="mono-num text-sm">
                    {t.kind === "send" ? "−" : "+"}
                    {t.amount} {t.symbol}
                  </p>
                  <p className="mono-num text-xs text-muted-foreground">
                    {formatFiat(t.usd, currency)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </SubScreen>
  );
}
