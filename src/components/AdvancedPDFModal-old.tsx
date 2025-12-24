import React, { useState, useRef } from 'react';
import { FileDown, Loader2, X, Settings2, Sparkles, Download, Eye, Palette, Layout, FileText, Zap } from 'lucide-react';
import Modal from './ui/Modal';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { generateAdvancedPDF } from '../lib/pdfGenerator';
import { useToast } from '../hooks/use-toast';
import { MonthData, Offer } from '../data/salesData';

interface AdvancedPDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  monthlyData: MonthData[];
  offers: Record<string, Offer[]>;
  activeFilter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL';
  aiSummaries?: Record<string, string>;
}

const AdvancedPDFModal: React.FC<AdvancedPDFModalProps> = ({ isOpen, onClose, monthlyData, offers, activeFilter, aiSummaries = {} }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [options, setOptions] = useState({
    includeExecutiveSummary: true,
    includeMonthlyPlans: true,
    includeOfferDetails: true,
    includeLocationBreakdown: true,
    includeRiskAssessment: true,
    includeAISummaries: true,
    scale: 2,
    pageOrientation: 'portrait' as 'portrait' | 'landscape',
    pageSize: 'a4' as 'a4' | 'letter' | 'legal',
    colorScheme: 'color' as 'color' | 'grayscale',
    includeLogo: true,
    includePageNumbers: true,
    includeTableOfContents: false,
    fontSize: 'medium' as 'small' | 'medium' | 'large',
    compactMode: false,
  });
  const { toast } = useToast();

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    
    try {
      const blob = await generateAdvancedPDF({
        ...options,
        monthlyData,
        offers,
        activeFilter,
        aiSummaries,
        returnBlob: true, // Request blob instead of auto-download
      });
      
      if (blob) {
        setPdfBlob(blob);
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        setShowPreview(true);
        
        toast({
          title: "✅ PDF Preview Ready",
          description: "Review your PDF before downloading.",
        });
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "PDF Generation Failed",
        description: "Unable to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `physique57-strategic-plan-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "✅ PDF Downloaded",
        description: "Your strategic plan has been saved.",
      });
      
      onClose();
    }
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl('');
    }
    setPdfBlob(null);
  };

  const handleClose = () => {
    handleClosePreview();
    onClose();
  };

  const toggleOption = (key: keyof typeof options) => {
    setOptions(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key],
    }));
  };

  const updateScale = (value: number[]) => {
    setOptions(prev => ({ ...prev, scale: value[0] }));
  };

  const updateOption = (key: keyof typeof options, value: any) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const sectionOptions = [
    { 
      key: 'includeExecutiveSummary' as const, 
      label: 'Executive Summary', 
      description: 'High-level overview and key metrics',
      icon: FileText,
    },
    { 
      key: 'includeMonthlyPlans' as const, 
      label: 'Monthly Strategic Plans', 
      description: 'Detailed breakdown for each month',
      icon: Layout,
    },
    { 
      key: 'includeAISummaries' as const, 
      label: 'AI Strategic Analysis', 
      description: 'AI-generated insights and recommendations',
      icon: Sparkles,
    },
    { 
      key: 'includeOfferDetails' as const, 
      label: 'Offer Details', 
      description: 'Complete offer mechanics and pricing',
      icon: FileDown,
    },
    { 
      key: 'includeLocationBreakdown' as const, 
      label: 'Location Breakdown', 
      description: 'Mumbai vs. Bengaluru performance',
      icon: Layout,
    },
    { 
      key: 'includeRiskAssessment' as const, 
      label: 'Risk Assessment', 
      description: 'Potential challenges and mitigation',
      icon: Zap,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="">
      {!showPreview ? (
        <div className="relative">
          {/* Header */}
          <div className="mb-6 pb-6 border-b border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                  <FileDown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    Advanced PDF Export
                    <span className="text-xs px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium">
                      Pro
                    </span>
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Customize your PDF export with professional A4 formatting
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* AI Notice */}
            <div className="p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl border border-primary/20 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">AI-Enhanced Export</p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF includes AI-generated strategic analysis and insights from your monthly plans
                </p>
              </div>
            </div>
          </div>

        {/* Content Sections */}
        <div className="space-y-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Settings2 className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Include Sections
              </h3>
            </div>
            
            <div className="space-y-3">
              {sectionOptions.map((option) => (
                <div 
                  key={option.key}
                  className="flex items-center justify-between p-4 bg-foreground/5 rounded-xl hover:bg-foreground/10 transition-colors"
                >
                  <div className="flex-1">
                    <label className="text-sm font-medium text-foreground cursor-pointer">
                      {option.label}
                    </label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {option.description}
                    </p>
                  </div>
                  <Switch
                    checked={options[option.key] as boolean}
                    onCheckedChange={() => toggleOption(option.key)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Quality Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Export Quality
              </h3>
            </div>

            <div className="p-4 bg-foreground/5 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-foreground">
                  Image Quality
                </label>
                <span className="text-sm font-mono text-primary">
                  {options.scale}x
                </span>
              </div>
              <Slider
                value={[options.scale]}
                onValueChange={updateScale}
                min={1}
                max={3}
                step={0.5}
                className="mb-2"
              />
              <p className="text-xs text-muted-foreground">
                Higher quality produces larger file sizes but crisper images
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-6 border-t border-border/50">
          <button
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white font-medium rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Preview...
              </>
            ) : (
              <>
                <Eye className="w-5 h-5" />
                Preview PDF
              </>
            )}
          </button>
          <button
            onClick={handleClose}
            disabled={isGenerating}
            className="px-6 py-3 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-xl transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>

        {/* File Info */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            📄 Format: A4 (210 × 297mm) • Output: physique57-strategic-plan-{new Date().toISOString().split('T')[0]}.pdf
          </p>
        </div>
      </div>
      ) : (
        /* PDF Preview */
        <div className="relative">
          {/* Preview Header */}
          <div className="mb-4 pb-4 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">PDF Preview</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Review before downloading
                </p>
              </div>
            </div>
            <button
              onClick={handleClosePreview}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* PDF Viewer */}
          <div className="bg-gray-100 rounded-xl overflow-hidden" style={{ height: '70vh' }}>
            <iframe
              ref={iframeRef}
              src={pdfUrl}
              className="w-full h-full"
              title="PDF Preview"
            />
          </div>

          {/* Preview Actions */}
          <div className="flex items-center gap-3 pt-4 mt-4 border-t border-border/50">
            <button
              onClick={handleDownloadPDF}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white font-medium rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
            <button
              onClick={handleClosePreview}
              className="px-6 py-3 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-xl transition-colors"
            >
              Back to Settings
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AdvancedPDFModal;
