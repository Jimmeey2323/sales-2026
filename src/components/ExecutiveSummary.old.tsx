import React from 'react';
import { TrendingUp, Target, MapPin, Sparkles, ArrowUpRight, Building, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { h1Strategy, h2Strategy, formatCurrency, monthlyData } from '../data/salesData';
import Sparkline from './ui/Sparkline';
import CircularProgress from './ui/CircularProgress';
import CountUp from './ui/CountUp';

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

  // Generate sparkline data for trend visualization
  const targetTrend = filterData.map(m => m.target);
  const baselineTrend = filterData.map(m => m.historicBaseline);
  
  // Calculate progress percentage
  const progressPercentage = (displayTarget / (displayTarget + 1000000)) * 100; // Simplified for demo

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-24">
        {/* Hero Content */}
        <div className="text-center mb-12 sm:mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 sm:mb-8">
            <Sparkles className="w-4 h-4 text-white drop-shadow-lg" />
            <span className="text-sm font-semibold text-white drop-shadow-lg">
              {activeFilter === 'ALL' ? 'Full Year' : activeFilter} Strategy
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-2xl">
            Sales Plan for Physique 57 India FY-2025-26
          </h1>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 relative z-10 px-1 sm:px-0">
          {/* Target Card */}
          <Card className="shadow-lg bg-white/60 backdrop-blur-md border-0 hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Target</span>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-2xl sm:text-3xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                <CountUp end={displayTarget} prefix="₹" decimals={2} />
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-3">{activeFilter === 'ALL' ? '12' : '3'} Month Target</p>
              
              {/* Sparkline trend */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkline data={targetTrend} height={24} width={120} />
                <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                  <span>Growth: {growthPercent}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Growth Card */}
          <Card className="shadow-lg bg-white/60 backdrop-blur-md border-0 hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Growth</span>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-3 mb-3">
                <p className="text-2xl sm:text-3xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                  +<CountUp end={growthPercent} suffix="%" />
                </p>
                <CircularProgress value={growthPercent} max={50} size={40} strokeWidth={4} showPercentage={false} />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-3">Year over Year</p>
              
              {/* Progress bar */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/50 animate-pulse transition-all duration-1000" 
                    style={{width: `${Math.min(growthPercent * 2, 100)}%`}} 
                  />
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Target vs Baseline comparison
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mumbai Card */}
          <Card className="shadow-lg bg-white/60 backdrop-blur-md border-0 hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                <Building className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Mumbai</span>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-2xl sm:text-3xl font-bold text-primary mb-1 group-hover:text-primary/80 transition-colors">{formatCurrency(mumbaiTarget)}</p>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">60% Revenue Share</p>
              <div className="mt-3 flex justify-between text-xs group-hover:opacity-100 opacity-0 transition-opacity">
                <span className="text-muted-foreground">📍 Kwality House</span>
                <span className="text-primary">30%</span>
              </div>
            </CardContent>
          </Card>

          {/* Bengaluru Card */}
          <Card className="shadow-lg bg-white/60 backdrop-blur-md border-0 hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Bengaluru</span>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-2xl sm:text-3xl font-bold text-primary mb-1 group-hover:text-primary/80 transition-colors">{formatCurrency(bengaluruTarget)}</p>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">30% Revenue Share</p>
              <div className="mt-3 flex justify-between text-xs group-hover:opacity-100 opacity-0 transition-opacity">
                <span className="text-muted-foreground">📍 Kenkere House</span>
                <span className="text-primary">30%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strategy Section */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Core Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {strategies.slice(0, 6).map((strategy, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 bg-background/50 rounded-xl border"
                >
                  <div className="w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-foreground">{index + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{strategy}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ExecutiveSummary;
