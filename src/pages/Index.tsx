import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HeroShowcaseCarousel from "@/components/HeroShowcaseCarousel";
import IntegratedAiSuite from "@/components/IntegratedAiSuite";
import ImplementationServicesSection from "@/components/ImplementationServicesSection";
import StripeCtaBlock from "@/components/StripeCtaBlock";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HeroShowcaseCarousel />
        <IntegratedAiSuite />
        <StripeCtaBlock />
        <ImplementationServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
