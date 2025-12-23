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
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onEdit, onDelete, onSaveNote, onToggleCancelled }) => {
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
    <GlassCard className={`overflow-hidden transition-all duration-300 ${offer.isCancelled ? 'opacity-60 border-2 border-rose-200' : ''}`}>
      {/* Header */}
      <div 
        className="p-4 sm:p-5 cursor-pointer relative"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {offer.isCancelled && (
          <div className="absolute top-2 right-2">
            <Badge variant="danger" size="sm">
              <XCircle className="w-3 h-3 mr-1" />
              Cancelled
            </Badge>
          </div>
        )}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant={getBadgeVariant(offer.offerType)} size="sm">
                {offer.offerType}
              </Badge>
              <span className="text-xs text-slate-400">{offer.audience}</span>
            </div>
            <h4 className={`text-base sm:text-lg font-semibold ${offer.isCancelled ? 'line-through text-slate-400' : 'text-[#1a2332]'}`}>
              {offer.offerName}
            </h4>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {onToggleCancelled && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCancelled(offer.id);
                }}
                className={`p-2 rounded-lg transition-colors ${offer.isCancelled ? 'hover:bg-emerald-50' : 'hover:bg-rose-50'}`}
                title={offer.isCancelled ? 'Mark as active' : 'Mark as cancelled'}
              >
                {offer.isCancelled ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-400 hover:text-rose-500" />
                )}
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(offer);
              }}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              title="Edit offer"
            >
              <Edit3 className="w-4 h-4 text-slate-400 hover:text-[#1a2332]" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(offer.id);
              }}
              className="p-2 rounded-lg hover:bg-rose-50 transition-colors"
              title="Delete offer"
            >
              <Trash2 className="w-4 h-4 text-slate-400 hover:text-rose-500" />
            </button>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </div>
        
        {/* Preview */}
        <p className={`text-sm mt-2 line-clamp-1 ${offer.isCancelled ? 'text-slate-400' : 'text-slate-600'}`}>
          {offer.packageMechanics}
        </p>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-slate-100 pt-4 animate-fadeIn bg-gradient-to-br from-white to-slate-50/30">
          {/* Package Details */}
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                <span className="w-1 h-4 bg-[#1a2332] rounded-full"></span>
                Package / Mechanics
              </label>
              <p className="text-sm text-slate-700 leading-relaxed">{offer.packageMechanics}</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-emerald-50/50 to-white rounded-xl shadow-sm border border-emerald-100">
              <label className="text-xs font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-2 mb-2">
                <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
                Pricing Breakdown
              </label>
              <p className="text-sm text-slate-700 font-mono bg-white px-3 py-2 rounded-lg border border-emerald-200">
                {offer.pricingBreakdown}
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-amber-50/50 to-white rounded-xl shadow-sm border border-amber-100">
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
                    className="w-full px-4 py-3 text-sm border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a2332]/20 focus:border-[#1a2332] resize-none shadow-sm"
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
