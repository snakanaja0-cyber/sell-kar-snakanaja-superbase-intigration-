import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Calendar, DollarSign, Home } from "lucide-react";

const SellLaptop = () => {
  const brands = [
    { id: "apple", name: "Apple", image: "https://s3ng.cashify.in/cashify/brand/img/xhdpi/2e7cdc22-5a5f.jpg?w=100" },
  ];

  const processSteps = [
    { icon: DollarSign, title: "Check Price", description: "Get instant quote" },
    { icon: Calendar, title: "Schedule Pickup", description: "Choose your time" },
    { icon: CheckCircle, title: "Get Paid", description: "Receive payment" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Home Button */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2 text-black hover:text-black">
                <Home size={20} />
                Home
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-blue-600">Search Model</span> for Your Device to Sell
            </h1>
            <p className="text-xl text-black max-w-2xl mx-auto">
              Find your laptop model and get the best price instantly
            </p>
          </div>

          {/* Choose a Brand Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Choose a Brand</h2>
            <div className="flex justify-center mb-6">
              {brands.map((brand) => (
                <div key={brand.id}>
                  <Card className="card-premium cursor-pointer hover:scale-105 transition-all duration-300 text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                      <img src={brand.image} alt={brand.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-semibold text-black">{brand.name}</h3>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* How Sell Car Works */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-8">How Sell kar Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{step.title}</h3>
                  <p className="text-black text-center">{step.description}</p>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-32 h-0.5 bg-primary/20 transform translate-x-8"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellLaptop;