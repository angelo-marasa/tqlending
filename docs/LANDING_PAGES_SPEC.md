# TQ Lending - Landing Pages Specification

> Source: ClickUp task spec + Bill's wireframe intent (repo private/unavailable)
> Last updated: 2026-03-20

---

## Pages Overview

| Route | Purpose | Traffic Source |
|-------|---------|---------------|
| `/` | DSCR Loans primary landing page | Google Ads (DSCR campaigns) + Meta |
| `/str` | STR / Airbnb Loans landing page | Google Ads (STR campaigns) |
| `/qualify` | 7-step survey-style lead funnel | All CTAs route here |
| `/qualify` (success state) | Confirmation + conversion pixel firing | Post-submission |

All CTAs across every page funnel users to `/qualify`. There is one primary CTA per section: **"Get My Free Deal Analysis"** (with arrow). Phone number appears as inline text, never as a competing button.

---

## 7-Step Lead Funnel (`/qualify`)

Each step auto-advances on selection unless noted. The funnel should feel fast, mobile-first, and low-friction.

### Step 1: Investment Goal (auto-advance)

| Value | Label |
|-------|-------|
| `purchase` | Purchase |
| `refinance` | Refinance |
| `brrrr` | BRRRR |
| `str` | Short-Term Rental |
| `other` | Other |

### Step 2: Property Type (auto-advance)

| Value | Label |
|-------|-------|
| `sfr` | Single Family |
| `multi_small` | Multi-Family (2-4 units) |
| `multi_large` | Multi-Family (5+ units) |
| `condo` | Condo |
| `mixed_use` | Mixed Use |
| `unsure` | Not Sure Yet |

### Step 3: State (Next button)

- Dropdown or searchable list of all 50 US states
- **7 priority states pinned to top** (exact list TBD from Bill's wireframe, likely: FL, TX, CA, GA, NC, AZ, TN or similar high-volume DSCR markets)
- User selects state, then clicks "Next" to proceed

### Step 4: Deal Size (auto-advance)

| Value | Label |
|-------|-------|
| `250_400` | $250K - $400K |
| `400_600` | $400K - $600K |
| `600_1m` | $600K - $1M |
| `1m_2m` | $1M - $2M |
| `2m_plus` | $2M+ |

### Step 5: Down Payment (auto-advance)

| Value | Label |
|-------|-------|
| `15_20` | 15% - 20% |
| `20_25` | 20% - 25% |
| `25_30` | 25% - 30% |
| `30_plus` | 30%+ |
| `unsure` | Not Sure Yet |

### Step 6: Timeline + Entity + Credit Score (Next button)

Three fields on one screen:

**Timeline**

| Value | Label |
|-------|-------|
| `asap` | ASAP / Under Contract |
| `30_days` | Within 30 Days |
| `60_days` | Within 60 Days |
| `exploring` | Just Exploring |

**Entity**

| Value | Label |
|-------|-------|
| `llc` | LLC |
| `corp` | Corporation |
| `trust` | Trust |
| `individual` | Individual |
| `forming` | Forming One Soon |

**Credit Score**

| Value | Label |
|-------|-------|
| `760_plus` | 760+ |
| `700_759` | 700 - 759 |
| `660_699` | 660 - 699 |
| `below_660` | Below 660 |
| `unsure` | Not Sure |

### Step 7: Contact Info (Submit button)

| Field | Type | Required |
|-------|------|----------|
| `first_name` | text | yes |
| `last_name` | text | yes |
| `email` | email | yes |
| `phone` | tel | yes |

Hidden/automatic fields captured on submit:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `gclid`
- `fbclid`
- `landing_page` (the page URL where the user entered)
- `referrer`
- `device` (mobile/desktop/tablet)
- `timestamp`

---

## Follow-Up Boss Payload Schema

```json
{
  "source": "TQ Lending Website",
  "type": "DSCR Loan Inquiry",
  "person": {
    "firstName": "{{first_name}}",
    "lastName": "{{last_name}}",
    "emails": [
      { "value": "{{email}}", "type": "primary" }
    ],
    "phones": [
      { "value": "{{phone}}", "type": "mobile" }
    ]
  },
  "customFields": {
    "investmentGoal": "{{investment_goal}}",
    "propertyType": "{{property_type}}",
    "state": "{{state}}",
    "dealSize": "{{deal_size}}",
    "downPayment": "{{down_payment}}",
    "timeline": "{{timeline}}",
    "entityType": "{{entity_type}}",
    "creditScore": "{{credit_score}}"
  },
  "tags": ["dscr", "{{investment_goal}}", "{{landing_page_tag}}"],
  "attribution": {
    "utmSource": "{{utm_source}}",
    "utmMedium": "{{utm_medium}}",
    "utmCampaign": "{{utm_campaign}}",
    "utmTerm": "{{utm_term}}",
    "utmContent": "{{utm_content}}",
    "gclid": "{{gclid}}",
    "fbclid": "{{fbclid}}",
    "landingPage": "{{landing_page}}",
    "referrer": "{{referrer}}",
    "device": "{{device}}"
  },
  "message": "Investment Goal: {{investment_goal}}\nProperty Type: {{property_type}}\nState: {{state}}\nDeal Size: {{deal_size}}\nDown Payment: {{down_payment}}\nTimeline: {{timeline}}\nEntity: {{entity_type}}\nCredit Score: {{credit_score}}",
  "isHotLead": "{{hot_lead_flag}}"
}
```

---

## Hot Lead Flag Logic

A lead is flagged as **hot** when ALL of the following conditions are met:

1. `timeline` = `asap`
2. `credit_score` = `760_plus` OR `700_759`
3. `deal_size` = `400_600` OR `600_1m` OR `1m_2m` OR `2m_plus`

Hot leads should:
- Be tagged `hot-lead` in Follow-Up Boss
- Trigger an immediate Slack notification to the sales channel
- Receive priority routing in Follow-Up Boss action plans

---

## Brand Colors (Tailwind Config)

```
tq-bg:          #080e1a    (page background)
tq-surface:     #0c1829    (section surfaces)
tq-card:        #0f1f35    (card backgrounds)
tq-card-border: #1a3050    (card/section borders)
tq-blue:        #2196f3    (primary accent, CTAs)
tq-blue-dark:   #1976d2    (hover states, active)
```

Dark theme throughout. White/light text on dark backgrounds. Blue accent for interactive elements.

---

## CTA Strategy

- **One primary CTA per section:** "Get My Free Deal Analysis" with right arrow
- Phone number displayed as inline text (e.g., "Call us: (555) 123-4567"), never a competing button
- Every CTA routes to `/qualify`
- Sticky mobile CTA bar at bottom of viewport on scroll (optional, confirm with Bill)

---

## Production Checklist

### Pre-Launch

- [ ] All pages render correctly on mobile, tablet, desktop
- [ ] 7-step funnel completes end-to-end with data reaching Follow-Up Boss
- [ ] UTM parameters and attribution fields captured and forwarded correctly
- [ ] Hot lead flag logic tested with qualifying and non-qualifying scenarios
- [ ] Conversion pixels firing on success state:
  - [ ] Google Ads conversion tag
  - [ ] Meta/Facebook Pixel (Lead event)
  - [ ] Google Analytics 4 event
- [ ] Page speed: Lighthouse performance score 90+ on all pages
- [ ] SEO meta tags, Open Graph, and Twitter cards set per page
- [ ] Favicon and brand assets in place
- [ ] Form validation: required fields, email format, phone format
- [ ] Error states: API failure graceful fallback, retry logic
- [ ] Phone number click-to-call on mobile
- [ ] SSL / HTTPS confirmed
- [ ] 404 page styled and functional
- [ ] Analytics: GA4 property connected, events tracked
- [ ] Google Tag Manager container deployed (if applicable)

### Post-Launch

- [ ] Verify Follow-Up Boss receiving test leads correctly
- [ ] Verify conversion tracking firing in Google Ads and Meta dashboards
- [ ] Monitor Core Web Vitals for first 48 hours
- [ ] Confirm hot lead Slack notifications working
- [ ] Run through funnel on multiple devices/browsers (Chrome, Safari, Firefox, Edge)
- [ ] Check that abandoned funnel sessions are not creating partial leads (unless intentional)

---

## Open Questions

1. Which 7 priority states should be pinned in Step 3? (Need from Bill's wireframe or TQ Lending team)
2. Follow-Up Boss API key and endpoint URL for the integration
3. Exact phone number to display on landing pages
4. Google Ads and Meta Pixel IDs for conversion tracking
5. Any specific legal disclaimers or NMLS language required on pages
6. Should partial funnel completions (e.g., user drops off at Step 5) be tracked or submitted?
7. Bill's wireframe repo (`billriceusa/tqlend-landing-pages`) is currently inaccessible. Need access or exported assets/screenshots.
