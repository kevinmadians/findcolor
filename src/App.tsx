
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PaletteDetailPage from "./pages/PaletteDetailPage";
import CreatePalettePage from "./pages/CreatePalettePage";
import NotFound from "./pages/NotFound";
import ExtractFromImagePage from "./pages/ExtractFromImagePage";
import ExplorePage from "./pages/ExplorePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/tags/:tag" element={<ExplorePage />} />
          <Route path="/palette/:id" element={<PaletteDetailPage />} />
          <Route path="/create" element={<CreatePalettePage />} />
          <Route path="/extract-from-image" element={<ExtractFromImagePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
