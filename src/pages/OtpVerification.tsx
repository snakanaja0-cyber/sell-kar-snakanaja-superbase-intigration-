import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Smartphone, CheckCircle } from "lucide-react";

const OtpVerification = () => {
  const { brandId, deviceId, cityId } = useParams();
  const deviceType = window.location.pathname.split('/')[1].replace('sell-', '');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      setShowOtpInput(true);
      // Simulate OTP send
      alert("OTP sent to your phone number!");
    }
  };

  const handleVerifyOtp = () => {
    if (otp === "1234") { // Simulate OTP verification
      setIsVerified(true);
      setTimeout(() => {
        // Redirect to address form
        window.location.href = `/sell-${deviceType}/brand/${brandId}/device/${deviceId}/city/${cityId}/address`;
      }, 2000);
    } else {
      alert("Invalid OTP. Use 1234 for demo.");
    }
  };

  const backPath = `/sell-${deviceType}/brand/${brandId}/device/${deviceId}/city/${cityId}/questionnaire`;

  if (isVerified) {
    return (
      <div className="min-h-screen bg-background">
        <div className="section-padding">
          <div className="max-w-2xl mx-auto">
            <Card className="card-premium text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                
                <h1 className="text-3xl font-bold text-foreground">
                  Phone Verified!
                </h1>
                
                <p className="text-lg text-muted-foreground">
                  Redirecting to address form...
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link to={backPath}>
              <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ChevronLeft size={20} />
                Back to Questionnaire
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Smartphone className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              Verify Your Phone Number
            </h1>
            <p className="text-lg text-muted-foreground">
              We'll send you an OTP to verify your phone number
            </p>
          </div>

          <Card className="card-premium">
            <div className="space-y-6">
              {!showOtpInput ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center px-3 py-2 bg-secondary rounded-lg border border-border">
                        <span className="text-foreground">+91</span>
                      </div>
                      <Input
                        type="tel"
                        placeholder="Enter 10-digit number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="flex-1 h-12"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleSendOtp}
                    disabled={phoneNumber.length !== 10}
                    className="btn-hero w-full h-12"
                  >
                    Send OTP
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                      OTP sent to +91 {phoneNumber}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Use <strong>1234</strong> for demo
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Enter OTP
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter 4-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      className="h-12 text-center text-xl tracking-widest"
                      maxLength={4}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleVerifyOtp}
                    disabled={otp.length !== 4}
                    className="btn-hero w-full h-12"
                  >
                    Verify OTP
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowOtpInput(false)}
                    className="w-full"
                  >
                    Change Phone Number
                  </Button>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;