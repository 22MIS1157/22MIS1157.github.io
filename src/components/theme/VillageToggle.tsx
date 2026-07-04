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
            <img
              src="/svg/leaf-spiral.svg"
              alt="Konoha"
              style={{
                width: "14px",
                height: "14px",
                filter: "brightness(0) saturate(100%) invert(20%) sepia(20%) saturate(1000%) hue-rotate(90deg)", // dark green for Konoha mode
              }}
            />
          ) : (
            <img
              src="/svg/cloud-pattern.svg"
              alt="Akatsuki"
              style={{
                width: "18px",
                height: "10px",
              }}
            />
          )}
        </div>
      </div>
      <span className="toggle-label">
        {themeMode === "konoha" ? "Konoha" : "Akatsuki"}
      </span>
    </button>
  );
}
