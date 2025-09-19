import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Home, Search, Package, CheckCircle, Clock, Truck } from "lucide-react";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [orderFound, setOrderFound] = useState(false);

  const handleTrack = () => {
    if (orderId.length > 5) {
      setOrderFound(true);
    }
  };

  const orderSteps = [
    { 
      icon: CheckCircle, 
      title: "Order Confirmed", 
      description: "Your pickup request has been received",
      completed: true,
      timestamp: "Today, 2:30 PM"
    },
    { 
      icon: Clock, 
      title: "Pickup Scheduled", 
      description: "Executive assigned for pickup",
      completed: true,
      timestamp: "Today, 2:45 PM"
    },
    { 
      icon: Truck, 
      title: "On the Way", 
      description: "Executive is heading to your location",
      completed: false,
      timestamp: "Tomorrow, 10:00 AM"
    },
    { 
      icon: Package, 
      title: "Pickup Complete", 
      description: "Device collected and payment processed",
      completed: false,
      timestamp: "Pending"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding">
        <div className="max-w-2xl mx-auto">
          {/* Home Button */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Home size={20} />
                Home
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Package className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              Track Your Order
            </h1>
            <p className="text-lg text-muted-foreground">
              Enter your order ID to track pickup status
            </p>
          </div>

          {!orderFound ? (
            <Card className="card-premium">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Order ID
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter your order ID (e.g., SCR12345)"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                      className="flex-1 h-12"
                    />
                    <Button 
                      onClick={handleTrack}
                      disabled={orderId.length < 6}
                      className="h-12 px-6"
                    >
                      <Search size={20} />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-secondary/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    Your order ID was sent via SMS after scheduling pickup. It starts with "SCR" followed by numbers.
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Order Info */}
              <Card className="card-premium">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Order #{orderId}</h3>
                      <p className="text-muted-foreground">iPhone 12 Pro - 128GB</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-glow">₹25,000</p>
                      <p className="text-sm text-muted-foreground">Estimated Value</p>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Pickup Details</h4>
                    <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM - 01:00 PM</p>
                    <p className="text-sm text-muted-foreground">John Doe, 123 Main Street, Mumbai</p>
                  </div>
                </div>
              </Card>

              {/* Order Timeline */}
              <Card className="card-premium">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground">Order Status</h3>
                  
                  <div className="space-y-6">
                    {orderSteps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-muted-foreground'
                        }`}>
                          <step.icon size={20} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={`font-semibold ${
                              step.completed ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {step.title}
                            </h4>
                            <span className="text-sm text-muted-foreground">
                              {step.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Contact Support */}
              <Card className="card-premium">
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Need Help?</h3>
                  <p className="text-muted-foreground">
                    Contact our support team for any queries about your order
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Call Support
                    </Button>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Chat with Us
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;