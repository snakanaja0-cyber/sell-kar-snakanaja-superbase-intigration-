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

  const cities = [
    { id: "delhi-ncr", name: "DELHI NCR", state: "Delhi" },
    { id: "mumbai", name: "MUMBAI", state: "Maharashtra" },
    { id: "chennai", name: "CHENNAI", state: "Tamil Nadu" },
    { id: "bangalore", name: "BANGALORE", state: "Karnataka" },
    { id: "hyderabad", name: "HYDERABAD", state: "Telangana" },
    { id: "thane", name: "THANE", state: "Maharashtra" },
    { id: "jaipur", name: "JAIPUR", state: "Rajasthan" },
    { id: "pune", name: "PUNE", state: "Maharashtra" },
    { id: "agra", name: "AGRA", state: "Uttar Pradesh" },
    { id: "kolkata", name: "KOLKATA", state: "West Bengal" },
    { id: "gorakhpur", name: "GORAKHPUR", state: "Uttar Pradesh" },
    { id: "mathura", name: "MATHURA", state: "Uttar Pradesh" },
    { id: "banaras", name: "BANARAS", state: "Uttar Pradesh" },
    { id: "lucknow", name: "LUCKNOW", state: "Uttar Pradesh" },
    { id: "kanpur", name: "KANPUR", state: "Uttar Pradesh" },
    { id: "chandigarh", name: "CHANDIGARH", state: "Chandigarh" },
    { id: "amritsar", name: "AMRITSAR", state: "Punjab" },
    { id: "ludhiana", name: "LUDHIANA", state: "Punjab" },
    { id: "patna", name: "PATNA", state: "Bihar" },
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
        <div className="max-w-6xl mx-auto">
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

          {/* Cities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {cities.map((city) => (
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

          {/* My City Not Listed */}
          <div className="mb-8">
            <Card
              className={`card-premium cursor-pointer transition-all duration-300 p-6 border-dashed ${
                selectedCity === "other" 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:scale-105'
              }`}
              onClick={() => handleCitySelect("other")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">My city is not listed here</h3>
                    <p className="text-sm text-muted-foreground">Select this if your city is not available above</p>
                  </div>
                </div>
                {selectedCity === "other" && (
                  <CheckCircle className="w-6 h-6 text-primary" />
                )}
              </div>
            </Card>
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
