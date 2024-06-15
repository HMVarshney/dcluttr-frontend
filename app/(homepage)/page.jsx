import FAQsSection from "./_components/FAQsSection";
import YouCanTrustSection from "./_components/YouCanTrustSection";
import HeroSection from "./_components/HeroSection";
import OneDashboardSection from "./_components/OneDashboardSection";
import PerformanceSection from "./_components/PerformanceSection";

export default function Home() {
  return (
    <main className="h-full">
      <HeroSection />
      <YouCanTrustSection />
      <OneDashboardSection />
      <PerformanceSection />
      <FAQsSection />
    </main>
  );
}
