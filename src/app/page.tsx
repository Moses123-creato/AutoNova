import dynamic from "next/dynamic";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { PerformanceResults } from "@/components/performance-results";
import { SyncSection } from "@/components/sync-section";

// Below the fold and heavy, so it gets its own chunk. It is still server
// rendered, so the dashboard frame is in the HTML before any JavaScript runs.
const DashboardSection = dynamic(() => import("@/components/dashboard-section"), {
  loading: () => <div className="h-screen w-full bg-[#050505]" aria-hidden="true" />
});

const ServicesSection = dynamic(() => import("@/components/services-section"), {
  loading: () => <div className="h-screen w-full bg-[#020617]" aria-hidden="true" />
});

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#030507] text-[#E4E9F4] selection:bg-[#1550B8] selection:text-white">
      <Navbar />
      <main id="main-content">
        <Hero />
        <PerformanceResults />
        <ServicesSection />
        <SyncSection />
        <DashboardSection />
      </main>
    </div>
  );
}
