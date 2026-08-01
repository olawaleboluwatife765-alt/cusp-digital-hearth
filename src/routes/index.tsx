import { createFileRoute } from "@tanstack/react-router";
import { CuspProvider, useCusp } from "@/components/cusp/store";
import { BrandScreen, CreateWallet, ImportWallet, Splash, WalletSelect } from "@/components/cusp/onboarding";
import { BottomNav, NavDrawer, TopBar } from "@/components/cusp/shell";
import { HomeScreen } from "@/components/cusp/home";
import { ExploreScreen } from "@/components/cusp/explore";
import { ConnectScreen } from "@/components/cusp/connect";
import { SettingsScreen } from "@/components/cusp/settings";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Cusp — Self-Custodial Bitcoin & Stacks Wallet" },
      {
        name: "description",
        content:
          "Cusp is a self-custodial Bitcoin and Stacks wallet prototype: portfolio, apps, connections and security in one drafted, premium interface.",
      },
      { property: "og:title", content: "Cusp — Own what's next." },
      {
        property: "og:description",
        content: "Your simple gateway to digital ownership. A self-custodial Bitcoin & Stacks wallet.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function AppShell() {
  const { stage, tab } = useCusp();

  if (stage === "splash") return <Splash />;
  if (stage === "brand") return <BrandScreen />;
  if (stage === "select") return <WalletSelect />;
  if (stage === "create") return <CreateWallet />;
  if (stage === "import") return <ImportWallet />;

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar />
      <main key={tab} className="animate-rise flex-1">
        {tab === "home" && <HomeScreen />}
        {tab === "explore" && <ExploreScreen />}
        {tab === "connect" && <ConnectScreen />}
        {tab === "settings" && <SettingsScreen />}
      </main>
      <BottomNav />
      <NavDrawer />
    </div>
  );
}

function Index() {
  return (
    <CuspProvider>
      <div className="paper-surface mx-auto min-h-dvh w-full max-w-md overflow-x-hidden shadow-[var(--shadow-lift)]">
        <AppShell />
      </div>
    </CuspProvider>
  );
}
