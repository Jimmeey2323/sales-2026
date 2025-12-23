import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Offer } from '../data/salesData';

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
  is_cancelled: boolean;
  confirmed?: boolean;
}

export const useOffers = () => {
  const [offers, setOffers] = useState<Record<string, Offer[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize offers from Supabase only - single source of truth
  const initializeOffers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all offers from Supabase
      const { data: dbOffers, error: fetchError } = await supabase
        .from('sales_offers')
        .select('*')
        .eq('year', 2026)
        .eq('is_active', true)
        .order('created_at', { ascending: true });

      if (fetchError) {
        console.error('Error fetching offers from Supabase:', fetchError);
        console.error('Error details:', JSON.stringify(fetchError, null, 2));
        setError(`Failed to load offers: ${fetchError.message || 'Database connection error'}`);
        setLoading(false);
        return;
      }

      // Group offers by month
      const groupedOffers: Record<string, Offer[]> = {};
      
      if (dbOffers && dbOffers.length > 0) {
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
            isCancelled: offer.is_cancelled || false,
            confirmed: offer.confirmed || false
          });
        });
      }

      setOffers(groupedOffers);
      setLoading(false);
    } catch (err) {
      console.error('Error initializing offers:', err);
      setError('An unexpected error occurred while loading offers.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeOffers();
  }, [initializeOffers]);

  // Add new offer - always persists to Supabase
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
          is_active: true,
          is_cancelled: false
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding offer to Supabase:', error);
        throw new Error('Failed to add offer. Please try again.');
      }

      const newOffer: Offer = {
        id: data.id,
        offerType: data.offer_type,
        offerName: data.offer_name,
        audience: data.audience || '',
        packageMechanics: data.package_mechanics || '',
        pricingBreakdown: data.pricing_breakdown || '',
        whyItWorks: data.why_it_works || '',
        notes: data.notes || '',
        isCancelled: false
      };

      // Update local state
      setOffers(prev => ({
        ...prev,
        [month]: [...(prev[month] || []), newOffer]
      }));

      return newOffer;
    } catch (err) {
      console.error('Error adding offer:', err);
      throw err;
    }
  };

  // Update offer - always persists to Supabase
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

      if (error) {
        console.error('Error updating offer in Supabase:', error);
        throw new Error('Failed to update offer. Please try again.');
      }

      // Update local state
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
      throw err;
    }
  };

  // Delete offer (soft delete) - always persists to Supabase
  const deleteOffer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('sales_offers')
        .update({ 
          is_active: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        console.error('Error deleting offer in Supabase:', error);
        throw new Error('Failed to delete offer. Please try again.');
      }

      // Update local state
      setOffers(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(month => {
          updated[month] = updated[month].filter(o => o.id !== id);
        });
        return updated;
      });
    } catch (err) {
      console.error('Error deleting offer:', err);
      throw err;
    }
  };

  // Save note - always persists to Supabase
  const saveNote = async (id: string, note: string) => {
    try {
      const { error } = await supabase
        .from('sales_offers')
        .update({ 
          notes: note,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        console.error('Error saving note in Supabase:', error);
        throw new Error('Failed to save note. Please try again.');
      }

      // Update local state
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
      throw err;
    }
  };

  // Toggle cancelled status - always persists to Supabase
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

      if (error) {
        console.error('Error toggling cancelled status in Supabase:', error);
        throw new Error('Failed to update offer status. Please try again.');
      }

      // Update local state
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
      throw err;
    }
  };

  // Confirm offer - similar to toggleCancelled but for confirmed status
  const confirmOffer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('sales_offers')
        .update({ 
          confirmed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        console.error('Error confirming offer in Supabase:', error);
        throw new Error('Failed to confirm offer. Please try again.');
      }

      // Update local state
      setOffers(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(month => {
          updated[month] = updated[month].map(o => 
            o.id === id ? { ...o, confirmed: true } : o
          );
        });
        return updated;
      });
    } catch (err) {
      console.error('Error confirming offer:', err);
      throw err;
    }
  };

  return {
    offers,
    loading,
    error,
    addOffer,
    updateOffer,
    deleteOffer,
    saveNote,
    toggleCancelled,
    confirmOffer,
    refreshOffers: initializeOffers
  };
};
