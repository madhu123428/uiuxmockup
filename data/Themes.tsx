export const THEMES = {
  GOT: {
    background: "#0e1116",
    foreground: "#e6e8eb",

    card: "#161b22",
    cardForeground: "#e6e8eb",

    popover: "#161b22",
    popoverForeground: "#e6e8eb",

    primary: "#c9a24d",
    primaryRgb: "201, 162, 77",
    primaryForeground: "#0e1116",

    secondary: "#1f2630",
    secondaryForeground: "#e6e8eb",

    muted: "#1a202a",
    mutedForeground: "#9da5b4",

    accent: "#9b1c1c",
    accentForeground: "#ffffff",

    destructive: "#b91c1c",

    border: "#2b3442",
    input: "#2b3442",
    ring: "#c9a24d",
    radius: "0.7rem",

    chart: ["#c9a24d", "#9b1c1c", "#4b5563", "#2563eb", "#7c3aed"],
  },
  STRANGER_THINGS: {
    background: "#0b0b12",
    foreground: "#f2f2f7",

    card: "#141420",
    cardForeground: "#f2f2f7",

    popover: "#141420",
    popoverForeground: "#f2f2f7",

    primary: "#e50914",
    primaryRgb: "229, 9, 20",
    primaryForeground: "#ffffff",

    secondary: "#1f1f2e",
    secondaryForeground: "#f2f2f7",

    muted: "#191926",
    mutedForeground: "#9aa0b3",

    accent: "#00e5ff",
    accentForeground: "#0b0b12",

    destructive: "#ff3b3b",

    border: "#2a2a3d",
    input: "#2a2a3d",
    ring: "#e50914",
    radius: "0.85rem",

    chart: ["#e50914", "#00e5ff", "#ffb703", "#9b5cff", "#3a86ff"],
  },

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

