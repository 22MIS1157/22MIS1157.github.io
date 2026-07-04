"use client";

import { usePortfolioStore } from "@/lib/store";

export default function VillageToggle() {
  const themeMode = usePortfolioStore((s) => s.themeMode);
  const toggleTheme = usePortfolioStore((s) => s.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      className="village-toggle"
      aria-label={`Switch to ${themeMode === "konoha" ? "Akatsuki" : "Konoha"} mode`}
      title={`Current: ${themeMode === "konoha" ? "Konoha" : "Akatsuki"} Mode`}
    >
      <div className={`toggle-track ${themeMode === "akatsuki" ? "toggle-track--dark" : ""}`}>
        <div className="toggle-thumb">
          {themeMode === "konoha" ? (
            <svg viewBox="0 0 24 24" className="toggle-icon" aria-hidden="true">
              <circle cx="12" cy="12" r="5" fill="currentColor" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="toggle-icon" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
            </svg>
          )}
        </div>
      </div>
      <span className="toggle-label">
        {themeMode === "konoha" ? "Konoha" : "Akatsuki"}
      </span>
    </button>
  );
}
