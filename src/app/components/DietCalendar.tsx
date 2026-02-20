import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

export const DietCalendar: React.FC = () => {
  const { dietCalendar, setDietDay, getTodaysDiet } = useApp();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSetDietType = (type: 'veg' | 'non-veg') => {
    if (!selectedDate) return;
    const dateString = format(selectedDate, 'yyyy-MM-dd');
    setDietDay(dateString, type);
  };

  const getDietForDate = (date: Date): 'veg' | 'non-veg' | null => {
    const dateString = format(date, 'yyyy-MM-dd');
    const entry = dietCalendar.find(e => e.date === dateString);
    return entry ? entry.type : null;
  };

  const today = new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-xl">
              <CalendarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl text-gray-800">Diet Calendar</h2>
              <p className="text-sm text-gray-600">Plan your veg and non-veg days</p>
            </div>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevMonth}
            className="rounded-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h3 className="text-xl text-gray-800">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextMonth}
            className="rounded-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm text-gray-600 py-2">
              {day}
            </div>
          ))}

          {/* Empty cells for days before month starts */}
          {Array.from({ length: monthStart.getDay() }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {/* Calendar days */}
          {daysInMonth.map(date => {
            const dietType = getDietForDate(date);
            const isToday = isSameDay(date, today);
            const isSelected = selectedDate && isSameDay(date, selectedDate);

            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateClick(date)}
                className={`aspect-square rounded-xl p-2 text-sm transition-all relative ${
                  isSelected
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : isToday
                    ? 'ring-2 ring-green-500'
                    : 'hover:bg-gray-100'
                } ${
                  dietType === 'veg'
                    ? 'bg-green-100'
                    : dietType === 'non-veg'
                    ? 'bg-red-100'
                    : 'bg-white'
                }`}
              >
                <span className={isToday ? 'font-bold' : ''}>{format(date, 'd')}</span>
                {dietType && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs">
                    {dietType === 'veg' ? '🟢' : '🔴'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Date Actions */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-2xl p-4"
          >
            <p className="text-sm text-gray-600 mb-3">
              Set diet for {format(selectedDate, 'MMMM d, yyyy')}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleSetDietType('veg')}
                className="bg-green-500 hover:bg-green-600 rounded-xl gap-2"
              >
                🟢 Veg Day
              </Button>
              <Button
                onClick={() => handleSetDietType('non-veg')}
                className="bg-red-500 hover:bg-red-600 rounded-xl gap-2"
              >
                🔴 Non-Veg Day
              </Button>
            </div>
          </motion.div>
        )}

        {/* Legend */}
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-600 mb-3">Legend</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-green-100 flex items-center justify-center">
                🟢
              </div>
              <span className="text-gray-600">Vegetarian Day</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-100 flex items-center justify-center">
                🔴
              </div>
              <span className="text-gray-600">Non-Veg Day</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded ring-2 ring-green-500" />
              <span className="text-gray-600">Today</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
