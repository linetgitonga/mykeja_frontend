# MyKeja Frontend Implementation Guide
**Version**: 1.0 | **Date**: June 8, 2026 | **Status**: Ready for Development

---

## Overview

This guide ties together all design specifications and provides a step-by-step implementation roadmap for the MyKeja frontend.

### Documentation Map

| Document | Purpose | Read First? |
|----------|---------|-------------|
| **AGENTS.md** | Complete UI/UX brief with all page specifications | ✅ YES |
| **DESIGN_SYSTEM.md** | Design tokens, colors, typography, spacing | ✅ YES |
| **PAGES_SPECIFICATION.md** | Detailed page layouts and component hierarchy | ✅ After DESIGN_SYSTEM |
| **COMPONENT_LIBRARY.md** | Reusable component specifications with props | ✅ After PAGES |
| **FRONTEND_IMPLEMENTATION_GUIDE.md** | This document – implementation roadmap | You are here |
| **technical_design.md** | Backend architecture & API specifications | ✅ Parallel reading |
| **rating_design.md** | Rating system design and moderation | ✅ Parallel reading |

---

## Project Setup

### Technology Stack (Recommended)

**Framework:** Next.js 14+ (React 18+)
- SSR for SEO (landing, search, property detail)
- Static generation for marketing pages
- API routes for webhooks (M-Pesa callbacks)

**Styling:** Tailwind CSS + CSS Modules
- Extend Tailwind with design tokens
- CSS Modules for component-scoped styles
- Dark mode support via `prefers-color-scheme`

**State Management:** React Context + Custom Hooks
- AuthContext for authentication
- NotificationContext for in-app alerts
- Custom hooks: useAuth, useProperty, useBooking, usePayment

**UI Library:** Build from scratch using component library specs
- Or use shadcn/ui as base (customize colors/styles)
- Implement accessibility requirements per WCAG 2.1 AA

**HTTP Client:** Axios with interceptors
- JWT token refresh on 401
- Exponential backoff retry logic
- Request/response logging

**Form Management:** React Hook Form + Zod
- Lightweight, performant form state
- Zod for runtime validation
- Integrates well with custom components

**Testing:** Vitest + React Testing Library
- Unit tests for components
- Integration tests for flows
- E2E tests with Playwright

**Error Tracking:** Sentry
- Frontend error monitoring
- User session replay
- Performance monitoring

**Analytics:** Mixpanel or Segment
- Track user journeys
- Monitor conversion funnel
- Event-based analytics

### Project Structure

```
mykeja-frontend/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable components (Button, Card, Input, etc.)
│   │   ├── layout/           # Layout components (TopNav, BottomTab, etc.)
│   │   ├── forms/            # Form-specific components
│   │   ├── portal-public/    # Public tenant pages
│   │   ├── portal-agent/     # Agent dashboard pages
│   │   ├── portal-admin/     # Admin pages
│   │   └── shared/           # Shared across portals (PropertyCard, AgentCard)
│   ├── pages/
│   │   ├── index.tsx         # Landing page
│   │   ├── properties/
│   │   │   ├── index.tsx     # Search results
│   │   │   └── [id].tsx      # Property detail
│   │   ├── auth/
│   │   │   ├── register.tsx
│   │   │   └── login.tsx
│   │   ├── dashboard/
│   │   │   ├── [role]/
│   │   │   │   ├── index.tsx
│   │   │   │   └── [...path].tsx
│   │   └── api/              # API routes (webhooks)
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useBooking.ts
│   │   ├── useProperty.ts
│   │   ├── usePayment.ts
│   │   ├── useNotifications.ts
│   │   └── usePagination.ts
│   ├── services/
│   │   ├── api.ts            # API client setup
│   │   ├── auth.ts
│   │   ├── properties.ts
│   │   ├── bookings.ts
│   │   ├── payments.ts
│   │   ├── ratings.ts
│   │   └── admin.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── NotificationContext.tsx
│   │   └── BookingContext.tsx
│   ├── types/
│   │   ├── models.ts         # TypeScript types (from backend models)
│   │   ├── api.ts            # API request/response types
│   │   └── enums.ts          # Enums (status, roles, etc.)
│   ├── styles/
│   │   ├── globals.css       # Global resets, typography
│   │   ├── tokens.css        # Design tokens (colors, spacing, etc.)
│   │   ├── components.css    # Component styles (CSS Modules)
│   │   └── animations.css    # Animation keyframes
│   ├── utils/
│   │   ├── format.ts         # Date, currency, phone formatting
│   │   ├── validation.ts     # Form & data validation
│   │   ├── auth.ts           # JWT token management
│   │   └── api-error-handler.ts
│   ├── lib/
│   │   ├── axios-instance.ts # Configured axios
│   │   ├── socket.ts         # WebSocket (for notifications)
│   │   └── storage.ts        # localStorage/sessionStorage helpers
│   └── assets/
│       ├── icons/
│       ├── images/
│       └── fonts/
├── public/
│   ├── locales/              # i18n (future: Swahili)
│   ├── sitemap.xml
│   └── robots.txt
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.local                # Development env vars
├── .env.production           # Production env vars
├── next.config.js            # Next.js config
├── tailwind.config.js        # Tailwind config (extend with design tokens)
├── tsconfig.json             # TypeScript config
└── package.json
```

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)

**Goal:** Setup project structure, design system, and base components

**Tasks:**

1. **Repository Setup**
   - Initialize Next.js project: `npx create-next-app@latest mykeja-frontend --typescript --tailwind`
   - Configure TypeScript strict mode
   - Setup git hooks (husky + prettier)

2. **Design System Implementation**
   - Create `styles/tokens.css` with all design tokens
   - Configure Tailwind `extend` object in `tailwind.config.js`
   - Import tokens in `styles/globals.css`
   - Setup dark mode via `prefers-color-scheme`

3. **Core Components** (Build 10 priority components)
   - Button (all variants)
   - Card (glass, elevated, flat)
   - Input (text, email, tel, password)
   - Modal
   - Badge
   - Skeleton
   - Toast
   - Dropdown / Select
   - Tabs
   - Grid / Container / Stack layout

4. **Authentication Context**
   - Create AuthContext.tsx
   - Setup useAuth() hook
   - Create JWT token management utilities
   - Protected routes with ProtectedRoute component

5. **API Client Setup**
   - Configure axios instance with interceptors
   - Setup JWT token refresh logic
   - Error handling middleware
   - Create service files: auth.ts, properties.ts, etc.

6. **Testing Setup**
   - Configure Vitest
   - Setup React Testing Library
   - Write tests for Button, Input, Card components
   - Achieve 80%+ coverage for core components

**Deliverables:**
- Functional component library in Storybook
- Design tokens applied globally
- API client ready for integration
- Auth flow scaffolding

---

### Phase 2: Public Pages (Weeks 3-4)

**Goal:** Implement public-facing pages (landing, search, property detail)

**Tasks:**

1. **Landing Page (`/`)**
   - Implement all sections from PAGES_SPECIFICATION.md
   - Fetch featured listings from API
   - SEO: Meta tags, structured data (Organization schema)
   - Server-side render for performance

2. **Search Results Page (`/properties`)**
   - Implement filter panel (location, type, price, amenities)
   - Property listing grid with infinite scroll or pagination
   - Map component (Mapbox or Google Maps)
   - Responsive: 1 col mobile, 2 col tablet, 3 col desktop
   - Lazy-load images with LQIP
   - SEO: Dynamic meta tags, SearchResultsPage schema

3. **Property Detail Page (`/properties/{id}`)**
   - Photo gallery with internal/external separation (payment-gated)
   - Property details grid
   - Location section (payment-gated GPS coordinates)
   - Amenities section
   - Agent card with rating display + strike indicator
   - Related listings carousel
   - SEO: RealEstateListing schema, OpenGraph

4. **Components Built:**
   - PropertyCard (with favourites toggle)
   - AgentCard (with verification badge)
   - PhotoCarousel (with blur overlay for locked photos)
   - LocationMap (general area view only for unpaid users)
   - SkeletonLoading states for all pages

5. **Integration:**
   - API: `GET /api/v1/properties/` (featured, search, detail)
   - API: `GET /api/v1/locations/popular/`, `/autocomplete/`
   - API: `GET /api/v1/agents/{agent_id}/`
   - Error handling + network retry logic
   - Loading states (skeleton cards)

**Performance Targets:**
- Landing: LCP < 2s
- Search: LCP < 3s
- Property Detail: LCP < 2.5s
- All images: WebP with fallback, lazy-loaded

**Testing:**
- Integration tests for each page
- E2E tests for search flow
- Performance audit (Lighthouse 80+)

**Deliverables:**
- 3 public pages fully functional
- SEO implementation verified
- Images optimized
- Mobile & desktop responsive

---

### Phase 3: Authentication (Week 5)

**Goal:** Implement registration, login, password reset flows

**Tasks:**

1. **Registration Flow (`/auth/register`)**
   - Step 1: Role selection (Tenant, Agent, Owner)
   - Step 2: Contact info (email, phone, password)
   - Step 3: OTP verification (SMS)
   - Step 4: Account setup (Agent-specific fields)
   - Step 5: Success screen

2. **Login Flow (`/auth/login`)**
   - Email/phone toggle
   - Password input with show/hide
   - "Forgot password?" link

3. **Password Reset Flow**
   - Send reset code (email/SMS)
   - OTP verification
   - New password entry
   - Confirmation

4. **Components:**
   - PhoneNumberInput (Kenyan format validation)
   - PasswordStrengthIndicator
   - OtpInput (6-digit auto-advancing)
   - FormField (with labels, errors, helpers)

5. **Integration:**
   - API: `POST /api/v1/auth/register/`
   - API: `POST /api/v1/auth/login/`
   - API: `POST /api/v1/auth/request-reset/`
   - API: `POST /api/v1/auth/verify-otp/`
   - Token storage: localStorage (JWT + refresh)
   - Auto-refresh token on 401

6. **Security:**
   - Password validation (8+ chars, mix of types)
   - CSRF protection (if using traditional forms)
   - Rate limiting (backend-enforced)
   - Secure token storage

**Deliverables:**
- All auth screens functional
- Token management working
- Protected routes enforced
- Error handling + validation

---

### Phase 4: Booking & Payment Flow (Week 6)

**Goal:** Implement booking summary, M-Pesa integration, confirmation

**Tasks:**

1. **Booking Flow (`/properties/{id}/book`)**
   - Step 1: Summary (property details, price breakdown, visit date picker)
   - Step 2: M-Pesa initiation (phone input, instructions)
   - Step 3: Waiting state (polling or WebSocket for status)
   - Step 4: Confirmation (success/failure)

2. **Payment Integration**
   - API: `POST /api/v1/payments/initiate-stk/` (STK Push)
   - Poll: `GET /api/v1/payments/{payment_id}/status/`
   - Webhook: Handle M-Pesa callback at `/api/webhooks/mpesa/`
   - Update booking status: PENDING → PAID
   - Unlock gated content (external photos, GPS coords)

3. **Error Handling**
   - Timeout after 2 minutes
   - Network error recovery
   - Payment failure states
   - Property no-longer-available error

4. **Components:**
   - PriceBreakdownCard
   - BookingSummary
   - PaymentWaitingLoader (animated spinner)
   - ConfirmationScreen (success/failure variants)

5. **State Management**
   - usePayment() hook (manage payment flow state)
   - BookingContext (share booking data across steps)
   - LocalStorage backup (recover if page closed)

**Testing:**
- E2E test: Complete booking flow (mock M-Pesa)
- Error scenario tests (timeout, network failure)
- Payment confirmation verification

**Deliverables:**
- Full booking flow functional
- M-Pesa integration working (sandbox)
- Payment confirmation reliable
- Unlock animation on success

---

### Phase 5: Tenant Dashboard (Week 7)

**Goal:** Implement authenticated tenant experience

**Tasks:**

1. **Tenant Dashboard (`/dashboard`)**
   - Active bookings section (with status badges)
   - Visit confirmation flow (modal: visited, not visited, agent absent)
   - Saved properties (favourites)
   - Rating history
   - Profile / Logout

2. **Rating Submission (`/bookings/{id}/rate`)**
   - Tabbed interface: Rate Agent, Rate Property, Overall
   - Structured metrics (sliders or star pickers)
   - Optional comment textarea
   - Moderation notice
   - Confirmation screen

3. **Booking State Machine**
   - PENDING: "Complete Payment" button
   - LOCKED: Show countdown timer, "Awaiting Payment"
   - PAID: Show property details, "Confirm Visit" (if past date)
   - VIEWED: Show "Leave a Rating" (if not yet rated)

4. **Components:**
   - BookingCard (with dynamic CTAs)
   - VisitConfirmationModal
   - RatingForm (tabs + metrics)
   - SavedPropertiesGrid

5. **Integration:**
   - API: `GET /api/v1/bookings/` (active, history)
   - API: `PATCH /api/v1/bookings/{id}/confirm-visit/`
   - API: `POST /api/v1/ratings/`
   - API: `GET /api/v1/saved-properties/`

**Deliverables:**
- Tenant dashboard fully functional
- Rating submission flow complete
- Visit confirmation working
- All tenant workflows tested

---

### Phase 6: Agent Portal (Weeks 8-9)

**Goal:** Implement agent listing creation and management

**Tasks:**

1. **Agent Dashboard (`/agent/dashboard`)**
   - Status banner (verification status)
   - Summary cards (listings, bookings, rating, strikes)
   - Quick action strip
   - Recent activity feed

2. **Property Listing Creation (`/agent/listings/new`)**
   - 5-step form (basic info, location, photos, amenities, review)
   - Multi-file photo upload with drag-drop
   - Photo classification (INTERNAL vs EXTERNAL)
   - Feature image selection
   - Draft auto-save

3. **Property Listing Management (`/agent/listings`)**
   - List view with filters (status, sort)
   - Edit, view stats, deactivate actions
   - Status badges per property

4. **Bookings Management (`/agent/bookings`)**
   - List of bookings per agent's properties
   - Status filtering
   - View booking details (tenant info if PAID)
   - Confirm visit status (if visit date passed)

5. **Verification Status Page (`/agent/verification`)**
   - Current status display
   - Progress checklist
   - Evidence photos (if in-progress)
   - FAQ section

6. **Ratings Received (`/agent/ratings`)**
   - Rating summary card (average + count)
   - Distribution chart (5-star breakdown)
   - Metric breakdown (professionalism, honesty, punctuality)
   - Approved ratings list

7. **Payout History (`/agent/payouts`)**
   - Monthly earnings display
   - Payout method setup (M-Pesa number)
   - Payout history table (status, amount, date, M-Pesa ref)
   - Failed payout alerts

**Components:**
- PropertyForm (5-step wizard)
- PhotoUpload (drag-drop with progress)
- ListingTable (filterable, sortable)
- BookingDetailPanel
- RatingsChart

**Integration:**
- API: `POST /api/v1/properties/` (create)
- API: `POST /api/v1/properties/{id}/photos/` (upload)
- API: `PATCH /api/v1/properties/{id}/` (edit)
- API: `GET /api/v1/bookings/` (agent's bookings)
- API: `PATCH /api/v1/bookings/{id}/confirm-visit/`
- API: `GET /api/v1/agents/{id}/stats/`

**Deliverables:**
- Agent dashboard fully functional
- Property listing CRUD operations
- Agent workflows complete
- Bookings management working

---

### Phase 7: Admin Portal (Weeks 10-11)

**Goal:** Implement moderation and administrative functions

**Tasks:**

1. **Admin Dashboard (`/admin/dashboard`)**
   - Key metrics cards (listings, bookings, pending payments, strikes, etc.)
   - Alert banners (red/yellow/blue)
   - Recent activity feed

2. **Agent Verification (`/admin/verifications`)**
   - Pending verification queue
   - In-progress verifications with evidence photos
   - Action buttons: Assign officer, approve, reject, request info

3. **Property Moderation (`/admin/properties`)**
   - Flagged listings queue
   - Property detail view
   - Actions: Approve, request edit, remove

4. **Strike Management (`/admin/strikes`)**
   - Issue strike form
   - Strike history table
   - Agent suspension management

5. **Ratings Moderation (`/admin/ratings`)**
   - Pending moderation queue
   - Flagged content detection
   - Approve/reject/request edit decisions

6. **Booking Disputes (`/admin/disputes`)**
   - Dispute queue
   - Full booking audit trail
   - Refund processing

7. **User Management (`/admin/users`)**
   - User search/filter
   - User details panel
   - Suspend, delete, change role actions

8. **Audit Log Viewer (`/admin/audit-log`)**
   - Filterable log table
   - Full entry details with JSON metadata

9. **Platform Settings (`/admin/settings`)** (Super Admin only)
   - M-Pesa credentials
   - Payment settings (fees, commission rates)
   - Verification settings
   - Notification templates
   - Strike severity settings

**Deliverables:**
- Admin dashboard complete
- Verification workflow functioning
- Moderation queues operational
- Strike & suspension system working

---

### Phase 8: Supporting Features (Week 12)

**Goal:** Implement notifications, error handling, and edge cases

**Tasks:**

1. **Notification System**
   - NotificationCenter component (modal/panel)
   - In-app notification list (grouped by date)
   - Notification types: booking status, payment, rating request, strikes, verification updates
   - Mark as read, delete, unread toggle
   - Notification badge (count in top nav)

2. **Error Boundaries**
   - Global ErrorBoundary component
   - 404 page
   - 500 error page
   - Connection lost screen
   - Session expired screen

3. **Loading States**
   - Skeleton cards for all listing views
   - Skeleton forms
   - Progress indicators
   - Spinners with pulse animation

4. **Offline Support** (Optional but recommended)
   - Service worker setup
   - Cache listing data locally
   - Offline read-only mode
   - Queue actions for sync when online

5. **Accessibility Audit**
   - Run axe-core on all pages
   - Fix contrast ratio issues
   - Verify keyboard navigation
   - Test with screen readers
   - WCAG 2.1 AA compliance

6. **Performance Optimization**
   - Code splitting by route
   - Lazy-load components
   - Image optimization (WebP conversion)
   - Bundle size analysis
   - Lighthouse audit (target: 90+ desktop, 80+ mobile)

7. **i18n Setup** (For future Swahili support)
   - Setup next-i18next or similar
   - Extract all user-facing strings to `public/locales/en/`
   - Create placeholder Swahili translations

**Deliverables:**
- Notification system fully functional
- All error states handled gracefully
- Performance targets met
- Accessibility compliant

---

## API Integration Checklist

### Authentication Endpoints

```
POST /api/v1/auth/register/
POST /api/v1/auth/login/
POST /api/v1/auth/logout/
POST /api/v1/auth/refresh/
POST /api/v1/auth/request-password-reset/
POST /api/v1/auth/verify-reset-code/
POST /api/v1/auth/reset-password/
```

### Property Endpoints

```
GET /api/v1/properties/
GET /api/v1/properties/{id}/
POST /api/v1/properties/
PATCH /api/v1/properties/{id}/
DELETE /api/v1/properties/{id}/
POST /api/v1/properties/{id}/photos/
GET /api/v1/properties/{id}/photos/
GET /api/v1/properties/{id}/location/
GET /api/v1/properties/my-listings/
```

### Booking Endpoints

```
POST /api/v1/bookings/
GET /api/v1/bookings/
GET /api/v1/bookings/{id}/
PATCH /api/v1/bookings/{id}/confirm-visit/
```

### Payment Endpoints

```
POST /api/v1/payments/initiate-stk/
GET /api/v1/payments/{id}/status/
POST /api/v1/payments/webhooks/mpesa/  (webhook)
```

### Rating Endpoints

```
POST /api/v1/ratings/
GET /api/v1/ratings/
GET /api/v1/ratings/?agent_id={id}
PATCH /api/v1/ratings/{id}/approve/
PATCH /api/v1/ratings/{id}/reject/
```

### Agent Endpoints

```
GET /api/v1/agents/
GET /api/v1/agents/{id}/
GET /api/v1/agents/{id}/stats/
GET /api/v1/agents/{id}/verification/
PATCH /api/v1/agents/{id}/verification/approve/
PATCH /api/v1/agents/{id}/verification/reject/
```

### Admin Endpoints

```
GET /api/v1/admin/dashboard/stats/
GET /api/v1/admin/strikes/
POST /api/v1/admin/strikes/
GET /api/v1/admin/audit-log/
```

---

## Testing Strategy

### Unit Tests (Per Component)
```
Test: Button renders with correct variant
Test: Input validation works
Test: Card responds to clicks
Test: Modal opens/closes
Test: Badge displays correct color
```

### Integration Tests (Per Feature)
```
Test: User can register → login → view dashboard
Test: User can search properties → filter → view detail
Test: User can bookmark property → see in saved
Test: Agent can create listing → edit → publish
Test: Admin can approve agent verification
```

### E2E Tests (Critical Flows)
```
Tenant Journey:
  1. Search → Find → Book → Pay → Confirm Visit → Rate

Agent Journey:
  1. Register → Verification → Create Listing → Manage Bookings → View Ratings

Admin Journey:
  1. View Dashboard → Review Pending → Approve Agent → View Metrics
```

### Performance Tests
```
Lighthouse Score: 80+ mobile, 90+ desktop
LCP: < 3 seconds on all pages
First Input Delay: < 100ms
Cumulative Layout Shift: < 0.1
```

---

## Deployment Checklist

### Pre-Launch

- [ ] All pages tested on mobile, tablet, desktop
- [ ] All API endpoints integrated and tested
- [ ] Error handling covers all edge cases
- [ ] Images optimized (WebP, lazy-load)
- [ ] SEO: Meta tags, structured data, sitemap
- [ ] Accessibility: WCAG 2.1 AA compliance verified
- [ ] Performance: Lighthouse 80+
- [ ] Security: No console errors, HTTPS only, CSP headers
- [ ] Analytics: Sentry, Mixpanel integrated
- [ ] Monitoring: Error tracking, API latency monitoring

### Build & Deploy

```bash
# Build
npm run build

# Test
npm run test
npm run lint

# Deploy to Vercel (or chosen platform)
vercel --prod

# Monitor
# - Check error tracking dashboard (Sentry)
# - Monitor API response times
# - Check Lighthouse score
```

### Environment Variables

**`.env.production`:**
```
NEXT_PUBLIC_API_BASE_URL=https://api.mykeja.com
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
NEXT_PUBLIC_MAPBOX_TOKEN=pk_xxx
NEXTAUTH_SECRET=xxx (if using NextAuth)
NEXTAUTH_URL=https://mykeja.com
```

---

## Team Roles & Responsibilities

### Frontend Lead
- Architecture decisions
- Component design standards
- Code review & PR approval
- Performance optimization

### Frontend Engineers (2-3)
- Implement pages in parallel
- Build reusable components
- Write tests
- Bug fixes & refactoring

### QA Engineer
- Test all flows (manual + automation)
- Accessibility testing
- Performance testing
- Mobile device testing

### Product Manager
- Requirements clarification
- Prioritization
- Stakeholder communication

---

## Success Metrics

**Launch Readiness:**
- [ ] 100% of critical pages implemented
- [ ] All API endpoints integrated
- [ ] Mobile/desktop responsive (tested on 10+ devices)
- [ ] Accessibility compliant (WCAG 2.1 AA)
- [ ] Performance: Lighthouse 80+
- [ ] Zero critical bugs
- [ ] 95%+ test coverage for core logic

**Post-Launch:**
- User registration: 100+ per week
- Listing bookings: 50+ per month
- Average session duration: 4+ minutes
- Bounce rate: < 30%
- Return user rate: 40%+

---

## Reference Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Testing Library Documentation](https://testing-library.com/)
- [Sentry Documentation](https://docs.sentry.io/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Vitals](https://web.dev/vitals/)

---

**This implementation guide is your roadmap to production. Execute phase by phase, test thoroughly, and maintain design system consistency throughout.**

