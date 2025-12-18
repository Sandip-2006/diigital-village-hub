import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Schemes from "./pages/Schemes";
import Complaints from "./pages/Complaints";
import Directory from "./pages/Directory";
import Sarpanch from "./pages/Sarpanch";
import GramSabha from "./pages/GramSabha";
import Development from "./pages/Development";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Amenities from "./pages/Amenities";
import Attractions from "./pages/Attractions";
import Market from "./pages/Market";
import Assets from "./pages/Assets";
import Taluka from "./pages/Taluka";
import PRIASoft from "./pages/PRIASoft";
import Profile from "./pages/Profile";
import WhatsApp from "./pages/WhatsApp";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/sarpanch" element={<Sarpanch />} />
          <Route path="/gram-sabha" element={<GramSabha />} />
          <Route path="/development" element={<Development />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/market" element={<Market />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/taluka" element={<Taluka />} />
          <Route path="/priasoft" element={<PRIASoft />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/whatsapp" element={<WhatsApp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
