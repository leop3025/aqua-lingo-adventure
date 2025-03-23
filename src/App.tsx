
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Index from "./pages/Index";
import Learn from "./pages/Learn";
import Practice from "./pages/Practice";
import Profile from "./pages/Profile";
import LessonDetails from "./pages/LessonDetails";
import ActivityDetails from "./pages/ActivityDetails";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/lesson/:lessonId" element={<LessonDetails />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/activity/:activityId" element={<ActivityDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
