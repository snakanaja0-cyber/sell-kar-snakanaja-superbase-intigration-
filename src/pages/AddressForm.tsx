import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, MapPin } from "lucide-react";

const AddressForm = () => {
  const { deviceType, brandId, deviceId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.address && formData.city && formData.zipCode) {
      // Redirect to pickup scheduler
      window.location.href = `/sell-${deviceType}/brand/${brandId}/device/${deviceId}/pickup`;
    }
  };

  const backPath = `/sell-${deviceType}/brand/${brandId}/device/${deviceId}/otp`;

  const isFormValid = formData.name && formData.address && formData.city && formData.zipCode;

  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link to={backPath}>
              <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ChevronLeft size={20} />
                Back to Phone Verification
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              Pickup Address
            </h1>
            <p className="text-lg text-muted-foreground">
              Where should we pick up your device?
            </p>
          </div>

          <Card className="card-premium">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Address *
                </label>
                <Textarea
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="min-h-[100px] resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    City *
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Zip Code *
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter zip code"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="h-12"
                    required
                  />
                </div>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Our executive will visit during your selected time slot for device pickup and payment.
                </p>
              </div>

              <Button 
                type="submit"
                disabled={!isFormValid}
                className="btn-hero w-full h-12"
              >
                Continue to Pickup Schedule
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;