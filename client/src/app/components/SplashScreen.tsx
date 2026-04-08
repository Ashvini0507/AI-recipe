import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ChefHat, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(isAuthenticated ? '/home' : '/login', { replace: true });
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated]);

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full opacity-50" />
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center relative z-10"
      >
        <motion.div
          initial={{ rotateX: 20, rotateY: -10, z: -100, opacity: 0 }}
          animate={{ 
            rotateX: [20, -10, 20],
            rotateY: [-10, 10, -10],
            z: 0,
            scale: [1, 1.05, 1],
            opacity: 1
          }}
          transition={{ 
            rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            z: { duration: 1.5, ease: "easeOut" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 1 }
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="inline-block mb-8 relative w-48 h-48 rounded-full shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden border-4 border-background"
        >
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop"
            alt="Delicious Food"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent mix-blend-overlay" />
          
          {/* Internal 3D depth highlights */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-black mb-4 text-foreground tracking-tighter uppercase"
        >
          Smart Recipe AI
        </motion.h1>
        
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] opacity-60"
        >
          <Sparkles className="w-3 h-3 text-accent" />
          AI-Powered Diet Planning
          <Sparkles className="w-3 h-3 text-accent" />
        </motion.p>
        
        <div className="mt-12 w-64 h-1.5 bg-white/5 rounded-full mx-auto overflow-hidden border border-white/5 p-[1px]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_15px_rgba(255,107,107,0.5)]"
          />
        </div>
      </motion.div>
    </div>
  );
};
