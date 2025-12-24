import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MonthData, Offer, formatCurrency, h1Risks, h2Risks } from '../data/salesData';

interface PDFExportOptions {
  includeExecutiveSummary?: boolean;
  includeMonthlyPlans?: boolean;
  includeOfferDetails?: boolean;
  includeLocationBreakdown?: boolean;
  includeRiskAssessment?: boolean;
  includeAISummaries?: boolean;
  scale?: number;
  filename?: string;
  monthlyData?: MonthData[];
  offers?: Record<string, Offer[]>;
  activeFilter?: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL';
  aiSummaries?: Record<string, string>;
  returnBlob?: boolean; // New option to return blob instead of downloading
}

export const generatePDF = async (
  element: HTMLElement,
  options: PDFExportOptions = {}
): Promise<void> => {
  const {
    includeExecutiveSummary = true,
    includeMonthlyPlans = true,
    includeOfferDetails = true,
    includeLocationBreakdown = true,
    includeRiskAssessment = true,
    scale = 2,
    filename = 'physique57-plan.pdf',
  } = options;

  try {
    // Create a clone of the element to manipulate without affecting the DOM
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Remove unwanted sections based on options
    if (!includeExecutiveSummary) {
      const execSummary = clone.querySelector('[data-pdf-section="executive-summary"]');
      execSummary?.remove();
    }
    
    if (!includeMonthlyPlans) {
      const monthlyPlans = clone.querySelectorAll('[data-pdf-section="monthly-plan"]');
      monthlyPlans.forEach(el => el.remove());
    }
    
    if (!includeOfferDetails) {
      const offers = clone.querySelectorAll('[data-pdf-section="offer-details"]');
      offers.forEach(el => el.remove());
    }

    if (!includeLocationBreakdown) {
      const locations = clone.querySelector('[data-pdf-section="location-breakdown"]');
      locations?.remove();
    }

    if (!includeRiskAssessment) {
      const risks = clone.querySelector('[data-pdf-section="risk-assessment"]');
      risks?.remove();
    }

    // Create temporary container
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.top = '-9999px';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = '210mm'; // A4 width
    tempContainer.style.padding = '20mm';
    tempContainer.style.background = 'white';
    tempContainer.appendChild(clone);
    document.body.appendChild(tempContainer);

    // Convert to canvas with high quality
    const canvas = await html2canvas(tempContainer, {
      scale: scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794, // A4 width in pixels at 96 DPI
    });

    // Clean up temporary container
    document.body.removeChild(tempContainer);

    // Calculate PDF dimensions (A4: 210 x 297 mm)
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = 297;
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    let heightLeft = imgHeight;
    let position = 0;

    // Add image to PDF (with pagination if needed)
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw error;
  }
};

export const generateAdvancedPDF = async (options: PDFExportOptions = {}): Promise<Blob | void> => {
  const {
    scale = 2,
    filename = `physique57-plan-${new Date().toISOString().split('T')[0]}.pdf`,
    returnBlob = false,
  } = options;

  try {
    // Find the main content element to capture
    const mainContent = document.querySelector('.dashboard-content') || document.querySelector('main') || document.body;
    
    // Clone the element to modify without affecting display
    const cloneContainer = document.createElement('div');
    cloneContainer.style.position = 'absolute';
    cloneContainer.style.left = '-9999px';
    cloneContainer.style.top = '0';
    cloneContainer.style.width = '1200px'; // Fixed width for consistent PDF
    cloneContainer.style.background = '#ffffff';
    document.body.appendChild(cloneContainer);
    
    const clone = mainContent.cloneNode(true) as HTMLElement;
    
    // Remove unwanted elements from clone
    clone.querySelectorAll('button, .no-print, [data-no-print]').forEach(el => {
      if (!el.classList.contains('keep-in-pdf')) {
        el.remove();
      }
    });
    
    cloneContainer.appendChild(clone);
    
    // Capture with html2canvas for exact styling
    const canvas = await html2canvas(cloneContainer, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 1200,
      windowWidth: 1200,
    });
    
    // Clean up
    document.body.removeChild(cloneContainer);
    // Filter monthly data based on active filter
    const filteredMonths = activeFilter === 'ALL' 
      ? monthlyData 
      : monthlyData.filter(m => m.quarter === activeFilter);

    // Calculate totals
    const totalTarget = filteredMonths.reduce((sum, m) => sum + m.target, 0);
    const totalBaseline = filteredMonths.reduce((sum, m) => sum + m.historicBaseline, 0);
    const growthPercent = totalBaseline > 0 ? Math.round(((totalTarget - totalBaseline) / totalBaseline) * 100) : 0;
    const mumbaiTotal = filteredMonths.reduce((sum, m) => sum + m.mumbaiTarget, 0);
    const bengaluruTotal = filteredMonths.reduce((sum, m) => sum + m.bengaluruTarget, 0);
    
    // Get risks based on filter
    const getHalf = (filter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL') => {
      if (filter === 'ALL') return 'ALL';
      return (filter === 'Q1' || filter === 'Q2') ? 'H1' : 'H2';
    };
    const halfFilter = getHalf(activeFilter);
    const risks = halfFilter === 'H1' ? h1Risks : halfFilter === 'H2' ? h2Risks : [...h1Risks, ...h2Risks];

    // A4 dimensions in mm
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);

    const pdf = new jsPDF('p', 'mm', 'a4');
    let yPos = margin;

    // Helper function to add new page
    const addNewPage = () => {
      pdf.addPage();
      yPos = margin;
    };

    // Helper to check if we need a new page
    const checkNewPage = (requiredSpace: number) => {
      if (yPos + requiredSpace > pageHeight - margin - 25) { // 25mm for footer
        addNewPage();
      }
    };

    // Add header with purple gradient
    pdf.setFillColor(151, 71, 255); // Primary purple
    pdf.rect(0, 0, pageWidth, 40, 'F');
    
    // Add logo/title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Physique 57 India', margin, 20);
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Strategic Revenue Plan 2026', margin, 30);

    // Add generated date
    pdf.setFontSize(10);
    const dateStr = new Date().toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    pdf.text(`Generated: ${dateStr}`, pageWidth - margin - 60, 35);

    yPos = 50;

    // Add Executive Summary section if enabled
    if (options.includeExecutiveSummary) {
      checkNewPage(40);
      
      // Section title with light background
      pdf.setFillColor(248, 250, 252);
      pdf.rect(margin, yPos, contentWidth, 10, 'F');
      
      pdf.setTextColor(30, 30, 30);
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Executive Summary', margin + 5, yPos + 7);
      
      yPos += 14;
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(50, 50, 50);
      const summaryText = `This comprehensive plan covers ${filteredMonths.length} months (${activeFilter === 'ALL' ? 'Full Year' : activeFilter}) targeting sustainable growth through ${Object.values(offers).flat().length} strategic offers across multiple customer segments.`;
      
      const lines = pdf.splitTextToSize(summaryText, contentWidth - 10);
      pdf.text(lines, margin + 5, yPos);
      
      yPos += 18;

      // Add metrics grid - clean print style
      checkNewPage(50);
      
      const metrics = [
        { label: 'Total Target', value: formatCurrency(totalTarget), color: [151, 71, 255] },
        { label: 'Total Baseline', value: formatCurrency(totalBaseline), color: [34, 197, 94] },
        { label: 'Growth', value: `+${growthPercent}%`, color: [249, 115, 22] },
        { label: 'Active Months', value: filteredMonths.length.toString(), color: [59, 130, 246] },
      ];

      metrics.forEach((metric, index) => {
        const x = margin + (index % 2) * (contentWidth / 2);
        const y = yPos + Math.floor(index / 2) * 28;
        
        // White background with colored border (print-friendly)
        pdf.setFillColor(255, 255, 255);
        pdf.rect(x, y, contentWidth / 2 - 5, 24, 'F');
        
        // Colored border
        pdf.setDrawColor(metric.color[0], metric.color[1], metric.color[2]);
        pdf.setLineWidth(1);
        pdf.rect(x, y, contentWidth / 2 - 5, 24, 'S');
        
        // Label
        pdf.setFontSize(9);
        pdf.setTextColor(100, 100, 100);
        pdf.setFont('helvetica', 'normal');
        pdf.text(metric.label, x + 4, y + 8);
        
        // Value
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(30, 30, 30);
        pdf.text(metric.value, x + 4, y + 18);
        pdf.setFont('helvetica', 'normal');
      });

      yPos += 60;
    }

    // Monthly Plans section
    if (options.includeMonthlyPlans && filteredMonths.length > 0) {
      checkNewPage(30);
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(30, 30, 30);
      pdf.text('Monthly Strategic Plans', margin, yPos);
      
      yPos += 12;

      filteredMonths.forEach((month) => {
        checkNewPage(40);
        
        // Month header - white background with border
        pdf.setFillColor(255, 255, 255);
        pdf.rect(margin, yPos, contentWidth, 36, 'F');
        
        pdf.setDrawColor(151, 71, 255);
        pdf.setLineWidth(1.5);
        pdf.rect(margin, yPos, contentWidth, 36, 'S');
        
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(151, 71, 255);
        pdf.text(`${month.month} 2026`, margin + 4, yPos + 8);
        
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(60, 60, 60);
        pdf.text(`Target: ${formatCurrency(month.target)}  •  Baseline: ${formatCurrency(month.historicBaseline)}  •  Theme: ${month.theme}`, margin + 4, yPos + 16);
        
        const monthOffers = offers[month.month] || [];
        pdf.text(`Offers: ${monthOffers.length}  •  Mumbai: ${formatCurrency(month.mumbaiTarget)}  •  Bengaluru: ${formatCurrency(month.bengaluruTarget)}`, margin + 4, yPos + 22);
        
        // Context
        const contextLines = pdf.splitTextToSize(month.context, contentWidth - 8);
        pdf.setFontSize(8);
        pdf.setTextColor(80, 80, 80);
        pdf.text(contextLines.slice(0, 2), margin + 4, yPos + 28);
        
        yPos += 40;

        // Add AI Summary if available and enabled
        if (options.includeAISummaries && options.aiSummaries?.[month.month]) {
          checkNewPage(40);
          
          // AI Summary header - clean print style
          pdf.setFillColor(240, 253, 244); // Very light green
          pdf.rect(margin, yPos, contentWidth, 10, 'F');
          
          pdf.setDrawColor(34, 197, 94);
          pdf.setLineWidth(0.5);
          pdf.line(margin, yPos + 10, margin + contentWidth, yPos + 10);
          
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(22, 163, 74);
          pdf.text('✨ AI Strategic Analysis', margin + 4, yPos + 7);
          
          yPos += 14;
          
          // Split the AI summary into lines that fit the page
          const summaryText = options.aiSummaries[month.month];
          const summaryLines = summaryText.split('\n');
          
          pdf.setFillColor(255, 255, 255);
          
          pdf.setFontSize(8);
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(40, 40, 40);
          
          summaryLines.forEach((line) => {
            checkNewPage(5);
            
            // Handle long lines by splitting them
            const wrappedLines = pdf.splitTextToSize(line || ' ', contentWidth - 8);
            wrappedLines.forEach((wrappedLine: string) => {
              checkNewPage(5);
              pdf.text(wrappedLine, margin + 4, yPos);
              yPos += 4;
            });
          });
          
          yPos += 8;
        }
      });
    }

    // Offer Details section
    if (options.includeOfferDetails) {
      checkNewPage(30);
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(30, 30, 30);
      pdf.text('Strategic Offers', margin, yPos);
      
      yPos += 12;

      filteredMonths.forEach((month) => {
        const monthOffers = offers[month.month] || [];
        
        if (monthOffers.length === 0) return;
        
        checkNewPage(20);
        
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(151, 71, 255);
        pdf.text(`${month.month} Offers (${monthOffers.length})`, margin, yPos);
        
        yPos += 10;

        monthOffers.forEach((offer, idx) => {
          checkNewPage(45);
          
          // Offer box - white with border
          pdf.setFillColor(255, 255, 255);
          pdf.rect(margin, yPos, contentWidth, 40, 'F');
          
          pdf.setDrawColor(220, 220, 220);
          pdf.setLineWidth(0.5);
          pdf.rect(margin, yPos, contentWidth, 40, 'S');
          
          // Offer number badge
          pdf.setFillColor(151, 71, 255);
          pdf.circle(margin + 6, yPos + 6, 3.5, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'bold');
          pdf.text((idx + 1).toString(), margin + 4.5, yPos + 7.5);
          
          // Offer name
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(30, 30, 30);
          const offerNameLines = pdf.splitTextToSize(offer.offerName, contentWidth - 30);
          pdf.text(offerNameLines[0], margin + 12, yPos + 7);
          
          // Type and audience
          pdf.setFontSize(8);
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(100, 100, 100);
          pdf.text(`${offer.offerType} • ${offer.audience}`, margin + 12, yPos + 14);
          
          // Package mechanics (truncated)
          pdf.setFontSize(8);
          pdf.setTextColor(60, 60, 60);
          const mechanicsLines = pdf.splitTextToSize(offer.packageMechanics, contentWidth - 16);
          pdf.text(mechanicsLines.slice(0, 2), margin + 6, yPos + 21);
          
          // Pricing - clean style
          pdf.setFontSize(8);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(22, 163, 74);
          const pricingText = offer.pricingBreakdown.split('\n')[0].slice(0, 50);
          pdf.text(pricingText, margin + 6, yPos + 32);
          
          yPos += 44;
        });
        
        yPos += 8;
      });
    }

    // Location Breakdown section
    if (options.includeLocationBreakdown && filteredMonths.length > 0) {
      checkNewPage(60);
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(30, 30, 30);
      pdf.text('Location Breakdown', margin, yPos);
      
      yPos += 12;
      
      // Mumbai - white box with border
      pdf.setFillColor(255, 255, 255);
      pdf.rect(margin, yPos, contentWidth / 2 - 5, 34, 'F');
      pdf.setDrawColor(151, 71, 255);
      pdf.setLineWidth(1);
      pdf.rect(margin, yPos, contentWidth / 2 - 5, 34, 'S');
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(151, 71, 255);
      pdf.text('Mumbai', margin + 5, yPos + 10);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(60, 60, 60);
      pdf.text(`Target: ${formatCurrency(mumbaiTotal)}`, margin + 5, yPos + 19);
      pdf.text(`Share: ${((mumbaiTotal / totalTarget) * 100).toFixed(1)}%`, margin + 5, yPos + 27);
      
      // Bengaluru - white box with border
      pdf.setFillColor(255, 255, 255);
      pdf.rect(margin + contentWidth / 2, yPos, contentWidth / 2 - 5, 34, 'F');
      pdf.setDrawColor(34, 197, 94);
      pdf.setLineWidth(1);
      pdf.rect(margin + contentWidth / 2, yPos, contentWidth / 2 - 5, 34, 'S');
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(34, 197, 94);
      pdf.text('Bengaluru', margin + contentWidth / 2 + 5, yPos + 10);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(60, 60, 60);
      pdf.text(`Target: ${formatCurrency(bengaluruTotal)}`, margin + contentWidth / 2 + 5, yPos + 19);
      pdf.text(`Share: ${((bengaluruTotal / totalTarget) * 100).toFixed(1)}%`, margin + contentWidth / 2 + 5, yPos + 27);
      
      yPos += 40;
    }

    // Risk Assessment section
    if (options.includeRiskAssessment && risks.length > 0) {
      checkNewPage(30);
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(30, 30, 30);
      pdf.text('Risk Assessment', margin, yPos);
      
      yPos += 12;

      risks.slice(0, 5).forEach((risk, idx) => {
        checkNewPage(28);
        
        // White box with warning border
        pdf.setFillColor(255, 255, 255);
        pdf.rect(margin, yPos, contentWidth, 24, 'F');
        
        pdf.setDrawColor(249, 115, 22);
        pdf.setLineWidth(0.8);
        pdf.rect(margin, yPos, contentWidth, 24, 'S');
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(249, 115, 22);
        pdf.text(`${idx + 1}. ${risk.risk}`, margin + 4, yPos + 7);
        
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(60, 60, 60);
        const mitigationLines = pdf.splitTextToSize(`Mitigation: ${risk.mitigation}`, contentWidth - 12);
        pdf.text(mitigationLines.slice(0, 2), margin + 4, yPos + 14);
        
        yPos += 28;
      });
    }

    // Footer on each page
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      
      // Footer line
      pdf.setDrawColor(220, 220, 220);
      pdf.setLineWidth(0.3);
      pdf.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);
      
      // Footer text
      pdf.setFontSize(9);
      pdf.setTextColor(140, 140, 140);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Physique 57 India - Confidential', margin, pageHeight - 12);
      pdf.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 30, pageHeight - 12);
    }

    // Return blob or save PDF
    if (returnBlob) {
      return pdf.output('blob');
    } else {
      pdf.save(filename);
    }
  } catch (error) {
    console.error('Advanced PDF generation failed:', error);
    throw error;
  }
};
