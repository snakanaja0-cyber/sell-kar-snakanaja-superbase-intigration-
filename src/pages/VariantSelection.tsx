import { useState } from "react";

import { useParams, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { ChevronLeft } from "lucide-react";



const VariantSelection = () => {

  const { brandId, deviceId, cityId } = useParams();

  const deviceType = window.location.pathname.split('/')[1].replace('sell-', '');

  const [selectedStorage, setSelectedStorage] = useState("");

  const [selectedCondition, setSelectedCondition] = useState("");

  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);



  const storageOptions = {

    phone: ["64GB", "128GB", "256GB", "512GB", "1TB"],

    laptop: ["256GB SSD", "512GB SSD", "1TB SSD", "2TB SSD"],

    ipad: ["64GB", "128GB", "256GB", "512GB", "1TB", "2TB"],

  };



  const conditions = [

    { id: "new", name: "Brand New (Sealed Box)", multiplier: 0.95 },

    { id: "excellent", name: "Excellent (Like New)", multiplier: 0.85 },

    { id: "good", name: "Good (Minor Scratches)", multiplier: 0.75 },

    { id: "fair", name: "Fair (Visible Wear)", multiplier: 0.60 },

    { id: "damaged", name: "Damaged (Cracks/Issues)", multiplier: 0.40 },

  ];



  const basePrices: { [key: string]: number } = {

    "iphone-15-pro-max": 50000,

    "iphone-15-pro": 45000,

    "iphone-15": 38000,

    "iphone-14-pro-max": 42000,

    "iphone-14-pro": 38000,

    "iphone-14": 32000,

    "iphone-13": 28000,

    "iphone-12": 24000,

    "iphone-11": 20000,

    "iphone-x": 15000,

    "iphone-xr": 18000,

    "iphone-8": 12000,

    "galaxy-s24-ultra": 48000,

    "galaxy-s24-plus": 40000,

    "galaxy-s24": 35000,

    "galaxy-s23-ultra": 38000,

    "galaxy-s22-ultra": 32000,

    "galaxy-s21": 25000,

    "galaxy-note-20": 22000,

    "macbook-pro-16-m3": 120000,

    "macbook-pro-14-m3": 95000,

    "macbook-air-15": 75000,

    "macbook-air-13": 65000,

    "dell-xps-13": 45000,

    "dell-xps-15": 55000,

    "dell-inspiron-15": 30000,

    "dell-latitude-14": 35000,

    "ipad-pro-12": 48000,

    "ipad-pro-11": 38000,

    "ipad-air": 32000,

    "ipad-mini": 25000,

    "ipad-10th-gen": 20000,

    "galaxy-tab-s9-ultra": 42000,

    "galaxy-tab-s9": 35000,

    "galaxy-tab-s8": 28000,

    "galaxy-tab-a8": 18000,

  };



  const calculatePrice = () => {

    if (!selectedStorage || !selectedCondition || !deviceId) return;



    const basePrice = basePrices[deviceId] || 20000;

    const condition = conditions.find(c => c.id === selectedCondition);

    

    if (condition) {

      let storageMultiplier = 1;

      if (selectedStorage.includes("512GB") || selectedStorage.includes("512GB SSD")) storageMultiplier = 1.15;

      if (selectedStorage.includes("1TB") || selectedStorage.includes("1TB SSD")) storageMultiplier = 1.3;

      if (selectedStorage.includes("2TB") || selectedStorage.includes("2TB SSD")) storageMultiplier = 1.5;



      const price = Math.round(basePrice * condition.multiplier * storageMultiplier);

      setEstimatedPrice(price);

    }

  };



  const getDeviceName = (deviceId: string) => {

    const deviceNames: { [key: string]: string } = {

      "iphone-15-pro-max": "iPhone 15 Pro Max",

      "iphone-15-pro": "iPhone 15 Pro",

      "iphone-15": "iPhone 15",

      "iphone-14-pro-max": "iPhone 14 Pro Max",

      "iphone-14-pro": "iPhone 14 Pro",

      "iphone-14": "iPhone 14",

      "iphone-13": "iPhone 13",

      "iphone-12": "iPhone 12",

      "iphone-11": "iPhone 11", 

      "iphone-x": "iPhone X",

      "iphone-xr": "iPhone XR",

      "iphone-8": "iPhone 8",

      "galaxy-s24-ultra": "Galaxy S24 Ultra",

      "galaxy-s24-plus": "Galaxy S24 Plus",

      "galaxy-s24": "Galaxy S24",

      "galaxy-s23-ultra": "Galaxy S23 Ultra",

      "galaxy-s22-ultra": "Galaxy S22 Ultra",

      "galaxy-s21": "Galaxy S21",

      "galaxy-note-20": "Galaxy Note 20",

      "macbook-pro-16-m3": "MacBook Pro 16\" M3",

      "macbook-pro-14-m3": "MacBook Pro 14\" M3",

      "macbook-air-15": "MacBook Air 15\"",

      "macbook-air-13": "MacBook Air 13\"",

      "dell-xps-13": "Dell XPS 13",

      "dell-xps-15": "Dell XPS 15",

      "dell-inspiron-15": "Dell Inspiron 15",

      "dell-latitude-14": "Dell Latitude 14",

      "ipad-pro-12": "iPad Pro 12.9\"",

      "ipad-pro-11": "iPad Pro 11\"",

      "ipad-air": "iPad Air",

      "ipad-mini": "iPad Mini",

      "ipad-10th-gen": "iPad (10th Gen)",

      "galaxy-tab-s9-ultra": "Galaxy Tab S9 Ultra",

      "galaxy-tab-s9": "Galaxy Tab S9",

      "galaxy-tab-s8": "Galaxy Tab S8",

      "galaxy-tab-a8": "Galaxy Tab A8",

    };

    return deviceNames[deviceId] || deviceId;

  };



  const backPath = `/sell-${deviceType}/brand/${brandId}`;

  const storageOpts = storageOptions[deviceType as keyof typeof storageOptions] || [];



  return (

    <div className="min-h-screen bg-background">

      <div className="section-padding">

        <div className="max-w-4xl mx-auto">

          {/* Back Button */}

          <div className="mb-8">

            <Link to={backPath}>

              <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">

                <ChevronLeft size={20} />

                Back to Device Selection

              </Button>

            </Link>

          </div>



          {/* Header */}

          <div className="text-center mb-12 animate-fade-in">

            <h1 className="text-4xl sm:text-5xl font-bold mb-6">

              Choose <span className="text-glow">Variant</span>

            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">

              Select storage and condition for your {getDeviceName(deviceId || "")}

            </p>

          </div>



          <Card className="card-premium max-w-2xl mx-auto">

            <div className="space-y-8">

              {/* Storage Selection */}

              <div>

                <h3 className="text-xl font-semibold mb-4 text-foreground">Storage Capacity</h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                  {storageOpts.map((storage) => (

                    <Button

                      key={storage}

                      variant={selectedStorage === storage ? "default" : "outline"}

                      onClick={() => setSelectedStorage(storage)}

                      className="h-12"

                    >

                      {storage}

                    </Button>

                  ))}

                </div>

              </div>



              {/* Condition Selection */}

              <div>

                <h3 className="text-xl font-semibold mb-4 text-foreground">Device Condition</h3>

                <Select onValueChange={setSelectedCondition}>

                  <SelectTrigger className="h-12 bg-transparent border-border">

                    <SelectValue placeholder="Select device condition" />

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



              {/* Calculate Button */}

              <Button 

                onClick={calculatePrice}

                disabled={!selectedStorage || !selectedCondition}

                className="btn-hero w-full h-12"

              >

                Get Price Estimate

              </Button>



              {/* Price Display */}

              {estimatedPrice && (

                <div className="text-center space-y-6 animate-fade-in pt-6 border-t border-border">

                  <div>

                    <p className="text-lg text-muted-foreground mb-2">

                      Your {getDeviceName(deviceId || "")} can be worth up to

                    </p>

                    <div className="text-5xl font-bold text-glow mb-4">

                      ₹{estimatedPrice.toLocaleString()}

                    </div>

                    <p className="text-sm text-muted-foreground">

                      *Final price subject to physical inspection

                    </p>

                  </div>

                  

                  <div className="space-y-3">

                    <Link to={`/sell-${deviceType}/brand/${brandId}/device/${deviceId}/city/${cityId}/questionnaire`}>

                      <Button className="btn-hero w-full h-12">

                        Get Exact Value

                      </Button>

                    </Link>

                  </div>

                </div>

              )}

            </div>

          </Card>

        </div>

      </div>

    </div>

  );

};



export default VariantSelection
