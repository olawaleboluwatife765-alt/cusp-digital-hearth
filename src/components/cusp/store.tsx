import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  ASSET_SEEDS,
  CONNECTED_APPS_SEED,
  CURRENCIES,
  NOTIFICATIONS_SEED,
  type CurrencyKey,
} from "./data";

export type Stage = "splash" | "brand" | "select" | "create" | "import" | "app";
export type TabKey = "home" | "explore" | "connect" | "settings";
export type NetworkKey = "mainnet" | "testnet" | "signet";

export type ScreenKey =
  | "send"
  | "receive"
  | "swap"
  | "addFunds"
  | "activity"
  | "notifications"
  | "security"
  | "recovery"
  | "profile"
  | "appearance"
  | "currency"
  | "language"
  | "networks"
  | "connectedApps"
  | "devices"
  | "pin"
  | "autolock"
  | "manageWallets"
  | "addressBook"
  | "help"
  | "about"
  | "privacy"
  | "terms"
  | "licenses"
  | "learn";

export type Task = { id: "fund" | "explore" | "swap"; label: string; done: boolean };

export type Asset = (typeof ASSET_SEEDS)[number];

export type Tx = {
  id: string;
  kind: "send" | "receive" | "fund";
  symbol: string;
  amount: number;
  usd: number;
  counterparty: string;
  hash: string;
  when: string;
  status: "pending" | "confirmed" | "failed";
};

export type Connection = {
  name: string;
  url: string;
  verified?: boolean;
  connected: string;
  permissions: string[];
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  when: string;
  kind: "security" | "ecosystem" | "transaction" | "network";
  read: boolean;
};

type Ctx = {
  stage: Stage;
  setStage: (s: Stage) => void;
  tab: TabKey;
  setTab: (t: TabKey) => void;
  network: NetworkKey;
  setNetwork: (n: NetworkKey) => void;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  hideBalance: boolean;
  setHideBalance: (v: boolean) => void;
  tasks: Task[];
  completeTask: (id: Task["id"]) => void;
  walletMethod: "google" | "phrase" | null;
  setWalletMethod: (m: "google" | "phrase" | null) => void;

  /* screen stack */
  screens: ScreenKey[];
  openScreen: (s: ScreenKey) => void;
  back: () => void;
  closeAll: () => void;

  /* portfolio */
  assets: Asset[];
  credit: (symbol: string, amount: number) => void;
  debit: (symbol: string, amount: number) => void;
  totalUsd: number;
  txs: Tx[];
  addTx: (t: Tx) => void;
  settleTx: (id: string, status: Tx["status"]) => void;

  /* connections */
  connections: Connection[];
  connect: (c: Connection) => void;
  disconnect: (name: string) => void;
  recentlyViewed: string[];
  viewApp: (name: string) => void;

  /* notifications */
  notifications: Notification[];
  pushNotification: (n: Omit<Notification, "id" | "read" | "when"> & { when?: string }) => void;
  markAllRead: () => void;
  unread: number;

  /* preferences */
  currency: CurrencyKey;
  setCurrency: (c: CurrencyKey) => void;
  language: string;
  setLanguage: (l: string) => void;
  biometrics: boolean;
  setBiometrics: (v: boolean) => void;
  autoLock: string;
  setAutoLock: (v: string) => void;
  pinSet: boolean;
  setPinSet: (v: boolean) => void;
  phraseBackedUp: boolean;
  setPhraseBackedUp: (v: boolean) => void;
  locked: boolean;
  setLocked: (v: boolean) => void;
};

const CuspContext = createContext<Ctx | null>(null);

export const ADDRESS = "SP3XKM9QYPT4VF2ZBNCVR7DWJH8FQ6ETA9CXA8K2";
export const SHORT_ADDRESS = "SP3X...A8K2";

export function formatFiat(usd: number, currency: CurrencyKey) {
  const c = CURRENCIES[currency];
  const v = usd * c.rate;
  return `${c.symbol}${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatAmount(amount: number, decimals: number) {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: Math.min(decimals, amount === 0 ? decimals : 2),
    maximumFractionDigits: decimals,
  });
}

export function makeHash() {
  const chars = "0123456789abcdef";
  let out = "0x";
  for (let i = 0; i < 40; i++) out += chars[Math.floor(Math.random() * 16)];
  return out;
}

export function CuspProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<Stage>("splash");
  const [tab, setTabRaw] = useState<TabKey>("home");
  const [network, setNetwork] = useState<NetworkKey>("mainnet");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);
  const [walletMethod, setWalletMethod] = useState<"google" | "phrase" | null>(null);
  const [screens, setScreens] = useState<ScreenKey[]>([]);
  const [assets, setAssets] = useState<Asset[]>(() => ASSET_SEEDS.map((a) => ({ ...a })));
  const [txs, setTxs] = useState<Tx[]>([]);
  const [connections, setConnections] = useState<Connection[]>(() => [...CONNECTED_APPS_SEED]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(() => [...NOTIFICATIONS_SEED]);
  const [currency, setCurrency] = useState<CurrencyKey>("USD");
  const [language, setLanguage] = useState("English");
  const [biometrics, setBiometrics] = useState(true);
  const [autoLock, setAutoLock] = useState("5 minutes");
  const [pinSet, setPinSet] = useState(false);
  const [phraseBackedUp, setPhraseBackedUp] = useState(false);
  const [locked, setLocked] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: "fund", label: "Fund your wallet", done: false },
    { id: "explore", label: "Explore a Stacks App", done: false },
    { id: "swap", label: "Make your first swap", done: false },
  ]);

  const setTab = useCallback((t: TabKey) => {
    setScreens([]);
    setTabRaw(t);
  }, []);

  const totalUsd = useMemo(
    () => assets.reduce((sum, a) => sum + a.amount * a.priceUsd, 0),
    [assets],
  );

  const unread = notifications.filter((n) => !n.read).length;

  const value = useMemo<Ctx>(
    () => ({
      stage,
      setStage,
      tab,
      setTab,
      network,
      setNetwork,
      drawerOpen,
      setDrawerOpen,
      hideBalance,
      setHideBalance,
      tasks,
      completeTask: (id) =>
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: true } : t))),
      walletMethod,
      setWalletMethod,

      screens,
      openScreen: (s) => setScreens((prev) => [...prev, s]),
      back: () => setScreens((prev) => prev.slice(0, -1)),
      closeAll: () => setScreens([]),

      assets,
      credit: (symbol, amount) =>
        setAssets((prev) =>
          prev.map((a) => (a.symbol === symbol ? { ...a, amount: a.amount + amount } : a)),
        ),
      debit: (symbol, amount) =>
        setAssets((prev) =>
          prev.map((a) =>
            a.symbol === symbol ? { ...a, amount: Math.max(0, a.amount - amount) } : a,
          ),
        ),
      totalUsd,
      txs,
      addTx: (t) => setTxs((prev) => [t, ...prev]),
      settleTx: (id, status) =>
        setTxs((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t))),

      connections,
      connect: (c) => setConnections((prev) => [c, ...prev.filter((p) => p.name !== c.name)]),
      disconnect: (name) => setConnections((prev) => prev.filter((p) => p.name !== name)),
      recentlyViewed,
      viewApp: (name) =>
        setRecentlyViewed((prev) => [name, ...prev.filter((p) => p !== name)].slice(0, 6)),

      notifications,
      pushNotification: (n) =>
        setNotifications((prev) => [
          { ...n, id: `n${Date.now()}`, read: false, when: n.when ?? "Just now" },
          ...prev,
        ]),
      markAllRead: () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))),
      unread,

      currency,
      setCurrency,
      language,
      setLanguage,
      biometrics,
      setBiometrics,
      autoLock,
      setAutoLock,
      pinSet,
      setPinSet,
      phraseBackedUp,
      setPhraseBackedUp,
      locked,
      setLocked,
    }),
    [
      stage,
      tab,
      setTab,
      network,
      drawerOpen,
      hideBalance,
      tasks,
      walletMethod,
      screens,
      assets,
      totalUsd,
      txs,
      connections,
      recentlyViewed,
      notifications,
      unread,
      currency,
      language,
      biometrics,
      autoLock,
      pinSet,
      phraseBackedUp,
      locked,
    ],
  );

  return <CuspContext.Provider value={value}>{children}</CuspContext.Provider>;
}

export function useCusp() {
  const ctx = useContext(CuspContext);
  if (!ctx) throw new Error("useCusp must be used inside CuspProvider");
  return ctx;
}
