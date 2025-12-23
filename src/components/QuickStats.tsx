import React from 'react';
import { TrendingUp, Target, Calendar, Users, DollarSign, Percent } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import { MonthData, formatCurrency } from '../data/salesData';

interface QuickStatsProps {
  data: MonthData[];
  activeFilter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL';
  activeMonth?: string | null;
}

const QuickStats: React.FC<QuickStatsProps> = ({ data, activeFilter, activeMonth }) => {
  // If a specific month is selected, show that month's data
  const currentMonthData = activeMonth ? data.find(m => m.month === activeMonth) : null;
  
  if (currentMonthData) {
    // Show current month stats
    const growthRate = Math.round(((currentMonthData.target - currentMonthData.historicBaseline) / currentMonthData.historicBaseline) * 100);
    
    const stats = [
      {
        label: 'Month Target',
        value: formatCurrency(currentMonthData.target),
        icon: Target,
        color: 'from-[#1a2332] to-[#2d3a4f]',
        bgColor: 'bg-[#1a2332]/5'
      },
      {
        label: 'Growth Rate',
        value: `+${growthRate}%`,
        icon: TrendingUp,
        color: 'from-emerald-500 to-emerald-600',
        bgColor: 'bg-emerald-50'
      },
      {
        label: 'Last Year',
        value: formatCurrency(currentMonthData.historicBaseline),
        icon: Calendar,
        color: 'from-sky-500 to-sky-600',
        bgColor: 'bg-sky-50'
      },
      {
        label: 'Mumbai',
        value: formatCurrency(currentMonthData.mumbaiTarget),
        icon: DollarSign,
        color: 'from-amber-500 to-amber-600',
        bgColor: 'bg-amber-50'
      },
      {
        label: 'Bengaluru',
        value: formatCurrency(currentMonthData.bengaluruTarget),
        icon: DollarSign,
        color: 'from-violet-500 to-violet-600',
        bgColor: 'bg-violet-50'
      },
      {
        label: 'Total Offers',
        value: currentMonthData.offers.length.toString(),
        icon: Users,
        color: 'from-rose-500 to-rose-600',
        bgColor: 'bg-rose-50'
      }
    ];

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <GlassCard key={index} className="p-4" hover>
            <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} style={{ color: stat.color.includes('emerald') ? '#10b981' : stat.color.includes('sky') ? '#0ea5e9' : stat.color.includes('amber') ? '#f59e0b' : stat.color.includes('violet') ? '#8b5cf6' : stat.color.includes('rose') ? '#f43f5e' : '#1a2332' }} />
            </div>
            <p className="text-2xl font-bold text-[#1a2332]">{stat.value}</p>
            <p className="text-xs text-muted-foreground font-bold mt-1">{stat.label}</p>
          </GlassCard>
        ))}
      </div>
    );
  }
  
  // Otherwise show aggregate stats for selected period
  const filteredData = activeFilter === 'ALL' 
    ? data 
    : data.filter(m => m.quarter === activeFilter);

  const totalTarget = filteredData.reduce((sum, m) => sum + m.target, 0);
  const totalBaseline = filteredData.reduce((sum, m) => sum + m.historicBaseline, 0);
  const avgMonthlyTarget = totalTarget / filteredData.length;
  const growthRate = Math.round(((totalTarget - totalBaseline) / totalBaseline) * 100);
  const highestMonth = filteredData.reduce((max, m) => m.target > max.target ? m : max, filteredData[0]);
  const totalOffers = filteredData.reduce((sum, m) => sum + m.offers.length, 0);

  const stats = [
    {
      label: 'Total Target',
      value: formatCurrency(totalTarget),
      icon: Target,
      color: 'from-[#1a2332] to-[#2d3a4f]',
      bgColor: 'bg-[#1a2332]/5'
    },
    {
      label: 'Growth Rate',
      value: `+${growthRate}%`,
      icon: TrendingUp,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      label: 'Avg Monthly',
      value: formatCurrency(avgMonthlyTarget),
      icon: Calendar,
      color: 'from-sky-500 to-sky-600',
      bgColor: 'bg-sky-50'
    },
    {
      label: 'Peak Month',
      value: highestMonth.shortMonth,
      subValue: formatCurrency(highestMonth.target),
      icon: DollarSign,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      label: 'Total Offers',
      value: totalOffers.toString(),
      icon: Users,
      color: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50'
    },
    {
      label: 'Months',
      value: filteredData.length.toString(),
      icon: Calendar,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <GlassCard key={index} className="p-4" hover>
          <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3`}>
            <stat.icon className={`w-5 h-5 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} style={{ color: stat.color.includes('emerald') ? '#10b981' : stat.color.includes('sky') ? '#0ea5e9' : stat.color.includes('amber') ? '#f59e0b' : stat.color.includes('violet') ? '#8b5cf6' : stat.color.includes('rose') ? '#f43f5e' : '#1a2332' }} />
          </div>
          <p className="text-2xl font-bold text-[#1a2332]">{stat.value}</p>
          {stat.subValue && (
            <p className="text-xs text-muted-foreground font-bold">{stat.subValue}</p>
          )}
          <p className=\"text-xs text-muted-foreground font-bold mt-1\">{stat.label}</p>
        </GlassCard>
      ))}
    </div>
  );
};

export default QuickStats;
