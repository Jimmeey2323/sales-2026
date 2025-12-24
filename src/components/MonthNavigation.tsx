import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import { MonthData, formatCurrency } from '../data/salesData';

interface MonthNavigationProps {
  months: MonthData[];
  activeMonth: string | null;
  onSelectMonth: (month: string) => void;
}

const MonthNavigation: React.FC<MonthNavigationProps> = ({ months, activeMonth, onSelectMonth }) => {
  return (
    <div className="sticky top-16 sm:top-20 z-30 glass-surface py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {months.map((month) => (
            <button
              key={month.month}
              onClick={() => onSelectMonth(month.month)}
              className={`
                flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-300
                ${activeMonth === month.month
                  ? month.isAnniversary
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-lg shadow-amber-500/25'
                    : 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25'
                  : 'bg-muted/40 text-muted-foreground hover:bg-muted/70'
                }
              `}
            >
              {month.isAnniversary && <Sparkles className="w-3.5 h-3.5" />}
              <span>{month.shortMonth}</span>
              <span className={`text-xs ${activeMonth === month.month ? 'text-white/70' : 'text-muted-foreground/70'}`}>
                {formatCurrency(month.target)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthNavigation;
