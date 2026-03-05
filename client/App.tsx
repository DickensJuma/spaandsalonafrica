import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Magazine from "./pages/Magazine";
import About from "./pages/About";
import BusinessClub from "./pages/BusinessClub";
import Events from "./pages/Events";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import BusinessClubQuestionnaire from "./pages/BusinessClubQuestionnaire";
import ArticleDetail from "./pages/ArticleDetail";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/magazine/article/:slug" element={<ArticleDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/business-club" element={<BusinessClub />} />
          <Route path="/events" element={<Events />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/business-club-questionnaire" element={<BusinessClubQuestionnaire />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
