import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

// 1. IMPORT LOCAL IMAGES FROM ASSETS FOLDER
import phoneImage from "../assets/ph.jpg";
import laptopImage from "../assets/laptopppp.jpg";
import ipadImage from "../assets/ipaddd.jpg";

const PriceEvaluation = () => {
  // Define a very dark color for text (representing black)
  const darkText = "text-gray-900";
  // Define the royal blue for the hover effect
  const royalBlueRing = "hover:ring-2 hover:ring-blue-700";

  const deviceTypes = [
    {
      id: "phone",
      name: "Sell Phone",
      image: phoneImage,
      description: "Smartphones & Mobile Devices",
    },
    {
      id: "laptop",
      name: "Sell Laptop",
      image: laptopImage,
      description: "Laptops & Computers",
    },
    {
      id: "ipad",
      name: "Sell iPad",
      image: ipadImage,
      description: "Tablets & iPads",
    },
  ];

  return (
    <section id="price-evaluation" className="section-padding bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-scale">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-blue-700">Instant Price</span> Evaluation
          </h2>
          {/* Text changed to darkText */}
          <p className={`text-xl ${darkText} max-w-2xl mx-auto`}>
            Get an accurate quote for your device in seconds. Our AI-powered
            evaluation system ensures you get the best price for your gadgets.
          </p>
        </div>

        <div className="card-premium max-w-3xl mx-auto">
          <div className="space-y-8">
            {/* Text changed to darkText */}
            <h3
              className={`text-2xl font-semibold text-center ${darkText} mb-8`}
            >
              What would you like to sell?
            </h3>
            {/* MODIFICATION 1: Changed grid-cols-1 to grid-cols-2 for mobile layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {deviceTypes.map((device, index) => {
                // Check if the current card is the last one
                const isLastItem = index === deviceTypes.length - 1;

                return (
                  <Link
                    key={device.id}
                    to={`/sell-${device.id}`}
                    // MODIFICATION 2: Add conditional classes for the last item
                    className={
                      isLastItem
                        ? "col-span-2 flex justify-center md:col-span-1 md:flex-none"
                        : ""
                    }
                  >
                    <Card
                      // MODIFICATION 3: Added width constraint for the centered card
                      className={`card-premium cursor-pointer group hover:scale-105 transition-all duration-300 ${royalBlueRing} ${isLastItem ? "w-full max-w-[15rem]" : ""}`}
                    >
                      <div className="relative overflow-hidden rounded-xl mb-4">
                        <img
                          src={device.image}
                          alt={`${device.name} - ${device.description} - Get instant quotes for your old ${device.id}`}
                          className="w-full h-40 object-contain object-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-semibold text-foreground mb-2">
                          {device.name}
                        </h4>
                        {/* Text changed to darkText */}
                        <p className={`text-sm ${darkText}`}>
                          {device.description}
                        </p>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceEvaluation;