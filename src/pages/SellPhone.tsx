import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Smartphone, CheckCircle, Calendar, DollarSign } from "lucide-react";

const SellPhone = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllBrands, setShowAllBrands] = useState(false);

  const popularBrands = [
    { id: "apple", name: "Apple", icon: "🍎" },
    { id: "samsung", name: "Samsung", icon: "📱" },
    { id: "mi", name: "MI", icon: "📲" },
    { id: "vivo", name: "Vivo", icon: "📱" },
  ];

  const allBrands = [
    ...popularBrands,
    { id: "oppo", name: "Oppo", icon: "📱" },
    { id: "oneplus", name: "OnePlus", icon: "📱" },
    { id: "realme", name: "Realme", icon: "📱" },
    { id: "google", name: "Google", icon: "📱" },
    { id: "motorola", name: "Motorola", icon: "📱" },
    { id: "nokia", name: "Nokia", icon: "📱" },
  ];

  const processSteps = [
    { icon: DollarSign, title: "Check Price", description: "Get instant quote" },
    { icon: Calendar, title: "Schedule Pickup", description: "Choose your time" },
    { icon: CheckCircle, title: "Get Paid", description: "Receive payment" },
  ];

  const displayedBrands = showAllBrands ? allBrands : popularBrands;

  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-glow">Sell Old Mobile Phone</span> for Instant Cash
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get the best price for your mobile phone with our instant cash offer
            </p>
          </div>

          {/* Search Bar */}
          <Card className="card-premium mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Search for your device model (e.g., iPhone 14, Samsung S21)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-transparent border-none"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-hero">
                Search
              </Button>
            </div>
          </Card>

          {/* Choose a Brand Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Choose a Brand</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {displayedBrands.map((brand) => (
                <Link key={brand.id} to={`/sell-phone/brand/${brand.id}`}>
                  <Card className="card-premium cursor-pointer hover:scale-105 transition-all duration-300 text-center p-6">
                    <div className="text-4xl mb-3">{brand.icon}</div>
                    <h3 className="font-semibold text-foreground">{brand.name}</h3>
                  </Card>
                </Link>
              ))}
            </div>
            
            {!showAllBrands && (
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setShowAllBrands(true)}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  View More Brands
                </Button>
              </div>
            )}
          </div>

          {/* How Sell Car Works */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-8">How Sell Car Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground text-center">{step.description}</p>
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

export default SellPhone;