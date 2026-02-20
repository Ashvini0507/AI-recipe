import React, { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { SplashScreen } from "./components/SplashScreen";
import { AuthPage } from "./components/AuthPage";
import { HomePage } from "./components/HomePage";
import { Toaster } from "./components/ui/sonner";

const AppContent: React.FC = () => {
  const { isAuthenticated } = useApp();
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return <HomePage />;
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
      <Toaster position="top-center" richColors />
    </AppProvider>
  );
}