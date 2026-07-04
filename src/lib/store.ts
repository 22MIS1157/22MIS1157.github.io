import { create } from "zustand";

type ThemeMode = "konoha" | "akatsuki";

interface PortfolioState {
  // Theme
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;

  // FX controls
  reducedMotion: boolean;
  lowFxMode: boolean;
  setReducedMotion: (v: boolean) => void;
  setLowFxMode: (v: boolean) => void;

  // Loader
  loaderComplete: boolean;
  setLoaderComplete: (v: boolean) => void;

  // Scroll progress
  scrollProgress: number;
  setScrollProgress: (v: number) => void;

  // Easter eggs
  sageModeActive: boolean;
  setSageModeActive: (v: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  // Theme — default to Akatsuki (dark) for impact
  themeMode: "akatsuki",
  toggleTheme: () =>
    set((s) => ({
      themeMode: s.themeMode === "konoha" ? "akatsuki" : "konoha",
    })),
  setTheme: (mode) => set({ themeMode: mode }),

  // FX
  reducedMotion: false,
  lowFxMode: false,
  setReducedMotion: (v) => set({ reducedMotion: v }),
  setLowFxMode: (v) => set({ lowFxMode: v }),

  // Loader
  loaderComplete: false,
  setLoaderComplete: (v) => set({ loaderComplete: v }),

  // Scroll
  scrollProgress: 0,
  setScrollProgress: (v) => set({ scrollProgress: v }),

  // Easter eggs
  sageModeActive: false,
  setSageModeActive: (v) => set({ sageModeActive: v }),
}));
