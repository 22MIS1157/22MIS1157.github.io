"use client";

import dynamic from "next/dynamic";
import { usePortfolioStore } from "@/lib/store";

// Lazy-load all sections for code-splitting
const HandSealBoot = dynamic(() => import("@/components/loader/HandSealBoot"), { ssr: false });
const Navbar = dynamic(() => import("@/components/nav/Navbar"), { ssr: false });
const PrologueHero = dynamic(() => import("@/components/hero/PrologueHero"), { ssr: false });
const AwakeningEye = dynamic(() => import("@/components/about/AwakeningEye"), { ssr: false });
const JutsuArsenal = dynamic(() => import("@/components/skills/JutsuArsenal"), { ssr: false });
const MissionScroll = dynamic(() => import("@/components/projects/MissionScroll"), { ssr: false });
const RankTrail = dynamic(() => import("@/components/experience/RankTrail"), { ssr: false });
const AcademyRecords = dynamic(() => import("@/components/sections/AcademyRecords"), { ssr: false });
const ScrollsCertifications = dynamic(() => import("@/components/sections/ScrollsCertifications"), { ssr: false });
const VillageContributions = dynamic(() => import("@/components/sections/VillageContributions"), { ssr: false });
const SummonHawk = dynamic(() => import("@/components/contact/SummonHawk"), { ssr: false });
const ChakraSeal = dynamic(() => import("@/components/fx/ChakraSeal"), { ssr: false });
const ChakraCursor = dynamic(() => import("@/components/cursor/ChakraCursor"), { ssr: false });

export default function Home() {
  const loaderComplete = usePortfolioStore((s) => s.loaderComplete);

  return (
    <>
      {/* Boot sequence loader */}
      <HandSealBoot />

      {/* Main portfolio content — visible after loader completes */}
      {loaderComplete && (
        <>
          <ChakraCursor />
          <Navbar />

          <main>
            <PrologueHero />
            <AwakeningEye />
            <JutsuArsenal />
            <MissionScroll />
            <RankTrail />
            <AcademyRecords />
            <ScrollsCertifications />
            <VillageContributions />
            <SummonHawk />
          </main>

          <footer className="site-footer">
            <p>
              Designed & Built by{" "}
              <a href="https://github.com/22MIS1157" target="_blank" rel="noopener noreferrer">
                Afnaan Ahmed P
              </a>{" "}
              · {new Date().getFullYear()}
            </p>
          </footer>

          {/* Scroll progress indicator */}
          <ChakraSeal />
        </>
      )}
    </>
  );
}
