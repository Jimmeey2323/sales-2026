import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, ChevronDown, ChevronUp, Zap, RefreshCw } from 'lucide-react';
import { generateMonthlySummary } from '../lib/openai';
import { MonthData, Offer } from '../data/salesData';
import { useAppContext } from '../contexts/AppContext';
import { supabase } from '../lib/supabase';

// Inline Badge component
const StatusBadge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-medium ${className}`}>
    {children}
  </span>
);

interface AISummaryProps {
  monthData: MonthData;
  offers: Offer[];
}

const AISummary: React.FC<AISummaryProps> = ({ monthData, offers }) => {
  const { setAISummary } = useAppContext();
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadingExisting, setLoadingExisting] = useState(true);

  // Load existing summary from database
  useEffect(() => {
    const loadExistingSummary = async () => {
      try {
        const { data, error } = await supabase
          .from('ai_summaries')
          .select('summary')
          .eq('month', monthData.month)
          .eq('year', 2026)
          .single();

        if (data && !error) {
          setSummary(data.summary);
          setAISummary(monthData.month, data.summary);
          setIsExpanded(false);
        }
      } catch (error) {
        console.log('No existing summary found');
      } finally {
        setLoadingExisting(false);
      }
    };

    loadExistingSummary();
  }, [monthData.month]);

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    try {
      const aiSummary = await generateMonthlySummary({
        month: monthData.month,
        theme: monthData.theme,
        context: monthData.context,
        target: monthData.target,
        offers: offers.map(o => ({
          offerName: o.offerName,
          offerType: o.offerType,
          audience: o.audience,
        })),
      });

      // Save to database
      const { error } = await supabase
        .from('ai_summaries')
        .upsert({
          month: monthData.month,
          year: 2026,
          summary: aiSummary,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'month,year'
        });

      if (error) {
        console.error('Error saving summary:', error);
      }

      setSummary(aiSummary);
      setAISummary(monthData.month, aiSummary); // Save to context for PDF export
      setIsExpanded(true);
    } catch (error) {
      console.error('Failed to generate AI summary:', error);
      setSummary('Unable to generate AI summary at this time. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingExisting) {
    return (
      <div className="mb-6 p-6 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-2xl border border-primary/20">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading saved analysis...</span>
        </div>
      </div>
    );
  }

  if (!summary && !isLoading) {
    return (
      <div className="mb-6 p-6 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-2xl border-2 border-primary/20 border-dashed">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                AI Strategic Analysis
                <StatusBadge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs">Beta</StatusBadge>
              </h3>
              <p className="text-sm text-muted-foreground">
                Get intelligent insights and recommendations for {monthData.month}
              </p>
            </div>
          </div>
          <button
            onClick={handleGenerateSummary}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary/80 text-white font-medium rounded-xl hover:shadow-lg hover:scale-105 transition-all"
          >
            <Zap className="w-4 h-4" />
            Generate Analysis
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mb-6 p-8 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-2xl border border-primary/20">
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
          <span className="text-foreground font-medium">AI is analyzing {monthData.month} strategy...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div 
        className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20 hover:shadow-md transition-all"
      >
        <div className="flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-3 flex-1 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                AI Strategic Analysis
                <StatusBadge className="bg-green-500/20 text-green-700 text-xs border border-green-500/30">Saved</StatusBadge>
                <StatusBadge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">Ready</StatusBadge>
              </h3>
              <p className="text-sm text-muted-foreground">
                {isExpanded ? 'Click to collapse' : 'Click to view detailed AI insights'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleGenerateSummary();
              }}
              className="px-3 py-1.5 text-xs bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-lg transition-colors"
            >
              Regenerate
            </button>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-primary/20 animate-fade-in">
            <div className="prose prose-sm max-w-none">
              <div className="text-foreground/90 leading-relaxed whitespace-pre-line bg-background/50 rounded-xl p-6 border border-border/50">
                {summary}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISummary;
