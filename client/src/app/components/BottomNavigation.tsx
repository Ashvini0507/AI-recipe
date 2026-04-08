import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Home, Calendar, Heart, ShoppingCart, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNavigation: React.FC = () => {
  const { t } = useTranslation();
  const { currentTab, setCurrentTab } = useApp();

  const tabs = [
    { id: 'home', icon: Home, label: t('nav.home', 'Home') },
    { id: 'calendar', icon: Calendar, label: t('nav.calendar', 'Calendar') },
    { id: 'favorites', icon: Heart, label: t('nav.favorites', 'My Recipes') },
    { id: 'shopping', icon: ShoppingCart, label: t('nav.shopping', 'Shopping') },
    { id: 'profile', icon: User, label: t('nav.profile', 'Profile') },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white/80 backdrop-blur-2xl border border-black/10 rounded-3xl md:hidden shadow-2xl min-w-[320px]">
      <div className="flex items-center justify-between max-w-md mx-auto relative gap-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as any)}
              className="relative flex flex-col items-center justify-center w-12 h-12 group transition-all"
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/20 rounded-2xl -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div 
                className={`flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'text-primary scale-110' 
                    : 'text-muted-foreground group-hover:text-foreground'
                }`}
              >
                <Icon 
                  fill={isActive ? 'currentColor' : 'none'} 
                  className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : ''}`} 
                />
              </div>
              {isActive && (
                <motion.span 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-black uppercase tracking-tighter text-primary mt-1"
                >
                  {tab.label}
                </motion.span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
