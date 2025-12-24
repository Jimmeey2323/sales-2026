import React, { useState } from 'react';
import { Edit3, Trash2, MessageSquare, Save, X, ChevronDown, ChevronUp, XCircle, CheckCircle, Sparkles, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Badge from './ui/Badge';
import { Offer } from '../data/salesData';
import { enhanceOfferWithAI } from '../lib/openai';
import { useToast } from '../hooks/use-toast';

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
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedOffer, setEnhancedOffer] = useState<Offer>(offer);
  const { toast } = useToast();

  const getBadgeVariant = (type: string) => {
    const typeMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      'New Member': 'default',
      'Lapsed': 'secondary',
      'Upsell': 'outline',
      'Innovative': 'secondary',
      'HERO OFFER': 'destructive'
    };
    return typeMap[type] || 'default';
  };

  const handleSaveNote = () => {
    onSaveNote(offer.id, noteText);
    setIsEditingNote(false);
  };

  const handleEnhanceWithAI = async () => {
    setIsEnhancing(true);
    try {
      const enhancements = await enhanceOfferWithAI({
        offerName: offer.offerName,
        offerType: offer.offerType,
        audience: offer.audience,
        packageMechanics: offer.packageMechanics,
        pricingBreakdown: offer.pricingBreakdown,
        whyItWorks: offer.whyItWorks,
      });

      const enhanced = {
        ...offer,
        ...enhancements,
      };

      setEnhancedOffer(enhanced);
      
      toast({
        title: "✨ AI Enhancement Complete",
        description: "Offer details have been enhanced with AI insights.",
      });
    } catch (error) {
      toast({
        title: "Enhancement Failed",
        description: "Unable to enhance offer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  const displayOffer = enhancedOffer;

  return (
    <Card className={`overflow-hidden transition-all duration-300 shadow-soft hover:shadow-lg hover:scale-[1.02] ${
      offer.isCancelled ? 'opacity-60 border-destructive/50' : 
      offer.confirmed ? 'border-green-500/50' : ''
    }`}>
      {/* Header */}
      <CardHeader 
        className="p-4 sm:p-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {offer.confirmed && (
          <div className="absolute top-2 left-2">
            <Badge variant="default" size="sm">
              <CheckCircle className="w-3 h-3 mr-1" />
              Confirmed
            </Badge>
          </div>
        )}
        {offer.isCancelled && (
          <div className="absolute top-2 right-2">
            <Badge variant="destructive" size="sm">
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
                  className="w-4 h-4 text-primary bg-card border rounded focus:ring-primary/20 focus:ring-2"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant={getBadgeVariant(offer.offerType)} size="sm" className={offer.offerType === 'New Member' ? 'animate-pulse-slow' : ''}>
                  {offer.offerType}
                </Badge>
                <span className="text-xs text-muted-foreground">{offer.audience}</span>
              </div>
              <CardTitle className={`text-base sm:text-lg ${offer.isCancelled ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {offer.offerName}
              </CardTitle>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {onConfirm && !offer.confirmed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onConfirm(offer.id);
                }}
                className="p-2 rounded-lg hover:bg-green-500/10 transition-colors"
                title="Confirm offer"
              >
                <CheckCircle className="w-4 h-4 text-muted-foreground hover:text-green-500" />
              </button>
            )}
            {onToggleCancelled && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCancelled(offer.id);
                }}
                className={`p-2 rounded-lg transition-colors ${offer.isCancelled ? 'hover:bg-green-500/10' : 'hover:bg-destructive/10'}`}
                title={offer.isCancelled ? 'Mark as active' : 'Mark as cancelled'}
              >
                {offer.isCancelled ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                )}
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(offer);
              }}
              className={`p-2 rounded-lg hover:bg-muted/50 transition-colors ${
                offer.confirmed ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title={offer.confirmed ? 'Cannot edit confirmed offer' : 'Edit offer'}
              disabled={offer.confirmed}
            >
              <Edit3 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(offer.id);
              }}
              className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
              title="Delete offer"
            >
              <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
            </button>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </div>
        
        {/* Preview */}
        <p className={`text-sm mt-2 line-clamp-1 ${offer.isCancelled ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
          {displayOffer.packageMechanics}
        </p>
      </CardHeader>

      {/* Expanded Content */}
      {isExpanded && (
        <CardContent className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-border/50 pt-4 animate-fade-in">
          {/* AI Enhancement Button */}
          <div className="mb-4 flex items-center justify-between gap-3 p-3 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl border border-primary/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Enhance with AI</span>
              <span className="text-xs text-muted-foreground">Get detailed insights & recommendations</span>
            </div>
            <button
              onClick={handleEnhanceWithAI}
              disabled={isEnhancing}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEnhancing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enhancing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Enhance
                </>
              )}
            </button>
          </div>

          {/* Package Details */}
          <div className="space-y-4">
            <div className="p-4 bg-foreground/5 rounded-xl">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-2">
                <span className="w-1 h-4 bg-primary rounded-full"></span>
                Package / Mechanics
              </label>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{displayOffer.packageMechanics}</p>
            </div>
            
            <div className="p-4 bg-foreground/5 rounded-xl">
              <label className="text-xs font-semibold text-green-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                <span className="w-1 h-4 bg-green-500 rounded-full"></span>
                Pricing Breakdown
              </label>
              <p className="text-sm text-foreground font-mono bg-background/50 px-3 py-2 rounded-lg border border-border/50 whitespace-pre-line">
                {displayOffer.pricingBreakdown}
              </p>
            </div>
            
            <div className="p-4 bg-foreground/5 rounded-xl">
              <label className="text-xs font-semibold text-amber-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                <span className="w-1 h-4 bg-amber-500 rounded-full"></span>
                Why It Works
              </label>
              <p className="text-sm text-foreground italic leading-relaxed whitespace-pre-line">{displayOffer.whyItWorks}</p>
            </div>

            {/* Notes Section */}
            <div className="pt-3 border-t border-border/50">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Notes
                </label>
                {!isEditingNote && (
                  <button
                    onClick={() => setIsEditingNote(true)}
                    className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
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
                    className="w-full px-4 py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring resize-none bg-background/50"
                    rows={3}
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveNote}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingNote(false);
                        setNoteText(offer.notes || '');
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground text-sm font-medium rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : offer.notes ? (
                <div className="p-4 bg-foreground/5 rounded-xl border border-border/50">
                  <p className="text-sm text-foreground leading-relaxed">
                    {offer.notes}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic py-2">No notes added</p>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default OfferCard;
