import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-gadgets.jpg";

const HeroSection = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Premium modern gadgets and electronics"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-background/40"></div>
      </div>

      {/* Floating Orbs for Visual Appeal */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-700/20 rounded-full blur-3xl float-animation"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl float-animation" style={{animationDelay: '2s'}}></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="animate-fade-in-scale">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-blue-700">SELLKAR</span>
             
            <span className="text-saffron"> IND</span><span className="text-indian-green">IA</span>
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl text-black mb-4 font-light">
            Your Trusted Marketplace for Quality Electronics
          </p>
          
          <p className="text-lg text-black mb-12 max-w-2xl mx-auto">
            Get instant quotes, schedule convenient pickups, and receive immediate payment for your premium gadgets. 
            Professional, secure, and hassle-free.
          </p>

          <div className="flex justify-center">
            <Button 
              className="btn-hero pulse-glow bg-blue-700 hover:bg-blue-800 text-black"
              onClick={() => document.getElementById('price-evaluation')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Instant Quote
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="animate-slide-in-up" style={{animationDelay: '0.2s'}}>
              <div className="text-3xl font-bold text-blue-700">10,000+</div>
              <div className="text-black">Devices Purchased</div>
            </div>
            <div className="animate-slide-in-up" style={{animationDelay: '0.4s'}}>
              <div className="text-3xl font-bold text-blue-700">4.9★</div>
              <div className="text-black">Customer Rating</div>
            </div>
            <div className="animate-slide-in-up" style={{animationDelay: '0.6s'}}>
              <div className="text-3xl font-bold text-blue-700">24/7</div>
              <div className="text-black">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-700/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-700 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;