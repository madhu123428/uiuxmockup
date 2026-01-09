export const THEMES = {
  GOT: {
  /* Core surfaces */
  background: "#0b0d10",        // near-black, cold night
  foreground: "#e5e7eb",        // bone-white text

  card: "#14171c",              // dark stone panels
  cardForeground: "#e5e7eb",

  popover: "#14171c",
  popoverForeground: "#e5e7eb",

  /* Primary = Iron Throne gold (muted, dirty) */
  primary: "#b08d57",           // aged gold, NOT shiny
  primaryRgb: "176, 141, 87",
  primaryForeground: "#0b0d10",

  /* Secondary = cold steel */
  secondary: "#1c2128",
  secondaryForeground: "#e5e7eb",

  /* Muted = ash / fog */
  muted: "#181c22",
  mutedForeground: "#9aa1ad",

  /* Accent = blood / fire */
  accent: "#7f1d1d",            // deep blood red
  accentForeground: "#f8fafc",

  destructive: "#991b1b",

  /* Borders & inputs = forged metal */
  border: "#2a2f36",
  input: "#2a2f36",
  ring: "#b08d57",

  /* Radius = sharp medieval, not bubbly */
  radius: "0.5rem",

  /* Charts = houses palette */
  chart: [
    "#b08d57", // gold
    "#7f1d1d", // blood
    "#475569", // steel gray
    "#1f2937", // night blue
    "#92400e", // bronze
  ],
}
,
  STRANGER_THINGS: {
  /* Core surfaces */
  background: "#050506",        // pitch black
  foreground: "#e5e7eb",        // soft white text

  card: "#0b0c0f",              // slightly lifted black
  cardForeground: "#e5e7eb",

  popover: "#0b0c0f",
  popoverForeground: "#e5e7eb",

  /* Primary = emergency red neon */
  primary: "#dc2626",           // deep neon red
  primaryRgb: "220, 38, 38",
  primaryForeground: "#ffffff",

  /* Secondary = dark graphite */
  secondary: "#111216",
  secondaryForeground: "#e5e7eb",

  /* Muted = foggy gray */
  muted: "#14151a",
  mutedForeground: "#9ca3af",

  /* Accent = brighter red glow */
  accent: "#ef4444",            // glow red
  accentForeground: "#ffffff",

  destructive: "#b91c1c",

  /* Borders & inputs */
  border: "#1f2026",
  input: "#1f2026",
  ring: "#dc2626",

  /* Sharp, industrial */
  radius: "0.5rem",

  /* Charts = red-only horror palette */
  chart: [
    "#dc2626", // main red
    "#ef4444", // glow red
    "#7f1d1d", // dark blood
    "#991b1b", // muted red
    "#450a0a", // almost black red
  ],
}
,

  MONEY_HEIST: {
    background: "#ffffff",
    foreground: "#111111",

    card: "#f8f8f8",
    cardForeground: "#111111",

    popover: "#f8f8f8",
    popoverForeground: "#111111",

    primary: "#d90429",
    primaryRgb: "217, 4, 41",
    primaryForeground: "#ffffff",

    secondary: "#f1f1f1",
    secondaryForeground: "#111111",

    muted: "#ededed",
    mutedForeground: "#555555",

    accent: "#000000",
    accentForeground: "#ffffff",

    destructive: "#ef233c",

    border: "#dddddd",
    input: "#ffffff",
    ring: "#d90429",
    radius: "0.75rem",

    chart: ["#d90429", "#000000", "#8d99ae", "#ef233c", "#2b2d42"],
  },

  BREAKING_BAD: {
    background: "#fdf6e3",
    foreground: "#3b3b3b",

    card: "#ffffff",
    cardForeground: "#3b3b3b",

    popover: "#ffffff",
    popoverForeground: "#3b3b3b",

    primary: "#f4d03f",
    primaryRgb: "244, 208, 63",
    primaryForeground: "#3b3b3b",

    secondary: "#f6e8b1",
    secondaryForeground: "#3b3b3b",

    muted: "#efe6c8",
    mutedForeground: "#6b6b6b",

    accent: "#2ecc71",
    accentForeground: "#0b2e13",

    destructive: "#c0392b",

    border: "#e0d8b0",
    input: "#ffffff",
    ring: "#f4d03f",
    radius: "0.9rem",

    chart: ["#f4d03f", "#2ecc71", "#16a085", "#c0392b", "#2980b9"],
  },

  DARK: {
    background: "#0c0c0c",
    foreground: "#e5e5e5",

    card: "#151515",
    cardForeground: "#e5e5e5",

    popover: "#151515",
    popoverForeground: "#e5e5e5",

    primary: "#ffb703",
    primaryRgb: "255, 183, 3",
    primaryForeground: "#0c0c0c",

    secondary: "#1f1f1f",
    secondaryForeground: "#e5e5e5",

    muted: "#181818",
    mutedForeground: "#9a9a9a",

    accent: "#fb8500",
    accentForeground: "#0c0c0c",

    destructive: "#e63946",

    border: "#2a2a2a",
    input: "#2a2a2a",
    ring: "#ffb703",
    radius: "0.65rem",

    chart: ["#ffb703", "#fb8500", "#8ecae6", "#219ebc", "#e63946"],
  },

  EUPHORIA: {
    background: "#0a0215",
    foreground: "#f7f1ff",

    card: "#14072a",
    cardForeground: "#f7f1ff",

    popover: "#14072a",
    popoverForeground: "#f7f1ff",

    primary: "#c77dff",
    primaryRgb: "199, 125, 255",
    primaryForeground: "#0a0215",

    secondary: "#1f0f3d",
    secondaryForeground: "#f7f1ff",

    muted: "#1a0c33",
    mutedForeground: "#b9a7e3",

    accent: "#4cc9f0",
    accentForeground: "#001219",

    destructive: "#ff477e",

    border: "#2b1452",
    input: "#2b1452",
    ring: "#c77dff",
    radius: "1rem",

    chart: ["#c77dff", "#4cc9f0", "#ffbe0b", "#ff477e", "#3a86ff"],
  },
} as const;

export const THEME_NAME_LIST = [
  "GOT",
  "STRANGER_THINGS",
  "MONEY_HEIST",
  "BREAKING_BAD",
  "DARK",
  "EUPHORIA",
] as const;

export type ThemeKey = keyof typeof THEMES;
export type Theme = (typeof THEMES)[ThemeKey];
export function themeToCssVars(theme: any) {
  return `
  :root {
    --background: ${theme.background};
    --foreground: ${theme.foreground};

    --card: ${theme.card};
    --card-foreground: ${theme.cardForeground};

    --popover: ${theme.popover};
    --popover-foreground: ${theme.popoverForeground};

    --primary: ${theme.primary};
    --primary-rgb: ${theme.primaryRgb};
    --primary-foreground: ${theme.primaryForeground};

    --secondary: ${theme.secondary};
    --secondary-foreground: ${theme.secondaryForeground};

    --muted: ${theme.muted};
    --muted-foreground: ${theme.mutedForeground};

    --accent: ${theme.accent};
    --accent-foreground: ${theme.accentForeground};

    --destructive: ${theme.destructive};

    --border: ${theme.border};
    --input: ${theme.input};
    --ring: ${theme.ring};

    --radius: ${theme.radius};

    /* charts */
    --chart-1: ${theme.chart?.[0]};
    --chart-2: ${theme.chart?.[1]};
    --chart-3: ${theme.chart?.[2]};
    --chart-4: ${theme.chart?.[3]};
    --chart-5: ${theme.chart?.[4]};
  }
  `;
}

