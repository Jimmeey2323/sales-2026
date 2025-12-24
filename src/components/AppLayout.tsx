import React, { useState, useEffect, useMemo } from 'react';
import Header from './Header';
import ExecutiveSummary from './ExecutiveSummary';
import MonthNavigation from './MonthNavigation';
import MonthlySection from './MonthlySection';
import RevenueChart from './RevenueChart';
import LocationBreakdown from './LocationBreakdown';
import RiskAssessment from './RiskAssessment';
import EditOfferModal from './EditOfferModal';
import SummaryTable from './SummaryTable';
import AnniversaryBanner from './AnniversaryBanner';
import QuickStats from './QuickStats';
import DeleteConfirmModal from './DeleteConfirmModal';
import ExecutionPlan from './ExecutionPlan';
import AdvancedPDFModal from './AdvancedPDFModal';
import { useAppContext } from '../contexts/AppContext';
import Footer from './Footer';
import SearchBar from './SearchBar';
import FiltersPanel from './FiltersPanel';
import BulkActionsBar from './BulkActionsBar';
import BackToTop from './BackToTop';
import Breadcrumbs from './Breadcrumbs';
import OfferBankModal from './OfferBankModal';
import { LoadingQuickStats, LoadingMonthSection } from './LoadingCards';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Offer } from '../data/salesData';
import { useOffers } from '../hooks/useOffers';
import { useMonthlyData } from '../hooks/useMonthlyData';
import { Loader2, FileDown, BarChart3, MapPin, ClipboardList, Sparkles } from 'lucide-react';

const HERO_IMAGE = 'https://d64gsuwffb70l.cloudfront.net/694a328e005ff2dcda4b5f50_1766470401544_6d5d4446.jpg';

// Studio media configuration (images and videos for carousel)
const STUDIO_MEDIA = [
  { type: 'image' as const, url: 'https://d64gsuwffb70l.cloudfront.net/694a328e005ff2dcda4b5f50_1766470401544_6d5d4446.jpg', alt: 'Physique 57 Studio Interior' },
  { type: 'video' as const, url: 'https://d64gsuwffb70l.cloudfront.net/694a328e005ff2dcda4b5f50_1766470401544_6d5d4446.mp4', alt: 'Studio Tour Video' },
  { type: 'image' as const, url: 'https://d64gsuwffb70l.cloudfront.net/694a328e005ff2dcda4b5f50_1766470401544_6d5d4447.jpg', alt: 'Group Class Session' },
];

const AppLayout: React.FC = () => {
  const { aiSummaries } = useAppContext();
  const [activeFilter, setActiveFilter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL'>('ALL');
  const [activeMonth, setActiveMonth] = useState<string | null>(null);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState<{ id: string; name: string } | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [offerBankOpen, setOfferBankOpen] = useState(false);
  const [showCancelled, setShowCancelled] = useState(false);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [selectedOffers, setSelectedOffers] = useState<Set<string>>(new Set());
  
  const { offers, loading: offersLoading, error: offersError, addOffer, updateOffer, deleteOffer, saveNote, toggleCancelled, confirmOffer } = useOffers();
  const { monthlyData, loading: monthlyLoading, error: monthlyError } = useMonthlyData();

  const loading = offersLoading || monthlyLoading;
  const error = offersError || monthlyError;

  // Get all unique types and audiences for filter options
  const { availableTypes, availableAudiences, filteredOffers } = useMemo(() => {
    const allOffers = Object.values(offers).flat();
    const types = [...new Set(allOffers.map(o => o.offerType))];
    const audiences = [...new Set(allOffers.map(o => o.audience))];
    
    // Apply search and filters
    const filtered = allOffers.filter(offer => {
      const matchesSearch = !searchQuery || 
        offer.offerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.packageMechanics.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(offer.offerType);
      const matchesAudience = selectedAudiences.length === 0 || selectedAudiences.includes(offer.audience);
      const matchesCancelled = showCancelled || !offer.isCancelled;
      return matchesSearch && matchesType && matchesAudience && matchesCancelled;
    });
    
    return {
      availableTypes: types,
      availableAudiences: audiences,
      filteredOffers: filtered
    };
  }, [offers, searchQuery, selectedTypes, selectedAudiences]);

  // Filter methods
  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleAudienceToggle = (audience: string) => {
    setSelectedAudiences(prev => 
      prev.includes(audience) ? prev.filter(a => a !== audience) : [...prev, audience]
    );
  };

  const handleClearFilters = () => {
    setSelectedTypes([]);
    setSelectedAudiences([]);
    setSearchQuery('');
  };

  // Bulk selection methods
  const handleSelectOffer = (offerId: string) => {
    setSelectedOffers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(offerId)) {
        newSet.delete(offerId);
      } else {
        newSet.add(offerId);
      }
      return newSet;
    });
  };

  const handleSelectAllOffers = () => {
    const allFilteredIds = new Set(filteredOffers.map(o => o.id));
    setSelectedOffers(allFilteredIds);
  };

  const handleClearSelection = () => {
    setSelectedOffers(new Set());
  };

  const handleBulkDelete = () => {
    selectedOffers.forEach(offerId => deleteOffer(offerId));
    setSelectedOffers(new Set());
  };

  const handleBulkExport = () => {
    console.log('Bulk export:', Array.from(selectedOffers));
    // Implementation for bulk export
  };

  const handleBulkToggleVisibility = () => {
    selectedOffers.forEach(offerId => toggleCancelled(offerId));
  };

  // Filter months based on active quarter
  const filteredMonths = activeFilter === 'ALL' 
    ? monthlyData 
    : monthlyData.filter(m => m.quarter === activeFilter);

  // Reset activeMonth when filter changes, but allow navigation between months
  useEffect(() => {
    // Only reset if we're switching between quarter filters
    if (activeMonth) {
      const activeMonthData = monthlyData.find(m => m.month === activeMonth);
      if (activeMonthData && activeMonthData.quarter !== activeFilter && activeFilter !== 'ALL') {
        setActiveMonth(null);
      }
    }
  }, [activeFilter, monthlyData]);

  // Filter months based on active quarter or active month
  let displayMonths = filteredMonths;
  
  if (activeMonth) {
    // If a specific month is active, only show that month
    displayMonths = monthlyData.filter(m => m.month === activeMonth);
  } else {
    // Otherwise show all months in the selected quarter/filter
    displayMonths = filteredMonths;
  }

  // Handle month selection
  const handleSelectMonth = (month: string) => {
    // Toggle month selection - clicking same month deselects it
    if (activeMonth === month) {
      setActiveMonth(null);
    } else {
      setActiveMonth(month);
      const element = document.getElementById(month.toLowerCase());
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  };

  // Handle edit offer
  const handleEditOffer = (offer: Offer) => {
    setEditingOffer(offer);
    setIsEditModalOpen(true);
  };

  // Handle save edited offer
  const handleSaveOffer = (offer: Offer) => {
    updateOffer(offer);
    setIsEditModalOpen(false);
    setEditingOffer(null);
  };

  // Handle delete offer - show confirmation modal
  const handleDeleteOffer = (id: string) => {
    let offerName = 'this offer';
    Object.values(offers).forEach(monthOffers => {
      const found = monthOffers.find(o => o.id === id);
      if (found) offerName = found.offerName;
    });
    setOfferToDelete({ id, name: offerName });
    setDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (offerToDelete) {
      deleteOffer(offerToDelete.id);
      setDeleteModalOpen(false);
      setOfferToDelete(null);
    }
  };

  // Intersection observer for active month tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const month = entry.target.id;
            if (month) {
              setActiveMonth(month.charAt(0).toUpperCase() + month.slice(1));
            }
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    displayMonths.forEach((month) => {
      const element = document.getElementById(month.month.toLowerCase());
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [displayMonths]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a2332] via-[#2d3a4f] to-[#1a2332] flex items-center justify-center relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Loader content */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Animated logo */}
          <div className="relative">
            {/* Outer spinning ring */}
            <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-transparent border-t-amber-400 border-r-amber-400 animate-spin"></div>
            <div className="absolute inset-2 w-28 h-28 rounded-full border-4 border-transparent border-b-emerald-400 border-l-emerald-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            
            {/* Center logo */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-2xl p-2">
                <img 
                  src="https://lh3.googleusercontent.com/d/1RsoPmNAjAybOpH9HGBqiHtYp18j50w0r" 
                  alt="Physique 57 India" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
          
          {/* Loading text */}
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold text-white">Physique 57 India</h1>
            <div className="flex items-center gap-2 justify-center">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <p className="text-white/80 text-sm">Loading Sales Plan FY 2025-26</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a2332] via-[#2d3a4f] to-[#1a2332] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Database Connection Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()} 
              className="w-full px-4 py-2 bg-[#1a2332] text-white rounded-lg hover:bg-[#2d3a4f] transition-colors"
            >
              Retry Connection
            </button>
            <p className="text-sm text-gray-500">
              Please ensure you've run the migration script in Supabase.{' '}
              <a href="/SUPABASE-SETUP-GUIDE.md" className="text-blue-600 hover:underline">
                View Setup Guide
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
        showCancelled={showCancelled}
        setShowCancelled={setShowCancelled}
      />

      {/* Executive Summary */}
      <ExecutiveSummary activeFilter={activeFilter} heroImage={HERO_IMAGE} studioMedia={STUDIO_MEDIA} />

      {/* Month Navigation */}
      <MonthNavigation 
        months={displayMonths} 
        activeMonth={activeMonth}
        onSelectMonth={handleSelectMonth}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button
          onClick={() => setOfferBankOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-200"
          title="Open Offer Bank"
        >
          <Sparkles className="w-5 h-5" />
          <span className="hidden sm:inline">Offer Bank</span>
        </button>
        <button
          onClick={() => setExportModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-foreground/10 backdrop-blur-sm text-foreground font-medium rounded-xl shadow-soft-lg hover:bg-foreground/20 hover:-translate-y-1 transition-all duration-200"
          title="Export to PDF"
        >
          <FileDown className="w-5 h-5" />
          <span className="hidden sm:inline">Export PDF</span>
        </button>
      </div>

      {/* Main Content */}
      <main data-pdf-content className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs activeFilter={activeFilter} activeMonth={activeMonth} />

        {/* Quick Stats */}
        <section className="mb-12 animate-fade-in">
          {loading ? <LoadingQuickStats /> : <QuickStats data={monthlyData} activeFilter={activeFilter} activeMonth={activeMonth} />}
        </section>

        {/* Search and Filters */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="space-y-4">
                <SearchBar 
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search offers by name or mechanics..."
                />
                <FiltersPanel
                  selectedTypes={selectedTypes}
                  selectedAudiences={selectedAudiences}
                  onTypeToggle={handleTypeToggle}
                  onAudienceToggle={handleAudienceToggle}
                  onClearAll={handleClearFilters}
                  availableTypes={availableTypes}
                  availableAudiences={availableAudiences}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tabbed Analytics Section */}
        <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Tabs defaultValue="main" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2 rounded-lg shadow-soft">
                <TabsTrigger value="main">Main</TabsTrigger>
                <TabsTrigger value="revenue">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Revenue
                </TabsTrigger>
                <TabsTrigger value="location">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location
                </TabsTrigger>
                <TabsTrigger value="cheatsheet">
                  <ClipboardList className="w-4 h-4 mr-1" />
                  Cheat Sheet
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="main" className="space-y-12">
              {/* Main dashboard content - Monthly Sections */}
              <div className="space-y-16">
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-2">
                    Monthly Sales Plans
                  </h2>
                  <p className="text-muted-foreground">
                    Detailed offers and strategies for each month • Click to expand offers
                  </p>
                </div>

                {displayMonths.map((month, index) => (
                  <div className="animate-slide-in" style={{ animationDelay: `${index * 0.1}s`}}>
                    <MonthlySection
                      key={month.month}
                      monthData={month}
                      offers={offers[month.month] || month.offers}
                      onEditOffer={handleEditOffer}
                      onDeleteOffer={handleDeleteOffer}
                      onSaveNote={saveNote}
                      onAddOffer={addOffer}
                      onToggleCancelled={toggleCancelled}
                      onConfirm={confirmOffer}
                      selectedOffers={selectedOffers}
                      onSelectOffer={handleSelectOffer}
                      showCancelled={showCancelled}
                      activeMonth={month.month}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="revenue">
              <Card className="shadow-soft">
                <CardContent className="p-4 sm:p-6">
                  <RevenueChart data={monthlyData} activeFilter={activeFilter} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="location">
              <Card className="shadow-soft">
                <CardContent className="p-4 sm:p-6">
                  <LocationBreakdown data={monthlyData} activeFilter={activeFilter} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="cheatsheet">
              <Card className="shadow-soft">
                <CardContent className="p-4 sm:p-6">
                  <SummaryTable data={monthlyData} activeFilter={activeFilter} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Execution Plan */}
        <section className="mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Card className="shadow-soft">
            <CardContent className="p-4 sm:p-6">
              <ExecutionPlan activeMonth={activeMonth} />
            </CardContent>
          </Card>
        </section>

        {/* Risk Assessment */}
        <section className="mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Card className="shadow-soft">
            <CardContent className="p-4 sm:p-6">
              <RiskAssessment activeFilter={activeFilter} activeMonth={activeMonth} />
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedOffers.size}
        totalCount={filteredOffers.length}
        onSelectAll={handleSelectAllOffers}
        onClearSelection={handleClearSelection}
        onBulkDelete={handleBulkDelete}
        onBulkExport={handleBulkExport}
        onBulkToggleVisibility={handleBulkToggleVisibility}
      />

      {/* Edit Offer Modal */}
      <EditOfferModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingOffer(null);
        }}
        offer={editingOffer}
        onSave={handleSaveOffer}
      />

      {/* Offer Bank Modal */}
      <OfferBankModal
        isOpen={offerBankOpen}
        onClose={() => setOfferBankOpen(false)}
        onSelectOffer={(offer) => {
          // Pre-fill the add offer form with selected template
          setEditingOffer({ ...offer, id: '' } as Offer);
          setIsEditModalOpen(true);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setOfferToDelete(null);
        }}
        onConfirm={confirmDelete}
        offerName={offerToDelete?.name || ''}
      />

      {/* Advanced PDF Export Modal */}
      <AdvancedPDFModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        monthlyData={monthlyData}
        offers={offers}
        activeFilter={activeFilter}
        aiSummaries={aiSummaries}
      />

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default AppLayout;
