import React, { useState } from 'react';
import { Calendar, Target, TrendingUp, MapPin, Building, Sparkles, Plus, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import Badge from './ui/Badge';
import OfferCard from './OfferCard';
import Modal from './ui/Modal';
import AnniversaryBanner from './AnniversaryBanner';
import AISummary from './AISummary';
import AIOfferGenerator from './AIOfferGenerator';
import { MonthData, Offer, formatCurrency, formatCurrencyFull } from '../data/salesData';

interface MonthlySectionProps {
  monthData: MonthData;
  offers: Offer[];
  onEditOffer: (offer: Offer) => void;
  onDeleteOffer: (id: string) => void;
  onSaveNote: (id: string, note: string) => void;
  onAddOffer: (month: string, offer: Omit<Offer, 'id'>) => void;
  onToggleCancelled?: (id: string) => void;
  onConfirm?: (id: string) => void;
  selectedOffers?: Set<string>;
  onSelectOffer?: (id: string) => void;
  showCancelled?: boolean;
  activeMonth?: string;
}

const MonthlySection: React.FC<MonthlySectionProps> = ({ 
  monthData, 
  offers,
  onEditOffer, 
  onDeleteOffer, 
  onSaveNote,
  onAddOffer,
  onToggleCancelled,
  onConfirm,
  selectedOffers = new Set(),
  onSelectOffer,
  showCancelled = false,
  activeMonth
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newOffer, setNewOffer] = useState<Omit<Offer, 'id'>>({
    offerType: 'New Member',
    offerName: '',
    audience: '',
    packageMechanics: '',
    pricingBreakdown: '',
    whyItWorks: ''
  });

  // Filter offers based on showCancelled toggle
  const visibleOffers = offers.filter(offer => {
    if (showCancelled) return true; // Show all when toggle is on
    return !offer.isCancelled; // Hide cancelled when toggle is off
  });

  const growthPercent = Math.round(((monthData.target - monthData.historicBaseline) / monthData.historicBaseline) * 100);

  const handleAddOffer = () => {
    if (newOffer.offerName && newOffer.packageMechanics) {
      onAddOffer(monthData.month, newOffer);
      setNewOffer({
        offerType: 'New Member',
        offerName: '',
        audience: '',
        packageMechanics: '',
        pricingBreakdown: '',
        whyItWorks: ''
      });
      setIsAddModalOpen(false);
    }
  };

  return (
    <section id={monthData.month.toLowerCase()} className="scroll-mt-24">
      {/* Anniversary Banner - Only show for April */}
      {monthData.month === 'April' && monthData.isAnniversary && (
        <div className="mb-6">
          <AnniversaryBanner />
        </div>
      )}
      
      {/* Month Header */}
      <Card className={`relative overflow-hidden mb-6 shadow-md hover:shadow-lg transition-shadow ${monthData.isAnniversary ? 'bg-gradient-to-r from-amber-50 via-amber-50/50 to-yellow-50/50' : ''}`}>
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left: Month Info */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5`}>
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{monthData.month} 2026</h2>
                    {monthData.isAnniversary && (
                      <Badge variant="default" size="md">
                        <Sparkles className="w-3 h-3 mr-1" />
                        8th Anniversary
                      </Badge>
                    )}
                  </div>
                  <p className={`text-sm text-muted-foreground`}>{monthData.theme}</p>
                </div>
              </div>
              
              <p className={`text-sm text-muted-foreground max-w-xl`}>
                {monthData.context}
              </p>
            </div>

            {/* Right: Targets */}
            <div className="flex flex-wrap gap-4">
              <div className={`px-5 py-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20`}>
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Target</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-foreground">{formatCurrency(monthData.target)}</p>
              </div>
              
              <div className={`px-5 py-3 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-50/50 border border-emerald-200`}>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Growth</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-emerald-600">+{growthPercent}%</p>
              </div>
            </div>
          </div>

          {/* Location Targets */}
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border/50">
            <div className="flex flex-col gap-1 px-4 py-2 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground font-semibold">Mumbai: {formatCurrency(monthData.mumbaiTarget)}</span>
              </div>
              <span className="text-xs text-muted-foreground ml-6">Last Year: {formatCurrency(monthData.mumbaiLastYear)}</span>
            </div>
            <div className="flex flex-col gap-1 px-4 py-2 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground font-semibold">Bengaluru: {formatCurrency(monthData.bengaluruTarget)}</span>
              </div>
              <span className="text-xs text-muted-foreground ml-6">Last Year: {formatCurrency(monthData.bengaluruLastYear)}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 rounded-lg">
              <span className="text-sm text-muted-foreground">Focus: <span className="text-foreground font-medium">{monthData.focus}</span></span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Summary Component */}
      <AISummary 
        monthData={monthData} 
        offers={visibleOffers}
      />

      {/* AI Offer Generator */}
      <AIOfferGenerator
        monthData={monthData}
        currentOffers={visibleOffers}
        onOfferGenerated={() => {
          // Force refresh by calling parent's onAddOffer callback
          // This will trigger a re-fetch from the database
          window.location.reload(); // Simple solution for now
        }}
      />

      {/* Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="relative shadow-lg bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-3xl"></div>
          <CardContent className="p-5 relative z-10">
            <div className="flex items-start gap-3 mb-3">
              <Badge className="bg-primary text-primary-foreground">Hero</Badge>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Hero Offer</h3>
            <p className="text-muted-foreground">{monthData.heroOffer}</p>
          </CardContent>
        </Card>
        
        <Card className="relative shadow-lg bg-gradient-to-br from-destructive/10 via-destructive/5 to-background border-2 border-destructive/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-bl-3xl"></div>
          <CardContent className="p-5 relative z-10">
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <h3 className="font-semibold text-foreground">Pricing Note</h3>
            </div>
            <p className="text-muted-foreground">{monthData.pricingNote}</p>
          </CardContent>
        </Card>
      </div>

      {/* Offers Section */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Strategic Offers ({visibleOffers.length})</h3>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Offer
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {visibleOffers.map((offer, index) => (
          <div key={offer.id} className="relative">
            <div className="absolute -top-3 -left-3 z-10 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-lg">
              {index + 1}
            </div>
            <OfferCard
              offer={offer}
              onEdit={onEditOffer}
              onDelete={onDeleteOffer}
              onSaveNote={onSaveNote}
              onToggleCancelled={onToggleCancelled}
              onConfirm={onConfirm}
              isSelected={selectedOffers.has(offer.id)}
              onSelect={onSelectOffer}
            />
          </div>
        ))}
      </div>

      {/* Add Offer Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={`Add New Offer - ${monthData.month}`}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Offer Type</label>
            <select
              value={newOffer.offerType}
              onChange={(e) => setNewOffer({ ...newOffer, offerType: e.target.value })}
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
            >
              <option value="New Member">New Member</option>
              <option value="Lapsed">Lapsed</option>
              <option value="Upsell">Upsell</option>
              <option value="Innovative">Innovative</option>
              <option value="HERO OFFER">HERO OFFER</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Offer Name *</label>
            <input
              type="text"
              value={newOffer.offerName}
              onChange={(e) => setNewOffer({ ...newOffer, offerName: e.target.value })}
              placeholder="e.g., Resolution 2026 Bundle"
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Target Audience</label>
            <input
              type="text"
              value={newOffer.audience}
              onChange={(e) => setNewOffer({ ...newOffer, audience: e.target.value })}
              placeholder="e.g., New Leads, Lapsed Members"
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Package / Mechanics *</label>
            <textarea
              value={newOffer.packageMechanics}
              onChange={(e) => setNewOffer({ ...newOffer, packageMechanics: e.target.value })}
              placeholder="Describe the package details..."
              rows={2}
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Pricing Breakdown</label>
            <input
              type="text"
              value={newOffer.pricingBreakdown}
              onChange={(e) => setNewOffer({ ...newOffer, pricingBreakdown: e.target.value })}
              placeholder="e.g., Rack: ₹50,750 | VAT: ₹2,537 | Final: ₹53,288"
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Why It Works</label>
            <textarea
              value={newOffer.whyItWorks}
              onChange={(e) => setNewOffer({ ...newOffer, whyItWorks: e.target.value })}
              placeholder="Explain the strategy behind this offer..."
              rows={2}
              className="w-.full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="px-5 py-2.5 text-muted-foreground font-medium rounded-xl hover:bg-muted/50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddOffer}
              disabled={!newOffer.offerName || !newOffer.packageMechanics}
              className="px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Offer
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default MonthlySection;
