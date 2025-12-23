import React, { useState } from 'react';
import { Edit3, Trash2, MessageSquare, Save, X, ChevronDown, ChevronUp, XCircle, CheckCircle } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import Badge from './ui/Badge';
import { Offer } from '../data/salesData';

interface OfferCardProps {
  offer: Offer;
  onEdit: (offer: Offer) => void;
  onDelete: (id: string) => void;
  onSaveNote: (id: string, note: string) => void;
  onToggleCancelled?: (id: string) => void;
  onConfirm?: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onEdit, onDelete, onSaveNote, onToggleCancelled, onConfirm, isSelected = false, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(offer.notes || '');

  const getBadgeVariant = (type: string) => {
    const typeMap: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'hero' | 'default'> = {
      'New Member': 'success',
      'Lapsed': 'warning',
      'Upsell': 'info',
      'Innovative': 'primary',
      'HERO OFFER': 'hero'
    };
    return typeMap[type] || 'default';
  };

  const handleSaveNote = () => {
    onSaveNote(offer.id, noteText);
    setIsEditingNote(false);
  };

  return (
    <GlassCard className={`overflow-hidden transition-all duration-300 token-card ${
      offer.isCancelled ? 'opacity-70 border-destructive/50 bg-destructive/5' : 
      offer.confirmed ? 'border-success border-2 bg-success/5 shadow-lg' : 'hover:shadow-xl'
    }`}>
      {/* Header */}
      <div 
        className="p-4 sm:p-5 cursor-pointer relative"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {offer.confirmed && (
          <div className="absolute top-3 left-3">
            <Badge variant="success" size="sm" className="badge-success shadow-md font-bold">
              <CheckCircle className="w-3 h-3 mr-1" />
              Confirmed
            </Badge>
          </div>
        )}
        {offer.isCancelled && (
          <div className="absolute top-3 right-3">
            <Badge variant="danger" size="sm" className="bg-destructive text-destructive-foreground shadow-md font-bold">
              <XCircle className="w-3 h-3 mr-1" />
              Cancelled
            </Badge>
          </div>
        )}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {onSelect && (
              <div className="mt-1 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => {
                    e.stopPropagation();
                    onSelect(offer.id);
                  }}
                  className="w-4 h-4 text-primary bg-card border-2 hairline-border rounded focus:ring-primary/20 focus:ring-2"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant={getBadgeVariant(offer.offerType)} size="sm">
                  {offer.offerType}
                </Badge>
                <span className="text-xs text-slate-400">{offer.audience}</span>
              </div>
              <h4 className={`text-base sm:text-lg font-bold premium-heading ${
                offer.isCancelled ? 'line-through text-muted-foreground' : 'text-foreground'
              }`}>
                {offer.offerName}
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {onConfirm && !offer.confirmed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onConfirm(offer.id);
                }}
                className="p-2.5 rounded-lg hover:bg-success/10 border border-transparent hover:border-success/30 transition-all duration-300 transform hover:scale-105"
                title="Confirm offer"
              >
                <CheckCircle className="w-5 h-5 text-success hover:text-success" />
              </button>
            )}
            {onToggleCancelled && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCancelled(offer.id);
                }}
                className={`p-2.5 rounded-lg border border-transparent transition-all duration-300 transform hover:scale-105 ${
                  offer.isCancelled 
                    ? 'hover:bg-success/10 hover:border-success/30' 
                    : 'hover:bg-destructive/10 hover:border-destructive/30'
                }`}
                title={offer.isCancelled ? 'Mark as active' : 'Mark as cancelled'}
              >
                {offer.isCancelled ? (
                  <CheckCircle className="w-5 h-5 text-success" />
                ) : (
                  <XCircle className="w-5 h-5 text-muted-foreground hover:text-destructive" />
                )}
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(offer);
              }}
              className={`p-2.5 rounded-lg border border-transparent hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 transform hover:scale-105 ${
                offer.confirmed ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title={offer.confirmed ? 'Cannot edit confirmed offer' : 'Edit offer'}
              disabled={offer.confirmed}
            >
              <Edit3 className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(offer.id);
              }}
              className="p-2.5 rounded-lg border border-transparent hover:bg-destructive/10 hover:border-destructive/30 transition-all duration-300 transform hover:scale-105"
              title="Delete offer"
            >
              <Trash2 className="w-5 h-5 text-muted-foreground hover:text-destructive" />
            </button>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </div>
        
        {/* Preview */}
        <p className={`text-sm mt-2 line-clamp-1 body-copy ${offer.isCancelled ? 'text-slate-400' : 'text-slate-600'}`}>
          {offer.packageMechanics}
        </p>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t hairline-border pt-4 animate-fadeIn bg-card">
          {/* Package Details */}
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-xl shadow-sm hairline-border">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                <span className="w-1 h-4 bg-[#1a2332] rounded-full"></span>
                Package / Mechanics
              </label>
              <p className="text-sm text-slate-700 leading-relaxed">{offer.packageMechanics}</p>
            </div>
            
            <div className="p-4 bg-accent/10 rounded-xl shadow-sm hairline-border">
              <label className="text-xs font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-2 mb-2">
                <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
                Pricing Breakdown
              </label>
              <p className="text-sm text-slate-700 font-mono bg-white px-3 py-2 rounded-lg border border-emerald-200">
                {offer.pricingBreakdown}
              </p>
            </div>
            
            <div className="p-4 bg-accent/5 rounded-xl shadow-sm hairline-border">
              <label className="text-xs font-semibold text-amber-700 uppercase tracking-wider flex items-center gap-2 mb-2">
                <span className="w-1 h-4 bg-amber-500 rounded-full"></span>
                Why It Works
              </label>
              <p className="text-sm text-slate-700 italic leading-relaxed">{offer.whyItWorks}</p>
            </div>

            {/* Notes Section */}
            <div className="pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Notes
                </label>
                {!isEditingNote && (
                  <button
                    onClick={() => setIsEditingNote(true)}
                    className="text-xs px-3 py-1 bg-[#1a2332] text-white rounded-lg hover:bg-[#2d3a4f] transition-colors font-medium"
                  >
                    {offer.notes ? 'Edit Note' : 'Add Note'}
                  </button>
                )}
              </div>
              
              {isEditingNote ? (
                <div className="space-y-2">
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add your notes here..."
                    className="w-full px-4 py-3 text-sm border-2 hairline-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none shadow-sm body-copy"
                    rows={3}
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveNote}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1a2332] text-white text-sm font-medium rounded-lg hover:bg-[#2d3a4f] transition-colors shadow-sm"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingNote(false);
                        setNoteText(offer.notes || '');
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : offer.notes ? (
                <div className="p-4 bg-gradient-to-br from-blue-50/50 to-white rounded-xl border border-blue-100 shadow-sm">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {offer.notes}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic py-2">No notes added</p>
              )}
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export default OfferCard;
