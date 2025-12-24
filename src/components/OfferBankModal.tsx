import React, { useState, useMemo } from 'react';
import { X, Search, Plus, Filter, Copy, Trash2, Star, Edit3, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Badge from './ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Offer } from '../data/salesData';

interface OfferBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOffer: (offer: Omit<Offer, 'id'>) => void;
}

// Sample offer templates
const OFFER_TEMPLATES: Array<Omit<Offer, 'id'> & { category: string; tags: string[] }> = [
  {
    category: 'New Member',
    offerType: 'New Member',
    offerName: 'First Month Free',
    audience: 'Fitness Newcomers',
    packageMechanics: '30-day unlimited classes for new members only',
    pricingBreakdown: '₹0 first month, then ₹4,999/month',
    whyItWorks: 'Low barrier to entry, builds habit formation',
    tags: ['acquisition', 'trial', 'popular']
  },
  {
    category: 'New Member',
    offerType: 'New Member',
    offerName: '50% Off First 3 Months',
    audience: 'Budget-Conscious Beginners',
    packageMechanics: 'Half-price unlimited access for first quarter',
    pricingBreakdown: '₹2,499/month × 3 months (normally ₹4,999)',
    whyItWorks: 'Extended trial builds loyalty, predictable revenue',
    tags: ['acquisition', 'discount', 'extended']
  },
  {
    category: 'New Member',
    offerType: 'New Member',
    offerName: 'Bring a Friend - Both Save',
    audience: 'Social Fitness Enthusiasts',
    packageMechanics: 'Join with a friend, both get 40% off for 2 months',
    pricingBreakdown: '₹2,999/month × 2 (per person)',
    whyItWorks: 'Viral growth through referrals, higher retention',
    tags: ['referral', 'social', 'acquisition']
  },
  {
    category: 'Lapsed',
    offerType: 'Lapsed',
    offerName: 'Welcome Back - 60% Off',
    audience: 'Former Members (3-12 months inactive)',
    packageMechanics: 'Rejoin with 60% discount for first month',
    pricingBreakdown: '₹1,999 first month, ₹4,999 thereafter',
    whyItWorks: 'Reactivates churned members, shows appreciation',
    tags: ['winback', 'reactivation', 'discount']
  },
  {
    category: 'Lapsed',
    offerType: 'Lapsed',
    offerName: 'No Commitment Comeback',
    audience: 'Hesitant Former Members',
    packageMechanics: '1-month trial, cancel anytime',
    pricingBreakdown: '₹3,499 for 30 days (no contract)',
    whyItWorks: 'Removes fear of long-term commitment',
    tags: ['winback', 'flexible', 'trial']
  },
  {
    category: 'Upsell',
    offerType: 'Upsell',
    offerName: 'Annual Membership - Save 25%',
    audience: 'Active Monthly Members',
    packageMechanics: 'Upgrade to yearly, get 3 months free',
    pricingBreakdown: '₹44,990/year (vs ₹59,988 monthly)',
    whyItWorks: 'Predictable cashflow, reduces churn',
    tags: ['upgrade', 'commitment', 'savings']
  },
  {
    category: 'Upsell',
    offerType: 'Upsell',
    offerName: 'Premium Plus Add-On',
    audience: 'Engaged Members',
    packageMechanics: 'Add personal training (4 sessions/month) for ₹2,999',
    pricingBreakdown: '₹2,999 add-on to existing membership',
    whyItWorks: 'Increases ARPU, enhances results',
    tags: ['addon', 'premium', 'training']
  },
  {
    category: 'Seasonal',
    offerType: 'HERO OFFER',
    offerName: 'New Year Transformation',
    audience: 'Resolution Seekers',
    packageMechanics: '12-week program with nutrition + unlimited classes',
    pricingBreakdown: '₹14,999 (3 months prepaid)',
    whyItWorks: 'Capitalizes on New Year motivation, high-ticket',
    tags: ['seasonal', 'program', 'january']
  },
  {
    category: 'Seasonal',
    offerType: 'Innovative',
    offerName: 'Summer Shred Challenge',
    audience: 'Results-Driven Members',
    packageMechanics: '8-week bootcamp style program with prizes',
    pricingBreakdown: '₹9,999 challenge entry',
    whyItWorks: 'Gamification drives engagement and referrals',
    tags: ['seasonal', 'challenge', 'summer']
  },
  {
    category: 'Special Event',
    offerType: 'HERO OFFER',
    offerName: 'Anniversary Lifetime Member',
    audience: 'VIP Loyalists',
    packageMechanics: 'One-time payment for unlimited lifetime access',
    pricingBreakdown: '₹1,49,990 one-time (limited to 100 members)',
    whyItWorks: 'Major cashflow boost, creates exclusivity',
    tags: ['anniversary', 'vip', 'lifetime']
  },
  {
    category: 'Corporate',
    offerType: 'New Member',
    offerName: 'Corporate Wellness Package',
    audience: 'Company HR Teams',
    packageMechanics: '10+ employee group rate, unlimited classes',
    pricingBreakdown: '₹3,999/employee/month (min 10 employees)',
    whyItWorks: 'B2B revenue stream, predictable bulk sales',
    tags: ['corporate', 'b2b', 'group']
  },
  {
    category: 'Referral',
    offerType: 'Innovative',
    offerName: 'Member Gets Member',
    audience: 'Current Active Members',
    packageMechanics: 'Refer a friend, both get 1 month free',
    pricingBreakdown: '₹0 for referrer + referee (1 month credit each)',
    whyItWorks: 'Viral growth loop, low CAC',
    tags: ['referral', 'viral', 'free']
  },
  {
    category: 'Flash Sale',
    offerType: 'Innovative',
    offerName: '48-Hour Flash: 70% Off',
    audience: 'Email Subscribers',
    packageMechanics: 'Weekend-only offer, first 50 signups',
    pricingBreakdown: '₹1,499 first month (48hrs only)',
    whyItWorks: 'Creates urgency, drives immediate action',
    tags: ['flash', 'urgent', 'limited']
  },
  {
    category: 'Student',
    offerType: 'New Member',
    offerName: 'Student Semester Pass',
    audience: 'College Students',
    packageMechanics: '4-month pass aligned with semester',
    pricingBreakdown: '₹2,999/month (with valid student ID)',
    whyItWorks: 'Captures young demographic, builds brand loyalty',
    tags: ['student', 'youth', 'discount']
  },
  {
    category: 'Senior',
    offerType: 'New Member',
    offerName: 'Silver Strength Program',
    audience: '55+ Active Adults',
    packageMechanics: 'Low-impact classes, flexible schedule',
    pricingBreakdown: '₹3,499/month unlimited',
    whyItWorks: 'Underserved market, premium pricing viable',
    tags: ['senior', 'specialty', 'wellness']
  }
];

const OfferBankModal: React.FC<OfferBankModalProps> = ({ isOpen, onClose, onSelectOffer }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const categories = useMemo(() => {
    const cats = new Set(OFFER_TEMPLATES.map(o => o.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    OFFER_TEMPLATES.forEach(o => o.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, []);

  const filteredOffers = useMemo(() => {
    return OFFER_TEMPLATES.filter(offer => {
      const matchesSearch = !searchQuery || 
        offer.offerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.packageMechanics.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || offer.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => offer.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [searchQuery, selectedCategory, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleFavorite = (index: number) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass-surface max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Offer Bank</h2>
                <p className="text-sm text-muted-foreground">200+ pre-built offer templates</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search offers by name or mechanics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/40 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-border/50 bg-muted/20">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">Filters:</span>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-primary/20 text-primary border border-primary'
                    : 'bg-background border border-border/40 text-muted-foreground hover:border-primary/50'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Offers Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOffers.map((offer, index) => (
              <Card 
                key={index}
                className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="default" size="sm">{offer.offerType}</Badge>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(index);
                      }}
                      className="p-1 rounded hover:bg-muted/50"
                    >
                      <Star 
                        className={`w-4 h-4 ${favorites.has(index) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
                      />
                    </button>
                  </div>
                  <CardTitle className="text-base">{offer.offerName}</CardTitle>
                  <p className="text-xs text-muted-foreground">{offer.audience}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{offer.packageMechanics}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {offer.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-muted/50 text-xs text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        onSelectOffer(offer);
                        onClose();
                      }}
                      className="flex-1"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredOffers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-2">No offers found</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedTags([]);
                }}
                className="text-sm text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/50 bg-muted/20 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredOffers.length} of {OFFER_TEMPLATES.length} offers
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferBankModal;
