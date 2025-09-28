import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, CheckCircle, XCircle } from "lucide-react";

const Questionnaire = () => {
  const { brandId, deviceId, cityId } = useParams();
  const deviceType = window.location.pathname.split('/')[1].replace('sell-', '');
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<{ [key: number]: boolean }>({});
  const [conditionAnswer, setConditionAnswer] = useState<string>("");
  const [ageAnswer, setAgeAnswer] = useState<string>("");

  const isAppleDevice = deviceId?.includes('iphone') || deviceId?.includes('ipad') || deviceId?.includes('macbook');

  const questions = [
    { question: "Are you able to make and receive calls?", description: "Check your device for cellular network connectivity issues." },
    { question: "Is your device's touch screen working properly?", description: "Check the touch screen functionality of your phone." },
    { question: "Is your phone's screen original?", description: "Pick 'Yes' if screen was never changed or was changed by Authorized Service Center. Pick 'No' if screen was changed at local shop." },
    ...(isAppleDevice ? [{ question: "Battery Health above 80%", description: "Check if your device's battery health is above 80%." }] : [])
  ];

  const conditionOptions = [
    { value: "good", label: "Good", description: "No scratch, No dent, Works perfectly" },
    { value: "average", label: "Average", description: "Visible scratches or dents but fully functional" },
    { value: "below-average", label: "Below average", description: "Major Dents & Major Scratches" }
  ];

  const ageOptions = [
    { value: "0-3", label: "0-3 Months", description: "No Physical Damage" },
    { value: "3-6", label: "3-6 Months", description: "No Physical Damage" },
    { value: "6-11", label: "6-11 Months", description: "No Physical Damage" },
    { value: "11+", label: "11 Months", description: "Out Of Warranty" }
  ];

  const basePrices: { [key: string]: number } = {
    "iphone-15-pro-max": 50000, "iphone-15-pro": 45000, "iphone-15": 38000,
    "iphone-14-pro-max": 42000, "iphone-14-pro": 38000, "iphone-14": 32000,
    "iphone-13": 28000, "iphone-12": 24000, "iphone-11": 20000,
    "iphone-x": 15000, "iphone-xr": 18000, "iphone-8": 12000,
    "galaxy-s24-ultra": 48000, "galaxy-s24-plus": 40000, "galaxy-s24": 35000,
    "galaxy-s23-ultra": 38000, "galaxy-s22-ultra": 32000, "galaxy-s21": 25000,
    "galaxy-note-20": 22000, "macbook-pro-16-m3": 120000, "macbook-pro-14-m3": 95000,
    "macbook-air-15": 75000, "macbook-air-13": 65000, "dell-xps-13": 45000,
    "dell-xps-15": 55000, "dell-inspiron-15": 30000, "dell-latitude-14": 35000,
    "ipad-pro-12": 48000, "ipad-pro-11": 38000, "ipad-air": 32000, "ipad-mini": 25000,
    "ipad-10th-gen": 20000, "galaxy-tab-s9-ultra": 42000, "galaxy-tab-s9": 35000,
    "galaxy-tab-s8": 28000, "galaxy-tab-a8": 18000,
  };

  const handleAnswer = (questionIndex: number, answer: boolean) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleConditionSelect = (value: string) => setConditionAnswer(value);
  const handleAgeSelect = (value: string) => setAgeAnswer(value);

  const handleSubmit = () => {
    const allAnswered = questions.every((_, index) => answers[index] !== undefined);
    if (!allAnswered || !conditionAnswer || !ageAnswer) {
      alert("Please answer all questions before proceeding.");
      return;
    }

    const basePrice = basePrices[deviceId || ""] || 20000;
    let priceMultiplier = 0.9;

    questions.forEach((_, index) => {
      if (!answers[index]) {
        if (index === 0) priceMultiplier -= 0.2;
        if (index === 1) priceMultiplier -= 0.2;
        if (index === 2) priceMultiplier -= 0.15;
        if (index === 3 && isAppleDevice) priceMultiplier -= 0.1;
      }
    });

    switch (conditionAnswer) {
      case "good": priceMultiplier += 0.05; break;
      case "average": priceMultiplier -= 0.1; break;
      case "below-average": priceMultiplier -= 0.25; break;
    }

    switch (ageAnswer) {
      case "0-3": priceMultiplier += 0.05; break;
      case "6-11": priceMultiplier -= 0.05; break;
      case "11+": priceMultiplier -= 0.15; break;
    }

    const calculatedPrice = Math.round(basePrice * Math.max(priceMultiplier, 0.2));

    // Store in localStorage
    localStorage.setItem('calculatedPrice', calculatedPrice.toString());
    localStorage.setItem('deviceName', getDeviceName(deviceId || ""));

    // Redirect to OTP page
    navigate(`/sell-${deviceType}/brand/${brandId}/device/${deviceId}/city/${cityId}/otp`);
  };

  const backPath = `/sell-${deviceType}/brand/${brandId}/device/${deviceId}/city/${cityId}/variant`;

  const getDeviceName = (deviceId: string) => {
    const deviceNames: { [key: string]: string } = {
      "iphone-15-pro-max": "iPhone 15 Pro Max", "iphone-15-pro": "iPhone 15 Pro", "iphone-15": "iPhone 15",
      "iphone-14-pro-max": "iPhone 14 Pro Max", "iphone-14-pro": "iPhone 14 Pro", "iphone-14": "iPhone 14",
      "iphone-13": "iPhone 13", "iphone-12": "iPhone 12", "iphone-11": "iPhone 11",
      "iphone-x": "iPhone X", "iphone-xr": "iPhone XR", "iphone-8": "iPhone 8",
      "galaxy-s24-ultra": "Galaxy S24 Ultra", "galaxy-s24-plus": "Galaxy S24 Plus", "galaxy-s24": "Galaxy S24",
      "galaxy-s23-ultra": "Galaxy S23 Ultra", "galaxy-s22-ultra": "Galaxy S22 Ultra", "galaxy-s21": "Galaxy S21",
      "galaxy-note-20": "Galaxy Note 20", "macbook-pro-16-m3": "MacBook Pro 16\" M3", "macbook-pro-14-m3": "MacBook Pro 14\" M3",
      "macbook-air-15": "MacBook Air 15\"", "macbook-air-13": "MacBook Air 13\"", "dell-xps-13": "Dell XPS 13",
      "dell-xps-15": "Dell XPS 15", "dell-inspiron-15": "Dell Inspiron 15", "dell-latitude-14": "Dell Latitude 14",
      "ipad-pro-12": "iPad Pro 12.9\"", "ipad-pro-11": "iPad Pro 11\"", "ipad-air": "iPad Air", "ipad-mini": "iPad Mini",
      "ipad-10th-gen": "iPad (10th Gen)", "galaxy-tab-s9-ultra": "Galaxy Tab S9 Ultra", "galaxy-tab-s9": "Galaxy Tab S9",
      "galaxy-tab-s8": "Galaxy Tab S8", "galaxy-tab-a8": "Galaxy Tab A8",
    };
    return deviceNames[deviceId] || deviceId;
  };

  const getAnsweredCount = () => {
    const basicAnswers = Object.keys(answers).length;
    const conditionAnswered = conditionAnswer ? 1 : 0;
    const ageAnswered = ageAnswer ? 1 : 0;
    return basicAnswers + conditionAnswered + ageAnswered;
  };

  const getTotalQuestions = () => questions.length + 2;

  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link to={backPath}>
              <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ChevronLeft size={20} />
                Back to Variant Selection
              </Button>
            </Link>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Tell us more about your device?
            </h1>
            <p className="text-lg text-muted-foreground">
              Please answer a few questions about your device.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Answered {getAnsweredCount()} of {getTotalQuestions()}</span>
              <span>{Math.round((getAnsweredCount() / getTotalQuestions()) * 100)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2 transition-all duration-300"
                style={{ width: `${(getAnsweredCount() / getTotalQuestions()) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((question, index) => (
              <Card key={index} className="card-premium">
                <div className="space-y-6 text-center">
                  <h2 className="text-2xl font-bold text-foreground">{question.question}</h2>
                  <p className="text-lg text-muted-foreground">{question.description}</p>

                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => handleAnswer(index, true)}
                      className={`px-8 py-4 flex items-center gap-2 ${answers[index] === true ? "btn-hero" : "btn-hero opacity-50 hover:opacity-100"}`}
                    >
                      <CheckCircle size={20} /> Yes
                    </Button>
                    <Button
                      onClick={() => handleAnswer(index, false)}
                      variant="outline"
                      className={`px-8 py-4 flex items-center gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground ${answers[index] === false ? "bg-destructive text-destructive-foreground" : ""}`}
                    >
                      <XCircle size={20} /> No
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {/* Condition */}
            <Card className="card-premium">
              <div className="space-y-6 text-center">
                <h2 className="text-2xl font-bold text-foreground">What is the overall condition of your phone?</h2>
                <div className="space-y-3">
                  {conditionOptions.map(option => (
                    <Button
                      key={option.value}
                      onClick={() => handleConditionSelect(option.value)}
                      variant={conditionAnswer === option.value ? "default" : "outline"}
                      className={`w-full px-6 py-4 text-left justify-start h-auto ${conditionAnswer === option.value ? "btn-hero" : "btn-hero opacity-50 hover:opacity-100"}`}
                    >
                      <div>
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-sm opacity-75">{option.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Age */}
            <Card className="card-premium">
              <div className="space-y-6 text-center">
                <h2 className="text-2xl font-bold text-foreground">How old is your phone?</h2>
                <div className="space-y-3">
                  {ageOptions.map(option => (
                    <Button
                      key={option.value}
                      onClick={() => handleAgeSelect(option.value)}
                      variant={ageAnswer === option.value ? "default" : "outline"}
                      className={`w-full px-6 py-4 text-left justify-start h-auto ${ageAnswer === option.value ? "btn-hero" : "btn-hero opacity-50 hover:opacity-100"}`}
                    >
                      <div>
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-sm opacity-75">{option.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={handleSubmit}
              className={`btn-hero px-12 py-4 text-lg ${getAnsweredCount() === getTotalQuestions() ? "" : "opacity-50 cursor-not-allowed"}`}
              disabled={getAnsweredCount() !== getTotalQuestions()}
            >
              Calculate Final Price
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
