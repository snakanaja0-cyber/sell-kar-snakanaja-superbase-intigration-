import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, CheckCircle, XCircle } from "lucide-react";

const Questionnaire = () => {
  const { deviceType, brandId, deviceId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);

  const questions = [
    "Can you make calls?",
    "Is your device working properly?",
    "Any scratches or cracks?",
    "Battery health above 80%?",
  ];

  const basePrices: { [key: string]: number } = {
    "iphone-15-pro-max": 50000,
    "iphone-15-pro": 45000,
    "iphone-15": 38000,
    "iphone-14-pro-max": 42000,
    "iphone-14-pro": 38000,
    "iphone-14": 32000,
    "iphone-13": 28000,
    "iphone-12": 24000,
    "iphone-11": 20000,
    "iphone-x": 15000,
    "iphone-xr": 18000,
    "iphone-8": 12000,
    "galaxy-s24-ultra": 48000,
    "galaxy-s24-plus": 40000,
    "galaxy-s24": 35000,
    "galaxy-s23-ultra": 38000,
    "galaxy-s22-ultra": 32000,
    "galaxy-s21": 25000,
    "galaxy-note-20": 22000,
    "macbook-pro-16-m3": 120000,
    "macbook-pro-14-m3": 95000,
    "macbook-air-15": 75000,
    "macbook-air-13": 65000,
    "dell-xps-13": 45000,
    "dell-xps-15": 55000,
    "dell-inspiron-15": 30000,
    "dell-latitude-14": 35000,
    "ipad-pro-12": 48000,
    "ipad-pro-11": 38000,
    "ipad-air": 32000,
    "ipad-mini": 25000,
    "ipad-10th-gen": 20000,
    "galaxy-tab-s9-ultra": 42000,
    "galaxy-tab-s9": 35000,
    "galaxy-tab-s8": 28000,
    "galaxy-tab-a8": 18000,
  };

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final price based on answers
      const basePrice = basePrices[deviceId || ""] || 20000;
      let priceMultiplier = 0.9; // Start with 90% of base price
      
      // Reduce price for negative answers
      newAnswers.forEach((ans, index) => {
        if (!ans) {
          if (index === 0 || index === 1) priceMultiplier -= 0.2; // Major issues
          if (index === 2) priceMultiplier -= 0.1; // Cosmetic issues
          if (index === 3) priceMultiplier -= 0.05; // Battery issues
        }
      });

      const calculatedPrice = Math.round(basePrice * Math.max(priceMultiplier, 0.3));
      setFinalPrice(calculatedPrice);
      setShowResult(true);
    }
  };

  const backPath = `/sell-${deviceType}/brand/${brandId}/device/${deviceId}`;

  const getDeviceName = (deviceId: string) => {
    const deviceNames: { [key: string]: string } = {
      "iphone-15-pro-max": "iPhone 15 Pro Max",
      "iphone-15-pro": "iPhone 15 Pro",
      "iphone-15": "iPhone 15",
      "iphone-14-pro-max": "iPhone 14 Pro Max",
      "iphone-14-pro": "iPhone 14 Pro",
      "iphone-14": "iPhone 14",
      "iphone-13": "iPhone 13",
      "iphone-12": "iPhone 12",
      "iphone-11": "iPhone 11",
      "iphone-x": "iPhone X",
      "iphone-xr": "iPhone XR",
      "iphone-8": "iPhone 8",
      "galaxy-s24-ultra": "Galaxy S24 Ultra",
      "galaxy-s24-plus": "Galaxy S24 Plus",
      "galaxy-s24": "Galaxy S24",
      "galaxy-s23-ultra": "Galaxy S23 Ultra",
      "galaxy-s22-ultra": "Galaxy S22 Ultra",
      "galaxy-s21": "Galaxy S21",
      "galaxy-note-20": "Galaxy Note 20",
      "macbook-pro-16-m3": "MacBook Pro 16\" M3",
      "macbook-pro-14-m3": "MacBook Pro 14\" M3",
      "macbook-air-15": "MacBook Air 15\"",
      "macbook-air-13": "MacBook Air 13\"",
      "dell-xps-13": "Dell XPS 13",
      "dell-xps-15": "Dell XPS 15",
      "dell-inspiron-15": "Dell Inspiron 15",
      "dell-latitude-14": "Dell Latitude 14",
      "ipad-pro-12": "iPad Pro 12.9\"",
      "ipad-pro-11": "iPad Pro 11\"",
      "ipad-air": "iPad Air",
      "ipad-mini": "iPad Mini",
      "ipad-10th-gen": "iPad (10th Gen)",
      "galaxy-tab-s9-ultra": "Galaxy Tab S9 Ultra",
      "galaxy-tab-s9": "Galaxy Tab S9",
      "galaxy-tab-s8": "Galaxy Tab S8",
      "galaxy-tab-a8": "Galaxy Tab A8",
    };
    return deviceNames[deviceId] || deviceId;
  };

  if (showResult) {
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
                  Evaluation Complete!
                </h1>
                
                <div>
                  <p className="text-lg text-muted-foreground mb-4">
                    Final value for your {getDeviceName(deviceId || "")}
                  </p>
                  <div className="text-5xl font-bold text-glow mb-4">
                    ₹{finalPrice?.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    *Price valid for 7 days
                  </p>
                </div>

                <div className="space-y-3">
                  <Link to={`/sell-${deviceType}/brand/${brandId}/device/${deviceId}/otp`}>
                    <Button className="btn-hero w-full h-12">
                      Continue
                    </Button>
                  </Link>
                </div>
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
                Back to Variant Selection
              </Button>
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className="card-premium text-center">
            <div className="space-y-8">
              <h1 className="text-3xl font-bold text-foreground">
                {questions[currentQuestion]}
              </h1>
              
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => handleAnswer(true)}
                  className="btn-hero px-8 py-4 flex items-center gap-2"
                >
                  <CheckCircle size={20} />
                  Yes
                </Button>
                <Button
                  onClick={() => handleAnswer(false)}
                  variant="outline"
                  className="px-8 py-4 flex items-center gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <XCircle size={20} />
                  No
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;