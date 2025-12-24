-- Migration to add AI summaries and generated offers tables
-- Run this after the main schema

-- ==========================================
-- TABLE: ai_summaries
-- Stores AI-generated monthly strategic summaries
-- ==========================================

CREATE TABLE IF NOT EXISTS ai_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month TEXT NOT NULL,
  year INTEGER NOT NULL DEFAULT 2026,
  summary TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(month, year)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_ai_summaries_month_year ON ai_summaries(month, year);

-- ==========================================
-- TABLE: ai_generated_offers
-- Stores AI-generated offer suggestions
-- ==========================================

CREATE TABLE IF NOT EXISTS ai_generated_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month TEXT NOT NULL,
  year INTEGER NOT NULL DEFAULT 2026,
  offer_type TEXT NOT NULL,
  offer_name TEXT NOT NULL,
  audience TEXT,
  package_mechanics TEXT,
  pricing_breakdown TEXT,
  why_it_works TEXT,
  ai_reasoning TEXT, -- Explanation of why AI chose this offer
  is_implemented BOOLEAN DEFAULT FALSE, -- Whether user added it to actual offers
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_ai_generated_offers_month_year ON ai_generated_offers(month, year);
CREATE INDEX IF NOT EXISTS idx_ai_generated_offers_is_implemented ON ai_generated_offers(is_implemented);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ai_summaries_updated_at BEFORE UPDATE ON ai_summaries
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_generated_offers_updated_at BEFORE UPDATE ON ai_generated_offers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
