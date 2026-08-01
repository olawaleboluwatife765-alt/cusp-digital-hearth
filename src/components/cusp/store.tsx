import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Stage = "splash" | "brand" | "select" | "create" | "import" | "app";
export type TabKey = "home" | "explore" | "connect" | "settings";
export type NetworkKey = "mainnet" | "testnet" | "signet";

export type Task = { id: "fund" | "explore" | "swap"; label: string; done: boolean };

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
};

const CuspContext = createContext<Ctx | null>(null);

export const ADDRESS = "SP3XKM9QYPT4VF2ZBNCVR7DWJH8FQ6ETA9CXA8K2";
export const SHORT_ADDRESS = "SP3X...A8K2";

export function CuspProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<Stage>("splash");
  const [tab, setTab] = useState<TabKey>("home");
  const [network, setNetwork] = useState<NetworkKey>("mainnet");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);
  const [walletMethod, setWalletMethod] = useState<"google" | "phrase" | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    { id: "fund", label: "Fund your wallet", done: false },
    { id: "explore", label: "Explore a Stacks App", done: false },
    { id: "swap", label: "Make your first swap", done: false },
  ]);

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
    }),
    [stage, tab, network, drawerOpen, hideBalance, tasks, walletMethod],
  );

  return <CuspContext.Provider value={value}>{children}</CuspContext.Provider>;
}

export function useCusp() {
  const ctx = useContext(CuspContext);
  if (!ctx) throw new Error("useCusp must be used inside CuspProvider");
  return ctx;
}