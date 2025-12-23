# Physique 57 India - Sales Plan Database Setup

This document provides instructions for setting up the Supabase database for the Physique 57 India Sales Plan application.

## Prerequisites

- A Supabase account (free tier works fine)
- Access to the Supabase project dashboard

## Database Setup Instructions

### Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create a new account
3. Create a new project
4. Note down your project URL and anon key

### Step 2: Update Environment Variables

The application is already configured to use Supabase. The connection details are in:
- `src/lib/supabase.ts`

Update the file if you're using your own Supabase project:
```typescript
const supabaseUrl = 'YOUR_PROJECT_URL';
const supabaseKey = 'YOUR_ANON_KEY';
```

### Step 3: Run the Database Schema

1. Open your Supabase project dashboard
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Open the `supabase-schema.sql` file in this project
5. Copy the entire contents
6. Paste into the SQL Editor
7. Click **Run** (or press Cmd/Ctrl + Enter)

This will create:
- All necessary tables (sales_offers, monthly_targets, actual_revenue, etc.)
- Indexes for performance
- Row Level Security policies
- Triggers for timestamp updates
- Sample monthly target data for 2026
- Utility views and functions

### Step 4: Verify Setup

After running the schema, verify the tables were created:

1. Go to **Table Editor** in the Supabase dashboard
2. You should see the following tables:
   - `sales_offers`
   - `monthly_targets`
   - `actual_revenue`
   - `offer_performance`
   - `user_notes`

3. Click on `monthly_targets` to verify sample data was inserted (should have 12 months)

## Database Schema Overview

### Tables

#### sales_offers
Stores all sales offers/packages for each month.

**Key Columns:**
- `id`: Unique identifier (UUID)
- `month`: Month name (e.g., "January", "February")
- `year`: Year (default 2026)
- `offer_type`: Type of offer (New Member, Lapsed, Upsell, etc.)
- `offer_name`: Name of the offer
- `package_mechanics`: Description of what's included
- `pricing_breakdown`: Pricing details
- `why_it_works`: Rationale for the offer
- `notes`: Custom notes
- `is_cancelled`: Whether the offer is marked as cancelled
- `is_active`: Soft delete flag

#### monthly_targets
Stores revenue targets and strategic information for each month.

**Key Columns:**
- `month`: Month name
- `year`: Year
- `quarter`: Quarter (Q1, Q2, Q3, Q4)
- `target_revenue`: Revenue target for the month
- `historic_baseline`: Previous year baseline
- `mumbai_target`: Mumbai-specific target
- `bengaluru_target`: Bengaluru-specific target
- `theme`: Monthly theme
- `hero_offer`: Main offer for the month

#### actual_revenue
Tracks actual revenue achieved (for performance tracking).

#### offer_performance
Tracks performance metrics for individual offers.

#### user_notes
Stores user-generated notes and comments.

## Features

### Automatic Timestamp Updates
All tables have `created_at` and `updated_at` timestamps that are automatically managed.

### Row Level Security (RLS)
All tables have RLS enabled with policies allowing full access to authenticated users. You can customize these policies as needed.

### Utility Views

- **quarterly_summary**: Aggregated quarterly data
- **active_offers_summary**: Summary of active vs cancelled offers

### Functions

- **get_monthly_performance()**: Returns performance metrics for a specific month

## Initial Data

The schema includes sample data for all 12 months of 2026, including:
- Revenue targets
- Location-specific targets
- Quarterly breakdown
- Strategic themes and focus areas
- Last year comparison data

## Application Integration

The application automatically:
1. Connects to Supabase on startup
2. Loads offers from the database
3. Falls back to static data if database is unavailable
4. Syncs all changes (add, edit, delete, notes, cancelled status) to Supabase
5. Works offline with local state management

## Querying Data

### Get all offers for a specific month
```sql
SELECT * FROM sales_offers 
WHERE month = 'January' 
  AND year = 2026 
  AND is_active = true
ORDER BY created_at;
```

### Get quarterly summary
```sql
SELECT * FROM quarterly_summary 
WHERE year = 2026;
```

### Check monthly performance
```sql
SELECT * FROM get_monthly_performance('January', 2026);
```

### Get all cancelled offers
```sql
SELECT * FROM sales_offers 
WHERE is_cancelled = true 
  AND is_active = true
ORDER BY month, offer_name;
```

## Backup and Restore

### Backup
You can export data from Supabase:
1. Go to **SQL Editor**
2. Run: `COPY sales_offers TO '/path/to/backup.csv' CSV HEADER;`
3. Or use Supabase's built-in backup features

### Restore
To restore from a backup:
1. Upload your CSV file
2. Use Supabase's import functionality or SQL INSERT statements

## Security Notes

1. **RLS Policies**: Currently set to allow all operations. For production, implement proper user authentication and role-based access.

2. **API Keys**: Never commit your Supabase keys to public repositories. Use environment variables:
   ```
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   ```

3. **Data Validation**: The schema includes basic constraints. Consider adding more validation in your application layer.

## Troubleshooting

### Connection Issues
- Verify your Supabase URL and anon key
- Check that your Supabase project is active
- Ensure RLS policies are correctly configured

### Data Not Showing
- Check browser console for errors
- Verify data exists in Supabase Table Editor
- Confirm `is_active = true` for offers

### Permission Errors
- Review RLS policies in Supabase dashboard
- Ensure policies allow the operation you're trying to perform

## Support

For issues or questions:
1. Check Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)
2. Review the application code in `src/hooks/useOffers.ts`
3. Check database logs in Supabase dashboard

## Next Steps

After setup, you can:
1. Start the application: `npm run dev`
2. Create new offers through the UI
3. Mark offers as cancelled
4. Add notes to offers
5. Track performance metrics
6. Export reports

All changes will be automatically synced to your Supabase database!
