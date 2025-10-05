import { Calculator, Truck, CreditCard } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Calculator,
      title: "Get a Quote",
      description: "Select your device and condition to receive an instant price estimate using our advanced evaluation system.",
      color: "text-blue-700",
      gradient: "from-blue-700/20 to-blue-700/5"
    },
    {
      icon: Truck,
      title: "Schedule Pickup",
      description: "Book a convenient time for our professional team to collect your device from your doorstep at no extra cost.",
      color: "text-gold",
      gradient: "from-gold/20 to-gold/5"
    },
    {
      icon: CreditCard,
      title: "Get Paid",
      description: "After quick inspection and verification, receive immediate payment via your preferred method - cash, bank transfer, or UPI.",
      color: "text-blue-700",
      gradient: "from-blue-700/20 to-blue-700/5"
    }
  ];

  return (
    <section className="section-padding bg-gradient-hero">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-scale">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            How <span className="text-blue-700">It Works</span>
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Our streamlined process makes selling your gadgets simple, secure, and hassle-free. 
            From quote to payment in just three easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={index}
                className="relative animate-slide-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Connection Line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0"></div>
                )}
                
                <div className="card-premium text-center relative z-10 group">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-glow">
                    {index + 1}
                  </div>

                  {/* Icon Container */}
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                    <IconComponent className={`w-10 h-10 ${step.color}`} />
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-black leading-relaxed">
                    {step.description}
                  </p>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-700/5 to-gold/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-scale">
          <p className="text-lg text-black mb-6">
            Ready to sell your device? Start the process now!
          </p>
          <button 
            onClick={() => document.getElementById('price-evaluation')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-hero pulse-glow bg-blue-700 hover:bg-blue-800 text-black"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;