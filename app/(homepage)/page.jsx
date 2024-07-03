import FAQsSection from "./_components/FAQsSection";
import YouCanTrustSection from "./_components/YouCanTrustSection";
import HeroSection from "./_components/HeroSection";
import OneDashboardSection from "./_components/OneDashboardSection";
import PerformanceSection from "./_components/PerformanceSection";
import AnalyticsSection from "./_components/AnalyticsSection";
import PowerFeaturesSection from "./_components/PowerFeaturesSection";
import ScaleItSection from "./_components/ScaleItSection";
import TestimonialSection from "./_components/TestimonialSection";

export default function Home() {
  return (
    <main className="h-full">
      <HeroSection />
      <YouCanTrustSection />
      <OneDashboardSection />
      <PerformanceSection />
      <TestimonialSection />
      <AnalyticsSection />
      {/* <PowerFeaturesSection /> */}
      <FAQsSection />
      <ScaleItSection />
    </main>
  );
}
