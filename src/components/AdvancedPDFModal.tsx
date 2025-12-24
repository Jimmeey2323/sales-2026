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
        returnBlob: true,
      });
      
      if (blob) {
        setPdfBlob(blob);
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        setShowPreview(true);
        
        toast({
          title: "✅ PDF Preview Ready",
          description: "Your professionally styled PDF is ready with AI summaries.",
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
          <div className="mb-6 pb-6 border-b border-border/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center shadow-xl shadow-primary/20">
                  <FileDown className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    PDF Export Studio
                    <span className="text-xs px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-semibold shadow-sm">
                      PRO
                    </span>
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    Professional document generation with advanced customization
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2.5 hover:bg-muted/80 rounded-xl transition-all hover:rotate-90 duration-300"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                <div className="text-xs text-muted-foreground">Sections</div>
                <div className="text-lg font-bold text-primary">
                  {Object.values(options).filter((v, i) => typeof v === 'boolean' && v && i < 6).length}/6
                </div>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl border border-blue-500/20">
                <div className="text-xs text-muted-foreground">Quality</div>
                <div className="text-lg font-bold text-blue-600">{options.scale}x</div>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl border border-green-500/20">
                <div className="text-xs text-muted-foreground">Format</div>
                <div className="text-lg font-bold text-green-600 uppercase">{options.pageSize}</div>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="space-y-5 mb-6 max-h-[55vh] overflow-y-auto pr-2 scrollbar-hide">
            {/* Document Sections */}
            <div className="bg-gradient-to-br from-primary/5 via-primary/3 to-transparent p-6 rounded-2xl border border-primary/10 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <FileText className="w-4.5 h-4.5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  Document Sections
                </h3>
              </div>
              
              <div className="grid grid-cols-1 gap-2.5">
                {sectionOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div 
                      key={option.key}
                      className="group flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm rounded-xl hover:bg-background transition-all border border-border/50 hover:border-primary/30 hover:shadow-md hover:scale-[1.01] cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5 flex-1">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-all group-hover:scale-110">
                          <Icon className="w-4.5 h-4.5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <label className="text-sm font-semibold text-foreground cursor-pointer block">
                            {option.label}
                          </label>
                          <p className="text-xs text-muted-foreground mt-1">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={options[option.key] as boolean}
                        onCheckedChange={() => toggleOption(option.key)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Page Settings */}
            <div className="bg-gradient-to-br from-blue-500/5 via-blue-500/3 to-transparent p-6 rounded-2xl border border-blue-500/10 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Layout className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  Page Layout
                </h3>
              </div>
              
              <div className="space-y-5">
                {/* Page Orientation */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    Orientation
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['portrait', 'landscape'].map((orientation) => (
                      <button
                        key={orientation}
                        onClick={() => updateOption('pageOrientation', orientation)}
                        className={`p-4 rounded-xl border-2 transition-all text-sm font-semibold capitalize relative overflow-hidden group ${
                          options.pageOrientation === orientation
                            ? 'border-blue-600 bg-blue-600/10 text-blue-600 shadow-md shadow-blue-600/20'
                            : 'border-border hover:border-blue-600/50 text-muted-foreground hover:text-blue-600'
                        }`}
                      >
                        <span className="relative z-10">{orientation}</span>
                        {options.pageOrientation === orientation && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Page Size */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    Paper Size
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['a4', 'letter', 'legal'].map((size) => (
                      <button
                        key={size}
                        onClick={() => updateOption('pageSize', size)}
                        className={`p-4 rounded-xl border-2 transition-all text-sm font-bold uppercase relative overflow-hidden ${
                          options.pageSize === size
                            ? 'border-blue-600 bg-blue-600/10 text-blue-600 shadow-md shadow-blue-600/20'
                            : 'border-border hover:border-blue-600/50 text-muted-foreground hover:text-blue-600'
                        }`}
                      >
                        <span className="relative z-10">{size}</span>
                        {options.pageSize === size && (
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    Font Size
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['small', 'medium', 'large'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => updateOption('fontSize', size)}
                        className={`p-4 rounded-xl border-2 transition-all text-sm font-semibold capitalize relative overflow-hidden ${
                          options.fontSize === size
                            ? 'border-blue-600 bg-blue-600/10 text-blue-600 shadow-md shadow-blue-600/20'
                            : 'border-border hover:border-blue-600/50 text-muted-foreground hover:text-blue-600'
                        }`}
                      >
                        <span className="relative z-10">{size}</span>
                        {options.fontSize === size && (
                          <div className="absolute inset-0 bg-gradient-to-tl from-blue-600/5 to-transparent" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="bg-gradient-to-br from-purple-500/5 via-purple-500/3 to-transparent p-6 rounded-2xl border border-purple-500/10 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Palette className="w-4.5 h-4.5 text-purple-600" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  Appearance & Style
                </h3>
              </div>
              
              <div className="space-y-5">
                {/* Color Scheme */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    Color Scheme
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['color', 'grayscale'].map((scheme) => (
                      <button
                        key={scheme}
                        onClick={() => updateOption('colorScheme', scheme)}
                        className={`p-4 rounded-xl border-2 transition-all text-sm font-semibold capitalize relative overflow-hidden ${
                          options.colorScheme === scheme
                            ? 'border-purple-600 bg-purple-600/10 text-purple-600 shadow-md shadow-purple-600/20'
                            : 'border-border hover:border-purple-600/50 text-muted-foreground hover:text-purple-600'
                        }`}
                      >
                        <span className="relative z-10">
                          {scheme === 'color' ? '🎨 Full Color' : '⚫ Grayscale'}
                        </span>
                        {options.colorScheme === scheme && (
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Options */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-4 bg-background/60 backdrop-blur-sm rounded-xl border border-border/50 hover:border-purple-600/30 transition-all">
                    <div className="flex-1">
                      <label className="text-sm font-semibold text-foreground cursor-pointer block">
                        Include Logo
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Add company branding to header
                      </p>
                    </div>
                    <Switch
                      checked={options.includeLogo}
                      onCheckedChange={() => toggleOption('includeLogo')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-background/60 backdrop-blur-sm rounded-xl border border-border/50 hover:border-purple-600/30 transition-all">
                    <div className="flex-1">
                      <label className="text-sm font-semibold text-foreground cursor-pointer block">
                        Page Numbers
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Show page numbers in footer
                      </p>
                    </div>
                    <Switch
                      checked={options.includePageNumbers}
                      onCheckedChange={() => toggleOption('includePageNumbers')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-background/60 backdrop-blur-sm rounded-xl border border-border/50 hover:border-purple-600/30 transition-all">
                    <div className="flex-1">
                      <label className="text-sm font-semibold text-foreground cursor-pointer block">
                        Table of Contents
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Add clickable navigation index
                      </p>
                    </div>
                    <Switch
                      checked={options.includeTableOfContents}
                      onCheckedChange={() => toggleOption('includeTableOfContents')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-background/60 backdrop-blur-sm rounded-xl border border-border/50 hover:border-purple-600/30 transition-all">
                    <div className="flex-1">
                      <label className="text-sm font-semibold text-foreground cursor-pointer block">
                        Compact Mode
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Reduce spacing for concise output
                      </p>
                    </div>
                    <Switch
                      checked={options.compactMode}
                      onCheckedChange={() => toggleOption('compactMode')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Settings */}
            <div className="bg-gradient-to-br from-green-500/5 via-green-500/3 to-transparent p-6 rounded-2xl border border-green-500/10 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Zap className="w-4.5 h-4.5 text-green-600" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  Export Quality
                </h3>
              </div>

              <div className="p-5 bg-background/60 backdrop-blur-sm rounded-xl border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-semibold text-foreground">
                    Resolution Quality
                  </label>
                  <span className="text-base font-bold text-green-600 bg-green-500/10 px-3 py-1 rounded-lg">
                    {options.scale}x
                  </span>
                </div>
                <Slider
                  value={[options.scale]}
                  onValueChange={updateScale}
                  min={1}
                  max={3}
                  step={0.5}
                  className="mb-3"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Fast (1x)</span>
                  <span>Balanced (2x)</span>
                  <span>High (3x)</span>
                </div>
                <p className="text-xs text-muted-foreground mt-3 p-3 bg-muted/30 rounded-lg">
                  💡 Higher quality = crisper images but larger file size
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-5 border-t border-border/30">
            <button
              onClick={handleGeneratePDF}
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
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
              className="px-6 py-4 bg-muted/80 hover:bg-muted text-foreground font-semibold rounded-xl transition-all disabled:opacity-50 hover:scale-[1.02]"
            >
              Cancel
            </button>
          </div>

          {/* File Info */}
          <div className="mt-4 p-4 bg-gradient-to-r from-muted/50 to-transparent rounded-xl border border-border/30">
            <p className="text-xs text-muted-foreground text-center font-medium">
              📄 {options.pageSize.toUpperCase()} • {options.pageOrientation} • physique57-plan-{new Date().toISOString().split('T')[0]}.pdf
            </p>
          </div>
        </div>
      ) : (
        /* PDF Preview */
        <div className="relative">
          {/* Preview Header */}
          <div className="mb-5 pb-5 border-b border-border/30 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">PDF Preview</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Review your document before downloading
                </p>
              </div>
            </div>
            <button
              onClick={handleClosePreview}
              className="p-2.5 hover:bg-muted/80 rounded-xl transition-all hover:rotate-90 duration-300"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* PDF Viewer */}
          <div className="bg-gradient-to-br from-muted/30 to-transparent rounded-2xl overflow-hidden border border-border/50 shadow-xl" style={{ height: '65vh' }}>
            <iframe
              ref={iframeRef}
              src={pdfUrl}
              className="w-full h-full"
              title="PDF Preview"
            />
          </div>

          {/* Preview Actions */}
          <div className="flex items-center gap-3 pt-5 mt-5 border-t border-border/30">
            <button
              onClick={handleDownloadPDF}
              className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02] transition-all"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
            <button
              onClick={handleClosePreview}
              className="px-6 py-4 bg-muted/80 hover:bg-muted text-foreground font-semibold rounded-xl transition-all hover:scale-[1.02]"
            >
              ← Back to Settings
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AdvancedPDFModal;
