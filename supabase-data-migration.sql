-- Physique 57 India - Data Migration Script
-- Run this script in Supabase SQL Editor to populate your tables with data
-- This will INSERT new records or UPDATE existing ones

-- ==========================================
-- CLEAR EXISTING DATA (Optional - uncomment if you want fresh start)
-- ==========================================
-- DELETE FROM offer_performance;
-- DELETE FROM user_notes;
-- DELETE FROM actual_revenue;
-- DELETE FROM sales_offers;
-- DELETE FROM monthly_targets;

-- ==========================================
-- INSERT/UPDATE MONTHLY TARGETS FOR 2026
-- ==========================================

-- Delete existing 2026 data first to ensure clean insert
DELETE FROM monthly_targets WHERE year = 2026;

-- Insert all monthly targets
INSERT INTO monthly_targets (
  month, year, quarter, target_revenue, historic_baseline, last_year_revenue, 
  mumbai_target, mumbai_last_year, bengaluru_target, bengaluru_last_year, 
  theme, hero_offer, focus, context, pricing_note, is_anniversary
) VALUES 
  ('January', 2026, 'Q1', 5200000, 3929116, 3929116, 3120000, 2357470, 1560000, 1178735, 
    'The "Resolution" Lock-In', 'Resolution Bundle (3 Month)', '3-Month Commitments (Quarterly lock-in)', 
    'Organic demand is high. Do NOT discount single months. Sell commitment.', 'No discounts, only Value Adds.', false),
    
  ('February', 2026, 'Q1', 5400000, 4136223, 4136223, 3240000, 2481734, 1620000, 1240867,
    'Love & Loyalty', 'Couples/Pairs (2-for-1 style)', 'Referrals & 2-Person Sales',
    'Short month. Motivation dips. Leverage Valentine''s/Pairs.', 'High ticket, lower yield per head but high volume.', false),
    
  ('March', 2026, 'Q1', 4600000, 3479117, 3479117, 2760000, 2087470, 1380000, 1043735,
    'March Madness (Fiscal End)', 'Corporate/Bulk Packs', 'Clearing Inventory & Corporate Sales',
    'Corporate budgets expiring. Stressful month for finance professionals.', 'Clear inventory.', false),
    
  ('April', 2026, 'Q2', 9400000, 6938682, 6938682, 5640000, 4163209, 2820000, 2081605,
    'THE 8th ANNIVERSARY (GALA MONTH)', 'The Infinite 8 (Annual @ 28% OFF)', 'Annuals, Long-Term Packs, & Celebration',
    'The biggest month of H1. We need excitement, celebration, and aggressive volume.', 'Aggressive 28% Discount on Annuals.', true),
    
  ('May', 2026, 'Q2', 5300000, 4044857, 4044857, 3180000, 2426914, 1590000, 1213457,
    'Summer Slim Down', 'Summer Bootcamp', 'Short Term Intensity (Bikini Body)',
    'Post-anniversary hangover + Summer heat.', 'High yield, short duration.', false),
    
  ('June', 2026, 'Q2', 5700000, 4312599, 4312599, 3420000, 2587559, 1710000, 1293780,
    'The "Jet Setter" Strategy', 'Travel/Flexibility', 'Online/Hybrid & Validity Extension',
    'Peak travel season. Revenue usually drops. We sell flexibility.', 'Extended validity is the key selling point.', false),
    
  ('July', 2026, 'Q3', 6560000, 4932988, 4932988, 3936000, 2959793, 1968000, 1479896,
    'The "Monsoon Proof" Strategy', 'Freezes with 3M Pack', 'Retention & Validity Extension',
    'High rainfall in Mumbai usually dips attendance. We sell "Flexibility" to combat churn.', 'Don''t sell 1M below ₹12k', false),
    
  ('August', 2026, 'Q3', 11000000, 8271474, 8271474, 6600000, 4962884, 3300000, 2481442,
    'The Freedom & Vitality Push', 'Annual @ 25% Off', 'Volume Acquisition (Annuals)',
    'Independence Day. High energy. Historic data shows August is a massive revenue month.', 'Don''t extend 25% off to 6M packs', false),
    
  ('September', 2026, 'Q3', 6950000, 5220944, 5220944, 4170000, 3132566, 2085000, 1566283,
    'The "Back to Grind" Reset', '3M Bundle + PT', '3-Month Commitments (Close out the year)',
    'Post-summer/monsoon routine setting. Schools are open.', 'PT margins are lower; track trainer payout', false),
    
  ('October', 2026, 'Q4', 5630000, 4233809, 4233809, 3378000, 2540285, 1689000, 1270143,
    'The Festive Fit (Pre-Diwali)', '6-Week Bootcamp', 'Speed & Aesthetics (Short-term High Intensity)',
    'Short month effectively. People want to look good for parties but have no time.', 'Don''t allow freezes on Bootcamp', false),
    
  ('November', 2026, 'Q4', 5750000, 4316439, 4316439, 3450000, 2589863, 1725000, 1294932,
    'Black Friday & Detox', 'B6G1 Free', 'High Ticket Sales (Black Friday)',
    'Post-festival guilt + Global Shopping Event.', 'Ensure validity is strictly enforced', false),
    
  ('December', 2026, 'Q4', 4000000, 3004057, 3004057, 2400000, 1802434, 1200000, 901217,
    'The "Finish Strong" & Pre-Resolution', 'Pay 2027 Get Dec Free', 'Cash Flow for Q1 2027',
    'Lowest attendance, but highest potential for "Future Revenue".', 'Don''t spend the cash; accrue for Q1', false);

-- ==========================================
-- INSERT ALL SALES OFFERS FOR 2026
-- ==========================================

-- Delete existing offers first to ensure clean insert
DELETE FROM sales_offers WHERE year = 2026;

-- January Offers
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, is_active, is_cancelled) VALUES
('January', 2026, 'New Member', 'Resolution 2026 Bundle', 'New Leads', 'Studio 3 Month Unlimited + Nutritional Guide & 2 Guest Passes', 'Rack: ₹50,750 | VAT: ₹2,537 | Disc: 0% (Value Add) | Final: ₹53,288', 'Capture full wallet share immediately. No discount needed in Jan; Value adds convert.', true, false),
('January', 2026, 'New Member', 'The "Kickstarter"', 'Hesitant Leads', 'Studio 4 Class Pack', 'Rack: ₹5,350 | VAT: ₹267 | Disc: 0% | Final: ₹5,617', 'Low barrier to entry. "Just try it". Upsell to membership in Feb.', true, false),
('January', 2026, 'Lapsed', 'New Year Reset', 'Inactive <2025', 'Studio 10 Class Pack', 'Rack: ₹15,000 | VAT: ₹750 | Disc: 10% | Final: ₹14,175', 'Re-activates old users who want to restart their fitness journey.', true, false),
('January', 2026, 'Upsell', 'Priority Access', 'Current Members', 'Upgrade to Annual (Pre-Price Rise Warning)', 'Rack: ₹192,500 | VAT: ₹9,625 | Final: ₹202,125', 'Scarcity tactic: "Prices may rise in April". Locks in cash now.', true, false),
('January', 2026, 'Innovative', 'The "Habit" Challenge', 'All', 'Attend 20 classes in Jan → Get Feb 15% Off', '--', 'Gamification. Drives massive utilization and community buzz.', true, false);

-- February Offers
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, is_active, is_cancelled) VALUES
('February', 2026, 'New Member', '"Better Together" Pair', 'Couples/BFFs', '2 x Studio 1 Month Unlimited (Must buy 2)', 'Rack: ₹35,500 (for 2) | VAT: ₹1,775 | Disc: 20% | Final: ₹29,820 (₹14,910 each)', 'High ticket size (approx ₹30k). Acquires 2 members at once.', true, false),
('February', 2026, 'New Member', 'Self-Love Single', 'Singles', 'Studio 1 Month + Retail Candle/Socks', 'Rack: ₹17,750 | VAT: ₹888 | Disc: 10% | Final: ₹16,773', '"Treat yourself" messaging.', true, false),
('February', 2026, 'Lapsed', 'We Miss You', 'Lapsed >60 Days', 'Studio 5 Class Pack (Hidden SKU)', 'Price: ₹7,500 + VAT', 'Low commitment re-entry point for those falling off the wagon.', true, false),
('February', 2026, 'Upsell', 'Private Passion', 'Members', 'Studio Private Class (Single)', 'Rack: ₹5,000 | VAT: ₹250 | Disc: BOGO 50% (Buy 1, Get 2nd 50% off) | Final: ₹7,875 (for 2)', 'Encourages private training upgrades.', true, false),
('February', 2026, 'Innovative', 'Blind Date Class', 'Event', 'Single Class', 'Price: ₹1,500 + VAT', 'Special themed class where you are partnered up. Fun/Social.', true, false);

-- March Offers
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, is_active, is_cancelled) VALUES
('March', 2026, 'New Member', 'Fiscal Fitness', 'Corporates', 'Bulk 50 Class Pass (Transferable)', 'Price: ₹70,000 + VAT', 'B2B sale. Companies spend remaining L&D/Wellness budget before March 31.', true, false),
('March', 2026, 'New Member', 'March Madness 20', 'High Volume Users', 'Studio 20 Single Class Pack', 'Rack: ₹30,000 | VAT: ₹1,500 | Disc: 15% | Final: ₹26,775', 'Great value for money, clearing the "inventory" before April new launches.', true, false),
('March', 2026, 'Lapsed', 'Spring Clean', 'Old Leads', 'Studio 1 Month Unlimited', 'Rack: ₹17,750 | VAT: ₹888 | Disc: 15% (Strict Floor) | Final: ₹15,841', 'Reactivates old leads with a reasonable discount.', true, false),
('March', 2026, 'Upsell', 'Freeze Amnesty', 'Current Members', 'Buy 30 Days Freeze', 'Price: ₹2,500 + VAT', '"Too busy closing accounts? Buy a freeze."', true, false),
('March', 2026, 'Innovative', 'Tax Free Weekend*', 'Flash Sale', 'All Retail', 'Disc: Equivalent to VAT (5%)', 'Marketing hook only. We pay the tax, customer gets 5% off.', true, false);

-- April Offers (Anniversary Month)
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, is_active, is_cancelled) VALUES
('April', 2026, 'HERO OFFER', 'The Infinite 8 (Annual)', 'VVIP / HNI', 'Studio Annual Unlimited @ 28% OFF', 'Rack: ₹192,500 | VAT: ₹9,625 | Disc: 28% | Final: ₹145,530', 'Once a year price. Beats the standard floor. Generates massive cash. Limited to first 28 people.', true, false),
('April', 2026, 'New Member', 'The "Great 8" Bundle', 'General', '8 Month Unlimited Membership (Special SKU)', 'Calculated Base: ~₹133k | Offer Price: ₹88,888 (+VAT) | Final: ₹93,332', 'Symbolic 8-month package at an attractive price point.', true, false),
('April', 2026, 'Lapsed', 'Lucky 8 Pack', 'Lapsed', '8 Classes + 8 Days Validity Bonus', 'Base: 8 Class Pack (₹10,200) | VAT: ₹510 | Price: ₹8,800 (inc VAT)', 'Cute, thematic, affordable.', true, false),
('April', 2026, 'Upsell', 'Birthday Gift', 'Members', 'Upgrade to next Tier', 'Disc: Flat ₹8,000 Off', 'Simple flat discount on any upgrade > ₹50k.', true, false),
('April', 2026, 'Innovative', 'The Golden Ticket', 'Retail/Class', '8 Hidden Tickets in Retail bags', '--', 'Find a ticket, win a 1 Month Unlimited. Drives retail sales.', true, false);

-- May Offers
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, is_active, is_cancelled) VALUES
('May', 2026, 'New Member', 'Summer Bootcamp', 'Gen Z / Millennials', '6 Week Unlimited (Strict Validity)', 'Rack: ₹30,000 | VAT: ₹1,500 | Final: ₹31,500', 'High yield. Fixed date start (May 1 or May 15). Community feel.', true, false),
('May', 2026, 'New Member', 'The "Detox" Week', 'Trials', 'Studio 1 Week Unlimited (Special SKU)', 'Price: ₹4,500 + VAT', 'Short, sharp shock. Low barrier.', true, false),
('May', 2026, 'Lapsed', 'Mom''s Summer Break', 'Parents', 'Studio 10 Single Class Pack', 'Rack: ₹15,000 | VAT: ₹750 | Disc: 0% + Free Kids Ballet Class | Final: ₹15,750', 'Targets parents with value-add for kids.', true, false),
('May', 2026, 'Upsell', 'Retail: Beach Ready', 'Members', 'Grip Socks + Water Bottle', 'Disc: 15% Bundle', 'Merch sales.', true, false),
('May', 2026, 'Innovative', 'The "Sweat Bet"', 'Members', 'Attend 15 classes in May', '--', 'Reward: ₹1500 credit on June membership. Retention tool.', true, false);

-- June Offers
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, is_active, is_cancelled) VALUES
('June', 2026, 'New Member', 'The Nomad Pass', 'Travelers', 'Studio 20 Class Pack + 6 Month Validity', 'Rack: ₹30,000 | VAT: ₹1,500 | Disc: 5% | Final: ₹29,925', 'Standard validity is 105 days. Doubling it to 180 days justifies the price for travelers.', true, false),
('June', 2026, 'New Member', 'Global Physiquer', 'Remote Leads', 'Virtual Private Class x 10', 'Rack: ₹45,000 | VAT: ₹2,250 | Disc: 20% | Final: ₹37,800', '"Take your trainer with you to London/Paris".', true, false),
('June', 2026, 'Lapsed', 'Monsoon Early Bird', 'Locals', 'Studio 3 Month Unlimited (Buy now, Start July 1)', 'Rack: ₹50,750 | VAT: ₹2,537 | Disc: 15% | Final: ₹45,290', 'Pre-sells July memberships.', true, false),
('June', 2026, 'Upsell', 'Freeze Extension', 'Members', 'Unlimited Summer Freeze', 'Price: ₹4,000', 'Allows them to freeze for 45 days (vacation) without cancelling.', true, false),
('June', 2026, 'Innovative', 'Father''s Day', 'Men/Dads', 'Men''s Strength Lab 5 Pack', 'Price: ₹6,000 + VAT', 'Targeted at partners/dads. "Real men do Barre/Strength".', true, false);

-- July Offers
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, is_active, is_cancelled) VALUES
('July', 2026, 'New Member', 'The Monsoon Shield', 'Leads (Cold)', 'Studio 3 Month Unlimited + Unlimited Freeze for July', 'Rack: ₹50,750 | VAT (5%): ₹2,537 | Disc: 15% | Final: ₹45,290', 'Removes the fear of "wasted days" due to rain. High ticket, secure revenue.', true, false),
('July', 2026, 'New Member', 'Rainy Day Rebels', 'Leads (Warm)', 'Studio 10 Class Pack + 2 Bonus Classes', 'Rack: ₹15,000 | VAT: ₹750 | Disc: 0% (Value Add) | Final: ₹15,750', 'Increases effective value without dropping yield. 12 classes for price of 10.', true, false),
('July', 2026, 'Lapsed', 'The "Welcome Home" Pass', 'Inactive 60+ Days', 'Studio 1 Month Unlimited (Strict Floor Applied)', 'Rack: ₹17,750 | VAT: ₹888 | Disc: 32% (Floor Check) | Final: ₹12,600', 'Hits just above the ₹11,999 floor. Aggressive re-activation for monsoon slump.', true, false),
('July', 2026, 'Upsell', 'Q3 Power Up', 'Current Monthly Users', 'Upgrade to 6 Month Unlimited + ₹3000 Retail Credit', 'Rack: ₹99,750 | VAT: ₹4,987 | Disc: 10% | Final: ₹94,263', 'Retail credit clears inventory and makes the high price point palatable.', true, false),
('July', 2026, 'Innovative', 'The "Freeze Bank"', 'All Members', 'Buy 30 Days of Freeze', 'Price: ₹3,150 (inc VAT)', 'Monetizes the "Freeze" feature. Pure profit line item.', true, false);

-- August Offers
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, is_active, is_cancelled) VALUES
('August', 2026, 'New Member', 'Freedom 25 (Annual)', 'High Net Worth Leads', 'Studio Annual Unlimited (25% OFF)', 'Rack: ₹192,500 | VAT: ₹9,625 | Disc: 25% | Final: ₹151,593', 'Anchor Offer. Hits the exact floor for Annuals. Massive cash injection.', true, false),
('August', 2026, 'New Member', 'The "1947" Bundle', 'Gen Z / Students', 'Studio 12 Class Pack (Special Price)', 'Rack: ₹15,050 | VAT: ₹752 | Disc: Special | Final: ₹12,947', 'Symbolic pricing (1947). "Freedom from commitment" (Pack vs Membership).', true, false),
('August', 2026, 'Lapsed', 'Freedom to Move', 'Lapsed >90 Days', 'Studio 20 Single Class Pack + Extended Validity (5 Months)', 'Rack: ₹30,000 | VAT: ₹1,500 | Disc: 10% | Final: ₹28,350', 'Extending validity from 105 days to 150 days solves the "I don''t have time" objection.', true, false),
('August', 2026, 'Upsell', 'Private Freedom', 'Class Users', 'Studio Private Class x 10 (Upgrade)', 'Rack: ₹50,000 | VAT: ₹2,500 | Disc: 15% | Final: ₹44,625', 'Moves group class users to high-margin PT.', true, false),
('August', 2026, 'Innovative', 'Gift of Fitness', 'Current Members', 'Buy 1 Month, Gift 2 Weeks', 'Rack: ₹17,750 | VAT: ₹888 | Final: ₹18,638', 'Member pays full price, gets a voucher to give a friend. Zero CAC lead generation.', true, false);

-- September Offers
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, is_active, is_cancelled) VALUES
('September', 2026, 'New Member', 'The 90-Day Transformation', 'Weight Loss Leads', 'Studio 3 Month Unlimited + 3 PT Sessions', 'Rack: ₹50,750 (Mbship) + ₹15,000 (PT) | VAT: 5% | Bundle Price: ₹55,000', 'Bundling PT raises perceived value significantly.', true, false),
('September', 2026, 'New Member', 'September Starter', 'Trials', 'Studio 1 Month (No Joining Fee/Admin)', 'Rack: ₹17,750 | VAT: ₹888 | Disc: 10% | Final: ₹16,773', 'Simple, clean discount for those returning to routine.', true, false),
('September', 2026, 'Lapsed', 'The Recharge Pack', 'Ex-Pack Holders', 'Studio 30 Single Class Pack', 'Rack: ₹45,000 | VAT: ₹2,250 | Disc: 20% | Final: ₹37,800', 'High volume class pack. 20% off makes it ~₹1260/class.', true, false),
('September', 2026, 'Upsell', 'Hybrid Warrior', 'Studio Members', 'Add Virtual Private x 10', 'Rack: ₹45,000 | VAT: ₹2,250 | Disc: 25% | Final: ₹35,437', 'Captures revenue for days they can''t come to the studio.', true, false),
('September', 2026, 'Innovative', 'Corporate Wellness', 'B2B / Offices', '50 Class Shared Pack (Company buys)', 'Price: ₹75,000 (+VAT)', 'Bulk sale. Companies use "Remaining Budget" in Q3.', true, false);

-- October Offers
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, is_active, is_cancelled) VALUES
('October', 2026, 'New Member', 'The "Glow Up" Bootcamp', 'Women 25-40', 'Summer Bootcamp (rebranded) 6 Weeks', 'Rack: ₹30,000 | VAT: ₹1,500 | Final: ₹31,500', 'Reusing the "Summer Bootcamp" SKU. 6 weeks fits perfectly before Diwali.', true, false),
('October', 2026, 'New Member', 'Flash 50', 'Social Media Leads', 'Studio 4 Class Pack (Trial)', 'Rack: ₹5,350 | VAT: ₹267 | Disc: 0% + Free Pair of Grip Socks | Final: ₹5,617', 'Low barrier entry with value-add.', true, false),
('October', 2026, 'Lapsed', 'Diwali Detox Pre-Pay', 'All', 'Studio 12 Class Pack', 'Rack: ₹15,050 | VAT: ₹752 | Disc: 15% | Final: ₹13,431', 'Positioning: "Buy now, start post-Diwali".', true, false),
('October', 2026, 'Upsell', 'The Private Glow', 'HNI Members', 'Studio Private Class (Single) B2G1', 'Rack: ₹5,000 | VAT: ₹250 | Offer: Buy 2 Get 1 Free | Final: ₹10,500 for 3 sessions', 'High-value private training bundle.', true, false),
('October', 2026, 'Innovative', 'The "Cheat Day" Pass', 'Members', 'Retail Bundle (Smoothie + Bar + Class)', 'Price: ₹2,500', 'Quick POS upsell.', true, false);

-- November Offers
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, is_active, is_cancelled) VALUES
('November', 2026, 'New Member', 'Black Friday BOGO', 'High Intent', 'Buy 6 Months, Get 1 Month Free', 'Rack: ₹99,750 | VAT: ₹4,987 | Price: ₹104,737', 'Validity extension (7 months total) is better than discounting price. Retains cash.', true, false),
('November', 2026, 'New Member', 'The "No Guilt" Pass', 'Post-Diwali', 'Studio 1 Month Unlimited', 'Rack: ₹17,750 | VAT: ₹888 | Disc: ₹2000 flat | Final: ₹16,538', 'Simple discount for post-festival guilt.', true, false),
('November', 2026, 'Lapsed', 'Cyber Week Class Pack', 'Digital Leads', 'Studio 20 Class Pack', 'Rack: ₹30,000 | VAT: ₹1,500 | Disc: 25% | Final: ₹23,625', 'Aggressive discount for cyber week.', true, false),
('November', 2026, 'Upsell', 'Owner''s Special Access', 'Top Tier Members', 'Studio Privates - Anisha x 10', 'Rack: ₹59,500 | VAT: ₹2,975 | Disc: 10% | Final: ₹56,227', 'Premium offering with founder access.', true, false),
('November', 2026, 'Innovative', 'Retail Therapy', 'Walk-ins', '20% Off all Retail', '--', 'Clears stock before year-end.', true, false);

-- December Offers
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, is_active, is_cancelled) VALUES
('December', 2026, 'New Member', 'The 2027 Headstart', 'Resolutioners', 'Studio Annual (Pay now, Start Jan 1) + Dec Free', 'Rack: ₹192,500 | VAT: ₹9,625 | Disc: 20% | Final: ₹161,700', 'Captures resolution-minded buyers early.', true, false),
('December', 2026, 'New Member', 'Secret Santa Mystery', 'Walk-ins', 'Studio 1 Month + Mystery Gift', 'Rack: ₹17,750 | VAT: ₹888 | Price: ₹18,638', 'Gift = 2 extra guest passes or Retail item. Gamification excites users.', true, false),
('December', 2026, 'Lapsed', 'Last Chance 2026', 'Expired in 2026', 'Studio 8 Class Package', 'Rack: ₹10,200 | VAT: ₹510 | Disc: 0% + Upgrade to 10 Classes | Final: ₹10,710', 'Last chance messaging creates urgency.', true, false),
('December', 2026, 'Upsell', 'Gift Cards', 'Corporate/Members', '₹5,000 Gift Card for ₹4,000', 'Price: ₹4,200 (inc VAT)', 'Immediate cash flow. 20% breakage expected (cards not redeemed).', true, false),
('December', 2026, 'Innovative', 'Freeze For Charity', 'Members', 'Unused Freeze Exchange', '--', 'Donate unused freeze days; Studio donates ₹100/day to charity. CSR Branding.', true, false);

-- ==========================================
-- VERIFY DATA WAS INSERTED
-- ==========================================

-- Count monthly target records (should return 12)
SELECT COUNT(*) as total_months FROM monthly_targets WHERE year = 2026;

-- Count sales offers (should return 60 - 5 offers per month x 12 months)
SELECT COUNT(*) as total_offers FROM sales_offers WHERE year = 2026;

-- Show all months with target data
SELECT month, target_revenue, theme FROM monthly_targets WHERE year = 2026 ORDER BY 
  CASE month
    WHEN 'January' THEN 1
    WHEN 'February' THEN 2
    WHEN 'March' THEN 3
    WHEN 'April' THEN 4
    WHEN 'May' THEN 5
    WHEN 'June' THEN 6
    WHEN 'July' THEN 7
    WHEN 'August' THEN 8
    WHEN 'September' THEN 9
    WHEN 'October' THEN 10
    WHEN 'November' THEN 11
    WHEN 'December' THEN 12
  END;

-- Show offers count by month
SELECT month, COUNT(*) as offer_count FROM sales_offers WHERE year = 2026 GROUP BY month ORDER BY 
  CASE month
    WHEN 'January' THEN 1
    WHEN 'February' THEN 2
    WHEN 'March' THEN 3
    WHEN 'April' THEN 4
    WHEN 'May' THEN 5
    WHEN 'June' THEN 6
    WHEN 'July' THEN 7
    WHEN 'August' THEN 8
    WHEN 'September' THEN 9
    WHEN 'October' THEN 10
    WHEN 'November' THEN 11
    WHEN 'December' THEN 12
  END;
