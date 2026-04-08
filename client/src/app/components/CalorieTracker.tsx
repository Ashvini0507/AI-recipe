import React from 'react';
import { motion } from 'motion/react';
import { Flame, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { Progress } from './ui/progress';

export const CalorieTracker: React.FC = () => {
  const { t } = useTranslation();
  const { user, getTodaysCalories } = useApp();
  const todaysCalories = getTodaysCalories();
  const calorieGoal = user?.calorieGoal || 2000;
  const percentage = Math.min((todaysCalories / calorieGoal) * 100, 100);

  // Color logic
  let colorClass = 'from-accent to-accent/80';
  let bgClass = 'bg-accent/10';
  let textClass = 'text-[#C5A059]'; // Deeper gold

  if (percentage >= 100) {
    colorClass = 'from-red-500 to-red-600';
    bgClass = 'bg-red-500/10';
    textClass = 'text-red-400';
  } else if (percentage >= 80) {
    colorClass = 'from-yellow-400 to-yellow-500';
    bgClass = 'bg-yellow-500/10';
    textClass = 'text-yellow-400';
  }

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ 
        rotateX: 5, 
        rotateY: -5,
        z: 20,
        transition: { duration: 0.3 }
      }}
      className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 mb-10 border border-black/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] overflow-hidden relative"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {/* Background Decoration */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClass} opacity-5 blur-3xl -mr-16 -mt-16`} />

      <div className="flex items-center justify-between mb-6 relative">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className={`bg-gradient-to-br ${colorClass} p-3.5 rounded-2xl shadow-lg shadow-primary/20`}
          >
            <Flame className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="text-xl font-black text-foreground tracking-tight">{t('calorie_tracker.title')}</h3>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-60">{t('calorie_tracker.subtitle')}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-4xl font-black tracking-tighter ${textClass}`}>{todaysCalories}</p>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">
            {t('calorie_tracker.of_goal', { goal: calorieGoal })}
          </p>
        </div>
      </div>

      <div className="space-y-3 relative">
        <div className="flex justify-between text-[11px] font-black text-muted-foreground uppercase tracking-wider">
          <span>{t('calorie_tracker.progress')}</span>
          <span className={textClass}>{Math.round(percentage)}%</span>
        </div>
        <div className="relative h-4 bg-muted rounded-full overflow-hidden border border-border/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className={`h-full bg-gradient-to-r ${colorClass} rounded-full relative`}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer" />
          </motion.div>
        </div>
      </div>

      {percentage >= 100 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mt-4 p-4 ${bgClass} border border-red-200/50 rounded-2xl flex items-center gap-3 text-xs font-bold ${textClass}`}
        >
          <span className="text-2xl animate-bounce">⚠️</span>
          <span>{t('calorie_tracker.goal_reached')}</span>
        </motion.div>
      )}
    </motion.div>
  );
};
