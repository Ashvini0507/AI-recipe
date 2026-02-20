import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Statistics: React.FC = () => {
  const { getMonthlyStats } = useApp();
  const stats = getMonthlyStats();

  // Prepare data for pie chart
  const dietPieData = [
    { name: 'Veg Days', value: stats.totalVegDays, color: '#22c55e' },
    { name: 'Non-Veg Days', value: stats.totalNonVegDays, color: '#ef4444' },
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-500 p-2 rounded-lg">
              <span className="text-2xl">🟢</span>
            </div>
            <p className="text-sm text-gray-600">Veg Days</p>
          </div>
          <p className="text-3xl text-gray-800">{stats.totalVegDays}</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-500 p-2 rounded-lg">
              <span className="text-2xl">🔴</span>
            </div>
            <p className="text-sm text-gray-600">Non-Veg Days</p>
          </div>
          <p className="text-3xl text-gray-800">{stats.totalNonVegDays}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <span className="text-2xl">🔥</span>
            </div>
            <p className="text-sm text-gray-600">Total Calories</p>
          </div>
          <p className="text-3xl text-gray-800">{stats.totalCalories.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-500 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-gray-600">Avg Daily</p>
          </div>
          <p className="text-3xl text-gray-800">{Math.round(stats.averageDailyCalories)}</p>
          <p className="text-xs text-gray-600">calories/day</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-xl">
              <PieChartIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl text-gray-800">Diet Distribution</h3>
              <p className="text-sm text-gray-600">Veg vs Non-Veg Days</p>
            </div>
          </div>

          {stats.totalVegDays + stats.totalNonVegDays > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dietPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dietPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              <p>No diet data yet. Start planning your meals!</p>
            </div>
          )}
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-3 rounded-xl">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl text-gray-800">Daily Calories</h3>
              <p className="text-sm text-gray-600">Last 7 days</p>
            </div>
          </div>

          {recentDailyCalories.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={recentDailyCalories}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="calories" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              <p>No calorie data yet. Start cooking!</p>
            </div>
          )}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl mb-4 text-gray-800">Monthly Insights</h3>
        <div className="space-y-3">
          {stats.totalVegDays > stats.totalNonVegDays && (
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
              <span className="text-2xl">🌱</span>
              <div>
                <p className="text-gray-800">Great job on eating more vegetarian meals!</p>
                <p className="text-sm text-gray-600">
                  You had {stats.totalVegDays} veg days vs {stats.totalNonVegDays} non-veg days this month.
                </p>
              </div>
            </div>
          )}

          {stats.averageDailyCalories < 2000 && stats.dailyCalories.length > 0 && (
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
              <span className="text-2xl">💪</span>
              <div>
                <p className="text-gray-800">You're maintaining a healthy calorie intake!</p>
                <p className="text-sm text-gray-600">
                  Your average daily calories are {Math.round(stats.averageDailyCalories)} cal.
                </p>
              </div>
            </div>
          )}

          {stats.dailyCalories.length === 0 && (
            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl">
              <span className="text-2xl">📊</span>
              <div>
                <p className="text-gray-800">Start tracking your meals!</p>
                <p className="text-sm text-gray-600">
                  Mark recipes as cooked to see your calorie insights here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
