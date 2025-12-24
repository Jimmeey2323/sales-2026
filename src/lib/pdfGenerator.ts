import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MonthData, Offer } from '../data/salesData';
import { generateMonthlySummary } from './openai';

interface PDFExportOptions {
  includeExecutiveSummary?: boolean;
  includeMonthlyPlans?: boolean;
  includeOfferDetails?: boolean;
  includeLocationBreakdown?: boolean;
  includeRiskAssessment?: boolean;
  includeAISummaries?: boolean;
  scale?: number;
  filename?: string;
  returnBlob?: boolean;
  pageOrientation?: 'portrait' | 'landscape';
  pageSize?: 'a4' | 'letter' | 'legal';
  colorScheme?: 'color' | 'grayscale';
  includeLogo?: boolean;
  includePageNumbers?: boolean;
  includeTableOfContents?: boolean;
  fontSize?: 'small' | 'medium' | 'large';
  compactMode?: boolean;
  monthlyData?: MonthData[];
  offers?: Record<string, Offer[]>;
  activeFilter?: string;
}

/**
 * Generate beautifully styled professional PDF with AI summaries
 */
export const generateAdvancedPDF = async (options: PDFExportOptions = {}): Promise<Blob | void> => {
  const {
    filename = `Physique57-Strategic-Plan-${new Date().toISOString().split('T')[0]}.pdf`,
    returnBlob = false,
    pageOrientation = 'portrait',
    pageSize = 'a4',
    includePageNumbers = true,
    monthlyData = [],
    offers = {},
    activeFilter = 'ALL',
    includeAISummaries = true,
  } = options;

  try {
    const pdf = new jsPDF({
      orientation: pageOrientation,
      unit: 'mm',
      format: pageSize,
      compress: true
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = margin;

    // Helper: Add header to every page
    const addHeader = (pageNum: number) => {
      // Header background
      pdf.setFillColor(151, 71, 255);
      pdf.rect(0, 0, pageWidth, 35, 'F');
      
      // Logo/Title
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PHYSIQUE 57 INDIA', margin, 15);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Strategic Revenue Plan 2026', margin, 23);
      
      // Date
      pdf.setFontSize(8);
      const dateStr = new Date().toLocaleDateString('en-IN', { 
        year: 'numeric', month: 'short', day: 'numeric' 
      });
      pdf.text(dateStr, pageWidth - margin, 15, { align: 'right' });
      
      if (includePageNumbers && pageNum > 0) {
        pdf.text(`Page ${pageNum}`, pageWidth - margin, 23, { align: 'right' });
      }
    };

    // Helper: Add footer
    const addFooter = () => {
      pdf.setDrawColor(220, 220, 220);
      pdf.setLineWidth(0.5);
      pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
      
      pdf.setFontSize(8);
      pdf.setTextColor(140, 140, 140);
      pdf.setFont('helvetica', 'italic');
      pdf.text('Confidential - For Internal Use Only', margin, pageHeight - 8);
      pdf.text('© 2026 Physique 57 India', pageWidth - margin, pageHeight - 8, { align: 'right' });
    };

    // Helper: Check if new page needed
    const checkNewPage = (requiredSpace: number, pageNumCurrent: number) => {
      if (yPos + requiredSpace > pageHeight - 25) {
        pdf.addPage();
        const newPageNum = pageNumCurrent + 1;
        addHeader(newPageNum);
        addFooter();
        yPos = 45;
        return newPageNum;
      }
      return pageNumCurrent;
    };

    // Helper: Draw bordered box
    const drawBox = (x: number, y: number, w: number, h: number, fillR?: number, fillG?: number, fillB?: number, borderR?: number, borderG?: number, borderB?: number) => {
      if (fillR !== undefined && fillG !== undefined && fillB !== undefined) {
        pdf.setFillColor(fillR, fillG, fillB);
        pdf.rect(x, y, w, h, 'F');
      }
      if (borderR !== undefined && borderG !== undefined && borderB !== undefined) {
        pdf.setDrawColor(borderR, borderG, borderB);
        pdf.setLineWidth(0.8);
        pdf.rect(x, y, w, h, 'S');
      }
    };

    let pageNum = 1;
    addHeader(0);
    addFooter();

    // Cover Page
    yPos = 80;
    
    // Main Title
    pdf.setFontSize(32);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(31, 41, 55);
    pdf.text('2026', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 15;
    pdf.setFontSize(24);
    pdf.text('Strategic Revenue Plan', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 30;
    drawBox(margin, yPos, contentWidth, 80, 248, 250, 252, 151, 71, 255);
    
    yPos += 15;
    pdf.setFontSize(14);
    pdf.setTextColor(151, 71, 255);
    pdf.text('EXECUTIVE OVERVIEW', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 12;
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(31, 41, 55);
    const coverText = `This comprehensive strategic document outlines our revenue generation roadmap for 2026, featuring ${monthlyData.length} months of carefully crafted campaigns across ${Object.values(offers).flat().length} strategic offers targeting multiple customer segments.`;
    const coverLines = pdf.splitTextToSize(coverText, contentWidth - 30);
    pdf.text(coverLines, pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 30;
    const totalTarget = monthlyData.reduce((sum, m) => sum + m.target, 0);
    pdf.setFontSize(36);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(151, 71, 255);
    pdf.text(`₹${(totalTarget / 10000000).toFixed(2)}Cr`, pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 8;
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Annual Revenue Target', pageWidth / 2, yPos, { align: 'center' });

    // Start monthly sections
    for (const month of monthlyData) {
      pdf.addPage();
      pageNum++;
      addHeader(pageNum);
      addFooter();
      yPos = 50;

      // Month Header with border
      drawBox(margin, yPos, contentWidth, 25, 151, 71, 255, undefined, undefined, undefined);
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${month.month.toUpperCase()} 2026`, margin + 5, yPos + 10);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Target: ₹${(month.target / 100000).toFixed(2)}L | Theme: ${month.theme}`, margin + 5, yPos + 18);
      
      yPos += 30;

      // Metrics box
      drawBox(margin, yPos, contentWidth, 35, 248, 250, 252, 220, 220, 220);
      
      const metrics = [
        { label: 'Monthly Target', value: `₹${(month.target / 100000).toFixed(2)}L`, x: 0 },
        { label: 'Last Year', value: `₹${(month.lastYearRevenue / 100000).toFixed(2)}L`, x: contentWidth / 3 },
        { label: 'Growth', value: `+${Math.round(((month.target - month.lastYearRevenue) / month.lastYearRevenue) * 100)}%`, x: (contentWidth / 3) * 2 },
      ];

      metrics.forEach(m => {
        pdf.setFontSize(9);
        pdf.setTextColor(100, 100, 100);
        pdf.text(m.label, margin + m.x + 10, yPos + 10);
        
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(31, 41, 55);
        pdf.text(m.value, margin + m.x + 10, yPos + 22);
        pdf.setFont('helvetica', 'normal');
      });
      
      yPos += 42;

      // AI Summary if enabled
      if (includeAISummaries) {
        pageNum = checkNewPage(50, pageNum);
        
        // Generate AI summary
        const monthOffers = offers[month.month] || [];
        const aiSummary = await generateMonthlySummary({
          month: month.month,
          theme: month.theme,
          context: month.context,
          target: month.target,
          offers: monthOffers.map(o => ({
            offerName: o.offerName,
            offerType: o.offerType,
            audience: o.audience,
          })),
        });

        // AI Summary header
        drawBox(margin, yPos, contentWidth, 10, 240, 253, 244, 34, 197, 94);
        
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(34, 197, 94);
        pdf.text('✨ AI STRATEGIC ANALYSIS', margin + 4, yPos + 7);
        
        yPos += 14;

        // Summary content in bordered box
        const summaryLines = aiSummary.split('\n');
        const estimatedHeight = summaryLines.length * 4 + 10;
        
        pageNum = checkNewPage(estimatedHeight, pageNum);
        
        drawBox(margin, yPos, contentWidth, estimatedHeight, 255, 255, 255, 220, 220, 220);
        
        yPos += 5;
        pdf.setFontSize(8);
        pdf.setFont('courier', 'normal');
        pdf.setTextColor(40, 40, 40);
        
        summaryLines.forEach((line) => {
          pageNum = checkNewPage(5, pageNum);
          const wrappedLines = pdf.splitTextToSize(line || ' ', contentWidth - 8);
          wrappedLines.forEach((wLine: string) => {
            pageNum = checkNewPage(5, pageNum);
            pdf.text(wLine, margin + 4, yPos);
            yPos += 4;
          });
        });
        
        yPos += 10;
      }

      // Offers section
      const monthOffers = offers[month.month] || [];
      if (monthOffers.length > 0) {
        pageNum = checkNewPage(15, pageNum);
        
        pdf.setFontSize(13);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(31, 41, 55);
        pdf.text(`Strategic Offers (${monthOffers.length})`, margin, yPos);
        
        yPos += 8;

        monthOffers.forEach((offer, idx) => {
          pageNum = checkNewPage(50, pageNum);
          
          // Offer box with gradient effect
          drawBox(margin, yPos, contentWidth, 45, 255, 255, 255, 151, 71, 255);
          
          // Offer number badge
          pdf.setFillColor(151, 71, 255);
          pdf.circle(margin + 8, yPos + 8, 4.5, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'bold');
          pdf.text((idx + 1).toString(), margin + 6.5, yPos + 10);
          
          // Offer name
          pdf.setFontSize(11);
          pdf.setTextColor(31, 41, 55);
          const offerNameLines = pdf.splitTextToSize(offer.offerName, contentWidth - 40);
          pdf.text(offerNameLines[0], margin + 16, yPos + 9);
          
          // Type and audience
          pdf.setFontSize(8);
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(100, 100, 100);
          pdf.text(`${offer.offerType} • ${offer.audience}`, margin + 16, yPos + 16);
          
          // Package mechanics
          pdf.setFontSize(8);
          pdf.setTextColor(60, 60, 60);
          const mechanicsLines = pdf.splitTextToSize(offer.packageMechanics, contentWidth - 16);
          pdf.text(mechanicsLines.slice(0, 2), margin + 8, yPos + 24);
          
          // Pricing highlight
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(34, 197, 94);
          const pricingText = offer.pricingBreakdown.split('\n')[0].slice(0, 60);
          pdf.text(pricingText, margin + 8, yPos + 38);
          
          yPos += 50;
        });
      }

      // Month separator
      yPos += 5;
      pdf.setDrawColor(151, 71, 255);
      pdf.setLineWidth(2);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;
    }

    // Return blob or download
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
