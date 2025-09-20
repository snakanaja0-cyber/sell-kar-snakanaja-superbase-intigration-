import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SellPhone from "./pages/SellPhone";
import SellLaptop from "./pages/SellLaptop";
import SellIpad from "./pages/SellIpad";
import DeviceList from "./pages/DeviceList";
import VariantSelection from "./pages/VariantSelection";
import Questionnaire from "./pages/Questionnaire";
import OtpVerification from "./pages/OtpVerification";
import AddressForm from "./pages/AddressForm";
import PickupScheduler from "./pages/PickupScheduler";
import Confirmation from "./pages/Confirmation";
import TrackOrder from "./pages/TrackOrder";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sell-phone" element={<SellPhone />} />
          <Route path="/sell-laptop" element={<SellLaptop />} />
          <Route path="/sell-ipad" element={<SellIpad />} />
          <Route path="/sell-:deviceType/brand/:brandId" element={<DeviceList />} />
          <Route path="/sell-:deviceType/brand/:brandId/device/:deviceId" element={<VariantSelection />} />
          <Route path="/sell-:deviceType/brand/:brandId/device/:deviceId/questionnaire" element={<Questionnaire />} />
          <Route path="/sell-:deviceType/brand/:brandId/device/:deviceId/otp" element={<OtpVerification />} />
          <Route path="/sell-:deviceType/brand/:brandId/device/:deviceId/address" element={<AddressForm />} />
          <Route path="/sell-:deviceType/brand/:brandId/device/:deviceId/pickup" element={<PickupScheduler />} />
          <Route path="/sell-:deviceType/brand/:brandId/device/:deviceId/confirmation" element={<Confirmation />} />
          <Route path="/track-order" element={<TrackOrder />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
