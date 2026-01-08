-- Physique 57 India - Data Migration Script (Updated with 2026 Strategic Masterplan)
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
-- INSERT/UPDATE MONTHLY TARGETS FOR 2026 (Updated Strategic Plan)
-- ==========================================

-- Delete existing 2026 data first to ensure clean insert
DELETE FROM monthly_targets WHERE year = 2026;

-- Insert all monthly targets with updated strategic plan
INSERT INTO monthly_targets (
  month, year, quarter, target_revenue, historic_baseline, last_year_revenue, 
  mumbai_target, mumbai_last_year, bengaluru_target, bengaluru_last_year, 
  theme, hero_offer, focus, context, pricing_note, is_anniversary
) VALUES 
  ('January', 2026, 'Q1', 15960000, 3929116, 3929116, 12098935, 2357470, 4364925, 1178735, 
    'The Resolution Reset', 'The Habit Hack', 'Aggressive newcomer conversion and maximizing Cash Upfront via annual lock-ins', 
    'January is the most critical acquisition month. Fresh Start psychology with 35% YoY growth target.', 'Focus on 4-Month bundles and Spot Annual offers for high cash flow.', false),
    
  ('February', 2026, 'Q1', 5000000, 4136223, 4136223, 4140000, 2481734, 860000, 1240867,
    'Heart-Health & Valentine''s Connection', 'Partner in Grime', 'Transition January trialists into long-term members while utilizing Valentine''s Day',
    'February''s goal is retention of January members plus Valentine''s occasion window for high conversion.', 'Focus on duo packages and self-love positioning to reduce entry friction.', false),
    
  ('March', 2026, 'Q1', 4700000, 4378890, 4378890, 4000000, 2627334, 700000, 1314667,
    'The Power of Her', 'She Means Business', 'Convert February''s V-Day campaigns into long-term commitment, bridge to Q2',
    'March is the bridge to Q2. Convert momentum from February into long-term commitment.', 'Focus on high-ticket retention and community building through women''s empowerment.', false),
    
  ('April', 2026, 'Q2', 25000000, 4844557, 4844557, 15000000, 2906734, 10000000, 1452367,
    'INFINITE STRENGTH - 8th Anniversary Celebration', 'The Infinity Plan', 'Event-driven offers with scarcity strategy, high-impact experiences over discounts',
    '8th Anniversary Jubilee with Gold, Glamour, and Legacy theme. Experience-focused offers.', 'Premium pricing with exclusive experiences. Limited quantity creates FOMO.', true),
    
  ('May', 2026, 'Q2', 7592500, 5279003, 5279003, 5642500, 3167402, 1950000, 1583601,
    'The Summer Sprint - Elite Transformation', 'Hot Girl Summer Prep', 'High-liquidity month shifting from Access to Transformation & Luxury. Summer Holiday Prep + Student demographic',
    'Capitalize on Summer Holiday Prep window and high-intent Student demographic with 33% YoY revenue jump.', 'Focus on High Average Order Value (AOV) and Elite 3-month pack upgrades.', false),
    
  ('June', 2026, 'Q2', 5641000, 4194448, 4194448, 4158000, 2516669, 1497500, 1257534,
    'The Monsoon Motivation', 'Rain Check Rejected', 'Indoor Comfort and Reactive Marketing. Re-engage lapsed users with bite-sized commitments and virtual safety nets',
    'Traditionally low-attendance month due to heavy rains and traffic chaos. Focus on indoor comfort.', 'Mid-tier bundles with virtual components and rainy day reactive offers.', false),
    
  ('July', 2026, 'Q3', 6300000, 4669779, 4669779, 4560000, 2801867, 1680000, 1401156,
    'The Storm Breaker', 'Lucky 7', 'Logistical Relief and Social Proof to keep studio full when city slows down during peak monsoon',
    'Peak Monsoon month where logistics become primary hurdle. Focus on consistency amidst chaos.', 'Transport relief bundles and long-term lock-ins with forgiveness policies.', false),
    
  ('August', 2026, 'Q3', 7240000, 5369851, 5369851, 6210000, 3221911, 1050000, 1609970,
    'Barre Besties & Vitality', 'Til Death Do Us Squat', 'Peer-to-peer acquisition and community appreciation to drive 70% repeat/30% new revenue mix',
    'Community-focused month leveraging friendship psychology and loyalty rewards.', 'Annual renewals with bestie gifting and social proof mechanisms.', false),
    
  ('September', 2026, 'Q3', 8340000, 6190299, 6190299, 7090000, 3714179, 1250000, 1857896,
    'The Professional''s Peak & Master Educator Series', 'The Insider Deal', 'Honoring expertise through Trainer-led acquisition, team competition, and high-performance results',
    'Teachers'' Day focus with trainer-led referrals and corporate executive packages.', 'Trainer-driven codes and executive flexibility packages with technical mastery focus.', false),
    
  ('October', 2026, 'Q4', 8550000, 6343284, 6343284, 7270000, 3805970, 1280000, 1902985,
    'The Pre-Festive Glow & Vitality', 'Willy Wonka Wellness', 'Aesthetic results, high-velocity toning, and premium gifting ahead of social season',
    'Focus on visible results for upcoming social events and luxury gifting preparation.', 'Short-term unlimited for immediate results and exclusive annual memberships with status symbols.', false),
    
  ('November', 2026, 'Q4', 6300000, 4671642, 4671642, 4850000, 2802985, 1480000, 1402456,
    'The Detox & Deal - Post-Diwali Recovery', 'The Doomsday Prep', 'Combat post-festive slump by gamifying detox while using Black Friday for high-value upfront cash',
    'Post-Diwali recovery with Black Friday revenue injection. High Average Transaction Value focus.', 'Guilt-based detox marketing with massive value Black Friday offers.', false),
    
  ('December', 2026, 'Q4', 5150000, 3820896, 3820896, 3200000, 2292537, 950000, 1146269,
    'Finish Strong - Pre-Resolution Capture', 'Price Lock & Load', 'Fill classes during holiday travel season and lock in 2027 revenue before January rush',
    'Holiday gifting and 2027 revenue pre-capture with founder protection pricing.', 'Gifting solutions and future-proof purchases with early bird discounts.', false);

-- ==========================================
-- INSERT ALL COMPREHENSIVE SALES OFFERS FOR 2026
-- ==========================================

-- Delete existing offers first to ensure clean insert
DELETE FROM sales_offers WHERE year = 2026;

-- JANUARY 2026 - The Resolution Reset
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, notes, is_active, is_cancelled) VALUES
('January', 2026, 'New Member', 'Fresh Start, No Guilt', 'High-volume New Year trial users', '1 Month Unlimited priced significantly lower than standard rate', 'Mumbai: ₹11,999 + 5% VAT = ₹12,599 (22% off standard). Bengaluru: ₹11,999 + 5% VAT = ₹12,599 (14% off standard)', 'Low-friction entry for mass influx of trial users who want a serious start. Captures the resolution energy.', 'Target: Mumbai 60 units, Bengaluru 75 units', true, false),
('January', 2026, 'Hero Offer', 'The Habit Hack', 'Mid-term revenue security seekers', 'Purchase 3 Months Unlimited at rack rate, receive the 4th Month FREE', 'Mumbai: Total value ₹61,000, Offer Price ₹41,429 + 5% VAT = ₹43,500 (₹17,513 savings). Bengaluru: Total value ₹55,600, Offer ₹38,286 + 5% VAT = ₹40,200 (₹15,400 savings)', 'Takes 12 weeks to see true physical transformation. Locks user in for entire First Quarter, preventing February dropoff.', 'Key anchor offer for the month. Target: Mumbai 85 units, Bengaluru 60 units', true, false),
('January', 2026, 'Flash Offer', 'All In ''27', 'Big Budget resolutioners', '25% Flat Discount on Annual Membership for 48 hours only', 'Mumbai: Rack ₹1,65,000, Offer ₹1,17,857 + 5% VAT = ₹1,23,750 (₹41,250 savings). Bengaluru: Rack ₹1,48,800, Offer ₹1,06,285 + 5% VAT = ₹1,11,600 (₹37,200 savings)', 'Captures high-net-worth clients. 25% discount deep enough to make decision immediate for high-value clients.', '48-hour window only, exclusive targeting. Target: Mumbai 25 units, Bengaluru 15 units', true, false);

-- FEBRUARY 2026 - Heart-Health & Valentine's Connection
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, notes, is_active, is_cancelled) VALUES
('February', 2026, 'Hero Offer', 'Partner in Grime', 'New Members & Partners', 'Buy one 1-Month Unlimited, get the second at 50% off for significant other or bestie', 'Mumbai: Rack ₹30,500, Final ₹24,019 (25% total discount). Bengaluru: Rack ₹23,800, Final ₹18,743', 'Reduces friction of starting alone. High social proof and shared accountability.', 'Target: Mumbai 20 bundles, Bengaluru 15 bundles', true, false),
('February', 2026, 'Spot Offer', 'Main Character Energy', 'Lapsed Members & Social Media Leads (Galentine''s demographic)', '14 Days Unlimited + 1 Nutrition Consult + 1 Glow-up Retail Gift', 'Mumbai: ₹9,500 + 5% VAT = ₹9,975. Bengaluru: ₹7,500 + 5% VAT = ₹7,875', 'Targets Galentine''s or single demographic focusing on self-care.', 'Target: Mumbai 25 units, Bengaluru 15 units', true, false),
('February', 2026, 'New Member', 'Love at First Sweat', 'High-end skeptics', '3 Classes for the price of 1 + Free Grip Socks', 'Mumbai: ₹1,500 + VAT = ₹1,575', 'Low entry barrier for high-end skeptics.', null, true, false),
('February', 2026, 'Lapsed Member', 'Ex-ercise Benefits', 'Lapsed members', 'Buy a 10-Class Pack, get 2 extra classes + 1 Month extra validity', 'Mumbai: ₹15,050 + VAT = ₹15,803. Bengaluru: ₹12,500 + VAT = ₹13,125', 'We missed you messaging with added value.', null, true, false),
('February', 2026, 'Occasion Offer', 'Girls Just Wanna Have Buns', 'Groups', 'Book studio for you and 5 friends for private session + Healthy Mimosas & Nibbles', 'Mumbai: ₹35,000. Bengaluru: ₹25,000', 'High-margin Event revenue with zero recurring cost.', null, true, false);

-- MARCH 2026 - The Power of Her
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, notes, is_active, is_cancelled) VALUES
('March', 2026, 'Hero Offer', 'She Means Business', 'Lapsed female members (last visit > 60 days)', '3-Month Unlimited + 3 Private Coaching Sessions + Strength Toolkit (Grip socks & branded water bottle)', 'Mumbai: Rack ₹66,950, Final ₹56,238 (20% discount). Bengaluru: Similar structure', 'Addresses re-entry fear by providing private sessions to correct form before jumping back into classes.', 'Target: Mumbai 10 units, Expected Revenue: ₹562,000', true, false),
('March', 2026, 'New Member', 'Squad Goals Unlocked', 'New Female Leads/Referrals', 'Buy a 12-Class Pack, get 3 additional classes free + Bring a Friend Friday passes for the month', 'Bengaluru: ₹12,500 + 5% VAT = ₹13,125 (maintains price integrity with value add)', 'Volume-led acquisition through community. Maintains price integrity while increasing perceived value.', 'Target: Bengaluru 25 units, Expected Revenue: ₹328,000', true, false),
('March', 2026, 'Spot Offer', 'Corner Office Conditioning', 'Women in partner corporate firms', '20% off Annual Membership for women in partner corporate firms', 'Mumbai: ₹1,92,500 Rack -> ₹1,54,000 + VAT = ₹1,61,700', 'Rewards long-term loyalty and targets corporate demographic.', 'Target: Mumbai 5 units', true, false),
('March', 2026, 'Occasion Offer', 'Brunch, Then Crunch', 'All locations - March 8th Special', '75-minute Masterclass + Wellness Brunch + Gift Bag', '₹3,500 per head (Flat rate)', 'Positions studio as lifestyle brand for Women''s Day celebration.', null, true, false);

-- APRIL 2026 - INFINITE STRENGTH - 8th Anniversary Celebration
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, notes, is_active, is_cancelled) VALUES
('April', 2026, 'Showstopper', 'The Infinity Plan', 'VIP / High-value clients', '8 Months Unlimited + 8 Private Sessions + 8 Guest Passes + Priority Booking + Limited Edition Gold Grip Socks', 'Mumbai: ₹88,000 (Approx value ₹1.3L+). Bengaluru: ₹75,000. Limited to 8 people per location.', 'Velvet Rope psychology. Limiting to 8 people creates massive FOMO while securing large upfront cash.', 'Target: 8 units per location. Mumbai Expected Revenue: ₹704,000, Bengaluru: ₹600,000', true, false),
('April', 2026, 'Nostalgia Offer', 'We Missed Your Face', 'Retention/Lapsed members', 'Purchase 10-Class Pack at 2018 pricing. Valid 48 hours only (April 8th & 9th). Requires social media post.', 'Approximately ₹12,000 (20-30% discount from current rates without devaluing brand)', 'Generates massive user-generated content and rewards loyalty. Brings back lapsed members.', 'Target: Mumbai 50 units, Bengaluru 30 units', true, false),
('April', 2026, 'Gamified Offer', 'The Glow-Up Project', 'All clients (requires active package or drop-in purchase)', '8 Golden Tickets hidden in retail items/studio spots. Find one = 1 Month Free Unlimited', 'Entry via Treasure Hunter Drop-in ₹1,200 or active package', 'Turns studio visits into a game. Drives retail sales and daily visits.', '8 tickets total across all locations', true, false),
('April', 2026, 'Acquisition Offer', 'Eight Is Enough (It''s Not)', 'New Clients Only', '8 Classes for ₹8,888 (Mumbai) / ₹6,888 (Bengaluru). Validity: 8 Weeks', 'Mumbai: ₹8,888. Bengaluru: ₹6,888. Includes complimentary Technique 101 Workshop', 'Breaks standard 10-pack mental model. Catchy price point with habit-building 8-week expiry.', 'Target: Mumbai 100 units, Bengaluru 80 units', true, false),
('April', 2026, 'Grand Gala Event', 'BARRE, BUBBLY & BLING', 'Community Event - April 25th', '75-minute Best of 8 Years class + Champagne + Live DJ + Touch of Gold dress code', '₹2,500 (Members) / ₹3,500 (Non-Members)', 'Positions studio as lifestyle brand. Builds community bonds. Zero-cost marketing activation.', 'Target: Mumbai 150 attendees, Bengaluru 100 attendees', true, false);

-- MAY 2026 - The Summer Sprint - Elite Transformation
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, notes, is_active, is_cancelled) VALUES
('May', 2026, 'Student Offer', 'Broke But Buff', 'Gen-Z Students', '6-Week Unlimited + 1 Bring-a-Friend Permanent Guest Pass (Friend comes free for 1 week)', 'Mumbai: Rack equivalent ₹24,500, Offer ₹17,143 + VAT = ₹18,000. Bengaluru: Rack ₹20,850, Offer ₹11,429 + VAT = ₹12,000', 'Students travel in packs. Turns every buyer into a lead generator.', 'Target: Mumbai 40 units, Bengaluru 50 units', true, false),
('May', 2026, 'Private Training', 'Lunch Break, Make Bank', 'Maximum margin seekers', '5 Private Sessions (12 PM - 4 PM) + 1 Month Studio Unlimited Access included', 'Mumbai: Total value ₹40,000, Offer ₹23,809 + VAT = ₹25,000 (38% off). Bengaluru: Total ₹33,000, Offer ₹18,095 + VAT = ₹19,000 (42% off)', 'Instead of discount, we ''gift'' the membership. Feels like getting the gym for free when buying a coach.', 'Target: Mumbai 20 units, Bengaluru 20 units', true, false),
('May', 2026, 'Hero Offer', 'Hot Girl Summer Prep', 'Results-guaranteed premium clients', '6-Week Intensive + ₹3,000 Retail Voucher (grip socks/athleisure) + 2 Nutrition Deep Dives', 'Mumbai: ₹30,476 + VAT = ₹32,000 (₹6k extras). Bengaluru: ₹22,857 + VAT = ₹24,000 (₹5k extras)', 'Retail voucher makes price ''feel'' lower while clearing stock and driving brand loyalty.', 'Target: Mumbai 30 units, Bengaluru 25 units', true, false);

-- JUNE 2026 - The Monsoon Motivation
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, notes, is_active, is_cancelled) VALUES
('June', 2026, 'New Member', 'Virtual Reality Check', 'New members seeking digital touchpoint', 'Purchase 1-Month Studio Unlimited and get Free 30-min Virtual Private Session', 'Mumbai: ₹15,250 + VAT = ₹16,013 + Virtual Session (₹4,500 value). Bengaluru: ₹13,900 + VAT = ₹14,595 + Virtual Session (₹3,500 value)', 'Bridges gap for rainy days when commuting is difficult. Expert form-checks from home comfort.', 'Target: Mumbai 25 units, Bengaluru 20 units', true, false),
('June', 2026, 'Lapsed Member', 'The Boomerang', 'Dormant users', '5 Classes for fixed price. Valid 30 days only. No extensions.', 'Mumbai: ₹5,238 + VAT = ₹5,500 (~28% savings). Bengaluru: ₹3,810 + VAT = ₹4,000 (~35% savings)', 'Low-risk way to get them back into studio habit. Removes price barrier.', 'Target: Mumbai 35 units, Bengaluru 35 units', true, false),
('June', 2026, 'Hero Activation', 'Rain Check Rejected', 'All members', 'Attend 20 classes in 30 days. Reward: ₹2,000 Credit toward July/August renewal + Finisher Grip-Sock', 'Free challenge with reward credit', 'Gamification creates reason to show up despite weather. Reward ensures next month retention.', 'Challenge runs throughout June, builds attendance momentum', true, false),
('June', 2026, 'Reactive Offer', 'Pour Decisions', 'Social media followers', '10% Off any Class Pack if purchased while actively raining outside (Social Media Flash trigger)', 'Variable discount based on pack chosen', 'Fun, reactive, and builds high engagement on Instagram stories.', 'Triggered by real-time weather conditions, social media activation', true, false);

-- JULY 2026 - The Storm Breaker
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, notes, is_active, is_cancelled) VALUES
('July', 2026, 'New Member', 'Gas Money''s On Us', 'Transport-concerned prospects', 'Purchase 3-Month Unlimited and get ₹1,000 Transport Credit (as direct discount)', 'Mumbai: Rack ₹43,500, Final ₹40,476 + VAT = ₹42,500. Bengaluru: Rack ₹40,200, Final ₹37,333 + VAT = ₹39,200', 'Directly addresses too expensive/difficult to get cab in rain objection.', 'Target: Mumbai 35 units, Bengaluru 25 units', true, false),
('July', 2026, 'Hero Offer', 'Lucky 7', 'Mid-term revenue security', 'Buy 6-Month Unlimited and get 1 Month Free (7 Months Total)', 'Mumbai: 6-Mo ₹85,500 + VAT = ₹89,775 (₹16,000 added value). Bengaluru: 6-Mo ₹78,300 + VAT = ₹82,215 (₹14,000 added value)', 'High perceived value (1 full month free) with zero marginal cost to studio.', 'Target: Mumbai 15 units, Bengaluru 10 units', true, false),
('July', 2026, 'Retention', 'Get Out of Jail Free Card', 'Anxiety-prone members', 'Buy 12-Class Pack and receive 2 Late Cancel Waivers (worth ₹2,000+)', 'Standard pack pricing with valuable waiver addition', 'Reduces anxiety of losing class credit due to traffic jams or sudden downpours.', 'Target: Mumbai 40 units, Bengaluru 30 units', true, false);

-- AUGUST 2026 - Barre Besties & Vitality
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, notes, is_active, is_cancelled) VALUES
('August', 2026, 'New Member', 'Two Can Play at That Gym', 'First-time leads and social media followers', 'Buy One, Gift One introductory pass. Buy 3-class trial for yourself + get second 3-class pass to gift to friend', 'Mumbai: Rack ₹9,000 (for 2 people), Final ₹4,500 (50% discount). Bengaluru: Rack ₹7,200, Final ₹3,800 (47% discount)', 'Leverages social proof. People are 3x more likely to start workout if friend joins. Cuts CAC in half.', null, true, false),
('August', 2026, 'Hero Offer', 'Til Death Do Us Squat', 'High-frequency repeat members', 'Annual renewal/upgrade. 12 months unlimited + 1 Bestie Month gift + 2 additional freeze attempts', 'Mumbai: Rack ₹1,65,000, Final ₹1,35,000 (22% discount). Bengaluru: Rack ₹1,28,000, Final ₹1,05,000 (22% discount)', 'Empowers best advocates to curate community they want to work out with. Gift month has zero cost but high value.', null, true, false),
('August', 2026, 'Lapsed Member', 'Long Time No Squeeze', 'Members inactive for >90 days', '10-Class Pack with double validity (60 days instead of 30) + 2 Guest Passes to bring friend', 'Mumbai: Rack ₹13,500, Final ₹13,000. Bengaluru: Rack ₹11,000, Final ₹10,500', 'Solves social anxiety of returning alone. Extended validity removes monsoon schedule pressure.', 'Target: Mumbai 40 units, Bengaluru 20 units', true, false),
('August', 2026, 'Spot Offer', 'Ride or Die (Literally)', 'Current members and their guests', '20% off all Class Packs (10 and 20 packs only) when purchased in-studio as a pair', 'Mumbai 20-Pack: Rack ₹24,500, Final ₹19,600. Bengaluru 20-Pack: Rack ₹19,500, Final ₹15,600', 'Creates urgency around holiday weekend. High cash-density driver in 72-hour window.', 'Target: Mumbai 30 units, Bengaluru 15 units', true, false);

-- SEPTEMBER 2026 - The Professional's Peak & Master Educator Series
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, notes, is_active, is_cancelled) VALUES
('September', 2026, 'Teachers Day', 'The Insider Deal', 'Existing advocates and their inner circles', 'Each Senior Trainer gets unique Legacy Code. Friends get 20% off first Class Pack, member gets Masterclass Credit if they convert', 'Mumbai: 10-Pack Rack ₹13,500, Code Price ₹11,340. Bengaluru: 10-Pack Rack ₹11,000, Code Price ₹9,240', 'Shifts sales conversation from Front Desk to Trainer-Member relationship. Trainer recommendations carry 5x weight.', 'Target: Mumbai 120 units, Bengaluru 50 units', true, false),
('September', 2026, 'Hero Offer', 'The Business Class Body', 'High-net-worth professionals and long-term retainers', '3 Months Unlimited + 2 Form Correction Private Sessions + 4 additional freeze attempts for business travel', 'Mumbai: Rack ₹53,500, Final ₹46,000 (18% discount). Bengaluru: Rack ₹41,905, Final ₹36,000 (18% discount)', 'Focuses on efficiency and Executive flexibility. Travel flexibility essential for Bandra and Indiranagar demographics.', 'Target: Mumbai 25 units, Bengaluru 12 units', true, false),
('September', 2026, 'New Member', 'Back to Basics, Back to Badass', 'First-time leads seeking sophisticated, science-based workout', '4 Classes + 1 Anatomy & Alignment Studio Workshop led by Master Trainer', 'Mumbai: Rack ₹6,000, Final ₹4,725 (25% discount). Bengaluru: Rack ₹4,800, Final ₹3,780 (25% discount)', 'Positions brand as technical discipline rather than just fitness class.', 'Target: Mumbai 70 units, Bengaluru 30 units', true, false);

-- OCTOBER 2026 - The Pre-Festive Glow & Vitality
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, notes, is_active, is_cancelled) VALUES
('October', 2026, 'New Member', 'The LBD (Little Black Dress) Project', 'Prospects looking for visible results for social events', '4-week unlimited sprint + digital Physique Style & Prep Guide + 2 Guest Passes for final week', 'Mumbai: Rack ₹15,250, Final ₹13,900 (15% discount). Bengaluru: Rack ₹12,000, Final ₹11,000 (13% discount)', 'Positioned as solution to specific social goal. Short-term unlimited has highest conversion when anchored to aesthetic outcome.', 'Target: Mumbai 60 units, Bengaluru 25 units', true, false),
('October', 2026, 'Hero Offer', 'Willy Wonka Wellness', 'High-net-worth members and long-term advocates', 'Annual Membership + 2 additional Private Sessions + Limited Edition P57 Gold Grip Socks', 'Mumbai: Rack ₹1,65,000, Final ₹1,45,000. Bengaluru: Rack ₹1,28,000, Final ₹1,15,000', 'Exclusive swag (Gold Socks) creates status symbol within studio. Annual commitment feels like joining elite club.', 'Target: Mumbai 10 units, Bengaluru 5 units', true, false),
('October', 2026, 'Lapsed Member', 'Gifting is Getting', 'Lapsed members and current monthly payers', 'Buy Studio Gift Card (₹5,000+) for friend, receive 50% off your next month''s membership or 10-class pack', 'Mumbai: Member saves ₹7,625 on 1-Mo. Bengaluru: Member saves ₹6,000 on 1-Mo', 'Leverages gifting season to acquire new leads while rewarding loyalty through generous act.', 'Target: Mumbai 30 units, Bengaluru 15 units', true, false),
('October', 2026, 'New Member', 'The Speed Date', 'Leads hesitant to commit during busy social period', '5-class taster pack valid for only 14 days to ensure high frequency', 'Mumbai: Rack ₹7,500, Final ₹6,000 (20% discount). Bengaluru: Rack ₹6,000, Final ₹4,800 (20% discount)', '14-day expiry forces prep mindset, moving leads through funnel before holiday slump hits.', 'Target: Mumbai 80 units, Bengaluru 40 units', true, false),
('October', 2026, 'Hero Offer', 'The Overachiever', 'All current members', 'Purchase standard 10-Class Pack and receive 2 bonus classes automatically', 'Mumbai: ₹14,175 + VAT (₹3,000 bonus value). Bengaluru: ₹11,550 + VAT (₹2,200 bonus value)', 'Pure volume driver. Increases class density in October to offset potential November dips.', 'Target: Mumbai 100 units, Bengaluru 50 units', true, false);

-- NOVEMBER 2026 - The Detox & Deal - Post-Diwali Recovery
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, notes, is_active, is_cancelled) VALUES
('November', 2026, 'New Member', 'The Morning After Plan', 'Post-Diwali guilt demographic', '2 Weeks of Unlimited Barre for the price of 1 week', 'Mumbai: 1 Week ₹8,500 + VAT = ₹8,925. Bengaluru: 1 Week ₹6,500 + VAT = ₹6,825', 'Low friction after Diwali sweets. Clients crave immediate start without 3-month commitment.', 'Target: Mumbai 40 units, Bengaluru 20 units', true, false),
('November', 2026, 'Lapsed Member', 'Sweet Revenge', 'Guilt-motivated leads', '1 Week Flat Rate Unlimited + 1 Nutrition Detox Consult', 'Mumbai: ₹3,333 + VAT = ₹3,500. Bengaluru: ₹2,381 + VAT = ₹2,500', 'Guilt-based marketing with tangible solution combining Nutrition + Fitness.', 'Target: Mumbai 30 units, Bengaluru 20 units', true, false),
('November', 2026, 'Hero Offer', 'The Doomsday Prep', 'High-value transaction seekers', '50 Class Pack with 24-Month Validity', 'Mumbai: Rack ₹60,000, Final ₹47,250 (25% discount, ₹945/class). Bengaluru: Rack ₹48,000, Final ₹37,800 (25% discount, ₹756/class)', 'High Average Transaction Value. 2-year validity removes too busy objection.', 'Limited quantity creates urgency. 24-month validity is key selling point over discount. Target: Mumbai 15 units, Bengaluru 10 units', true, false);

-- DECEMBER 2026 - Finish Strong - Pre-Resolution Capture
INSERT INTO sales_offers (month, year, offer_type, offer_name, audience, package_mechanics, pricing_breakdown, why_it_works, notes, is_active, is_cancelled) VALUES
('December', 2026, 'Occasion Offer', 'Santa''s Helper Gets Helped', 'High-net-worth gift purchasers', 'Purchase ₹10,000 Gift Card, receive 2 Complimentary Classes for purchaser', 'Fixed value ₹10,000. VAT applicable only on service redemption', 'Solves gifting dilemma for high-net-worth clients while rewarding loyal member.', 'Target: Mumbai 25 units, Bengaluru 15 units', true, false),
('December', 2026, 'Spot Offer', 'Holiday Insurance', 'Travel-conscious buyers', 'Buy any 10 or 20 pack in December, get Double Validity + 2 extra freeze attempts', 'Standard rack rates with valuable extensions', 'Overcomes I am traveling in Dec, I will join in Jan excuse. Makes purchase future-proof.', 'Target: Mumbai 60 units, Bengaluru 40 units. Double validity and extra freezes make it travel-friendly', true, false),
('December', 2026, 'Hero Offer', 'Price Lock & Load', 'Long-term loyalty rewards', 'Lock in Annual Membership at 2025 prices + 10% Early Bird Discount', 'Mumbai: 2025 Rack ₹1,65,000, Final ₹1,55,925 (10% discount). Bengaluru: 2025 Rack ₹1,25,000, Final ₹1,18,125 (10% discount)', 'Rewards long-term loyalty and secures massive cash flow before year end.', 'Early bird discount creates urgency for loyal members. Target: Mumbai 5 units, Bengaluru 5 units', true, false);

-- ==========================================
-- VERIFY DATA WAS INSERTED
-- ==========================================

-- Count monthly target records (should return 12)
SELECT COUNT(*) as total_months FROM monthly_targets WHERE year = 2026;

-- Count sales offers
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
