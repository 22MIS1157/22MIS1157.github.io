"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--theme-bg, #0B0B0F)",
        color: "var(--theme-text, #E8E0D0)",
        textAlign: "center",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Pulsing Sharingan eye background */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(214,40,40,0.08) 0%, transparent 70%)",
          animation: "genjutsuPulse 3s ease-in-out infinite",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Large 404 */}
        <h1
          style={{
            fontFamily: "var(--font-shippori), serif",
            fontSize: "clamp(6rem, 15vw, 12rem)",
            fontWeight: 900,
            lineHeight: 1,
            color: "var(--sharingan-red, #D62828)",
            textShadow: "0 0 60px rgba(214,40,40,0.3)",
            marginBottom: "16px",
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontFamily: "var(--font-shippori), serif",
            fontSize: "clamp(1.2rem, 3vw, 2rem)",
            fontWeight: 600,
            marginBottom: "12px",
            color: "var(--theme-text, #E8E0D0)",
          }}
        >
          You&apos;ve been caught in a Genjutsu
        </h2>

        <p
          style={{
            fontSize: "1rem",
            color: "var(--theme-muted, #6B6B7B)",
            maxWidth: "440px",
            margin: "0 auto 40px",
            lineHeight: 1.6,
          }}
        >
          This page doesn&apos;t exist in any dimension. The illusion ends here.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 32px",
            background: "var(--sharingan-red, #D62828)",
            color: "#fff",
            borderRadius: "8px",
            fontSize: "0.9rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 20px rgba(214,40,40,0.3)",
          }}
        >
          Release the Jutsu
        </Link>
      </div>

      <style>{`
        @keyframes genjutsuPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
