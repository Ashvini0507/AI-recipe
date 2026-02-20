import React from 'react';
import { motion } from 'motion/react';
import { Flame, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Progress } from './ui/progress';

export const CalorieTracker: React.FC = () => {
  const { user, getTodaysCalories } = useApp();
  const todaysCalories = getTodaysCalories();
  const calorieGoal = user?.calorieGoal || 2000;
  const percentage = Math.min((todaysCalories / calorieGoal) * 100, 100);

  // Color logic
  let colorClass = 'from-green-500 to-green-600';
  let bgClass = 'bg-green-50';
  let textClass = 'text-green-700';

  if (percentage >= 100) {
    colorClass = 'from-red-500 to-red-600';
    bgClass = 'bg-red-50';
    textClass = 'text-red-700';
  } else if (percentage >= 80) {
    colorClass = 'from-yellow-500 to-yellow-600';
    bgClass = 'bg-yellow-50';
    textClass = 'text-yellow-700';
  }

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`${bgClass} rounded-2xl p-6 mb-6`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`bg-gradient-to-br ${colorClass} p-3 rounded-xl`}>
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg text-gray-800">Today's Calories</h3>
            <p className="text-sm text-gray-600">Track your daily intake</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-3xl ${textClass}`}>{todaysCalories}</p>
          <p className="text-sm text-gray-600">of {calorieGoal} cal</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
        <div className="relative h-3 bg-white/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`h-full bg-gradient-to-r ${colorClass} rounded-full`}
          />
        </div>
      </div>

      {percentage >= 100 && (
        <div className={`mt-4 p-3 ${bgClass} border-2 border-red-200 rounded-xl flex items-center gap-2 text-sm ${textClass}`}>
          <TrendingUp className="w-5 h-5" />
          <span>You've reached your daily calorie goal!</span>
        </div>
      )}
    </motion.div>
  );
};
