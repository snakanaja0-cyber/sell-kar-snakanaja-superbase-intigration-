import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, MapPin, CheckCircle } from "lucide-react";

const CitySelection = () => {
  const { brandId, deviceId } = useParams();
  const navigate = useNavigate();
  const deviceType = window.location.pathname.split('/')[1].replace('sell-', '');
  const [selectedCity, setSelectedCity] = useState<string>("");

  const mainCities = [
    { id: "bangalore", name: "Bangalore", state: "Karnataka" },
    { id: "chennai", name: "Chennai", state: "Tamil Nadu" },
    { id: "delhi", name: "Delhi", state: "Delhi" },
    { id: "gurgaon", name: "Gurgaon", state: "Haryana" },
  ];

  const otherCities = [
    { id: "mumbai", name: "Mumbai", state: "Maharashtra" },
    { id: "pune", name: "Pune", state: "Maharashtra" },
    { id: "hyderabad", name: "Hyderabad", state: "Telangana" },
    { id: "kolkata", name: "Kolkata", state: "West Bengal" },
    { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat" },
    { id: "jaipur", name: "Jaipur", state: "Rajasthan" },
  ];

  const handleCitySelect = (cityId: string) => {
    setSelectedCity(cityId);
  };

  const handleContinue = () => {
    if (selectedCity && deviceType && brandId && deviceId) {
      navigate(`/sell-${deviceType}/brand/${brandId}/device/${deviceId}/city/${selectedCity}/variant`);
    }
  };

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
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Select Your <span className="text-glow">City</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your city to get the best price and pickup service
            </p>
          </div>

          {/* Device Info */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <span className="capitalize">{brandId}</span> 
              <span>•</span> 
              <span>{deviceId}</span>
            </div>
          </div>

          {/* Main Cities Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Popular Cities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mainCities.map((city) => (
                <Card
                  key={city.id}
                  className={`card-premium cursor-pointer transition-all duration-300 p-6 ${
                    selectedCity === city.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:scale-105'
                  }`}
                  onClick={() => handleCitySelect(city.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{city.name}</h3>
                        <p className="text-sm text-muted-foreground">{city.state}</p>
                      </div>
                    </div>
                    {selectedCity === city.id && (
                      <CheckCircle className="w-6 h-6 text-primary" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Other Cities Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Other Cities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherCities.map((city) => (
                <Card
                  key={city.id}
                  className={`card-premium cursor-pointer transition-all duration-300 p-4 ${
                    selectedCity === city.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:scale-105'
                  }`}
                  onClick={() => handleCitySelect(city.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">{city.name}</h3>
                        <p className="text-xs text-muted-foreground">{city.state}</p>
                      </div>
                    </div>
                    {selectedCity === city.id && (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button
              onClick={handleContinue}
              disabled={!selectedCity}
              className="btn-hero w-full md:w-auto px-12 py-3 text-lg"
            >
              Continue to Variant Selection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitySelection;