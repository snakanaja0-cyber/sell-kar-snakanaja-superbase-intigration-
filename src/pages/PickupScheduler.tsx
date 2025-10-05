import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";

const PickupScheduler = () => {
  const { brandId, deviceId, cityId } = useParams();
  const deviceType = window.location.pathname.split('/')[1].replace('sell-', '');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");

  const timeSlots = [
    // Removed "09:00 AM - 12:00 PM"
    "12:00 PM - 03:00 PM", 
    "03:00 PM - 06:00 PM",
    "06:00 PM - 09:00 PM",
  ];

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      // Redirect to confirmation page
      // NOTE: Using window.location.href here as useNavigate was not imported in the original code,
      // but typically, React Router's `useNavigate` hook should be preferred for navigation.
      window.location.href = `/sell-${deviceType}/brand/${brandId}/device/${deviceId}/city/${cityId}/confirmation`;
    }
  };

  const backPath = `/sell-${deviceType}/brand/${brandId}/device/${deviceId}/city/${cityId}/address`;

  const isFormValid = selectedDate && selectedTime;

  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link to={backPath}>
              <Button variant="ghost" className="flex items-center gap-2" style={{ color: 'black' }}>
                <ChevronLeft size={20} />
                Back to Address Form
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(65, 105, 225, 0.1)' }}>
              <CalendarIcon className="w-10 h-10" style={{ color: 'royalBlue' }} />
            </div>
            <h1 className="text-3xl font-bold mb-4" style={{ color: 'black' }}>
              Schedule Pickup
            </h1>
            <p className="text-lg" style={{ color: 'black' }}>
              Choose a convenient date and time for device pickup
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar */}
            <Card className="card-premium">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2" style={{ color: 'black' }}>
                  <CalendarIcon size={20} />
                  Select Date
                </h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                  className="rounded-md border border-border p-3 pointer-events-auto"
                />
                {selectedDate && (
                  <p className="text-sm" style={{ color: 'black' }}>
                    Selected: {format(selectedDate, "EEEE, MMMM dd, yyyy")}
                  </p>
                )}
              </div>
            </Card>

            {/* Time Slots */}
            <Card className="card-premium">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2" style={{ color: 'black' }}>
                  <Clock size={20} />
                  Select Time Slot
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      style={selectedTime === time ? { backgroundColor: 'royalBlue', color: 'white' } : { color: 'black' }}
                      className={`h-12 justify-start ${selectedTime === time ? "" : "bg-muted/30 hover:bg-muted"}`}
                      disabled={!selectedDate}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
                {!selectedDate && (
                  <p className="text-sm" style={{ color: 'black' }}>
                    Please select a date first
                  </p>
                )}
              </div>
            </Card>
          </div>

          {/* Summary and Confirm */}
          {isFormValid && (
            <Card className="card-premium mt-8 animate-fade-in">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold" style={{ color: 'black' }}>
                  Pickup Summary
                </h3>
                <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                  <p style={{ color: 'black' }}>
                    <strong>Date:</strong> {selectedDate && format(selectedDate, "EEEE, MMMM dd, yyyy")}
                  </p>
                  <p style={{ color: 'black' }}>
                    <strong>Time:</strong> {selectedTime}
                  </p>
                </div>
                <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(65, 105, 225, 0.1)' }}>
                  <p className="text-sm" style={{ color: 'black' }}>
                    <strong>Important:</strong> Please ensure your device is ready and you have all necessary documents. Our executive will arrive during the selected time slot.
                  </p>
                </div>
                <Button 
                  onClick={handleConfirm}
                  className="w-full h-12"
                  style={{ backgroundColor: 'royalBlue', color: 'white' }}
                >
                  Confirm Pickup Schedule
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PickupScheduler;
