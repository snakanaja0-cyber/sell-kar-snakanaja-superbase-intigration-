import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, MapPin, CheckCircle } from "lucide-react";

const CitySelection = () => {
  const { brandId, deviceId } = useParams();
  const navigate = useNavigate();
  const deviceType = window.location.pathname.split("/")[1].replace("sell-", "");
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
    setSelectedCity(cityId);
    if (deviceType && brandId && deviceId) {
      navigate(
        `/sell-${deviceType}/brand/${brandId}/device/${deviceId}/city/${cityId}/variant`
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Select Your <span style={{ color: "#4169E1" }}>City</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your city to get the best price and pickup service
            </p>
          </div>

          {/* Cities Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            {cities.map((city) => (
              <Card
                key={city.id}
                onClick={() => handleCitySelect(city.id)}
                className={`card-premium cursor-pointer transition-all duration-300 p-4 relative h-full ${ // <-- Added relative and h-full
                  selectedCity === city.id
                    ? "ring-2 ring-primary bg-primary/5"
                    : "hover:scale-105"
                }`}
              >
                {/* --- MODIFIED INTERNAL LAYOUT --- */}
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <img
                      src={city.iconUrl}
                      alt={city.name}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-foreground h-12 flex items-center">
                    {city.name}
                  </h3>
                </div>
                {selectedCity === city.id && (
                  <CheckCircle className="w-6 h-6 text-primary absolute top-2 right-2" /> // <-- Positioned checkmark
                )}
              </Card>
            ))}

            {/* --- My City Not Listed Card --- */}
            <Card
              onClick={() => handleCitySelect("other")}
              className={`card-premium cursor-pointer transition-all duration-300 p-4 border-dashed relative h-full ${ // <-- Added relative and h-full
                selectedCity === "other"
                  ? "ring-2 ring-primary bg-primary/5"
                  : "hover:scale-105"
              }`}
            >
              {/* --- MODIFIED INTERNAL LAYOUT --- */}
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="h-12 flex flex-col justify-center">
                  <h3 className="text-base font-semibold text-foreground">
                    My city is not listed
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Select this if not available
                  </p>
                </div>
              </div>
              {selectedCity === "other" && (
                <CheckCircle className="w-6 h-6 text-primary absolute top-2 right-2" /> // <-- Positioned checkmark
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitySelection;
