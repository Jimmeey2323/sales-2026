import React from 'react';
import { AlertTriangle, Shield, TrendingDown, CheckCircle } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import Badge from './ui/Badge';
import { RiskItem, h1Risks, h2Risks } from '../data/salesData';

interface RiskAssessmentProps {
  activeFilter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL';
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ activeFilter }) => {
  // Map quarters to halves for risk data (we can keep the existing risk structure)
  const getHalf = (filter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL') => {
    if (filter === 'ALL') return 'ALL';
    return (filter === 'Q1' || filter === 'Q2') ? 'H1' : 'H2';
  };
  
  const halfFilter = getHalf(activeFilter);
  const risks = halfFilter === 'H1' ? h1Risks : halfFilter === 'H2' ? h2Risks : [...h1Risks, ...h2Risks];

  const getProbabilityColor = (prob: string) => {
    switch (prob.toLowerCase()) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <GlassCard className="p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-rose-500" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1a2332]">Risk Assessment</h2>
          <p className="text-sm text-slate-500">Potential challenges and mitigation strategies</p>
        </div>
      </div>

      <div className="space-y-4">
        {risks.map((risk, index) => (
          <div 
            key={index}
            className="p-5 bg-slate-50/80 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
              <h3 className="font-semibold text-[#1a2332] flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-rose-500" />
                {risk.risk}
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant={getProbabilityColor(risk.probability) as any} size="sm">
                  {risk.probability} Probability
                </Badge>
                <Badge variant={getImpactColor(risk.impact) as any} size="sm">
                  {risk.impact} Impact
                </Badge>
              </div>
            </div>
            
            <div className="flex items-start gap-2 text-sm text-slate-600 bg-white/60 p-3 rounded-lg">
              <Shield className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <p>{risk.mitigation}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default RiskAssessment;
