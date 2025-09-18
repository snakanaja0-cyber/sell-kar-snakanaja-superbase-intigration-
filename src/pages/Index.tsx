import HeroSection from "@/components/HeroSection";
import PriceEvaluation from "@/components/PriceEvaluation";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import ContactSupport from "@/components/ContactSupport";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <PriceEvaluation />
      <HowItWorks />
      <Testimonials />
      <ContactSupport />
      <Footer />
    </div>
  );
};

export default Index;
