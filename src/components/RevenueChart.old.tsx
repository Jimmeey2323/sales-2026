import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import { MonthData, formatCurrency } from '../data/salesData';

interface RevenueChartProps {
  data: MonthData[];
  activeFilter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL';
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, activeFilter }) => {
  const filteredData = activeFilter === 'ALL' 
    ? data 
    : data.filter(m => m.quarter === activeFilter);

  const maxTarget = Math.max(...filteredData.map(m => m.target));
  const totalTarget = filteredData.reduce((sum, m) => sum + m.target, 0);
  const totalBaseline = filteredData.reduce((sum, m) => sum + m.historicBaseline, 0);

  return (
    <GlassCard className="p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1a2332]">Revenue Timeline</h2>
          <p className="text-sm text-slate-500 mt-1">Monthly targets vs historic baseline</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1a2332]" />
            <span className="text-sm text-slate-600">2026 Target</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <span className="text-sm text-slate-600">2025 Baseline</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 w-16 flex flex-col justify-between text-xs text-slate-400">
          <span>{formatCurrency(maxTarget)}</span>
          <span>{formatCurrency(maxTarget * 0.75)}</span>
          <span>{formatCurrency(maxTarget * 0.5)}</span>
          <span>{formatCurrency(maxTarget * 0.25)}</span>
          <span>₹0</span>
        </div>

        {/* Chart area */}
        <div className="ml-20 relative">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-t border-slate-100 w-full" />
            ))}
          </div>

          {/* Bars */}
          <div className="relative flex items-end justify-between gap-2 sm:gap-4 h-64 sm:h-80">
            {filteredData.map((month, index) => {
              const targetHeight = (month.target / maxTarget) * 100;
              const baselineHeight = (month.historicBaseline / maxTarget) * 100;
              const growth = Math.round(((month.target - month.historicBaseline) / month.historicBaseline) * 100);
              
              return (
                <div key={month.month} className="flex-1 flex flex-col items-center group">
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="bg-[#1a2332] text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                      <p className="font-semibold">{month.month}</p>
                      <p>Target: {formatCurrency(month.target)}</p>
                      <p>Baseline: {formatCurrency(month.historicBaseline)}</p>
                      <p className="text-emerald-300">+{growth}% Growth</p>
                    </div>
                  </div>

                  {/* Bars container */}
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    {/* Baseline bar */}
                    <div 
                      className="w-1/3 bg-slate-200 rounded-t-md transition-all duration-500 ease-out"
                      style={{ height: `${baselineHeight}%` }}
                    />
                    {/* Target bar */}
                    <div 
                      className={`w-1/2 rounded-t-md transition-all duration-500 ease-out ${
                        month.isAnniversary 
                          ? 'bg-gradient-to-t from-amber-500 to-amber-400' 
                          : 'bg-gradient-to-t from-[#1a2332] to-[#3d4a5f]'
                      }`}
                      style={{ 
                        height: `${targetHeight}%`,
                        transitionDelay: `${index * 50}ms`
                      }}
                    />
                  </div>

                  {/* Month label */}
                  <div className="mt-3 text-center">
                    <span className={`text-xs sm:text-sm font-medium ${month.isAnniversary ? 'text-amber-600' : 'text-slate-600'}`}>
                      {month.shortMonth}
                    </span>
                    {month.isAnniversary && (
                      <div className="text-[10px] text-amber-500 font-medium">★</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
        <div className="text-center">
          <p className="text-2xl sm:text-3xl font-bold text-[#1a2332]">{formatCurrency(totalTarget)}</p>
          <p className="text-xs text-slate-500 mt-1">Total Target</p>
        </div>
        <div className="text-center">
          <p className="text-2xl sm:text-3xl font-bold text-slate-400">{formatCurrency(totalBaseline)}</p>
          <p className="text-xs text-slate-500 mt-1">Total Baseline</p>
        </div>
        <div className="text-center">
          <p className="text-2xl sm:text-3xl font-bold text-emerald-600">
            +{Math.round(((totalTarget - totalBaseline) / totalBaseline) * 100)}%
          </p>
          <p className="text-xs text-slate-500 mt-1">Growth Rate</p>
        </div>
        <div className="text-center">
          <p className="text-2xl sm:text-3xl font-bold text-[#1a2332]">{filteredData.length}</p>
          <p className="text-xs text-slate-500 mt-1">Months</p>
        </div>
      </div>
    </GlassCard>
  );
};

export default RevenueChart;
