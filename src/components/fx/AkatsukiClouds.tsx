"use client";

import { usePortfolioStore } from "@/lib/store";

export default function AkatsukiClouds() {
  const themeMode = usePortfolioStore((s) => s.themeMode);
  const lowFxMode = usePortfolioStore((s) => s.lowFxMode);

  if (themeMode !== "akatsuki" || lowFxMode) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2, // below UI elements, above background grids
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {/* Cloud 1 */}
      <div
        className="akatsuki-cloud-drifter"
        style={{
          top: "12%",
          left: "-150px",
          width: "150px",
          opacity: 0.05,
          animation: "floatCloud 45s linear infinite",
          animationDelay: "0s",
        }}
      >
        <img src="/svg/cloud-pattern.svg" alt="" style={{ width: "100%" }} />
      </div>

      {/* Cloud 2 */}
      <div
        className="akatsuki-cloud-drifter"
        style={{
          top: "40%",
          left: "-180px",
          width: "180px",
          opacity: 0.03,
          animation: "floatCloud 60s linear infinite",
          animationDelay: "-15s",
        }}
      >
        <img src="/svg/cloud-pattern.svg" alt="" style={{ width: "100%" }} />
      </div>

      {/* Cloud 3 */}
      <div
        className="akatsuki-cloud-drifter"
        style={{
          top: "70%",
          left: "-120px",
          width: "120px",
          opacity: 0.04,
          animation: "floatCloud 35s linear infinite",
          animationDelay: "-5s",
        }}
      >
        <img src="/svg/cloud-pattern.svg" alt="" style={{ width: "100%" }} />
      </div>

      {/* Cloud 4 */}
      <div
        className="akatsuki-cloud-drifter"
        style={{
          top: "85%",
          left: "-200px",
          width: "200px",
          opacity: 0.02,
          animation: "floatCloud 80s linear infinite",
          animationDelay: "-30s",
        }}
      >
        <img src="/svg/cloud-pattern.svg" alt="" style={{ width: "100%" }} />
      </div>

      <style jsx>{`
        .akatsuki-cloud-drifter {
          position: absolute;
        }

        @keyframes floatCloud {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(calc(100vw + 250px));
          }
        }
      `}</style>
    </div>
  );
}
