# AI Features Database Migration Guide

## Overview
This migration adds two new tables to support AI-powered features:
1. **ai_summaries** - Stores AI-generated monthly strategic summaries
2. **ai_generated_offers** - Stores AI-created offer suggestions

## Running the Migration

### Option 1: Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy and paste the contents of `supabase-ai-summaries-migration.sql`
5. Click **Run** to execute the migration

### Option 2: Supabase CLI
```bash
# Make sure you're logged in to Supabase
supabase login

# Link your project (if not already linked)
supabase link --project-ref YOUR_PROJECT_REF

# Run the migration
supabase db push
```

### Option 3: psql Command Line
```bash
psql "postgresql://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]" -f supabase-ai-summaries-migration.sql
```

## What This Migration Does

### Table: ai_summaries
Stores AI-generated monthly strategic analysis with the following columns:
- `id` - UUID primary key
- `month` - TEXT (e.g., "January", "February")
- `year` - INTEGER (default 2026)
- `summary` - TEXT (the full AI-generated strategic analysis)
- `created_at` - Timestamp when first created
- `updated_at` - Timestamp when last updated
- **Unique constraint** on (month, year) - ensures one summary per month

### Table: ai_generated_offers
Stores AI-created offer suggestions with the following columns:
- `id` - UUID primary key
- `month` - TEXT
- `year` - INTEGER (default 2026)
- `offer_type` - TEXT (e.g., "Corporate Wellness Partnership")
- `offer_name` - TEXT (e.g., "Corporate Vitality Challenge - January")
- `audience` - TEXT (target audience description)
- `package_mechanics` - TEXT (how the offer works)
- `pricing_breakdown` - TEXT (detailed pricing information)
- `why_it_works` - TEXT (psychological/business rationale)
- `ai_reasoning` - TEXT (why AI chose this specific offer)
- `is_implemented` - BOOLEAN (whether user added it to actual offers)
- `created_at` - Timestamp when first created
- `updated_at` - Timestamp when last updated

## Features Enabled

### 1. Persistent AI Summaries
- **Before**: AI summaries regenerated every time you visit a month
- **After**: AI summaries saved permanently, only regenerate on demand
- **Benefit**: Faster page loads, consistent analysis, edit/refine capability

### 2. AI Offer Generator
- **What**: Click "Generate Creative Offer" to let AI create a strategic offer
- **How**: AI analyzes current offers, targets, last year's performance, and month theme
- **Output**: Complete offer with name, mechanics, pricing, psychology, and reasoning
- **Action**: Review and add to your offers or regenerate for different options

## Verification

After running the migration, verify the tables were created:

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('ai_summaries', 'ai_generated_offers');

-- Check ai_summaries structure
\d ai_summaries

-- Check ai_generated_offers structure
\d ai_generated_offers
```

Expected output: Both tables should appear in the list.

## Rollback (if needed)

If you need to undo this migration:

```sql
DROP TABLE IF EXISTS ai_generated_offers CASCADE;
DROP TABLE IF EXISTS ai_summaries CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
```

## Row-Level Security (Optional)

If you want to add RLS policies for security:

```sql
-- Enable RLS
ALTER TABLE ai_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generated_offers ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read
CREATE POLICY "Allow read access to all authenticated users" ON ai_summaries
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow read access to all authenticated users" ON ai_generated_offers
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow all authenticated users to insert/update
CREATE POLICY "Allow insert/update to authenticated users" ON ai_summaries
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow insert/update to authenticated users" ON ai_generated_offers
  FOR ALL USING (auth.role() = 'authenticated');
```

## Troubleshooting

### Error: "relation already exists"
- The tables have already been created. Check if they contain data:
  ```sql
  SELECT COUNT(*) FROM ai_summaries;
  SELECT COUNT(*) FROM ai_generated_offers;
  ```

### Error: "function update_updated_at_column already exists"
- This is safe to ignore, or drop and recreate:
  ```sql
  DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
  -- Then re-run the CREATE FUNCTION part of the migration
  ```

### Tables created but AI features not working
1. Check browser console for errors
2. Verify Supabase connection in `.env` file
3. Check network tab for failed API calls
4. Ensure CORS is enabled in Supabase settings

## Next Steps

After successful migration:
1. ✅ AI summaries will now persist across sessions
2. ✅ Use "Regenerate" button to refresh analysis with latest data
3. ✅ Click "Generate Creative Offer" to create AI-powered offers
4. ✅ Review AI reasoning before adding offers to your plan
5. ✅ All generated content saved for future reference

## Support

If you encounter issues:
- Check Supabase logs for database errors
- Verify all environment variables are set correctly
- Ensure your Supabase project has sufficient resources
- Review browser console for client-side errors
