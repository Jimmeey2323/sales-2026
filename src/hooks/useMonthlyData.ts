import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { MonthData } from '../data/salesData';

interface MonthlyTarget {
  id: string;
  month: string;
  year: number;
  quarter: string;
  target_revenue: number;
  historic_baseline: number;
  last_year_revenue: number;
  mumbai_target: number;
  mumbai_last_year: number;
  bengaluru_target: number;
  bengaluru_last_year: number;
  theme: string;
  hero_offer: string;
  focus: string;
  context: string;
  pricing_note: string;
  is_anniversary: boolean;
}

const getShortMonth = (month: string): string => {
  return month.substring(0, 3);
};

const getHalf = (quarter: string): 'H1' | 'H2' => {
  return quarter === 'Q1' || quarter === 'Q2' ? 'H1' : 'H2';
};

export const useMonthlyData = () => {
  const [monthlyData, setMonthlyData] = useState<MonthData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMonthlyData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('monthly_targets')
        .select('*')
        .eq('year', 2026)
        .order('id', { ascending: true });

      if (fetchError) {
        console.error('Error fetching monthly targets:', fetchError);
        setError('Failed to load monthly targets from database.');
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        // Define month order
        const monthOrder = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Convert database format to MonthData format
        const formattedData: MonthData[] = data
          .map((target: MonthlyTarget) => ({
            month: target.month,
            shortMonth: getShortMonth(target.month),
            target: target.target_revenue,
            historicBaseline: target.historic_baseline,
            lastYearRevenue: target.last_year_revenue,
            mumbaiTarget: target.mumbai_target,
            mumbaiLastYear: target.mumbai_last_year,
            bengaluruTarget: target.bengaluru_target,
            bengaluruLastYear: target.bengaluru_last_year,
            theme: target.theme,
            heroOffer: target.hero_offer,
            focus: target.focus,
            context: target.context,
            pricingNote: target.pricing_note,
            offers: [], // Offers are managed separately by useOffers hook
            isAnniversary: target.is_anniversary,
            half: getHalf(target.quarter),
            quarter: target.quarter as 'Q1' | 'Q2' | 'Q3' | 'Q4'
          }))
          .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

        setMonthlyData(formattedData);
      } else {
        setError('No monthly targets found. Please run the migration script.');
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching monthly data:', err);
      setError('An unexpected error occurred while loading monthly data.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMonthlyData();
  }, [fetchMonthlyData]);

  return {
    monthlyData,
    loading,
    error,
    refreshMonthlyData: fetchMonthlyData
  };
};
