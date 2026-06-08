# MyKeja Pages Specification
**Version**: 1.0 | **Date**: June 8, 2026 | **Tier**: Implementation-Ready

---

## Page Organization Guide

This document specifies every public-facing page with component hierarchy, states, API integrations, and responsive behaviors. Reference DESIGN_SYSTEM.md for all token definitions.

---

# PUBLIC PORTAL PAGES

---

## 1. Landing Page (`/`)

### Purpose
Showcase MyKeja value proposition, drive user engagement, build trust, and facilitate property discovery.

### Layout & Components

#### 1.1 Sticky Navigation Bar

**Desktop:**
```
[MyKeja Logo] [Browse] [How It Works] [About]     [Search Bar] [Sign In] [Register →]
```

**Mobile:**
```
[MyKeja Logo]                                              [≡ Menu] [Sign In]
```

**Component Details:**
- Logo: 32px height, clickable to home
- Links: `heading-4` weight, 600
- Sign In: Ghost button
- Register: Primary button (44px min height)
- Search bar: Hidden on mobile, visible desktop (340px width max)

**States:**
- Sticky on scroll down (elevation shadow)
- Background: Translucent white with backdrop blur

#### 1.2 Hero Section

**Visual:**
- Full-bleed background: Animated gradient (light blue to sky blue)
- Glassmorphic search card (centered, max-width 600px)
- Tagline above: `display-small`, 600 weight

**Search Card Components:**
1. **Location Input**
   - Autocomplete field
   - Placeholder: "e.g., Kahawa Sukari, Kilimani"
   - Icon: Location pin
   - Dropdown: List Kenyan areas

2. **Property Type Selector**
   - Segmented control or dropdown
   - Options: Apartment, Studio, Bedsitter, Townhouse, Maisonette, Bungalow
   - Icons for each type

3. **Price Range Slider**
   - Dual thumb slider
   - Min: 5,000 KES | Max: 500,000+ KES
   - Visual: Blue gradient track

4. **Search Button**
   - Primary button, full-width on mobile
   - Text: "Search Listings"
   - Icon: Magnifying glass
   - Action: Navigate to `/properties?location={...}&type={...}&price_min={...}&price_max={...}`

**Responsive:**
- Mobile (< 640px): Stacked inputs, full-width
- Tablet+: Inline layout, max-width 600px

#### 1.3 Featured Listings Rail

**Headline:** `heading-1`, "Featured Properties"
**Description:** `body-large`, secondary text

**Cards (Horizontal Scroll):**
- Count: 6-8 cards visible
- Card Width: 280px (mobile) / 300px (tablet+)
- Spacing: 16px gap

**Card Components (see PropertyCard):**
- Feature internal photo (16:9 aspect ratio)
- Property title: `heading-3`
- Location area (secondary text)
- Price: `heading-2`, brand-primary color
- Bed/Bath count with icons
- Verification badge (if agent VERIFIED)
- Favourite heart toggle

**States:**
- Default: Glass card with border
- Hover: Elevated shadow + slight scale up
- Loading: Skeleton card

#### 1.4 Trust Signals Section

**Headline:** `heading-1`, "Why Choose MyKeja?"

**Three Card Grid:**

1. **Verified Agents Card**
   - Icon: Shield checkmark (48px, brand-primary)
   - Title: `heading-3`, "Verified Agents"
   - Description: `body-regular`, "All agents are field-verified for legitimacy"
   - Glass card background

2. **Smart Locking Card**
   - Icon: Lock (48px, brand-primary)
   - Title: `heading-3`, "3-Day Lock System"
   - Description: `body-regular`, "Reserve properties for 3 days without commitment"

3. **M-Pesa Payments Card**
   - Icon: M-Pesa logo (48px)
   - Title: `heading-3`, "Secure M-Pesa Payments"
   - Description: `body-regular`, "Pay directly via M-Pesa STK Push"

**Layout:**
- Mobile: Stacked (1 column)
- Tablet: 2-3 column grid
- Desktop: 3 column grid

#### 1.5 How It Works Section

**Headline:** `heading-1`, "Simple 5-Step Process"

**Steps (Vertical Timeline on Mobile, Horizontal on Desktop):**

1. **Search & Discover**
   - Icon: Magnifying glass
   - Number: "1"
   - Description: "Find verified properties in your preferred area"

2. **Lock Your Choice**
   - Icon: Lock
   - Number: "2"
   - Description: "Reserve any property for 3 days free"

3. **Secure Payment**
   - Icon: Mobile + checkmark
   - Number: "3"
   - Description: "Pay conveniently via M-Pesa STK Push"

4. **Unlock Details**
   - Icon: Unlock
   - Number: "4"
   - Description: "Get full location, exterior photos, and agent contact"

5. **Confirm & Rate**
   - Icon: Star
   - Number: "5"
   - Description: "Confirm your visit and rate your experience"

**Styling:**
- Numbered circles: 48px, brand-primary background, white text
- Connecting lines: Dashed, brand-primary color (desktop only)

#### 1.6 Area Discovery Section

**Headline:** `heading-1`, "Popular Areas"

**Area Cards (Grid):**
- Count: 8-12 areas
- Card: Rounded image background with overlay text
- Content:
  - Area name: `heading-3`, white text
  - Property count: `body-small`, secondary text
  - Avg price: `body-regular`, brand-primary
- Aspect ratio: 3:2 (square on mobile, rectangular on tablet+)
- Action: Tap → Navigate to `/properties?location={area_slug}`

**Areas to Include:**
- Kahawa Sukari
- Kilimani
- Westlands
- Lavington
- Karen
- Langata
- Nairobi CBD
- Mombasa (general)
- Kisumu (general)

#### 1.7 Social Proof / Testimonials Section

**Condition:** Only show if platform has 5+ ratings

**Content:**
- Headline: `heading-1`, "Trusted by Kenyans"
- Rating distribution chart (horizontal bars):
  - 5 stars: X% ████████
  - 4 stars: Y% ██████
  - 3 stars: Z% ████
  - Etc.
- Testimonial carousel (3-4 quotes):
  - Quote text: `body-large`, italic
  - Author name + role: `body-small`
  - Author avatar: 40px circle
  - Glassmorphic card background
  - Navigation dots (carousel)

**Fallback (< 5 ratings):**
- "Be part of our growing community"
- CTA: "Get Started" button

#### 1.8 Footer

**Layout:**
```
[MyKeja Logo]           [Quick Links]      [Legal]            [Contact]
About                   Browse             Terms of Service   support@mykeja.com
Contact                 How It Works        Privacy Policy     +254 XXX XXX XXX
Blog (future)           For Agents         Compliance         [Social icons]
```

**Mobile:** Stacked single column

**Styling:**
- Background: `color-surface-primary`
- Divider line: `color-border`
- Links: `body-small`, brand-primary on hover
- Copyright: `body-small`, secondary text

### API Integration

```javascript
GET /api/v1/properties/?featured=true&limit=8
// Response: List of featured properties

GET /api/v1/agents/stats/
// Response: { total_agents, verified_agents_count, avg_rating }

GET /api/v1/locations/popular/
// Response: List of popular areas with property counts
```

### SEO Requirements

- **Title:** "MyKeja – Find Verified Homes in Kenya | Smart Property Booking"
- **Meta Description:** "Discover verified rental properties across Kenya. Lock your choice for 3 days. Pay securely via M-Pesa. Join thousands of satisfied tenants."
- **OG Image:** Hero section screenshot or branded image
- **Schema:** Organization, LocalBusiness

### Performance Targets
- LCP: < 2 seconds
- Image format: WebP with JPEG fallback
- Skeleton loading: 1.6s pulse animation

---

## 2. Search Results Page (`/properties`)

### URL Parameters

```
/properties
?location=kahawa_sukari
&type=apartment
&price_min=20000
&price_max=50000
&sort=newest
&page=1
```

### Layout

**Mobile:** Full-width list, sticky filter button
**Tablet+:** Map left (40%), list right (60%), collapsible toggle

### Components

#### 2.1 Sticky Header Bar

**Mobile:**
```
[←] Search Filters [X]    [↑ Sort]
```

**Desktop:**
```
[Property search title]                         [↑ Sort dropdown]
```

#### 2.2 Filter Panel (Bottom Sheet Mobile, Sidebar Desktop)

**Sticky on Mobile (bottom-sheet modal), Sidebar on desktop**

**Sections:**

1. **Location Filter**
   - Label: "Area"
   - Input: Autocomplete with Kenyan areas
   - Option: Multi-select or single
   - Chip display of selected areas

2. **Property Type**
   - Checkboxes: Apartment, Studio, Bedsitter, Townhouse, Maisonette, Bungalow
   - Icon + label for each

3. **Price Range**
   - Dual-thumb slider
   - Min/max inputs (editable)
   - Format: "KES 20,000 – KES 50,000"

4. **Amenities** (Optional but recommended)
   - Checkboxes: Wi-Fi, Parking, Gym, Security, Pet-friendly, Water Tank
   - Display as chip grid

5. **Furnishing**
   - Toggle: Furnished, Unfurnished, Semi-furnished

6. **Available Date** (Optional)
   - Date picker (From today onwards)

**Actions:**
- "Apply Filters" primary button
- "Clear Filters" secondary link

#### 2.3 Listing Cards (Grid)

**Desktop:** 2-3 column grid (responsive)
**Mobile:** Full-width stack

**Card Layout:**

```
┌─────────────────────────────┐
│ Feature Image (16:9)        │ ♡ Heart icon (top-right)
├─────────────────────────────┤
│ Property Title (heading-3)  │
│ Location • Distance         │
│ Price (heading-2, brand)    │
│ 🛏️ 2 bed  🚿 2 bath         │
│ [Verified Badge]            │
└─────────────────────────────┘
```

**Image:**
- Lazy-load with LQIP
- 16:9 aspect ratio
- Alt text: Property title + location

**Card States:**
- Default: Glass card, subtle border
- Hover: Elevated shadow + scale up
- Loading: Skeleton placeholder

**Card Actions:**
- Tap card body → Navigate to property detail
- Tap heart → Toggle favourite (optimistic update)

#### 2.4 Map Panel (Desktop Only)

**Sticky, right side (40% width on tablet+)**

**Features:**
- Map library: Mapbox or Google Maps
- Display: General location area radius (never specific pins)
- Markers: Light blue custom pins
- Interaction: Click marker highlights card in list
- Zoom: 12-16 zoom level (city/area view, not street level)

**Note:** Do NOT show specific GPS coordinates; always show area radius

#### 2.5 Empty State

```
🏠
"No properties found"
"Try adjusting your filters or exploring other areas."
[Clear Filters button]
```

#### 2.6 Error State

```
⚠️
"Something went wrong"
"Unable to load listings. Check your connection."
[Retry button]
```

#### 2.7 Pagination / Infinite Scroll

**Option A: Load More Button**
- Positioned at bottom of list
- Text: "Load more listings"
- Loading state: Spinner

**Option B: Infinite Scroll**
- Auto-load when scrolling near bottom
- Show 3 skeleton cards while loading

### API Integration

```javascript
GET /api/v1/properties/?location=kahawa_sukari&type=apartment
  &price_min=20000&price_max=50000&page=1&limit=20
// Response: { count, next, results: [Property...] }

POST /api/v1/saved-properties/
// Body: { property_id }

DELETE /api/v1/saved-properties/{property_id}/

GET /api/v1/locations/autocomplete/?query=kah
// Response: [{ id, name, slug }...]
```

### SEO Requirements

- **Title:** "Apartments in Kahawa Sukari – MyKeja"
- **Meta Description:** "X verified apartments and studios in Kahawa Sukari. Lock your choice for 3 days. Book now on MyKeja."
- **Canonical URL:** Consistent parameter ordering
- **Schema:** SearchResultsPage

---

## 3. Property Detail Page (`/properties/{property_id}`)

### Layout
- Mobile: Single-column
- Tablet+: Left sidebar (property details), right sidebar (agent card + CTA)

### Components

#### 3.1 Photo Gallery (Hero)

**Main Image:**
- Full-bleed: 16:9 aspect ratio (mobile), constrained desktop
- Lazy-load with LQIP
- Scrollable overlay header (appears on scroll down):
  - Back button (mobile) / Breadcrumb (desktop)
  - Share button
  - Favourite heart

**Thumbnail Carousel (Below main image):**
- Scrollable horizontal strip
- Thumbnails: 80px square, rounded corners
- **Internal photos:** Always visible, thumbnail displays normally
- **External photos:** Locked state
  - Blur overlay: `backdrop-filter: blur(10px)`
  - Lock icon (48px, centered, brand-primary)
  - Text: "Unlock after payment"
  - Tap reveals modal: "See exterior photos and exact location after booking and payment"

**Loading State:**
- Skeleton rectangle (16:9 ratio)
- Thumbnail skeleton strip

#### 3.2 Property Details Grid

**Glassmorphic card:**

```
Type: Apartment              Floor: 3rd
Bedrooms: 2                 Furnished: Semi-furnished
Bathrooms: 2               Available: Jun 15, 2026
```

**Grid Layout:** 2 columns (mobile: 1 column)
**Labels:** `body-small`, secondary
**Values:** `heading-4`, primary

#### 3.3 Location Section (Payment-Gated)

**Headline:** `heading-2`, "Location"

**Always Visible:**
- Area name: `heading-3`, brand-primary
- Example: "Kahawa Sukari, Nairobi"
- Static map tile (low-detail, no interactivity): 100km radius circle

**If User Paid (Booking.status = PAID):**
- Exact GPS coordinates: "Lat: -1.2819, Long: 36.7882"
- Interactive map (Mapbox): Full-featured with pan/zoom
- Distance to landmarks: "2.3 km from Nairobi CBD", "500m from Kahawa Sukari shopping center"

**If User NOT Paid:**
- Blurred map: `backdrop-filter: blur(15px)`
- Lock icon overlay (48px, centered)
- Text: "See exact location after payment"
- Tap → Modal: "Payment unlocks full location details"

#### 3.4 Amenities Section

**Glassmorphic card:**

**Grid of amenity icons + labels (2-3 columns):**
- Wi-Fi ✓
- Parking ✓
- Gym ✓
- Security ✓
- Water Tank
- Balcony ✓

**Styling:** Icon (24px, brand-primary) + Label (`body-small`)

#### 3.5 Description Section

**Glassmorphic card:**

**Content:** Property description text (`body-large`)
**Max height:** 300px with "Read more" expand toggle
**Example:** "Fully furnished studio with high-speed fibre, rooftop gym and skyline views. Steps from Saint Centre and the Westlands nightlife scene."

#### 3.6 Agent Card (Prominent)

**Glassmorphic card, sticky on mobile (bottom bar before CTA):**

```
┌─────────────────────┐
│ [Avatar - 64px] ✓   │
│ Skyline Realty      │
│ Verified Realtor    │
│ ⭐ 4.8 / 5 (24 ratings) │
│ ⚠️ 0 strikes        │
│ [Message] [Book]    │
└─────────────────────┘
```

**Components:**

1. **Agent Avatar**
   - 64px circle
   - Initials if no image
   - Border: 2px brand-primary

2. **Agent Name** (`heading-3`)

3. **Agent Role/Badge** (`body-small`)
   - "Verified Realtor" if VERIFIED
   - Green checkmark (16px) + "Verified" label
   - Tooltip: "Verified by field officer on [date]"

4. **Rating Display** (`heading-3` + `body-small`)
   - If 5+ ratings: "4.8 / 5" + rating count + breakdown link
   - If < 5 ratings: "New Agent" badge (avoid low-sample averages)

5. **Strike Status** (If applicable)
   - Warning badge (orange): "X strike(s) on record"
   - Tooltip explaining strikes

6. **Contact CTAs** (44px min height)
   - "Message Agent" ghost button (if authenticated)
   - "Book Now" primary button (if property AVAILABLE)

7. **Last Updated** (`body-small`, secondary)
   - "Last updated: 3 days ago"

#### 3.7 Related Listings Section

**Headline:** `heading-2`, "Similar Properties"
**Description:** `body-small`, "Same area, similar price range"

**Horizontal scrollable rail:**
- Cards: Same as featured listings rail (PropertyCard)
- Count: 4-6 visible cards

**Criteria:**
- Same location area OR
- Similar price range (±30%) OR
- Same agent's other properties

#### 3.8 Sticky Booking CTA (Mobile)

**Bottom bar:**
```
KES 35,000/month        [♡]    [Book →]
```

**Mobile only:** Fixed position bottom bar
**Desktop:** Integrated into agent card right sidebar

### API Integration

```javascript
GET /api/v1/properties/{property_id}/
// Full property details

GET /api/v1/properties/{property_id}/photos/
// Filter by visibility based on user auth + payment status

GET /api/v1/properties/{property_id}/location/
// Filter GPS coordinates by payment status

GET /api/v1/agents/{agent_id}/
// Agent details

GET /api/v1/agents/{agent_id}/stats/
// Ratings, completion rate, strike count

GET /api/v1/properties/?related=true&property_id={property_id}&limit=6
// Related listings

POST /api/v1/bookings/
// Initiate booking

POST /api/v1/saved-properties/
// Add to favourites
```

### SEO Requirements

- **Title:** "[3-Bed Apartment in Kahawa Sukari | KES 35,000/month | MyKeja"
- **Meta Description:** "Verified 3-bedroom apartment in Kahawa Sukari from agent [name]. Lock for 3 days. Secure M-Pesa payment. KES 35,000/month."
- **OG Image:** Internal feature photo URL
- **Schema (JSON-LD):** RealEstateListing with all structured data

### Performance Targets
- LCP: < 2.5 seconds
- Images: WebP format, lazy-loaded below fold
- LQIP: 20-50KB placeholder

---

## 4. Booking & Payment Flow

### Step 1: Booking Summary (`/properties/{property_id}/book`)

**Modal or dedicated page**

#### Components

**Summary Card:**
```
Property Title
[Feature Photo - 8:9 aspect ratio]

Kahawa Sukari, Nairobi
🛏️ 2 bed  🚿 2 bath

────────────────────────
Monthly Rent        KES 35,000
Booking Fee         KES 5,000
────────────────────────
Total to Pay        KES 35,000
```

**Visit Date Selector:**
- Date picker input (mandatory)
- Min: Today, Max: 90 days from today
- Label: "When do you plan to visit?"

**Tenant Info Display:**
- Name (auto-filled, read-only)
- Phone (auto-filled, editable)
- Email (auto-filled, read-only)

**Terms Checkbox:**
- "I agree to the booking terms and conditions"
- Link to full terms

**CTAs:**
- "Proceed to Payment" primary button (disabled until visit date + checkbox)
- "Cancel" ghost button → Back to property detail

**Error State (Property No Longer Available):**
- Error modal: "This property is no longer available"
- Icon: Error (red)
- CTA: "Back to Search" button

### Step 2: M-Pesa Payment Initiation

**Headline:** `heading-1`, "Complete Payment"

#### Components

**Phone Number Input:**
- Pre-filled from user account
- Editable
- Format: +254XXXXXXXXX or 07XXXXXXXX
- Validation: Kenyan phone number

**Instructions Panel (Glassmorphic):**
```
M-Pesa Logo

1. Enter your phone number
2. Confirm your Safaricom number
3. Check your phone for M-Pesa prompt
4. Enter your M-Pesa PIN

Step: 1/4 [████░░░░░░]
```

**Amount Display:**
- `heading-1`, brand-primary
- "KES 35,000"
- Subtext: "Booking fee (non-refundable)" if applicable

**CTAs:**
- "Get M-Pesa Prompt" primary (disabled until valid phone)
- "Cancel booking" ghost link

### Step 3: Payment Waiting State

**Animated loader:**

```
🔄 (pulsing blue circle)

Waiting for M-Pesa confirmation...

This usually takes 30–60 seconds.

Ref: #MPESA123456
```

**States:**
- Auto-refresh via polling or WebSocket
- Timeout error after 2 minutes: "Payment request expired. Try again?"
- Network error: "Connection lost. Retrying..."

### Step 4: Payment Confirmation

**Success State:**

```
✅ (green checkmark)

Payment Confirmed!

M-Pesa Receipt: ABC123DEF456
Amount: KES 35,000
Date: Jun 8, 2026, 2:45 PM

────────────────────────
Booking Confirmed
ID: #BOOKING123456
Status: PAID
Property: 2-Bed Apartment, Kahawa Sukari
Visit Date: Jun 15, 2026

✓ Exterior photos now visible
✓ Exact location (GPS) now visible
✓ Agent contact info available
```

**Unlock Animation:** (Optional)
- External photos fade in
- Map becomes interactive
- Agent contact details reveal

**CTAs:**
- "View Full Property Details" primary → Property detail with unlocked content
- "Go to My Bookings" secondary → Tenant dashboard
- "Browse More" tertiary

**Failure State:**

```
✗ (red X)

Payment Failed

M-Pesa declined the transaction. 
Please check your phone and try again.
```

**CTAs:**
- "Retry Payment" primary → Back to Step 2
- "Cancel Booking" secondary
- "Contact Support" link

### API Integration

```javascript
POST /api/v1/bookings/
// Body: { property_id, tenant_id, visit_date }
// Response: { booking_id, status: 'PENDING' }

POST /api/v1/payments/initiate-stk/
// Body: { phone, amount, booking_id }
// Response: { payment_id, mpesa_request_id }

GET /api/v1/payments/{payment_id}/status/
// Poll or WebSocket for status updates

GET /api/v1/bookings/{booking_id}/
// Fetch updated booking after payment
```

---

# AUTHENTICATED TENANT PAGES

## 5. Tenant Dashboard (`/dashboard`)

### Layout
- Tabbed or sectioned interface
- Mobile: Bottom tab bar with sections
- Desktop: Sidebar + main content

### Components

#### 5.1 Active Bookings Section

**Headline:** `heading-1`, "My Current Bookings"

**Booking Cards (Grid 1-2 columns):**

```
┌─────────────────────────────┐
│ Feature Photo (8:9)         │
│ Property Title              │
│ [PAID - green badge]        │
│ Visit: Jun 15, 2026         │
│ [Confirm Visit button]      │
└─────────────────────────────┘
```

**Status Badges:**
- PENDING: Grey "Awaiting Payment"
- LOCKED: Blue "Locked (expires in 2 days)"
- PAID: Green "Paid"

**Confirmation Status Pills:**
- Null: Red "Confirm Your Visit"
- VIEWED: Green "Visited"
- NOT_VIEWED: Orange "Did Not Visit"
- AGENT_ABSENT: Yellow "Agent Absent"

**Card CTAs (Dynamic):**
- If PENDING: "Complete Payment" button
- If PAID & past visit date & no confirmation: "Confirm Visit" button
- If confirmed & not rated: "Leave a Rating" button
- Always: "View Details" link

#### 5.2 Visit Confirmation Modal (Triggered)

**Headline:** `heading-1`, "Did you visit the property?"

**Content:**
- Property title + photo (small, 4:3 aspect ratio)
- Three action buttons:
  - "Yes, I Visited" (success green) → confirmation_status = VIEWED
  - "No, I Didn't" (warning orange) → confirmation_status = NOT_VIEWED
  - "Agent Was Absent" (warning orange) → confirmation_status = AGENT_ABSENT

**Backend Effect:** May trigger strike if NOT_VIEWED or AGENT_ABSENT

#### 5.3 Saved Properties Section

**Headline:** `heading-2`, "Saved Favorites"

**Empty State:**
```
♡
"No saved properties yet"
"Add listings to your favorites to save them for later."
[Browse Listings button]
```

**Saved Properties Grid:**
- Same PropertyCard as search results
- Tap → Property detail
- Heart always filled (toggling removes)

#### 5.4 Rating History Section

**Headline:** `heading-2`, "My Ratings" (collapsed by default)

**List of submitted ratings (approved only):**
- Property/Agent name
- Rating type: "Agent" / "Property" / "Experience"
- Score: 4.5 / 5
- Date: "Submitted 1 week ago"
- Comment: Truncated, "Read more" link

#### 5.5 Profile Section

**Headline:** `heading-2`, "Account"

**Display:**
- Name
- Email
- Phone
- Role: "Tenant"

**CTAs:**
- "Edit Profile" button → Edit profile form
- "Notification Preferences" link
- "Logout" button

### API Integration

```javascript
GET /api/v1/bookings/?user_id={user_id}&status=PENDING,LOCKED,PAID

GET /api/v1/saved-properties/?user_id={user_id}

PATCH /api/v1/bookings/{booking_id}/confirm-visit/
// Body: { confirmation_status: 'VIEWED' | 'NOT_VIEWED' | 'AGENT_ABSENT' }

GET /api/v1/ratings/?user_id={user_id}
```

---

## 6. Rating Submission Flow

### Location
- Triggered after booking PAID + visit_date < today + confirmation_status = VIEWED
- URL: `/bookings/{booking_id}/rate` or modal

### Components

#### 6.1 Header
**Headline:** `heading-1`, "Rate Your Experience"
**Subheading:** `body-large`, "Help other tenants and improve our platform"

#### 6.2 Tabbed Rating Targets

**Tab 1: Rate the Agent**

```
How was the agent?

Professionalism
[○●●●●] 4/5 - "Professional and courteous"

Honesty
[●●●○○] 3/5 - "Property info somewhat accurate"

Punctuality
[●●●●○] 4/5 - "Agent was on time"

Overall Score: [●●●●○] 4/5

Comment (optional)
[textarea...]
```

**Tab 2: Rate the Property**

```
How was the property?

Accuracy
[●●●●●] 5/5 - "Photos matched reality"

Condition
[●●●●○] 4/5 - "Property was well-maintained"

Amenities
[●●●●●] 5/5 - "Amenities as described"

Overall Score: [●●●●○] 4.6/5

Comment (optional)
[textarea...]
```

**Tab 3: Overall Experience**

```
How was your overall viewing experience?

[●●●●●] 5/5

Would you recommend this property/agent?
[☐] Yes, I would recommend

Comment (optional)
[textarea...]
```

#### 6.3 Submission

**Moderation Notice (Glassmorphic banner):**
- Info icon
- "Your review will be published after a brief review"
- Tooltip: Explains moderation process

**CTAs:**
- "Submit Ratings" primary button
- "Skip" ghost button
- "Save Draft" (if drafts supported)

**Confirmation Screen:**
```
✅

Thank you for your feedback!

Your ratings are being reviewed 
and will be published soon.
```

**CTAs:**
- "Back to Bookings" primary
- "Browse More Properties" secondary

### API Integration

```javascript
POST /api/v1/ratings/
// Body: {
//   booking_id, agent_id, property_id,
//   rating_type: 'AGENT' | 'PROPERTY' | 'EXPERIENCE',
//   score: 4,
//   comment: "Great agent, very helpful",
//   metrics: [
//     { metric_name: 'Professionalism', score: 5 },
//     { metric_name: 'Honesty', score: 4 },
//     { metric_name: 'Punctuality', score: 4 }
//   ]
// }
// Status: PENDING_REVIEW
```

---

# AGENT PORTAL PAGES

## 7. Agent Dashboard (`/agent/dashboard`)

### Layout
- Grid-based cards on desktop, stacked mobile
- Top status banner (conditional)

### Components

#### 7.1 Status Banner (Conditional)

**If PENDING_VERIFICATION:**
```
⚠️ Yellow Banner
Your account is pending verification. Complete onboarding to list properties.
[Start Verification button]
```

**If VERIFIED:**
```
✅ Green Banner
Your account is verified. You can now list properties.
```

**If SUSPENDED:**
```
⛔ Red Banner
Your account is suspended. Contact support to appeal.
```

#### 7.2 Summary Cards (4-column grid, responsive)

**Card 1: Active Listings**
- Icon: House (48px, brand-primary)
- Number: `heading-1`, brand-primary
- Label: "Active Listings"
- CTA: "View All" link

**Card 2: Pending Bookings**
- Icon: Calendar (48px)
- Number: `heading-1`, brand-primary
- Label: "Bookings Requiring Action"
- CTA: "View Bookings" link

**Card 3: Average Rating**
- Icon: Star (48px, gold)
- Number: `heading-1` "4.8 / 5" or "New Agent" badge
- Label: "Average Rating"
- Subtext: "X ratings from Y bookings"
- CTA: "View Ratings" link

**Card 4: Strike Status**
- Icon: Warning (48px, orange/red)
- Number: `heading-1`, color based on severity
- Label: "Strike Status"
- Subtext: "X CRITICAL strikes" or "0 strikes"
- CTA: "View Details" link

#### 7.3 Quick Action Strip

```
[+ New Listing]    [📋 View Bookings]    [💰 Payouts]
```

- Three primary button variants
- Side-by-side (desktop), stacked (mobile)

#### 7.4 Recent Activity Section

**Headline:** `heading-2`, "Recent Activity"

**Timeline list (6-8 items):**
- "New booking for 2-Bed Apt, Kahawa on Jun 8"
- "Payment received – KES 5,000 commission"
- "5-star rating received for [property]"
- "Verification status: IN_PROGRESS"
- Dates displayed as "2 days ago", "1 week ago"

### API Integration

```javascript
GET /api/v1/agents/{agent_id}/stats/

GET /api/v1/properties/?agent_id={agent_id}

GET /api/v1/bookings/?agent_id={agent_id}&status=PENDING,LOCKED,PAID

GET /api/v1/activity-log/?agent_id={agent_id}&limit=10
```

---

## 8. Property Listing Creation (Multi-Step Form)

### URL
`/agent/listings/new` or `/agent/listings/{id}/edit`

### Step 1: Basic Information

**Form Fields:**

1. **Property Title** (required)
   - Input: Text
   - Placeholder: "2-bedroom apartment in Kilimani"
   - Helper: "Be descriptive – tenants will see this first"
   - Max: 100 characters

2. **Property Type** (required)
   - Input: Dropdown with icons
   - Options: Apartment, Studio, Bedsitter, Townhouse, Maisonette, Bungalow, Other

3. **Bedrooms** (required)
   - Input: Number stepper (+ / – buttons)
   - Min: 0, Max: 10

4. **Bathrooms** (required)
   - Input: Number stepper

5. **Floor** (optional)
   - Input: Dropdown
   - Options: Ground, 1st, 2nd, ..., Penthouse, N/A

6. **Furnishing Status** (required)
   - Input: Radio group with icons
   - Options: Furnished, Unfurnished, Semi-furnished

7. **Monthly Rent** (required)
   - Input: Currency (KES)
   - Prefix: "KES"
   - Helper: "Amount tenants will pay monthly"

8. **Description** (required)
   - Input: Textarea
   - Placeholder: "Describe property, amenities, neighborhood..."
   - Max: 500 characters
   - Character counter displayed

9. **Available Date** (required)
   - Input: Date picker
   - Min: Today
   - Helper: "When can tenants move in?"

**Navigation:**
- "Next" button (primary, disabled until all required fields valid)
- "Save Draft" button (secondary)
- "Cancel" link (if editing)

---

### Step 2: Location Information

**Form Fields:**

1. **General Location** (required)
   - Input: Autocomplete
   - Placeholder: "e.g., Kahawa Sukari, Nairobi"
   - Options: List of Kenyan areas
   - Helper: "This will be visible to all users"

2. **Specific Location** (required)
   - Input: Interactive map (draggable pin) OR manual coordinates
   - Map shows: Kenya center, draggable marker
   - Coordinates: Latitude, Longitude inputs
   - Helper: "Only payment-verified tenants will see this"

3. **Location Privacy Info** (Glassmorphic info card)
   - Headline: "Location Privacy"
   - Body: "Your general area will be visible to all users. Exact GPS coordinates are only shown to tenants after they complete payment."
   - Checkbox: "I understand this privacy setting" (required)

**Navigation:**
- "Back" button
- "Next" button
- "Save Draft"

---

### Step 3: Photo Upload

**Sections:**

1. **Upload Widget**
   - Drag-and-drop zone (glassmorphic, dashed border)
   - "Drag photos here or click to browse"
   - Accepted: JPG, PNG, WebP
   - Max: 5MB per image, 20 images total
   - Progress bar per image

2. **Photo List**
   - Thumbnails (80px square)
   - For each: Classification toggle (INTERNAL / EXTERNAL) + feature star
   - Drag to reorder
   - Delete button (X on hover)

3. **Classification Legend** (Glassmorphic)
   - 👁️ INTERNAL (kitchen, bedrooms, living room) – Always visible
   - 🔐 EXTERNAL (building, gate, compound) – Payment-gated

4. **Feature Image Selection**
   - Star icon on each thumbnail (toggle)
   - Only one can be featured
   - Featured image becomes search result cover

5. **Validation Summary**
   - Info box: "Guidelines for good photos"
   - ✓ Well-lit, clear photos
   - ✓ At least 3 photos recommended
   - ✓ Feature image should be most attractive

**Navigation:**
- "Back" button
- "Next" button (enabled if ≥1 photo)
- "Save Draft"

---

### Step 4: Amenities & Features

**Sections:**

1. **Standard Amenities** (Checkbox grid, 2 columns)
   - Wi-Fi, Parking, Security, Gym, Pool, Garden, Water Tank, Balcony, Kitchen Equipped, AC, TV Cable, Laundry, Pet-friendly

2. **Additional Features** (Textarea)
   - Placeholder: "e.g., Study area, Maid's room, Generator backup"

3. **Pet Policy** (Radio group)
   - Pets allowed / Not allowed / Negotiable
   - If allowed: Textarea for details

4. **House Rules** (Textarea, optional)
   - Placeholder: "e.g., No smoking, Quiet hours after 10pm"

**Navigation:**
- "Back" button
- "Next" button
- "Save Draft"

---

### Step 5: Review & Publish

**Summary cards (each with "Edit" link):**

1. **Property Overview**
   - Feature photo (80px square thumbnail)
   - Title, type, beds, baths, floor, furnishing

2. **Location**
   - General area + "Specific location hidden until payment" note

3. **Photos**
   - Horizontal scroll of thumbnails
   - Count: "8 photos (6 INTERNAL, 2 EXTERNAL)"

4. **Amenities**
   - List of selected amenities

5. **Price & Availability**
   - "KES 35,000/month"
   - "Available from Jun 15, 2026"

**Terms Acceptance:**
- Checkbox: "I confirm all information is accurate" (required)

**Verification Status Alert** (if not VERIFIED):
```
⚠️ Yellow banner
Your account is not yet verified. After publishing, 
your property will be visible but bookings are pending verification completion.
```

**CTAs:**
- "Publish Listing" primary button (large)
- "Back" secondary button
- "Save as Draft" link

**Success Modal:**
```
✅

Property Published!

Your listing is now live. Tenants can start booking.
You will receive notifications when tenants lock your property.

[View Listing] [Back to Dashboard] [Create Another]
```

### API Integration

```javascript
POST /api/v1/properties/
// Body: Step 1-4 fields

POST /api/v1/properties/{property_id}/photos/
// Upload with classification (INTERNAL / EXTERNAL)

PATCH /api/v1/properties/{property_id}/
// Update property details

POST /api/v1/properties/{property_id}/publish/
// Publish listing
```

---

# ADMIN PORTAL PAGES (Abbreviated)

## 9. Admin Dashboard (`/admin/dashboard`)

### Key Metrics Cards
- Total Active Listings
- Total Active Bookings
- Pending Payments (KES amount)
- Open Strikes
- Agents Awaiting Verification
- Flagged Content

### Alert Banners
- Red: Critical issues (suspensions)
- Yellow: Pending actions (verifications)
- Blue: Content awaiting review (ratings)

### Recent Activity Feed
- Timeline of AuditLog entries (last 20)
- Quick access buttons: Verify Agents, Review Ratings, Manage Strikes, View Disputes

---

## 10. Agent Verification Management (`/admin/verifications`)

**Queue-based card interface:**

1. **Pending Verification Queue**
2. **In Progress Verifications**
3. **Verified Agents Archive**

Each card shows agent info, status, and action buttons (Assign Officer, View Evidence, Approve, Request Info, Reject)

---

## 11. Ratings Moderation (`/admin/ratings`)

**Pending Moderation Queue:**

Cards show:
- Rating score + comment
- Auto-flag reason (if any)
- Commenter, target agent/property
- CTAs: Approve & Publish, Reject & Remove, Request Edit

**Moderation Decision Modal:**
- Message to user (auto-filled template)
- Reason dropdown (if rejecting)
- Admin notes

---

## 12. Strike Management (`/admin/strikes`)

**Issue Strike Form:**
- Agent search (autocomplete)
- Violation type dropdown
- Severity radio (WARNING, MINOR, MAJOR, CRITICAL)
- Related booking (optional)
- Notes textarea

**Strike History Table:**
- Agent, violation, severity, points, booking, date, issued by

**Agent Suspension Management:**
- Suspended agent cards
- Strike breakdown
- Suspension type (timed/permanent)
- Actions: Lift, Revoke, Extend, Make Permanent

---

## 13. Authentication Screens

### Registration Flow

**Page 1: Role Selection**
- Three card options: "I'm Looking for a Home" / "I'm an Agent" / "I'm a Property Owner"

**Page 2: Contact Information**
- Email, phone, password (with strength indicator), confirm password
- Terms checkbox

**Page 3: OTP Verification**
- 6-digit code input
- Countdown timer + resend link

**Page 4: Account Setup** (Agent only)
- Name, business name, office phone, address

**Page 5: Success Screen**
- Welcome message (role-specific)
- CTA: "Get Started"

### Login Flow

**Page 1: Email/Phone Login**
- Toggle: Email | Phone
- Email/Phone input + password
- "Forgot password?" link

**Pages 2-4: Password Reset**
- Send reset code → Verify code → New password
- Confirmation screen

---

## 14. Global Navigation

### Mobile Bottom Tab Bar (Authenticated Tenant)
```
[🏠 Home] [🔍 Search] [📅 Bookings] [♡ Saved] [👤 Profile]
```

### Mobile Bottom Tab Bar (Authenticated Agent)
```
[📊 Dashboard] [🏠 Listings] [📅 Bookings] [💰 Payouts] [👤 Profile]
```

### Desktop Top Navigation Bar
```
[MyKeja Logo] [Dashboard] [Properties] [Bookings] [Ratings]
                                    [🔔 bell] [👤 Avatar ▼]
```

### Desktop Sidebar (Admin)
- Collapsible left sidebar
- Navigation items: Dashboard, Verifications, Properties, Strikes, Ratings, Users, Audit Log, Settings

---

## 15. Notification Center

**Modal or side panel:**

**Notification List (grouped by date):**

Each notification shows:
- Icon (context-specific)
- Headline + description
- Time ago
- Unread indicator (blue dot)
- Tap action → Navigate to relevant page

**Notification Types:**
- Booking Status Change
- Payment Confirmation
- Visit Reminder
- Rating Request
- Strike Issued
- Verification Update
- New Booking (agent)
- New Rating Received (agent)

**Empty State:**
```
🔔
"No Notifications Yet"
"You'll see notifications here when important events happen"
```

---

## 16. Error States & Edge Cases

### Error Boundary Screen
```
😞

Something Went Wrong

We've encountered an unexpected error. 
Please try again or contact support.

Error code: ERR_500_INTERNAL

[Reload Page] [Go to Home] [Contact Support]
```

### Network Error
```
"Connection Lost"
"Check your internet connection and try again."
[Retry button]
```

### Session Expired
```
"Session Expired"
"Your session has expired for security reasons. Please sign in again."
[Sign In button]
```

### 404 Page
```
"Page Not Found"
"The page you're looking for doesn't exist."
[Go to Home] [Browse Listings]
```

---

**This specification is implementation-ready. All pages, components, states, and API integrations are detailed. Cross-reference DESIGN_SYSTEM.md for all token definitions and styling guidance.**

