// Sales Plan Data for Physique 57 India 2026

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
}

export interface RiskItem {
  risk: string;
  probability: string;
  impact: string;
  mitigation: string;
}

export const h1Strategy = {
  title: "H1 2026 Strategy",
  coreStrategy: [
    "Q1 (Jan-Mar): Capitalize on \"Resolutioners\" with 3-month commitments to lock them in until the Anniversary.",
    "April (The Event): A high-volume, high-energy month. Target is aggressive (35% growth over April '25).",
    "Q2 (May-Jun): Switch to \"Lifestyle & Travel\" flexibility offers to prevent summer churn."
  ],
  totalTarget: 35600000,
  totalBaseline: 26800000,
  mumbaiTotal: 21360000,
  bengaluruTotal: 10680000
};

export const h2Strategy = {
  title: "H2 2026 Strategy",
  coreStrategy: [
    "Volume-Led Growth: Leveraging the \"Supreme HQ\" surge and stabilizing \"Kwality House\".",
    "Yield Protection: Minimizing direct cash discounts in favor of Value Adds (Validity, Freezes, Retail)."
  ],
  locationSplit: {
    mumbai: 60,
    bengaluru: 30,
    popups: 10
  },
  totalTarget: 39890000,
  totalBaseline: 29900000,
  mumbaiTotal: 23900000,
  bengaluruTotal: 11960000
};

export const monthlyData: MonthData[] = [
  {
    month: "January",
    shortMonth: "Jan",
    target: 5200000,
    historicBaseline: 3929116,
    lastYearRevenue: 3929116,
    mumbaiTarget: 3120000,
    mumbaiLastYear: 2357470,
    bengaluruTarget: 1560000,
    bengaluruLastYear: 1178735,
    theme: "The \"Resolution\" Lock-In",
    heroOffer: "Resolution Bundle (3 Month)",
    focus: "3-Month Commitments (Quarterly lock-in)",
    context: "Organic demand is high. Do NOT discount single months. Sell commitment.",
    pricingNote: "No discounts, only Value Adds.",
    half: 'H1',
    quarter: 'Q1',
    offers: [
      {
        id: "jan-1",
        offerType: "New Member",
        offerName: "Resolution 2026 Bundle",
        audience: "New Leads",
        packageMechanics: "Studio 3 Month Unlimited + Nutritional Guide & 2 Guest Passes",
        pricingBreakdown: "Rack: ₹50,750 | VAT: ₹2,537 | Disc: 0% (Value Add) | Final: ₹53,288",
        whyItWorks: "Capture full wallet share immediately. No discount needed in Jan; Value adds convert."
      },
      {
        id: "jan-2",
        offerType: "New Member",
        offerName: "The \"Kickstarter\"",
        audience: "Hesitant Leads",
        packageMechanics: "Studio 4 Class Pack",
        pricingBreakdown: "Rack: ₹5,350 | VAT: ₹267 | Disc: 0% | Final: ₹5,617",
        whyItWorks: "Low barrier to entry. \"Just try it\". Upsell to membership in Feb."
      },
      {
        id: "jan-3",
        offerType: "Lapsed",
        offerName: "New Year Reset",
        audience: "Inactive <2025",
        packageMechanics: "Studio 10 Class Pack",
        pricingBreakdown: "Rack: ₹15,000 | VAT: ₹750 | Disc: 10% | Final: ₹14,175",
        whyItWorks: "Re-activates old users who want to restart their fitness journey."
      },
      {
        id: "jan-4",
        offerType: "Upsell",
        offerName: "Priority Access",
        audience: "Current Members",
        packageMechanics: "Upgrade to Annual (Pre-Price Rise Warning)",
        pricingBreakdown: "Rack: ₹192,500 | VAT: ₹9,625 | Final: ₹202,125",
        whyItWorks: "Scarcity tactic: \"Prices may rise in April\". Locks in cash now."
      },
      {
        id: "jan-5",
        offerType: "Innovative",
        offerName: "The \"Habit\" Challenge",
        audience: "All",
        packageMechanics: "Attend 20 classes in Jan → Get Feb 15% Off",
        pricingBreakdown: "--",
        whyItWorks: "Gamification. Drives massive utilization and community buzz."
      }
    ]
  },
  {
    month: "February",
    shortMonth: "Feb",
    target: 5400000,
    historicBaseline: 4136223,
    lastYearRevenue: 4136223,
    mumbaiTarget: 3240000,
    mumbaiLastYear: 2481734,
    bengaluruTarget: 1620000,
    bengaluruLastYear: 1240867,
    theme: "Love & Loyalty",
    heroOffer: "Couples/Pairs (2-for-1 style)",
    focus: "Referrals & 2-Person Sales",
    context: "Short month. Motivation dips. Leverage Valentine's/Pairs.",
    pricingNote: "High ticket, lower yield per head but high volume.",
    half: 'H1',
    quarter: 'Q1',
    offers: [
      {
        id: "feb-1",
        offerType: "New Member",
        offerName: "\"Better Together\" Pair",
        audience: "Couples/BFFs",
        packageMechanics: "2 x Studio 1 Month Unlimited (Must buy 2)",
        pricingBreakdown: "Rack: ₹35,500 (for 2) | VAT: ₹1,775 | Disc: 20% | Final: ₹29,820 (₹14,910 each)",
        whyItWorks: "High ticket size (approx ₹30k). Acquires 2 members at once."
      },
      {
        id: "feb-2",
        offerType: "New Member",
        offerName: "Self-Love Single",
        audience: "Singles",
        packageMechanics: "Studio 1 Month + Retail Candle/Socks",
        pricingBreakdown: "Rack: ₹17,750 | VAT: ₹888 | Disc: 10% | Final: ₹16,773",
        whyItWorks: "\"Treat yourself\" messaging."
      },
      {
        id: "feb-3",
        offerType: "Lapsed",
        offerName: "We Miss You",
        audience: "Lapsed >60 Days",
        packageMechanics: "Studio 5 Class Pack (Hidden SKU)",
        pricingBreakdown: "Price: ₹7,500 + VAT",
        whyItWorks: "Low commitment re-entry point for those falling off the wagon."
      },
      {
        id: "feb-4",
        offerType: "Upsell",
        offerName: "Private Passion",
        audience: "Members",
        packageMechanics: "Studio Private Class (Single)",
        pricingBreakdown: "Rack: ₹5,000 | VAT: ₹250 | Disc: BOGO 50% (Buy 1, Get 2nd 50% off) | Final: ₹7,875 (for 2)",
        whyItWorks: "Encourages private training upgrades."
      },
      {
        id: "feb-5",
        offerType: "Innovative",
        offerName: "Blind Date Class",
        audience: "Event",
        packageMechanics: "Single Class",
        pricingBreakdown: "Price: ₹1,500 + VAT",
        whyItWorks: "Special themed class where you are partnered up. Fun/Social."
      }
    ]
  },
  {
    month: "March",
    shortMonth: "Mar",
    target: 4600000,
    historicBaseline: 3479117,
    lastYearRevenue: 3479117,
    mumbaiTarget: 2760000,
    mumbaiLastYear: 2087470,
    bengaluruTarget: 1380000,
    bengaluruLastYear: 1043735,
    theme: "March Madness (Fiscal End)",
    heroOffer: "Corporate/Bulk Packs",
    focus: "Clearing Inventory & Corporate Sales",
    context: "Corporate budgets expiring. Stressful month for finance professionals.",
    pricingNote: "Clear inventory.",
    half: 'H1',
    quarter: 'Q1',
    offers: [
      {
        id: "mar-1",
        offerType: "New Member",
        offerName: "Fiscal Fitness",
        audience: "Corporates",
        packageMechanics: "Bulk 50 Class Pass (Transferable)",
        pricingBreakdown: "Price: ₹70,000 + VAT",
        whyItWorks: "B2B sale. Companies spend remaining L&D/Wellness budget before March 31."
      },
      {
        id: "mar-2",
        offerType: "New Member",
        offerName: "March Madness 20",
        audience: "High Volume Users",
        packageMechanics: "Studio 20 Single Class Pack",
        pricingBreakdown: "Rack: ₹30,000 | VAT: ₹1,500 | Disc: 15% | Final: ₹26,775",
        whyItWorks: "Great value for money, clearing the \"inventory\" before April new launches."
      },
      {
        id: "mar-3",
        offerType: "Lapsed",
        offerName: "Spring Clean",
        audience: "Old Leads",
        packageMechanics: "Studio 1 Month Unlimited",
        pricingBreakdown: "Rack: ₹17,750 | VAT: ₹888 | Disc: 15% (Strict Floor) | Final: ₹15,841",
        whyItWorks: "Reactivates old leads with a reasonable discount."
      },
      {
        id: "mar-4",
        offerType: "Upsell",
        offerName: "Freeze Amnesty",
        audience: "Current Members",
        packageMechanics: "Buy 30 Days Freeze",
        pricingBreakdown: "Price: ₹2,500 + VAT",
        whyItWorks: "\"Too busy closing accounts? Buy a freeze.\""
      },
      {
        id: "mar-5",
        offerType: "Innovative",
        offerName: "Tax Free Weekend*",
        audience: "Flash Sale",
        packageMechanics: "All Retail",
        pricingBreakdown: "Disc: Equivalent to VAT (5%)",
        whyItWorks: "Marketing hook only. We pay the tax, customer gets 5% off."
      }
    ]
  },
  {
    month: "April",
    shortMonth: "Apr",
    target: 9400000,
    historicBaseline: 6938682,
    lastYearRevenue: 6938682,
    mumbaiTarget: 5640000,
    mumbaiLastYear: 4163209,
    bengaluruTarget: 2820000,
    bengaluruLastYear: 2081605,
    theme: "THE 8th ANNIVERSARY (GALA MONTH)",
    heroOffer: "The Infinite 8 (Annual @ 28% OFF)",
    focus: "Annuals, Long-Term Packs, & Celebration",
    context: "The biggest month of H1. We need excitement, celebration, and aggressive volume. Theme: \"Infinite 8\" (Symbolizing the Figure 8 / Infinity loop of Barre).",
    pricingNote: "Aggressive 28% Discount on Annuals.",
    isAnniversary: true,
    half: 'H1',
    quarter: 'Q2',
    offers: [
      {
        id: "apr-1",
        offerType: "HERO OFFER",
        offerName: "The Infinite 8 (Annual)",
        audience: "VVIP / HNI",
        packageMechanics: "Studio Annual Unlimited @ 28% OFF",
        pricingBreakdown: "Rack: ₹192,500 | VAT: ₹9,625 | Disc: 28% | Final: ₹145,530",
        whyItWorks: "Once a year price. Beats the standard floor. Generates massive cash. Limited to first 28 people."
      },
      {
        id: "apr-2",
        offerType: "New Member",
        offerName: "The \"Great 8\" Bundle",
        audience: "General",
        packageMechanics: "8 Month Unlimited Membership (Special SKU)",
        pricingBreakdown: "Calculated Base: ~₹133k | Offer Price: ₹88,888 (+VAT) | Final: ₹93,332",
        whyItWorks: "Symbolic 8-month package at an attractive price point."
      },
      {
        id: "apr-3",
        offerType: "Lapsed",
        offerName: "Lucky 8 Pack",
        audience: "Lapsed",
        packageMechanics: "8 Classes + 8 Days Validity Bonus",
        pricingBreakdown: "Base: 8 Class Pack (₹10,200) | VAT: ₹510 | Price: ₹8,800 (inc VAT)",
        whyItWorks: "Cute, thematic, affordable."
      },
      {
        id: "apr-4",
        offerType: "Upsell",
        offerName: "Birthday Gift",
        audience: "Members",
        packageMechanics: "Upgrade to next Tier",
        pricingBreakdown: "Disc: Flat ₹8,000 Off",
        whyItWorks: "Simple flat discount on any upgrade > ₹50k."
      },
      {
        id: "apr-5",
        offerType: "Innovative",
        offerName: "The Golden Ticket",
        audience: "Retail/Class",
        packageMechanics: "8 Hidden Tickets in Retail bags",
        pricingBreakdown: "--",
        whyItWorks: "Find a ticket, win a 1 Month Unlimited. Drives retail sales."
      }
    ]
  },
  {
    month: "May",
    shortMonth: "May",
    target: 5300000,
    historicBaseline: 4044857,
    lastYearRevenue: 4044857,
    mumbaiTarget: 3180000,
    mumbaiLastYear: 2426914,
    bengaluruTarget: 1590000,
    bengaluruLastYear: 1213457,
    theme: "Summer Slim Down",
    heroOffer: "Summer Bootcamp",
    focus: "Short Term Intensity (Bikini Body)",
    context: "Post-anniversary hangover + Summer heat.",
    pricingNote: "High yield, short duration.",
    half: 'H1',
    quarter: 'Q2',
    offers: [
      {
        id: "may-1",
        offerType: "New Member",
        offerName: "Summer Bootcamp",
        audience: "Gen Z / Millennials",
        packageMechanics: "6 Week Unlimited (Strict Validity)",
        pricingBreakdown: "Rack: ₹30,000 | VAT: ₹1,500 | Final: ₹31,500",
        whyItWorks: "High yield. Fixed date start (May 1 or May 15). Community feel."
      },
      {
        id: "may-2",
        offerType: "New Member",
        offerName: "The \"Detox\" Week",
        audience: "Trials",
        packageMechanics: "Studio 1 Week Unlimited (Special SKU)",
        pricingBreakdown: "Price: ₹4,500 + VAT",
        whyItWorks: "Short, sharp shock. Low barrier."
      },
      {
        id: "may-3",
        offerType: "Lapsed",
        offerName: "Mom's Summer Break",
        audience: "Parents",
        packageMechanics: "Studio 10 Single Class Pack",
        pricingBreakdown: "Rack: ₹15,000 | VAT: ₹750 | Disc: 0% + Free Kids Ballet Class | Final: ₹15,750",
        whyItWorks: "Targets parents with value-add for kids."
      },
      {
        id: "may-4",
        offerType: "Upsell",
        offerName: "Retail: Beach Ready",
        audience: "Members",
        packageMechanics: "Grip Socks + Water Bottle",
        pricingBreakdown: "Disc: 15% Bundle",
        whyItWorks: "Merch sales."
      },
      {
        id: "may-5",
        offerType: "Innovative",
        offerName: "The \"Sweat Bet\"",
        audience: "Members",
        packageMechanics: "Attend 15 classes in May",
        pricingBreakdown: "--",
        whyItWorks: "Reward: ₹1500 credit on June membership. Retention tool."
      }
    ]
  },
  {
    month: "June",
    shortMonth: "Jun",
    target: 5700000,
    historicBaseline: 4312599,
    lastYearRevenue: 4312599,
    mumbaiTarget: 3420000,
    mumbaiLastYear: 2587559,
    bengaluruTarget: 1710000,
    bengaluruLastYear: 1293780,
    theme: "The \"Jet Setter\" Strategy",
    heroOffer: "Travel/Flexibility",
    focus: "Online/Hybrid & Validity Extension",
    context: "Peak travel season. Revenue usually drops. We sell flexibility.",
    pricingNote: "Extended validity is the key selling point.",
    half: 'H1',
    quarter: 'Q2',
    offers: [
      {
        id: "jun-1",
        offerType: "New Member",
        offerName: "The Nomad Pass",
        audience: "Travelers",
        packageMechanics: "Studio 20 Class Pack + 6 Month Validity",
        pricingBreakdown: "Rack: ₹30,000 | VAT: ₹1,500 | Disc: 5% | Final: ₹29,925",
        whyItWorks: "Standard validity is 105 days. Doubling it to 180 days justifies the price for travelers."
      },
      {
        id: "jun-2",
        offerType: "New Member",
        offerName: "Global Physiquer",
        audience: "Remote Leads",
        packageMechanics: "Virtual Private Class x 10",
        pricingBreakdown: "Rack: ₹45,000 | VAT: ₹2,250 | Disc: 20% | Final: ₹37,800",
        whyItWorks: "\"Take your trainer with you to London/Paris\"."
      },
      {
        id: "jun-3",
        offerType: "Lapsed",
        offerName: "Monsoon Early Bird",
        audience: "Locals",
        packageMechanics: "Studio 3 Month Unlimited (Buy now, Start July 1)",
        pricingBreakdown: "Rack: ₹50,750 | VAT: ₹2,537 | Disc: 15% | Final: ₹45,290",
        whyItWorks: "Pre-sells July memberships."
      },
      {
        id: "jun-4",
        offerType: "Upsell",
        offerName: "Freeze Extension",
        audience: "Members",
        packageMechanics: "Unlimited Summer Freeze",
        pricingBreakdown: "Price: ₹4,000",
        whyItWorks: "Allows them to freeze for 45 days (vacation) without cancelling."
      },
      {
        id: "jun-5",
        offerType: "Innovative",
        offerName: "Father's Day",
        audience: "Men/Dads",
        packageMechanics: "Men's Strength Lab 5 Pack",
        pricingBreakdown: "Price: ₹6,000 + VAT",
        whyItWorks: "Targeted at partners/dads. \"Real men do Barre/Strength\"."
      }
    ]
  },
  {
    month: "July",
    shortMonth: "Jul",
    target: 6560000,
    historicBaseline: 4932988,
    lastYearRevenue: 4932988,
    mumbaiTarget: 3936000,
    mumbaiLastYear: 2959793,
    bengaluruTarget: 1968000,
    bengaluruLastYear: 1479896,
    theme: "The \"Monsoon Proof\" Strategy",
    heroOffer: "Freezes with 3M Pack",
    focus: "Retention & Validity Extension",
    context: "High rainfall in Mumbai usually dips attendance. We sell \"Flexibility\" to combat churn.",
    pricingNote: "Don't sell 1M below ₹12k",
    half: 'H2',
    quarter: 'Q3',
    offers: [
      {
        id: "jul-1",
        offerType: "New Member",
        offerName: "The Monsoon Shield",
        audience: "Leads (Cold)",
        packageMechanics: "Studio 3 Month Unlimited + Unlimited Freeze for July",
        pricingBreakdown: "Rack: ₹50,750 | VAT (5%): ₹2,537 | Disc: 15% | Final: ₹45,290",
        whyItWorks: "Removes the fear of \"wasted days\" due to rain. High ticket, secure revenue."
      },
      {
        id: "jul-2",
        offerType: "New Member",
        offerName: "Rainy Day Rebels",
        audience: "Leads (Warm)",
        packageMechanics: "Studio 10 Class Pack + 2 Bonus Classes",
        pricingBreakdown: "Rack: ₹15,000 | VAT: ₹750 | Disc: 0% (Value Add) | Final: ₹15,750",
        whyItWorks: "Increases effective value without dropping yield. 12 classes for price of 10."
      },
      {
        id: "jul-3",
        offerType: "Lapsed",
        offerName: "The \"Welcome Home\" Pass",
        audience: "Inactive 60+ Days",
        packageMechanics: "Studio 1 Month Unlimited (Strict Floor Applied)",
        pricingBreakdown: "Rack: ₹17,750 | VAT: ₹888 | Disc: 32% (Floor Check) | Final: ₹12,600",
        whyItWorks: "Hits just above the ₹11,999 floor. Aggressive re-activation for monsoon slump."
      },
      {
        id: "jul-4",
        offerType: "Upsell",
        offerName: "Q3 Power Up",
        audience: "Current Monthly Users",
        packageMechanics: "Upgrade to 6 Month Unlimited + ₹3000 Retail Credit",
        pricingBreakdown: "Rack: ₹99,750 | VAT: ₹4,987 | Disc: 10% | Final: ₹94,263",
        whyItWorks: "Retail credit clears inventory and makes the high price point palatable."
      },
      {
        id: "jul-5",
        offerType: "Innovative",
        offerName: "The \"Freeze Bank\"",
        audience: "All Members",
        packageMechanics: "Buy 30 Days of Freeze",
        pricingBreakdown: "Price: ₹3,150 (inc VAT)",
        whyItWorks: "Monetizes the \"Freeze\" feature. Pure profit line item."
      }
    ]
  },
  {
    month: "August",
    shortMonth: "Aug",
    target: 11000000,
    historicBaseline: 8271474,
    lastYearRevenue: 8271474,
    mumbaiTarget: 6600000,
    mumbaiLastYear: 4962884,
    bengaluruTarget: 3300000,
    bengaluruLastYear: 2481442,
    theme: "The Freedom & Vitality Push",
    heroOffer: "Annual @ 25% Off",
    focus: "Volume Acquisition (Annuals)",
    context: "Independence Day. High energy. Historic data shows August is a massive revenue month (Peak in '25).",
    pricingNote: "Don't extend 25% off to 6M packs",
    half: 'H2',
    quarter: 'Q3',
    offers: [
      {
        id: "aug-1",
        offerType: "New Member",
        offerName: "Freedom 25 (Annual)",
        audience: "High Net Worth Leads",
        packageMechanics: "Studio Annual Unlimited (25% OFF)",
        pricingBreakdown: "Rack: ₹192,500 | VAT: ₹9,625 | Disc: 25% | Final: ₹151,593",
        whyItWorks: "Anchor Offer. Hits the exact floor for Annuals. Massive cash injection."
      },
      {
        id: "aug-2",
        offerType: "New Member",
        offerName: "The \"1947\" Bundle",
        audience: "Gen Z / Students",
        packageMechanics: "Studio 12 Class Pack (Special Price)",
        pricingBreakdown: "Rack: ₹15,050 | VAT: ₹752 | Disc: Special | Final: ₹12,947",
        whyItWorks: "Symbolic pricing (1947). \"Freedom from commitment\" (Pack vs Membership)."
      },
      {
        id: "aug-3",
        offerType: "Lapsed",
        offerName: "Freedom to Move",
        audience: "Lapsed >90 Days",
        packageMechanics: "Studio 20 Single Class Pack + Extended Validity (5 Months)",
        pricingBreakdown: "Rack: ₹30,000 | VAT: ₹1,500 | Disc: 10% | Final: ₹28,350",
        whyItWorks: "Extending validity from 105 days to 150 days solves the \"I don't have time\" objection."
      },
      {
        id: "aug-4",
        offerType: "Upsell",
        offerName: "Private Freedom",
        audience: "Class Users",
        packageMechanics: "Studio Private Class x 10 (Upgrade)",
        pricingBreakdown: "Rack: ₹50,000 | VAT: ₹2,500 | Disc: 15% | Final: ₹44,625",
        whyItWorks: "Moves group class users to high-margin PT."
      },
      {
        id: "aug-5",
        offerType: "Innovative",
        offerName: "Gift of Fitness",
        audience: "Current Members",
        packageMechanics: "Buy 1 Month, Gift 2 Weeks",
        pricingBreakdown: "Rack: ₹17,750 | VAT: ₹888 | Final: ₹18,638",
        whyItWorks: "Member pays full price, gets a voucher to give a friend. Zero CAC lead generation."
      }
    ]
  },
  {
    month: "September",
    shortMonth: "Sep",
    target: 6950000,
    historicBaseline: 5220944,
    lastYearRevenue: 5220944,
    mumbaiTarget: 4170000,
    mumbaiLastYear: 3132566,
    bengaluruTarget: 2085000,
    bengaluruLastYear: 1566283,
    theme: "The \"Back to Grind\" Reset",
    heroOffer: "3M Bundle + PT",
    focus: "3-Month Commitments (Close out the year)",
    context: "Post-summer/monsoon routine setting. Schools are open.",
    pricingNote: "PT margins are lower; track trainer payout",
    half: 'H2',
    quarter: 'Q3',
    offers: [
      {
        id: "sep-1",
        offerType: "New Member",
        offerName: "The 90-Day Transformation",
        audience: "Weight Loss Leads",
        packageMechanics: "Studio 3 Month Unlimited + 3 PT Sessions",
        pricingBreakdown: "Rack: ₹50,750 (Mbship) + ₹15,000 (PT) | VAT: 5% | Bundle Price: ₹55,000",
        whyItWorks: "Bundling PT raises perceived value significantly."
      },
      {
        id: "sep-2",
        offerType: "New Member",
        offerName: "September Starter",
        audience: "Trials",
        packageMechanics: "Studio 1 Month (No Joining Fee/Admin)",
        pricingBreakdown: "Rack: ₹17,750 | VAT: ₹888 | Disc: 10% | Final: ₹16,773",
        whyItWorks: "Simple, clean discount for those returning to routine."
      },
      {
        id: "sep-3",
        offerType: "Lapsed",
        offerName: "The Recharge Pack",
        audience: "Ex-Pack Holders",
        packageMechanics: "Studio 30 Single Class Pack",
        pricingBreakdown: "Rack: ₹45,000 | VAT: ₹2,250 | Disc: 20% | Final: ₹37,800",
        whyItWorks: "High volume class pack. 20% off makes it ~₹1260/class."
      },
      {
        id: "sep-4",
        offerType: "Upsell",
        offerName: "Hybrid Warrior",
        audience: "Studio Members",
        packageMechanics: "Add Virtual Private x 10",
        pricingBreakdown: "Rack: ₹45,000 | VAT: ₹2,250 | Disc: 25% | Final: ₹35,437",
        whyItWorks: "Captures revenue for days they can't come to the studio."
      },
      {
        id: "sep-5",
        offerType: "Innovative",
        offerName: "Corporate Wellness",
        audience: "B2B / Offices",
        packageMechanics: "50 Class Shared Pack (Company buys)",
        pricingBreakdown: "Price: ₹75,000 (+VAT)",
        whyItWorks: "Bulk sale. Companies use \"Remaining Budget\" in Q3."
      }
    ]
  },
  {
    month: "October",
    shortMonth: "Oct",
    target: 5630000,
    historicBaseline: 4233809,
    lastYearRevenue: 4233809,
    mumbaiTarget: 3378000,
    mumbaiLastYear: 2540285,
    bengaluruTarget: 1689000,
    bengaluruLastYear: 1270143,
    theme: "The Festive Fit (Pre-Diwali)",
    heroOffer: "6-Week Bootcamp",
    focus: "Speed & Aesthetics (Short-term High Intensity)",
    context: "Short month effectively. People want to look good for parties but have no time.",
    pricingNote: "Don't allow freezes on Bootcamp",
    half: 'H2',
    quarter: 'Q4',
    offers: [
      {
        id: "oct-1",
        offerType: "New Member",
        offerName: "The \"Glow Up\" Bootcamp",
        audience: "Women 25-40",
        packageMechanics: "Summer Bootcamp (rebranded) 6 Weeks",
        pricingBreakdown: "Rack: ₹30,000 | VAT: ₹1,500 | Final: ₹31,500",
        whyItWorks: "Reusing the \"Summer Bootcamp\" SKU. 6 weeks fits perfectly before Diwali."
      },
      {
        id: "oct-2",
        offerType: "New Member",
        offerName: "Flash 50",
        audience: "Social Media Leads",
        packageMechanics: "Studio 4 Class Pack (Trial)",
        pricingBreakdown: "Rack: ₹5,350 | VAT: ₹267 | Disc: 0% + Free Pair of Grip Socks | Final: ₹5,617",
        whyItWorks: "Low barrier entry with value-add."
      },
      {
        id: "oct-3",
        offerType: "Lapsed",
        offerName: "Diwali Detox Pre-Pay",
        audience: "All",
        packageMechanics: "Studio 12 Class Pack",
        pricingBreakdown: "Rack: ₹15,050 | VAT: ₹752 | Disc: 15% | Final: ₹13,431",
        whyItWorks: "Positioning: \"Buy now, start post-Diwali\"."
      },
      {
        id: "oct-4",
        offerType: "Upsell",
        offerName: "The Private Glow",
        audience: "HNI Members",
        packageMechanics: "Studio Private Class (Single) B2G1",
        pricingBreakdown: "Rack: ₹5,000 | VAT: ₹250 | Offer: Buy 2 Get 1 Free | Final: ₹10,500 for 3 sessions",
        whyItWorks: "High-value private training bundle."
      },
      {
        id: "oct-5",
        offerType: "Innovative",
        offerName: "The \"Cheat Day\" Pass",
        audience: "Members",
        packageMechanics: "Retail Bundle (Smoothie + Bar + Class)",
        pricingBreakdown: "Price: ₹2,500",
        whyItWorks: "Quick POS upsell."
      }
    ]
  },
  {
    month: "November",
    shortMonth: "Nov",
    target: 5750000,
    historicBaseline: 4316439,
    lastYearRevenue: 4316439,
    mumbaiTarget: 3450000,
    mumbaiLastYear: 2589863,
    bengaluruTarget: 1725000,
    bengaluruLastYear: 1294932,
    theme: "Black Friday & Detox",
    heroOffer: "B6G1 Free",
    focus: "High Ticket Sales (Black Friday)",
    context: "Post-festival guilt + Global Shopping Event.",
    pricingNote: "Ensure validity is strictly enforced",
    half: 'H2',
    quarter: 'Q4',
    offers: [
      {
        id: "nov-1",
        offerType: "New Member",
        offerName: "Black Friday BOGO",
        audience: "High Intent",
        packageMechanics: "Buy 6 Months, Get 1 Month Free",
        pricingBreakdown: "Rack: ₹99,750 | VAT: ₹4,987 | Price: ₹104,737",
        whyItWorks: "Validity extension (7 months total) is better than discounting price. Retains cash."
      },
      {
        id: "nov-2",
        offerType: "New Member",
        offerName: "The \"No Guilt\" Pass",
        audience: "Post-Diwali",
        packageMechanics: "Studio 1 Month Unlimited",
        pricingBreakdown: "Rack: ₹17,750 | VAT: ₹888 | Disc: ₹2000 flat | Final: ₹16,538",
        whyItWorks: "Simple discount for post-festival guilt."
      },
      {
        id: "nov-3",
        offerType: "Lapsed",
        offerName: "Cyber Week Class Pack",
        audience: "Digital Leads",
        packageMechanics: "Studio 20 Class Pack",
        pricingBreakdown: "Rack: ₹30,000 | VAT: ₹1,500 | Disc: 25% | Final: ₹23,625",
        whyItWorks: "Aggressive discount for cyber week."
      },
      {
        id: "nov-4",
        offerType: "Upsell",
        offerName: "Owner's Special Access",
        audience: "Top Tier Members",
        packageMechanics: "Studio Privates - Anisha x 10",
        pricingBreakdown: "Rack: ₹59,500 | VAT: ₹2,975 | Disc: 10% | Final: ₹56,227",
        whyItWorks: "Premium offering with founder access."
      },
      {
        id: "nov-5",
        offerType: "Innovative",
        offerName: "Retail Therapy",
        audience: "Walk-ins",
        packageMechanics: "20% Off all Retail",
        pricingBreakdown: "--",
        whyItWorks: "Clears stock before year-end."
      }
    ]
  },
  {
    month: "December",
    shortMonth: "Dec",
    target: 4000000,
    historicBaseline: 3004057,
    lastYearRevenue: 3004057,
    mumbaiTarget: 2400000,
    mumbaiLastYear: 1802434,
    bengaluruTarget: 1200000,
    bengaluruLastYear: 901217,
    theme: "The \"Finish Strong\" & Pre-Resolution",
    heroOffer: "Pay 2027 Get Dec Free",
    focus: "Cash Flow for Q1 2027",
    context: "Lowest attendance, but highest potential for \"Future Revenue\".",
    pricingNote: "Don't spend the cash; accrue for Q1",
    half: 'H2',
    quarter: 'Q4',
    offers: [
      {
        id: "dec-1",
        offerType: "New Member",
        offerName: "The 2027 Headstart",
        audience: "Resolutioners",
        packageMechanics: "Studio Annual (Pay now, Start Jan 1) + Dec Free",
        pricingBreakdown: "Rack: ₹192,500 | VAT: ₹9,625 | Disc: 20% | Final: ₹161,700",
        whyItWorks: "Captures resolution-minded buyers early."
      },
      {
        id: "dec-2",
        offerType: "New Member",
        offerName: "Secret Santa Mystery",
        audience: "Walk-ins",
        packageMechanics: "Studio 1 Month + Mystery Gift",
        pricingBreakdown: "Rack: ₹17,750 | VAT: ₹888 | Price: ₹18,638",
        whyItWorks: "Gift = 2 extra guest passes or Retail item. Gamification excites users."
      },
      {
        id: "dec-3",
        offerType: "Lapsed",
        offerName: "Last Chance 2026",
        audience: "Expired in 2026",
        packageMechanics: "Studio 8 Class Package",
        pricingBreakdown: "Rack: ₹10,200 | VAT: ₹510 | Disc: 0% + Upgrade to 10 Classes | Final: ₹10,710",
        whyItWorks: "Last chance messaging creates urgency."
      },
      {
        id: "dec-4",
        offerType: "Upsell",
        offerName: "Gift Cards",
        audience: "Corporate/Members",
        packageMechanics: "₹5,000 Gift Card for ₹4,000",
        pricingBreakdown: "Price: ₹4,200 (inc VAT)",
        whyItWorks: "Immediate cash flow. 20% breakage expected (cards not redeemed)."
      },
      {
        id: "dec-5",
        offerType: "Innovative",
        offerName: "Freeze For Charity",
        audience: "Members",
        packageMechanics: "Unused Freeze Exchange",
        pricingBreakdown: "--",
        whyItWorks: "Donate unused freeze days; Studio donates ₹100/day to charity. CSR Branding."
      }
    ]
  }
];

export const h1Risks: RiskItem[] = [
  {
    risk: "April Cannibalization",
    probability: "High",
    impact: "Medium",
    mitigation: "Selling too many Annuals in April might kill May/June renewal revenue. Mitigation: Cap the \"Anniversary Annual\" at 50 units total. Push Class Packs for the rest."
  },
  {
    risk: "Bengaluru Lag",
    probability: "Medium",
    impact: "High",
    mitigation: "Kenkere House is newer. If numbers lag, launch a \"Neighbourhood Special\" (Indiranagar residents get 15% off) specifically for that branch in Feb/Mar."
  },
  {
    risk: "Trainer Burnout",
    probability: "Medium",
    impact: "Medium",
    mitigation: "April is high volume. Ensure trainer rotation is managed and they are incentivized on the \"Anniversary Upsells\"."
  }
];

export const h2Risks: RiskItem[] = [
  {
    risk: "Aggressive Discounting Dilutes Brand",
    probability: "Medium",
    impact: "High",
    mitigation: "Limit 25% discounts to \"Annuals\" only. Monthly packs never drop below 10-15% discount."
  },
  {
    risk: "Bengaluru Underperformance",
    probability: "Medium",
    impact: "Medium",
    mitigation: "Use \"Kickstarter Pack\" (₹4,900) aggressively in BLR to drive trials if targets slip."
  },
  {
    risk: "Capacity Bottlenecks (Jan '27)",
    probability: "High",
    impact: "Low",
    mitigation: "If Dec \"Headstart\" sales are high, restrict class booking windows for Class Pass holders to prioritize Members."
  }
];

export const formatCurrency = (amount: number): string => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  } else {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
};

export const formatCurrencyFull = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};
