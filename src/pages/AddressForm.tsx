import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, MapPin } from "lucide-react";

const AddressForm = () => {
  const { brandId, deviceId, cityId } = useParams();
  const deviceType = window.location.pathname.split('/')[1].replace('sell-', '');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [emailError, setEmailError] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear email error when user starts typing
    if (field === 'email' && emailError) {
      setEmailError("");
    }
  };

  const validateEmail = (email: string) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const handleEmailBlur = () => {
    if (formData.email && !validateEmail(formData.email)) {
      setEmailError("Please enter a valid Gmail address");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email before submission
    if (formData.email && !validateEmail(formData.email)) {
      setEmailError("Please enter a valid Gmail address");
      return;
    }

    if (formData.name && formData.email && formData.address && formData.city && formData.zipCode) {
      // Redirect to pickup scheduler
      window.location.href = `/sell-${deviceType}/brand/${brandId}/device/${deviceId}/city/${cityId}/pickup`;
    }
  };

  const backPath = `/sell-${deviceType}/brand/${brandId}/device/${deviceId}/city/${cityId}/otp`;

  const isFormValid = formData.name && formData.email && formData.address && formData.city && formData.zipCode && !emailError;

  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link to={backPath}>
              <Button variant="ghost" className="flex items-center gap-2" style={{ color: 'black' }}>
                <ChevronLeft size={20} />
                Back to Phone Verification
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(65, 105, 225, 0.1)' }}>
              <MapPin className="w-10 h-10" style={{ color: 'royalBlue' }} />
            </div>
            <h1 className="text-3xl font-bold mb-4" style={{ color: 'black' }}>
              Pickup Address
            </h1>
            <p className="text-lg" style={{ color: 'black' }}>
              Where should we pick up your device?
            </p>
          </div>

          <Card className="card-premium">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'black' }}>
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
                <label className="block text-sm font-medium mb-2" style={{ color: 'black' }}>
                  Email Address *
                </label>
                <Input
                  type="email"
                  placeholder="Enter your Gmail address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={handleEmailBlur}
                  className={`h-12 ${emailError ? 'border-red-500' : ''}`}
                  required
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'black' }}>
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
                  <label className="block text-sm font-medium mb-2" style={{ color: 'black' }}>
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
                  <label className="block text-sm font-medium mb-2" style={{ color: 'black' }}>
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
                <p className="text-sm" style={{ color: 'black' }}>
                  <strong>Note:</strong> Our executive will visit during your selected time slot for device pickup and payment.
                </p>
              </div>

              <Button 
                type="submit"
                disabled={!isFormValid}
                className="w-full h-12"
                style={{ backgroundColor: 'royalBlue', color: 'white' }}
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
