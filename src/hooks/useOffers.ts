import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { monthlyData, Offer } from '../data/salesData';

interface StoredOffer {
  id: string;
  month: string;
  year: number;
  offer_type: string;
  offer_name: string;
  audience: string | null;
  package_mechanics: string | null;
  pricing_breakdown: string | null;
  why_it_works: string | null;
  notes: string | null;
  is_active: boolean;
}

export const useOffers = () => {
  const [offers, setOffers] = useState<Record<string, Offer[]>>({});
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Initialize offers from static data and merge with database
  const initializeOffers = useCallback(async () => {
    try {
      // First, get all offers from database
      const { data: dbOffers, error } = await supabase
        .from('sales_offers')
        .select('*')
        .eq('year', 2026)
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching offers:', error);
        // Fall back to static data
        const staticOffers: Record<string, Offer[]> = {};
        monthlyData.forEach(month => {
          staticOffers[month.month] = month.offers;
        });
        setOffers(staticOffers);
        setLoading(false);
        return;
      }

      // If database has offers, use them; otherwise use static data
      if (dbOffers && dbOffers.length > 0) {
        const groupedOffers: Record<string, Offer[]> = {};
        
        dbOffers.forEach((offer: StoredOffer) => {
          if (!groupedOffers[offer.month]) {
            groupedOffers[offer.month] = [];
          }
          groupedOffers[offer.month].push({
            id: offer.id,
            offerType: offer.offer_type,
            offerName: offer.offer_name,
            audience: offer.audience || '',
            packageMechanics: offer.package_mechanics || '',
            pricingBreakdown: offer.pricing_breakdown || '',
            whyItWorks: offer.why_it_works || '',
            notes: offer.notes || '',
            isCancelled: (offer as any).is_cancelled || false
          });
        });

        // Fill in any missing months with static data
        monthlyData.forEach(month => {
          if (!groupedOffers[month.month]) {
            groupedOffers[month.month] = month.offers;
          }
        });

        setOffers(groupedOffers);
      } else {
        // Initialize database with static data
        const allOffers: any[] = [];
        monthlyData.forEach(month => {
          month.offers.forEach(offer => {
            allOffers.push({
              month: month.month,
              year: 2026,
              offer_type: offer.offerType,
              offer_name: offer.offerName,
              audience: offer.audience,
              package_mechanics: offer.packageMechanics,
              pricing_breakdown: offer.pricingBreakdown,
              why_it_works: offer.whyItWorks,
              notes: offer.notes || null,
              is_active: true
            });
          });
        });

        const { error: insertError } = await supabase
          .from('sales_offers')
          .insert(allOffers);

        if (insertError) {
          console.error('Error inserting offers:', insertError);
        }

        // Fetch the newly inserted offers
        const { data: newOffers } = await supabase
          .from('sales_offers')
          .select('*')
          .eq('year', 2026)
          .eq('is_active', true);

        if (newOffers) {
          const groupedOffers: Record<string, Offer[]> = {};
          newOffers.forEach((offer: StoredOffer) => {
            if (!groupedOffers[offer.month]) {
              groupedOffers[offer.month] = [];
            }
            groupedOffers[offer.month].push({
              id: offer.id,
              offerType: offer.offer_type,
              offerName: offer.offer_name,
              audience: offer.audience || '',
              packageMechanics: offer.package_mechanics || '',
              pricingBreakdown: offer.pricing_breakdown || '',
              whyItWorks: offer.why_it_works || '',
              notes: offer.notes || ''
            });
          });
          setOffers(groupedOffers);
        } else {
          // Fall back to static data
          const staticOffers: Record<string, Offer[]> = {};
          monthlyData.forEach(month => {
            staticOffers[month.month] = month.offers;
          });
          setOffers(staticOffers);
        }
      }

      setInitialized(true);
    } catch (err) {
      console.error('Error initializing offers:', err);
      // Fall back to static data
      const staticOffers: Record<string, Offer[]> = {};
      monthlyData.forEach(month => {
        staticOffers[month.month] = month.offers;
      });
      setOffers(staticOffers);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeOffers();
  }, [initializeOffers]);

  // Add new offer
  const addOffer = async (month: string, offer: Omit<Offer, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('sales_offers')
        .insert({
          month,
          year: 2026,
          offer_type: offer.offerType,
          offer_name: offer.offerName,
          audience: offer.audience,
          package_mechanics: offer.packageMechanics,
          pricing_breakdown: offer.pricingBreakdown,
          why_it_works: offer.whyItWorks,
          notes: null,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;

      const newOffer: Offer = {
        id: data.id,
        offerType: data.offer_type,
        offerName: data.offer_name,
        audience: data.audience || '',
        packageMechanics: data.package_mechanics || '',
        pricingBreakdown: data.pricing_breakdown || '',
        whyItWorks: data.why_it_works || '',
        notes: data.notes || ''
      };

      setOffers(prev => ({
        ...prev,
        [month]: [...(prev[month] || []), newOffer]
      }));

      return newOffer;
    } catch (err) {
      console.error('Error adding offer:', err);
      // Add locally as fallback
      const newOffer: Offer = {
        id: `local-${Date.now()}`,
        ...offer
      };
      setOffers(prev => ({
        ...prev,
        [month]: [...(prev[month] || []), newOffer]
      }));
      return newOffer;
    }
  };

  // Update offer
  const updateOffer = async (offer: Offer) => {
    try {
      const { error } = await supabase
        .from('sales_offers')
        .update({
          offer_type: offer.offerType,
          offer_name: offer.offerName,
          audience: offer.audience,
          package_mechanics: offer.packageMechanics,
          pricing_breakdown: offer.pricingBreakdown,
          why_it_works: offer.whyItWorks,
          updated_at: new Date().toISOString()
        })
        .eq('id', offer.id);

      if (error) throw error;

      setOffers(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(month => {
          updated[month] = updated[month].map(o => 
            o.id === offer.id ? offer : o
          );
        });
        return updated;
      });
    } catch (err) {
      console.error('Error updating offer:', err);
      // Update locally as fallback
      setOffers(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(month => {
          updated[month] = updated[month].map(o => 
            o.id === offer.id ? offer : o
          );
        });
        return updated;
      });
    }
  };

  // Delete offer (soft delete)
  const deleteOffer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('sales_offers')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      setOffers(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(month => {
          updated[month] = updated[month].filter(o => o.id !== id);
        });
        return updated;
      });
    } catch (err) {
      console.error('Error deleting offer:', err);
      // Delete locally as fallback
      setOffers(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(month => {
          updated[month] = updated[month].filter(o => o.id !== id);
        });
        return updated;
      });
    }
  };

  // Save note
  const saveNote = async (id: string, note: string) => {
    try {
      const { error } = await supabase
        .from('sales_offers')
        .update({ 
          notes: note,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      setOffers(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(month => {
          updated[month] = updated[month].map(o => 
            o.id === id ? { ...o, notes: note } : o
          );
        });
        return updated;
      });
    } catch (err) {
      console.error('Error saving note:', err);
      // Save locally as fallback
      setOffers(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(month => {
          updated[month] = updated[month].map(o => 
            o.id === id ? { ...o, notes: note } : o
          );
        });
        return updated;
      });
    }
  };

  // Toggle cancelled status
  const toggleCancelled = async (id: string) => {
    // First find the current cancelled status
    let currentStatus = false;
    Object.values(offers).forEach(monthOffers => {
      const offer = monthOffers.find(o => o.id === id);
      if (offer) currentStatus = offer.isCancelled || false;
    });
    
    const newStatus = !currentStatus;
    
    try {
      const { error } = await supabase
        .from('sales_offers')
        .update({ 
          is_cancelled: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      setOffers(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(month => {
          updated[month] = updated[month].map(o => 
            o.id === id ? { ...o, isCancelled: newStatus } : o
          );
        });
        return updated;
      });
    } catch (err) {
      console.error('Error toggling cancelled status:', err);
      // Update locally as fallback
      setOffers(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(month => {
          updated[month] = updated[month].map(o => 
            o.id === id ? { ...o, isCancelled: newStatus } : o
          );
        });
        return updated;
      });
    }
  };

  return {
    offers,
    loading,
    addOffer,
    updateOffer,
    deleteOffer,
    saveNote,
    toggleCancelled
  };
};
