import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, MapPin, CheckCircle } from "lucide-react";
import { citiesApi } from "@/lib/api";
import { toast } from "sonner";
import type { Database } from "@/lib/database.types";

type City = Database['public']['Tables']['cities']['Row'];

const CitySelection = () => {
  const { brandId, deviceId } = useParams();
  const navigate = useNavigate();
  const deviceType = window.location.pathname.split("/")[1].replace("sell-", "");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await citiesApi.getAll();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
        toast.error('Failed to load cities');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleCitySelect = (cityId: string) => {
    setSelectedCity(cityId);
    localStorage.setItem('selectedCityId', cityId);

    const selectedCityData = cities.find(c => c.id === cityId);
    if (selectedCityData) {
      localStorage.setItem('selectedCityName', selectedCityData.name);
    }

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
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Loading cities...</p>
            </div>
          ) : (
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
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground h-12 flex items-center">
                    {city.name.toUpperCase()}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CitySelection;
