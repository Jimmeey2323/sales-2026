import React, { useState, useEffect } from 'react';
import Modal from './ui/Modal';
import { Offer } from '../data/salesData';
import { getMembershipNames, getPricingByName, calculateFinalPrice, formatCurrency } from '../utils/pricingData';

interface EditOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: Offer | null;
  onSave: (offer: Offer) => void;
}

interface PricingBreakdown {
  membershipName: string;
  rackPrice: number;
  vatRate: number;
  discountPercent: number;
  finalPrice: number;
}

const EditOfferModal: React.FC<EditOfferModalProps> = ({ isOpen, onClose, offer, onSave }) => {
  const [editedOffer, setEditedOffer] = useState<Offer | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<'Mumbai' | 'Bengaluru'>('Mumbai');
  const [pricingBreakdown, setPricingBreakdown] = useState<PricingBreakdown>({
    membershipName: '',
    rackPrice: 0,
    vatRate: 5,
    discountPercent: 0,
    finalPrice: 0
  });

  useEffect(() => {
    if (offer) {
      setEditedOffer({ ...offer });
      
      // Try to parse existing pricing breakdown
      if (offer.pricingBreakdown) {
        const match = offer.pricingBreakdown.match(/Rack: ₹([\d,\.]+).*VAT: ₹([\d,\.]+).*Disc: (\d+)%.*Final: ₹([\d,\.]+)/);
        if (match) {
          setPricingBreakdown({
            membershipName: '',
            rackPrice: parseFloat(match[1].replace(/,/g, '')),
            vatRate: 5,
            discountPercent: parseInt(match[3]),
            finalPrice: parseFloat(match[4].replace(/,/g, ''))
          });
        }
      }
    }
  }, [offer]);

  // Handle membership selection and auto-populate pricing
  const handleMembershipChange = (membershipName: string) => {
    if (membershipName === 'custom') {
      // Set up custom pricing with default values
      const newPricing = {
        membershipName: 'custom',
        rackPrice: 0,
        vatRate: 5,
        discountPercent: pricingBreakdown.discountPercent,
        finalPrice: 0
      };
      setPricingBreakdown(newPricing);
      return;
    }
    
    const pricingData = getPricingByName(membershipName, selectedLocation);
    if (pricingData) {
      const calculated = calculateFinalPrice(pricingData.price, pricingBreakdown.discountPercent, 5);
      const newPricing = {
        membershipName,
        rackPrice: pricingData.price,
        vatRate: 5,
        discountPercent: pricingBreakdown.discountPercent,
        finalPrice: calculated.final
      };
      setPricingBreakdown(newPricing);
      
      // Update the offer's pricing breakdown string
      const pricingString = `Rack: ${formatCurrency(calculated.rack)} | VAT: ${formatCurrency(calculated.vat)} | Disc: ${calculated.discount}% | Final: ${formatCurrency(calculated.final)}`;
      if (editedOffer) {
        setEditedOffer({ ...editedOffer, pricingBreakdown: pricingString });
      }
    }
  };

  // Update pricing when discount changes
  const handleDiscountChange = (discount: number) => {
    const calculated = calculateFinalPrice(pricingBreakdown.rackPrice, discount, pricingBreakdown.vatRate);
    const newPricing = { ...pricingBreakdown, discountPercent: discount, finalPrice: calculated.final };
    setPricingBreakdown(newPricing);
    
    const pricingString = pricingBreakdown.membershipName === 'custom' 
      ? `Custom: ${formatCurrency(calculated.rack)} | VAT: ${formatCurrency(calculated.vat)} | Disc: ${calculated.discount}% | Final: ${formatCurrency(calculated.final)}`
      : `Rack: ${formatCurrency(calculated.rack)} | VAT: ${formatCurrency(calculated.vat)} | Disc: ${calculated.discount}% | Final: ${formatCurrency(calculated.final)}`;
    if (editedOffer) {
      setEditedOffer({ ...editedOffer, pricingBreakdown: pricingString });
    }
  };

  // Handle custom rack price changes
  const handleCustomRackPriceChange = (rackPrice: number) => {
    const calculated = calculateFinalPrice(rackPrice, pricingBreakdown.discountPercent, pricingBreakdown.vatRate);
    const newPricing = { ...pricingBreakdown, rackPrice, finalPrice: calculated.final };
    setPricingBreakdown(newPricing);
    
    const pricingString = `Custom: ${formatCurrency(calculated.rack)} | VAT: ${formatCurrency(calculated.vat)} | Disc: ${calculated.discount}% | Final: ${formatCurrency(calculated.final)}`;
    if (editedOffer) {
      setEditedOffer({ ...editedOffer, pricingBreakdown: pricingString });
    }
  };

  // Handle custom VAT rate changes
  const handleCustomVatRateChange = (vatRate: number) => {
    const calculated = calculateFinalPrice(pricingBreakdown.rackPrice, pricingBreakdown.discountPercent, vatRate);
    const newPricing = { ...pricingBreakdown, vatRate, finalPrice: calculated.final };
    setPricingBreakdown(newPricing);
    
    const pricingString = `Custom: ${formatCurrency(calculated.rack)} | VAT: ${formatCurrency(calculated.vat)} | Disc: ${calculated.discount}% | Final: ${formatCurrency(calculated.final)}`;
    if (editedOffer) {
      setEditedOffer({ ...editedOffer, pricingBreakdown: pricingString });
    }
  };

  if (!editedOffer) return null;

  const handleSave = () => {
    if (editedOffer.offerName && editedOffer.packageMechanics) {
      // Ensure pricing breakdown is updated if needed
      const updatedOffer = { ...editedOffer };
      onSave(updatedOffer);
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
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2 premium-heading">Offer Type</label>
            <select
              value={editedOffer.offerType}
              onChange={(e) => setEditedOffer({ ...editedOffer, offerType: e.target.value })}
              className="w-full px-4 py-3 border hairline-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card body-copy"
            >
              <option value="New Member">New Member</option>
              <option value="Lapsed">Lapsed</option>
              <option value="Upsell">Upsell</option>
              <option value="Innovative">Innovative</option>
              <option value="HERO OFFER">HERO OFFER</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2 premium-heading">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => {
                const location = e.target.value as 'Mumbai' | 'Bengaluru';
                setSelectedLocation(location);
                setPricingBreakdown({ ...pricingBreakdown, membershipName: '', rackPrice: 0, finalPrice: 0 });
              }}
              className="w-full px-4 py-3 border hairline-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card body-copy"
            >
              <option value="Mumbai">Mumbai</option>
              <option value="Bengaluru">Bengaluru</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 premium-heading">Membership Package</label>
          <select
            value={pricingBreakdown.membershipName}
            onChange={(e) => handleMembershipChange(e.target.value)}
            className="w-full px-4 py-3 border hairline-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card body-copy"
          >
            <option value="">Select a membership package...</option>
            {getMembershipNames(selectedLocation).map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
            <option value="custom">Custom Pricing</option>
          </select>
        </div>

        {/* Pricing Breakdown Section */}
        {pricingBreakdown.membershipName && (
          <div className="bg-muted/30 rounded-xl p-4 space-y-4">
            <h3 className="text-sm font-semibold text-foreground premium-heading">
              {pricingBreakdown.membershipName === 'custom' ? 'Custom Pricing' : 'Pricing Breakdown'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Rack Price</label>
                {pricingBreakdown.membershipName === 'custom' ? (
                  <input
                    type="number"
                    min="0"
                    value={pricingBreakdown.rackPrice || ''}
                    onChange={(e) => handleCustomRackPriceChange(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 border hairline-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-sm body-copy"
                    placeholder="Enter rack price"
                  />
                ) : (
                  <div className="px-3 py-2 bg-card rounded-lg border hairline-border text-sm body-copy">
                    {formatCurrency(pricingBreakdown.rackPrice)}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">VAT Rate</label>
                {pricingBreakdown.membershipName === 'custom' ? (
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={pricingBreakdown.vatRate}
                    onChange={(e) => handleCustomVatRateChange(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 border hairline-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-sm body-copy"
                    placeholder="VAT %"
                  />
                ) : (
                  <div className="px-3 py-2 bg-card rounded-lg border hairline-border text-sm body-copy">
                    {pricingBreakdown.vatRate}%
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Discount %</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={pricingBreakdown.discountPercent}
                  onChange={(e) => handleDiscountChange(Number(e.target.value))}
                  className="w-full px-3 py-2 border hairline-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-sm body-copy"
                />
              </div>
            </div>
            <div className="border-t hairline-border pt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-foreground premium-heading">Final Price:</span>
                <span className="text-lg font-bold text-primary">{formatCurrency(pricingBreakdown.finalPrice)}</span>
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 premium-heading">Offer Name</label>
          <input
            type="text"
            value={editedOffer.offerName}
            onChange={(e) => setEditedOffer({ ...editedOffer, offerName: e.target.value })}
            className="w-full px-4 py-3 border hairline-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card body-copy"
            placeholder="Enter offer name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 premium-heading">Target Audience</label>
          <input
            type="text"
            value={editedOffer.audience}
            onChange={(e) => setEditedOffer({ ...editedOffer, audience: e.target.value })}
            className="w-full px-4 py-3 border hairline-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card body-copy"
            placeholder="e.g., New members, Lapsed members"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 premium-heading">Package / Mechanics</label>
          <textarea
            value={editedOffer.packageMechanics}
            onChange={(e) => setEditedOffer({ ...editedOffer, packageMechanics: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border hairline-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card body-copy resize-none"
            placeholder="Describe the package details and mechanics"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 premium-heading">Why It Works</label>
          <textarea
            value={editedOffer.whyItWorks}
            onChange={(e) => setEditedOffer({ ...editedOffer, whyItWorks: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border hairline-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card body-copy resize-none"
            placeholder="Explain why this offer is effective"
          />
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t hairline-border">
          <button
            onClick={onClose}
            className="px-6 py-3 text-muted-foreground font-medium rounded-xl hover:bg-muted/50 transition-colors body-copy"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!editedOffer.offerName || !editedOffer.packageMechanics}
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed premium-heading"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditOfferModal;
