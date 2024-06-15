import FAQsSection from "./_components/FAQsSection";
import YouCanTrustSection from "./_components/YouCanTrustSection";
import HeroSection from "./_components/HeroSection";

export default function Home() {
  return (
    <main className="h-full">
      <HeroSection />
      <YouCanTrustSection />
      <FAQsSection />
    </main>
  );
}
