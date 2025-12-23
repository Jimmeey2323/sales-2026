import React from 'react';
import { Building2, MapPin, Users, Percent } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import { MonthData, formatCurrency } from '../data/salesData';

interface LocationBreakdownProps {
  data: MonthData[];
  activeFilter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL';
}

const LocationBreakdown: React.FC<LocationBreakdownProps> = ({ data, activeFilter }) => {
  const filteredData = activeFilter === 'ALL' 
    ? data 
    : data.filter(m => m.quarter === activeFilter);

  const totalMumbai = filteredData.reduce((sum, m) => sum + m.mumbaiTarget, 0);
  const totalBengaluru = filteredData.reduce((sum, m) => sum + m.bengaluruTarget, 0);
  const totalTarget = filteredData.reduce((sum, m) => sum + m.target, 0);
  const popupsEvents = totalTarget - totalMumbai - totalBengaluru;

  const locations = [
    {
      name: 'Mumbai',
      subtitle: 'Kwality House + Supreme HQ',
      target: totalMumbai,
      percentage: 60,
      color: 'from-sky-500 to-sky-600',
      bgColor: 'bg-sky-50',
      textColor: 'text-sky-600',
      icon: Building2
    },
    {
      name: 'Bengaluru',
      subtitle: 'Kenkere House',
      target: totalBengaluru,
      percentage: 30,
      color: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50',
      textColor: 'text-violet-600',
      icon: MapPin
    },
    {
      name: 'Pop-ups & Events',
      subtitle: 'Various Locations',
      target: popupsEvents,
      percentage: 10,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      icon: Users
    }
  ];

  return (
    <GlassCard className="p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#1a2332]/5 flex items-center justify-center">
          <MapPin className="w-6 h-6 text-[#1a2332]" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1a2332]">Location Split</h2>
          <p className="text-sm text-slate-500">Revenue distribution by studio</p>
        </div>
      </div>

      {/* Visual Breakdown */}
      <div className="h-4 rounded-full overflow-hidden flex mb-8">
        <div className="bg-gradient-to-r from-sky-500 to-sky-400" style={{ width: '60%' }} />
        <div className="bg-gradient-to-r from-violet-500 to-violet-400" style={{ width: '30%' }} />
        <div className="bg-gradient-to-r from-amber-500 to-amber-400" style={{ width: '10%' }} />
      </div>

      {/* Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {locations.map((location) => (
          <div 
            key={location.name}
            className={`p-5 rounded-xl ${location.bgColor} border border-white/50`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${location.color} flex items-center justify-center`}>
                <location.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1a2332]">{location.name}</h3>
                <p className="text-xs text-slate-500">{location.subtitle}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Target</span>
                <span className={`text-lg font-bold ${location.textColor}`}>
                  {formatCurrency(location.target)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Share</span>
                <span className="text-lg font-bold text-[#1a2332]">{location.percentage}%</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-2 bg-white/60 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${location.color} transition-all duration-1000`}
                style={{ width: `${location.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mumbai Sub-breakdown */}
      <div className="mt-6 p-4 bg-slate-50/80 rounded-xl border border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Mumbai Studio Split</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-sky-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Kwality House</p>
              <p className="text-xs text-slate-500">30% of Total</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-sky-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Supreme HQ</p>
              <p className="text-xs text-slate-500">30% of Total</p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default LocationBreakdown;
