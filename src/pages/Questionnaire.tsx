import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, CheckCircle, XCircle, FileText } from "lucide-react";

const Questionnaire = () => {
  const { brandId, deviceId, cityId } = useParams();
  const deviceType = window.location.pathname.split('/')[1].replace('sell-', '');
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  
  const [answers, setAnswers] = useState<{ [key: number]: boolean }>({});
  const [conditionAnswer, setConditionAnswer] = useState<string>("");
  const [ageAnswer, setAgeAnswer] = useState<string>("");
  const [accessories, setAccessories] = useState<{ charger: boolean; box: boolean; bill: boolean }>({ charger: false, box: false, bill: false });

  const isAppleDevice = deviceId?.includes('iphone') || deviceId?.includes('ipad') || deviceId?.includes('macbook');

  const ACCESSORY_ICONS = {
    charger: "https://s3ng.cashify.in/cashify/productLinePartVariation/img/xhdpi/5d244b6c82230.jpg?w=128",
    box: "https://s3ng.cashify.in/cashify/productLinePartVariation/img/xhdpi/5d244a8299b93.jpg?w=128",
    bill: "https://s3ng.cashify.in/cashify/productLinePartVariation/img/xhdpi/5e47820f4f9d0.png?w=128" 
  };

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
  
  const handleAccessoryToggle = (key: 'charger' | 'box' | 'bill') => {
    setAccessories(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNext = () => {
    const allAnswered = questions.every((_, index) => answers[index] !== undefined);
    if (!allAnswered || !conditionAnswer || !ageAnswer) {
      alert("Please answer all questions before proceeding to the next step.");
      return;
    }
    setStep(2);
  };
  
  const handleCalculatePrice = () => {
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

    if (accessories.charger) priceMultiplier += 0.02; 
    if (accessories.box) priceMultiplier += 0.03;   
    if (accessories.bill) priceMultiplier += 0.05;

    const calculatedPrice = Math.round(basePrice * Math.max(priceMultiplier, 0.2));

    localStorage.setItem('calculatedPrice', calculatedPrice.toString());
    localStorage.setItem('deviceName', getDeviceName(deviceId || ""));

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
    const accessoryAnswers = (accessories.charger ? 1 : 0) + (accessories.box ? 1 : 0) + (accessories.bill ? 1 : 0);
    
    if (step === 1) return basicAnswers + conditionAnswered + ageAnswered;
    return questions.length + 2 + accessoryAnswers; 
  };

  const getTotalQuestions = () => questions.length + 3; 
  const isStep1Complete = getAnsweredCount() === (questions.length + 2);

  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link to={step === 1 ? backPath : '#'} onClick={() => step === 2 && setStep(1)}>
              <Button variant="ghost" className="flex items-center gap-2" style={{ color: 'black' }}>
                <ChevronLeft size={20} />
                {step === 1 ? "Back to Variant Selection" : "Back to Questions"}
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold mb-2" style={{ color: 'black' }}>
              {step === 1 ? "Tell us more about your device?" : "Do you have the following?"}
            </h1>
            <p className="text-lg" style={{ color: 'black' }}>
              {step === 1 ? "Please answer a few questions about your device." : "Please select accessories which are available."}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2" style={{ color: 'black' }}>
              <span>Progress {getAnsweredCount()} of {getTotalQuestions()}</span>
              <span>{Math.round((getAnsweredCount() / getTotalQuestions()) * 100)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="rounded-full h-2 transition-all duration-300"
                style={{ 
                  backgroundColor: 'royalBlue', 
                  width: `${(getAnsweredCount() / getTotalQuestions()) * 100}%` 
                }}
              />
            </div>
          </div>

          {/* Step 1: Questions, Condition, and Age */}
          {step === 1 && (
            <div className="space-y-6">
              {questions.map((question, index) => (
                <Card key={index} className="card-premium">
                  <div className="space-y-6 text-center">
                    <h2 className="text-2xl font-bold" style={{ color: 'black' }}>{question.question}</h2>
                    <p className="text-lg" style={{ color: 'black' }}>{question.description}</p>
                    <div className="flex gap-4 justify-center">
                      <Button
                        onClick={() => handleAnswer(index, true)}
                        className={`px-8 py-4 flex items-center gap-2 ${answers[index] !== true ? "opacity-50 hover:opacity-100" : ""}`}
                        style={{ backgroundColor: 'royalBlue', color: 'white' }}
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

              <Card className="card-premium">
                <div className="space-y-6 text-center">
                  <h2 className="text-2xl font-bold" style={{ color: 'black' }}>What is the overall condition of your phone?</h2>
                  <div className="space-y-3">
                    {conditionOptions.map(option => (
                      <Button
                        key={option.value}
                        onClick={() => handleConditionSelect(option.value)}
                        className={`w-full px-6 py-4 text-left justify-start h-auto transition-all duration-200 ${conditionAnswer !== option.value ? "bg-muted/30 hover:bg-muted" : ""}`}
                        style={{
                          backgroundColor: conditionAnswer === option.value ? 'royalBlue' : '',
                          color: conditionAnswer === option.value ? 'white' : 'black'
                        }}
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

              <Card className="card-premium">
                <div className="space-y-6 text-center">
                  <h2 className="text-2xl font-bold" style={{ color: 'black' }}>How old is your phone?</h2>
                  <div className="space-y-3">
                    {ageOptions.map(option => (
                      <Button
                        key={option.value}
                        onClick={() => handleAgeSelect(option.value)}
                        className={`w-full px-6 py-4 text-left justify-start h-auto transition-all duration-200 ${ageAnswer !== option.value ? "bg-muted/30 hover:bg-muted" : ""}`}
                        style={{
                          backgroundColor: ageAnswer === option.value ? 'royalBlue' : '',
                          color: ageAnswer === option.value ? 'white' : 'black'
                        }}
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
          )}

          {/* Step 2: Accessories */}
          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Charger Card */}
                <Card
                    onClick={() => handleAccessoryToggle('charger')}
                    className={`p-4 flex flex-col items-center justify-center text-center gap-3 cursor-pointer transition-all duration-200 relative h-full ${!accessories.charger ? "bg-muted/30 hover:bg-muted" : ""}`}
                    style={{ backgroundColor: accessories.charger ? 'royalBlue' : '', color: accessories.charger ? 'white' : 'black' }}
                >
                    <img src={ACCESSORY_ICONS.charger} alt="Original Charger" className="w-16 h-16 object-contain" />
                    <span className="font-semibold">Original Charger of Device</span>
                    {accessories.charger && <CheckCircle size={20} className="absolute top-2 right-2" />}
                </Card>

                {/* Box Card */}
                <Card
                    onClick={() => handleAccessoryToggle('box')}
                    className={`p-4 flex flex-col items-center justify-center text-center gap-3 cursor-pointer transition-all duration-200 relative h-full ${!accessories.box ? "bg-muted/30 hover:bg-muted" : ""}`}
                    style={{ backgroundColor: accessories.box ? 'royalBlue' : '', color: accessories.box ? 'white' : 'black' }}
                >
                    <img src={ACCESSORY_ICONS.box} alt="Original Box" className="w-16 h-16 object-contain" />
                    <span className="font-semibold">Original Box with same IMEI</span>
                    {accessories.box && <CheckCircle size={20} className="absolute top-2 right-2" />}
                </Card>
                
                {/* Bill Card */}
                <Card
                    onClick={() => handleAccessoryToggle('bill')}
                    className={`p-4 flex flex-col items-center justify-center text-center gap-3 cursor-pointer transition-all duration-200 relative h-full ${!accessories.bill ? "bg-muted/30 hover:bg-muted" : ""}`}
                    style={{ backgroundColor: accessories.bill ? 'royalBlue' : '', color: accessories.bill ? 'white' : 'black' }}
                >
                    <FileText size={64} color={accessories.bill ? 'white' : 'black'} /> 
                    <span className="font-semibold">Bill of the device is available</span>
                    {accessories.bill && <CheckCircle size={20} className="absolute top-2 right-2" />}
                </Card>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-8 text-center">
            {step === 1 ? (
              <Button
                onClick={handleNext}
                className={`px-12 py-4 text-lg ${!isStep1Complete ? "opacity-50 cursor-not-allowed" : ""}`}
                style={{ backgroundColor: 'royalBlue', color: 'black' }}
                disabled={!isStep1Complete}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleCalculatePrice}
                className="px-12 py-4 text-lg"
                style={{ backgroundColor: 'royalBlue', color: 'black' }}
              >
                Calculate Final Price
              </Button>
            )}
          </div>
        </div>  
      </div>
    </div>
  );
};

export default Questionnaire;

