# REFINED AGENT PROMPT: MyKeja UI Design Brief Generator

**Version**: 2.0 | **Date**: June 8, 2026 | **Status**: Ready for Frontend Team

---

## Executive Context

You are a **senior product design consultant and frontend architect** specialising in mobile-first consumer applications for emerging markets. Your task is to generate an **exhaustive, implementation-ready UI and design system brief** for **MyKeja**, a house hunting platform built for the Kenyan real estate market.

This brief will be handed directly to a frontend development team and must be detailed enough that **no design decisions are left ambiguous** and **every page, component state, and API integration is specified**.

### Provided Technical Foundation Documentation

**The frontend team will be provided with three critical reference documents:**

1. **GETTING_STARTED.md** – Quick start guide, environment setup, development commands, project structure, troubleshooting
2. **MODELS_SUMMARY.md** – Complete data model specification (all Django models, fields, constraints, relationships, state machines)
3. **technical_design.md** – Complete system architecture, payment flow, locking mechanism, agent verification workflow, notification system, strike engine, rating system

**All design decisions must align with the technical constraints and business logic defined in these documents.**

---

## System Architecture Context

**Backend Stack:**
- Django REST Framework (DRF) + PostgreSQL
- Redis for distributed locking and caching
- M-Pesa Safaricom Daraja API for payment processing
- JWT authentication with refresh tokens
- Celery for background tasks and scheduled jobs
- Audit logging for all sensitive operations

**User Roles & Permissions:**
- **Tenant** – House hunter, can browse listings, book properties, pay, rate, manage bookings
- **Agent** – Property lister, can create/manage listings, view bookings, receive commission
- **Owner** – Property owner, limited dashboard for occupancy tracking and rent history
- **Admin** – Moderation, strike management, verification workflows
- **Super Admin** – Platform configuration, account management
- **Public** – Unauthenticated users can browse listings without login

**Core Platform Features:**
- Property listing with tiered photo access (internal always visible, external payment-gated)
- Location tiering (general location public, GPS coordinates payment-gated)
- Redis-backed distributed locking (3-day default expiry)
- M-Pesa STK Push payment integration with webhook callbacks
- Booking state machine (PENDING → LOCKED → PAID / FAILED / EXPIRED / CANCELLED)
- Verification workflow for agents (PENDING_VERIFICATION → IN_PROGRESS → VERIFIED)
- Strike and suspension engine (progressive discipline: WARNING → MINOR → MAJOR → CRITICAL)
- Structured, moderated rating system (ratings visible only after payment confirmation and visit)
- Soft deletion and immutable audit trails for compliance

---

## Design Language and Visual System

### Colour Palette (Light Blue Theme as Primary)

Define a **complete design system grounded in shades of light blue**, ranging from near-white icy tones through sky and cerulean to deep navy for contrast and depth. This palette must feel premium, trustworthy, and native to mobile while translating elegantly to wider viewports. Provide both light and dark theme variants.

**Colour Tokens to Define:**

| Token | Light Theme | Dark Theme | Usage |
|-------|------------|-----------|-------|
| **Primary Brand (Light Blue)** | `#0066CC` | `#4D9FFF` | Brand buttons, links, highlights, verification badges |
| **Primary Surface (Icy)** | `#F0F8FF` | `#1A2332` | Glass card backgrounds, panels, modal bases |
| **Secondary Accent (Sky)** | `#00B4D8` | `#00D9FF` | CTAs, hover states, success indicators |
| **Tertiary (Cerulean)** | `#0096D1` | `#00B8E6` | Secondary buttons, borders, dividers |
| **Surface Glass Light** | `#FFFFFF` with 80% opacity | `#1E2E3E` with 80% opacity | Glassmorphic card base |
| **Surface Glass Subtle** | `#F5FBFF` with 60% opacity | `#0F1820` with 60% opacity | Layered glass overlays |
| **Text Primary** | `#1A1A1A` | `#F5F5F5` | Body text, headings |
| **Text Secondary** | `#6B7280` | `#A0A8B8` | Secondary text, captions, hints |
| **Text Disabled** | `#D1D5DB` | `#4B5563` | Disabled states |
| **Border** | `#E0EBFF` | `#2A3A4E` | Dividers, glass borders |
| **Error** | `#DC2626` | `#FF6B6B` | Validation errors, destructive actions |
| **Success** | `#10B981` | `#34D399` | Confirmations, verified states, strike dismissals |
| **Warning** | `#F59E0B` | `#FBBF24` | Strike warnings, agent status caution |
| **Destructive** | `#7F1D1D` | `#FCA5A5` | Suspension, permanent removal |

**Glass Effects Specification:**

- Glass card base: `backdrop-filter: blur(20px)` with `rgba(255, 255, 255, 0.8)` light mode, `rgba(30, 46, 62, 0.8)` dark mode
- Glass overlay (photo lock): `backdrop-filter: blur(40px)` with higher opacity for stronger effect
- Glass border: `1px solid rgba(0, 102, 204, 0.15)` light mode, `1px solid rgba(77, 159, 255, 0.25)` dark mode
- Elevation: Layered box shadows with colour-matched tints (not grey), e.g., `0 4px 16px rgba(0, 102, 204, 0.1), 0 8px 32px rgba(0, 102, 204, 0.08)`

---

### Typography System

**Avoid generic typefaces.** Select a pairing that is distinctive and suited to premium real estate:

- **Display Typeface** (for property names, hero moments, agent names): Specify a typeface with strong character and premium feel (e.g., Poppins, Clash Display, or similar)
- **Body Typeface** (for listing cards, descriptions, dense information): Specify a typeface optimised for readability and Kenyan market context (e.g., Inter, Source Sans Pro)

**Type Scale Definition:**

| Scale | Font Size | Line Height | Font Weight | Letter Spacing | Usage |
|-------|-----------|-------------|------------|-----------------|-------|
| Display Large | 48px | 56px (1.17) | 700 | -0.02em | Landing page hero titles |
| Display Small | 36px | 44px (1.22) | 600 | -0.015em | Property titles, major headings |
| Heading 1 | 28px | 36px (1.29) | 600 | -0.01em | Portal section titles |
| Heading 2 | 24px | 32px (1.33) | 600 | 0 | Page section headers |
| Heading 3 | 20px | 28px (1.4) | 600 | 0 | Card titles, subsections |
| Heading 4 | 16px | 24px (1.5) | 600 | 0 | Form labels, compact headings |
| Body Large | 16px | 24px (1.5) | 400 | 0.5px | Primary body text, descriptions |
| Body Regular | 14px | 20px (1.43) | 400 | 0.25px | Secondary body text, card content |
| Body Small | 12px | 18px (1.5) | 400 | 0.4px | Helper text, captions |
| Caption | 12px | 16px (1.33) | 500 | 0.4px | Minimal labels |
| Label | 11px | 16px (1.45) | 600 | 0.8px | Badges, tags, overlines |
| Overline | 10px | 14px (1.4) | 700 | 1.5px | Section dividers, metadata |

---

### Spacing, Radius, Elevation, and Motion Tokens

**Spacing Scale (8px base):**
- `xs: 4px`, `sm: 8px`, `md: 16px`, `lg: 24px`, `xl: 32px`, `2xl: 48px`, `3xl: 64px`

**Radius:**
- `sm: 8px` – Small components (tags, badges)
- `md: 12px` – Standard cards, inputs
- `lg: 16px` – Large modals, containers
- `full: 9999px` – Buttons, pill shapes

**Elevation (Box Shadows with Colour Tints):**
- `sm: 0 2px 8px rgba(0, 102, 204, 0.08)`
- `md: 0 4px 16px rgba(0, 102, 204, 0.1), 0 8px 24px rgba(0, 102, 204, 0.05)`
- `lg: 0 8px 32px rgba(0, 102, 204, 0.12), 0 16px 48px rgba(0, 102, 204, 0.08)`
- `xl: 0 16px 64px rgba(0, 102, 204, 0.15), 0 24px 80px rgba(0, 102, 204, 0.1)`

**Motion & Easing:**
- Button press: `duration: 150ms, easing: cubic-bezier(0.34, 1.56, 0.64, 1)` (spring)
- Card tap/reveal: `duration: 300ms, easing: cubic-bezier(0.34, 1.56, 0.64, 1)`
- Page transition: `duration: 400ms, easing: cubic-bezier(0.34, 1.56, 0.64, 1)`
- Modal reveal: `duration: 350ms, easing: cubic-bezier(0.34, 1.56, 0.64, 1)`
- Skeleton loading: `duration: 1600ms, easing: ease-in-out (pulse effect)`
- Toggle/checkbox: `duration: 200ms, easing: cubic-bezier(0.4, 0, 0.2, 1)` (ease-out)

---

## Complete Page and Functionality Inventory by Portal

### Portal 1: Public-Facing Application (Unauthenticated and Authenticated Tenants)

#### 1.1 Landing Page

**URL:** `/` (Server-Side Rendered for SEO)

**Sections:**
1. **Navigation Bar** (Sticky)
   - MyKeja logo
   - Desktop: Links to Browse, Sign In, Register
   - Mobile: Hamburger menu with same links
   - Search input shortcut (desktop only)

2. **Hero Section** (Full-bleed, glassmorphic)
   - Background: Animated or static gradient featuring light blue shades
   - Search Bar (layered glass card):
     - Location input with autocomplete (Kenyan cities and neighbourhoods: Nairobi, Mombasa, Kisumu, etc.)
     - Property type selector (Apartment, Studio, Bedsitter, Townhouse, Maisonette, Bungalow)
     - Price range slider (KES 5,000 – KES 500,000+ monthly)
     - Search CTA button (primary brand colour)
   - Tagline and trust messaging

3. **Featured Listings Rail** (Horizontal scrollable)
   - 6-8 featured properties as glassmorphic cards
   - Each card shows:
     - Internal feature photo (full-bleed or gradient placeholder)
     - Property title
     - General location area (not specific GPS)
     - Price (KES X,XXX/month)
     - Bed/bath count
     - Agent verification badge (if VERIFIED)
     - Favourite/heart toggle icon
   - Tap action: Navigate to property detail page

4. **Trust Signals Section**
   - Headline: "Trust and Transparency Built In"
   - Three glass cards explaining:
     - Verified Agents (with shield icon)
     - Smart Locking System (with lock icon)
     - M-Pesa Native Payments (with M-Pesa logo)
   - Link to How It Works section

5. **How It Works Section**
   - Numbered step layout (4-5 steps):
     1. Search and discover verified properties
     2. Lock your choice (3-day hold)
     3. Pay via M-Pesa STK Push
     4. Unlock full details and contact agent
     5. Confirm your visit and rate

6. **Neighbourhood Discovery Section**
   - Grid of area cards (Kahawa Sukari, Kilimani, Westlands, etc.)
   - Each card shows area name, property count, average price
   - Tap action: Navigate to search results filtered by area

7. **Social Proof Section**
   - Only display if platform has 5+ ratings
   - Show rating distribution (1-5 stars count)
   - Display agent verification badge explanation (why we show badges before 5 ratings threshold)
   - Testimonial carousel (3-4 quotes, glassmorphic)
   - If insufficient ratings: Show "Join the community" messaging

8. **Footer**
   - Sitemap links
   - Legal: Terms of Service, Privacy Policy, Compliance
   - Contact: Email, phone
   - Social media links
   - Copyright

**API Integration:**
- `GET /api/properties/?featured=true&limit=8` – Fetch featured listings
- `GET /api/agents/stats/` – Global platform stats for trust section

**SEO Requirements:**
- Server-side render entire page
- Meta title, meta description, og:title, og:description, og:image
- Sitemap inclusion

---

#### 1.2 Search Results and Property Listings Page

**URL:** `/properties?location=kahawa_sukari&type=apartment&price_min=20000&price_max=50000` (SEO-friendly slug format)

**Layout:**
- **Mobile:** Full-width list with floating filter button
- **Tablet/Desktop:** Split view (map left 40%, list right 60%) with collapsible map toggle

**Components:**

1. **Search Bar (Sticky Header)**
   - Location, property type, price range inline controls
   - Search button or auto-trigger on value change
   - Filter icon badge (shows active filter count)

2. **Filter Panel (Bottom Sheet on Mobile, Sidebar on Desktop)**
   - Location autocomplete (multi-select capable or single)
   - Property type checkboxes
   - Price range slider (dual thumb)
   - Amenities checklist (Wi-Fi, Parking, Gym, Security, Pet-friendly)
   - Furnished/Unfurnished toggle
   - Available date picker (if desired)
   - Sort dropdown (Newest, Lowest Price, Highest Price, Most Popular)
   - Apply / Reset buttons

3. **Listing Cards (Grid on Desktop, Full-width stack on Mobile)**
   - Each card layout:
     - Internal feature photo (16:9 aspect ratio, lazy-loaded with LQIP placeholder)
     - Property title (Heading 3)
     - General location area name
     - Price (Body Large, brand blue)
     - Bed/bath icons with counts
     - Agent verification badge (if applicable)
     - Distance indicator (if location data provided)
     - Favourite heart toggle (right align)
   - Card action (tap card body): Navigate to property detail
   - Favourite action (tap heart): Toggle favourite locally and sync to backend

4. **Map Panel (Sticky, Desktop Only)**
   - Shows property markers (light blue pins)
   - Click marker to highlight corresponding card in list
   - Supports zoom and pan
   - Shows only general location area, never specific GPS

5. **Empty State**
   - Icon: Empty house illustration
   - Headline: "No properties found"
   - Secondary text: Suggest adjusting filters or trying different location
   - CTA: "Clear filters" or "Browse all"

6. **Error State**
   - Icon: Error/alert icon
   - Headline: "Something went wrong"
   - Secondary text: "Unable to load listings. Please check your connection."
   - CTA: "Retry" button

7. **Skeleton Loading State**
   - 6-8 placeholder cards with pulse animation
   - Duration: 1.6s ease-in-out

8. **Pagination or Infinite Scroll**
   - Option: "Load more" button at bottom
   - Or: Infinite scroll with loader when reaching end

**API Integration:**
- `GET /api/properties/?location=kahawa_sukari&type=apartment&price_min=20000&price_max=50000&page=1&limit=20` – Main listing query
- `GET /api/properties/?featured=true&location=kahawa_sukari` – Featured listings on results page
- `POST /api/saved-properties/` – Add to favourites
- `DELETE /api/saved-properties/{property_id}/` – Remove favourite
- `GET /api/locations/autocomplete/?query=kah` – Location suggestions

**SEO Requirements:**
- Server-side render with filter state encoded in URL
- Meta title: "Apartments in Kahawa Sukari – MyKeja"
- Meta description: "X verified apartments and studios in Kahawa Sukari. Lock your choice for 3 days. Book now."
- Structured data: SearchResultsPage schema
- Canonical URL handling for filter variations

---

#### 1.3 Property Detail Page

**URL:** `/properties/{property_id}` (Server-Side Rendered for SEO)

**Layout:** Single-column mobile, full-width desktop with sidebar on tablet+

**Sections:**

1. **Photo Gallery (Hero Section)**
   - Full-bleed main image (lazy-loaded, 16:9 aspect ratio)
   - Scroll-triggered glass overlay header appears on scroll down with:
     - Back button (mobile) or breadcrumb (desktop)
     - Share button
     - Favourite heart toggle
     - Close / Back CTA
   - Thumbnail carousel below main image:
     - Internal photos visible to all
     - External photos show lock icon and blur overlay if user has not PAID
     - Blue overlay with lock icon and text: "Unlock after payment to see exterior"
     - Click locked photo shows info modal with explanation

2. **Property Details Grid**
   - Glassmorphic card layout
   - Grid showing:
     - Type (Apartment, Studio, Bedsitter, etc.)
     - Floor / Floor number
     - Bedrooms
     - Bathrooms
     - Furnishing (Furnished, Unfurnished, Semi-furnished)
     - Available date
     - Pet policy (if available)

3. **Location Section (Payment-Gated Partial Content)**
   - Headline: "Location"
   - General location area name (always visible): "Kahawa Sukari, Nairobi"
   - Approximate static map tile showing area radius (low-detail map, no pins)
   - If user has PAID:
     - GPS coordinates displayed
     - Interactive map pin (exact location)
     - Distance to key landmarks
   - If user has NOT PAID:
     - Blurred interactive map with lock icon overlay
     - Text: "See exact location after payment"

4. **Amenities Section**
   - Icons + labels for amenities (Wi-Fi, Parking, Gym, Security, Water Tank, etc.)
   - Checkmarks or tick icons for included amenities

5. **Description Section**
   - Property description text (Body Large)
   - Glassmorphic background card

6. **Agent Card (Prominent)**
   - Glassmorphic card layout
   - Agent profile picture (or initials avatar if no image)
   - Agent business name (Heading 3)
   - Agent user role (e.g., "Verified Realtor")
   - Verification badge (if VERIFIED):
     - Green checkmark with "Verified" label
     - Tooltip: "Verified by field officer on [date]"
   - Rating display:
     - If 5+ ratings: Show average rating (e.g., "4.8 / 5") + rating count + breakdown link
     - If < 5 ratings: Show "New Agent" badge instead (avoid showing low-sample averages)
   - Strike status indicator (if applicable):
     - If strike_count > 0: Show warning badge with count
     - Tooltip: "X strike(s) on record"
   - Contact CTA buttons:
     - "Message Agent" (if authenticated as TENANT and booking not active)
     - "Book Now" (primary action, if property AVAILABLE)
   - Last updated date (small text)

7. **Related Listings Section**
   - Headline: "Similar Properties"
   - 4-6 horizontally scrollable cards using same card design as search results
   - Same area, similar price range, or same agent properties

8. **Booking CTA (Sticky Bar on Mobile)**
   - Glassmorphic bottom bar with:
     - Price display (KES X,XXX/month, Heading 2, brand blue)
     - "Lock Now" or "Book Now" primary button
     - Favourite heart icon
   - On desktop: CTA integrated into agent card

**API Integration:**
- `GET /api/properties/{property_id}/` – Full property details
- `GET /api/properties/{property_id}/photos/` – Photo list (filter by visibility based on user auth + payment status)
- `GET /api/properties/{property_id}/location/` – Location data (filter by payment status)
- `GET /api/agents/{agent_id}/` – Agent details
- `GET /api/agents/{agent_id}/stats/` – Agent stats (ratings, completion rate)
- `GET /api/properties/?related=true&property_id={property_id}&limit=6` – Related listings
- `POST /api/bookings/` – Initiate booking
- `POST /api/saved-properties/` – Favourite

**SEO Requirements:**
- Full server-side rendering
- Open Graph: og:title (property title), og:description (location + price), og:image (feature internal photo), og:url
- Twitter Card: twitter:title, twitter:description, twitter:image
- Schema.org RealEstateListing (structured data):
  ```json
  {
    "@type": "RealEstateListing",
    "name": "Property Title",
    "description": "Full description",
    "price": { "@type": "PriceSpecification", "priceCurrency": "KES", "price": "25000" },
    "address": { "@type": "PostalAddress", "addressLocality": "Kahawa Sukari" },
    "image": "internal_feature_photo_url",
    "agent": { "@type": "Person", "name": "Agent Name" }
  }
  ```
- Canonical URL
- Mobile-friendly responsive design indicators

---

#### 1.4 Booking and Payment Flow

**Flow: 4-Step Modal or Dedicated Page Series**

**Step 1: Booking Summary & Confirmation**
- URL: `/properties/{property_id}/book` or modal state
- Card-based layout with:
  - Property title (Heading 2)
  - Feature internal photo (small, 8:9 aspect ratio)
  - Property details summary (location, bedrooms, bathrooms, type)
  - Price breakdown:
    - Monthly rent: KES X,XXX
    - Booking fee (if any): KES X,XXX
    - Total to pay: KES X,XXX (brand blue, Heading 1)
  - Visit date selector (date picker input, mandatory)
  - Tenant information display (auto-filled from auth)
  - Terms checkbox: "I agree to the booking terms"
  - CTA buttons: "Proceed to Payment" (primary), "Cancel" (secondary)
- Error state: If property status changed to LOCKED or BOOKED, show error modal with "Property no longer available" and back navigation

**Step 2: M-Pesa Payment Initiation**
- Headline: "Complete Payment"
- Phone number input (pre-filled from user account, editable)
- Instruction panel (glassmorphic, light blue background):
  - "1. Enter your phone number"
  - "2. Confirm your Safaricom number"
  - "3. Check your phone for an M-Pesa prompt"
  - "4. Enter your M-Pesa PIN"
  - Icon: M-Pesa logo
- CTA button: "Get M-Pesa Prompt" (disabled until valid phone number entered)
- Estimated payment amount displayed (KES X,XXX)
- "Cancel booking" secondary link

**Step 3: Payment Waiting State**
- Animated loader: Pulsing light blue circle
- Headline: "Waiting for M-Pesa confirmation..."
- Subheading: "This usually takes 30–60 seconds"
- Pending transaction reference display (small text): "Ref: #MPESA123456"
- Auto-refresh or webhook callback trigger
- Error handling:
  - Timeout after 2 minutes: Show "Payment request expired. Try again?"
  - Failed callback: Show error with retry option
  - Network error: Show "Connection lost" with retry button

**Step 4: Payment Confirmation**
- Success state:
  - Green checkmark icon (success colour)
  - Headline: "Payment Confirmed!"
  - Receipt details:
    - M-Pesa receipt number: "ABC123DEF456"
    - Amount: KES X,XXX
    - Transaction date/time
  - Unlock animation (optional): Show external photos and GPS location suddenly become visible with gentle fade-in animation
  - Booking confirmation:
    - Booking ID: #BOOKING123
    - Status: PAID
    - Property title
    - Visit date
    - Unlocked features summary:
      - ✓ Exterior photos now visible
      - ✓ Exact location (GPS) now visible
      - ✓ Agent contact info available
  - CTAs:
    - "View Full Property Details" (primary, navigates to property detail with unlocked content visible)
    - "Go to My Bookings" (secondary, navigates to tenant dashboard bookings list)

- Failure state:
  - Red X icon (error colour)
  - Headline: "Payment Failed"
  - Reason: "M-Pesa declined the transaction. Please try again."
  - CTAs:
    - "Retry Payment" (primary, back to step 2)
    - "Cancel Booking" (secondary, back to search)
    - "Contact Support" (tertiary link)

**API Integration:**
- `POST /api/bookings/` – Create booking (returns booking_id, status=PENDING)
- `POST /api/payments/initiate-stk/` – Initiate M-Pesa STK Push (params: phone, amount, booking_id)
- `GET /api/payments/{payment_id}/status/` – Poll payment status (for waiting state, or use WebSocket)
- `GET /api/bookings/{booking_id}/` – Fetch updated booking after payment (status should be PAID)
- Webhook callback: Backend receives M-Pesa callback, updates Payment and Booking records

**Lock Expiry Handling:**
- If property becomes AVAILABLE while user is in Step 1-2: Show modal "Someone else booked this property" with back navigation
- Redis lock acquired when entering Step 1, released on successful payment (status=PAID) or booking cancellation

---

#### 1.5 Tenant Authenticated Dashboard

**URL:** `/dashboard` or `/tenant/dashboard`

**Layout:** Tabbed or sectioned interface

**Sections:**

1. **Header**
   - "My Bookings" headline
   - Tenant name and avatar

2. **Active Bookings Section**
   - Headline: "Current Bookings"
   - Cards for each active booking (PENDING, LOCKED, PAID status):
     - Property feature photo (8:9 aspect ratio)
     - Property title
     - Status badge:
       - PENDING: Grey badge "Awaiting Payment"
       - LOCKED: Blue badge "Locked" with 3-day countdown
       - PAID: Green badge "Paid"
     - Visit date
     - Confirmation status (if visit_date < today):
       - Null: Red pill "Confirm Your Visit"
       - VIEWED: Green pill "Visited"
       - NOT_VIEWED: Orange pill "Did Not Visit"
       - AGENT_ABSENT: Yellow pill "Agent Absent"
     - CTA buttons:
       - If PENDING: "Complete Payment" (navigates to payment flow)
       - If PAID & visit_date < today & confirmation_status = null: "Confirm Visit" (modal with YES/NO/Agent Absent)
       - If confirmation_status = VIEWED & rating not yet submitted: "Leave a Rating" (navigates to rating flow)
       - Any status: "View Details" (slides to booking detail side panel or navigates to property detail)

3. **Visit Confirmation Modal (Triggered)**
   - Headline: "Did you visit the property?"
   - Property title and photo
   - Three action buttons:
     - "Yes, I Visited" (green, success colour)
     - "No, I Didn't Visit" (orange, warning colour)
     - "Agent Was Absent" (red, warning colour)
   - Backend: Updates confirmation_status, may trigger strike if NO or AGENT_ABSENT

4. **Booking History Section**
   - Headline: "Past Bookings"
   - Collapsible list of closed bookings (CANCELLED, FAILED, EXPIRED)
   - Minimal cards showing property name, end date, status
   - Collapse/expand toggle

5. **Saved Properties Section**
   - Headline: "Saved Favorites"
   - Grid or list of properties user has hearted
   - If empty: Empty state with "No saved properties" message and "Browse listings" CTA
   - Tap card: Navigate to property detail

6. **Rating History Section**
   - Headline: "My Ratings"
   - List of all ratings submitted by user (approved ratings only)
   - Collapsed by default, expandable
   - Show rating type, score, property/agent name, date submitted

7. **Profile Section**
   - User info display: Name, email, phone, role (TENANT)
   - Edit profile button (navigates to edit profile page)
   - Notification preferences link
   - Logout button

**API Integration:**
- `GET /api/bookings/?user_id={user_id}&status=PENDING,LOCKED,PAID` – Active bookings
- `GET /api/bookings/?user_id={user_id}` – All bookings (for history)
- `GET /api/saved-properties/?user_id={user_id}` – Favourite properties
- `GET /api/ratings/?user_id={user_id}` – User's ratings
- `PATCH /api/bookings/{booking_id}/confirm-visit/` – Submit visit confirmation
- `GET /api/notifications/?user_id={user_id}` – Notifications (optional, for notification centre)

---

#### 1.6 Rating Submission Flow

**Triggered:** After booking is PAID and visit_date < today and confirmation_status = VIEWED

**URL:** `/bookings/{booking_id}/rate` or modal overlay

**Sections:**

1. **Header**
   - Headline: "Rate Your Experience"
   - Subheading: "Help other tenants and improve our platform"

2. **Rating Targets (Tabs or Accordion)**
   Each target has its own section:

   **Tab 1: Rate the Agent**
   - Headline: "How was the agent?"
   - Structured metrics (horizontal sliders or segmented controls):
     - Professionalism (1-5 scale): "Was the agent professional and courteous?"
     - Honesty (1-5 scale): "Was property information accurate?"
     - Punctuality (1-5 scale): "Was the agent on time?"
   - Overall score slider (1-5, auto-calculated or manual override)
   - Optional comment textarea (placeholder: "Share more about your experience...")
   - Visual star display (5 stars, clickable for quick rating)

   **Tab 2: Rate the Property**
   - Headline: "How was the property?"
   - Structured metrics:
     - Accuracy (1-5 scale): "Did photos match reality?"
     - Condition (1-5 scale): "Was the property in good condition?"
     - Amenities (1-5 scale): "Were amenities as described?"
   - Overall score slider
   - Optional comment textarea

   **Tab 3: Rate Overall Experience**
   - Headline: "Overall Experience"
   - Single slider: "How was your overall viewing experience?" (1-5)
   - Optional comment textarea (placeholder: "Any additional feedback?...")
   - Checkbox: "Would you recommend this property/agent to others?"

3. **Submission Section**
   - Moderation notice (glassmorphic banner, light blue):
     - "Your review will be published after a brief review"
     - Information icon with tooltip explaining moderation process
   - CTAs:
     - "Submit Ratings" (primary, brand blue)
     - "Skip" (secondary, ghost button)
     - "Save Draft" (tertiary, if supporting drafts)

4. **Confirmation Screen**
   - Success icon and headline: "Thank you for your feedback!"
   - Message: "Your ratings are being reviewed and will be published soon"
   - CTAs:
     - "Back to Bookings" (primary)
     - "Browse More Properties" (secondary)

**Moderation Workflow (Backend):**
- All ratings submitted with status = PENDING_REVIEW
- Auto-scan for profanity, threats, defamatory language
- If flagged: Admin review required before publication
- If approved: status = APPROVED, visible in public listings and agent profiles

**API Integration:**
- `POST /api/ratings/` – Submit rating with metrics and comment
  ```json
  {
    "booking_id": "uuid",
    "agent_id": "uuid",
    "property_id": "uuid",
    "rating_type": "AGENT" | "PROPERTY" | "EXPERIENCE",
    "score": 4,
    "comment": "Great agent, very helpful",
    "metrics": [
      { "metric_name": "Professionalism", "score": 5 },
      { "metric_name": "Honesty", "score": 4 },
      { "metric_name": "Punctuality", "score": 4 }
    ]
  }
  ```
- Backend creates CommentModeration record if auto-scan flags content
- Backend triggers notification to admin if flagged

---

### Portal 2: Agent Portal

#### 2.1 Agent Dashboard

**URL:** `/agent/dashboard`

**Layout:** Grid-based cards on desktop, stacked mobile

**Sections:**

1. **Status Banner (Conditional)**
   - If verification_status = PENDING_VERIFICATION:
     - Yellow/warning banner: "Your account is pending verification. Complete onboarding to list properties."
     - CTA: "Start Verification" (navigates to verification status page)
   - If verification_status = IN_PROGRESS:
     - Blue banner: "Your verification is in progress. Field officer will contact you soon."
     - CTA: "View Details"
   - If verification_status = SUSPENDED:
     - Red banner: "Your account is suspended due to strike accumulation. Contact support."
   - If verification_status = VERIFIED:
     - Green banner: "✓ Account Verified" (optional, congratulatory message)

2. **Summary Cards (4-Column Grid, responsive)**
   - **Active Listings Card:**
     - Icon: House/property icon
     - Number: Total count (Heading 1, brand blue)
     - Label: "Active Listings"
     - CTA: "View All" (links to listing management)
   - **Pending Bookings Card:**
     - Icon: Calendar/booking icon
     - Number: Count of PENDING, LOCKED, PAID bookings (Heading 1)
     - Label: "Bookings Requiring Action"
     - CTA: "View Bookings" (links to booking management)
   - **Average Rating Card:**
     - Icon: Star icon
     - Number: Decimal rating (e.g., "4.8 / 5" in brand blue if 5+ ratings, else "New Agent")
     - Label: "Average Rating"
     - CTA: "View Ratings" (links to ratings page)
     - Subtext: "X ratings from Y completed bookings"
   - **Strike Status Card:**
     - Icon: Warning/exclamation icon (orange if strikes > 0, green if 0)
     - Number: Strike count (red if critical, orange if major, yellow if minor, green if none)
     - Label: "Strike Status"
     - Severity text (e.g., "2 MAJOR strikes")
     - CTA: "View Details" (links to strike history modal or page)

3. **Quick Action Strip**
   - Three horizontally arranged button cards:
     - **+ New Listing** (primary brand blue, icon: plus sign)
       - Action: Navigate to property creation flow step 1
     - **📋 View Bookings** (secondary, icon: clipboard)
       - Action: Navigate to booking management
     - **💰 Payouts** (tertiary, icon: money)
       - Action: Navigate to payout history

4. **Recent Activity Section**
   - Headline: "Recent Activity"
   - List of recent events (6-8 items):
     - Booking created: "New booking for [property name] on [date]"
     - Payment received: "Payment received for [property name] – KES X,XXX"
     - Rating received: "[Agent Rating] for [property name] – 5/5"
     - Verification update: "Your verification status changed to [status]"
     - Strike issued: "[Strike Type] strike issued on [date]"
   - Expandable/collapsible timeline view

5. **Earnings Preview Section** (Optional)
   - Headline: "This Month's Earnings"
   - Total amount (brand blue, Heading 1)
   - Mini bar chart: Earnings by week
   - CTA: "View Full Payout History"

**API Integration:**
- `GET /api/agents/{agent_id}/stats/` – Summary stats (ratings, strike count, completion rate)
- `GET /api/agents/{agent_id}/verification/` – Verification status
- `GET /api/properties/?agent_id={agent_id}` – Listing count
- `GET /api/bookings/?agent_id={agent_id}&status=PENDING,LOCKED,PAID` – Pending bookings count
- `GET /api/activity-log/?agent_id={agent_id}&limit=10` – Recent activity
- `GET /api/payouts/?agent_id={agent_id}&month=current` – Monthly earnings

---

#### 2.2 Property Listing Creation Flow (Multi-Step Form)

**URL:** `/agent/listings/new` or `/agent/listings/{listing_id}/edit`

**Step 1: Basic Information**

**Headline:** "Basic Property Information"

**Form Fields:**
1. Property Title (text input, required)
   - Placeholder: "2-bedroom apartment in Kilimani"
   - Helper text: "Be descriptive – this is what tenants will see first"
   - Character limit: 100

2. Property Type (dropdown, required)
   - Options: Apartment, Studio, Bedsitter, Townhouse, Maisonette, Bungalow, Other
   - Icon accompanying each option

3. Bedrooms (number stepper, required)
   - Min: 0, Max: 10
   - Visual: – and + buttons

4. Bathrooms (number stepper, required)
   - Min: 0, Max: 10

5. Floor (dropdown or number, optional)
   - Options: Ground Floor, Floor 1, Floor 2, ..., Penthouse, N/A
   - Or: "Ground floor" checkbox for quick selection

6. Furnishing Status (radio group, required)
   - Furnished / Unfurnished / Semi-furnished
   - Visual: Icons for each

7. Monthly Rent (currency input, required)
   - Prefix: KES
   - Helper: "The amount tenants will pay monthly"
   - Validation: Required, numeric

8. Description (textarea, required)
   - Placeholder: "Describe the property, amenities, neighbourhood, what makes it special..."
   - Character limit: 500
   - Character count display

9. Available Date (date picker, required)
   - Default: Today's date
   - Minimum: Today
   - Helper: "When can tenants move in?"

**Navigation:**
- "Next" button (primary, disabled until required fields valid)
- "Save Draft" (secondary, ghost)
- "Cancel" (tertiary link, if editing)

**Error Handling:**
- Real-time field validation (on blur or on submit)
- Error messages below each field (error colour, small text)
- Scroll to first error on submit failure

---

**Step 2: Location Information**

**Headline:** "Property Location"

**Form Fields:**

1. **General Location (Payment-Public Tier)**
   - Label: "Area / Neighbourhood (visible to all users)"
   - Autocomplete input with Kenyan neighbourhoods
   - Examples: Kahawa Sukari, Kilimani, Westlands, Lavington, etc.
   - Required field
   - Helper: "Example: Kahawa Sukari, Nairobi"

2. **Specific Location (Payment-Gated Tier)**
   - Label: "Exact Location (GPS coordinates, only visible after payment)"
   - Interactive map showing current location (or map of Kenya if no location detected)
   - Marker pin on map (draggable to adjust)
   - Or: Manual coordinate input (Latitude, Longitude)
   - Helper: "Tap the map to pin exact location, or enter coordinates. Only payment-verified tenants will see this."
   - Address field (optional, reverse geocoding from coordinates)

3. **Visibility Explanation (Glassmorphic Info Card)**
   - Headline: "Location Privacy"
   - Body: "Your general area will be visible to all users. Exact GPS coordinates are only shown to tenants after they complete payment. This protects your property from external scouting."
   - Checkbox: "I understand this privacy setting"

**Navigation:**
- "Back" button
- "Next" button (primary)
- "Save Draft" (secondary)

---

**Step 3: Photo Upload**

**Headline:** "Upload Photos"

**Sections:**

1. **Photo Upload Widget**
   - Drag-and-drop zone (glassmorphic, light blue border, dashed)
   - "Drag photos here or click to browse"
   - File type support: JPG, PNG, WebP (max 5MB per image, max 20 images)
   - Upload progress bar per image (shows percentage)
   - Uploaded photos list below with thumbnails

2. **Photo Classification**
   - Each uploaded photo has a classification toggle:
     - Radio buttons: "INTERNAL (always visible)" | "EXTERNAL (payment-gated)"
     - Icon explanation: 👁️ for INTERNAL, 🔐 for EXTERNAL
   - Helper text: "INTERNAL photos (kitchen, bedrooms, living room) are always visible. EXTERNAL photos (building, gate, compound) are only shown after payment."

3. **Feature Image Selection**
   - Each photo thumbnail has a star icon toggle
   - Only one photo can be featured
   - Featured photo is marked with a gold star and "Featured" label
   - Featured photo becomes the primary image in search results

4. **Reordering**
   - Drag photo thumbnails to reorder display sequence
   - Visual feedback (hover highlight, drag cursor)
   - Re-order also affects priority in search result cards

5. **Photo Deletion**
   - X button on each thumbnail (appears on hover)
   - Confirm deletion modal: "Remove this photo?"

6. **Validation Summary**
   - Info box: "Guidelines for good photos"
     - ✓ Well-lit, clear photos
     - ✓ At least 3 photos recommended
     - ✓ Feature image should be most attractive
     - ✓ Avoid people or personal items in photos

**Navigation:**
- "Back" button
- "Next" button (primary, enabled if at least 1 photo uploaded)
- "Save Draft"

---

**Step 4: Amenities & Features**

**Headline:** "Amenities"

**Form Sections:**

1. **Standard Amenities (Checkbox Grid)**
   - 2-column grid of checkboxes
   - Wi-Fi
   - Parking
   - Security
   - Gym / Fitness
   - Pool
   - Garden / Green space
   - Water Tank
   - Balcony
   - Kitchen Equipped
   - Air Conditioning
   - TV Cable
   - Laundry Facility
   - Pet-friendly

2. **Additional Features (Multi-select or Textarea)**
   - Textarea for custom amenities or features not listed above
   - Placeholder: "e.g., Study area, Maid's room, Generator backup"

3. **Pet Policy**
   - Radio group:
     - Pets allowed
     - Pets not allowed
     - Negotiable
   - If allowed: Textarea for details (e.g., "Small dogs only")

4. **House Rules (Optional)**
   - Textarea
   - Placeholder: "e.g., No smoking, Quiet hours after 10pm"

**Navigation:**
- "Back" button
- "Next" button (primary)
- "Save Draft"

---

**Step 5: Review & Publish**

**Headline:** "Review Your Listing"

**Layout:** Summary cards showing all entered information with "Edit" links next to each section

**Summary Sections:**

1. **Property Overview**
   - Feature photo (small thumbnail, 8:9 aspect ratio)
   - Title
   - Type, bedrooms, bathrooms, floor, furnishing
   - "Edit" link (navigates back to Step 1)

2. **Location**
   - General area
   - "Specific location hidden until payment" note
   - "Edit" link (navigates back to Step 2)

3. **Photos**
   - Horizontal scroll of photo thumbnails
   - Count: "X photos uploaded (Y INTERNAL, Z EXTERNAL)"
   - "Edit" link (navigates back to Step 3)

4. **Amenities**
   - List of selected amenities
   - "Edit" link (navigates back to Step 4)

5. **Price & Availability**
   - Monthly rent (brand blue, Heading 2)
   - Available date
   - "Edit" link (navigates back to Step 1)

6. **Terms Acceptance**
   - Checkbox (required): "I confirm all information is accurate and complete"
   - Link to Terms of Service

7. **Verification Status Alert (if not VERIFIED)**
   - Warning banner (yellow):
     - "Your account is not yet verified. After publishing, your property will be visible to all users and eligible for bookings once verification is complete."

**CTAs:**
- "Publish Listing" (primary, brand blue, large button)
- "Back" (secondary)
- "Save as Draft" (tertiary link)

**Success Flow:**
- On successful publish:
  - Success modal: "Property Published!"
  - "Your listing is now live. Tenants can start booking."
  - Message: "You will receive notifications when tenants lock your property."
  - CTAs:
    - "View Listing" (navigates to property detail page)
    - "Back to Dashboard" (navigates to agent dashboard)
    - "Create Another Listing" (resets form for new listing)

**API Integration:**
- `POST /api/properties/` – Create new property (steps 1-4 fields)
- `POST /api/properties/{property_id}/photos/` – Upload photos (step 3)
- `PATCH /api/properties/{property_id}/` – Update property details
- `POST /api/properties/{property_id}/publish/` – Publish listing (step 5)
- `GET /api/amenities/` – Fetch list of standard amenities (for checkboxes)

---

#### 2.3 Property Listing Management

**URL:** `/agent/listings`

**Layout:** Table on desktop (sortable, filterable), cards on mobile

**Table/Card Columns:**
1. Property Title (with feature photo thumbnail on mobile)
2. Status (badge: AVAILABLE, LOCKED, BOOKED, VIEWED, OCCUPIED, REMOVED)
3. Price
4. Bookings (count or link)
5. Rating (if applicable)
6. Actions (dropdown menu or row buttons)

**Filters (Sidebar or Sticky Bar):**
- Status (multi-select checkboxes): AVAILABLE, LOCKED, BOOKED, VIEWED, OCCUPIED, REMOVED
- Sort: Newest, Most Bookings, Highest Price, Lowest Price, Best Rated

**Row Actions (Per Property):**
- **View** – Navigate to property detail page
- **Edit** – Navigate to property edit form (same multi-step form as creation, pre-filled)
- **View Bookings** – Navigate to bookings management filtered by property
- **Deactivate** – Change status to REMOVED (soft delete)
- **View Stats** – Open side panel with property analytics (views, bookings, rating)

**Bulk Actions (Optional):**
- Checkbox to select multiple properties
- "Deactivate Selected" bulk action
- "Archive Selected" bulk action

**Empty State:**
- Icon: Empty property listing
- Headline: "No listings yet"
- CTA: "Create Your First Listing" (navigates to listing creation)

**API Integration:**
- `GET /api/properties/?agent_id={agent_id}` – List all properties
- `GET /api/properties/?agent_id={agent_id}&status={status}` – Filter by status
- `PATCH /api/properties/{property_id}/` – Update property
- `DELETE /api/properties/{property_id}/` – Soft delete (status = REMOVED)
- `GET /api/properties/{property_id}/stats/` – Property analytics

---

#### 2.4 Bookings Management

**URL:** `/agent/bookings`

**Layout:** Table or card grid, filterable and sortable

**Table/Card Columns:**
1. Property Name
2. Tenant (anonymised until PAID: "Anonymous Tenant", then shows name)
3. Booking Status (PENDING, LOCKED, PAID, FAILED, EXPIRED, CANCELLED)
4. Visit Date
5. Confirmation Status (null, VIEWED, NOT_VIEWED, AGENT_ABSENT)
6. Actions

**Filters:**
- Booking Status: PENDING, LOCKED, PAID, FAILED, EXPIRED, CANCELLED
- Confirmation Status: Pending, Visited, Did Not Visit, Agent Absent
- Date Range (visit date)

**Row Actions:**
- **View Details** – Open side panel with full booking info:
  - Property details (title, location general, photos)
  - Tenant info (name, phone, email, but phone/email only if PAID)
  - Payment status and receipt (if PAID)
  - Visit date and confirmation status
  - Rating submitted (if applicable)
  - Actions per status:
    - If PENDING: Show "Awaiting tenant payment"
    - If LOCKED: Show "Property locked, expires [date]"
    - If PAID: Show tenant contact info, offer to message tenant
    - If confirmation_status = null & visit_date < today: Prompt "Confirm whether tenant visited"
- **Message Tenant** (if PAID) – Opens messaging interface (or redirects to external messaging)
- **Mark as Visited** / **Mark as Not Visited** / **Agent Was Absent** (if visit_date < today & confirmation_status = null)
- **View Rating** (if rating submitted)

**Empty State:**
- Icon: Inbox zero
- Headline: "No bookings yet"
- Subtext: "Bookings will appear here once tenants start locking your properties"

**API Integration:**
- `GET /api/bookings/?agent_id={agent_id}` – List all bookings for agent's properties
- `GET /api/bookings/{booking_id}/` – Booking details
- `PATCH /api/bookings/{booking_id}/confirm-visit/` – Agent confirms visit status (if applicable)
- `GET /api/bookings/{booking_id}/tenant/` – Tenant info (with permission checks based on booking status)
- `GET /api/ratings/?booking_id={booking_id}` – Ratings for booking

---

#### 2.5 Agent Verification Status Page

**URL:** `/agent/verification`

**Sections:**

1. **Status Card (Prominent)**
   - Current verification status (badge with colour):
     - PENDING_VERIFICATION: Yellow badge "Pending Verification"
     - IN_PROGRESS: Blue badge "In Progress"
     - VERIFIED: Green badge with checkmark "Verified"
     - SUSPENDED: Red badge "Suspended"
   - Status message explaining next steps

2. **Verification Progress Checklist**
   - Headline: "Verification Process"
   - Steps (checkmark or circle icon for each):
     1. ☐ Account created
     2. ☐ Basic information submitted
     3. ☐ Field officer assigned
     4. ☐ Physical verification scheduled
     5. ☐ Verification completed
     6. ☐ Account verified
   - Each step shows date completed (if applicable)

3. **Current Status Details**
   - If PENDING_VERIFICATION:
     - Message: "Your account is awaiting verification. A field officer will contact you soon to schedule a visit."
     - CTA: "How does verification work?" (expands FAQ or opens modal)
   - If IN_PROGRESS:
     - Field Officer assigned: Name, phone (if available), email
     - Scheduled visit date (if available)
     - Message: "Your field officer will visit your office/location to confirm business legitimacy."
     - Evidence photos uploaded (if available, with geo-tags)
   - If VERIFIED:
     - Verification date
     - Verified by: Field Officer name
     - Verification badge explanation: "Your account is now marked as Verified on the platform, increasing tenant trust."
   - If SUSPENDED:
     - Suspension reason
     - Strike count (X CRITICAL strikes)
     - Suspension end date (if timed), or "Permanent" if indefinite
     - Appeal option: "Contact support to appeal"

4. **FAQ Section (Expandable)**
   - Q: What is account verification?
     - A: Explanation of non-ID-based verification process
   - Q: How long does verification take?
     - A: Timeline (e.g., "Typically 5-10 business days")
   - Q: Why do you need a field officer visit?
     - A: Explanation of trust and enforcement
   - Q: Can I list properties before verification?
     - A: "Listings will be hidden until verification is complete, but you can create drafts."

**API Integration:**
- `GET /api/agents/{agent_id}/verification/` – Verification status details
- `GET /api/agents/{agent_id}/verification-evidence/` – Upload or view evidence (photos, documents)
- `POST /api/agents/{agent_id}/appeal/` – Submit appeal for suspension (if applicable)

---

#### 2.6 Ratings Received Page

**URL:** `/agent/ratings`

**Sections:**

1. **Summary Card**
   - Headline: "Your Ratings"
   - Large average rating display (e.g., "4.8 / 5")
   - Rating count: "From X completed bookings"
   - Distribution chart (horizontal bar chart):
     - 5 stars: X% ████████
     - 4 stars: X% ██████
     - 3 stars: X% ████
     - 2 stars: X% ██
     - 1 star: X% █

2. **Metric Breakdown (If Agent Rating Type Exists)**
   - Card showing average scores for structured metrics:
     - Professionalism: 4.9 / 5
     - Honesty: 4.7 / 5
     - Punctuality: 4.8 / 5
   - Visual: Horizontal progress bars or gauge charts

3. **Approved Ratings List**
   - Filter: Show approved ratings only
   - Headline: "Reviews from Tenants"
   - Each rating card shows:
     - Tenant name (or "Anonymous" if tenant prefers)
     - Star score
     - Overall score + structured metric scores
     - Comment text (truncated, "Read more" link expands)
     - Property name
     - Date submitted (e.g., "2 weeks ago")
     - Helpful action (optional): "Mark as helpful" thumbs up

4. **Flagged Ratings Section (If Applicable)**
   - If ratings have been flagged for moderation:
     - Headline: "Under Review"
     - Cards for flagged ratings:
       - Star score
       - Comment text
       - Reason for flag (auto-detected: "Profanity", "Threats", "Defamation")
       - Status: "Awaiting moderation"
       - Message: "We're reviewing this comment. Check back soon."

5. **Empty State (If No Ratings)**
   - Icon: Empty rating
   - Headline: "No ratings yet"
   - Message: "Once tenants complete bookings and confirm visits, they can leave ratings."

**API Integration:**
- `GET /api/agents/{agent_id}/stats/` – Rating summary and distribution
- `GET /api/ratings/?agent_id={agent_id}&status=APPROVED` – Approved ratings
- `GET /api/ratings/?agent_id={agent_id}&status=PENDING_REVIEW` – Flagged ratings (if agent can view)

---

#### 2.7 Payout History Page

**URL:** `/agent/payouts`

**Sections:**

1. **Earnings Summary Card**
   - Total earned this month: "KES X,XXX" (brand blue, Heading 1)
   - Previous month: "KES X,XXX" (small, secondary colour)
   - Mini chart: Earnings trend (bar chart by week)

2. **Payout Method Setup**
   - If no M-Pesa account linked:
     - Warning banner: "No payout method configured"
     - Input: "M-Pesa Phone Number" (for commission transfers)
     - CTA: "Set Payout Method"
   - If linked: "Payouts are sent to +254XXXXXXXXX" with edit option

3. **Payout History Table/Cards**
   - Columns:
     1. Booking (property name, booking ID link)
     2. Amount (KES X,XXX)
     3. Commission Rate (e.g., "5%")
     4. Status (PENDING, TRANSFERRED, FAILED)
     5. Date (transaction date)
     6. M-Pesa Reference (transaction ID)
     7. Actions (View booking, Download receipt)

   - Filters:
     - Date range (month/custom)
     - Status (PENDING, TRANSFERRED, FAILED)

   - Sorting: Newest, Largest amount, Smallest amount

4. **Failed Payouts Alert (If Applicable)**
   - Banner: "X pending payouts" (if status = PENDING)
   - Red banner if status = FAILED: "X payout(s) failed. Check your M-Pesa number and retry."

5. **Tax & Commission Breakdown (Optional)**
   - Info card explaining:
     - Gross earning per booking
     - Commission rate (e.g., "5%")
     - MyKeja fee (if applicable)
     - Net amount to agent
     - Link to full commission policy

**API Integration:**
- `GET /api/agent-payouts/?agent_id={agent_id}` – List payouts
- `GET /api/agent-payouts/{payout_id}/` – Payout details
- `PATCH /api/agents/{agent_id}/payout-method/` – Update M-Pesa number
- `POST /api/agent-payouts/{payout_id}/retry/` – Retry failed payout

---

### Portal 3: Owner Portal (Simplified)

**URL:** `/owner/dashboard`

**Sections:**

1. **Property Overview**
   - List of owner's properties
   - For each property: title, status (occupied, vacant, pending), tenant (if occupied), occupancy start date

2. **Rent Payment History**
   - List of confirmed payments linked to bookings
   - Filters: Date range, property, payment status
   - Columns: Property, Tenant, Amount, Payment Date, Status

3. **Tenant Contact Access**
   - If booking status = PAID:
     - Show tenant name, phone, email (for rent communication)
   - Contact form or messaging interface to communicate with tenant

4. **Property Registration (Simplified)**
   - Multi-step form similar to agent listing creation
   - Reduced fields (no verification needed)
   - Admin approval required before going live

**API Integration:**
- `GET /api/properties/?owner_id={owner_id}` – Owner properties
- `GET /api/bookings/?owner_id={owner_id}&status=PAID` – Payments received
- `POST /api/properties/` – Register new property (owner endpoint)

---

### Portal 4: Admin and Super Admin Portal

#### 4.1 Admin Dashboard

**URL:** `/admin/dashboard`

**Sections:**

1. **Key Metrics Cards**
   - Total Active Listings (count)
   - Total Active Bookings (count)
   - Pending Payments (count + total KES amount)
   - Open Strikes (count)
   - Agents Awaiting Verification (count)
   - Flagged Content (count: ratings, listings)

2. **Alert Banners**
   - Red banner if critical issues: "X agents suspended due to strikes"
   - Yellow banner if pending actions: "X agents awaiting verification approval"
   - Blue banner: "X ratings awaiting moderation review"

3. **Recent Activity Feed**
   - Timeline view of AuditLog entries (last 20 entries)
   - Each entry shows: actor, action, entity, timestamp
   - Example entries:
     - "Admin approved Agent [name] verification on [date]"
     - "Strike issued to Agent [name]: MAJOR for property misrepresentation"
     - "Rating flagged: '[comment]' – awaiting moderation"
     - "Booking created: [tenant] booked [property] for [date]"

4. **Quick Access Buttons**
   - "Verify Agents" (navigates to agent verification queue)
   - "Review Ratings" (navigates to ratings moderation)
   - "Manage Strikes" (navigates to strike management)
   - "View Disputes" (navigates to booking dispute queue)

---

#### 4.2 Agent Verification Management

**URL:** `/admin/verifications`

**Layout:** Queue-based card interface or table

**Queue Sections:**

1. **Pending Verification Queue**
   - Headline: "Agents Awaiting Verification"
   - Card per agent showing:
     - Agent business name
     - Applied date
     - Status: PENDING_VERIFICATION
     - Basic info: Email, phone, location
     - CTA buttons:
       - "Assign Field Officer" (opens dropdown/modal to select officer)
       - "View Application" (open side panel with full application details)

2. **In Progress Verifications**
   - Headline: "Verifications in Progress"
   - Card per agent showing:
     - Agent business name
     - Status: IN_PROGRESS
     - Assigned field officer: Name, phone
     - Scheduled visit date (if available)
     - Evidence photos uploaded (thumbnail carousel)
     - CTA buttons:
       - "View Evidence" (opens full evidence viewer)
       - "Approve" (changes status to VERIFIED)
       - "Request More Info" (opens modal to send message to agent/officer)
       - "Reject" (opens modal with rejection reason)

3. **Verified Agents Archive**
   - Collapsible section showing recently verified agents
   - Headline: "Recently Verified"
   - List showing: agent name, verification date, officer name

**Side Panel (View Agent Verification Details):**
- Agent business name, owner name, email, phone
- Business address
- Application date
- Verification status
- Assigned field officer
- Evidence photos with geo-tags
- Verification notes (admin/officer notes)
- Actions: Approve, Reject, Request Info

**API Integration:**
- `GET /api/agents/?verification_status=PENDING_VERIFICATION` – Pending agents
- `GET /api/agents/?verification_status=IN_PROGRESS` – In progress
- `GET /api/agents/{agent_id}/verification/` – Agent verification details
- `PATCH /api/agents/{agent_id}/verification/assign-officer/` – Assign field officer
- `PATCH /api/agents/{agent_id}/verification/approve/` – Approve verification
- `PATCH /api/agents/{agent_id}/verification/reject/` – Reject with reason
- `GET /api/agents/{agent_id}/verification-evidence/` – Evidence photos

---

#### 4.3 Property Moderation

**URL:** `/admin/properties`

**Sections:**

1. **Flagged Listings Queue**
   - Headline: "Properties Awaiting Review"
   - Card per flagged property:
     - Property title and feature photo
     - Reason for flag (e.g., "Inappropriate content", "Suspicious pricing", "Missing photos")
     - Flagged date and by whom (admin, system auto-flag, user report)
     - Agent info: Business name, verification status
     - CTA buttons:
       - "Approve" (unflags, listing goes live)
       - "Request Edit" (sends message to agent with specific requests)
       - "Remove" (deletes listing, status = REMOVED)
       - "View Full Details" (opens property detail in side panel)

2. **All Properties List**
   - Filter by status: ALL, AVAILABLE, LOCKED, BOOKED, REMOVED, FLAGGED
   - Sort by: Newest, Most Bookings, Highest Price, Lowest Price
   - Table/card view with columns: Title, Agent, Status, Created Date, Actions

3. **User Reports Queue (Optional)**
   - If users can report listings:
     - Headline: "User Reports"
     - Cards showing: property, reason for report, reporter, date
     - Review and action buttons

**API Integration:**
- `GET /api/properties/?flagged=true` – Flagged properties
- `GET /api/properties/{property_id}/` – Property details
- `PATCH /api/properties/{property_id}/approve/` – Approve listing
- `PATCH /api/properties/{property_id}/request-edit/` – Send edit request
- `DELETE /api/properties/{property_id}/` – Remove listing

---

#### 4.4 Strike Management

**URL:** `/admin/strikes`

**Sections:**

1. **Issue Strike Form**
   - Headline: "Issue a Strike"
   - Agent Search (autocomplete by business name or email)
   - Violation Type (dropdown):
     - Property misrepresentation
     - Agent no-show
     - Rude/abusive behavior
     - Payment fraud
     - Other (with text input)
   - Severity (radio group):
     - WARNING (1 point)
     - MINOR (2 points)
     - MAJOR (5 points)
     - CRITICAL (10 points)
   - Related Booking (optional dropdown: select booking that triggered strike)
   - Notes (textarea for admin notes)
   - CTA buttons:
     - "Issue Strike" (primary)
     - "Cancel"

2. **Strike History Table**
   - Agent name
   - Violation type
   - Severity (badge colour)
   - Points
   - Booking (link to booking details)
   - Date issued
   - Issued by (admin name)
   - Actions: View details, Edit, Delete

3. **Agent Suspension Management**
   - Headline: "Suspensions"
   - Card per suspended agent:
     - Agent business name
     - Total strike count (e.g., "15 points")
     - Strike breakdown (e.g., "2 CRITICAL, 1 MAJOR")
     - Suspension type: Timed or Permanent
     - Suspension date and expiry (if timed)
     - Suspension reason (admin notes)
     - Actions:
       - "Lift Suspension" (if timed and expired)
       - "Revoke Suspension" (early lift by admin approval)
       - "Extend Suspension" (if timed)
       - "Make Permanent" (convert timed to permanent)

**API Integration:**
- `POST /api/strikes/` – Issue strike
  ```json
  {
    "agent_id": "uuid",
    "violation_type": "property_misrepresentation",
    "severity": "MAJOR",
    "booking_id": "uuid",
    "notes": "Admin notes"
  }
  ```
- `GET /api/strikes/?agent_id={agent_id}` – Agent strike history
- `GET /api/agent-suspensions/?agent_id={agent_id}` – Agent suspension details
- `POST /api/agent-suspensions/` – Create suspension
- `PATCH /api/agent-suspensions/{suspension_id}/lift/` – Lift suspension

---

#### 4.5 Ratings and Comment Moderation

**URL:** `/admin/ratings`

**Sections:**

1. **Pending Moderation Queue**
   - Headline: "Ratings Awaiting Review"
   - Card per rating in PENDING_REVIEW status:
     - Rating score (e.g., "4 / 5")
     - Comment text (full text visible)
     - Auto-flag reason (if flagged: "Profanity", "Threats", "Defamation", etc.)
     - Commenter (tenant name)
     - Target (agent name, property name)
     - Booking reference
     - Submitted date
     - CTA buttons:
       - "Approve & Publish" (changes status to APPROVED)
       - "Reject & Remove" (removes rating, notifies user of moderation decision)
       - "Request Edit" (send message to commenter asking for revision)

2. **Moderation Decision Form (Modal)**
   - When clicking "Approve" or "Reject":
     - Headline: "Moderation Decision"
     - Message to user (optional, auto-filled templates):
       - Approve: "Your review has been published."
       - Reject: "Your review has been removed due to [reason]. Please review our community guidelines."
     - Reason dropdown (for rejection):
       - Profanity
       - Threats or harassment
       - Defamatory content
       - Off-topic
       - Duplicate review
       - Other
     - Admin notes (textarea)
     - CTA: "Confirm Decision"

3. **Flagged Reviews Archive**
   - Collapsible section: "Recently Moderated"
   - List of recently approved/rejected ratings

4. **Metrics Summary**
   - Cards showing:
     - Total ratings submitted (all-time)
     - Pending moderation (count)
     - Approved & published (count)
     - Removed (count)
     - Flagged by users (count)

**API Integration:**
- `GET /api/ratings/?status=PENDING_REVIEW` – Pending ratings
- `PATCH /api/ratings/{rating_id}/approve/` – Approve rating
- `PATCH /api/ratings/{rating_id}/reject/` – Reject rating with reason
  ```json
  {
    "reason": "defamatory_content",
    "admin_message": "Your review was removed for violating our guidelines."
  }
  ```
- `GET /api/comment-moderations/` – Moderation action history

---

#### 4.6 Booking Dispute Management

**URL:** `/admin/disputes`

**Sections:**

1. **Dispute Queue**
   - Headline: "Booking Disputes"
   - Card per disputed booking:
     - Booking ID
     - Property name
     - Tenant name
     - Agent name
     - Dispute type (if categorized):
       - Payment dispute
       - Booking cancellation
       - Agent no-show
       - Property misrepresentation
       - Other
     - Dispute description (text)
     - Submitted date
     - Status: OPEN, IN_PROGRESS, RESOLVED, CLOSED
     - CTA buttons:
       - "View Full Details" (side panel)
       - "Assign to Team Member" (dropdown)
       - "Mark Resolved" (modal)

2. **Dispute Detail Panel**
   - Booking summary (property, tenant, agent, amount)
   - Dispute timeline (chronological):
     - User submitted dispute on [date] with description
     - Admin assigned on [date]
     - Admin resolution on [date]
   - Full audit trail (all AuditLog entries related to booking)
   - Resolution actions available:
     - Issue refund (triggers refund workflow)
     - Issue strike to agent (links to strike issuance)
     - Cancel booking
     - Archive dispute

3. **Refund Workflow**
   - Button: "Process Refund"
   - Form:
     - Refund amount (pre-filled with booking payment amount)
     - Reason (dropdown: Duplicate booking, Property not as described, User request, etc.)
     - M-Pesa B2C confirmation (system initiates M-Pesa B2C transfer to tenant's phone)
   - Status tracking: PENDING, TRANSFERRED, FAILED
   - Display M-Pesa reference number

**API Integration:**
- `GET /api/booking-disputes/` – Dispute list
- `GET /api/booking-disputes/{dispute_id}/` – Dispute details
- `PATCH /api/booking-disputes/{dispute_id}/assign/` – Assign to admin
- `PATCH /api/booking-disputes/{dispute_id}/resolve/` – Mark as resolved
- `POST /api/refunds/` – Process refund

---

#### 4.7 User Management

**URL:** `/admin/users`

**Sections:**

1. **User Search & Filter**
   - Search: Email or phone number (autocomplete)
   - Filter by role: TENANT, AGENT, OWNER, ADMIN, SUPER_ADMIN
   - Filter by status: ACTIVE, SUSPENDED, DELETED

2. **User List Table/Cards**
   - Columns:
     - Name / Email
     - Phone
     - Role (badge)
     - Status (ACTIVE, SUSPENDED, DELETED)
     - Created date
     - Last login
     - Actions (View, Edit, Suspend, Delete)

3. **User Detail Panel**
   - User info: Name, email, phone, role, status
   - Account created date, last login
   - Verification status (if applicable)
   - Strike count (if agent/user)
   - Actions:
     - Change role (dropdown)
     - Soft delete (marks as deleted)
     - Suspend temporarily (date picker)
     - View activity log (AuditLog entries for user)
     - Send message (admin message to user, optional)

**API Integration:**
- `GET /api/users/` – User list
- `GET /api/users/{user_id}/` – User details
- `PATCH /api/users/{user_id}/` – Update user (role, status)
- `DELETE /api/users/{user_id}/` – Soft delete
- `GET /api/audit-log/?user_id={user_id}` – User activity

---

#### 4.8 Audit Log Viewer

**URL:** `/admin/audit-log`

**Sections:**

1. **Filter & Search**
   - Date range picker (from/to dates)
   - Actor (user autocomplete)
   - Action type (dropdown): Booking created, Payment confirmed, Strike issued, Rating approved, Property deleted, etc.
   - Entity type (dropdown): Booking, Payment, Property, User, Strike, Rating, etc.
   - Search: Free-text search in metadata

2. **Audit Log Table**
   - Columns:
     - Timestamp (sortable)
     - Actor (user name, email)
     - Action (verb)
     - Entity (entity type + ID)
     - Old value (if update)
     - New value (if update)
     - Metadata (JSON serialized)
   - Expandable rows to view full metadata

3. **Log Entry Detail Modal**
   - Full entry details:
     - Actor ID, name, email, role
     - Action timestamp (precise to millisecond)
     - Entity type and ID
     - Complete old_values and new_values (if applicable)
     - Raw metadata JSON
     - IP address (if logged)

**API Integration:**
- `GET /api/audit-log/` – Audit log entries (paginated, filterable)
  ```
  GET /api/audit-log/?date_from=2026-06-01&date_to=2026-06-08&action=booking_created&limit=20&offset=0
  ```
- `GET /api/audit-log/{entry_id}/` – Single entry detail

---

#### 4.9 Platform Settings (Super Admin Only)

**URL:** `/admin/settings`

**Sections:**

1. **General Settings**
   - Platform name
   - Logo upload
   - Support email
   - Support phone number
   - Terms of Service URL
   - Privacy Policy URL

2. **Payment Settings**
   - M-Pesa Daraja credentials (masked input)
   - Booking fee percentage or flat rate
   - Commission rate for agents
   - Minimum and maximum booking amounts

3. **Verification Settings**
   - Default verification validity period (days)
   - Field officer assignment rules
   - Evidence photo requirements

4. **Booking Settings**
   - Default lock duration (hours/days)
   - Booking fee
   - Refund policy

5. **Notification Settings**
   - Email sender address
   - SMS sender ID
   - Notification templates (edit templates for emails, SMS)

6. **Strike & Discipline Settings**
   - Strike severity point values (WARNING, MINOR, MAJOR, CRITICAL)
   - Suspension threshold (total points before auto-suspension)
   - Strike expiry duration (days before strike expires)

7. **Content Moderation Settings**
   - Auto-moderation keywords (profanity list, threat words)
   - Rating minimum display threshold (default 5)
   - Photo upload constraints (size, format, quantity)

8. **Save Settings** Button

**API Integration:**
- `GET /api/admin/settings/` – Fetch all settings
- `PATCH /api/admin/settings/` – Update settings

---

## Cross-Cutting UI Requirements

### Global Navigation Architecture

**Mobile (Authenticated Tenant):**
- Bottom tab bar (5 tabs):
  - Home (house icon)
  - Search (magnifying glass icon)
  - Bookings (calendar icon)
  - Saved (heart icon)
  - Profile (person icon)
- Floating Action Button (FAB): Not visible for tenants
- Hamburger menu (optional): For settings, notifications, help

**Mobile (Authenticated Agent):**
- Bottom tab bar (5 tabs):
  - Dashboard (dashboard icon)
  - Listings (property icon)
  - Bookings (calendar icon)
  - Payouts (money icon)
  - Profile (person icon)
- Floating Action Button (FAB): "+ New Listing" (large, sticky at bottom-right)

**Mobile (Unauthenticated):**
- Top: Search bar (tappable, collapses or expands to full search interface)
- Bottom tab bar (3 tabs):
  - Browse (home icon)
  - Saved (heart icon)
  - Account (sign in link in tab label)
- No blocking of primary experience; browsing available immediately

**Desktop/Tablet (Authenticated):**
- Top navigation bar (sticky):
  - MyKeja logo/wordmark (left align)
  - Horizontal menu: Dashboard, Properties, Bookings, Ratings (if agent)
  - Right align: Search bar, Notification bell with badge, User avatar dropdown
- Left sidebar (optional, collapsible): For admin portal, expanded by default on desktop
- Breadcrumb (if applicable): Under top nav

**Desktop/Tablet (Unauthenticated):**
- Top navigation bar (sticky):
  - MyKeja logo (left)
  - Horizontal menu: Browse, How It Works, About
  - Right align: Search, Sign In, Register
- Prominent search bar on landing page hero

**Responsive Breakpoints:**
- Mobile: < 640px
- Tablet: 640px – 1024px
- Desktop: > 1024px

---

### Authentication Screens

#### Registration Flow

**Page 1: Role Selection**
- Headline: "Join MyKeja"
- Subheading: "What brings you here?"
- Three card options:
  - "I'm Looking for a Home" (TENANT, blue card, tick icon)
  - "I'm a Realtor/Agent" (AGENT, blue card, briefcase icon)
  - "I'm a Property Owner" (OWNER, blue card, key icon)
- CTA: Click card to proceed to next step
- Link: "Already have an account? Sign In"

**Page 2: Contact Information**
- Headline: "Your Contact Information"
- Form fields:
  - Email (text input, type=email)
  - Phone number (tel input, Kenyan format +254XXXXXXXXX or 07XXXXXXXX)
  - Password (text input, type=password, with show/hide toggle)
  - Confirm Password (text input, type=password)
  - Terms checkbox: "I agree to the Terms of Service and Privacy Policy" (link to full documents)
- Password strength indicator (visual bar: Weak, Fair, Good, Strong)
- CTA: "Send OTP" (primary)
- Link: "Back"

**Page 3: OTP Verification**
- Headline: "Verify Your Phone Number"
- Subheading: "We've sent a code to +254XXXXXXXXX"
- OTP input (6 digit code, auto-advancing input, digit-by-digit or single textarea)
- Timer: "Resend code in 0:59" (countdown, clickable when expired)
- "Didn't receive a code? Resend" (secondary link)
- CTA: "Verify" (primary, disabled until 6 digits entered)
- Error handling: Show error message if OTP invalid or expired

**Page 4: Account Setup (Agent Only)**
- Headline: "Business Information"
- Form fields:
  - Full Name (text input)
  - Business Name (text input, required for agent)
  - Office Phone (tel input, optional)
  - Business Address (text input, optional)
- CTA: "Complete Registration" (primary)
- Message: "Your account is now active! You can start creating listings after verification."

**Page 5: Success Screen**
- Success icon and headline: "Welcome to MyKeja!"
- Message (role-specific):
  - Tenant: "You're all set! Browse listings, lock properties, and find your next home."
  - Agent: "You're all set! Your account is now awaiting verification. Complete the verification process to start listing properties."
  - Owner: "You're all set! Register your properties and start managing bookings."
- CTA: "Get Started" (primary, role-specific redirect)
- Link: "Go to Home Page"

#### Login Flow

**Page 1: Email/Phone Login**
- Headline: "Welcome Back"
- Toggle: "Login with Email" | "Login with Phone" (radio or tab toggle)
- Email input (if email selected) or Phone input (if phone selected)
- Password input (type=password, show/hide toggle)
- Checkbox: "Remember me" (optional)
- CTA: "Sign In" (primary)
- Links:
  - "Forgot password?" (secondary link)
  - "Don't have an account? Register" (tertiary link)

**Page 2: Forgot Password Flow**
- Headline: "Reset Your Password"
- Email or phone input
- CTA: "Send Reset Code" (primary)
- Link: "Back to Sign In"
- Upon sending: Show "Check your email/SMS for reset code" message

**Page 3: Reset Code Verification**
- Headline: "Verify Reset Code"
- OTP input (6 digits)
- Timer and resend link (similar to registration)
- CTA: "Verify" (primary)

**Page 4: New Password Entry**
- Headline: "Create New Password"
- Form fields:
  - New Password (with strength indicator)
  - Confirm Password
- CTA: "Reset Password" (primary)

**Page 5: Success**
- Message: "Password successfully reset. You can now sign in with your new password."
- CTA: "Go to Sign In"

---

### Notification System

#### Notification Centre

**URL:** `/notifications` or modal accessible from top nav

**Layout:** Modal, side panel, or dedicated page

**Sections:**

1. **Header**
   - Headline: "Notifications"
   - Unread count badge (if > 0)
   - Clear all button (tertiary link, only if unread notifications exist)

2. **Notification List**
   - Grouped by date (Today, Yesterday, Last Week, etc.)
   - Each notification card shows:
     - Icon (context-specific: booking, payment, rating, strike, etc.)
     - Headline (bold, 14px body large)
     - Description (secondary text, 12px body small)
     - Time ago (e.g., "2 hours ago")
     - Unread indicator (blue dot on left or background highlight if unread)
     - Read/Unread toggle (on hover, or in dropdown menu)
   - Tap notification: Navigate to relevant page (booking detail, property detail, rating, etc.)

3. **Notification Types**
   - **Booking Status Change**
     - "Your booking for [property name] is now [status]"
     - Icon: Calendar/booking
   - **Payment Confirmation**
     - "Payment of KES X,XXX received for [property name]"
     - Icon: Money/check
   - **Visit Reminder**
     - "Your visit to [property name] is scheduled for [date]. Don't forget to confirm!"
     - Icon: Calendar/bell
   - **Rating Request**
     - "Rate your experience at [property name]"
     - Icon: Star
   - **Strike Issued**
     - "You've received a [type] strike for [reason]"
     - Icon: Warning/exclamation
   - **Verification Update**
     - "Your account verification status has been updated to [status]"
     - Icon: Check/shield
   - **Agent Notification (Booking)**
     - "New booking for [property name] by [tenant name]"
     - Icon: Booking
   - **New Rating Received**
     - "[Tenant name] rated your property/service [score/5]"
     - Icon: Star

4. **Empty State**
   - Icon: Bell with slash
   - Headline: "No Notifications Yet"
   - Message: "You'll see notifications here when important events happen"

5. **Notification Preferences Link**
   - Bottom of notification centre: "Notification Settings" link (navigates to settings page)

**API Integration:**
- `GET /api/notifications/?user_id={user_id}&limit=20&offset=0` – Notification list
- `PATCH /api/notifications/{notification_id}/read/` – Mark as read
- `PATCH /api/notifications/` – Mark all as read (batch)
- `DELETE /api/notifications/{notification_id}/` – Delete notification
- `GET /api/notification-preferences/{user_id}/` – User preferences
- `PATCH /api/notification-preferences/{user_id}/` – Update preferences

---

### Notification Preferences Settings

**URL:** `/settings/notifications`

**Sections:**

1. **Email Notifications Toggle**
   - Label: "Email Notifications"
   - Toggle: On / Off
   - If On, checkboxes for:
     - ☐ Booking status updates
     - ☐ Payment confirmations
     - ☐ Ratings and reviews
     - ☐ Agent updates
     - ☐ Platform announcements

2. **SMS Notifications Toggle**
   - Label: "Text Message (SMS) Notifications"
   - Toggle: On / Off
   - Checkboxes for notification types (same as email)
   - Note: "Standard SMS rates may apply"

3. **Push Notifications Toggle** (if app installed)
   - Label: "Push Notifications"
   - Toggle: On / Off
   - Checkboxes for notification types

4. **Notification Frequency**
   - Radio group:
     - Immediate (as events happen)
     - Daily digest (once per day)
     - Weekly digest (once per week)

5. **Save Button**
   - CTA: "Save Preferences" (primary)

---

### Error Boundaries & Edge Cases

#### Error Boundary Screen

**Layout:** Full page, centered

**Sections:**
- Icon: Sad emoji or error illustration
- Headline: "Something Went Wrong"
- Message: "We've encountered an unexpected error. Please try again or contact support."
- Error code (small, secondary): "Error code: ERR_500_INTERNAL"
- CTAs:
  - "Reload Page" (primary)
  - "Go to Home" (secondary)
  - "Contact Support" (tertiary link)

#### Network Error Screen

**Headline:** "Connection Lost"
**Message:** "Check your internet connection and try again."
**CTA:** "Retry" (primary)

#### Session Expired Screen

**Headline:** "Session Expired"
**Message:** "Your session has expired for security reasons. Please sign in again."
**CTA:** "Sign In" (primary)

#### Maintenance Mode Screen

**Headline:** "Under Maintenance"
**Message:** "MyKeja is temporarily down for maintenance. We'll be back soon!"
**Estimated time:** "Expected to be back online by 02:00 AM"

#### 404 Page

**URL:** `/*` (any undefined route)
**Headline:** "Page Not Found"
**Message:** "The page you're looking for doesn't exist."
**CTAs:**
- "Go to Home" (primary)
- "Browse Listings" (secondary)

---

## Server-Side Rendering and SEO Specification

### Pages Requiring SSR

**Critical for SEO & Performance:**

1. **Landing Page** (`/`)
   - Full HTML generation
   - Meta tags: og:title, og:description, og:image
   - Schema: Organization, LocalBusiness
   - Sitemap inclusion

2. **Search Results Page** (`/properties?location=...&type=...&price_min=...`)
   - Dynamic meta tags based on filters
   - Schema: SearchResultsPage
   - Canonical URL (same page with different filter=same result)
   - URL slug format for SEO (e.g., `/properties/kahawa-sukari/apartments?price_max=50000`)

3. **Property Detail Page** (`/properties/{property_id}`)
   - Critical
   - Meta tags: og:title (property title), og:description (location + price + description), og:image (feature internal photo)
   - Twitter Card: twitter:card, twitter:title, twitter:description, twitter:image
   - Schema: RealEstateListing with full structured data
   - Canonical URL (handle duplicate content)
   - Open Graph for social sharing preview

4. **Agent Profile Page** (if public) (`/agents/{agent_id}`)
   - Meta tags: og:title (agent name), og:description (ratings, listings count), og:image (agent photo)
   - Schema: Person, LocalBusiness
   - Canonical URL

5. **Neighborhood/Area Pages** (Optional) (`/properties/kilimani` or `/areas/kilimani`)
   - Area overview with listed properties
   - Meta tags: area-specific SEO (e.g., "Apartments in Kilimani")
   - Schema: LocalBusiness, SearchResultsPage

### SSR Implementation Details

**Framework Options:**
- Next.js (recommended for React + SSR + Vercel deployment)
- Nuxt.js (if Vue)

**Meta Tag Generation:**

```
Page: /properties/123456 (Property Detail)

<title>3-Bed Apartment in Kahawa Sukari | MyKeja</title>
<meta name="description" content="Verified 3-bedroom apartment in Kahawa Sukari from agent Jane Realty. Lock for 3 days. Secure M-Pesa payment. KES 35,000/month.">
<meta property="og:title" content="3-Bed Apartment in Kahawa Sukari | MyKeja">
<meta property="og:description" content="Verified apartment listing with photos and guaranteed locking system.">
<meta property="og:image" content="[internal_feature_photo_url]">
<meta property="og:url" content="https://mykeja.co.ke/properties/123456">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="3-Bed Apartment in Kahawa Sukari | MyKeja">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="[internal_feature_photo_url]">
<link rel="canonical" href="https://mykeja.co.ke/properties/123456">
```

**Structured Data (JSON-LD):**

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "3-Bed Apartment in Kahawa Sukari",
  "description": "Full property description...",
  "image": ["[internal_photo_1_url]", "[internal_photo_2_url]"],
  "price": {
    "@type": "PriceSpecification",
    "priceCurrency": "KES",
    "price": "35000",
    "pricePeriod": "P1M"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kahawa Sukari",
    "addressRegion": "Nairobi",
    "addressCountry": "KE"
  },
  "url": "https://mykeja.co.ke/properties/123456",
  "agent": {
    "@type": "RealEstateAgent",
    "name": "Jane Realty",
    "image": "[agent_photo_url]"
  },
  "numberOfRooms": 3,
  "numberOfBathroomsUnitComplete": 2
}
```

### URL Structure for SEO

**Readable, filter-friendly URLs:**

```
Landing Page:
/

Search Results (with filters encoded in URL):
/properties
/properties?location=nairobi
/properties?location=kahawa_sukari&type=apartment&price_max=50000
/properties/kahawa-sukari (slug-based, redirects or supports)

Property Detail:
/properties/{property_id}
/properties/3-bed-apartment-kahawa-sukari-{property_id} (with slug prefix, if desired)

Agent Profile:
/agents/{agent_id}
/agents/jane-realty-{agent_id}

Area/Neighborhood Pages (optional):
/areas/kahawa-sukari
/areas/kilimani
```

**Query Parameter Best Practices:**
- Use kebab-case for multi-word values: `location=kahawa-sukari`
- Preserve order: Canonical URL should have consistent parameter order
- Implement canonical link tag for filter variations

### Sitemap Generation

**Endpoints to crawl:**
- `/` (landing page)
- `/properties` (search results, paginated)
- `/properties/{property_id}` (each property)
- `/agents/{agent_id}` (each agent profile if public)
- `/areas/{area_slug}` (each neighbourhood/area)

**Sitemap file:** `/sitemap.xml`

**Example sitemap entry:**
```xml
<url>
  <loc>https://mykeja.co.ke/properties/123456</loc>
  <lastmod>2026-06-08</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

### Open Graph & Social Sharing

**Share Preview (WhatsApp, Twitter, Facebook, LinkedIn):**
- When user shares property link in messaging or social apps
- Preview shows: Property title, general location, price, internal feature photo
- Link redirects to property detail page

---

## Accessibility and Performance Requirements

### WCAG 2.1 Level AA Compliance

**Contrast Ratios:**
- All text (primary & secondary) on glass surfaces must meet 4.5:1 contrast ratio
- Test glass card text against actual background content (images, colors behind glass)
- Dark theme: text on dark surface must be light enough (e.g., white on dark blue)
- Light theme: text on light surface must be dark enough
- Use contrast checker tools; test with actual component implementations

**Touch Targets:**
- All interactive elements: minimum 44 x 44 pixels (CSS pixels, not device pixels)
- Buttons, links, form inputs, toggles, checkboxes must meet this target
- Padding/margin can extend touch target area

**Focus Indicators:**
- Keyboard navigation (Tab key) must show visible focus outline
- Focus outline colour must have 3:1 contrast ratio
- Avoid relying on color alone to communicate state

**Form Accessibility:**
- All form inputs must have associated labels (using `<label for="">` or ARIA labels)
- Error messages must be linked to input via `aria-describedby`
- Required fields must be marked with * and also programmatically indicated (e.g., `required` attribute or `aria-required="true"`)

**Alternative Text:**
- All images must have descriptive alt text (avoid "image", "photo")
- Example: `alt="Living room with sofa and balcony view, 3-bedroom apartment"`

**Screen Reader Support:**
- Use semantic HTML (buttons, links, form elements)
- Use ARIA roles and labels where semantic HTML insufficient
- Announce loading states, errors, and dynamic content updates
- Test with screen readers (NVDA, JAWS, or Mac VoiceOver)

**Motion & Animation:**
- Respect `prefers-reduced-motion` media query
- Avoid auto-playing animations for users who prefer reduced motion
- Provide pause/stop controls for animations

### Performance Targets

**Target Metrics (on mid-range Android phone, 4G connection):**

1. **Landing Page Load:** < 2 seconds (Largest Contentful Paint – LCP)
2. **Search Results Page Load:** < 3 seconds (LCP)
3. **Property Detail Page Load:** < 2.5 seconds (LCP)

**Image Optimization:**
- Use modern image formats: WebP with JPEG fallback
- Lazy load images below the fold
- Use Low-Quality Image Placeholder (LQIP) technique:
  - Tiny blurred placeholder image loads first (10-50KB)
  - Full image loads asynchronously
- Implement responsive images: `<srcset>` for multiple viewport sizes
- Compress images: No image larger than 200KB (unless full-screen hero)

**Skeleton Loading:**
- Show skeleton placeholders while content loads
- Skeleton layout should match actual content layout
- Duration: 1.6s ease-in-out pulse animation
- Avoid layout shift: Skeleton should reserve space matching final content

**Code Splitting:**
- Split React bundles by route (lazy-load agent portal separately from tenant portal)
- Minimize main bundle size: Target < 150KB (gzipped) for initial page load
- Dynamic imports for heavy components (modals, complex forms)

**Caching & Service Workers:**
- Implement service workers for offline support (optional, but recommended for mobile)
- Cache static assets (CSS, JS, fonts) with long-term cache headers
- Cache API responses intelligently (property listings can cache for 1 hour, user bookings update frequently)

**API Response Times:**
- Property listing query: < 200ms response time
- Payment initiation: < 500ms response time
- Booking status check (polling): < 300ms response time

**Database Query Optimization:**
- Index on frequently filtered columns: `location`, `property_type`, `price`, `agent_id`, `status`
- Use database connection pooling
- Implement query result caching (Redis) for property listings, agent stats

---

## Deliverable Structure for Frontend Team

### Documentation Package Contents

The frontend development team will receive:

1. **This UI Design Brief** (document you're reading)
2. **GETTING_STARTED.md** (environment setup, development commands)
3. **MODELS_SUMMARY.md** (complete data model reference)
4. **technical_design.md** (system architecture, payment flow, locking mechanism)
5. **Design System Figma File** (or equivalent):
   - Colour tokens (light & dark theme)
   - Typography scale
   - Component library (buttons, inputs, cards, modals, etc.)
   - Layout grid, spacing tokens
   - Motion/animation specifications
6. **Component Hierarchy & State Management Guide**
7. **API Integration Specification** (endpoint reference with request/response examples)

### Component Hierarchy for React Implementation

**Recommended folder structure:**

```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── BottomSheet.tsx
│   │   ├── Skeleton.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── NotificationCenter.tsx
│   ├── layout/
│   │   ├── TopNavBar.tsx
│   │   ├── BottomTabBar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MainLayout.tsx
│   │   └── AdminLayout.tsx
│   ├── forms/
│   │   ├── PropertyForm.tsx (multi-step)
│   │   ├── BookingForm.tsx
│   │   ├── RatingForm.tsx
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── FormField.tsx
│   ├── auth/
│   │   ├── ProtectedRoute.tsx
│   │   ├── RoleGate.tsx
│   │   └── AuthProvider.tsx
│   ├── portal-public/
│   │   ├── LandingPage.tsx
│   │   ├── SearchResults.tsx
│   │   ├── PropertyDetail.tsx
│   │   ├── BookingFlow.tsx
│   │   ├── TenantDashboard.tsx
│   │   └── RatingFlow.tsx
│   ├── portal-agent/
│   │   ├── AgentDashboard.tsx
│   │   ├── PropertyListing.tsx
│   │   ├── BookingManagement.tsx
│   │   ├── VerificationStatus.tsx
│   │   ├── RatingsReceived.tsx
│   │   └── PayoutHistory.tsx
│   ├── portal-admin/
│   │   ├── AdminDashboard.tsx
│   │   ├── AgentVerification.tsx
│   │   ├── PropertyModeration.tsx
│   │   ├── StrikeManagement.tsx
│   │   ├── RatingsModeration.tsx
│   │   ├── AuditLogViewer.tsx
│   │   └── PlatformSettings.tsx
│   └── shared/
│       ├── PropertyCard.tsx
│       ├── AgentCard.tsx
│       ├── BookingCard.tsx
│       ├── RatingDisplay.tsx
│       └── StatusBadge.tsx
├── pages/
│   ├── index.tsx (landing)
│   ├── properties/
│   │   ├── index.tsx (search)
│   │   └── [id].tsx (detail)
│   ├── auth/
│   │   ├── register.tsx
│   │   └── login.tsx
│   ├── dashboard/
│   │   ├── [role]/
│   │   │   ├── index.tsx
│   │   │   └── [...path].tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useBooking.ts
│   ├── useProperty.ts
│   ├── usePayment.ts
│   ├── useNotifications.ts
│   └── usePagination.ts
├── services/
│   ├── api.ts (API client setup)
│   ├── auth.ts (auth API calls)
│   ├── properties.ts (property API calls)
│   ├── bookings.ts (booking API calls)
│   ├── payments.ts (payment API calls)
│   ├── ratings.ts (rating API calls)
│   └── admin.ts (admin API calls)
├── context/
│   ├── AuthContext.tsx
│   ├── NotificationContext.tsx
│   └── BookingContext.tsx
├── types/
│   ├── models.ts (TypeScript types for all models)
│   ├── api.ts (API request/response types)
│   └── enums.ts (status, role enums)
├── styles/
│   ├── globals.css
│   ├── tokens.css (design tokens: colors, spacing, typography)
│   ├── components.css
│   └── animations.css
├── utils/
│   ├── format.ts (date, currency formatting)
│   ├── validation.ts (form validation)
│   ├── auth.ts (JWT token management)
│   └── api-error-handler.ts (centralized error handling)
└── lib/
    ├── axios-instance.ts (API client configuration)
    ├── socket.ts (WebSocket for real-time notifications, optional)
    └── storage.ts (localStorage/sessionStorage helpers)
```

### State Management Recommendation

**Option 1: React Context + Custom Hooks (Lightweight)**
- Use context for global state: Auth, notifications, theme
- Use custom hooks for domain logic: `useAuth()`, `useBookings()`, `useNotifications()`
- Use local component state for UI state (modals, forms, filters)

**Option 2: Redux / Zustand (Enterprise Scale)**
- Redux for predictable, scalable state
- Middleware for side effects (async actions, API calls)
- DevTools for debugging

**Recommended for MyKeja:** Context + hooks initially, migrate to Zustand as complexity grows (Zustand is lighter than Redux).

### API Integration Points

**All API calls must:**
1. Include JWT bearer token in Authorization header (from `useAuth()`)
2. Handle 401 (Unauthorized) errors by refreshing token or redirecting to login
3. Show loading skeleton while fetching
4. Display error toast on failure
5. Implement exponential backoff retry for network errors (max 3 attempts)
6. Cache responses intelligently (TTL-based or event-based invalidation)

**Example API hook:**

```typescript
// hooks/useProperty.ts
export const useProperty = (propertyId: string) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await apiClient.get(`/properties/${propertyId}/`);
        setProperty(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  return { property, loading, error };
};
```

---

## Implementation Notes for Development Team

### Critical Considerations

1. **Payment Flow Robustness:**
   - M-Pesa STK Push timeout handling (30-60 second wait)
   - Webhook callback verification (HMAC signature validation)
   - Idempotency keys to prevent duplicate payments
   - Recovery flow if callback received but not acknowledged by frontend

2. **Booking Lock Consistency:**
   - Redis lock acquired **before** creating booking record
   - Lock expiry monitored by background job
   - Race condition handling: Validate property still AVAILABLE before locking
   - Graceful degradation if Redis unavailable (fallback to database flag)

3. **Permission & Authorization:**
   - All API endpoints must check user role and resource ownership
   - Example: Agent can only modify their own properties and bookings
   - Tenant can only view bookings they created
   - Admin has platform-wide access
   - Implement permission checks both frontend (UX) and backend (security)

4. **Photo Access Control:**
   - Frontend must respect payment-gated photo visibility
   - Backend must enforce: Only return external photos if user PAID
   - Lazy-load external photos; show blur overlay with lock icon until unlocked

5. **Location Data Sensitivity:**
   - Never expose specific GPS coordinates in API responses for unpaid users
   - Frontend must filter location data before display
   - Map components should never load interactive map for unpaid users

6. **Real-Time Notifications:**
   - Use WebSocket (Socket.io or native WebSocket) for instant notifications
   - Fallback to polling if WebSocket unavailable
   - Notification badge updates immediately when new notification arrives
   - Offline support: Store notifications in localStorage, sync when online

7. **Offline Support (Optional but Recommended):**
   - Cache property listings locally
   - Allow browsing offline (read-only)
   - Queue booking actions, sync when online
   - Show offline indicator in UI

### Testing Strategy

1. **Unit Tests:**
   - Component snapshot tests
   - Hook logic tests
   - Utility function tests
   - Form validation tests

2. **Integration Tests:**
   - Login/logout flow
   - Property search and filtering
   - Booking creation and payment flow
   - Rating submission and moderation

3. **E2E Tests (Cypress or Playwright):**
   - End-to-end user journeys:
     - Tenant browsing, booking, paying, rating
     - Agent creating listing, managing bookings
     - Admin approving verification, issuing strikes
   - Mobile and desktop viewports
   - Error scenarios and edge cases

4. **Performance Tests:**
   - Lighthouse scores (target: 90+ on desktop, 80+ on mobile)
   - Load testing: Simulate 1000 concurrent users
   - API response time monitoring

### Deployment & DevOps

1. **Frontend Deployment:**
   - Build: `npm run build` (Next.js static generation + SSR)
   - Deploy to: Vercel (recommended), AWS Amplify, or DigitalOcean App Platform
   - Enable automatic deployments on git push (CI/CD pipeline)
   - CDN for static assets (CSS, JS, images)

2. **Environment Variables:**
   - `.env.local` (development)
   - `.env.production` (production)
   - Critical vars: `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_SENTRY_DSN` (error tracking), `STRIPE_PUBLIC_KEY` (if using Stripe for payments)

3. **Monitoring & Error Tracking:**
   - Integrate Sentry for frontend error tracking
   - Track user interactions with analytics (Google Analytics, Mixpanel)
   - Monitor API response times and error rates
   - Alert on critical errors (payment failures, auth failures)

4. **Localization (Future):**
   - Structure i18n from the start
   - All user-facing text in `public/locales/` (e.g., `en/common.json`)
   - Support Swahili + English initially
   - Use `next-i18next` or similar library

---

## Final Implementation Checklist

- [ ] Design tokens (colours, typography, spacing) implemented in CSS/Tailwind
- [ ] Component library built and documented (Storybook optional but recommended)
- [ ] Landing page with glassmorphic hero and search bar
- [ ] Search results page with SEO-friendly URL structure
- [ ] Property detail page with payment-gated photo carousel and location
- [ ] Booking and payment flow (5 steps: summary, payment init, waiting, confirmation)
- [ ] Tenant dashboard with active bookings and visit confirmation
- [ ] Rating submission flow with structured metrics
- [ ] Agent dashboard with summary cards and quick actions
- [ ] Property listing creation (5-step multi-form)
- [ ] Agent booking management and verification status page
- [ ] Admin dashboard with key metrics and alert banners
- [ ] Agent verification, property moderation, strike management portals
- [ ] Ratings moderation queue with flagged content review
- [ ] Authentication flow (registration, login, password reset, OTP)
- [ ] Notification centre with in-app notifications
- [ ] Global navigation (responsive mobile/tablet/desktop)
- [ ] Error boundaries and edge case screens
- [ ] SSR implementation for landing, search, property detail pages
- [ ] SEO: Meta tags, structured data, Open Graph, canonical URLs, sitemap
- [ ] Accessibility: WCAG 2.1 AA compliance, contrast ratios, touch targets, screen reader support
- [ ] Performance: Images lazy-loaded, skeleton loading, < 3s page load
- [ ] API integration: All endpoints integrated with error handling, auth tokens
- [ ] Testing: Unit, integration, E2E, performance
- [ ] Deployment: CI/CD pipeline, environment variables, monitoring

---

**This prompt is now ready for a frontend development team. All design decisions are specified, all pages are outlined with functionality, all API integration points are mapped, and accessibility and performance targets are defined.**

**Hand to frontend team with:** GETTING_STARTED.md, MODELS_SUMMARY.md, technical_design.md, rating_design.md, and Figma design system file (if available).
