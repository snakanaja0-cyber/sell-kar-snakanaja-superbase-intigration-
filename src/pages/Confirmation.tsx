import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Home, Package } from "lucide-react";

const Confirmation = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding">
        <div className="max-w-2xl mx-auto">
          <Card className="card-premium text-center">
            <div className="space-y-8">
              <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(65, 105, 225, 0.1)' }}>
                <CheckCircle className="w-12 h-12" style={{ color: 'royalBlue' }} />
              </div>
              
              <div>
                <h1 className="text-4xl font-bold mb-4" style={{ color: 'black' }}>
                  Thank You!
                </h1>
                <p className="text-xl mb-6" style={{ color: 'black' }}>
                  Your pickup has been scheduled successfully
                </p>
                <div className="bg-secondary/50 rounded-lg p-6 text-left">
                  <h3 className="font-semibold mb-3" style={{ color: 'black' }}>What happens next?</h3>
                  <ul className="space-y-2" style={{ color: 'black' }}>
                    <li>• Our executive will contact you before arrival</li>
                    <li>• Device inspection will be done at your location</li>
                    <li>• Payment will be made instantly after inspection</li>
                    <li>• You'll receive an SMS confirmation</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(65, 105, 225, 0.1)' }}>
                <p className="text-sm" style={{ color: 'black' }}>
                  <strong>Order ID:</strong> SCR{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>

              <div className="space-y-3">
                <Link to="/">
                  <Button className="w-full h-12 flex items-center justify-center gap-2" style={{ backgroundColor: 'royalBlue', color: 'white' }}>
                    <Home size={20} />
                    Back to Home
                  </Button>
                </Link>
                <Link to="/track-order">
                  <Button variant="outline" className="w-full h-12 flex items-center justify-center gap-2 hover:text-white" style={{ borderColor: 'royalBlue', color: 'royalBlue' }}>
                    <Package size={20} />
                    Track Order
                  </Button>
                </Link>
              </div>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm" style={{ color: 'black' }}>
                  Need help? Contact us at <strong>support@sellcar.com</strong> or call <strong>1800-123-4567</strong>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
