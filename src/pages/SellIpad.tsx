import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Tablet, CheckCircle, Calendar, DollarSign, Home } from "lucide-react";

const SellIpad = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllBrands, setShowAllBrands] = useState(false);

  const popularBrands = [
    { id: "apple", name: "Apple", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop" },
    { id: "samsung", name: "Samsung", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop" },
    { id: "microsoft", name: "Microsoft", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop" },
    { id: "lenovo", name: "Lenovo", image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=100&h=100&fit=crop" },
  ];

  const allBrands = [
    ...popularBrands,
    { id: "huawei", name: "Huawei", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop" },
    { id: "xiaomi", name: "Xiaomi", image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=100&h=100&fit=crop" },
    { id: "amazon", name: "Amazon", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop" },
    { id: "google", name: "Google", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop" },
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
          {/* Home Button */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Home size={20} />
                Home
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-glow">Search Model</span> for Your Device to Sell
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find your iPad or tablet model and get the best price instantly
            </p>
          </div>

          {/* Search Bar */}
          <Card className="card-premium mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Search for your tablet model (e.g., iPad Pro, Galaxy Tab)"
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
                <Link key={brand.id} to={`/sell-ipad/brand/${brand.id}`}>
                  <Card className="card-premium cursor-pointer hover:scale-105 transition-all duration-300 text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                      <img src={brand.image} alt={brand.name} className="w-full h-full object-cover" />
                    </div>
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

export default SellIpad;