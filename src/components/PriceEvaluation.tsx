import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const PriceEvaluation = () => {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const devices = [
    { id: "iphone-15-pro", name: "iPhone 15 Pro", basePrice: 45000 },
    { id: "iphone-15", name: "iPhone 15", basePrice: 38000 },
    { id: "samsung-s24-ultra", name: "Samsung Galaxy S24 Ultra", basePrice: 42000 },
    { id: "samsung-s24", name: "Samsung Galaxy S24", basePrice: 35000 },
    { id: "pixel-8-pro", name: "Google Pixel 8 Pro", basePrice: 32000 },
    { id: "oneplus-12", name: "OnePlus 12", basePrice: 28000 },
  ];

  const conditions = [
    { id: "new", name: "Brand New", multiplier: 0.95 },
    { id: "excellent", name: "Excellent Condition", multiplier: 0.85 },
    { id: "good", name: "Good Condition", multiplier: 0.75 },
    { id: "fair", name: "Fair Condition", multiplier: 0.60 },
    { id: "damaged", name: "Damaged", multiplier: 0.40 },
  ];

  const calculatePrice = () => {
    const device = devices.find(d => d.id === selectedDevice);
    const condition = conditions.find(c => c.id === selectedCondition);
    
    if (device && condition) {
      const price = Math.round(device.basePrice * condition.multiplier);
      setEstimatedPrice(price);
    }
  };

  return (
    <section id="price-evaluation" className="section-padding bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-scale">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-glow">Instant Price</span> Evaluation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get an accurate quote for your device in seconds. Our AI-powered evaluation system 
            ensures you get the best price for your gadgets.
          </p>
        </div>

        <div className="card-premium max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="form-premium">
              <label className="block text-sm font-medium text-foreground mb-2 px-3 pt-2">
                Select Your Device
              </label>
              <Select onValueChange={setSelectedDevice}>
                <SelectTrigger className="bg-transparent border-none text-foreground">
                  <SelectValue placeholder="Choose your device model" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {devices.map((device) => (
                    <SelectItem key={device.id} value={device.id} className="text-foreground hover:bg-accent">
                      {device.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="form-premium">
              <label className="block text-sm font-medium text-foreground mb-2 px-3 pt-2">
                Device Condition
              </label>
              <Select onValueChange={setSelectedCondition}>
                <SelectTrigger className="bg-transparent border-none text-foreground">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {conditions.map((condition) => (
                    <SelectItem key={condition.id} value={condition.id} className="text-foreground hover:bg-accent">
                      {condition.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={calculatePrice}
              disabled={!selectedDevice || !selectedCondition}
              className="btn-hero w-full"
            >
              Calculate Instant Price
            </Button>

            {estimatedPrice && (
              <Card className="card-premium text-center animate-fade-in-scale">
                <h3 className="text-2xl font-semibold text-foreground mb-2">Estimated Price</h3>
                <div className="text-5xl font-bold text-glow mb-4">
                  ₹{estimatedPrice.toLocaleString()}
                </div>
                <p className="text-muted-foreground mb-6">
                  This is an estimated value. Final price may vary based on detailed inspection.
                </p>
                <div className="space-y-3">
                  <Button className="btn-hero w-full">
                    Schedule Free Pickup
                  </Button>
                  <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-gold-foreground">
                    Get Detailed Quote
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceEvaluation;