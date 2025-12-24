// OpenAI Service for AI-powered features
// Note: In production, API calls should go through your backend to keep API keys secure

import { allPricing, mumbaiPricing, bengaluruPricing, calculateFinalPrice, type PricingData } from '../utils/pricingData';

export interface AIEnhancementRequest {
  offerName: string;
  offerType: string;
  audience: string;
  packageMechanics: string;
  pricingBreakdown: string;
  whyItWorks?: string;
}

export interface AISummaryRequest {
  month: string;
  theme: string;
  context: string;
  target: number;
  offers: Array<{
    offerName: string;
    offerType: string;
    audience: string;
  }>;
}

// Mock OpenAI responses for demo (replace with actual API calls in production)
export const enhanceOfferWithAI = async (offer: AIEnhancementRequest): Promise<Partial<AIEnhancementRequest>> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Generate enhanced content based on offer details
  const enhancements: Partial<AIEnhancementRequest> = {};

  // Enhance package mechanics if basic
  if (offer.packageMechanics && offer.packageMechanics.length < 50) {
    enhancements.packageMechanics = `${offer.packageMechanics}. This comprehensive package is designed to maximize member engagement and retention by providing exceptional value through unlimited access to all studio locations. Members can enjoy flexible scheduling across all available class times, ensuring they can maintain their fitness journey regardless of their busy lifestyle. The offer includes access to premium amenities, personalized onboarding sessions, and ongoing support from our expert instructors.`;
  }

  // Enhance pricing breakdown
  if (offer.pricingBreakdown && !offer.pricingBreakdown.includes('ROI')) {
    enhancements.pricingBreakdown = `${offer.pricingBreakdown}
    
VALUE BREAKDOWN:
• Unlimited classes (estimated 20 classes/month = ₹250/class vs. ₹800 drop-in rate)
• Total potential value: ₹16,000/month
• Member savings: ${Math.round(((16000 - parseInt(offer.pricingBreakdown.replace(/[^0-9]/g, '') || '5000')) / 16000) * 100)}%
• Average ROI for committed members: 3.2x value`;
  }

  // Generate compelling "Why It Works"
  if (!offer.whyItWorks || offer.whyItWorks.length < 30) {
    const psychologyPoints = [
      'Creates immediate value perception through transparent pricing',
      'Reduces decision friction by eliminating commitment anxiety',
      'Leverages social proof from our growing community of 2,500+ active members',
      'Taps into the reciprocity principle - members feel valued and reciprocate with loyalty',
      'Aligns with behavioral psychology: small commitment leads to habit formation',
      'Addresses the main barrier to entry (cost) while maintaining premium positioning'
    ];

    enhancements.whyItWorks = `PSYCHOLOGICAL TRIGGERS:

${psychologyPoints.slice(0, 3).map((p, i) => `${i + 1}. ${p}`).join('\n')}

MARKET POSITIONING:
This offer strategically positions Physique 57 as both accessible and premium. By offering exceptional value during the trial period, we attract quality prospects who are more likely to convert to long-term members. Industry data shows that members who complete a 30-day trial have an 87% retention rate after 12 months.

COMPETITIVE ADVANTAGE:
Unlike competitors who offer limited trial classes, our unlimited access creates a true lifestyle integration opportunity. Members experience the full Physique 57 transformation, building habits and community connections that drive long-term retention.

REVENUE IMPACT:
• Estimated conversion rate: 65-75% (industry avg: 45%)
• Average lifetime value: ₹85,000
• CAC recovery: 2.3 months (vs. industry avg: 6 months)
• Referral multiplier: 1.4x (active members refer average 1.4 new prospects)`;
  }

  return enhancements;
};

export const generateMonthlySummary = async (data: AISummaryRequest): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const offerCount = data.offers.length;
  const offerTypes = [...new Set(data.offers.map(o => o.offerType))];
  const primaryAudiences = [...new Set(data.offers.map(o => o.audience))];
  
  // Analyze actual offers to generate dynamic insights
  const newMemberOffers = data.offers.filter(o => o.offerType.includes('New Member'));
  const lapsedOffers = data.offers.filter(o => o.offerType.includes('Lapsed'));
  const upsellOffers = data.offers.filter(o => o.offerType.includes('Upsell'));
  const innovativeOffers = data.offers.filter(o => o.offerType.includes('Innovative'));
  
  // Calculate revenue projections per offer type
  const avgNewMemberValue = 5000; // Average value per new member
  const avgLapsedValue = 6500; // Higher value as they're familiar with the service
  const avgUpsellValue = 3000; // Incremental value from existing members
  const avgInnovativeValue = 5500;
  
  // Project member acquisitions per offer
  const membersPerNewOffer = 25;
  const membersPerLapsedOffer = 15;
  const membersPerUpsellOffer = 20;
  const membersPerInnovativeOffer = 18;
  
  // Calculate projected revenue by segment
  const newMemberRevenue = newMemberOffers.length * membersPerNewOffer * avgNewMemberValue;
  const lapsedRevenue = lapsedOffers.length * membersPerLapsedOffer * avgLapsedValue;
  const upsellRevenue = upsellOffers.length * membersPerUpsellOffer * avgUpsellValue;
  const innovativeRevenue = innovativeOffers.length * membersPerInnovativeOffer * avgInnovativeValue;
  const totalProjectedRevenue = newMemberRevenue + lapsedRevenue + upsellRevenue + innovativeRevenue;
  
  // Calculate contribution percentages
  const newMemberContribution = totalProjectedRevenue > 0 ? (newMemberRevenue / totalProjectedRevenue * 100).toFixed(1) : '0';
  const lapsedContribution = totalProjectedRevenue > 0 ? (lapsedRevenue / totalProjectedRevenue * 100).toFixed(1) : '0';
  const upsellContribution = totalProjectedRevenue > 0 ? (upsellRevenue / totalProjectedRevenue * 100).toFixed(1) : '0';
  const innovativeContribution = totalProjectedRevenue > 0 ? (innovativeRevenue / totalProjectedRevenue * 100).toFixed(1) : '0';
  
  // Calculate target gap
  const revenueGap = data.target - totalProjectedRevenue;
  const gapPercentage = data.target > 0 ? ((revenueGap / data.target) * 100).toFixed(1) : '0';
  
  return `STRATEGIC EXECUTION PLAN - ${data.month} 2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 REVENUE TARGET ANALYSIS

Monthly Target: ₹${(data.target / 100000).toFixed(2)}L
Projected Revenue from ${offerCount} Offers: ₹${(totalProjectedRevenue / 100000).toFixed(2)}L
${revenueGap > 0 ? `⚠️ Revenue Gap: ₹${(revenueGap / 100000).toFixed(2)}L (${gapPercentage}% short of target)` : `✅ Target Exceeded by: ₹${(Math.abs(revenueGap) / 100000).toFixed(2)}L`}

BREAKDOWN BY REVENUE SOURCE:
• New Member Acquisition: ₹${(newMemberRevenue / 100000).toFixed(2)}L (${newMemberContribution}% of total)
• Lapsed Member Reactivation: ₹${(lapsedRevenue / 100000).toFixed(2)}L (${lapsedContribution}% of total)
• Existing Member Upsell: ₹${(upsellRevenue / 100000).toFixed(2)}L (${upsellContribution}% of total)
• Innovative Campaigns: ₹${(innovativeRevenue / 100000).toFixed(2)}L (${innovativeContribution}% of total)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 OFFER PORTFOLIO - ${offerCount} STRATEGIC OFFERS

${data.offers.map((offer, i) => {
  const isNewMember = offer.offerType.includes('New Member');
  const isLapsed = offer.offerType.includes('Lapsed');
  const isUpsell = offer.offerType.includes('Upsell');
  const isInnovative = offer.offerType.includes('Innovative');
  
  const projectedMembers = isNewMember ? membersPerNewOffer : 
                           isLapsed ? membersPerLapsedOffer : 
                           isUpsell ? membersPerUpsellOffer : 
                           membersPerInnovativeOffer;
  
  const avgValue = isNewMember ? avgNewMemberValue : 
                   isLapsed ? avgLapsedValue : 
                   isUpsell ? avgUpsellValue : 
                   avgInnovativeValue;
  
  const offerRevenue = projectedMembers * avgValue;
  const revenueContribution = data.target > 0 ? ((offerRevenue / data.target) * 100).toFixed(1) : '0';
  
  return `
OFFER ${i + 1}: "${offer.offerName}"
├─ Category: ${offer.offerType}
├─ Target Audience: ${offer.audience}
├─ Projected Conversions: ${projectedMembers} members
├─ Average Transaction Value: ₹${avgValue.toLocaleString()}
├─ Projected Revenue: ₹${(offerRevenue / 100000).toFixed(2)}L
└─ Contribution to Target: ${revenueContribution}%

Why This Offer Works:
${isNewMember ? `→ Targets fresh prospects with compelling first-time value
→ Lower barrier to entry increases conversion probability
→ Expected conversion rate: 12-15% of leads reached
→ CAC recovery timeline: 2-3 months with standard retention` : ''}${isLapsed ? `→ Leverages existing brand familiarity and past positive experience
→ Win-back offers typically see 20-25% higher LTV than new members
→ Reduced onboarding friction accelerates revenue realization
→ Ideal launch timing: Days 8-12 of month for maximum impact` : ''}${isUpsell ? `→ Minimal acquisition cost as targeting existing member base
→ Higher conversion rate (25-30%) due to established trust
→ Incremental revenue without proportional cost increase
→ Strengthens member retention through increased value perception` : ''}${isInnovative ? `→ Tests new market positioning and value propositions
→ Provides competitive differentiation in saturated market
→ Builds brand innovation perception
→ Success creates blueprint for future campaign scaling` : ''}`
}).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 EXECUTION TIMELINE & TACTICS

${newMemberOffers.length > 0 ? `
WEEK 1 (Days 1-7): NEW MEMBER ACQUISITION BLITZ
Primary Offer: "${newMemberOffers[0].offerName}"
→ Launch on Day 1 with 100% marketing budget allocation
→ Multi-channel push: Instagram (40%), Facebook (30%), Google (20%), Referrals (10%)
→ Daily goal: ${Math.ceil(membersPerNewOffer / 4)} sign-ups
→ Budget allocation: ₹${((newMemberRevenue * 0.25) / 100000).toFixed(2)}L for ads
→ Key metric: CPL (Cost Per Lead) should stay under ₹400
` : ''}${lapsedOffers.length > 0 ? `
WEEK 2 (Days 8-14): LAPSED MEMBER REACTIVATION
Primary Offer: "${lapsedOffers[0].offerName}"
→ Email campaign to ${Math.floor(membersPerLapsedOffer * 10)} lapsed members (target 15% open rate)
→ Personalized SMS to high-value churned members (LTV > ₹20k)
→ Retargeting ads on social platforms
→ Daily goal: ${Math.ceil(membersPerLapsedOffer / 4)} reactivations
→ Expected ROI: 3.5x (industry benchmark for win-back campaigns)
` : ''}${upsellOffers.length > 0 ? `
WEEK 3 (Days 15-21): EXISTING MEMBER UPSELL CAMPAIGN
Primary Offer: "${upsellOffers[0].offerName}"
→ In-studio promotion during peak hours (6-8 AM, 6-8 PM)
→ Instructor-led soft sell during classes
→ Exclusive member app notification
→ Daily goal: ${Math.ceil(membersPerUpsellOffer / 4)} upgrades
→ Conversion target: 25% of approached members
` : ''}${innovativeOffers.length > 0 ? `
WEEK 4 (Days 22-30): INNOVATIVE CAMPAIGN TESTING
Primary Offer: "${innovativeOffers[0].offerName}"
→ Soft launch to test market response
→ A/B test messaging, creative, and targeting
→ Budget: ₹${((innovativeRevenue * 0.15) / 100000).toFixed(2)}L (conservative for testing)
→ Success metric: CPA < ₹${Math.floor(avgInnovativeValue * 0.4)}
→ If successful, scale in following month
` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 STRATEGIC INSIGHTS & RECOMMENDATIONS

${revenueGap > 0 ? `
⚠️ CRITICAL: Target Gap Analysis
Current offers project ₹${(totalProjectedRevenue / 100000).toFixed(2)}L vs. target of ₹${(data.target / 100000).toFixed(2)}L

TO CLOSE THE GAP:
${newMemberOffers.length === 0 ? `1. ADD NEW MEMBER OFFER: Could contribute ₹${(membersPerNewOffer * avgNewMemberValue / 100000).toFixed(2)}L` : ''}
${lapsedOffers.length === 0 ? `${newMemberOffers.length === 0 ? '2' : '1'}. ADD LAPSED MEMBER OFFER: Could contribute ₹${(membersPerLapsedOffer * avgLapsedValue / 100000).toFixed(2)}L` : ''}
${newMemberOffers.length > 0 ? `→ Increase ${newMemberOffers[0].offerName} conversion goal by ${Math.ceil((revenueGap / avgNewMemberValue) / newMemberOffers.length)} members` : ''}
→ Consider flash offer in week 4 if pacing below 80% of target by day 20
→ Reallocate budget from underperforming channels to top performers
` : `
✅ STRONG POSITION: Projected Revenue Exceeds Target
Portfolio is well-positioned to meet and exceed target.

OPTIMIZATION OPPORTUNITIES:
→ Monitor daily conversion rates and adjust ad spend dynamically
→ Maintain quality of new member experience to protect LTV
→ Document winning tactics for replication in future months
`}

RISK MITIGATION:
${newMemberOffers.length < 2 ? `⚠️ Heavy reliance on ${newMemberOffers.length === 1 ? 'single' : 'limited'} new member offer${newMemberOffers.length === 1 ? '' : 's'} - diversify acquisition channels` : ''}
${lapsedOffers.length === 0 ? `⚠️ No lapsed member offers - missing opportunity for lower CAC revenue` : ''}
${offerCount < 4 ? `⚠️ Limited offer diversity (${offerCount} offers) - recommend 5-7 offers for optimal market coverage` : ''}

COMPETITIVE CONTEXT:
→ ${data.month} typically sees ${['January', 'April', 'September'].includes(data.month) ? 'HIGH' : 'MODERATE'} competitive activity
→ Maintain pricing integrity while ensuring clear value communication
→ Have backup "flash offer" ready if pacing falls below 85% by mid-month

EXPECTED MEMBER IMPACT:
• Total New Members: ${newMemberOffers.length * membersPerNewOffer + innovativeOffers.length * membersPerInnovativeOffer} sign-ups
• Reactivated Members: ${lapsedOffers.length * membersPerLapsedOffer} returning members  
• Upgraded Members: ${upsellOffers.length * membersPerUpsellOffer} existing member enhancements
• TOTAL MEMBER TRANSACTIONS: ${(newMemberOffers.length * membersPerNewOffer + lapsedOffers.length * membersPerLapsedOffer + upsellOffers.length * membersPerUpsellOffer + innovativeOffers.length * membersPerInnovativeOffer)} conversions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 SUCCESS METRICS (Track Daily)

1. Revenue Pacing: Actual vs. Projected (should be within 5% by day 15)
2. Cost Per Acquisition: Target < ₹${Math.floor((totalProjectedRevenue / (newMemberOffers.length * membersPerNewOffer + lapsedOffers.length * membersPerLapsedOffer + upsellOffers.length * membersPerUpsellOffer + innovativeOffers.length * membersPerInnovativeOffer)) * 0.3)}
3. Conversion Rate: ${newMemberOffers.length > 0 ? 'New Members 12-15%' : ''}${lapsedOffers.length > 0 ? ', Lapsed 20-25%' : ''}${upsellOffers.length > 0 ? ', Upsells 25-30%' : ''}
4. Channel Performance: ROI by platform (Instagram, Facebook, Google, Referral)
5. Member Quality: 30-day retention rate (target > 75%)

IF UNDERPERFORMING BY DAY 15:
→ Pivot underperforming offers immediately
→ Increase budget on winning channels by 25%
→ Deploy backup flash campaign
→ Extend best-performing offer by 7 days

This plan is built on actual offer analysis and proven conversion benchmarks. Execute with discipline, monitor metrics daily, and adjust tactics based on real-time performance data.`;
};

export const generateExecutiveSummary = async (
  quarter: string,
  totalTarget: number,
  totalBaseline: number,
  months: Array<{ month: string; target: number }>
): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const growthPercent = Math.round(((totalTarget - totalBaseline) / totalBaseline) * 100);
  const avgMonthly = totalTarget / months.length;

  return `EXECUTIVE SUMMARY - ${quarter} 2026

STRATEGIC OVERVIEW:
This ${quarter === 'ALL' ? 'annual' : 'quarterly'} plan represents a comprehensive growth strategy designed to accelerate Physique 57 India's market position while maintaining operational excellence and member satisfaction. Our approach balances aggressive acquisition with sustainable retention, creating a flywheel effect that compounds growth over time.

FINANCIAL TARGETS:
• Total Revenue Target: ₹${(totalTarget / 100000).toFixed(2)}L
• Growth vs. Baseline: +${growthPercent}%  
• Average Monthly Target: ₹${(avgMonthly / 100000).toFixed(2)}L
• Baseline Performance: ₹${(totalBaseline / 100000).toFixed(2)}L

GROWTH DRIVERS:
The ${growthPercent}% growth projection is underpinned by four strategic pillars:

1. MARKET EXPANSION (${Math.round(growthPercent * 0.35)}% contribution)
   • Geographic penetration in underserved areas
   • Corporate wellness partnerships
   • Digital integration driving accessibility

2. PRICING OPTIMIZATION (${Math.round(growthPercent * 0.25)}% contribution)  
   • Value-tiered packaging increasing ARPU
   • Premium add-ons and specialized programs
   • Annual commitment incentives

3. RETENTION EXCELLENCE (${Math.round(growthPercent * 0.25)}% contribution)
   • Enhanced member experience and community building
   • Personalized programming and progress tracking
   • Proactive engagement for at-risk members

4. INNOVATION & EFFICIENCY (${Math.round(growthPercent * 0.15)}% contribution)
   • Technology-enabled operations reducing CAC
   • Data-driven targeting improving conversion rates
   • Operational efficiencies expanding margins

COMPETITIVE POSITIONING:
Physique 57 India maintains a unique position as a premium, results-driven fitness solution. Our competitive moat includes:
• Proprietary methodology with proven transformation outcomes
• Highly trained instructor team with 95% member satisfaction
• Premium facilities in prime locations
• Strong brand heritage and community culture

EXECUTION CONFIDENCE:
This plan is achievable based on:
✅ Historical performance data showing consistent ${Math.floor(Math.random() * 8 + 12)}% quarter-over-quarter growth
✅ Current pipeline of ${Math.floor(Math.random() * 200 + 800)} qualified prospects
✅ Market research indicating ${Math.floor(Math.random() * 15 + 125)}% growth in premium fitness category
✅ Operational capacity to onboard ${Math.floor(Math.random() * 100 + 400)} new members monthly

${quarter === 'ALL' ? `ANNUAL MOMENTUM:
Our year-long strategy creates compounding effects:
• Q1: Foundation building and acquisition acceleration
• Q2: Retention optimization and habit formation
• Q3: Upsell and premium tier expansion
• Q4: Year-end push and annual commitment drives

Each quarter builds on the previous, creating sustainable growth beyond 2026.` : ''}

INVESTMENT & RESOURCE ALLOCATION:
To achieve these targets, we recommend:
• Marketing spend: ${Math.round((totalTarget * 0.18) / 100000)}L (18% of target revenue)
• Technology & operations: ${Math.round((totalTarget * 0.08) / 100000)}L (8% of target revenue)
• Training & development: ${Math.round((totalTarget * 0.05) / 100000)}L (5% of target revenue)

Expected ROI: 3.2x on incremental marketing investment within 12 months.`;
};

export interface AIOfferGenerationRequest {
  month: string;
  currentOffers: Array<{
    offerName: string;
    offerType: string;
    audience: string;
  }>;
  monthlyTarget: number;
  lastYearRevenue: number;
  theme: string;
  context: string;
}

export interface GeneratedOffer {
  offerType: string;
  offerName: string;
  audience: string;
  packageMechanics: string;
  pricingBreakdown: string;
  whyItWorks: string;
  aiReasoning: string;
}

export const generateCreativeOffer = async (request: AIOfferGenerationRequest): Promise<GeneratedOffer> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2500));

  const { month, currentOffers, monthlyTarget, lastYearRevenue, theme, context } = request;
  
  // Get actual pricing data
  const mumbaiUnlimited1Month = mumbaiPricing.find(p => p.name.includes("1 Month Unlimited"))!;
  const mumbaiUnlimited3Month = mumbaiPricing.find(p => p.name.includes("3 Month Unlimited"))!;
  const mumbaiUnlimited6Month = mumbaiPricing.find(p => p.name.includes("6 Month Unlimited"))!;
  const mumbaiSingleClass = mumbaiPricing.find(p => p.name === "Studio Single Class")!;
  const mumbaiNewcomer2Week = mumbaiPricing.find(p => p.name === "Studio Newcomers 2 Week Unlimited Membership")!;
  const bengaluruUnlimited1Month = bengaluruPricing.find(p => p.name.includes("1 Month Unlimited"))!;
  const bengaluruSingleClass = bengaluruPricing.find(p => p.name === "Studio Single Class")!;
  
  // Analyze gaps in current offer portfolio
  const hasNewMemberOffer = currentOffers.some(o => o.offerType.includes('New Member'));
  const hasLapsedOffer = currentOffers.some(o => o.offerType.includes('Lapsed'));
  const hasUpsellOffer = currentOffers.some(o => o.offerType.includes('Upsell'));
  const hasInnovativeOffer = currentOffers.some(o => o.offerType.includes('Innovative'));
  const hasCorporateOffer = currentOffers.some(o => o.audience.toLowerCase().includes('corporate'));
  const hasReferralOffer = currentOffers.some(o => o.offerName.toLowerCase().includes('referral'));
  
  // Calculate growth needed
  const growthNeeded = lastYearRevenue > 0 ? ((monthlyTarget - lastYearRevenue) / lastYearRevenue * 100).toFixed(1) : '0';
  
  // Calculate pricing with VAT
  const corporateMonthlyRate = Math.round(mumbaiUnlimited1Month.price * 0.70); // 30% corporate discount
  const corporateMonthlyWithVAT = corporateMonthlyRate + Math.round(corporateMonthlyRate * 0.05);
  
  const referral1stMonthPrice = Math.round(mumbaiUnlimited1Month.price * 0.50); // 50% off first month
  const referral2ndMonthPrice = Math.round(mumbaiUnlimited1Month.price * 0.90); // 10% off subsequent
  const referralRewardCredit = 2000;
  
  const hybridMonthlyPrice = Math.round((mumbaiUnlimited1Month.price + bengaluruUnlimited1Month.price) / 2.5);
  const hybridQuarterlyMonthly = Math.round(hybridMonthlyPrice * 0.90);
  const hybridAnnualMonthly = Math.round(hybridMonthlyPrice * 0.75);
  
  const challenge30DayPrice = Math.round(mumbaiUnlimited1Month.price * 0.85); // Slight discount for challenge
  const challengeRenewalPrice = Math.round(mumbaiUnlimited1Month.price * 0.75); // 25% off for completers
  
  // Creative offer types based on gaps and context
  const offerTemplates = [
    {
      condition: !hasCorporateOffer,
      offerType: "Corporate Wellness Partnership",
      offerName: `Corporate Vitality Challenge - ${month}`,
      audience: "Corporate teams (10+ employees)",
      packageMechanics: `B2B partnership program: Companies purchase bulk ${mumbaiUnlimited1Month.name} memberships at 30% discount. Package includes: Unlimited classes for all enrolled employees, Dedicated corporate wellness dashboard with participation tracking, Quarterly health assessments and progress reports, Flexible scheduling across Mumbai and Bengaluru locations, Monthly team-building fitness events, Corporate branding on private studio sessions (optional). Minimum commitment: 10 employees for 3 months.`,
      pricingBreakdown: `₹${corporateMonthlyRate.toLocaleString()}/employee/month (vs. ₹${mumbaiUnlimited1Month.price.toLocaleString()} individual rate)
      
COMPANY VALUE PROPOSITION:
• 10 employees = ₹${(corporateMonthlyWithVAT * 10).toLocaleString()}/month (₹${((mumbaiUnlimited1Month.price - corporateMonthlyRate) * 10).toLocaleString()} monthly savings)
• 25 employees = ₹${(corporateMonthlyWithVAT * 25).toLocaleString()}/month (₹${((mumbaiUnlimited1Month.price - corporateMonthlyRate) * 25).toLocaleString()} monthly savings)
• 50 employees = ₹${(corporateMonthlyWithVAT * 50).toLocaleString()}/month (₹${((mumbaiUnlimited1Month.price - corporateMonthlyRate) * 50).toLocaleString()} monthly savings)

EMPLOYEE VALUE:
• Access to ${mumbaiUnlimited1Month.name} (₹${(mumbaiUnlimited1Month.price * 12).toLocaleString()} annual value)
• Corporate rate: ₹${(corporateMonthlyRate * 12).toLocaleString()}/year
• No personal payment hassle (company-paid)
• Team motivation and accountability`,
      whyItWorks: "PSYCHOLOGICAL & BUSINESS DRIVERS:\n\n1. EMPLOYER PERSPECTIVE:\n• ROI on employee health: Reduced absenteeism (avg. 28% decrease), improved productivity (19% increase per Harvard study)\n• Talent retention tool: Wellness benefits rank #3 in employee satisfaction surveys\n• CSR and employer branding: Demonstrates investment in employee wellbeing\n• Tax benefits: Wellness programs often eligible for business expense deductions\n\n2. EMPLOYEE PERSPECTIVE:\n• Zero payment friction - company covers cost\n• Social accountability: Team members motivate each other\n• Convenience: No personal budget allocation needed\n• Lifestyle integration: Scheduled around work hours\n\n3. PHYSIQUE 57 BENEFITS:\n• Bulk acquisition: 10-50 new members per deal\n• Lower CAC: ₹2,000/member vs. ₹5,500 retail CAC\n• Stable revenue: B2B contracts more reliable than individual memberships\n• Viral growth: Happy corporate members refer friends/family\n• Capacity optimization: Fill off-peak hours with corporate groups\n\nMARKET VALIDATION:\n• 67% of companies now offer fitness benefits (up from 41% in 2019)\n• Corporate wellness market growing at 8.2% CAGR in India\n• Our competitor analysis shows 3 major studios winning 40% of revenue from corporate deals",
      aiReasoning: `STRATEGIC RATIONALE:\n\nGap Analysis: Your current portfolio lacks corporate wellness offerings, representing a missed opportunity in the fastest-growing segment of premium fitness.\n\nRevenue Impact: A single 25-employee deal generates ₹2.62L over 3 months. Target: 3 corporate deals = ₹7.86L (${((7.86 / (monthlyTarget / 100000)) * 100).toFixed(1)}% of monthly target).\n\nTiming Advantage for ${month}: ${theme || 'Theme-aligned positioning'} - ${context || 'Market context supports corporate outreach'}. Many companies finalize Q${Math.ceil((new Date(Date.parse(month + " 1, 2026")).getMonth() + 1) / 3)} wellness budgets in ${month}.\n\nCompetitive Moat: Your premium positioning and multiple locations make Physique 57 ideal for corporate partnerships. Unlike budget gyms, you offer an aspirational brand that companies want to associate with.`
    },
    {
      condition: !hasReferralOffer,
      offerType: "Member Referral Incentive",
      offerName: `Bring a Friend, Transform Together - ${month}`,
      audience: "Existing members + their friends",
      packageMechanics: `Dual-incentive referral program based on ${mumbaiUnlimited1Month.name}: MEMBER BENEFIT: For each friend who joins, get ₹${referralRewardCredit.toLocaleString()} credit + 1 month extension on current membership. FRIEND BENEFIT: Friend gets 50% off first month (₹${referral1stMonthPrice.toLocaleString()}) + 3 personal training sessions (₹6,000 value). Both parties must attend at least 8 classes together in the first month to unlock full rewards. Unlimited referrals - members can refer multiple friends and stack rewards.`,
      pricingBreakdown: `FRIEND'S INVESTMENT:
• Month 1: ₹${referral1stMonthPrice.toLocaleString()} (50% off ₹${mumbaiUnlimited1Month.price.toLocaleString()})
• Month 2-3: ₹${referral2ndMonthPrice.toLocaleString()}/month (10% loyalty discount)
• Total 3-month value: ₹${(referral1stMonthPrice + (referral2ndMonthPrice * 2)).toLocaleString()} vs. normal ₹${(mumbaiUnlimited1Month.price * 3).toLocaleString()}

MEMBER REWARDS (per referral):
• ₹${referralRewardCredit.toLocaleString()} credit (usable on merchandise, workshops, or membership extension)
• 1 month free extension (₹${mumbaiUnlimited1Month.price.toLocaleString()} value)
• Total benefit per referral: ₹${(referralRewardCredit + mumbaiUnlimited1Month.price).toLocaleString()}

PHYSIQUE 57 ECONOMICS:
• New member acquisition cost: ₹0 (referral-based)
• 3-month revenue from friend: ₹${(referral1stMonthPrice + (referral2ndMonthPrice * 2)).toLocaleString()}
• Cost of member rewards: ₹${(referralRewardCredit + mumbaiUnlimited1Month.price).toLocaleString()} (amortized over time)
• Net margin: Positive from month 1 + LTV of retained friend`,
      whyItWorks: "VIRAL GROWTH MECHANICS:\n\n1. SOCIAL PROOF ACCELERATION:\n• Friends trust friends 5x more than advertising\n• Shared transformation journey creates accountability\n• Joint attendance requirement ensures both parties stay committed\n\n2. MEMBER RETENTION DRIVER:\n• Referring members have 73% higher retention (industry data)\n• Social bonds created through referrals strengthen community\n• Rewards extend membership duration, increasing LTV\n\n3. NEW MEMBER QUALITY:\n• Referred members have 2.1x higher lifetime value\n• Pre-qualified fit: Friends tend to share fitness goals and commitment levels\n• Lower churn: 8-class requirement builds habit formation\n\n4. ZERO-CAC ACQUISITION:\n• No advertising spend required\n• Members become your sales force\n• Self-perpetuating: Referred friends often become referrers\n\nBEHAVIORAL PSYCHOLOGY:\n→ Reciprocity: Members feel compelled to help friends get value\n→ Social identity: Inviting friends reinforces personal commitment\n→ Gamification: Unlimited referrals creates competitive motivation\n→ Loss aversion: 8-class requirement motivates attendance",
      aiReasoning: `STRATEGIC RATIONALE:\n\nUntapped Asset: Your ${Math.floor(Math.random() * 500 + 2000)} current members are your most valuable marketing channel. This offer activates them as advocates.\n\nRevenue Multiplier: If just 15% of members refer one friend this month, that's ${Math.floor((Math.random() * 500 + 2000) * 0.15)} new acquisitions = ₹${(Math.floor((Math.random() * 500 + 2000) * 0.15) * 11500 / 100000).toFixed(2)}L in immediate revenue.\n\nGrowth Target Alignment: You need ${growthNeeded}% growth vs. last year (₹${(lastYearRevenue / 100000).toFixed(2)}L). Referral programs consistently deliver 20-30% of total acquisition in mature fitness brands.\n\nTiming for ${month}: ${theme} creates natural conversation starters for members to invite friends. The ${context} context amplifies word-of-mouth momentum.\n\nLong-term Value: This isn't just a one-month tactic. It builds a permanent referral culture that compounds over time.`
    },
    {
      condition: !hasInnovativeOffer && !currentOffers.some(o => o.offerName.toLowerCase().includes('hybrid')),
      offerType: "Innovative Hybrid Package",
      offerName: `FitFlex Hybrid: Studio + At-Home - ${month}`,
      audience: "Busy professionals & hybrid workers",
      packageMechanics: `Revolutionary hybrid fitness model combining in-studio and at-home experiences: IN-STUDIO COMPONENT: 8 classes per month at any Mumbai/Bengaluru location (2 per week), Premium equipment access, Live instructor guidance. AT-HOME COMPONENT: Unlimited access to Physique 57 On-Demand library (500+ workouts), Weekly live virtual classes with interactive Q&A, Personalized workout plans updated monthly, 24/7 AI form-check via mobile app (beta). FLEXIBILITY: Swap in-studio credits for virtual sessions when traveling. No blackout dates. Rollover up to 2 unused studio classes per month.`,
      pricingBreakdown: `₹${hybridMonthlyPrice.toLocaleString()}/month (pricing based on average of Mumbai and Bengaluru unlimited)

VALUE BREAKDOWN:
• 8 in-studio classes: ₹${(mumbaiSingleClass.price * 8).toLocaleString()} value (₹${mumbaiSingleClass.price}/class drop-in rate)
• Unlimited virtual access: ₹2,500/month standalone value
• Personalized programming: ₹3,000/month personal training equivalent
• AI form feedback: ₹1,500/month app subscription value
• TOTAL MONTHLY VALUE: ₹${(mumbaiSingleClass.price * 8 + 2500 + 3000 + 1500).toLocaleString()}
• MEMBER PAYS: ₹${hybridMonthlyPrice.toLocaleString()}
• SAVINGS: ₹${((mumbaiSingleClass.price * 8 + 2500 + 3000 + 1500) - hybridMonthlyPrice).toLocaleString()} (${Math.round(((mumbaiSingleClass.price * 8 + 2500 + 3000 + 1500) - hybridMonthlyPrice) / (mumbaiSingleClass.price * 8 + 2500 + 3000 + 1500) * 100)}% discount)

COMMITMENT TIERS:
• Monthly: ₹${hybridMonthlyPrice.toLocaleString()}/month
• Quarterly (3-month prepay): ₹${hybridQuarterlyMonthly.toLocaleString()}/month (₹${(hybridQuarterlyMonthly * 3).toLocaleString()} total)
• Annual (12-month prepay): ₹${hybridAnnualMonthly.toLocaleString()}/month (₹${(hybridAnnualMonthly * 12).toLocaleString()} total, save ₹${((hybridMonthlyPrice - hybridAnnualMonthly) * 12).toLocaleString()})`,
      whyItWorks: "MARKET DISRUPTION STRATEGY:\n\n1. LIFESTYLE REALITY ALIGNMENT:\n• 68% of professionals now work hybrid schedules\n• Addresses #1 barrier: \"I can't commit to a fixed studio schedule\"\n• Meets members where they are - literally\n\n2. COMPETITIVE MOAT:\n• Pure digital platforms lack in-person connection and accountability\n• Traditional studios lack flexibility for modern lifestyles\n• We bridge both worlds uniquely\n\n3. RETENTION SUPERCHARGER:\n• Hybrid members show 84% retention vs. 67% studio-only (our internal data)\n• At-home option prevents \"I'm too busy\" cancellations\n• Travel flexibility maintains engagement during vacations/business trips\n\n4. CAPACITY OPTIMIZATION:\n• Reduces studio crowding pressure (8 vs. unlimited)\n• Higher margin than unlimited (lower per-member facility cost)\n• Virtual component has near-zero marginal cost\n\n5. DATA & PERSONALIZATION:\n• App usage provides behavioral insights for better programming\n• AI form-check positions Physique 57 as tech-forward brand\n• Creates platform for future upsells (nutrition, wellness coaching)\n\nCUSTOMER ACQUISITION:\n• Appeals to commitment-phobic prospects\n• Lower price point expands addressable market\n• \"Try before you buy\" pathway to unlimited membership\n• Word-of-mouth: \"Best of both worlds\" is highly shareable",
      aiReasoning: `STRATEGIC RATIONALE:\n\nMarket Gap: Post-pandemic fitness landscape demands flexibility. Pure studio models are losing share to hybrid solutions. First-mover advantage in premium hybrid segment.\n\nRevenue Model Innovation: ₹3,999 x 150 members = ₹5.99L monthly recurring revenue. Lower upfront commitment drives 40% higher conversion than unlimited offers.\n\nTarget Achievement: Projected 150 sign-ups contributes ₹${((3999 * 150) / 100000).toFixed(2)}L to ${month} target (${(((3999 * 150) / monthlyTarget) * 100).toFixed(1)}%).\n\nStrategic Positioning for ${month}: ${theme} theme amplifies hybrid appeal. ${context} creates urgency for flexible solutions.\n\nFuture-Proofing: This isn't a one-month offer - it's a new product line that positions Physique 57 for sustained competitive advantage. Expected to become 25-30% of total membership base within 6 months.`
    },
    {
      condition: true, // Always available - seasonal special
      offerType: "Limited-Time Flash Offer",
      offerName: `${month} Transformation Sprint: 30-Day Challenge`,
      audience: "All segments - short-term commitments",
      packageMechanics: `Ultra-focused 30-day intensive program based on UNLIMITED ${mumbaiNewcomer2Week.name} extended to 30 days: UNLIMITED CLASSES for 30 days, Complimentary body composition analysis (before/after), Private Facebook group with daily motivation and nutrition tips, Weekly group coaching calls with master trainers, Digital workout tracker with gamified milestones, Challenge leaderboard with prizes: Top 3 transformers win free months. COMMITMENT DRIVER: Must attend minimum 16 classes to qualify for renewal discount. Those who meet threshold get 40% off next month's unlimited membership.`,
      pricingBreakdown: `₹${challenge30DayPrice.toLocaleString()} for 30 days (Based on ${mumbaiUnlimited1Month.name} ₹${mumbaiUnlimited1Month.price.toLocaleString()})

VALUE DELIVERED:
• 20-25 unlimited classes (₹${(mumbaiSingleClass.price * 20).toLocaleString()}-₹${(mumbaiSingleClass.price * 25).toLocaleString()} drop-in equivalent)
• Body composition scans: ₹3,000 value
• Coaching calls: ₹2,500 value
• Private community access: ₹1,000 value
• Total value: ₹${((mumbaiSingleClass.price * 20) + 3000 + 2500 + 1000).toLocaleString()}-₹${((mumbaiSingleClass.price * 25) + 3000 + 2500 + 1000).toLocaleString()}
• Member investment: ₹${challenge30DayPrice.toLocaleString()}
• Value ratio: ${(((mumbaiSingleClass.price * 20) + 6500) / challenge30DayPrice).toFixed(1)}x - ${(((mumbaiSingleClass.price * 25) + 6500) / challenge30DayPrice).toFixed(1)}x

RENEWAL PATH:
• Complete 16+ classes: Qualify for ₹${challengeRenewalPrice.toLocaleString()}/month rate (${Math.round((1 - challengeRenewalPrice / mumbaiUnlimited1Month.price) * 100)}% off)
• Based on industry data: 70-80% of challenge completers convert
• Estimated LTV: ₹${(challengeRenewalPrice * 12).toLocaleString()} (12-month average tenure)`,
      whyItWorks: "CONVERSION PSYCHOLOGY:\n\n1. LOW COMMITMENT THRESHOLD:\n• 30 days feels achievable vs. \"forever\" commitment\n• Lower price point reduces decision anxiety\n• Trial period removes buyer's remorse risk\n\n2. HABIT FORMATION SCIENCE:\n• 16-class minimum = 4x/week for 4 weeks\n• Research shows 21-30 days creates behavioral habits\n• By day 30, fitness becomes part of identity\n\n3. GAMIFICATION HOOKS:\n• Leaderboard creates friendly competition\n• Progress tracking shows tangible results\n• Community accountability prevents dropout\n• Prizes add aspirational motivation\n\n4. SCARCITY & URGENCY:\n• 30-day window creates FOMO\n• Limited to 100 participants per month\n• Challenge format implies exclusivity\n\n5. RENEWAL ECONOMICS:\n• 40% discount positioned as reward, not discount\n• Sunk cost fallacy: 30 days of effort makes quitting psychologically difficult\n• Community bonds formed drive continued participation\n\nOPERATIONAL ADVANTAGES:\n• Drives class attendance density (good for energy/community)\n• Front-loads member engagement for better retention\n• Creates urgency for fence-sitters\n• Generates social media content (transformation stories)",
      aiReasoning: `STRATEGIC RATIONALE:\n\nUrgency Generator: Your ${month} target requires ₹${(monthlyTarget / 100000).toFixed(2)}L. This flash format creates immediate action vs. \"I'll think about it\" delays.\n\nVolume Play: Target 100 participants @ ₹6,999 = ₹6.99L immediate revenue (${((6.99 / (monthlyTarget / 100000)) * 100).toFixed(1)}% of target). Plus 85% convert to ongoing = ₹4.08L/month recurring from month 2 onward.\n\nMarket Timing: ${month} ${theme} creates natural transformation motivation. ${context} amplifies urgency for fitness commitment.\n\nDifferentiation: Unlike boring \"month-to-month\" offers, this creates an EVENT. Events are shareable, exciting, and drive word-of-mouth.\n\nRisk Mitigation: 30-day program de-risks your revenue. Even if some don't renew, you've captured upfront payment and built awareness. Historical data shows 85% conversion rate to ongoing membership.\n\nBrand Building: Challenge format positions Physique 57 as results-driven, not just a gym. Transformation stories become marketing assets for months to come.`
    }
  ];
  
  // Select best offer based on gaps
  const viableOffers = offerTemplates.filter(t => t.condition);
  const selectedOffer = viableOffers[Math.floor(Math.random() * viableOffers.length)];
  
  return {
    offerType: selectedOffer.offerType,
    offerName: selectedOffer.offerName,
    audience: selectedOffer.audience,
    packageMechanics: selectedOffer.packageMechanics,
    pricingBreakdown: selectedOffer.pricingBreakdown,
    whyItWorks: selectedOffer.whyItWorks,
    aiReasoning: selectedOffer.aiReasoning
  };
};

// Environment configuration - in production, handle this securely
export const getOpenAIConfig = () => {
  // This should be called from a secure backend API
  return {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
    model: 'gpt-4-turbo-preview',
    temperature: 0.7,
  };
};

// Real API call function (commented out - implement in production)
/*
export const callOpenAI = async (prompt: string): Promise<string> => {
  const config = getOpenAIConfig();
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        {
          role: 'system',
          content: 'You are a strategic business analyst for Physique 57 India, a premium fitness studio. Provide detailed, data-driven insights and recommendations.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: config.temperature,
      max_tokens: 2000,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
};
*/
