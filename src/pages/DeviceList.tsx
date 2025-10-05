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
        { id: "iphone-air", name: "iPhone Air", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/32e3bec8-29f9.jpg?w=200" },
        { id: "iphone-17-pro-max", name: "iPhone 17 Pro Max", image: "https://s3ng.cashify.in/cashify/product/img/xhdpi/c90a2a0b-fcc8.jpg?w=200" },
        { id: "iphone-17-pro", name: "iPhone 17 Pro", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/eeee646c-8046.jpg?w=200" },
        { id: "iphone-17", name: "iPhone 17", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/ac41123f-6b8f.jpg?w=200" },
        { id: "iphone-16e", name: "iPhone 16E",image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/ed91ebeb-f711.jpg?w=200" },
        { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max",image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/d197ee88-ccff.jpg?w=200" },
        { id: "iphone-16-pro", name: "iPhone 16 Pro", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/d197ee88-ccff.jpg?w=200" },
        { id: "iphone-16", name: "iPhone 16", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/db36cde6-e6e5.jpg?w=200" },
        { id: "iphone-16-plus", name: "iPhone 16 plus", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/db36cde6-e6e5.jpg?w=200" },
        { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/e14bb4d9-988f.jpg?w=200" },
        { id: "iphone-15-pro", name: "iPhone 15 Pro", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/e14bb4d9-988f.jpg?w=200"},
        { id: "iphone-15-plus", name: "iPhone 15 Plus", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/a6db4974-1a86.jpg?w=200" },
        { id: "iphone-15", name: "iPhone 15",image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/e2c7dff8-23a0.jpg?w=200" },
        { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/379a739a-b9df.jpg?w=200" },
        { id: "iphone-14-pro", name: "iPhone 14 Pro", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/379a739a-b9df.jpg?w=200" },
        { id: "iphone-14-plus", name: "iPhone 14 Plus", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/5fc412f4-2fb5.jpg?w=200" },
        { id: "iphone-14", name: "iPhone 14", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/36ea82c3-6d6a.jpg?w=200" },
        { id: "iphone-13-pro-max", name: "iPhone 13 Pro Max", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/d89cfed9-63d2.jpg?w=200" },
        { id: "iphone-13-pro", name: "iPhone 13 Pro", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/d2daf417-65fa.jpg?w=200" },
        { id: "iphone-13", name: "iPhone 13", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/96a67b00-9389.jpg?w=200"},
        { id: "iphone-13-mini", name: "iPhone 13 Mini", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/e6d78dcb-e5c9.jpg?w=200" },
        { id: "apple-iphone-se-2022", name: "Apple iphone SE 2022", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/6d0b888a-5339.jpg?w=200" },
        { id: "iphone-12-pro-max", name: "iPhone 12 Pro Max", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/5b276976-cfb2.jpg?w=200" },
        { id: "iphone-12-pro", name: "iPhone 12 Pro", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/584e10e9-d0df.jpg?w=200" },
        { id: "iphone-12", name: "iPhone 12", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/bf8ed21e-96c9.jpg?w=200"},
        { id: "iphone-12-mini", name: "iPhone 12 Mini", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/1b4543b6-be95.jpg?w=200" },
        { id: "apple-iphone-se-2020", name: "Apple iphone SE 2020", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/2d1db6af-f3e9.jpg?w=200" },
        { id: "iphone-11-pro-max", name: "iPhone 11 Pro Max", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/c88dec9d-73d5.jpg?w=200" },
        { id: "iphone-11-pro", name: "iPhone 11 Pro", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/83ff20f9-b7bc.jpg?w=200" },
        { id: "iphone-11", name: "iPhone 11", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/d8394bf8-e922.jpg?w=200" },
        { id: "iphone-xs-max", name: "iPhone-XS-max ",image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/c617215b-2b94.jpg?w=200" },
        { id: "iphone-xs", name: "iPhone XS",image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/a65b64fe-1d9c.jpg?w=200" },
        { id: "iphone-xr", name: "iPhone XR",image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/55237aff-b449.jpg?w=200" },
        { id: "iphone-x", name: "iPhone X",image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-msmkdhpw-iluq.png?w=200" },
        { id: "iphone-8", name: "iPhone 8", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-wwiz6qsn-dquh.png?w=200" },
        { id: "iphone-8-plus", name: "iPhone 8 plus", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-jcko8mvm-sf7x.png?w=200" },
        { id: "iphone-7", name: "iPhone 7", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-jwihkccb-gqpj.png?w=200" },
        { id: "iphone-7-plus", name: "iPhone 7 plus", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-ujdaoxqa-5pv1.png?w=200" },
        { id: "iphone-6s-plus", name: "iPhone 6S plus", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-73kjnouo-hzvn.png?w=200" },
        { id: "iphone-6s", name: "iPhone 6S", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-oh9xlwt8-yunr.png?w=200" },
        { id: "iphone-6-plus", name: "iPhone 6 plus", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-yicxxl1r-d1ta.png?w=200" },
        { id: "iphone-6", name: "iPhone 6", image:"https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-qp4ba4sq-aeny.png?w=200" },
      ],
      samsung: [
         
      ],
      mi: [
         
      ],
      vivo: [
      ]
        
    },
  };

  // FIX: Removed TypeScript syntax `as keyof ...` which is not valid in standard JSX.
  const devices = (brandId && deviceData.phone[brandId]) || [];
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
              Choose Your
              <span style={{ color: "royalBlue" }}> {getBrandName(brandId || "")}</span> Device
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select your specific device model to get an accurate quote
            </p>
          </div>
          {/* Device Grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {devices.map((device) => (
              <Link key={device.id} to={`/sell-${deviceType}/brand/${brandId}/device/${device.id}/city`}>
                <Card className="card-premium cursor-pointer hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col h-full">
                  {/* Conditionally render image if it exists */}
                  {device.image && (
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={device.image}
                        alt={device.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-2 text-center flex-grow flex flex-col justify-center">
                    <h3 className="font-semibold text-foreground text-sm leading-tight">{device.name}</h3>
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
