import { ActivityScreen, AddFundsScreen, ReceiveScreen, SendScreen, SwapScreen } from "./flows";
import {
  AppearanceScreen,
  AutoLockScreen,
  ConnectedAppsScreen,
  CurrencyScreen,
  DevicesScreen,
  HelpScreen,
  InfoPage,
  LanguageScreen,
  LearnScreen,
  NotificationsScreen,
  ProfileScreen,
  RecoveryScreen,
  SecurityScreen,
} from "./pages";
import { useCusp, type ScreenKey } from "./store";

function render(key: ScreenKey) {
  switch (key) {
    case "send":
      return <SendScreen />;
    case "receive":
      return <ReceiveScreen />;
    case "swap":
      return <SwapScreen />;
    case "addFunds":
      return <AddFundsScreen />;
    case "activity":
      return <ActivityScreen />;
    case "notifications":
      return <NotificationsScreen />;
    case "security":
      return <SecurityScreen />;
    case "recovery":
      return <RecoveryScreen />;
    case "connectedApps":
      return <ConnectedAppsScreen />;
    case "devices":
      return <DevicesScreen />;
    case "autolock":
      return <AutoLockScreen />;
    case "currency":
      return <CurrencyScreen />;
    case "language":
      return <LanguageScreen />;
    case "profile":
      return <ProfileScreen />;
    case "appearance":
      return <AppearanceScreen />;
    case "learn":
      return <LearnScreen />;
    case "help":
      return <HelpScreen />;
    case "about":
      return (
        <InfoPage
          title="About Cusp"
          body={[
            "Cusp is the bridge between familiar sign-in experiences and true digital ownership.",
            "Built on Bitcoin and Stacks, your keys never leave your device. Google, when used, only verifies that it's you.",
            "Version 0.1.0 — interactive prototype.",
          ]}
        />
      );
    case "privacy":
      return (
        <InfoPage
          title="Privacy"
          body={[
            "Cusp does not collect your recovery phrase, private keys, or balances.",
            "Analytics in this prototype are simulated and nothing leaves your device.",
          ]}
        />
      );
    case "terms":
      return (
        <InfoPage
          title="Terms"
          body={[
            "This is a demonstration prototype. No real assets, transactions, or accounts are involved.",
            "Use of the prototype implies acceptance of its simulated nature.",
          ]}
        />
      );
    case "licenses":
      return (
        <InfoPage
          title="Licenses"
          body={["React, TanStack Router, Tailwind CSS, Lucide icons and Sonner are used under their respective open-source licenses."]}
        />
      );
    case "manageWallets":
      return (
        <InfoPage
          title="Manage wallets"
          body={["My Wallet — " , "Additional wallets and account switching arrive in a future release."]}
        />
      );
    case "addressBook":
      return (
        <InfoPage
          title="Address book"
          body={["Studio wallet — SP1Q…7F4T", "Cold storage — SP2M…K93A"]}
        />
      );
    default:
      return (
        <InfoPage title="Coming soon" body={["This area is being finished for the next release."]} />
      );
  }
}

export function ScreenStack() {
  const { screens } = useCusp();
  if (screens.length === 0) return null;
  const key = screens[screens.length - 1]!;
  return (
    <div
      key={`${key}-${screens.length}`}
      className="paper-surface animate-rise fixed inset-0 z-50 mx-auto w-full max-w-md overflow-y-auto"
    >
      {render(key)}
    </div>
  );
}
