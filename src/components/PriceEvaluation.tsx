import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

const PriceEvaluation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDeviceType, setSelectedDeviceType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const deviceTypes = [
    {
      id: "phone",
      name: "Sell Phone",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
      description: "Smartphones & Mobile Devices"
    },
    {
      id: "laptop",
      name: "Sell Laptop",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
      description: "Laptops & Computers"
    },
    {
      id: "ipad",
      name: "Sell iPad",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop",
      description: "Tablets & iPads"
    }
  ];

  const brandsByDevice = {
    phone: [
      { id: "apple", name: "Apple" },
      { id: "samsung", name: "Samsung" },
      { id: "google", name: "Google" },
      { id: "oneplus", name: "OnePlus" },
      { id: "xiaomi", name: "Xiaomi" }
    ],
    laptop: [
      { id: "apple", name: "Apple MacBook" },
      { id: "dell", name: "Dell" },
      { id: "hp", name: "HP" },
      { id: "lenovo", name: "Lenovo" },
      { id: "asus", name: "ASUS" }
    ],
    ipad: [
      { id: "apple", name: "Apple iPad" },
      { id: "samsung", name: "Samsung Galaxy Tab" },
      { id: "microsoft", name: "Microsoft Surface" }
    ]
  };

  const modelsByBrand = {
    "apple-phone": [
      { id: "iphone-15-pro", name: "iPhone 15 Pro", basePrice: 45000 },
      { id: "iphone-15", name: "iPhone 15", basePrice: 38000 },
      { id: "iphone-14-pro", name: "iPhone 14 Pro", basePrice: 35000 },
      { id: "iphone-14", name: "iPhone 14", basePrice: 28000 },
      { id: "iphone-13", name: "iPhone 13", basePrice: 25000 },
    ],
    "samsung-phone": [
      { id: "samsung-s24-ultra", name: "Samsung Galaxy S24 Ultra", basePrice: 42000 },
      { id: "samsung-s24", name: "Samsung Galaxy S24", basePrice: 35000 },
      { id: "samsung-s23-ultra", name: "Samsung Galaxy S23 Ultra", basePrice: 32000 },
      { id: "samsung-s21", name: "Samsung Galaxy S21", basePrice: 22000 },
    ],
    "google-phone": [
      { id: "pixel-8-pro", name: "Google Pixel 8 Pro", basePrice: 32000 },
      { id: "pixel-8", name: "Google Pixel 8", basePrice: 28000 },
      { id: "pixel-7", name: "Google Pixel 7", basePrice: 24000 },
    ],
    "oneplus-phone": [
      { id: "oneplus-12", name: "OnePlus 12", basePrice: 28000 },
      { id: "oneplus-11", name: "OnePlus 11", basePrice: 24000 },
      { id: "oneplus-10-pro", name: "OnePlus 10 Pro", basePrice: 20000 },
    ],
    "xiaomi-phone": [
      { id: "xiaomi-14", name: "Xiaomi 14", basePrice: 26000 },
      { id: "xiaomi-13", name: "Xiaomi 13", basePrice: 22000 },
      { id: "redmi-note-13", name: "Redmi Note 13", basePrice: 15000 },
    ],
    "apple-laptop": [
      { id: "macbook-pro-16", name: "MacBook Pro 16\"", basePrice: 85000 },
      { id: "macbook-pro-14", name: "MacBook Pro 14\"", basePrice: 75000 },
      { id: "macbook-air-15", name: "MacBook Air 15\"", basePrice: 65000 },
      { id: "macbook-air-13", name: "MacBook Air 13\"", basePrice: 55000 },
    ],
    "dell-laptop": [
      { id: "dell-xps-13", name: "Dell XPS 13", basePrice: 45000 },
      { id: "dell-inspiron-15", name: "Dell Inspiron 15", basePrice: 35000 },
      { id: "dell-latitude-14", name: "Dell Latitude 14", basePrice: 40000 },
    ],
    "hp-laptop": [
      { id: "hp-spectre-x360", name: "HP Spectre x360", basePrice: 50000 },
      { id: "hp-pavilion-15", name: "HP Pavilion 15", basePrice: 32000 },
      { id: "hp-envy-13", name: "HP Envy 13", basePrice: 38000 },
    ],
    "lenovo-laptop": [
      { id: "thinkpad-x1", name: "ThinkPad X1 Carbon", basePrice: 55000 },
      { id: "ideapad-slim-5", name: "IdeaPad Slim 5", basePrice: 30000 },
      { id: "yoga-7i", name: "Yoga 7i", basePrice: 42000 },
    ],
    "asus-laptop": [
      { id: "zenbook-14", name: "ZenBook 14", basePrice: 40000 },
      { id: "vivobook-15", name: "VivoBook 15", basePrice: 28000 },
      { id: "rog-zephyrus", name: "ROG Zephyrus G14", basePrice: 65000 },
    ],
    "apple-ipad": [
      { id: "ipad-pro-12", name: "iPad Pro 12.9\"", basePrice: 48000 },
      { id: "ipad-pro-11", name: "iPad Pro 11\"", basePrice: 38000 },
      { id: "ipad-air", name: "iPad Air", basePrice: 32000 },
      { id: "ipad-mini", name: "iPad Mini", basePrice: 25000 },
    ],
    "samsung-ipad": [
      { id: "galaxy-tab-s9", name: "Galaxy Tab S9", basePrice: 35000 },
      { id: "galaxy-tab-s8", name: "Galaxy Tab S8", basePrice: 28000 },
      { id: "galaxy-tab-a8", name: "Galaxy Tab A8", basePrice: 18000 },
    ],
    "microsoft-ipad": [
      { id: "surface-pro-9", name: "Surface Pro 9", basePrice: 45000 },
      { id: "surface-go-3", name: "Surface Go 3", basePrice: 25000 },
    ]
  };

  const conditions = [
    { id: "new", name: "Brand New", multiplier: 0.95 },
    { id: "excellent", name: "Excellent Condition", multiplier: 0.85 },
    { id: "good", name: "Good Condition", multiplier: 0.75 },
    { id: "fair", name: "Fair Condition", multiplier: 0.60 },
    { id: "damaged", name: "Damaged", multiplier: 0.40 },
  ];

  const handleDeviceTypeSelect = (deviceType: string) => {
    setSelectedDeviceType(deviceType);
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedCondition("");
    setEstimatedPrice(null);
    setCurrentStep(2);
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel("");
    setSelectedCondition("");
    setEstimatedPrice(null);
    setCurrentStep(3);
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    setSelectedCondition("");
    setEstimatedPrice(null);
    setCurrentStep(4);
  };

  const calculatePrice = () => {
    const brandKey = `${selectedBrand}-${selectedDeviceType}`;
    const models = modelsByBrand[brandKey as keyof typeof modelsByBrand] || [];
    const model = models.find(m => m.id === selectedModel);
    const condition = conditions.find(c => c.id === selectedCondition);
    
    if (model && condition) {
      const price = Math.round(model.basePrice * condition.multiplier);
      setEstimatedPrice(price);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      if (currentStep === 2) {
        setSelectedDeviceType("");
        setSelectedBrand("");
        setSelectedModel("");
        setSelectedCondition("");
        setEstimatedPrice(null);
      } else if (currentStep === 3) {
        setSelectedBrand("");
        setSelectedModel("");
        setSelectedCondition("");
        setEstimatedPrice(null);
      } else if (currentStep === 4) {
        setSelectedModel("");
        setSelectedCondition("");
        setEstimatedPrice(null);
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-center text-foreground mb-8">
              What would you like to sell?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deviceTypes.map((device) => (
                <Card
                  key={device.id}
                  className="card-premium cursor-pointer group hover:scale-105 transition-all duration-300"
                  onClick={() => handleDeviceTypeSelect(device.id)}
                >
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img
                      src={device.image}
                      alt={device.name}
                      className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-foreground mb-2">{device.name}</h4>
                    <p className="text-muted-foreground text-sm">{device.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        const brands = brandsByDevice[selectedDeviceType as keyof typeof brandsByDevice] || [];
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-center text-foreground mb-6">
              Select Brand
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {brands.map((brand) => (
                <Button
                  key={brand.id}
                  variant="outline"
                  className="h-16 text-lg font-medium border-2 hover:border-primary hover:text-primary transition-all duration-300"
                  onClick={() => handleBrandSelect(brand.id)}
                >
                  {brand.name}
                </Button>
              ))}
            </div>
          </div>
        );

      case 3:
        const brandKey = `${selectedBrand}-${selectedDeviceType}`;
        const models = modelsByBrand[brandKey as keyof typeof modelsByBrand] || [];
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-center text-foreground mb-6">
              Select Model
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {models.map((model) => (
                <Button
                  key={model.id}
                  variant="outline"
                  className="h-16 text-left justify-start border-2 hover:border-primary hover:text-primary transition-all duration-300"
                  onClick={() => handleModelSelect(model.id)}
                >
                  <div>
                    <div className="font-medium">{model.name}</div>
                    <div className="text-sm text-muted-foreground">Base Price: ₹{model.basePrice.toLocaleString()}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-center text-foreground mb-6">
              Device Condition
            </h3>
            <div className="form-premium">
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
              disabled={!selectedCondition}
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
        );

      default:
        return null;
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

        <div className="card-premium max-w-3xl mx-auto">
          {/* Step Navigation */}
          {currentStep > 1 && (
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                onClick={goBack}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft size={20} />
                Back
              </Button>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    step <= currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          {renderStepContent()}
        </div>
      </div>
    </section>
  );
};

export default PriceEvaluation;