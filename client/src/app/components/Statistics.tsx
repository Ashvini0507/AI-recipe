import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Statistics: React.FC = () => {
  const { t } = useTranslation();
  const { getMonthlyStats } = useApp();
  const stats = getMonthlyStats();

  // Prepare data for pie chart
  const dietPieData = [
    { name: t('stats.veg_days'), value: stats.totalVegDays, color: '#FACC15' },
    { name: t('stats.non_veg_days'), value: stats.totalNonVegDays, color: '#ef4444' },
  ];

  // Prepare data for bar chart (last 7 days)
  const recentDailyCalories = stats.dailyCalories
    .slice(-7)
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      calories: entry.calories,
    }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: "1200px" }}>
        <motion.div 
          whileHover={{ rotateX: 5, rotateY: -5, z: 10 }}
          className="bg-white/5 backdrop-blur-2xl border border-accent/20 rounded-[2rem] p-6 shadow-2xl relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-accent/20 p-2 rounded-xl border border-accent/30">
              <span className="text-2xl">✨</span>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-60">{t('stats.veg_days')}</p>
          </div>
          <p className="text-4xl font-black tracking-tighter text-accent">{stats.totalVegDays}</p>
        </motion.div>

        <motion.div 
          whileHover={{ rotateX: 5, rotateY: -5, z: 10 }}
          className="bg-white/5 backdrop-blur-2xl border border-red-500/20 rounded-[2rem] p-6 shadow-2xl relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-500/20 p-2 rounded-xl border border-red-500/30">
              <span className="text-2xl">🔴</span>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-60">{t('stats.non_veg_days')}</p>
          </div>
          <p className="text-4xl font-black tracking-tighter text-red-500">{stats.totalNonVegDays}</p>
        </motion.div>

        <motion.div 
          whileHover={{ rotateX: 5, rotateY: -5, z: 10 }}
          className="bg-white/5 backdrop-blur-2xl border border-primary/20 rounded-[2rem] p-6 shadow-2xl relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/20 p-2 rounded-xl border border-primary/30">
              <span className="text-2xl">🔥</span>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-60">{t('stats.total_calories')}</p>
          </div>
          <p className="text-4xl font-black tracking-tighter text-primary">{stats.totalCalories.toLocaleString()}</p>
        </motion.div>

        <motion.div 
          whileHover={{ rotateX: 5, rotateY: -5, z: 10 }}
          className="bg-white/5 backdrop-blur-2xl border border-accent/20 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 blur-2xl rounded-full -mr-8 -mt-8" />
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-accent/20 p-2 rounded-xl border border-accent/30">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-60">{t('stats.avg_daily')}</p>
          </div>
          <p className="text-4xl font-black tracking-tighter text-accent">{Math.round(stats.averageDailyCalories)}</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">{t('stats.cal_per_day')}</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-accent/10 p-4 rounded-2xl border border-accent/20">
              <PieChartIcon className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-black text-foreground uppercase tracking-tighter">{t('stats.diet_distribution')}</h3>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">{t('stats.diet_subtitle')}</p>
            </div>
          </div>
 
          {stats.totalVegDays + stats.totalNonVegDays > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dietPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dietPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '1rem', border: '1px solid rgba(0,0,0,0.1)', color: '#000' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500 text-center px-4">
              <p>{t('stats.no_diet_data')}</p>
            </div>
          )}
        </div>

        {/* Bar Chart */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20">
              <BarChart3 className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-black text-foreground uppercase tracking-tighter">{t('stats.daily_calories')}</h3>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">{t('stats.last_7_days')}</p>
            </div>
          </div>

          {recentDailyCalories.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={recentDailyCalories}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(0,0,0,0.4)', fontSize: 10, fontWeight: 900 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(0,0,0,0.4)', fontSize: 10, fontWeight: 900 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '1rem', border: '1px solid rgba(0,0,0,0.1)', color: '#000' }}
                  itemStyle={{ color: '#10B981' }}
                />
                <Bar dataKey="calories" fill="#10B981" radius={[8, 8, 8, 8]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500 text-center px-4">
              <p>{t('stats.no_cal_data')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-2xl border border-white/10 relative overflow-hidden">
        <h3 className="text-xl font-black mb-6 text-foreground uppercase tracking-tight">{t('stats.monthly_insights')}</h3>
        <div className="space-y-4">
          {stats.totalVegDays > stats.totalNonVegDays && (
            <div className="flex items-start gap-3 p-5 bg-accent/10 border border-accent/20 rounded-2xl">
              <span className="text-2xl">✨</span>
              <div>
                <p className="font-bold text-accent">{t('stats.insight_veg')}</p>
                <p className="text-sm text-accent/70">
                  {t('stats.insight_veg_details', { veg: stats.totalVegDays, nonVeg: stats.totalNonVegDays })}
                </p>
              </div>
            </div>
          )}

          {stats.averageDailyCalories < 2000 && stats.dailyCalories.length > 0 && (
            <div className="flex items-start gap-4 p-5 bg-primary/10 border border-primary/20 rounded-2xl">
              <span className="text-2xl animate-pulse">💪</span>
              <div>
                <p className="font-bold text-primary">{t('stats.insight_healthy')}</p>
                <p className="text-sm text-primary/70">
                  {t('stats.insight_healthy_details', { calories: Math.round(stats.averageDailyCalories) })}
                </p>
              </div>
            </div>
          )}

          {stats.dailyCalories.length === 0 && (
            <div className="flex items-start gap-4 p-5 bg-accent/10 border border-accent/20 rounded-2xl">
              <span className="text-2xl">📊</span>
              <div>
                <p className="font-bold text-accent">{t('stats.monthly_insights')}</p>
                <p className="text-sm text-accent/70">
                  {t('stats.insight_no_data')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
