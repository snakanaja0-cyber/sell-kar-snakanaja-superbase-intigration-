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
        { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/e14bb4d9-988f.jpg?w=200" },
        { id: "iphone-15-pro", name: "iPhone 15 Pro", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/e14bb4d9-988f.jpg?w=200" },
        { id: "iphone-15", name: "iPhone 15", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/e2c7dff8-23a0.jpg?w=200" },
        { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/379a739a-b9df.jpg?w=200" },
        { id: "iphone-14-pro", name: "iPhone 14 Pro", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/379a739a-b9df.jpg?w=200" },
        { id: "iphone-14", name: "iPhone 14", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/379a739a-b9df.jpg?w=200" },
        { id: "iphone-13", name: "iPhone 13", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/96a67b00-9389.jpg?w=200" },
        { id: "iphone-12", name: "iPhone 12", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/bf8ed21e-96c9.jpg?w=200" },
        { id: "iphone-11", name: "iPhone 11", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/d8394bf8-e922.jpg?w=200" },
        { id: "iphone-x", name: "iPhone X", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-msmkdhpw-iluq.png?w=200" },
        { id: "iphone-xr", name: "iPhone XR", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/55237aff-b449.jpg?w=200" },
        { id: "iphone-8", name: "iPhone 8", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-wwiz6qsn-dquh.png?w=200" },
      ],
      samsung: [
        { id: "galaxy-s24-ultra", name: "Galaxy S24 Ultra", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/a69ef28f-fe68.jpg?w=200" },
        { id: "galaxy-s24-plus", name: "Galaxy S24 Plus", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/db22b6b5-ffae.jpg?w=320" },
        { id: "galaxy-s24", name: "Galaxy S24", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/dab0d987-4d22.jpg?w=320" },
        { id: "galaxy-s23-ultra", name: "Galaxy S23 Ultra", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/39e11015-6847.jpg?w=320" },
        { id: "galaxy-s22-ultra", name: "Galaxy S22 Ultra", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
        { id: "galaxy-s21", name: "Galaxy S21", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/f9a86daf-4bdd.jpg?w=320" },
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
    // laptop & ipad data unchanged
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
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-6">
            {devices.map((device) => (
              <Link key={device.id} to={`/sell-${deviceType}/brand/${brandId}/device/${device.id}/city`}>
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
