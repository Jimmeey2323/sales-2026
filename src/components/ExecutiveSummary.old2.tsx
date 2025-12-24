import React from 'react';
import { TrendingUp, Target, MapPin, Building, Award, BarChart3 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { h1Strategy, h2Strategy, formatCurrency, monthlyData } from '../data/salesData';

interface ExecutiveSummaryProps {
  activeFilter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL';
  heroImage: string;
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ activeFilter, heroImage }) => {
  const h1Total = h1Strategy.totalTarget;
  const h2Total = h2Strategy.totalTarget;
  const annualTotal = h1Total + h2Total;
  
  const h1Baseline = h1Strategy.totalBaseline;
  const h2Baseline = h2Strategy.totalBaseline;
  const annualBaseline = h1Baseline + h2Baseline;

  // Calculate quarterly totals
  const q1Data = monthlyData.filter(m => m.quarter === 'Q1');
  const q2Data = monthlyData.filter(m => m.quarter === 'Q2');
  const q3Data = monthlyData.filter(m => m.quarter === 'Q3');
  const q4Data = monthlyData.filter(m => m.quarter === 'Q4');
  
  const q1Total = q1Data.reduce((sum, m) => sum + m.target, 0);
  const q2Total = q2Data.reduce((sum, m) => sum + m.target, 0);
  const q3Total = q3Data.reduce((sum, m) => sum + m.target, 0);
  const q4Total = q4Data.reduce((sum, m) => sum + m.target, 0);
  
  const q1Baseline = q1Data.reduce((sum, m) => sum + m.historicBaseline, 0);
  const q2Baseline = q2Data.reduce((sum, m) => sum + m.historicBaseline, 0);
  const q3Baseline = q3Data.reduce((sum, m) => sum + m.historicBaseline, 0);
  const q4Baseline = q4Data.reduce((sum, m) => sum + m.historicBaseline, 0);

  const displayTarget = activeFilter === 'Q1' ? q1Total : 
                       activeFilter === 'Q2' ? q2Total : 
                       activeFilter === 'Q3' ? q3Total : 
                       activeFilter === 'Q4' ? q4Total : annualTotal;
  const displayBaseline = activeFilter === 'Q1' ? q1Baseline : 
                         activeFilter === 'Q2' ? q2Baseline : 
                         activeFilter === 'Q3' ? q3Baseline : 
                         activeFilter === 'Q4' ? q4Baseline : annualBaseline;
  const growthPercent = Math.round(((displayTarget - displayBaseline) / displayBaseline) * 100);

  const filterData = activeFilter === 'ALL' ? monthlyData : monthlyData.filter(m => m.quarter === activeFilter);
  const mumbaiTarget = filterData.reduce((sum, m) => sum + m.mumbaiTarget, 0);
  const bengaluruTarget = filterData.reduce((sum, m) => sum + m.bengaluruTarget, 0);
  const popupTarget = displayTarget - mumbaiTarget - bengaluruTarget;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary/20 to-slate-900">
      {/* Hero Background with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Physique 57 Studio" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 mb-4">
            <Award className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">
              {activeFilter === 'ALL' ? 'Full Year' : activeFilter} Strategy
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-2xl tracking-tight">
            Physique 57 India
          </h1>
          <p className="text-white/70 text-sm sm:text-base font-medium">
            Sales Plan FY 2025-26
          </p>
        </div>

        {/* Compact Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 max-w-6xl mx-auto">
          {/* Revenue Target Card */}
          <Card className="group relative bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="w-4 h-4 text-primary" />
                </div>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5 tracking-tight">
                {formatCurrency(displayTarget)}
              </div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wide font-semibold">
                Revenue Target
              </div>
            </CardContent>
          </Card>

          {/* Growth Card */}
          <Card className="group relative bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-0.5 tracking-tight">
                +{growthPercent}%
              </div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wide font-semibold">
                YoY Growth
              </div>
              {/* Mini progress bar */}
              <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(growthPercent * 3, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Mumbai Card */}
          <Card className="group relative bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5 tracking-tight">
                {formatCurrency(mumbaiTarget)}
              </div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wide font-semibold">
                Mumbai • 60%
              </div>
            </CardContent>
          </Card>

          {/* Bengaluru Card */}
          <Card className="group relative bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4 text-violet-400" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5 tracking-tight">
                {formatCurrency(bengaluruTarget)}
              </div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wide font-semibold">
                Bengaluru • 30%
              </div>
            </CardContent>
          </Card>

          {/* Pop-ups Card */}
          <Card className="group relative bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5 tracking-tight">
                {formatCurrency(popupTarget)}
              </div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wide font-semibold">
                Pop-ups • 10%
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveSummary;
