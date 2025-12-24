import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, LineChart as LineChartIcon } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { MonthData, formatCurrency } from '../data/salesData';

interface RevenueChartProps {
  data: MonthData[];
  activeFilter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL';
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, activeFilter }) => {
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');
  
  const filteredData = activeFilter === 'ALL' 
    ? data 
    : data.filter(m => m.quarter === activeFilter);

  const chartData = filteredData.map(month => ({
    name: month.shortMonth,
    fullName: month.month,
    target: month.target / 100000, // Convert to lakhs for better visualization
    baseline: month.historicBaseline / 100000,
    mumbai: month.mumbaiTarget / 100000,
    bengaluru: month.bengaluruTarget / 100000,
    growth: Math.round(((month.target - month.historicBaseline) / month.historicBaseline) * 100),
  }));

  const totalTarget = filteredData.reduce((sum, m) => sum + m.target, 0);
  const totalBaseline = filteredData.reduce((sum, m) => sum + m.historicBaseline, 0);
  const overallGrowth = Math.round(((totalTarget - totalBaseline) / totalBaseline) * 100);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-xl border-2 border-primary/30 rounded-xl p-4 shadow-2xl">
          <p className="font-bold text-white mb-2">{payload[0]?.payload.fullName} 2026</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-blue-300">Target:</span>
              <span className="text-sm font-bold text-blue-400">{formatCurrency(payload[0]?.payload.target * 100000)}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-300">Baseline:</span>
              <span className="text-sm font-semibold text-slate-400">{formatCurrency(payload[0]?.payload.baseline * 100000)}</span>
            </div>
            <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/10">
              <span className="text-xs text-emerald-300">Growth:</span>
              <span className="text-sm font-bold text-emerald-400">+{payload[0]?.payload.growth}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800 border-2 border-primary/10 shadow-xl">
      <CardContent className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/30">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground">Revenue Analytics</h2>
                <p className="text-sm text-muted-foreground">Interactive monthly performance visualization</p>
              </div>
            </div>
          </div>
          
          {/* Chart Type Toggle */}
          <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg">
            <button
              onClick={() => setChartType('area')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                chartType === 'area' 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LineChartIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Area</span>
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                chartType === 'bar' 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm font-medium">Bar</span>
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-primary/10 to-blue-500/5 backdrop-blur-sm border border-primary/20 rounded-xl p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Target</div>
            <div className="text-2xl font-black text-primary">{formatCurrency(totalTarget)}</div>
          </div>
          <div className="bg-gradient-to-br from-slate-500/10 to-slate-600/5 backdrop-blur-sm border border-slate-500/20 rounded-xl p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Baseline</div>
            <div className="text-2xl font-black text-slate-600 dark:text-slate-400">{formatCurrency(totalBaseline)}</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500/10 to-green-600/5 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Growth
            </div>
            <div className="text-2xl font-black text-emerald-600">+{overallGrowth}%</div>
          </div>
        </div>

        {/* Chart */}
        <div className="relative">
          {chartType === 'area' ? (
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.1}/>
                  </linearGradient>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3"/>
                  </filter>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="hsl(var(--border))" 
                  opacity={0.3}
                  vertical={false}
                />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickFormatter={(value) => `₹${value}L`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-sm font-medium text-muted-foreground">
                      {value === 'target' ? '2026 Target' : '2025 Baseline'}
                    </span>
                  )}
                />
                <Area
                  type="monotone"
                  dataKey="baseline"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  fill="url(#colorBaseline)"
                  filter="url(#shadow)"
                  animationDuration={800}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fill="url(#colorTarget)"
                  filter="url(#shadow)"
                  animationDuration={1000}
                  animationBegin={200}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', r: 5 }}
                  activeDot={{ r: 8, fill: 'hsl(var(--primary))' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="barTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.7}/>
                  </linearGradient>
                  <linearGradient id="barBaseline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={1}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.7}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="hsl(var(--border))" 
                  opacity={0.3}
                  vertical={false}
                />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickFormatter={(value) => `₹${value}L`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-sm font-medium text-muted-foreground">
                      {value === 'target' ? '2026 Target' : '2025 Baseline'}
                    </span>
                  )}
                />
                <Bar 
                  dataKey="baseline" 
                  fill="url(#barBaseline)"
                  radius={[8, 8, 0, 0]}
                  animationDuration={800}
                />
                <Bar 
                  dataKey="target" 
                  fill="url(#barTarget)"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1000}
                  animationBegin={200}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-blue-600" />
            <span className="text-sm font-medium text-muted-foreground">2026 Target</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-slate-400" />
            <span className="text-sm font-medium text-muted-foreground">2025 Baseline</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
