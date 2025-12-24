import React from 'react';
import { Calendar, Target, Sparkles, AlertCircle } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import Badge from './ui/Badge';
import { MonthData, formatCurrency } from '../data/salesData';

interface SummaryTableProps {
  data: MonthData[];
  activeFilter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL';
}

const SummaryTable: React.FC<SummaryTableProps> = ({ data, activeFilter }) => {
  const filteredData = activeFilter === 'ALL' 
    ? data 
    : data.filter(m => m.quarter === activeFilter);

  return (
    <GlassCard className="overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1a2332]/5 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-[#1a2332]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1a2332]">Sales Manager Cheat Sheet</h2>
            <p className="text-sm text-slate-500">Quick reference for monthly targets and strategies</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 border-b-2 border-primary/20">
              <th className="px-6 py-4 text-left text-xs font-semibold text-primary uppercase tracking-wider">Month</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-primary uppercase tracking-wider">Target</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-primary uppercase tracking-wider">Key Theme</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-primary uppercase tracking-wider">Hero Offer</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-primary uppercase tracking-wider">Pricing Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.map((month) => (
              <tr 
                key={month.month}
                className={`hover:bg-slate-50/50 transition-colors ${month.isAnniversary ? 'bg-amber-50/30' : ''}`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {month.isAnniversary && <Sparkles className="w-4 h-4 text-amber-500" />}
                    <span className={`font-semibold ${month.isAnniversary ? 'text-amber-700' : 'text-[#1a2332]'}`}>
                      {month.shortMonth}
                    </span>
                    <Badge variant={month.half === 'H1' ? 'info' : 'primary'} size="sm">
                      {month.half}
                    </Badge>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-[#1a2332]">{formatCurrency(month.target)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-700">{month.theme}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600">{month.heroOffer}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm text-rose-600">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{month.pricingNote}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};

export default SummaryTable;
