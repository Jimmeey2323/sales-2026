// Sales Plan Data for Physique 57 India 2026 - Complete Strategic Masterplan

export interface Offer {
  id: string;
  offerType: string;
  offerName: string;
  audience: string;
  packageMechanics: string;
  pricingBreakdown: string;
  whyItWorks: string;
  notes?: string;
  isCancelled?: boolean;
  confirmed?: boolean;
  targetUnits?: {
    mumbai?: number;
    bengaluru?: number;
  };
  expectedRevenue?: {
    mumbai?: number;
    bengaluru?: number;
  };
}

export interface LocationTarget {
  location: string;
  category: 'New' | 'Repeat';
  targetUnits: number;
  estimatedTicketSize: number;
  revenueTarget: number;
  strategicLogic: string;
}

export interface MonthData {
  month: string;
  shortMonth: string;
  target: number;
  historicBaseline: number;
  lastYearRevenue: number;
  mumbaiTarget: number;
  mumbaiLastYear: number;
  bengaluruTarget: number;
  bengaluruLastYear: number;
  theme: string;
  heroOffer: string;
  focus: string;
  context: string;
  pricingNote: string;
  offers: Offer[];
  isAnniversary?: boolean;
  half: 'H1' | 'H2';
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  locationTargets?: LocationTarget[];
  executionPlan?: {
    week1: string;
    week2: string;
    week3: string;
    week4: string;
  };
  communityEngagement?: {
    name: string;
    type: string;
    description: string;
    goal: string;
  }[];
  riskAssessment?: {
    risk: string;
    mitigation: string;
  }[];
}

export interface RiskItem {
  risk: string;
  probability: string;
  impact: string;
  mitigation: string;
}

export const h1Strategy = {
  title: "H1 2026 Strategy - The Resolution Reset & Anniversary Momentum",
  coreStrategy: [
    "Q1 (Jan-Mar): Capitalize on 'Resolutioners' with strategic lock-ins. Focus on 4-Month Momentum Bundles and aggressive newcomer conversion.",
    "April (The 8th Anniversary Event): High-volume, exclusive experience-driven month targeting 35% YoY growth with scarcity-driven offers.",
    "Q2 (May-Jun): Switch to 'Summer Elite' and 'Monsoon Motivation' with indoor comfort focus and virtual safety nets."
  ],
  totalTarget: 60000000,
  totalBaseline: 26800000,
  mumbaiTotal: 36000000,
  bengaluruTotal: 18000000
};

export const h2Strategy = {
  title: "H2 2026 Strategy - Professional Peak & Festive Finish Strong",
  coreStrategy: [
    "Q3 (Jul-Sep): Focus on 'Storm Breaker' consistency, Teacher appreciation, and high-performance results with trainer-led acquisition.",
    "Q4 (Oct-Dec): 'Pre-Festive Glow', luxury gifting, and 2027 revenue lock-ins with Black Friday vault sales and founder protection offers."
  ],
  locationSplit: {
    mumbai: 60,
    bengaluru: 30,
    popups: 10
  },
  totalTarget: 70000000,
  totalBaseline: 29900000,
  mumbaiTotal: 42000000,
  bengaluruTotal: 21000000
};

export const monthlyData: MonthData[] = [
  {
    month: "January",
    shortMonth: "Jan",
    target: 15960000,
    historicBaseline: 3929116,
    lastYearRevenue: 3929116,
    mumbaiTarget: 12098935,
    mumbaiLastYear: 2357470,
    bengaluruTarget: 4364925,
    bengaluruLastYear: 1178735,
    theme: "The Resolution Reset",
    heroOffer: "The Habit Hack",
    focus: "Aggressive newcomer conversion and maximizing Cash Upfront via annual lock-ins",
    context: "January is the most critical acquisition month. Fresh Start psychology with 35% YoY growth target.",
    pricingNote: "Focus on 4-Month bundles and Spot Annual offers for high cash flow.",
    half: 'H1',
    quarter: 'Q1',
    locationTargets: [
      {
        location: "MUM: Kwality House (SoBo)",
        category: 'New',
        targetUnits: 65,
        estimatedTicketSize: 12599,
        revenueTarget: 818935,
        strategicLogic: "High-volume Newcomer Unlimited entry."
      },
      {
        location: "MUM: Kwality House (SoBo)",
        category: 'Repeat',
        targetUnits: 110,
        estimatedTicketSize: 48000,
        revenueTarget: 5280000,
        strategicLogic: "Deep Annual conversions (25% Spot Offer)."
      },
      {
        location: "MUM: Supreme HQ (Bandra)",
        category: 'New',
        targetUnits: 55,
        estimatedTicketSize: 12599,
        revenueTarget: 692945,
        strategicLogic: "Corporate New Year resolutioners."
      },
      {
        location: "MUM: Supreme HQ (Bandra)",
        category: 'Repeat',
        targetUnits: 100,
        estimatedTicketSize: 48000,
        revenueTarget: 4800000,
        strategicLogic: "4-Month Momentum bundle renewals."
      },
      {
        location: "BLR: Kenkere House (Bengaluru)",
        category: 'New',
        targetUnits: 75,
        estimatedTicketSize: 12599,
        revenueTarget: 944925,
        strategicLogic: "Mass-market Newcomer surge."
      },
      {
        location: "BLR: Kenkere House (Bengaluru)",
        category: 'Repeat',
        targetUnits: 90,
        estimatedTicketSize: 38000,
        revenueTarget: 3420000,
        strategicLogic: "Annual Spot Offer conversion."
      }
    ],
    executionPlan: {
      week1: "The Newcomer Surge (Jan 1–7): Heavy Instagram/Meta ads targeting Fitness Resolutions and Post-Holiday Detox. Call all Trials from Nov/Dec.",
      week2: "The Momentum Build (Jan 8–14): Upsell existing 1-month members to The Habit Hack. Launch Resolution Wall.",
      week3: "All In '27 Flash (Jan 15–18): 48-72 hour window for 25% Annual Offer. Individual WhatsApps to Top 50 spenders.",
      week4: "The Habit Lock-in (Jan 19–31): Launch 21-Day Challenge and Bring a Buddy referrals for Week 4 newcomers."
    },
    communityEngagement: [
      {
        name: "Reset Green Juice",
        type: "Activation",
        description: "Post-class shots of green juice served every Monday morning.",
        goal: "Reinforce the Clean Start theme."
      },
      {
        name: "Goal Audits",
        type: "Service",
        description: "Free 5-min Barre Goal sessions with trainers before/after class.",
        goal: "Personalization and LTV increase."
      },
      {
        name: "Friday Power Hour",
        type: "Event",
        description: "High-tempo 45-min class with curated 2026 hits playlist.",
        goal: "High-energy community vibes."
      }
    ],
    riskAssessment: [
      {
        risk: "High churn of Newcomers after 30 days.",
        mitigation: "The 4-Month Momentum bundle is the primary upsell for everyone on the Newcomer pack by Week 3."
      },
      {
        risk: "Studio overcrowding during peak hours.",
        mitigation: "Cap the Newcomer Unlimited units per location (MUM: 60, BLR: 75)."
      },
      {
        risk: "Cannibalization of rack-rate Annuals.",
        mitigation: "The 25% Spot Sale is strictly for New Annuals or Lapsed Annuals—not renewed in last 60 days."
      }
    ],
    offers: [
      {
        id: "jan-1",
        offerType: "New Member",
        offerName: "Fresh Start, No Guilt",
        audience: "High-volume New Year trial users",
        packageMechanics: "1 Month Unlimited priced significantly lower than standard rate",
        pricingBreakdown: "Mumbai: ₹11,999 + 5% VAT = ₹12,599 (22% off standard). Bengaluru: ₹11,999 + 5% VAT = ₹12,599 (14% off standard)",
        whyItWorks: "Low-friction entry for mass influx of trial users who want a serious start. Captures the resolution energy.",
        targetUnits: { mumbai: 60, bengaluru: 75 },
        expectedRevenue: { mumbai: 755940, bengaluru: 944925 }
      },
      {
        id: "jan-2",
        offerType: "Hero Offer",
        offerName: "The Habit Hack",
        audience: "Mid-term revenue security seekers",
        packageMechanics: "Purchase 3 Months Unlimited at rack rate, receive the 4th Month FREE",
        pricingBreakdown: "Mumbai: Total value ₹61,000, Offer Price ₹41,429 + 5% VAT = ₹43,500 (₹17,513 savings). Bengaluru: Total value ₹55,600, Offer ₹38,286 + 5% VAT = ₹40,200 (₹15,400 savings)",
        whyItWorks: "Takes 12 weeks to see true physical transformation. Locks user in for entire First Quarter, preventing February dropoff.",
        notes: "Key anchor offer for the month",
        targetUnits: { mumbai: 85, bengaluru: 60 },
        expectedRevenue: { mumbai: 3697500, bengaluru: 2412000 }
      },
      {
        id: "jan-3",
        offerType: "Flash Offer",
        offerName: "The Annual Spot Sale (25% OFF)",
        audience: "Big Budget resolutioners",
        packageMechanics: "25% Flat Discount on Annual Membership for 48 hours only",
        pricingBreakdown: "Mumbai: Rack ₹1,65,000, Offer ₹1,17,857 + 5% VAT = ₹1,23,750 (₹41,250 savings). Bengaluru: Rack ₹1,48,800, Offer ₹1,06,285 + 5% VAT = ₹1,11,600 (₹37,200 savings)",
        whyItWorks: "Captures high-net-worth clients. 25% discount deep enough to make decision immediate for high-value clients.",
        notes: "48-hour window only, exclusive targeting",
        targetUnits: { mumbai: 25, bengaluru: 15 },
        expectedRevenue: { mumbai: 3093750, bengaluru: 1674000 }
      }
    ]
  },
  {
    month: "February",
    shortMonth: "Feb",
    target: 5000000,
    historicBaseline: 4136223,
    lastYearRevenue: 4136223,
    mumbaiTarget: 4140000,
    mumbaiLastYear: 2481734,
    bengaluruTarget: 860000,
    bengaluruLastYear: 1240867,
    theme: "Heart-Health & Valentine's Connection",
    heroOffer: "Partner in Grime",
    focus: "Transition January trialists into long-term members while utilizing Valentine's Day",
    context: "February's goal is retention of January members plus Valentine's occasion window for high conversion.",
    pricingNote: "Focus on duo packages and self-love positioning to reduce entry friction.",
    half: 'H1',
    quarter: 'Q1',
    locationTargets: [
      {
        location: "Kwality House (MUM)",
        category: 'New',
        targetUnits: 15,
        estimatedTicketSize: 15000,
        revenueTarget: 2360000,
        strategicLogic: "15% Lead-to-Member conversion goal"
      },
      {
        location: "Supreme HQ (MUM)",
        category: 'Repeat',
        targetUnits: 15,
        estimatedTicketSize: 15000,
        revenueTarget: 1780000,
        strategicLogic: "15% Lead-to-Member conversion goal"
      },
      {
        location: "Kenkere House (BLR)",
        category: 'New',
        targetUnits: 35,
        estimatedTicketSize: 11200,
        revenueTarget: 860000,
        strategicLogic: "15% Lead-to-Member conversion goal"
      }
    ],
    offers: [
      {
        id: "feb-1",
        offerType: "Hero Offer",
        offerName: "Partner in Grime",
        audience: "New Members & Partners",
        packageMechanics: "Buy one 1-Month Unlimited, get the second at 50% off for significant other or bestie",
        pricingBreakdown: "Mumbai: Rack ₹30,500, Final ₹24,019 (25% total discount). Bengaluru: Rack ₹23,800, Final ₹18,743",
        whyItWorks: "Reduces friction of starting alone. High social proof and shared accountability.",
        targetUnits: { mumbai: 20, bengaluru: 15 },
        expectedRevenue: { mumbai: 480000, bengaluru: 280000 }
      },
      {
        id: "feb-2",
        offerType: "Spot Offer",
        offerName: "Main Character Energy",
        audience: "Lapsed Members & Social Media Leads (Galentine's demographic)",
        packageMechanics: "14 Days Unlimited + 1 Nutrition Consult + 1 Glow-up Retail Gift",
        pricingBreakdown: "Mumbai: ₹9,500 + 5% VAT = ₹9,975. Bengaluru: ₹7,500 + 5% VAT = ₹7,875",
        whyItWorks: "Targets Galentine's or single demographic focusing on self-care.",
        targetUnits: { mumbai: 25, bengaluru: 15 }
      },
      {
        id: "feb-3",
        offerType: "New Member",
        offerName: "Love at First Sweat",
        audience: "High-end skeptics",
        packageMechanics: "3 Classes for the price of 1 + Free Grip Socks",
        pricingBreakdown: "Mumbai: ₹1,500 + VAT = ₹1,575",
        whyItWorks: "Low entry barrier for high-end skeptics."
      },
      {
        id: "feb-4",
        offerType: "Lapsed Member",
        offerName: "Ex-ercise Benefits",
        audience: "Lapsed members",
        packageMechanics: "Buy a 10-Class Pack, get 2 extra classes + 1 Month extra validity",
        pricingBreakdown: "Mumbai: ₹15,050 + VAT = ₹15,803. Bengaluru: ₹12,500 + VAT = ₹13,125",
        whyItWorks: "We missed you messaging with added value."
      },
      {
        id: "feb-5",
        offerType: "Occasion Offer",
        offerName: "Girls Just Wanna Have Buns",
        audience: "Groups",
        packageMechanics: "Book studio for you and 5 friends for private session + Healthy Mimosas & Nibbles",
        pricingBreakdown: "Mumbai: ₹35,000. Bengaluru: ₹25,000",
        whyItWorks: "High-margin Event revenue with zero recurring cost."
      }
    ]
  },
  {
    month: "March",
    shortMonth: "Mar",
    target: 4700000,
    historicBaseline: 4378890,
    lastYearRevenue: 4378890,
    mumbaiTarget: 4000000,
    mumbaiLastYear: 2627334,
    bengaluruTarget: 700000,
    bengaluruLastYear: 1314667,
    theme: "The Power of Her",
    heroOffer: "She Means Business",
    focus: "Convert February's V-Day campaigns into long-term commitment, bridge to Q2",
    context: "March is the bridge to Q2. Convert momentum from February into long-term commitment.",
    pricingNote: "Focus on high-ticket retention and community building through women's empowerment.",
    half: 'H1',
    quarter: 'Q1',
    locationTargets: [
      {
        location: "Kwality House (MUM)",
        category: 'Repeat',
        targetUnits: 85,
        estimatedTicketSize: 15000,
        revenueTarget: 2520000,
        strategicLogic: "75% retention goal"
      },
      {
        location: "Supreme HQ (MUM)",
        category: 'Repeat', 
        targetUnits: 70,
        estimatedTicketSize: 15000,
        revenueTarget: 1480000,
        strategicLogic: "70% retention goal (adjusted based on Q1 capacity)"
      },
      {
        location: "Kenkere House (BLR)",
        category: 'New',
        targetUnits: 35,
        estimatedTicketSize: 11200,
        revenueTarget: 700000,
        strategicLogic: "70% retention goal"
      }
    ],
    offers: [
      {
        id: "mar-1",
        offerType: "Hero Offer",
        offerName: "She Means Business",
        audience: "Lapsed female members (last visit > 60 days)",
        packageMechanics: "3-Month Unlimited + 3 Private Coaching Sessions + Strength Toolkit (Grip socks & branded water bottle)",
        pricingBreakdown: "Mumbai: Rack ₹66,950, Final ₹56,238 (20% discount). Bengaluru: Similar structure",
        whyItWorks: "Addresses re-entry fear by providing private sessions to correct form before jumping back into classes.",
        targetUnits: { mumbai: 10 },
        expectedRevenue: { mumbai: 562000 }
      },
      {
        id: "mar-2",
        offerType: "New Member",
        offerName: "Squad Goals Unlocked",
        audience: "New Female Leads/Referrals",
        packageMechanics: "Buy a 12-Class Pack, get 3 additional classes free + Bring a Friend Friday passes for the month",
        pricingBreakdown: "Bengaluru: ₹12,500 + 5% VAT = ₹13,125 (maintains price integrity with value add)",
        whyItWorks: "Volume-led acquisition through community. Maintains price integrity while increasing perceived value.",
        targetUnits: { bengaluru: 25 },
        expectedRevenue: { bengaluru: 328000 }
      },
      {
        id: "mar-3",
        offerType: "Spot Offer",
        offerName: "Corner Office Conditioning",
        audience: "Women in partner corporate firms",
        packageMechanics: "20% off Annual Membership for women in partner corporate firms",
        pricingBreakdown: "Mumbai: ₹1,92,500 Rack -> ₹1,54,000 + VAT = ₹1,61,700",
        whyItWorks: "Rewards long-term loyalty and targets corporate demographic.",
        targetUnits: { mumbai: 5 }
      },
      {
        id: "mar-4",
        offerType: "Occasion Offer",
        offerName: "Brunch, Then Crunch",
        audience: "All locations - March 8th Special",
        packageMechanics: "75-minute Masterclass + Wellness Brunch + Gift Bag",
        pricingBreakdown: "₹3,500 per head (Flat rate)",
        whyItWorks: "Positions studio as lifestyle brand for Women's Day celebration."
      }
    ]
  },
  {
    month: "April",
    shortMonth: "Apr",
    target: 25000000,
    historicBaseline: 4844557,
    lastYearRevenue: 4844557,
    mumbaiTarget: 15000000,
    mumbaiLastYear: 2906734,
    bengaluruTarget: 10000000,
    bengaluruLastYear: 1452367,
    theme: "INFINITE STRENGTH - 8th Anniversary Celebration",
    heroOffer: "The Infinity Plan",
    focus: "Event-driven offers with scarcity strategy, high-impact experiences over discounts",
    context: "8th Anniversary Jubilee with Gold, Glamour, and Legacy theme. Experience-focused offers.",
    pricingNote: "Premium pricing with exclusive experiences. Limited quantity creates FOMO.",
    half: 'H1',
    quarter: 'Q2',
    isAnniversary: true,
    offers: [
      {
        id: "apr-1",
        offerType: "Showstopper",
        offerName: "The Infinity Plan",
        audience: "VIP / High-value clients",
        packageMechanics: "8 Months Unlimited + 8 Private Sessions + 8 Guest Passes + Priority Booking + Limited Edition Gold Grip Socks",
        pricingBreakdown: "Mumbai: ₹88,000 (Approx value ₹1.3L+). Bengaluru: ₹75,000. Limited to 8 people per location.",
        whyItWorks: "Velvet Rope psychology. Limiting to 8 people creates massive FOMO while securing large upfront cash.",
        targetUnits: { mumbai: 8, bengaluru: 8 },
        expectedRevenue: { mumbai: 704000, bengaluru: 600000 }
      },
      {
        id: "apr-2",
        offerType: "Nostalgia Offer",
        offerName: "We Missed Your Face",
        audience: "Retention/Lapsed members",
        packageMechanics: "Purchase 10-Class Pack at 2018 pricing. Valid 48 hours only (April 8th & 9th). Requires social media post.",
        pricingBreakdown: "Approximately ₹12,000 (20-30% discount from current rates without devaluing brand)",
        whyItWorks: "Generates massive user-generated content and rewards loyalty. Brings back lapsed members.",
        targetUnits: { mumbai: 50, bengaluru: 30 },
        expectedRevenue: { mumbai: 600000, bengaluru: 360000 }
      },
      {
        id: "apr-3",
        offerType: "Gamified Offer",
        offerName: "The Glow-Up Project",
        audience: "All clients (requires active package or drop-in purchase)",
        packageMechanics: "8 Golden Tickets hidden in retail items/studio spots. Find one = 1 Month Free Unlimited",
        pricingBreakdown: "Entry via Treasure Hunter Drop-in ₹1,200 or active package",
        whyItWorks: "Turns studio visits into a game. Drives retail sales and daily visits.",
        notes: "8 tickets total across all locations"
      },
      {
        id: "apr-4",
        offerType: "Acquisition Offer",
        offerName: "Eight Is Enough (It's Not)",
        audience: "New Clients Only",
        packageMechanics: "8 Classes for ₹8,888 (Mumbai) / ₹6,888 (Bengaluru). Validity: 8 Weeks",
        pricingBreakdown: "Mumbai: ₹8,888. Bengaluru: ₹6,888. Includes complimentary Technique 101 Workshop",
        whyItWorks: "Breaks standard 10-pack mental model. Catchy price point with habit-building 8-week expiry.",
        targetUnits: { mumbai: 100, bengaluru: 80 },
        expectedRevenue: { mumbai: 888800, bengaluru: 551040 }
      },
      {
        id: "apr-5",
        offerType: "Grand Gala Event",
        offerName: "BARRE, BUBBLY & BLING",
        audience: "Community Event - April 25th",
        packageMechanics: "75-minute Best of 8 Years class + Champagne + Live DJ + Touch of Gold dress code",
        pricingBreakdown: "₹2,500 (Members) / ₹3,500 (Non-Members)",
        whyItWorks: "Positions studio as lifestyle brand. Builds community bonds. Zero-cost marketing activation.",
        targetUnits: { mumbai: 150, bengaluru: 100 },
        expectedRevenue: { mumbai: 375000, bengaluru: 250000 }
      }
    ]
  },
  {
    month: "May",
    shortMonth: "May",
    target: 7592500,
    historicBaseline: 5279003,
    lastYearRevenue: 5279003,
    mumbaiTarget: 5642500,
    mumbaiLastYear: 3167402,
    bengaluruTarget: 1950000,
    bengaluruLastYear: 1583601,
    theme: "The Summer Sprint - Elite Transformation",
    heroOffer: "Hot Girl Summer Prep",
    focus: "High-liquidity month shifting from Access to Transformation & Luxury. Summer Holiday Prep + Student demographic",
    context: "Capitalize on Summer Holiday Prep window and high-intent Student demographic with 33% YoY revenue jump.",
    pricingNote: "Focus on High Average Order Value (AOV) and Elite 3-month pack upgrades.",
    half: 'H1',
    quarter: 'Q2',
    offers: [
      {
        id: "may-1",
        offerType: "Student Offer",
        offerName: "Broke But Buff",
        audience: "Gen-Z Students",
        packageMechanics: "6-Week Unlimited + 1 Bring-a-Friend Permanent Guest Pass (Friend comes free for 1 week)",
        pricingBreakdown: "Mumbai: Rack equivalent ₹24,500, Offer ₹17,143 + VAT = ₹18,000. Bengaluru: Rack ₹20,850, Offer ₹11,429 + VAT = ₹12,000",
        whyItWorks: "Students travel in packs. Turns every buyer into a lead generator.",
        targetUnits: { mumbai: 40, bengaluru: 50 },
        expectedRevenue: { mumbai: 720000, bengaluru: 600000 }
      },
      {
        id: "may-2",
        offerType: "Private Training",
        offerName: "Lunch Break, Make Bank",
        audience: "Maximum margin seekers",
        packageMechanics: "5 Private Sessions (12 PM - 4 PM) + 1 Month Studio Unlimited Access included",
        pricingBreakdown: "Mumbai: Total value ₹40,000, Offer ₹23,809 + VAT = ₹25,000 (38% off). Bengaluru: Total ₹33,000, Offer ₹18,095 + VAT = ₹19,000 (42% off)",
        whyItWorks: "Instead of discount, we 'gift' the membership. Feels like getting the gym for free when buying a coach.",
        targetUnits: { mumbai: 20, bengaluru: 20 },
        expectedRevenue: { mumbai: 500000, bengaluru: 380000 }
      },
      {
        id: "may-3",
        offerType: "Hero Offer",
        offerName: "Hot Girl Summer Prep",
        audience: "Results-guaranteed premium clients",
        packageMechanics: "6-Week Intensive + ₹3,000 Retail Voucher (grip socks/athleisure) + 2 Nutrition Deep Dives",
        pricingBreakdown: "Mumbai: ₹30,476 + VAT = ₹32,000 (₹6k extras). Bengaluru: ₹22,857 + VAT = ₹24,000 (₹5k extras)",
        whyItWorks: "Retail voucher makes price 'feel' lower while clearing stock and driving brand loyalty.",
        targetUnits: { mumbai: 30, bengaluru: 25 },
        expectedRevenue: { mumbai: 960000, bengaluru: 600000 }
      }
    ]
  },
  {
    month: "June",
    shortMonth: "Jun",
    target: 5641000,
    historicBaseline: 4194448,
    lastYearRevenue: 4194448,
    mumbaiTarget: 4158000,
    mumbaiLastYear: 2516669,
    bengaluruTarget: 1497500,
    bengaluruLastYear: 1257534,
    theme: "The Monsoon Motivation",
    heroOffer: "Rain Check Rejected",
    focus: "Indoor Comfort and Reactive Marketing. Re-engage lapsed users with bite-sized commitments and virtual safety nets",
    context: "Traditionally low-attendance month due to heavy rains and traffic chaos. Focus on indoor comfort.",
    pricingNote: "Mid-tier bundles with virtual components and rainy day reactive offers.",
    half: 'H1',
    quarter: 'Q2',
    offers: [
      {
        id: "jun-1",
        offerType: "New Member",
        offerName: "Virtual Reality Check",
        audience: "New members seeking digital touchpoint",
        packageMechanics: "Purchase 1-Month Studio Unlimited and get Free 30-min Virtual Private Session",
        pricingBreakdown: "Mumbai: ₹15,250 + VAT = ₹16,013 + Virtual Session (₹4,500 value). Bengaluru: ₹13,900 + VAT = ₹14,595 + Virtual Session (₹3,500 value)",
        whyItWorks: "Bridges gap for rainy days when commuting is difficult. Expert form-checks from home comfort.",
        targetUnits: { mumbai: 25, bengaluru: 20 },
        expectedRevenue: { mumbai: 400325, bengaluru: 291900 }
      },
      {
        id: "jun-2",
        offerType: "Lapsed Member",
        offerName: "The Boomerang",
        audience: "Dormant users",
        packageMechanics: "5 Classes for fixed price. Valid 30 days only. No extensions.",
        pricingBreakdown: "Mumbai: ₹5,238 + VAT = ₹5,500 (~28% savings). Bengaluru: ₹3,810 + VAT = ₹4,000 (~35% savings)",
        whyItWorks: "Low-risk way to get them back into studio habit. Removes price barrier.",
        targetUnits: { mumbai: 35, bengaluru: 35 },
        expectedRevenue: { mumbai: 192500, bengaluru: 140000 }
      },
      {
        id: "jun-3",
        offerType: "Hero Activation",
        offerName: "Rain Check Rejected",
        audience: "All members",
        packageMechanics: "Attend 20 classes in 30 days. Reward: ₹2,000 Credit toward July/August renewal + Finisher Grip-Sock",
        pricingBreakdown: "Free challenge with reward credit",
        whyItWorks: "Gamification creates reason to show up despite weather. Reward ensures next month retention.",
        notes: "Challenge runs throughout June, builds attendance momentum"
      },
      {
        id: "jun-4",
        offerType: "Reactive Offer",
        offerName: "Pour Decisions",
        audience: "Social media followers",
        packageMechanics: "10% Off any Class Pack if purchased while actively raining outside (Social Media Flash trigger)",
        pricingBreakdown: "Variable discount based on pack chosen",
        whyItWorks: "Fun, reactive, and builds high engagement on Instagram stories.",
        notes: "Triggered by real-time weather conditions, social media activation"
      }
    ]
  },
  {
    month: "July",
    shortMonth: "Jul",
    target: 6300000,
    historicBaseline: 4669779,
    lastYearRevenue: 4669779,
    mumbaiTarget: 4560000,
    mumbaiLastYear: 2801867,
    bengaluruTarget: 1680000,
    bengaluruLastYear: 1401156,
    theme: "The Storm Breaker",
    heroOffer: "Lucky 7",
    focus: "Logistical Relief and Social Proof to keep studio full when city slows down during peak monsoon",
    context: "Peak Monsoon month where logistics become primary hurdle. Focus on consistency amidst chaos.",
    pricingNote: "Transport relief bundles and long-term lock-ins with forgiveness policies.",
    half: 'H2',
    quarter: 'Q3',
    offers: [
      {
        id: "jul-1",
        offerType: "New Member",
        offerName: "Gas Money's On Us",
        audience: "Transport-concerned prospects",
        packageMechanics: "Purchase 3-Month Unlimited and get ₹1,000 Transport Credit (as direct discount)",
        pricingBreakdown: "Mumbai: Rack ₹43,500, Final ₹40,476 + VAT = ₹42,500. Bengaluru: Rack ₹40,200, Final ₹37,333 + VAT = ₹39,200",
        whyItWorks: "Directly addresses 'too expensive/difficult to get cab in rain' objection.",
        targetUnits: { mumbai: 35, bengaluru: 25 },
        expectedRevenue: { mumbai: 1487500, bengaluru: 980000 }
      },
      {
        id: "jul-2",
        offerType: "Hero Offer",
        offerName: "Lucky 7",
        audience: "Mid-term revenue security",
        packageMechanics: "Buy 6-Month Unlimited and get 1 Month Free (7 Months Total)",
        pricingBreakdown: "Mumbai: 6-Mo ₹85,500 + VAT = ₹89,775 (₹16,000 added value). Bengaluru: 6-Mo ₹78,300 + VAT = ₹82,215 (₹14,000 added value)",
        whyItWorks: "High perceived value (1 full month free) with zero marginal cost to studio.",
        targetUnits: { mumbai: 15, bengaluru: 10 },
        expectedRevenue: { mumbai: 1346625, bengaluru: 822150 }
      },
      {
        id: "jul-3",
        offerType: "Retention",
        offerName: "Get Out of Jail Free Card",
        audience: "Anxiety-prone members",
        packageMechanics: "Buy 12-Class Pack and receive 2 Late Cancel Waivers (worth ₹2,000+)",
        pricingBreakdown: "Standard pack pricing with valuable waiver addition",
        whyItWorks: "Reduces anxiety of losing class credit due to traffic jams or sudden downpours.",
        targetUnits: { mumbai: 40, bengaluru: 30 },
        notes: "Peace of mind during unpredictable monsoon traffic"
      }
    ]
  },
  {
    month: "August",
    shortMonth: "Aug",
    target: 7240000,
    historicBaseline: 5369851,
    lastYearRevenue: 5369851,
    mumbaiTarget: 6210000,
    mumbaiLastYear: 3221911,
    bengaluruTarget: 1050000,
    bengaluruLastYear: 1609970,
    theme: "Barre Besties & Vitality",
    heroOffer: "Til Death Do Us Squat",
    focus: "Peer-to-peer acquisition and community appreciation to drive 70% repeat/30% new revenue mix",
    context: "Community-focused month leveraging friendship psychology and loyalty rewards.",
    pricingNote: "Annual renewals with bestie gifting and social proof mechanisms.",
    half: 'H2',
    quarter: 'Q3',
    offers: [
      {
        id: "aug-1",
        offerType: "New Member",
        offerName: "Two Can Play at That Gym",
        audience: "First-time leads and social media followers",
        packageMechanics: "Buy One, Gift One introductory pass. Buy 3-class trial for yourself + get second 3-class pass to gift to friend",
        pricingBreakdown: "Mumbai: Rack ₹9,000 (for 2 people), Final ₹4,500 (50% discount). Bengaluru: Rack ₹7,200, Final ₹3,800 (47% discount)",
        whyItWorks: "Leverages social proof. People are 3x more likely to start workout if friend joins. Cuts CAC in half."
      },
      {
        id: "aug-2",
        offerType: "Hero Offer",
        offerName: "Til Death Do Us Squat",
        audience: "High-frequency repeat members",
        packageMechanics: "Annual renewal/upgrade. 12 months unlimited + 1 Bestie Month gift + 2 additional freeze attempts",
        pricingBreakdown: "Mumbai: Rack ₹1,65,000, Final ₹1,35,000 (22% discount). Bengaluru: Rack ₹1,28,000, Final ₹1,05,000 (22% discount)",
        whyItWorks: "Empowers best advocates to curate community they want to work out with. Gift month has zero cost but high value."
      },
      {
        id: "aug-3",
        offerType: "Lapsed Member",
        offerName: "Long Time No Squeeze",
        audience: "Members inactive for >90 days",
        packageMechanics: "10-Class Pack with double validity (60 days instead of 30) + 2 Guest Passes to bring friend",
        pricingBreakdown: "Mumbai: Rack ₹13,500, Final ₹13,000. Bengaluru: Rack ₹11,000, Final ₹10,500",
        whyItWorks: "Solves social anxiety of returning alone. Extended validity removes monsoon schedule pressure.",
        targetUnits: { mumbai: 40, bengaluru: 20 },
        expectedRevenue: { mumbai: 520000, bengaluru: 210000 }
      },
      {
        id: "aug-4",
        offerType: "Spot Offer",
        offerName: "Friendship Day Flash (Aug 1st-3rd)",
        audience: "Current members and their guests",
        packageMechanics: "20% off all Class Packs (10 and 20 packs only) when purchased in-studio as a pair",
        pricingBreakdown: "Mumbai 20-Pack: Rack ₹24,500, Final ₹19,600. Bengaluru 20-Pack: Rack ₹19,500, Final ₹15,600",
        whyItWorks: "Creates urgency around holiday weekend. High cash-density driver in 72-hour window.",
        targetUnits: { mumbai: 30, bengaluru: 15 },
        expectedRevenue: { mumbai: 588000, bengaluru: 234000 }
      }
    ]
  },
  {
    month: "September",
    shortMonth: "Sep",
    target: 8340000,
    historicBaseline: 6190299,
    lastYearRevenue: 6190299,
    mumbaiTarget: 7090000,
    mumbaiLastYear: 3714179,
    bengaluruTarget: 1250000,
    bengaluruLastYear: 1857896,
    theme: "The Professional's Peak & Master Educator Series",
    heroOffer: "The Insider Deal",
    focus: "Honoring expertise through Trainer-led acquisition, team competition, and high-performance results",
    context: "Teachers' Day focus with trainer-led referrals and corporate executive packages.",
    pricingNote: "Trainer-driven codes and executive flexibility packages with technical mastery focus.",
    half: 'H2',
    quarter: 'Q3',
    offers: [
      {
        id: "sep-1",
        offerType: "Teachers' Day",
        offerName: "The Insider Deal",
        audience: "Existing advocates and their inner circles",
        packageMechanics: "Each Senior Trainer gets unique Legacy Code. Friends get 20% off first Class Pack, member gets Masterclass Credit if they convert",
        pricingBreakdown: "Mumbai: 10-Pack Rack ₹13,500, Code Price ₹11,340. Bengaluru: 10-Pack Rack ₹11,000, Code Price ₹9,240",
        whyItWorks: "Shifts sales conversation from Front Desk to Trainer-Member relationship. Trainer recommendations carry 5x weight.",
        targetUnits: { mumbai: 120, bengaluru: 50 },
        expectedRevenue: { mumbai: 1360800, bengaluru: 462000 }
      },
      {
        id: "sep-2",
        offerType: "Hero Offer",
        offerName: "The Business Class Body",
        audience: "High-net-worth professionals and long-term retainers",
        packageMechanics: "3 Months Unlimited + 2 Form Correction Private Sessions + 4 additional freeze attempts for business travel",
        pricingBreakdown: "Mumbai: Rack ₹53,500, Final ₹46,000 (18% discount). Bengaluru: Rack ₹41,905, Final ₹36,000 (18% discount)",
        whyItWorks: "Focuses on efficiency and Executive flexibility. Travel flexibility essential for Bandra and Indiranagar demographics.",
        targetUnits: { mumbai: 25, bengaluru: 12 },
        expectedRevenue: { mumbai: 1150000, bengaluru: 432000 }
      },
      {
        id: "sep-3",
        offerType: "New Member",
        offerName: "Back to Basics, Back to Badass",
        audience: "First-time leads seeking sophisticated, science-based workout",
        packageMechanics: "4 Classes + 1 Anatomy & Alignment Studio Workshop led by Master Trainer",
        pricingBreakdown: "Mumbai: Rack ₹6,000, Final ₹4,725 (25% discount). Bengaluru: Rack ₹4,800, Final ₹3,780 (25% discount)",
        whyItWorks: "Positions brand as technical discipline rather than just fitness class.",
        targetUnits: { mumbai: 70, bengaluru: 30 },
        expectedRevenue: { mumbai: 330750, bengaluru: 113400 }
      }
    ]
  },
  {
    month: "October",
    shortMonth: "Oct",
    target: 8550000,
    historicBaseline: 6343284,
    lastYearRevenue: 6343284,
    mumbaiTarget: 7270000,
    mumbaiLastYear: 3805970,
    bengaluruTarget: 1280000,
    bengaluruLastYear: 1902985,
    theme: "The Pre-Festive Glow & Vitality",
    heroOffer: "Willy Wonka Wellness",
    focus: "Aesthetic results, high-velocity toning, and premium gifting ahead of social season",
    context: "Focus on visible results for upcoming social events and luxury gifting preparation.",
    pricingNote: "Short-term unlimited for immediate results and exclusive annual memberships with status symbols.",
    half: 'H2',
    quarter: 'Q4',
    offers: [
      {
        id: "oct-1",
        offerType: "New Member",
        offerName: "The LBD (Little Black Dress) Project",
        audience: "Prospects looking for visible results for social events",
        packageMechanics: "4-week unlimited sprint + digital Physique Style & Prep Guide + 2 Guest Passes for final week",
        pricingBreakdown: "Mumbai: Rack ₹15,250, Final ₹13,900 (15% discount). Bengaluru: Rack ₹12,000, Final ₹11,000 (13% discount)",
        whyItWorks: "Positioned as solution to specific social goal. Short-term unlimited has highest conversion when anchored to aesthetic outcome.",
        targetUnits: { mumbai: 60, bengaluru: 25 },
        expectedRevenue: { mumbai: 834000, bengaluru: 275000 }
      },
      {
        id: "oct-2",
        offerType: "Hero Offer",
        offerName: "Willy Wonka Wellness",
        audience: "High-net-worth members and long-term advocates",
        packageMechanics: "Annual Membership + 2 additional Private Sessions + Limited Edition P57 Gold Grip Socks",
        pricingBreakdown: "Mumbai: Rack ₹1,65,000, Final ₹1,45,000. Bengaluru: Rack ₹1,28,000, Final ₹1,15,000",
        whyItWorks: "Exclusive swag (Gold Socks) creates status symbol within studio. Annual commitment feels like joining elite club.",
        targetUnits: { mumbai: 10, bengaluru: 5 },
        expectedRevenue: { mumbai: 1450000, bengaluru: 575000 }
      },
      {
        id: "oct-3",
        offerType: "Lapsed Member",
        offerName: "Gifting is Getting",
        audience: "Lapsed members and current monthly payers",
        packageMechanics: "Buy Studio Gift Card (₹5,000+) for friend, receive 50% off your next month's membership or 10-class pack",
        pricingBreakdown: "Mumbai: Member saves ₹7,625 on 1-Mo. Bengaluru: Member saves ₹6,000 on 1-Mo",
        whyItWorks: "Leverages gifting season to acquire new leads while rewarding loyalty through generous act.",
        targetUnits: { mumbai: 30, bengaluru: 15 },
        expectedRevenue: { mumbai: 390000, bengaluru: 180000 }
      },
      {
        id: "oct-4",
        offerType: "New Member",
        offerName: "The Speed Date",
        audience: "Leads hesitant to commit during busy social period",
        packageMechanics: "5-class taster pack valid for only 14 days to ensure high frequency",
        pricingBreakdown: "Mumbai: Rack ₹7,500, Final ₹6,000 (20% discount). Bengaluru: Rack ₹6,000, Final ₹4,800 (20% discount)",
        whyItWorks: "14-day expiry forces prep mindset, moving leads through funnel before holiday slump hits.",
        targetUnits: { mumbai: 80, bengaluru: 40 },
        expectedRevenue: { mumbai: 480000, bengaluru: 192000 }
      },
      {
        id: "oct-5",
        offerType: "Hero Offer",
        offerName: "The Overachiever",
        audience: "All current members",
        packageMechanics: "Purchase standard 10-Class Pack and receive 2 bonus classes automatically",
        pricingBreakdown: "Mumbai: ₹14,175 + VAT (₹3,000 bonus value). Bengaluru: ₹11,550 + VAT (₹2,200 bonus value)",
        whyItWorks: "Pure volume driver. Increases class density in October to offset potential November dips.",
        targetUnits: { mumbai: 100, bengaluru: 50 },
        expectedRevenue: { mumbai: 1417500, bengaluru: 577500 }
      }
    ]
  },
  {
    month: "November",
    shortMonth: "Nov",
    target: 6300000,
    historicBaseline: 4671642,
    lastYearRevenue: 4671642,
    mumbaiTarget: 4850000,
    mumbaiLastYear: 2802985,
    bengaluruTarget: 1480000,
    bengaluruLastYear: 1402456,
    theme: "The Detox & Deal - Post-Diwali Recovery",
    heroOffer: "The Doomsday Prep",
    focus: "Combat post-festive slump by gamifying detox while using Black Friday for high-value upfront cash",
    context: "Post-Diwali recovery with Black Friday revenue injection. High Average Transaction Value focus.",
    pricingNote: "Guilt-based detox marketing with massive value Black Friday offers.",
    half: 'H2',
    quarter: 'Q4',
    offers: [
      {
        id: "nov-1",
        offerType: "New Member",
        offerName: "The Morning After Plan",
        audience: "Post-Diwali guilt demographic",
        packageMechanics: "2 Weeks of Unlimited Barre for the price of 1 week",
        pricingBreakdown: "Mumbai: 1 Week ₹8,500 + VAT = ₹8,925. Bengaluru: 1 Week ₹6,500 + VAT = ₹6,825",
        whyItWorks: "Low friction after Diwali sweets. Clients crave immediate start without 3-month commitment.",
        targetUnits: { mumbai: 40, bengaluru: 20 },
        expectedRevenue: { mumbai: 357000, bengaluru: 136500 }
      },
      {
        id: "nov-2",
        offerType: "Lapsed Member",
        offerName: "Sweet Revenge",
        audience: "Guilt-motivated leads",
        packageMechanics: "1 Week Flat Rate Unlimited + 1 Nutrition Detox Consult",
        pricingBreakdown: "Mumbai: ₹3,333 + VAT = ₹3,500. Bengaluru: ₹2,381 + VAT = ₹2,500",
        whyItWorks: "Guilt-based marketing with tangible solution combining Nutrition + Fitness.",
        targetUnits: { mumbai: 30, bengaluru: 20 },
        expectedRevenue: { mumbai: 105000, bengaluru: 50000 }
      },
      {
        id: "nov-3",
        offerType: "Hero Offer",
        offerName: "The Black Friday Vault (Nov 24-30 Only)",
        audience: "High-value transaction seekers",
        packageMechanics: "50 Class Pack with 24-Month Validity",
        pricingBreakdown: "Mumbai: Rack ₹60,000, Final ₹47,250 (25% discount, ₹945/class). Bengaluru: Rack ₹48,000, Final ₹37,800 (25% discount, ₹756/class)",
        whyItWorks: "High Average Transaction Value. 2-year validity removes 'too busy' objection.",
        targetUnits: { mumbai: 15, bengaluru: 10 },
        expectedRevenue: { mumbai: 708750, bengaluru: 378000 },
        notes: "Limited quantity creates urgency. 24-month validity is key selling point over discount."
      }
    ]
  },
  {
    month: "December",
    shortMonth: "Dec",
    target: 5150000,
    historicBaseline: 3820896,
    lastYearRevenue: 3820896,
    mumbaiTarget: 3200000,
    mumbaiLastYear: 2292537,
    bengaluruTarget: 950000,
    bengaluruLastYear: 1146269,
    theme: "Finish Strong - Pre-Resolution Capture",
    heroOffer: "Price Lock & Load",
    focus: "Fill classes during holiday travel season and lock in 2027 revenue before January rush",
    context: "Holiday gifting and 2027 revenue pre-capture with founder protection pricing.",
    pricingNote: "Gifting solutions and future-proof purchases with early bird discounts.",
    half: 'H2',
    quarter: 'Q4',
    offers: [
      {
        id: "dec-1",
        offerType: "Occasion Offer",
        offerName: "Santa's Helper Gets Helped",
        audience: "High-net-worth gift purchasers",
        packageMechanics: "Purchase ₹10,000 Gift Card, receive 2 Complimentary Classes for purchaser",
        pricingBreakdown: "Fixed value ₹10,000. VAT applicable only on service redemption",
        whyItWorks: "Solves gifting dilemma for high-net-worth clients while rewarding loyal member.",
        targetUnits: { mumbai: 25, bengaluru: 15 },
        expectedRevenue: { mumbai: 250000, bengaluru: 150000 }
      },
      {
        id: "dec-2",
        offerType: "Spot Offer",
        offerName: "Holiday Insurance",
        audience: "Travel-conscious buyers",
        packageMechanics: "Buy any 10 or 20 pack in December, get Double Validity + 2 extra freeze attempts",
        pricingBreakdown: "Standard rack rates with valuable extensions",
        whyItWorks: "Overcomes 'I'm traveling in Dec, I'll join in Jan' excuse. Makes purchase future-proof.",
        targetUnits: { mumbai: 60, bengaluru: 40 },
        notes: "Double validity and extra freezes make it travel-friendly"
      },
      {
        id: "dec-3",
        offerType: "Hero Offer",
        offerName: "Price Lock & Load",
        audience: "Long-term loyalty rewards",
        packageMechanics: "Lock in Annual Membership at 2025 prices + 10% Early Bird Discount",
        pricingBreakdown: "Mumbai: 2025 Rack ₹1,65,000, Final ₹1,55,925 (10% discount). Bengaluru: 2025 Rack ₹1,25,000, Final ₹1,18,125 (10% discount)",
        whyItWorks: "Rewards long-term loyalty and secures massive cash flow before year end.",
        targetUnits: { mumbai: 5, bengaluru: 5 },
        expectedRevenue: { mumbai: 779625, bengaluru: 590625 },
        notes: "Early bird discount creates urgency for loyal members"
      }
    ]
  }
];

export const risks: RiskItem[] = [
  {
    risk: "High January churn after resolution period ends",
    probability: "High",
    impact: "High",
    mitigation: "4-Month Momentum Bundle locks users through Q1 transformation period"
  },
  {
    risk: "Monsoon season attendance drops affecting June-July revenue",
    probability: "Medium",
    impact: "Medium", 
    mitigation: "Virtual private sessions and transport credit bundles provide flexibility"
  },
  {
    risk: "Anniversary month expectations too aggressive (April)",
    probability: "Medium",
    impact: "High",
    mitigation: "Experience-focused offers over discounts, limited quantity creates scarcity value"
  },
  {
    risk: "Corporate partnership dependencies for September offers",
    probability: "Low",
    impact: "Medium",
    mitigation: "Diversify with trainer-led referral codes and individual executive packages"
  },
  {
    risk: "Holiday season December travel affecting class attendance",
    probability: "High",
    impact: "Low",
    mitigation: "Extension grants and 2027 pre-sales capture revenue while accommodating travel"
  }
];

// New comprehensive financial projections based on strategic plans
export const financialProjections = {
  totalAnnualTarget: 130000000, // Updated based on all monthly targets
  q1Target: 25660000, // Jan + Feb + Mar
  q2Target: 37233500, // Apr + May + Jun  
  q3Target: 21880000, // Jul + Aug + Sep
  q4Target: 20000000, // Oct + Nov + Dec
  mumbaiTotalTarget: 78000000, // 60% of total
  bengaluruTotalTarget: 39000000, // 30% of total
  popupsTotalTarget: 13000000 // 10% of total
};

// Utility functions for formatting and calculations
export const formatCurrency = (amount: number): string => {
  if (amount >= 10000000) { // 1 crore or more
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  } else if (amount >= 100000) { // 1 lakh or more
    return `₹${(amount / 100000).toFixed(1)}L`;
  } else if (amount >= 1000) { // 1 thousand or more
    return `₹${(amount / 1000).toFixed(1)}K`;
  } else {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
};

export const formatCurrencyFull = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

// H1 and H2 specific risks
export const h1Risks: RiskItem[] = [
  {
    risk: "High January churn after resolution period ends",
    probability: "High",
    impact: "High",
    mitigation: "4-Month Momentum Bundle locks users through Q1 transformation period"
  },
  {
    risk: "Anniversary month expectations too aggressive (April)",
    probability: "Medium", 
    impact: "High",
    mitigation: "Experience-focused offers over discounts, limited quantity creates scarcity value"
  },
  {
    risk: "Monsoon season attendance drops affecting June revenue",
    probability: "Medium",
    impact: "Medium",
    mitigation: "Virtual private sessions and transport credit bundles provide flexibility"
  }
];

export const h2Risks: RiskItem[] = [
  {
    risk: "Corporate partnership dependencies for September offers",
    probability: "Low",
    impact: "Medium",
    mitigation: "Diversify with trainer-led referral codes and individual executive packages"
  },
  {
    risk: "Holiday season December travel affecting class attendance",
    probability: "High",
    impact: "Low",
    mitigation: "Extension grants and 2027 pre-sales capture revenue while accommodating travel"
  },
  {
    risk: "Black Friday expectations creating pricing pressure",
    probability: "Medium",
    impact: "Medium",
    mitigation: "Position as limited-time vault offer with extended validity rather than discount focus"
  }
];