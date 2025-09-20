import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const DeviceList = () => {
  const { brandId } = useParams();
  const deviceType = window.location.pathname.split('/')[1].replace('sell-', '');

  const deviceData = {
    phone: {
      apple: [
        { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop" },
        { id: "iphone-15-pro", name: "iPhone 15 Pro", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop" },
        { id: "iphone-15", name: "iPhone 15", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop" },
        { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop" },
        { id: "iphone-14-pro", name: "iPhone 14 Pro", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop" },
        { id: "iphone-14", name: "iPhone 14", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop" },
        { id: "iphone-13", name: "iPhone 13", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop" },
        { id: "iphone-12", name: "iPhone 12", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop" },
        { id: "iphone-11", name: "iPhone 11", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop" },
        { id: "iphone-x", name: "iPhone X", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop" },
        { id: "iphone-xr", name: "iPhone XR", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop" },
        { id: "iphone-8", name: "iPhone 8", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop" },
      ],
      samsung: [
        { id: "galaxy-s24-ultra", name: "Galaxy S24 Ultra", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
        { id: "galaxy-s24-plus", name: "Galaxy S24 Plus", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
        { id: "galaxy-s24", name: "Galaxy S24", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
        { id: "galaxy-s23-ultra", name: "Galaxy S23 Ultra", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
        { id: "galaxy-s22-ultra", name: "Galaxy S22 Ultra", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
        { id: "galaxy-s21", name: "Galaxy S21", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
        { id: "galaxy-note-20", name: "Galaxy Note 20", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
      ],
      mi: [
        { id: "redmi-note-13", name: "Redmi Note 13", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
        { id: "mi-13-pro", name: "Mi 13 Pro", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
        { id: "redmi-12", name: "Redmi 12", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
        { id: "mi-11x", name: "Mi 11X", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
      ],
      vivo: [
        { id: "vivo-v29", name: "Vivo V29", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
        { id: "vivo-y36", name: "Vivo Y36", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
        { id: "vivo-x90", name: "Vivo X90", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
        { id: "vivo-t2", name: "Vivo T2", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
      ],
    },
    laptop: {
      apple: [
        { id: "macbook-pro-16-m3", name: "MacBook Pro 16\" M3", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop" },
        { id: "macbook-pro-14-m3", name: "MacBook Pro 14\" M3", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop" },
        { id: "macbook-air-15", name: "MacBook Air 15\"", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop" },
        { id: "macbook-air-13", name: "MacBook Air 13\"", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop" },
      ],
      dell: [
        { id: "dell-xps-13", name: "Dell XPS 13", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=200&fit=crop" },
        { id: "dell-xps-15", name: "Dell XPS 15", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=200&fit=crop" },
        { id: "dell-inspiron-15", name: "Dell Inspiron 15", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=200&fit=crop" },
        { id: "dell-latitude-14", name: "Dell Latitude 14", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=200&fit=crop" },
      ],
      hp: [
        { id: "hp-spectre-x360", name: "HP Spectre x360", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=200&fit=crop" },
        { id: "hp-pavilion-15", name: "HP Pavilion 15", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=200&fit=crop" },
        { id: "hp-envy-13", name: "HP Envy 13", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=200&fit=crop" },
        { id: "hp-elitebook-840", name: "HP EliteBook 840", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=200&fit=crop" },
      ],
      lenovo: [
        { id: "thinkpad-x1-carbon", name: "ThinkPad X1 Carbon", image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=200&h=200&fit=crop" },
        { id: "legion-5-pro", name: "Legion 5 Pro", image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=200&h=200&fit=crop" },
        { id: "ideapad-slim-3", name: "IdeaPad Slim 3", image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=200&h=200&fit=crop" },
        { id: "yoga-9i", name: "Yoga 9i", image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=200&h=200&fit=crop" },
      ],
      asus: [
        { id: "rog-strix-g15", name: "ROG Strix G15", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop" },
        { id: "zenbook-14", name: "ZenBook 14", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop" },
        { id: "vivobook-15", name: "VivoBook 15", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop" },
      ],
      acer: [
        { id: "predator-helios-300", name: "Predator Helios 300", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=200&fit=crop" },
        { id: "aspire-5", name: "Aspire 5", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=200&fit=crop" },
        { id: "swift-3", name: "Swift 3", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=200&fit=crop" },
      ],
    },
    ipad: {
      apple: [
        { id: "ipad-pro-12", name: "iPad Pro 12.9\"", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop" },
        { id: "ipad-pro-11", name: "iPad Pro 11\"", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop" },
        { id: "ipad-air", name: "iPad Air", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop" },
        { id: "ipad-mini", name: "iPad Mini", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop" },
        { id: "ipad-10th-gen", name: "iPad (10th Gen)", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop" },
      ],
      samsung: [
        { id: "galaxy-tab-s9-ultra", name: "Galaxy Tab S9 Ultra", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop" },
        { id: "galaxy-tab-s9", name: "Galaxy Tab S9", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop" },
        { id: "galaxy-tab-s8", name: "Galaxy Tab S8", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop" },
        { id: "galaxy-tab-a8", name: "Galaxy Tab A8", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop" },
      ],
    },
  };

  const devices = deviceData[deviceType as keyof typeof deviceData]?.[brandId as string] || [];
  const backPath = `/sell-${deviceType}`;

  const getBrandName = (brandId: string) => {
    const brandNames: { [key: string]: string } = {
      apple: "Apple",
      samsung: "Samsung",
      dell: "Dell",
      hp: "HP",
      lenovo: "Lenovo",
      mi: "MI",
      vivo: "Vivo",
    };
    return brandNames[brandId] || brandId;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link to={backPath}>
              <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ChevronLeft size={20} />
                Back to Brand Selection
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Choose Your <span className="text-glow">{getBrandName(brandId || "")}</span> Device
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select your specific device model to get an accurate quote
            </p>
          </div>

          {/* Device Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {devices.map((device) => (
              <Link key={device.id} to={`/sell-${deviceType}/brand/${brandId}/device/${device.id}`}>
                <Card className="card-premium cursor-pointer hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={device.image}
                      alt={device.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-foreground">{device.name}</h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {devices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No devices found for this brand. Please try another brand or use the search function.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceList;