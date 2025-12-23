import React, { useState } from 'react';
import { Calendar, Target, TrendingUp, MapPin, Building, Sparkles, Plus, AlertTriangle } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import Badge from './ui/Badge';
import OfferCard from './OfferCard';
import Modal from './ui/Modal';
import AnniversaryBanner from './AnniversaryBanner';
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
  onSelectOffer
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
      <div className={`relative overflow-hidden rounded-3xl mb-6 ${monthData.isAnniversary ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400' : 'bg-gradient-to-r from-[#1a2332] to-[#2d3a4f]'}`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left: Month Info */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl ${monthData.isAnniversary ? 'bg-white/30' : 'bg-white/10'} backdrop-blur-sm flex items-center justify-center`}>
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">{monthData.month} 2026</h2>
                    {monthData.isAnniversary && (
                      <Badge variant="hero" size="md">
                        <Sparkles className="w-3 h-3 mr-1" />
                        8th Anniversary
                      </Badge>
                    )}
                  </div>
                  <p className={`text-sm ${monthData.isAnniversary ? 'text-white/90' : 'text-white/70'}`}>{monthData.theme}</p>
                </div>
              </div>
              
              <p className={`text-sm ${monthData.isAnniversary ? 'text-white/90' : 'text-white/60'} max-w-xl`}>
                {monthData.context}
              </p>
            </div>

            {/* Right: Targets */}
            <div className="flex flex-wrap gap-4">
              <div className={`px-5 py-3 rounded-xl ${monthData.isAnniversary ? 'bg-white/30' : 'bg-white/10'} backdrop-blur-sm`}>
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-white/70" />
                  <span className="text-xs text-white/70 uppercase tracking-wider">Target</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white">{formatCurrency(monthData.target)}</p>
              </div>
              
              <div className={`px-5 py-3 rounded-xl ${monthData.isAnniversary ? 'bg-white/30' : 'bg-white/10'} backdrop-blur-sm`}>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-300" />
                  <span className="text-xs text-white/70 uppercase tracking-wider">Growth</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-emerald-300">+{growthPercent}%</p>
              </div>
            </div>
          </div>

          {/* Location Targets */}
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-white/20">
            <div className="flex flex-col gap-1 px-4 py-2 bg-white/10 rounded-lg">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-white/70" />
                <span className="text-sm text-white/90 font-semibold">Mumbai: {formatCurrency(monthData.mumbaiTarget)}</span>
              </div>
              <span className="text-xs text-white/60 ml-6">Last Year: {formatCurrency(monthData.mumbaiLastYear)}</span>
            </div>
            <div className="flex flex-col gap-1 px-4 py-2 bg-white/10 rounded-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-white/70" />
                <span className="text-sm text-white/90 font-semibold">Bengaluru: {formatCurrency(monthData.bengaluruTarget)}</span>
              </div>
              <span className="text-xs text-white/60 ml-6">Last Year: {formatCurrency(monthData.bengaluruLastYear)}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
              <span className="text-sm text-white/70">Focus: <span className="text-white">{monthData.focus}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-[#1a2332]">Hero Offer</h3>
          </div>
          <p className="text-slate-600">{monthData.heroOffer}</p>
        </GlassCard>
        
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <h3 className="font-semibold text-[#1a2332]">Pricing Note</h3>
          </div>
          <p className="text-slate-600">{monthData.pricingNote}</p>
        </GlassCard>
      </div>

      {/* Offers Section */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#1a2332]">Strategic Offers ({offers.length})</h3>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a2332] text-white text-sm font-medium rounded-xl hover:bg-[#2d3a4f] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Offer
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onEdit={onEditOffer}
            onDelete={onDeleteOffer}
            onSaveNote={onSaveNote}
            onToggleCancelled={onToggleCancelled}
            onConfirm={onConfirm}
            isSelected={selectedOffers.has(offer.id)}
            onSelect={onSelectOffer}
          />
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
            <label className="block text-sm font-medium text-slate-700 mb-1">Offer Type</label>
            <select
              value={newOffer.offerType}
              onChange={(e) => setNewOffer({ ...newOffer, offerType: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a2332]/20 focus:border-[#1a2332]"
            >
              <option value="New Member">New Member</option>
              <option value="Lapsed">Lapsed</option>
              <option value="Upsell">Upsell</option>
              <option value="Innovative">Innovative</option>
              <option value="HERO OFFER">HERO OFFER</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Offer Name *</label>
            <input
              type="text"
              value={newOffer.offerName}
              onChange={(e) => setNewOffer({ ...newOffer, offerName: e.target.value })}
              placeholder="e.g., Resolution 2026 Bundle"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a2332]/20 focus:border-[#1a2332]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
            <input
              type="text"
              value={newOffer.audience}
              onChange={(e) => setNewOffer({ ...newOffer, audience: e.target.value })}
              placeholder="e.g., New Leads, Lapsed Members"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a2332]/20 focus:border-[#1a2332]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Package / Mechanics *</label>
            <textarea
              value={newOffer.packageMechanics}
              onChange={(e) => setNewOffer({ ...newOffer, packageMechanics: e.target.value })}
              placeholder="Describe the package details..."
              rows={2}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a2332]/20 focus:border-[#1a2332] resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Pricing Breakdown</label>
            <input
              type="text"
              value={newOffer.pricingBreakdown}
              onChange={(e) => setNewOffer({ ...newOffer, pricingBreakdown: e.target.value })}
              placeholder="e.g., Rack: ₹50,750 | VAT: ₹2,537 | Final: ₹53,288"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a2332]/20 focus:border-[#1a2332]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Why It Works</label>
            <textarea
              value={newOffer.whyItWorks}
              onChange={(e) => setNewOffer({ ...newOffer, whyItWorks: e.target.value })}
              placeholder="Explain the strategy behind this offer..."
              rows={2}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a2332]/20 focus:border-[#1a2332] resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="px-5 py-2.5 text-slate-600 font-medium rounded-xl hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddOffer}
              disabled={!newOffer.offerName || !newOffer.packageMechanics}
              className="px-5 py-2.5 bg-[#1a2332] text-white font-medium rounded-xl hover:bg-[#2d3a4f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
