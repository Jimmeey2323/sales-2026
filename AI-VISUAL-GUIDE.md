# 🎨 AI Features - Visual Guide

## Feature Locations & UI Elements

### 1. AI-Enhanced Offer Cards

**Location:** Any offer card in monthly sections

**Visual Elements:**
```
┌─────────────────────────────────────────────┐
│  Offer Card (Expanded)                      │
├─────────────────────────────────────────────┤
│  ✨ Enhance with AI                         │
│  [Purple Gradient Banner]                   │
│  "Get detailed insights & recommendations"  │
│  [Enhance Button] ←── Click here            │
├─────────────────────────────────────────────┤
│  Package / Mechanics                        │
│  [Enhanced multi-line content]              │
├─────────────────────────────────────────────┤
│  Pricing Breakdown                          │
│  [ROI analysis, value breakdown]            │
├─────────────────────────────────────────────┤
│  Why It Works                               │
│  [Psychology, positioning, impact]          │
└─────────────────────────────────────────────┘
```

**Color Scheme:**
- Banner: `from-primary/10 via-primary/5`
- Border: `border-primary/20`
- Button: `from-primary to-primary/80` gradient
- Icon: Sparkles ✨ in purple

---

### 2. AI Strategic Analysis

**Location:** Below month header in each monthly section

**Visual States:**

**Before Generation:**
```
┌─────────────────────────────────────────────┐
│  ✨ AI Strategic Analysis        [Beta]    │
│  "Get intelligent insights for April"       │
│                                             │
│  [⚡ Generate Analysis]                     │
└─────────────────────────────────────────────┘
```

**Loading State:**
```
┌─────────────────────────────────────────────┐
│  ⟳ AI is analyzing April strategy...       │
└─────────────────────────────────────────────┘
```

**After Generation (Collapsed):**
```
┌─────────────────────────────────────────────┐
│  ✨ AI Strategic Analysis        [Ready]   │
│  "Click to view detailed AI insights"       │
│  [Regenerate]                          ▼    │
└─────────────────────────────────────────────┘
```

**After Generation (Expanded):**
```
┌─────────────────────────────────────────────┐
│  ✨ AI Strategic Analysis        [Ready]   │
│  "Click to collapse"                        │
│  [Regenerate]                          ▲    │
├─────────────────────────────────────────────┤
│                                             │
│  AI STRATEGIC ANALYSIS - April 2026         │
│                                             │
│  MARKET CONTEXT:                            │
│  [Detailed paragraph about market...]       │
│                                             │
│  REVENUE STRATEGY:                          │
│  [Target breakdown and rationale...]        │
│                                             │
│  OFFER PORTFOLIO ANALYSIS:                  │
│  [Segment-by-segment analysis...]           │
│                                             │
│  STRATEGIC PILLARS:                         │
│  🎯 Acquisition: ...                        │
│  💎 Retention: ...                          │
│  📈 Upsell: ...                             │
│  ✨ Innovation: ...                         │
│                                             │
│  EXECUTION RECOMMENDATIONS:                 │
│  [Week-by-week action plan...]              │
│                                             │
│  EXPECTED OUTCOMES:                         │
│  [Metrics and projections...]               │
│                                             │
│  RISK MITIGATION:                           │
│  [Potential issues and solutions...]        │
│                                             │
└─────────────────────────────────────────────┘
```

**Color Scheme:**
- Background: `from-primary/10 via-primary/5`
- Border: `border-primary/20`
- Icon container: `from-primary to-primary/80` with pulse
- Beta badge: `from-amber-500 to-orange-500`
- Ready badge: `from-green-500 to-emerald-500`

---

### 3. Advanced PDF Export Modal

**Trigger:** Purple "Export PDF" floating action button (bottom right)

**Modal Layout:**
```
┌─────────────────────────────────────────────┐
│  📄 Advanced PDF Export           [Pro] ✕  │
│  "Customize your PDF export with            │
│   professional A4 formatting"               │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ ✨ AI-Enhanced Export              │   │
│  │ PDF includes AI-generated strategic │   │
│  │ analysis and insights               │   │
│  └─────────────────────────────────────┘   │
│                                             │
├─────────────────────────────────────────────┤
│  ⚙️ INCLUDE SECTIONS                       │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Executive Summary              [⚫] │   │
│  │ High-level overview & key metrics   │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Monthly Strategic Plans        [⚫] │   │
│  │ Detailed breakdown for each month   │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Offer Details                  [⚫] │   │
│  │ Complete mechanics and pricing      │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Location Breakdown             [⚫] │   │
│  │ Mumbai vs. Bengaluru performance    │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Risk Assessment                [⚫] │   │
│  │ Potential challenges & mitigation   │   │
│  └─────────────────────────────────────┘   │
│                                             │
├─────────────────────────────────────────────┤
│  ✨ EXPORT QUALITY                         │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Image Quality              2x       │   │
│  │ ●───────○───────────●              │   │
│  │ 1x      2x          3x              │   │
│  │ Higher quality = larger file sizes  │   │
│  └─────────────────────────────────────┘   │
│                                             │
├─────────────────────────────────────────────┤
│  [  📥 Generate PDF  ]     [ Cancel ]      │
│                                             │
│  📄 Format: A4 (210×297mm)                 │
│  Output: physique57-plan-2025-01-15.pdf    │
└─────────────────────────────────────────────┘
```

**Interactive Elements:**
- Toggle switches: Click to enable/disable sections
- Quality slider: Drag to adjust 1x-3x
- Generate button: Purple gradient with hover lift
- Cancel button: Gray muted background

**Color Scheme:**
- Header icon: `from-primary to-primary/80` gradient
- Pro badge: `from-amber-500 to-orange-500`
- AI notice: `from-primary/10` background, `border-primary/20`
- Section cards: `bg-foreground/5` hover to `bg-foreground/10`
- Quality card: `bg-foreground/5`
- Generate button: `from-primary to-primary/80` gradient

---

## User Journey Flows

### Flow 1: Enhance an Offer
```
Start → Click Offer Card 
     → Card Expands 
     → See "Enhance with AI" Banner
     → Click "Enhance" Button
     → Loading (2s with shimmer)
     → Toast: "✨ AI Enhancement Complete"
     → Enhanced Content Displays
     → Scroll to Read Improvements
```

### Flow 2: View Monthly AI Analysis
```
Start → Scroll to Month Section
     → See AI Analysis Box
     → Click "Generate Analysis" (or auto-generates)
     → Loading (1.5s)
     → Analysis Box Turns Green "Ready"
     → Click Box to Expand
     → Read Full Strategic Analysis
     → Click "Regenerate" if Needed
```

### Flow 3: Export PDF
```
Start → Click "Export PDF" FAB (bottom right)
     → Modal Opens
     → Toggle Sections On/Off
     → Adjust Quality Slider
     → Click "Generate PDF"
     → Loading (1-3s)
     → PDF Downloads Automatically
     → Open PDF to View
```

---

## Keyboard Shortcuts (Future Enhancement)

Suggested shortcuts for power users:
- `E` - Enhance current offer with AI
- `G` - Generate AI analysis for current month
- `P` - Open PDF export modal
- `Shift + P` - Quick export with default settings
- `Esc` - Close modals

---

## Accessibility Features

### Current:
- ✅ Semantic HTML structure
- ✅ ARIA labels on buttons
- ✅ Keyboard navigation support
- ✅ Focus indicators on interactive elements
- ✅ Color contrast meets WCAG AA standards

### Future Enhancements:
- Screen reader announcements for AI loading states
- Keyboard shortcuts for AI actions
- High contrast mode support
- Reduced motion preferences

---

## Responsive Behavior

### Desktop (1920px+):
- Full modal width with comfortable padding
- AI summary expands to full content width
- PDF options in single column layout

### Tablet (768px - 1919px):
- Modals scale to 90% viewport width
- AI summary maintains readability
- PDF toggles stack nicely

### Mobile (< 768px):
- Full-screen modals
- AI summary collapses by default
- PDF options in vertical stack
- Touch-optimized buttons (min 44px height)

---

## Animation Timing

All animations follow consistent timing:
- **Fade in:** 200ms ease-out
- **Slide:** 300ms ease-in-out
- **Scale/Lift:** 200ms ease-out
- **Shimmer:** 2s infinite linear
- **Pulse:** 3s infinite ease-in-out
- **Loading Spinner:** 1s infinite linear

---

## Icon Usage

- ✨ **Sparkles** - AI features, enhancement, magic
- 📄 **File** - PDF, documents, exports
- ⚙️ **Settings** - Configuration, options
- ⚡ **Zap** - Quick actions, generate
- 📥 **Download** - Export, save
- ✅ **Check** - Success, confirmed
- 🎯 **Target** - Goals, metrics
- 💎 **Diamond** - Premium, retention
- 📈 **Trending Up** - Growth, upsell
- ⟳ **Loader** - Processing, loading

---

**Last Updated:** $(date)
**Version:** 1.0.0
