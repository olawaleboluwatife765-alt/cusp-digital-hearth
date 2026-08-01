export const ASSETS = [
  {
    group: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    balance: "0.00000000",
    fiat: "$0.00",
    price: "$68,421.00",
    change: "+2.15%",
  },
  {
    group: "bitcoin",
    symbol: "sBTC",
    name: "Stacked Bitcoin",
    balance: "0.0000",
    fiat: "$0.00",
    price: "$68,310.00",
    change: "+1.98%",
  },
  {
    group: "stacks",
    symbol: "STX",
    name: "Stacks",
    balance: "0.000000",
    fiat: "$0.00",
    price: "$1.82",
    change: "+4.67%",
  },
  {
    group: "stacks",
    symbol: "ALEX",
    name: "Alex Lab",
    balance: "0.00",
    fiat: "$0.00",
    price: "$0.043",
    change: "+0.84%",
  },
  {
    group: "stacks",
    symbol: "WELSH",
    name: "Welshcorgicoin",
    balance: "0.00",
    fiat: "$0.00",
    price: "$0.0002",
    change: "-1.12%",
  },
] as const;

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
  category: (typeof APP_CATEGORIES)[number];
  featured?: boolean;
};

export const APPS: AppEntry[] = [
  { name: "ALEX", tagline: "The leading DeFi hub on Stacks", category: "DeFi", featured: true },
  { name: "Bitflow", tagline: "Bitcoin-native swap routing", category: "DeFi", featured: true },
  { name: "Velar", tagline: "Perpetuals and liquidity pools", category: "DeFi" },
  { name: "Zest Protocol", tagline: "Onchain Bitcoin lending", category: "DeFi" },
  { name: "Gamma", tagline: "Open marketplace for Stacks NFTs", category: "NFTs", featured: true },
  { name: "Megapont", tagline: "Collectible worlds and avatars", category: "NFTs" },
  { name: "Stacks Punks", tagline: "The original Stacks collectible", category: "NFTs" },
  { name: "Free Ride", tagline: "Onchain racing league", category: "Games" },
  { name: "Project Indigo", tagline: "Strategy, settled on Bitcoin", category: "Games" },
  { name: "Sigle", tagline: "Write and publish, permanently", category: "Social", featured: true },
  { name: "Console", tagline: "Communities with onchain keys", category: "Social" },
  { name: "Lumen", tagline: "AI agents that read the chain", category: "AI" },
  { name: "Oracle Desk", tagline: "Model-driven market briefings", category: "AI" },
  { name: "BNS One", tagline: "Claim and manage your .btc name", category: "Utilities" },
  { name: "Ledger Lens", tagline: "Portfolio and tax reporting", category: "Utilities" },
];

export const MARKET = [
  { symbol: "BTC", price: "$68,421.00", change: "+2.15%", up: true },
  { symbol: "STX", price: "$1.82", change: "+4.67%", up: true },
  { symbol: "sBTC", price: "$68,310.00", change: "+1.98%", up: true },
  { symbol: "ALEX", price: "$0.043", change: "-0.62%", up: false },
];

export const NEWS = [
  { title: "Stacks SIP-045 is now live", tag: "Governance", when: "2h ago" },
  { title: "Alex Lab launches sBTC AMM", tag: "DeFi", when: "6h ago" },
  { title: "New grants round is open", tag: "Ecosystem", when: "1d ago" },
  { title: "Bitflow integrates with Stacks", tag: "Partnership", when: "2d ago" },
];

export const EVENTS = [
  { title: "Bitcoin Builders Summit", place: "Lisbon", when: "Sep 12" },
  { title: "Stacks Ecosystem Call", place: "Online", when: "Sep 18" },
  { title: "sBTC Hack Week", place: "Online", when: "Oct 02" },
];

export const LEARN = [
  "What is Bitcoin?",
  "What is Stacks?",
  "What is sBTC?",
  "What is self-custody?",
];

export const CONNECTED_APPS = [
  {
    name: "ALEX",
    url: "app.alexlab.co",
    connected: "Connected 3 days ago",
    permissions: ["View wallet address", "Request transaction signatures"],
  },
  {
    name: "Gamma",
    url: "gamma.io",
    connected: "Connected 1 week ago",
    permissions: ["View wallet address", "View NFT collection"],
  },
];

export const RECENT_CONNECTIONS = [
  { name: "Bitflow", url: "app.bitflow.finance", when: "Disconnected 2 weeks ago" },
  { name: "Sigle", url: "sigle.io", when: "Disconnected 1 month ago" },
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