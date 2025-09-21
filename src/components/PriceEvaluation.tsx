import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const PriceEvaluation = () => {
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
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-center text-foreground mb-8">
              What would you like to sell?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deviceTypes.map((device) => (
                <Link key={device.id} to={`/sell-${device.id}`}>
                  <Card className="card-premium cursor-pointer group hover:scale-105 transition-all duration-300">
                    <div className="relative overflow-hidden rounded-xl mb-4">
                       <img
                        src={device.image}
                        alt={`${device.name} - ${device.description} - Get instant quotes for your old ${device.id}`}
                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-xl font-semibold text-foreground mb-2">{device.name}</h4>
                      <p className="text-muted-foreground text-sm">{device.description}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceEvaluation;