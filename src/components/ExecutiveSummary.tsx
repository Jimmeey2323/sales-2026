import React from 'react';
import { TrendingUp, Target, MapPin, Sparkles, ArrowUpRight, Building } from 'lucide-react';
import GlassCard from './ui/GlassCard';
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

  // Use the half strategies for now
  const getHalf = (filter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL') => {
    if (filter === 'ALL') return 'ALL';
    return (filter === 'Q1' || filter === 'Q2') ? 'H1' : 'H2';
  };
  const halfFilter = getHalf(activeFilter);
  const strategies = halfFilter === 'H1' ? h1Strategy.coreStrategy : halfFilter === 'H2' ? h2Strategy.coreStrategy : [...h1Strategy.coreStrategy, ...h2Strategy.coreStrategy];

  return (
    <section className="relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 h-[500px] sm:h-[450px]">
        <img 
          src={heroImage} 
          alt="Physique 57 Studio" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a2332]/80 via-[#1a2332]/60 to-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-8">
        {/* Hero Content */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-sm font-medium text-white">
              {activeFilter === 'ALL' ? 'Full Year' : activeFilter} Strategy
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Sales Plan for Physique 57 India FY-2025-26
          </h1>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Target Card */}
          <GlassCard className="p-5 sm:p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#1a2332] to-[#2d3a4f] flex items-center justify-center">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Target</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#1a2332] mb-1">{formatCurrency(displayTarget)}</p>
            <p className="text-sm text-slate-500">{activeFilter === 'ALL' ? '12' : '3'} Month Target</p>
          </GlassCard>

          {/* Growth Card */}
          <GlassCard className="p-5 sm:p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Growth</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1">+{growthPercent}%</p>
            <p className="text-sm text-slate-500">Year over Year</p>
          </GlassCard>

          {/* Mumbai Card */}
          <GlassCard className="p-5 sm:p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center">
                <Building className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Mumbai</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-sky-600 mb-1">{formatCurrency(mumbaiTarget)}</p>
            <p className="text-sm text-slate-500">60% Revenue Share</p>
          </GlassCard>

          {/* Bengaluru Card */}
          <GlassCard className="p-5 sm:p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Bengaluru</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-violet-600 mb-1">{formatCurrency(bengaluruTarget)}</p>
            <p className="text-sm text-slate-500">30% Revenue Share</p>
          </GlassCard>
        </div>

        {/* Strategy Section */}
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1a2332] mb-6">Core Strategy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {strategies.slice(0, 6).map((strategy, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 bg-slate-50/80 rounded-xl border border-slate-100"
              >
                <div className="w-8 h-8 rounded-lg bg-[#1a2332]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-[#1a2332]">{index + 1}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{strategy}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default ExecutiveSummary;
