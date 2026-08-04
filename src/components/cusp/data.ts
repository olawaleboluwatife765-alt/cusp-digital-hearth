export type AssetSeed = {
  group: "bitcoin" | "stacks";
  symbol: string;
  name: string;
  amount: number;
  decimals: number;
  priceUsd: number;
  change: string;
  up: boolean;
};

export const ASSET_SEEDS: AssetSeed[] = [
  { group: "bitcoin", symbol: "BTC", name: "Bitcoin", amount: 0, decimals: 8, priceUsd: 68421, change: "+2.15%", up: true },
  { group: "bitcoin", symbol: "sBTC", name: "Stacked Bitcoin", amount: 0, decimals: 8, priceUsd: 68310, change: "+1.98%", up: true },
  { group: "stacks", symbol: "STX", name: "Stacks", amount: 0, decimals: 6, priceUsd: 1.82, change: "+4.67%", up: true },
  { group: "stacks", symbol: "ALEX", name: "Alex Lab", amount: 0, decimals: 2, priceUsd: 0.043, change: "+0.84%", up: true },
  { group: "stacks", symbol: "WELSH", name: "Welshcorgicoin", amount: 0, decimals: 2, priceUsd: 0.0002, change: "-1.12%", up: false },
];

export const CURRENCIES = {
  USD: { symbol: "$", rate: 1, label: "US Dollar" },
  EUR: { symbol: "€", rate: 0.92, label: "Euro" },
  GBP: { symbol: "£", rate: 0.78, label: "British Pound" },
  NGN: { symbol: "₦", rate: 1580, label: "Nigerian Naira" },
} as const;
export type CurrencyKey = keyof typeof CURRENCIES;

export const LANGUAGES = ["English", "Español", "Français", "Português", "Deutsch"] as const;

export const APP_CATEGORIES = [
  "Featured",
  "DeFi",
  "NFTs",
  "Games",
  "Social",
  "AI",
  "Utilities",
] as const;

export type AppEntry = {
  name: string;
  tagline: string;
  url: string;
  category: (typeof APP_CATEGORIES)[number];
  featured?: boolean;
  verified?: boolean;
  trending?: boolean;
};

export const APPS: AppEntry[] = [
  { name: "ALEX", tagline: "The leading DeFi hub on Stacks", url: "app.alexlab.co", category: "DeFi", featured: true, verified: true, trending: true },
  { name: "Bitflow", tagline: "Bitcoin-native swap routing", url: "app.bitflow.finance", category: "DeFi", featured: true, verified: true, trending: true },
  { name: "Velar", tagline: "Perpetuals and liquidity pools", url: "velar.co", category: "DeFi", verified: true },
  { name: "Zest Protocol", tagline: "Onchain Bitcoin lending", url: "zestprotocol.com", category: "DeFi", verified: true, trending: true },
  { name: "Gamma", tagline: "Open marketplace for Stacks NFTs", url: "gamma.io", category: "NFTs", featured: true, verified: true },
  { name: "Megapont", tagline: "Collectible worlds and avatars", url: "megapont.com", category: "NFTs" },
  { name: "Stacks Punks", tagline: "The original Stacks collectible", url: "stackspunks.com", category: "NFTs" },
  { name: "Free Ride", tagline: "Onchain racing league", url: "freeride.gg", category: "Games" },
  { name: "Project Indigo", tagline: "Strategy, settled on Bitcoin", url: "projectindigo.xyz", category: "Games", trending: true },
  { name: "Sigle", tagline: "Write and publish, permanently", url: "sigle.io", category: "Social", featured: true, verified: true },
  { name: "Console", tagline: "Communities with onchain keys", url: "console.xyz", category: "Social" },
  { name: "Lumen", tagline: "AI agents that read the chain", url: "lumen.ai", category: "AI", trending: true },
  { name: "Oracle Desk", tagline: "Model-driven market briefings", url: "oracledesk.io", category: "AI" },
  { name: "BNS One", tagline: "Claim and manage your .btc name", url: "bns.one", category: "Utilities", verified: true },
  { name: "Ledger Lens", tagline: "Portfolio and tax reporting", url: "ledgerlens.app", category: "Utilities" },
];

export const RECOMMENDED = ["ALEX", "Gamma", "BNS One"];

export const MARKET = [
  { symbol: "BTC", name: "Bitcoin", price: "$68,421.00", change: "+2.15%", up: true },
  { symbol: "STX", name: "Stacks", price: "$1.82", change: "+4.67%", up: true },
  { symbol: "sBTC", name: "Stacked Bitcoin", price: "$68,310.00", change: "+1.98%", up: true },
  { symbol: "ALEX", name: "Alex Lab", price: "$0.043", change: "-0.62%", up: false },
];

export const TOP_MOVERS = [
  { symbol: "WELSH", change: "+18.4%", up: true },
  { symbol: "STX", change: "+4.67%", up: true },
  { symbol: "ALEX", change: "-3.10%", up: false },
];

export const NEWS: { title: string; tag: "Bitcoin" | "Stacks" | "Security" | "Protocol"; when: string; body: string }[] = [
  { title: "Stacks SIP-045 is now live", tag: "Protocol", when: "2h ago", body: "The upgrade improves block propagation and shortens confirmation windows across the network." },
  { title: "Bitcoin fees ease after mempool clears", tag: "Bitcoin", when: "5h ago", body: "Average transaction costs returned to single-digit sats per byte this week." },
  { title: "Alex Lab launches sBTC AMM", tag: "Stacks", when: "6h ago", body: "A new pool lets holders move between sBTC and STX with reduced slippage." },
  { title: "Reminder: wallets never ask for your phrase", tag: "Security", when: "1d ago", body: "A refresher on recognising phishing attempts across social channels." },
];

export const ECOSYSTEM: { title: string; tag: "New dApp" | "Governance" | "Hackathon" | "Partnership"; when: string }[] = [
  { title: "Lumen opens public beta", tag: "New dApp", when: "1d ago" },
  { title: "Grants round 7 voting is open", tag: "Governance", when: "2d ago" },
  { title: "sBTC Hack Week registration", tag: "Hackathon", when: "3d ago" },
  { title: "Bitflow integrates with Stacks", tag: "Partnership", when: "5d ago" },
];

export const EVENTS = [
  { title: "Bitcoin Builders Summit", place: "Lisbon", when: "Sep 12" },
  { title: "Stacks Ecosystem Call", place: "Online", when: "Sep 18" },
  { title: "sBTC Hack Week", place: "Online", when: "Oct 02" },
];

export const LEARN: { title: string; body: string }[] = [
  { title: "What is Bitcoin?", body: "Bitcoin is a global, open money network. No company runs it, and no one can freeze or reverse your balance." },
  { title: "What is Stacks?", body: "Stacks brings apps and smart contracts to Bitcoin, settling their activity on the Bitcoin network." },
  { title: "What is sBTC?", body: "sBTC represents Bitcoin inside Stacks apps, so you can use BTC value without leaving Bitcoin's security." },
  { title: "What is self-custody?", body: "Self-custody means the keys live with you. Cusp holds nothing on your behalf, and no one can move your assets for you." },
  { title: "Why recovery matters", body: "Your recovery phrase is the only way to restore your wallet on a new device. Store it offline, in order." },
  { title: "Google and your wallet", body: "Google is only used to verify it's you at sign-in. Google does not own, hold, or control your wallet." },
];

export const CONNECTED_APPS_SEED = [
  {
    name: "ALEX",
    url: "app.alexlab.co",
    verified: true,
    connected: "Connected 3 days ago",
    permissions: ["View wallet address", "Read balances", "Request transaction approvals"],
  },
  {
    name: "Gamma",
    url: "gamma.io",
    verified: true,
    connected: "Connected 1 week ago",
    permissions: ["View wallet address", "View NFT collection"],
  },
];

export const RECENT_CONNECTIONS = [
  { name: "Bitflow", url: "app.bitflow.finance", when: "Disconnected 2 weeks ago" },
  { name: "Sigle", url: "sigle.io", when: "Disconnected 1 month ago" },
];

export const NOTIFICATIONS_SEED = [
  { id: "n1", title: "Back up your wallet", body: "Your recovery phrase isn't verified yet. Take two minutes in the Recovery Center.", when: "Just now", kind: "security" as const, read: false },
  { id: "n2", title: "New featured app: Lumen", body: "AI agents that read the chain just landed in Explore.", when: "4h ago", kind: "ecosystem" as const, read: false },
  { id: "n3", title: "Stacks SIP-045 is live", body: "Faster confirmations rolled out across the network today.", when: "1d ago", kind: "ecosystem" as const, read: true },
  { id: "n4", title: "Security reminder", body: "Cusp support will never ask for your recovery phrase.", when: "3d ago", kind: "security" as const, read: true },
];

export const DEVICES = [
  { name: "This device — iPhone", detail: "Lisbon · Active now", current: true },
  { name: "MacBook Pro", detail: "Lisbon · 2 days ago", current: false },
  { name: "iPad", detail: "Porto · 3 weeks ago", current: false },
];

export const SECURITY_TIPS = [
  "Never share your recovery phrase — not even with Cusp support.",
  "Review what an app requests before you approve a connection.",
  "Keep a written copy of your phrase somewhere offline and dry.",
];

export const WORDS = [
  "anchor",
  "beacon",
  "cinder",
  "drafted",
  "ember",
  "fathom",
  "granite",
  "harbor",
  "ivory",
  "juniper",
  "keystone",
  "lantern",
];

export const NETWORKS = {
  mainnet: { label: "Mainnet", dot: "bg-emerald-600", note: "Default network. Real assets." },
  testnet: { label: "Testnet", dot: "bg-amber-500", note: "Test assets with no real value." },
  signet: { label: "Signet", dot: "bg-sky-600", note: "Bitcoin test network for developers." },
} as const;

/* ------------------------------------------------------------------ */
/* Iteration 6 — security, recovery & permission data                  */
/* ------------------------------------------------------------------ */

export const SESSIONS = [
  { id: "s1", device: "iPhone 15 Pro", place: "Lisbon, PT", ip: "84.12.44.7", when: "Active now", current: true },
  { id: "s2", device: "MacBook Pro", place: "Lisbon, PT", ip: "84.12.44.7", when: "2 days ago", current: false },
  { id: "s3", device: "Chrome — Windows", place: "Porto, PT", ip: "188.250.9.31", when: "3 weeks ago", current: false },
];

export const SECURITY_ACTIVITY: {
  id: string;
  title: string;
  detail: string;
  when: string;
  tone: "ok" | "note" | "warn";
}[] = [
  { id: "a1", title: "Signed in with Google identity", detail: "iPhone 15 Pro · Lisbon", when: "Today, 09:14", tone: "ok" },
  { id: "a2", title: "Approved a connection", detail: "ALEX requested wallet address access", when: "3 days ago", tone: "note" },
  { id: "a3", title: "Auto-lock changed", detail: "Set to 5 minutes", when: "5 days ago", tone: "note" },
  { id: "a4", title: "Recovery phrase not verified", detail: "Backup reminder raised", when: "1 week ago", tone: "warn" },
  { id: "a5", title: "Wallet created on this device", detail: "Keys generated locally", when: "1 week ago", tone: "ok" },
];

export const PERMISSION_EXPLAIN: { key: string; can: string; cannot: string }[] = [
  { key: "View wallet address", can: "See your public address and label.", cannot: "It cannot see your recovery phrase or keys." },
  { key: "Read balances", can: "Read balances already public on chain.", cannot: "It cannot move or spend anything." },
  { key: "Request transaction approvals", can: "Prepare a transaction and ask you to sign.", cannot: "It cannot sign or send without your approval." },
  { key: "View NFT collection", can: "List collectibles held at your address.", cannot: "It cannot transfer or list them for sale." },
];

export const PERMISSION_HISTORY_SEED: {
  id: string;
  app: string;
  action: "granted" | "revoked" | "rejected";
  detail: string;
  when: string;
}[] = [
  { id: "p1", app: "ALEX", action: "granted", detail: "View wallet address, Read balances, Request transaction approvals", when: "3 days ago" },
  { id: "p2", app: "Gamma", action: "granted", detail: "View wallet address, View NFT collection", when: "1 week ago" },
  { id: "p3", app: "Bitflow", action: "revoked", detail: "All permissions removed", when: "2 weeks ago" },
  { id: "p4", app: "Unknown Swap", action: "rejected", detail: "Request declined — unverified app", when: "1 month ago" },
];

export const PENDING_REQUESTS_SEED = [
  {
    id: "r1",
    name: "Bitflow",
    url: "app.bitflow.finance",
    verified: true,
    permissions: ["View wallet address", "Read balances", "Request transaction approvals"],
  },
  {
    id: "r2",
    name: "Ledger Lens",
    url: "ledgerlens.app",
    verified: false,
    permissions: ["View wallet address", "Read balances"],
  },
];

export const RECOVERY_CHECKLIST: { id: string; label: string; detail: string }[] = [
  { id: "written", label: "Phrase written down offline", detail: "Pen and paper beats a screenshot." },
  { id: "order", label: "Words stored in order", detail: "Order is part of the secret." },
  { id: "place", label: "Stored somewhere dry and private", detail: "Not in a photo album or cloud note." },
  { id: "verified", label: "Phrase verified in Cusp", detail: "Confirms your copy is correct." },
];

export const EMERGENCY_STEPS: { title: string; body: string }[] = [
  { title: "Lost this device", body: "Install Cusp on a new device and restore with your 12-word phrase. Your assets live on the network, not on the phone." },
  { title: "Phrase possibly seen by someone", body: "Create a fresh wallet immediately and move your assets to its address. A phrase cannot be changed once exposed." },
  { title: "Suspicious app connection", body: "Open Connect and disconnect the app. Disconnecting takes effect instantly and never touches your balance." },
  { title: "Someone contacted you for help", body: "No one from Cusp will ever ask for your phrase, keys, or a screen share. Treat every such request as fraud." },
];

export const SECURITY_RECOMMENDATIONS: { id: string; label: string; body: string }[] = [
  { id: "verify", label: "Verify your recovery phrase", body: "Confirms your written copy can actually restore this wallet." },
  { id: "pin", label: "Set a wallet PIN", body: "Adds a second gate before any transaction is approved." },
  { id: "biometrics", label: "Turn on biometrics", body: "Face or fingerprint unlock on this device only." },
  { id: "review", label: "Review connected apps", body: "Remove anything you no longer use." },
];

/** Mock Google accounts used by the simulated account picker. */
export const GOOGLE_ACCOUNTS = [
  { name: "Ada Bello", email: "ada.bello@gmail.com", initials: "AB" },
  { name: "Ada Bello (Work)", email: "ada@cusp.studio", initials: "AC" },
  { name: "Tunde Fashola", email: "tunde.fashola@gmail.com", initials: "TF" },
] as const;
