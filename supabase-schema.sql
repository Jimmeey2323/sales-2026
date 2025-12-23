-- Physique 57 India Sales Plan Database Schema
-- This schema supports the Sales Plan application for FY 2025-26

-- ==========================================
-- DROP EXISTING TABLES (if any)
-- ==========================================

DROP TABLE IF EXISTS offer_performance CASCADE;
DROP TABLE IF EXISTS user_notes CASCADE;
DROP TABLE IF EXISTS actual_revenue CASCADE;
DROP TABLE IF EXISTS sales_offers CASCADE;
DROP TABLE IF EXISTS monthly_targets CASCADE;

-- ==========================================
-- TABLE: sales_offers
-- Stores all sales offers for each month
-- ==========================================

CREATE TABLE sales_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month TEXT NOT NULL,
  year INTEGER NOT NULL DEFAULT 2026,
  offer_type TEXT NOT NULL,
  offer_name TEXT NOT NULL,
  audience TEXT,
  package_mechanics TEXT,
  pricing_breakdown TEXT,
  why_it_works TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  is_cancelled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_sales_offers_month_year ON sales_offers(month, year);
CREATE INDEX IF NOT EXISTS idx_sales_offers_is_active ON sales_offers(is_active);
CREATE INDEX IF NOT EXISTS idx_sales_offers_is_cancelled ON sales_offers(is_cancelled);

-- ==========================================
-- TABLE: monthly_targets
-- Stores revenue targets for each month
-- ==========================================

CREATE TABLE monthly_targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month TEXT NOT NULL,
  year INTEGER NOT NULL DEFAULT 2026,
  quarter TEXT NOT NULL CHECK (quarter IN ('Q1', 'Q2', 'Q3', 'Q4')),
  target_revenue DECIMAL(12, 2) NOT NULL,
  historic_baseline DECIMAL(12, 2) NOT NULL,
  last_year_revenue DECIMAL(12, 2) NOT NULL,
  mumbai_target DECIMAL(12, 2) NOT NULL,
  mumbai_last_year DECIMAL(12, 2) NOT NULL,
  bengaluru_target DECIMAL(12, 2) NOT NULL,
  bengaluru_last_year DECIMAL(12, 2) NOT NULL,
  theme TEXT,
  hero_offer TEXT,
  focus TEXT,
  context TEXT,
  pricing_note TEXT,
  is_anniversary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(month, year)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_monthly_targets_quarter ON monthly_targets(quarter);
CREATE INDEX IF NOT EXISTS idx_monthly_targets_month_year ON monthly_targets(month, year);

-- ==========================================
-- TABLE: actual_revenue
-- Tracks actual revenue achieved each month
-- ==========================================

CREATE TABLE actual_revenue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month TEXT NOT NULL,
  year INTEGER NOT NULL,
  total_revenue DECIMAL(12, 2) NOT NULL,
  mumbai_revenue DECIMAL(12, 2),
  bengaluru_revenue DECIMAL(12, 2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(month, year)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_actual_revenue_month_year ON actual_revenue(month, year);

-- ==========================================
-- TABLE: offer_performance
-- Tracks performance metrics for each offer
-- ==========================================

CREATE TABLE offer_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id UUID REFERENCES sales_offers(id) ON DELETE CASCADE,
  month TEXT NOT NULL,
  year INTEGER NOT NULL,
  units_sold INTEGER DEFAULT 0,
  revenue_generated DECIMAL(12, 2) DEFAULT 0,
  conversion_rate DECIMAL(5, 2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_offer_performance_offer_id ON offer_performance(offer_id);
CREATE INDEX IF NOT EXISTS idx_offer_performance_month_year ON offer_performance(month, year);

-- ==========================================
-- TABLE: user_notes
-- Stores user notes and comments
-- ==========================================

CREATE TABLE user_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month TEXT,
  category TEXT,
  note_text TEXT NOT NULL,
  created_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_notes_month ON user_notes(month);
CREATE INDEX IF NOT EXISTS idx_user_notes_category ON user_notes(category);

-- ==========================================
-- FUNCTION: Update timestamp trigger
-- ==========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables
CREATE TRIGGER update_sales_offers_updated_at
  BEFORE UPDATE ON sales_offers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_monthly_targets_updated_at
  BEFORE UPDATE ON monthly_targets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_actual_revenue_updated_at
  BEFORE UPDATE ON actual_revenue
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_offer_performance_updated_at
  BEFORE UPDATE ON offer_performance
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_notes_updated_at
  BEFORE UPDATE ON user_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- ROW LEVEL SECURITY (RLS) Policies
-- Enable RLS for security
-- ==========================================

ALTER TABLE sales_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE actual_revenue ENABLE ROW LEVEL SECURITY;
ALTER TABLE offer_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;

-- Allow all operations for authenticated users
CREATE POLICY "Enable all operations for authenticated users" ON sales_offers
  FOR ALL USING (true);

CREATE POLICY "Enable all operations for authenticated users" ON monthly_targets
  FOR ALL USING (true);

CREATE POLICY "Enable all operations for authenticated users" ON actual_revenue
  FOR ALL USING (true);

CREATE POLICY "Enable all operations for authenticated users" ON offer_performance
  FOR ALL USING (true);

CREATE POLICY "Enable all operations for authenticated users" ON user_notes
  FOR ALL USING (true);

-- ==========================================
-- SAMPLE DATA INSERTION
-- Insert monthly targets for 2026
-- ==========================================

INSERT INTO monthly_targets (month, year, quarter, target_revenue, historic_baseline, last_year_revenue, 
  mumbai_target, mumbai_last_year, bengaluru_target, bengaluru_last_year, theme, hero_offer, focus, context, pricing_note)
VALUES 
  ('January', 2026, 'Q1', 5200000, 3929116, 3929116, 3120000, 2357470, 1560000, 1178735, 
    'The "Resolution" Lock-In', 'Resolution Bundle (3 Month)', '3-Month Commitments (Quarterly lock-in)', 
    'Organic demand is high. Do NOT discount single months. Sell commitment.', 'No discounts, only Value Adds.'),
    
  ('February', 2026, 'Q1', 5400000, 4136223, 4136223, 3240000, 2481734, 1620000, 1240867,
    'Love & Loyalty', 'Couples/Pairs (2-for-1 style)', 'Referrals & 2-Person Sales',
    'Short month. Motivation dips. Leverage Valentine''s/Pairs.', 'High ticket, lower yield per head but high volume.'),
    
  ('March', 2026, 'Q1', 4600000, 3479117, 3479117, 2760000, 2087470, 1380000, 1043735,
    'March Madness (Fiscal End)', 'Corporate/Bulk Packs', 'Clearing Inventory & Corporate Sales',
    'Corporate budgets expiring. Stressful month for finance professionals.', 'Clear inventory.'),
    
  ('April', 2026, 'Q2', 9400000, 6938682, 6938682, 5640000, 4163209, 2820000, 2081605,
    'THE 8th ANNIVERSARY (GALA MONTH)', 'The Infinite 8 (Annual @ 28% OFF)', 'Annuals, Long-Term Packs, & Celebration',
    'The biggest month of H1. We need excitement, celebration, and aggressive volume.', 'Aggressive 28% Discount on Annuals.'),
    
  ('May', 2026, 'Q2', 5300000, 4044857, 4044857, 3180000, 2426914, 1590000, 1213457,
    'Summer Slim Down', 'Summer Bootcamp', 'Short Term Intensity (Bikini Body)',
    'Post-anniversary hangover + Summer heat.', 'High yield, short duration.'),
    
  ('June', 2026, 'Q2', 5700000, 4312599, 4312599, 3420000, 2587559, 1710000, 1293780,
    'The "Jet Setter" Strategy', 'Travel/Flexibility', 'Online/Hybrid & Validity Extension',
    'Peak travel season. Revenue usually drops. We sell flexibility.', 'Extended validity is the key selling point.'),
    
  ('July', 2026, 'Q3', 6560000, 4932988, 4932988, 3936000, 2959793, 1968000, 1479896,
    'The "Monsoon Proof" Strategy', 'Freezes with 3M Pack', 'Retention & Validity Extension',
    'High rainfall in Mumbai usually dips attendance. We sell "Flexibility" to combat churn.', 'Don''t sell 1M below ₹12k'),
    
  ('August', 2026, 'Q3', 11000000, 8271474, 8271474, 6600000, 4962884, 3300000, 2481442,
    'The Freedom & Vitality Push', 'Annual @ 25% Off', 'Volume Acquisition (Annuals)',
    'Independence Day. High energy. Historic data shows August is a massive revenue month.', 'Don''t extend 25% off to 6M packs'),
    
  ('September', 2026, 'Q3', 6950000, 5220944, 5220944, 4170000, 3132566, 2085000, 1566283,
    'The "Back to Grind" Reset', '3M Bundle + PT', '3-Month Commitments (Close out the year)',
    'Post-summer/monsoon routine setting. Schools are open.', 'PT margins are lower; track trainer payout'),
    
  ('October', 2026, 'Q4', 5630000, 4233809, 4233809, 3378000, 2540285, 1689000, 1270143,
    'The Festive Fit (Pre-Diwali)', '6-Week Bootcamp', 'Speed & Aesthetics (Short-term High Intensity)',
    'Short month effectively. People want to look good for parties but have no time.', 'Don''t allow freezes on Bootcamp'),
    
  ('November', 2026, 'Q4', 5750000, 4316439, 4316439, 3450000, 2589863, 1725000, 1294932,
    'Black Friday & Detox', 'B6G1 Free', 'High Ticket Sales (Black Friday)',
    'Post-festival guilt + Global Shopping Event.', 'Ensure validity is strictly enforced'),
    
  ('December', 2026, 'Q4', 4000000, 3004057, 3004057, 2400000, 1802434, 1200000, 901217,
    'The "Finish Strong" & Pre-Resolution', 'Pay 2027 Get Dec Free', 'Cash Flow for Q1 2027',
    'Lowest attendance, but highest potential for "Future Revenue".', 'Don''t spend the cash; accrue for Q1')
ON CONFLICT (month, year) DO NOTHING;

-- ==========================================
-- UTILITY VIEWS
-- Create helpful views for reporting
-- ==========================================

-- View: Quarterly summary
CREATE OR REPLACE VIEW quarterly_summary AS
SELECT 
  quarter,
  year,
  COUNT(DISTINCT month) as month_count,
  SUM(target_revenue) as total_target,
  SUM(historic_baseline) as total_baseline,
  SUM(mumbai_target) as mumbai_total,
  SUM(bengaluru_target) as bengaluru_total,
  ROUND(((SUM(target_revenue) - SUM(historic_baseline)) / SUM(historic_baseline) * 100), 2) as growth_percentage
FROM monthly_targets
GROUP BY quarter, year
ORDER BY year, quarter;

-- View: Active offers summary
CREATE OR REPLACE VIEW active_offers_summary AS
SELECT 
  month,
  year,
  COUNT(*) as total_offers,
  COUNT(CASE WHEN is_cancelled = false THEN 1 END) as active_offers,
  COUNT(CASE WHEN is_cancelled = true THEN 1 END) as cancelled_offers,
  COUNT(CASE WHEN notes IS NOT NULL THEN 1 END) as offers_with_notes
FROM sales_offers
WHERE is_active = true
GROUP BY month, year
ORDER BY year, month;

-- ==========================================
-- FUNCTIONS FOR ANALYTICS
-- ==========================================

-- Function: Get monthly performance
CREATE OR REPLACE FUNCTION get_monthly_performance(p_month TEXT, p_year INTEGER)
RETURNS TABLE (
  target DECIMAL,
  actual DECIMAL,
  variance DECIMAL,
  variance_percentage DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    mt.target_revenue,
    COALESCE(ar.total_revenue, 0) as actual,
    COALESCE(ar.total_revenue, 0) - mt.target_revenue as variance,
    CASE 
      WHEN mt.target_revenue > 0 THEN 
        ROUND(((COALESCE(ar.total_revenue, 0) - mt.target_revenue) / mt.target_revenue * 100), 2)
      ELSE 0 
    END as variance_percentage
  FROM monthly_targets mt
  LEFT JOIN actual_revenue ar ON mt.month = ar.month AND mt.year = ar.year
  WHERE mt.month = p_month AND mt.year = p_year;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- COMMENTS FOR DOCUMENTATION
-- ==========================================

COMMENT ON TABLE sales_offers IS 'Stores all sales offers/packages for each month';
COMMENT ON TABLE monthly_targets IS 'Monthly revenue targets and strategic information';
COMMENT ON TABLE actual_revenue IS 'Actual revenue achieved per month for tracking performance';
COMMENT ON TABLE offer_performance IS 'Performance metrics for individual offers';
COMMENT ON TABLE user_notes IS 'User-generated notes and comments';

-- ==========================================
-- END OF SCHEMA
-- ==========================================

-- To use this schema:
-- 1. Copy this entire script
-- 2. Go to your Supabase project dashboard
-- 3. Navigate to SQL Editor
-- 4. Paste and run this script
-- 5. The tables, indexes, and policies will be created automatically
