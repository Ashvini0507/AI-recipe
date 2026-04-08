import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import { motion } from "motion/react";
import { AppProvider, useApp } from "./context/AppContext";
import { SplashScreen } from "./components/SplashScreen";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { HomePage } from "./components/HomePage";
import { AdminLoginPage } from "./components/AdminLoginPage";
import { AdminDashboard } from "./components/AdminDashboard";
import { Toaster } from "./components/ui/sonner";
import { GlobalBackground } from "./components/GlobalBackground";

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Public Route component (redirects to home if already logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useApp();
  if (isAuthenticated) return <Navigate to="/home" replace />;
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const navigate = useNavigate();

  // Listen for Ctrl+A shortcut for Admin Panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl + A
      if (e.ctrlKey && e.key.toLowerCase() === 'a') {
        e.preventDefault(); // Prevent default 'select all' behavior
        navigate('/admin/login');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ perspective: "1200px" }}
      className="min-h-screen overflow-x-hidden relative"
    >
      <GlobalBackground />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </motion.div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
      <Toaster position="top-center" richColors />
    </AppProvider>
  );
}