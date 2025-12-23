import React, { useState, useEffect } from 'react';
import Modal from './ui/Modal';
import { Offer } from '../data/salesData';

interface EditOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: Offer | null;
  onSave: (offer: Offer) => void;
}

const EditOfferModal: React.FC<EditOfferModalProps> = ({ isOpen, onClose, offer, onSave }) => {
  const [editedOffer, setEditedOffer] = useState<Offer | null>(null);

  useEffect(() => {
    if (offer) {
      setEditedOffer({ ...offer });
    }
  }, [offer]);

  if (!editedOffer) return null;

  const handleSave = () => {
    if (editedOffer.offerName && editedOffer.packageMechanics) {
      onSave(editedOffer);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Offer"
      size="lg"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Offer Type</label>
          <select
            value={editedOffer.offerType}
            onChange={(e) => setEditedOffer({ ...editedOffer, offerType: e.target.value })}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a2332]/20 focus:border-[#1a2332] bg-white"
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
            value={editedOffer.offerName}
            onChange={(e) => setEditedOffer({ ...editedOffer, offerName: e.target.value })}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a2332]/20 focus:border-[#1a2332]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
          <input
            type="text"
            value={editedOffer.audience}
            onChange={(e) => setEditedOffer({ ...editedOffer, audience: e.target.value })}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a2332]/20 focus:border-[#1a2332]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Package / Mechanics *</label>
          <textarea
            value={editedOffer.packageMechanics}
            onChange={(e) => setEditedOffer({ ...editedOffer, packageMechanics: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a2332]/20 focus:border-[#1a2332] resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Pricing Breakdown</label>
          <input
            type="text"
            value={editedOffer.pricingBreakdown}
            onChange={(e) => setEditedOffer({ ...editedOffer, pricingBreakdown: e.target.value })}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a2332]/20 focus:border-[#1a2332]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Why It Works</label>
          <textarea
            value={editedOffer.whyItWorks}
            onChange={(e) => setEditedOffer({ ...editedOffer, whyItWorks: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a2332]/20 focus:border-[#1a2332] resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-slate-600 font-medium rounded-xl hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!editedOffer.offerName || !editedOffer.packageMechanics}
            className="px-5 py-2.5 bg-[#1a2332] text-white font-medium rounded-xl hover:bg-[#2d3a4f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditOfferModal;
