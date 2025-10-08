import { useState, useEffect } from "react"; // <-- Import useEffect
import { useParams, Link, useNavigate } from "react-router-dom";
import Confetti from "react-confetti"; // <-- Import Confetti
import useWindowSize from "react-use/lib/useWindowSize"; // <-- Import useWindowSize
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Smartphone, CheckCircle } from "lucide-react";

const OtpVerification = () => {
  const { brandId, deviceId, cityId } = useParams();
  const deviceType = window.location.pathname.split("/")[1].replace("sell-", "");
  const navigate = useNavigate();
  const { width, height } = useWindowSize(); // <-- Get window dimensions

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // <-- New state for confetti

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      setShowOtpInput(true);
      alert("OTP sent to your phone number!");
    }
  };

  const handleVerifyOtp = () => {
    if (otp === "1234") {
      // demo OTP
      setIsVerified(true);
      setShowConfetti(true); // <-- Trigger confetti on verification
    } else {
      alert("Invalid OTP. Use 1234 for demo.");
    }
  };

  // New effect to hide confetti after a few seconds
  useEffect(() => {
    if (isVerified) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 7000); // Confetti will be visible for 7 seconds

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [isVerified]);

  const handleContinue = () => {
    navigate(
      `/sell-${deviceType}/brand/${brandId}/device/${deviceId}/city/${cityId}/address`
    );
  };

  const backPath = `/sell-${deviceType}/brand/${brandId}/device/${deviceId}/city/${cityId}/questionnaire`;

  if (isVerified) {
    const calculatedPrice = localStorage.getItem("calculatedPrice");
    const deviceName = localStorage.getItem("deviceName");

    return (
      <div className="min-h-screen bg-background">
        {/* Add this line for the confetti effect */}
        {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}
        
        <div className="section-padding">
          <div className="max-w-2xl mx-auto">
            <Card className="card-premium text-center space-y-6">
              <div
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(65, 105, 225, 0.1)" }}
              >
                <CheckCircle
                  className="w-10 h-10"
                  style={{ color: "royalBlue" }}
                />
              </div>

              <h1 className="text-2xl font-bold" style={{ color: "black" }}>
                Congratulations!
              </h1>

              <div>
                <p className="text-lg" style={{ color: "black" }}>
                  Your{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "royalBlue" }}
                  >
                    {deviceName}
                  </span>{" "}
                  is valued at an amazing price of:
                </p>
                <p
                  className="text-4xl font-bold mt-2"
                  style={{ color: "royalBlue" }}
                >
                  ₹{calculatedPrice}
                </p>
              </div>

              <Button
                onClick={handleContinue}
                className="btn-hero px-12 py-4 mt-4"
                style={{ backgroundColor: "royalBlue", color: "black" }}
              >
                Continue
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // ... rest of your component remains the same
  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link to={backPath}>
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                style={{ color: "black" }}
              >
                <ChevronLeft size={20} />
                Back to Questionnaire
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: "rgba(65, 105, 225, 0.1)" }}
            >
              <Smartphone className="w-10 h-10" style={{ color: "royalBlue" }} />
            </div>
            <h1 className="text-3xl font-bold mb-4" style={{ color: "black" }}>
              Verify Your Phone Number
            </h1>
            <p className="text-lg" style={{ color: "black" }}>
              We'll send you an OTP to verify your phone number
            </p>
          </div>

          <Card className="card-premium space-y-6">
            {!showOtpInput ? (
              <>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "black" }}
                  >
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-3 py-2 bg-secondary rounded-lg border border-border">
                      <span style={{ color: "black" }}>+91</span>
                    </div>
                    <Input
                      type="tel"
                      placeholder="Enter 10-digit number"
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(
                          e.target.value.replace(/\D/g, "").slice(0, 10)
                        )
                      }
                      className="flex-1 h-12"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSendOtp}
                  disabled={phoneNumber.length !== 10}
                  className="w-full h-12"
                  style={{ backgroundColor: "royalBlue", color: "black" }}
                >
                  Send OTP
                </Button>
              </>
            ) : (
              <>
                <div className="text-center mb-4">
                  <p className="mb-1" style={{ color: "black" }}>
                    OTP sent to +91 {phoneNumber}
                  </p>
                  <p className="text-sm" style={{ color: "black" }}>
                    Use <strong>1234</strong> for demo
                  </p>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "black" }}
                  >
                    Enter OTP
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter 4-digit OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    className="h-12 text-center text-xl tracking-widest"
                    maxLength={4}
                  />
                </div>

                <Button
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 4}
                  className="w-full h-12"
                  style={{ backgroundColor: "royalBlue", color: "black" }}
                >
                  Verify OTP
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setShowOtpInput(false)}
                  className="w-full"
                  style={{ color: "black" }}
                >
                  Change Phone Number
                </Button>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;