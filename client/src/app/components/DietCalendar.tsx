import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

export const DietCalendar: React.FC = () => {
  const { t, i18n } = useTranslation();
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
      style={{ perspective: "1500px" }}
    >
      <div className="bg-white rounded-[3rem] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-black/5 relative overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-accent/10 border border-accent/20 p-4 rounded-2xl shadow-xl">
              <CalendarIcon className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-foreground tracking-tighter uppercase">{t('diet_calendar.title')}</h2>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">
                {t('diet_calendar.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevMonth}
            className="rounded-2xl border-border bg-muted hover:bg-muted/80 h-12 w-12"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </Button>
          <h3 className="text-2xl font-black text-foreground tracking-tighter">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextMonth}
            className="rounded-2xl border-border bg-muted hover:bg-muted/80 h-12 w-12"
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
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
                className={`aspect-square rounded-2xl p-2 text-xs font-black transition-all relative border ${
                  isSelected
                    ? 'ring-2 ring-primary bg-primary/20 border-primary/30 text-primary'
                    : isToday
                      ? 'ring-2 ring-primary border-primary/20 bg-primary/5 text-primary'
                      : 'border-border hover:bg-muted'
                  } ${dietType === 'veg'
                    ? 'bg-accent/20 text-accent'
                    : dietType === 'non-veg'
                      ? 'bg-red-500/10 text-red-500'
                      : 'bg-muted/30 text-muted-foreground'
                  }`}
              >
                <span className={isToday ? 'text-primary' : ''}>{format(date, 'd')}</span>
                {dietType && (
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px]">
                    {dietType === 'veg' ? '✨' : '🥩'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal for Diet Selection */}
        <AnimatePresence>
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xl"
              onClick={() => setSelectedDate(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white rounded-[3rem] p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] max-w-sm w-full border border-black/5 relative overflow-hidden font-black"
                onClick={e => e.stopPropagation()}
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 blur-[80px] rounded-full" />
                
                <div className="text-center mb-8 relative z-10">
                  <div className="w-20 h-20 bg-accent/10 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 border border-accent/20">
                    <CalendarIcon className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-2 tracking-tighter">
                    {t('diet_calendar.plan_your_day')}
                  </h3>
                  <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest opacity-60">
                    {format(selectedDate, 'MMMM d, yyyy')}
                  </p>
                </div>

                <div className="grid gap-4 relative z-10">
                  <Button
                    onClick={() => {
                      handleSetDietType('veg');
                      toast.success(t('diet_calendar.veg_day_set'));
                      setSelectedDate(null);
                    }}
                    className="w-full bg-accent/20 hover:bg-accent text-accent hover:text-black rounded-2xl py-8 text-xs font-black uppercase tracking-widest border border-accent/30 transition-all hover:scale-105"
                  >
                    ✨ {t('diet_calendar.veg_day')}
                  </Button>
                  <Button
                    onClick={() => {
                      handleSetDietType('non-veg');
                      toast.success(t('diet_calendar.non_veg_day_set'));
                      setSelectedDate(null);
                    }}
                    className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl py-8 text-xs font-black uppercase tracking-widest border border-red-500/20 transition-all hover:scale-105"
                  >
                    🥩 {t('diet_calendar.non_veg_day')}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 opacity-50">{t('diet_calendar.legend')}</p>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-accent/20 border border-accent/20 flex items-center justify-center text-[10px]">
                ✨
              </div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('diet_calendar.veg_day')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-[10px]">
                🥩
              </div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('diet_calendar.non_veg_day')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg ring-2 ring-primary bg-primary/10" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('diet_calendar.today')}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
