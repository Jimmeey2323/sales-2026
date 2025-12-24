import React from 'react';
import { TrendingUp, Target, MapPin, Sparkles, ArrowUpRight, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { h1Strategy, h2Strategy, formatCurrency, monthlyData } from '../data/salesData';
import StudioMediaCarousel from './StudioMediaCarousel';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

interface ExecutiveSummaryProps {
  activeFilter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL';
  heroImage: string;
  studioMedia?: MediaItem[];
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ activeFilter, heroImage, studioMedia }) => {
  // Default media if not provided
  const defaultMedia: MediaItem[] = [{ type: 'image', url: heroImage, alt: 'Physique 57 Studio' }];
  const mediaToDisplay = studioMedia && studioMedia.length > 0 ? studioMedia : defaultMedia;
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

  const progressToAnnual = annualTotal > 0 ? Math.min(100, Math.round((displayTarget / annualTotal) * 100)) : 0;
  const progressGrowth = Math.min(100, Math.max(0, growthPercent));
  const progressBaseline = annualBaseline > 0 ? Math.min(100, Math.round((displayBaseline / annualBaseline) * 100)) : 0;

  const MetricCard: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string;
    sub: string;
    progress: number;
    tooltip?: string;
  }> = ({ icon, label, value, sub, progress, tooltip }) => (
    <div className="glass-surface px-5 py-4 sm:px-6 sm:py-5 group relative">
      {tooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
          {tooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-foreground" />
        </div>
      )}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
            {icon}
          </span>
          <span className="font-semibold tracking-tight">{label}</span>
        </div>
        <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
      </div>

      <div className="mt-3">
        <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          {value}
        </div>
        <div className="mt-1 text-sm text-muted-foreground">{sub}</div>
      </div>

      <div className="mt-4 h-1.5 rounded-full bg-muted/60 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden">
      {/* Pastel backdrop + confetti dots (matches reference vibe) */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" aria-hidden="true" />
      <div className="absolute inset-0 confetti-bg opacity-60" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-12 sm:pb-16">
        {/* Top metric strip (reference-like) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <MetricCard
            icon={<Target className="w-4 h-4" />}
            label="Target"
            value={formatCurrency(displayTarget)}
            sub={`${activeFilter === 'ALL' ? '12' : '3'} month target`}
            progress={progressToAnnual}
            tooltip="Total revenue target based on selected period"
          />
          <MetricCard
            icon={<TrendingUp className="w-4 h-4" />}
            label="Growth"
            value={`+${growthPercent}%`}
            sub="Year over year" 
            progress={progressGrowth}
            tooltip="Growth rate compared to last year's baseline"
          />
          <MetricCard
            icon={<Target className="w-4 h-4" />}
            label="Baseline"
            value={formatCurrency(displayBaseline)}
            sub="Historic baseline" 
            progress={progressBaseline}
            tooltip="Last year's actual revenue for this period"
          />
        </div>

        {/* Headline + visual (two-column like reference) */}
        <div className="mt-10 sm:mt-12 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-surface w-fit">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                {activeFilter === 'ALL' ? 'Full Year' : activeFilter} Strategy
              </span>
            </div>

            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight gradient-heading">
              Sales Plan for Physique 57 India FY-2025–26
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              A clean, structured view of quarterly goals, monthly execution, and location-level targets — designed for quick scanning and confident action.
            </p>

            <ul className="mt-6 space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
                <span>Navigate by quarter or jump directly to a month, without losing context.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
                <span>Track target vs baseline and see growth signals at a glance.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
                <span>Keep Mumbai and Bengaluru targets visible while planning monthly offers.</span>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <div className="glass-btn px-3 py-1.5 flex items-center gap-2">
                <Building className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Mumbai: {formatCurrency(mumbaiTarget)}</span>
              </div>
              <div className="glass-btn px-3 py-1.5 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Bengaluru: {formatCurrency(bengaluruTarget)}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="glass-surface p-2 sm:p-3">
              <StudioMediaCarousel
                media={mediaToDisplay}
                autoPlayInterval={5000}
                className=""
              />
            </div>
          </div>
        </div>

        {/* Strategy Section */}
        <div className="mt-10 sm:mt-12">
          <Card className="glass-surface border-0">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Core Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {strategies.slice(0, 6).map((strategy, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-background/50 rounded-xl border border-border/40"
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
      </div>
    </section>
  );
};

export default ExecutiveSummary;
