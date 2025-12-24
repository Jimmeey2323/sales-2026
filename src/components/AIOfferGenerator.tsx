import React, { useState } from 'react';
import { Sparkles, Loader2, Lightbulb, TrendingUp, Plus, X } from 'lucide-react';
import { generateCreativeOffer, GeneratedOffer } from '../lib/openai';
import { MonthData, Offer } from '../data/salesData';
import { supabase } from '../lib/supabase';
import { useToast } from '../hooks/use-toast';

interface AIOfferGeneratorProps {
  monthData: MonthData;
  currentOffers: Offer[];
  onOfferGenerated: () => void;
}

const AIOfferGenerator: React.FC<AIOfferGeneratorProps> = ({ 
  monthData, 
  currentOffers,
  onOfferGenerated 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOffer, setGeneratedOffer] = useState<GeneratedOffer | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();

  const handleGenerateOffer = async () => {
    setIsGenerating(true);
    try {
      const offer = await generateCreativeOffer({
        month: monthData.month,
        currentOffers: currentOffers.map(o => ({
          offerName: o.offerName,
          offerType: o.offerType,
          audience: o.audience,
        })),
        monthlyTarget: monthData.target,
        lastYearRevenue: monthData.lastYearRevenue,
        theme: monthData.theme,
        context: monthData.context,
      });

      setGeneratedOffer(offer);
      setShowModal(true);
    } catch (error) {
      console.error('Failed to generate offer:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate AI offer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddToOffers = async () => {
    if (!generatedOffer) return;

    try {
      // Save to ai_generated_offers table
      const { error: aiOfferError } = await supabase
        .from('ai_generated_offers')
        .insert({
          month: monthData.month,
          year: 2026,
          offer_type: generatedOffer.offerType,
          offer_name: generatedOffer.offerName,
          audience: generatedOffer.audience,
          package_mechanics: generatedOffer.packageMechanics,
          pricing_breakdown: generatedOffer.pricingBreakdown,
          why_it_works: generatedOffer.whyItWorks,
          ai_reasoning: generatedOffer.aiReasoning,
          is_implemented: true,
        });

      if (aiOfferError) {
        console.error('Error saving AI offer:', aiOfferError);
      }

      // Add to sales_offers table
      const { error: salesOfferError } = await supabase
        .from('sales_offers')
        .insert({
          month: monthData.month,
          year: 2026,
          offer_type: generatedOffer.offerType,
          offer_name: generatedOffer.offerName,
          audience: generatedOffer.audience,
          package_mechanics: generatedOffer.packageMechanics,
          pricing_breakdown: generatedOffer.pricingBreakdown,
          why_it_works: generatedOffer.whyItWorks,
          notes: `AI Generated: ${generatedOffer.aiReasoning.substring(0, 200)}...`,
          is_active: true,
          is_cancelled: false,
        });

      if (salesOfferError) {
        throw salesOfferError;
      }

      toast({
        title: "Offer Added Successfully",
        description: `"${generatedOffer.offerName}" has been added to ${monthData.month} offers.`,
      });

      setShowModal(false);
      setGeneratedOffer(null);
      onOfferGenerated();
    } catch (error) {
      console.error('Failed to add offer:', error);
      toast({
        title: "Failed to Add Offer",
        description: "An error occurred while saving the offer. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="mb-6 p-6 bg-gradient-to-br from-emerald-500/5 via-green-500/3 to-transparent rounded-2xl border-2 border-emerald-500/20 border-dashed">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                AI Offer Generator
                <span className="inline-flex items-center px-2 py-0.5 rounded-md font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                  Experimental
                </span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Let AI create a strategic offer tailored to {monthData.month}'s goals
              </p>
            </div>
          </div>
          <button
            onClick={handleGenerateOffer}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Creative Offer
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modal for Generated Offer */}
      {showModal && generatedOffer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1">AI-Generated Strategic Offer</h2>
                    <p className="text-emerald-100 text-sm">
                      Customized for {monthData.month} • Target: ₹{(monthData.target / 100000).toFixed(2)}L
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6 space-y-6">
              {/* AI Reasoning */}
              <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent rounded-xl p-5 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-foreground">Why AI Chose This Offer</h3>
                </div>
                <div className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed">
                  {generatedOffer.aiReasoning}
                </div>
              </div>

              {/* Offer Details */}
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Offer Name
                    </label>
                    <div className="text-lg font-semibold text-foreground bg-primary/5 rounded-lg px-4 py-2.5">
                      {generatedOffer.offerName}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Type
                    </label>
                    <div className="text-lg font-semibold text-foreground bg-primary/5 rounded-lg px-4 py-2.5">
                      {generatedOffer.offerType}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Target Audience
                  </label>
                  <div className="text-base text-foreground bg-blue-500/5 rounded-lg px-4 py-2.5 border border-blue-500/10">
                    {generatedOffer.audience}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Package Mechanics
                  </label>
                  <div className="text-sm text-foreground/90 bg-background border border-border rounded-lg p-4 leading-relaxed whitespace-pre-line">
                    {generatedOffer.packageMechanics}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Pricing Breakdown
                  </label>
                  <div className="text-sm text-foreground/90 bg-green-500/5 border border-green-500/20 rounded-lg p-4 leading-relaxed whitespace-pre-line">
                    {generatedOffer.pricingBreakdown}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Why It Works
                  </label>
                  <div className="text-sm text-foreground/90 bg-background border border-border rounded-lg p-4 leading-relaxed whitespace-pre-line">
                    {generatedOffer.whyItWorks}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t border-border p-6 bg-muted/30">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  This offer will be added to {monthData.month} and saved in your database
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddToOffers}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Offers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIOfferGenerator;
