import React, { useState, useEffect } from 'react';
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
import ExportPDFModal from './ExportPDFModal';
import Footer from './Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Offer } from '../data/salesData';
import { useOffers } from '../hooks/useOffers';
import { useMonthlyData } from '../hooks/useMonthlyData';
import { Loader2, FileDown, BarChart3, MapPin, ClipboardList } from 'lucide-react';

const HERO_IMAGE = 'https://d64gsuwffb70l.cloudfront.net/694a328e005ff2dcda4b5f50_1766470401544_6d5d4446.jpg';

const AppLayout: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL'>('ALL');
  const [activeMonth, setActiveMonth] = useState<string | null>(null);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState<{ id: string; name: string } | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  
  const { offers, loading: offersLoading, error: offersError, addOffer, updateOffer, deleteOffer, saveNote, toggleCancelled } = useOffers();
  const { monthlyData, loading: monthlyLoading, error: monthlyError } = useMonthlyData();

  const loading = offersLoading || monthlyLoading;
  const error = offersError || monthlyError;

  // Filter months based on active quarter
  const filteredMonths = activeFilter === 'ALL' 
    ? monthlyData 
    : monthlyData.filter(m => m.quarter === activeFilter);

  // Reset activeMonth when filter changes
  useEffect(() => {
    setActiveMonth(null);
  }, [activeFilter]);

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
    setActiveMonth(month);
    const element = document.getElementById(month.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/30 to-white">
      {/* Header */}
      <Header activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      {/* Executive Summary */}
      <ExecutiveSummary activeFilter={activeFilter} heroImage={HERO_IMAGE} />

      {/* Month Navigation */}
      <MonthNavigation 
        months={displayMonths} 
        activeMonth={activeMonth}
        onSelectMonth={handleSelectMonth}
      />

      {/* Floating Export Button */}
      <button
        onClick={() => setExportModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-[#1a2332] text-white font-medium rounded-xl shadow-xl hover:bg-[#2d3a4f] transition-all hover:scale-105"
      >
        <FileDown className="w-5 h-5" />
        <span className="hidden sm:inline">Export PDF</span>
      </button>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Quick Stats */}
        <section className="mb-12">
          <QuickStats data={monthlyData} activeFilter={activeFilter} activeMonth={activeMonth} />
        </section>

        {/* Tabbed Analytics Section */}
        <section className="mb-12">
          <Tabs defaultValue="main" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
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
            
            <TabsContent value="main" className="space-y-12">
              {/* Main dashboard content - Monthly Sections */}
              <div className="space-y-16">
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2332] mb-2">
                    Monthly Sales Plans
                  </h2>
                  <p className="text-slate-500">
                    Detailed offers and strategies for each month • Click to expand offers
                  </p>
                </div>

                {displayMonths.map((month) => (
                  <MonthlySection
                    key={month.month}
                    monthData={month}
                    offers={offers[month.month] || month.offers}
                    onEditOffer={handleEditOffer}
                    onDeleteOffer={handleDeleteOffer}
                    onSaveNote={saveNote}
                    onAddOffer={addOffer}
                    onToggleCancelled={toggleCancelled}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="revenue">
              <RevenueChart data={monthlyData} activeFilter={activeFilter} />
            </TabsContent>
            
            <TabsContent value="location">
              <LocationBreakdown data={monthlyData} activeFilter={activeFilter} />
            </TabsContent>
            
            <TabsContent value="cheatsheet">
              <SummaryTable data={monthlyData} activeFilter={activeFilter} />
            </TabsContent>
          </Tabs>
        </section>

        {/* Execution Plan */}
        <section className="mt-16">
          <ExecutionPlan />
        </section>

        {/* Risk Assessment */}
        <section className="mt-16">
          <RiskAssessment activeFilter={activeFilter} />
        </section>
      </main>

      {/* Footer */}
      <Footer />

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

      {/* Export PDF Modal */}
      <ExportPDFModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        offers={offers}
        activeFilter={activeFilter}
      />
    </div>
  );
};

export default AppLayout;
