import React, { useState, useRef } from 'react';
import { FileDown, Check, Printer, X, FileText, Calendar, AlertTriangle, Target, Building } from 'lucide-react';
import Modal from './ui/Modal';
import GlassCard from './ui/GlassCard';
import { monthlyData, formatCurrency, h1Strategy, h2Strategy, h1Risks, h2Risks, MonthData, Offer } from '../data/salesData';

interface ExportPDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  offers: Record<string, Offer[]>;
  activeFilter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL';
}

interface ExportSection {
  id: string;
  name: string;
  icon: React.ElementType;
  enabled: boolean;
}

const ExportPDFModal: React.FC<ExportPDFModalProps> = ({ isOpen, onClose, offers, activeFilter }) => {
  const [sections, setSections] = useState<ExportSection[]>([
    { id: 'executive', name: 'Executive Summary', icon: Target, enabled: true },
    { id: 'monthly', name: 'Monthly Plans', icon: Calendar, enabled: true },
    { id: 'offers', name: 'Strategic Offers', icon: FileText, enabled: true },
    { id: 'locations', name: 'Location Breakdown', icon: Building, enabled: true },
    { id: 'risks', name: 'Risk Assessment', icon: AlertTriangle, enabled: true },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const toggleSection = (id: string) => {
    setSections(prev => prev.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const filteredMonths = activeFilter === 'ALL' 
    ? monthlyData 
    : monthlyData.filter(m => m.quarter === activeFilter);

  const generatePDF = () => {
    setIsGenerating(true);
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to generate PDF');
      setIsGenerating(false);
      return;
    }

    const totalTarget = filteredMonths.reduce((sum, m) => sum + m.target, 0);
    const totalBaseline = filteredMonths.reduce((sum, m) => sum + m.historicBaseline, 0);
    const growthPercent = Math.round(((totalTarget - totalBaseline) / totalBaseline) * 100);
    const mumbaiTarget = filteredMonths.reduce((sum, m) => sum + m.mumbaiTarget, 0);
    const bengaluruTarget = filteredMonths.reduce((sum, m) => sum + m.bengaluruTarget, 0);
    
    const getHalf = (filter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL') => {
      if (filter === 'ALL') return 'ALL';
      return (filter === 'Q1' || filter === 'Q2') ? 'H1' : 'H2';
    };
    const halfFilter = getHalf(activeFilter);
    const risks = halfFilter === 'H1' ? h1Risks : halfFilter === 'H2' ? h2Risks : [...h1Risks, ...h2Risks];

    // Build HTML content
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Physique 57 India - 2026 Sales Plan</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #1a2332;
            line-height: 1.6;
            background: white;
          }
          
          .page {
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 20px;
            border-bottom: 2px solid #1a2332;
            margin-bottom: 30px;
          }
          
          .logo {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          
          .logo-box {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #1a2332, #2d3a4f);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 18px;
          }
          
          .logo-text h1 {
            font-size: 20px;
            font-weight: 700;
            color: #1a2332;
          }
          
          .logo-text p {
            font-size: 12px;
            color: #64748b;
          }
          
          .date {
            font-size: 12px;
            color: #64748b;
          }
          
          .section {
            margin-bottom: 40px;
            page-break-inside: avoid;
          }
          
          .section-title {
            font-size: 24px;
            font-weight: 700;
            color: #1a2332;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .kpi-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 24px;
          }
          
          .kpi-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 16px;
            text-align: center;
          }
          
          .kpi-value {
            font-size: 24px;
            font-weight: 700;
            color: #1a2332;
          }
          
          .kpi-value.green { color: #10b981; }
          .kpi-value.blue { color: #0ea5e9; }
          .kpi-value.purple { color: #8b5cf6; }
          
          .kpi-label {
            font-size: 12px;
            color: #64748b;
            margin-top: 4px;
          }
          
          .month-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 16px;
            page-break-inside: avoid;
          }
          
          .month-card.anniversary {
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            border-color: #f59e0b;
          }
          
          .month-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
          }
          
          .month-name {
            font-size: 18px;
            font-weight: 700;
            color: #1a2332;
          }
          
          .month-theme {
            font-size: 13px;
            color: #64748b;
          }
          
          .month-target {
            text-align: right;
          }
          
          .month-target-value {
            font-size: 20px;
            font-weight: 700;
            color: #1a2332;
          }
          
          .month-growth {
            font-size: 13px;
            color: #10b981;
            font-weight: 600;
          }
          
          .month-details {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid #e2e8f0;
          }
          
          .month-detail {
            font-size: 12px;
          }
          
          .month-detail-label {
            color: #64748b;
          }
          
          .month-detail-value {
            font-weight: 600;
            color: #1a2332;
          }
          
          .offer-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
            font-size: 12px;
          }
          
          .offer-table th {
            background: #1a2332;
            color: white;
            padding: 10px 12px;
            text-align: left;
            font-weight: 600;
          }
          
          .offer-table td {
            padding: 10px 12px;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .offer-table tr:nth-child(even) {
            background: #f8fafc;
          }
          
          .offer-type {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 600;
          }
          
          .offer-type.new { background: #dcfce7; color: #166534; }
          .offer-type.lapsed { background: #fef3c7; color: #92400e; }
          .offer-type.upsell { background: #dbeafe; color: #1e40af; }
          .offer-type.innovative { background: #f3e8ff; color: #6b21a8; }
          .offer-type.hero { background: #1a2332; color: white; }
          
          .risk-card {
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 12px;
          }
          
          .risk-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
          }
          
          .risk-name {
            font-weight: 600;
            color: #1a2332;
          }
          
          .risk-badges {
            display: flex;
            gap: 8px;
          }
          
          .risk-badge {
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 600;
          }
          
          .risk-badge.high { background: #fee2e2; color: #dc2626; }
          .risk-badge.medium { background: #fef3c7; color: #d97706; }
          .risk-badge.low { background: #dcfce7; color: #16a34a; }
          
          .risk-mitigation {
            font-size: 13px;
            color: #475569;
            background: white;
            padding: 10px;
            border-radius: 8px;
            margin-top: 8px;
          }
          
          .location-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
          
          .location-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 16px;
            text-align: center;
          }
          
          .location-name {
            font-weight: 600;
            color: #1a2332;
            margin-bottom: 4px;
          }
          
          .location-subtitle {
            font-size: 11px;
            color: #64748b;
            margin-bottom: 12px;
          }
          
          .location-value {
            font-size: 20px;
            font-weight: 700;
            color: #1a2332;
          }
          
          .location-percent {
            font-size: 14px;
            color: #64748b;
          }
          
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 11px;
            color: #64748b;
          }
          
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .page { padding: 20px; }
            .section { page-break-inside: avoid; }
            .month-card { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="header">
            <div class="logo">
              <div class="logo-box">P57</div>
              <div class="logo-text">
                <h1>Physique 57 India</h1>
                <p>2026 Sales Strategy</p>
              </div>
            </div>
            <div class="date">
              Generated: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}<br/>
              Period: ${activeFilter === 'ALL' ? 'Full Year 2026' : activeFilter}
            </div>
          </div>
    `;

    // Executive Summary Section
    if (sections.find(s => s.id === 'executive')?.enabled) {
      htmlContent += `
        <div class="section">
          <h2 class="section-title">Executive Summary</h2>
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-value">${formatCurrency(totalTarget)}</div>
              <div class="kpi-label">Total Target</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-value green">+${growthPercent}%</div>
              <div class="kpi-label">Growth Rate</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-value blue">${formatCurrency(mumbaiTarget)}</div>
              <div class="kpi-label">Mumbai (60%)</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-value purple">${formatCurrency(bengaluruTarget)}</div>
              <div class="kpi-label">Bengaluru (30%)</div>
            </div>
          </div>
        </div>
      `;
    }

    // Location Breakdown Section
    if (sections.find(s => s.id === 'locations')?.enabled) {
      const popupsTarget = totalTarget - mumbaiTarget - bengaluruTarget;
      htmlContent += `
        <div class="section">
          <h2 class="section-title">Location Breakdown</h2>
          <div class="location-grid">
            <div class="location-card">
              <div class="location-name">Mumbai</div>
              <div class="location-subtitle">Kwality House + Supreme HQ</div>
              <div class="location-value">${formatCurrency(mumbaiTarget)}</div>
              <div class="location-percent">60% Share</div>
            </div>
            <div class="location-card">
              <div class="location-name">Bengaluru</div>
              <div class="location-subtitle">Kenkere House</div>
              <div class="location-value">${formatCurrency(bengaluruTarget)}</div>
              <div class="location-percent">30% Share</div>
            </div>
            <div class="location-card">
              <div class="location-name">Pop-ups & Events</div>
              <div class="location-subtitle">Various Locations</div>
              <div class="location-value">${formatCurrency(popupsTarget)}</div>
              <div class="location-percent">10% Share</div>
            </div>
          </div>
        </div>
      `;
    }

    // Monthly Plans Section
    if (sections.find(s => s.id === 'monthly')?.enabled) {
      htmlContent += `<div class="section"><h2 class="section-title">Monthly Sales Plans</h2>`;
      
      filteredMonths.forEach(month => {
        const growth = Math.round(((month.target - month.historicBaseline) / month.historicBaseline) * 100);
        const monthOffers = offers[month.month] || month.offers;
        
        htmlContent += `
          <div class="month-card ${month.isAnniversary ? 'anniversary' : ''}">
            <div class="month-header">
              <div>
                <div class="month-name">${month.month} 2026 ${month.isAnniversary ? '★ 8th Anniversary' : ''}</div>
                <div class="month-theme">${month.theme}</div>
              </div>
              <div class="month-target">
                <div class="month-target-value">${formatCurrency(month.target)}</div>
                <div class="month-growth">+${growth}% YoY</div>
              </div>
            </div>
            <div class="month-details">
              <div class="month-detail">
                <div class="month-detail-label">Mumbai Target</div>
                <div class="month-detail-value">${formatCurrency(month.mumbaiTarget)}</div>
              </div>
              <div class="month-detail">
                <div class="month-detail-label">Bengaluru Target</div>
                <div class="month-detail-value">${formatCurrency(month.bengaluruTarget)}</div>
              </div>
              <div class="month-detail">
                <div class="month-detail-label">Focus</div>
                <div class="month-detail-value">${month.focus}</div>
              </div>
            </div>
        `;

        // Add offers table if enabled
        if (sections.find(s => s.id === 'offers')?.enabled && monthOffers.length > 0) {
          htmlContent += `
            <table class="offer-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Offer Name</th>
                  <th>Audience</th>
                  <th>Pricing</th>
                </tr>
              </thead>
              <tbody>
          `;
          
          monthOffers.forEach(offer => {
            const typeClass = offer.offerType.toLowerCase().includes('hero') ? 'hero' : 
                             offer.offerType.toLowerCase().includes('new') ? 'new' :
                             offer.offerType.toLowerCase().includes('lapsed') ? 'lapsed' :
                             offer.offerType.toLowerCase().includes('upsell') ? 'upsell' : 'innovative';
            
            htmlContent += `
              <tr>
                <td><span class="offer-type ${typeClass}">${offer.offerType}</span></td>
                <td><strong>${offer.offerName}</strong></td>
                <td>${offer.audience}</td>
                <td>${offer.pricingBreakdown}</td>
              </tr>
            `;
          });
          
          htmlContent += `</tbody></table>`;
        }
        
        htmlContent += `</div>`;
      });
      
      htmlContent += `</div>`;
    }

    // Risk Assessment Section
    if (sections.find(s => s.id === 'risks')?.enabled) {
      htmlContent += `<div class="section"><h2 class="section-title">Risk Assessment</h2>`;
      
      risks.forEach(risk => {
        htmlContent += `
          <div class="risk-card">
            <div class="risk-header">
              <div class="risk-name">${risk.risk}</div>
              <div class="risk-badges">
                <span class="risk-badge ${risk.probability.toLowerCase()}">${risk.probability} Probability</span>
                <span class="risk-badge ${risk.impact.toLowerCase()}">${risk.impact} Impact</span>
              </div>
            </div>
            <div class="risk-mitigation">
              <strong>Mitigation:</strong> ${risk.mitigation}
            </div>
          </div>
        `;
      });
      
      htmlContent += `</div>`;
    }

    // Footer
    htmlContent += `
          <div class="footer">
            <p>Physique 57 India | 2026 Sales Strategy Document</p>
            <p>Confidential - For Internal Use Only</p>
          </div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        setIsGenerating(false);
      }, 500);
    };
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Sales Plan to PDF"
      size="lg"
    >
      <div className="space-y-6">
        {/* Header Info */}
        <div className="flex items-center gap-4 p-4 bg-[#1a2332]/5 rounded-xl">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a2332] to-[#2d3a4f] flex items-center justify-center">
            <FileDown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-[#1a2332]">Generate PDF Report</h3>
            <p className="text-sm text-slate-500">
              Export {activeFilter === 'ALL' ? 'Full Year' : activeFilter} sales plan with selected sections
            </p>
          </div>
        </div>

        {/* Section Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Select sections to include:
          </label>
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                  section.enabled 
                    ? 'bg-[#1a2332]/5 border-[#1a2332]/20' 
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <section.icon className={`w-5 h-5 ${section.enabled ? 'text-[#1a2332]' : 'text-slate-400'}`} />
                  <span className={`font-medium ${section.enabled ? 'text-[#1a2332]' : 'text-slate-500'}`}>
                    {section.name}
                  </span>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  section.enabled ? 'bg-[#1a2332] text-white' : 'bg-slate-200'
                }`}>
                  {section.enabled && <Check className="w-4 h-4" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Info */}
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> The PDF will open in a new window. Use your browser's print dialog to save as PDF or print directly.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-slate-600 font-medium rounded-xl hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={generatePDF}
            disabled={isGenerating || !sections.some(s => s.enabled)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1a2332] text-white font-medium rounded-xl hover:bg-[#2d3a4f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Printer className="w-4 h-4" />
                Generate PDF
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ExportPDFModal;
