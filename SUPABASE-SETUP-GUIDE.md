# 🚀 Supabase Setup & Data Sync Guide

This guide will help you sync all your data to Supabase and ensure your app uses the database as the single source of truth.

## ✅ What We've Changed

### 1. **Data Storage**
- **Before**: Data stored in local TypeScript file (`salesData.ts`) and localStorage
- **After**: All data stored in Supabase PostgreSQL database
- **Result**: Changes are now permanent and synced across all users

### 2. **App Architecture**
- Created `useMonthlyData` hook to fetch monthly targets from Supabase
- Updated `useOffers` hook to:
  - Fetch offers from Supabase only (no fallbacks)
  - All CRUD operations (create, update, delete) sync directly to database
  - Removed localStorage fallbacks
  - Better error handling

### 3. **Database Tables**
- `monthly_targets` - Stores revenue targets and monthly themes
- `sales_offers` - Stores all offers with full CRUD support

---

## 📋 Step-by-Step Setup Instructions

### Step 1: Access Supabase SQL Editor

1. Open your Supabase dashboard: https://fjjszvvhgrkycviqftdg.databasepad.com
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**

### Step 2: Run the Data Migration Script

1. Open the file: `supabase-data-migration.sql`
2. Copy **ALL** the contents (Cmd+A, then Cmd+C)
3. Paste into the SQL Editor in Supabase
4. Click **Run** (or press Cmd + Enter)

### Step 3: Verify the Data

After running the script, you should see these results at the bottom:

```
✅ total_months: 12
✅ total_offers: 60
✅ List of all 12 months with targets
✅ Offer count per month (5 offers each)
```

### Step 4: Check Tables in Supabase

1. Go to **Table Editor** in Supabase sidebar
2. Click on `monthly_targets` - should show 12 rows
3. Click on `sales_offers` - should show 60 rows

### Step 5: Test Your App

1. Refresh your application
2. You should now see:
   - All 12 months loaded from database
   - All 60 offers (5 per month) loaded from database
   - Any changes you make will be saved to Supabase permanently

---

## 🔧 What the Migration Script Does

### Clears Existing Data
```sql
DELETE FROM monthly_targets WHERE year = 2026;
DELETE FROM sales_offers WHERE year = 2026;
```

### Inserts Monthly Targets
- 12 months of revenue targets
- Location breakdowns (Mumbai/Bengaluru)
- Themes, hero offers, contexts, pricing notes
- Quarter and anniversary flags

### Inserts All Offers
- 60 total offers (5 per month × 12 months)
- All offer types: New Member, Lapsed, Upsell, Innovative
- Complete details: mechanics, pricing, audience, rationale

---

## ✨ How Data Syncing Works Now

### When You Add an Offer:
1. App sends INSERT to Supabase
2. Supabase saves it permanently
3. App updates local state with the new offer
4. **If error**: User sees error message (no silent failures)

### When You Edit an Offer:
1. App sends UPDATE to Supabase
2. Supabase updates the record
3. App updates local state
4. **If error**: User sees error message, data not changed

### When You Delete an Offer:
1. App sends soft delete (sets `is_active = false`)
2. Offer hidden from view but not permanently deleted
3. Can be recovered if needed

### When You Add Notes or Cancel Offers:
1. App sends UPDATE to Supabase
2. Changes persist permanently
3. Visible to all users immediately

---

## 🔍 Troubleshooting

### Problem: "No monthly targets found"
**Solution**: Run the migration script in Supabase SQL Editor

### Problem: "Failed to load offers from database"
**Solution**: 
1. Check Supabase connection in `src/lib/supabase.ts`
2. Verify tables exist in Table Editor
3. Check browser console for specific errors

### Problem: Offers showing but no monthly data
**Solution**: 
1. Check `monthly_targets` table has 12 rows
2. Run just the monthly targets INSERT section from migration script

### Problem: Changes not saving
**Solution**:
1. Check browser console for errors
2. Verify Row Level Security policies are enabled
3. Check network tab in browser dev tools

---

## 📊 Database Schema Summary

### `monthly_targets` Table
- Stores monthly revenue targets
- Location splits (Mumbai/Bengaluru)
- Strategic information (theme, focus, context)
- 12 rows for FY 2025-26

### `sales_offers` Table
- Stores all sales offers
- Fields: offer_type, offer_name, audience, mechanics, pricing, rationale
- Soft delete support (is_active flag)
- Cancellation tracking (is_cancelled flag)
- Notes support for custom annotations

---

## 🎯 Next Steps

1. ✅ Run the migration script
2. ✅ Verify data in Supabase Table Editor
3. ✅ Refresh your app
4. ✅ Test adding/editing/deleting an offer
5. ✅ Confirm changes persist after page refresh

---

## 📝 Important Notes

- **No more localStorage**: App no longer uses browser storage
- **No more static fallbacks**: All data comes from Supabase
- **Better error handling**: Users see clear error messages
- **Permanent changes**: All CRUD operations persist to database
- **Real-time sync**: Changes visible immediately across all users

---

## 🆘 Need Help?

If you encounter issues:
1. Check browser console for error messages
2. Verify Supabase connection details in `src/lib/supabase.ts`
3. Ensure tables were created by running the schema script first
4. Check that migration script ran successfully

---

## 📁 Modified Files

- ✅ `supabase-data-migration.sql` - Complete data migration
- ✅ `src/hooks/useOffers.ts` - Supabase-only data fetching
- ✅ `src/hooks/useMonthlyData.ts` - NEW: Monthly targets hook
- ✅ `src/components/AppLayout.tsx` - Uses new hooks

**Your app is now fully integrated with Supabase! 🎉**
