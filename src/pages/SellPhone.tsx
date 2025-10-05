import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Smartphone, CheckCircle, Calendar, DollarSign, Home } from "lucide-react";

const SellPhone = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const brands = [
    { id: "apple", name: "Apple", image: "https://s3ng.cashify.in/cashify/brand/img/xhdpi/2e7cdc22-5a5f.jpg?w=100" },
    { id: "samsung", name: "Samsung", image: "https://s3ng.cashify.in/cashify/brand/img/xhdpi/406a512d-e8dd.jpg?w=200" },
    { id: "mi", name: "MI", image: "https://s3ng.cashify.in/cashify/brand/img/xhdpi/cb96df6e-080f.jpg?w=200" },
    { id: "vivo", name: "Vivo", image: "https://s3ng.cashify.in/cashify/brand/img/xhdpi/20922c34-8afc.jpg?w=200" },
    { id: "oneplus", name: "OnePlus", image: "https://s3ng.cashify.in/cashify/brand/img/xhdpi/dfb6c340-010f.jpg?w=200" },
    { id: "oppo", name: "Oppo", image: "https://s3ng.cashify.in/cashify/brand/img/xhdpi/ac5c9a7b-76b5.jpg?w=200" },
    { id: "realme", name: "Realme", image: "https://s3ng.cashify.in/cashify/brand/img/xhdpi/0124cc45-3a6c.jpg?w=200" },
    { id: "huawei", name: "Huawei", image: "https://imgs.search.brave.com/yzwPGLer5pyc2Wefdj4TDd7qbz_rdVcDf87r8VWacH4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy90aHVtYi9kL2RiL0h1YXdlaV93b3JkbWFhcmtfMjAxOS5zdmcvMjUwcHgtSHVhd2VpX3dvcmRtYXJrXzIwMTkuc3ZnLnBuZw" },
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
              <span style={{ color: "royalBlue" }}>Sell Old Mobile Phone</span> for Instant Cash
            </h1>
            <p className="text-xl text-black max-w-2xl mx-auto">
              Find your phone model and get the best price instantly
            </p>
          </div>

          {/* Choose a Brand Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Choose a Brand</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {brands.map((brand) => (
                <Link key={brand.id} to={`/sell-phone/brand/${brand.id}`}>
                  <Card className="card-premium cursor-pointer hover:scale-105 transition-all duration-300 text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                      <img src={brand.image} alt={brand.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-semibold text-foreground">{brand.name}</h3>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* How Sell Kar Works */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-8">How Sell kar Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{step.title}</h3>
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

export default SellPhone;