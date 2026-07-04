// ─── Design Tokens ───
// Konoha (light) and Akatsuki (dark) theme systems

export const themeTokens = {
  konoha: {
    bg: "#F5E6C8",
    ink: "#1A1A1A",
    leaf: "#2E5339",
    orange: "#FF7A00",
    panel: "#EAD9B5",
    muted: "#8B7D6B",
    border: "#D4C4A8",
  },
  akatsuki: {
    bg: "#0B0B0F",
    panel: "#16161C",
    red: "#C81E1E",
    cloud: "#8B0000",
    ash: "#2A2A2E",
    text: "#E8E0D0",
    muted: "#6B6B7B",
    border: "#2A2A2E",
  },
  doujutsu: {
    sharinganRed: "#D62828",
    sharinganGlow: "#FF1E1E",
    mangekyouCrimson: "#7A0C0C",
    rinneganLilac: "#A78BFA",
    rinneganRing: "#E5E5E5",
    byakuganPale: "#EDEBFF",
  },
  elements: {
    katon: "#FF4E00",
    suiton: "#2EC4B6",
    raiton: "#7FDBFF",
    doton: "#8D6748",
    rasengan: "#3AA0FF",
    kurama: "#FFB000",
  },
} as const;

// CSS custom properties string for injection
export function getThemeCSSVars(mode: "konoha" | "akatsuki"): Record<string, string> {
  const k = themeTokens.konoha;
  const a = themeTokens.akatsuki;
  const isKonoha = mode === "konoha";
  return {
    "--theme-bg": isKonoha ? k.bg : a.bg,
    "--theme-panel": isKonoha ? k.panel : a.panel,
    "--theme-text": isKonoha ? k.ink : a.text,
    "--theme-muted": isKonoha ? k.muted : a.muted,
    "--theme-border": isKonoha ? k.border : a.border,
    "--theme-accent": isKonoha ? k.orange : a.red,
    "--theme-accent-secondary": isKonoha ? k.leaf : a.cloud,
    // Doujutsu accents (shared)
    "--sharingan-red": themeTokens.doujutsu.sharinganRed,
    "--sharingan-glow": themeTokens.doujutsu.sharinganGlow,
    "--mangekyou-crimson": themeTokens.doujutsu.mangekyouCrimson,
    "--rinnegan-lilac": themeTokens.doujutsu.rinneganLilac,
    "--rinnegan-ring": themeTokens.doujutsu.rinneganRing,
    "--byakugan-pale": themeTokens.doujutsu.byakuganPale,
    // Elemental accents (shared)
    "--katon": themeTokens.elements.katon,
    "--suiton": themeTokens.elements.suiton,
    "--raiton": themeTokens.elements.raiton,
    "--doton": themeTokens.elements.doton,
    "--rasengan": themeTokens.elements.rasengan,
    "--kurama": themeTokens.elements.kurama,
  };
}
