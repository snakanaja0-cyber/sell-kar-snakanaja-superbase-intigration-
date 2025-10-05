import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, MapPin, CheckCircle } from "lucide-react";

const CitySelection = () => {
  const { brandId, deviceId } = useParams();
  const navigate = useNavigate();
  // Simplified deviceType extraction: Assumes path structure is /sell-[deviceType]/brand/...
  const deviceType = window.location.pathname.split('/')[1].replace('sell-', '');
  const [selectedCity, setSelectedCity] = useState<string>("");

  const cities = [
    { id: "bangalore", name: "BANGALORE", iconUrl: "https://cashforphone.in/assets/images/city/BANGALORE.png" },
    { id: "delhi", name: "DELHI", iconUrl: "https://cashforphone.in/assets/images/city/DELHI%20NCR.png" },
    { id: "mumbai", name: "MUMBAI", iconUrl: "https://cashforphone.in/assets/images/city/MUMBAI.png" },
    { id: "chennai", name: "CHENNAI", iconUrl: "https://cashforphone.in/assets/images/city/CHENNAI.png" },
    { id: "hyderabad", name: "HYDERABAD", iconUrl: "https://cashforphone.in/assets/images/city/HYDERABAD.png" },
    { id: "thane", name: "THANE", iconUrl: "https://cashforphone.in/assets/images/city/THANE.png" },
    { id: "jaipur", name: "JAIPUR", iconUrl: "https://cashforphone.in/assets/images/city/JAIPUR.png" },
    { id: "pune", name: "PUNE", iconUrl: "https://cashforphone.in/assets/images/city/PUNE.png" },
    { id: "agra", name: "AGRA", iconUrl: "https://cashforphone.in/assets/images/city/AGRA.png" },
    { id: "kolkata", name: "KOLKATA", iconUrl: "https://cashforphone.in/assets/images/city/KOLKATA.png" },
    { id: "gorakhpur", name: "GORAKHPUR", iconUrl: "https://cashforphone.in/assets/images/city/GORAKHPUR.png" },
    { id: "mathura", name: "MATHURA", iconUrl: "https://cashforphone.in/assets/images/city/MATHURA.png" },
    { id: "banaras", name: "BANARAS", iconUrl: "https://cashforphone.in/assets/images/city/BANARAS.png" },
    { id: "lucknow", name: "LUCKNOW", iconUrl: "https://cashforphone.in/assets/images/city/LUCKNOW.png" },
    { id: "kanpur", name: "KANPUR", iconUrl: "https://cashforphone.in/assets/images/city/KANPUR.png" },
    { id: "chandigarh", name: "CHANDIGARH", iconUrl: "https://cashforphone.in/assets/images/city/CHANDIGARH.png" },
    { id: "amritsar", name: "AMRITSAR", iconUrl: "https://cashforphone.in/assets/images/city/AMRITSAR.png" },
    { id: "ludhiana", name: "LUDHIANA", iconUrl: "https://cashforphone.in/assets/images/city/LUDHIANA.png" },
    { id: "patna", name: "PATNA", iconUrl: "https://cashforphone.in/assets/images/city/PATNA.png" },
  ];

  const handleCitySelect = (cityId: string) => {
    // 1. Set the selected city
    setSelectedCity(cityId);

    // 2. Perform the navigation immediately
    if (deviceType && brandId && deviceId) {
      // The navigation is deferred slightly to allow the state update (setSelectedCity) to visually happen 
      // before the redirect, though in this case, it might happen too fast to notice.
      // A direct call is usually fine for immediate redirects:
      navigate(`/sell-${deviceType}/brand/${brandId}/device/${deviceId}/city/${cityId}/variant`);
    }
  };

  // The handleContinue function is now redundant and can be removed, 
  // as is the continue button itself.
  // const handleContinue = () => { ... }; 

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
            {cities.map((city) => {
              return (
                <Card
                  key={city.id}
                  // The onClick handler now handles the selection AND navigation
                  onClick={() => handleCitySelect(city.id)}
                  className={`card-premium cursor-pointer transition-all duration-300 p-6 ${
                    selectedCity === city.id
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:scale-105'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <img src={city.iconUrl} alt={city.name} className="w-6 h-6 object-contain" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{city.name}</h3>
                      </div>
                    </div>
                    {selectedCity === city.id && (
                      <CheckCircle className="w-6 h-6 text-primary" />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* My City Not Listed */}
          <div className="mb-8">
            <Card
              // The onClick handler now handles the selection AND navigation
              onClick={() => handleCitySelect("other")}
              className={`card-premium cursor-pointer transition-all duration-300 p-6 border-dashed ${
                selectedCity === "other"
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'hover:scale-105'
              }`}
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

          {/* Continue Button has been removed */}
        </div>
      </div>
    </div>
  );
};

export default CitySelection;