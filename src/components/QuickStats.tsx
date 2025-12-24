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
        icon: Target
      },
      {
        label: 'Growth Rate',
        value: `+${growthRate}%`,
        icon: TrendingUp
      },
      {
        label: 'Last Year',
        value: formatCurrency(currentMonthData.historicBaseline),
        icon: Calendar
      },
      {
        label: 'Mumbai',
        value: formatCurrency(currentMonthData.mumbaiTarget),
        icon: DollarSign
      },
      {
        label: 'Bengaluru',
        value: formatCurrency(currentMonthData.bengaluruTarget),
        icon: DollarSign
      },
      {
        label: 'Total Offers',
        value: currentMonthData.offers.filter(o => !o.isCancelled).length.toString(),
        icon: Users
      }
    ];

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <GlassCard key={index} className="p-4 metric-card" hover>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 text-primary`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
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
  const totalOffers = filteredData.reduce((sum, m) => sum + m.offers.filter(o => !o.isCancelled).length, 0);

  const stats = [
    {
      label: 'Total Target',
      value: formatCurrency(totalTarget),
      icon: Target
    },
    {
      label: 'Growth Rate',
      value: `+${growthRate}%`,
      icon: TrendingUp
    },
    {
      label: 'Avg Monthly',
      value: formatCurrency(avgMonthlyTarget),
      icon: Calendar
    },
    {
      label: 'Peak Month',
      value: highestMonth.shortMonth,
      subValue: formatCurrency(highestMonth.target),
      icon: DollarSign
    },
    {
      label: 'Total Offers',
      value: totalOffers.toString(),
      icon: Users
    },
    {
      label: 'Months',
      value: filteredData.length.toString(),
      icon: Calendar
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <GlassCard key={index} className="p-4 metric-card" hover>
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-3 shadow-lg shadow-primary/25`}>
            <stat.icon className={`w-5 h-5 text-white`} />
          </div>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          {stat.subValue && (
            <p className="text-xs text-muted-foreground">{stat.subValue}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
        </GlassCard>
      ))}
    </div>
  );
};

export default QuickStats;
