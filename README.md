# MyKeja Frontend Documentation
**Version**: 1.0 | **Date**: June 8, 2026 | **Status**: Production-Ready Design System

---

## 🎯 Quick Start

This directory contains **complete, implementation-ready design specifications** for the MyKeja frontend. Everything a development team needs to build the application is documented here.

**Start reading in this order:**

1. **[AGENTS.md](AGENTS.md)** – Complete UI/UX design brief (comprehensive overview of all pages and features)
2. **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** – Design tokens, colors, typography, spacing
3. **[PAGES_SPECIFICATION.md](PAGES_SPECIFICATION.md)** – Detailed page layouts, components, and API integrations
4. **[COMPONENT_LIBRARY.md](COMPONENT_LIBRARY.md)** – Reusable component specs with props and states
5. **[FRONTEND_IMPLEMENTATION_GUIDE.md](FRONTEND_IMPLEMENTATION_GUIDE.md)** – Step-by-step implementation roadmap
6. **[technical_design.md](technical_design.md)** – Backend architecture (read in parallel with frontend docs)
7. **[rating_design.md](rating_design.md)** – Rating system design (reference for rating features)

---

## 📚 Documentation Overview

### Core Design Documents

| Document | Purpose | Audience | Pages | Est. Read Time |
|----------|---------|----------|-------|-----------------|
| **AGENTS.md** | Complete UI/UX design brief with all pages, components, flows | Designers, Product, Frontend Team | 130+ | 2 hours |
| **DESIGN_SYSTEM.md** | Color palette, typography, spacing, motion, tokens | Frontend Engineers | 15 | 30 mins |
| **PAGES_SPECIFICATION.md** | Detailed layout specs for 16+ pages with mockups | Frontend Engineers | 40 | 1.5 hours |
| **COMPONENT_LIBRARY.md** | 25+ reusable component specs with props, states, examples | Frontend Engineers, Component Developers | 20 | 1 hour |
| **FRONTEND_IMPLEMENTATION_GUIDE.md** | Roadmap, phases, tech stack, API checklist, deployment | Tech Lead, Frontend Engineers | 25 | 1 hour |

### Reference Documents

| Document | Purpose | Audience |
|----------|---------|----------|
| **technical_design.md** | Backend architecture, API endpoints, payment flow, locking | Full Team |
| **rating_design.md** | Rating system, moderation, structured metrics | Product, Frontend |
| **openapi.json** | API schema in OpenAPI 3.0 format | Frontend, Backend |

---

## 🎨 Design System at a Glance

### Color Palette
- **Primary:** #0066CC (Light Blue)
- **Accents:** #00B4D8 (Sky Blue), #0096D1 (Cerulean)
- **Success:** #10B981 | **Warning:** #F59E0B | **Error:** #DC2626

### Typography
- **Display:** Poppins (Headings, Hero text)
- **Body:** Inter (Descriptions, Body text)
- **Type Scale:** 10 levels from Display Large (48px) to Overline (10px)

### Spacing Scale
- **Base:** 8px increments (xs: 4px → 3xl: 64px)
- **Glass Effects:** Backdrop blur 20px, 80% opacity
- **Radius:** sm: 8px → full: 9999px

### Motion
- **Spring Easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Durations:** Button 150ms → Page transition 400ms
- **Accessibility:** Respects `prefers-reduced-motion`

---

## 📖 Pages Checklist

### Public Pages (No Auth Required)
- [ ] Landing Page (`/`) – Hero, featured listings, trust signals, how it works
- [ ] Search Results (`/properties`) – Filterable listings, map, pagination
- [ ] Property Detail (`/properties/{id}`) – Photos, amenities, agent card, related listings
- [ ] Authentication (`/auth/register`, `/auth/login`) – Multi-step flows with OTP

### Tenant Pages (Authenticated)
- [ ] Tenant Dashboard (`/dashboard`) – Active bookings, saved properties, ratings
- [ ] Booking Flow – Summary → Payment → Confirmation (4 steps)
- [ ] Rating Submission (`/bookings/{id}/rate`) – Structured metrics with moderation

### Agent Pages (Agent Role)
- [ ] Agent Dashboard (`/agent/dashboard`) – Stats, quick actions, activity feed
- [ ] Property Listing Creation (`/agent/listings/new`) – 5-step wizard with photo upload
- [ ] Property Management (`/agent/listings`) – CRUD operations
- [ ] Bookings Management (`/agent/bookings`) – Booking details, visit confirmation
- [ ] Verification Status (`/agent/verification`) – Progress tracking
- [ ] Ratings Received (`/agent/ratings`) – Rating summary + list
- [ ] Payout History (`/agent/payouts`) – Earnings and commission tracking

### Admin Pages (Admin Role)
- [ ] Admin Dashboard (`/admin/dashboard`) – Metrics, alerts, activity
- [ ] Agent Verification (`/admin/verifications`) – Queue, evidence, approval
- [ ] Property Moderation (`/admin/properties`) – Review, approve, remove
- [ ] Strike Management (`/admin/strikes`) – Issue, history, suspension
- [ ] Ratings Moderation (`/admin/ratings`) – Flag review, approve/reject
- [ ] Booking Disputes (`/admin/disputes`) – Dispute resolution, refunds
- [ ] User Management (`/admin/users`) – CRUD, role changes, suspension
- [ ] Audit Log (`/admin/audit-log`) – Filter, search, detail view
- [ ] Platform Settings (`/admin/settings`) – Configuration (Super Admin only)

---

## 🧩 Component Library (25+ Components)

### Core Components
1. **Button** – Primary, Secondary, Ghost variants with loading states
2. **Input** – Text, Email, Phone, Password with validation
3. **Card** – Glass, Elevated, Flat variants
4. **Modal** – With backdrop, close button, animations
5. **Badge** – Status indicator with color variants
6. **Skeleton** – Loading placeholder with pulse animation

### Form Components
7. **FormField** – Label + Input + Error wrapper
8. **FileUpload** – Drag-drop file upload with progress
9. **DatePicker** – Calendar selection
10. **PriceRangeSlider** – Dual-thumb price range
11. **PhoneNumberInput** – Kenyan format validation
12. **Select/Dropdown** – Multi-option selection

### Layout Components
13. **Container** – Responsive width constraint
14. **Grid** – Responsive grid layout (1-4 columns)
15. **Stack** – Flex row/column spacing
16. **TopNavBar** – Desktop navigation
17. **BottomTabBar** – Mobile bottom navigation
18. **BottomSheet** – Mobile modal from bottom

### Shared Components
19. **PropertyCard** – Listing card with image, details, favourite toggle
20. **AgentCard** – Agent info, rating, verification badge, CTAs
21. **BookingCard** – Booking summary with dynamic CTAs
22. **RatingDisplay** – Rating with comment, author
23. **StatusBadge** – Property/booking status with color mapping

### Specialized Components
24. **Toast** – Non-blocking notification (success, error, warning)
25. **Tabs** – Tabbed content organization
26. **RatingStars** – Interactive or display star ratings
27. **PhotoCarousel** – Image gallery with lazy-load + lock overlay
28. **LocationMap** – Mapbox/Google Maps integration (area view)

---

## 🔌 API Integration

**Base URL:** `https://api.mykeja.com/api/v1/`

### Key Endpoints (Sample)

```javascript
// Authentication
POST /auth/register/
POST /auth/login/
POST /auth/refresh/
POST /auth/request-password-reset/

// Properties
GET /properties/
GET /properties/{id}/
POST /properties/
PATCH /properties/{id}/
POST /properties/{id}/photos/

// Bookings
POST /bookings/
GET /bookings/
PATCH /bookings/{id}/confirm-visit/

// Payments
POST /payments/initiate-stk/
GET /payments/{id}/status/
POST /payments/webhooks/mpesa/  (webhook)

// Ratings
POST /ratings/
GET /ratings/
PATCH /ratings/{id}/approve/

// Agents
GET /agents/
GET /agents/{id}/stats/
PATCH /agents/{id}/verification/approve/
```

Full OpenAPI schema: [openapi.json](openapi.json)

---

## 🛠️ Technology Stack

### Recommended
- **Framework:** Next.js 14+ (React 18+) with TypeScript
- **Styling:** Tailwind CSS + CSS Modules
- **State Management:** React Context + Custom Hooks
- **Forms:** React Hook Form + Zod validation
- **HTTP Client:** Axios with interceptors
- **Testing:** Vitest + React Testing Library
- **Deployment:** Vercel (or AWS Amplify, DigitalOcean)

### Key Libraries
```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "tailwindcss": "^3.4.0",
  "react-hook-form": "^7.48.0",
  "zod": "^3.22.0",
  "axios": "^1.6.0",
  "mapbox-gl": "^2.15.0",
  "date-fns": "^2.30.0",
  "sentry/nextjs": "^7.77.0"
}
```

---

## 📱 Responsive Breakpoints

| Device | Width | Layout | Details |
|--------|-------|--------|---------|
| **Mobile** | < 640px | Single column, full-width | Bottom tab bar, hamburger menu |
| **Tablet** | 640-1024px | 2-3 column grid | Responsive nav, sidebar-enabled layouts |
| **Desktop** | > 1024px | 3-4 column grid | Full navigation, map + list split view |

---

## ♿ Accessibility Standards

**Target: WCAG 2.1 Level AA**

- [ ] Contrast Ratio: 4.5:1 for body text, 3:1 for large text
- [ ] Touch Targets: Minimum 44x44 CSS pixels
- [ ] Focus Indicators: 2px outline, 3:1 contrast
- [ ] Keyboard Navigation: All interactive elements via Tab, Enter, Space
- [ ] Screen Reader Support: Semantic HTML + ARIA labels
- [ ] Motion: Respects `prefers-reduced-motion` media query
- [ ] Images: Descriptive alt text
- [ ] Forms: Labels, errors via `aria-describedby`

---

## ⚡ Performance Targets

| Metric | Target | Method |
|--------|--------|--------|
| **LCP (Largest Contentful Paint)** | < 2.5s | Image optimization, SSR |
| **FID (First Input Delay)** | < 100ms | Code splitting, lazy-loading |
| **CLS (Cumulative Layout Shift)** | < 0.1 | Skeleton loading, reserved space |
| **Lighthouse Score** | 80+ mobile, 90+ desktop | Audit + optimization |

**Image Guidelines:**
- Format: WebP with JPEG fallback
- Max size: 200KB per image (except hero)
- Lazy-load below fold
- LQIP: 20-50KB placeholder

---

## 🧪 Testing Strategy

### Unit Tests
- Component rendering & prop validation
- State changes & handlers
- Validation logic

### Integration Tests
- Authentication flow (register → login → dashboard)
- Booking flow (search → book → pay → confirm)
- Property listing creation
- Admin approval workflows

### E2E Tests (Playwright/Cypress)
- Complete user journeys
- Mobile + desktop viewports
- Error scenarios & edge cases
- Performance benchmarks

### Test Coverage Target
- Core components: 95%+
- Hooks: 90%+
- Services: 85%+
- Pages: 80%+

---

## 🚀 Implementation Phases

**Phase 1 (Weeks 1-2):** Foundation
- Setup project, design system, core components, auth

**Phase 2 (Weeks 3-4):** Public Pages
- Landing, search results, property detail

**Phase 3 (Week 5):** Authentication
- Registration, login, password reset

**Phase 4 (Week 6):** Booking & Payment
- Booking flow, M-Pesa integration, confirmation

**Phase 5 (Week 7):** Tenant Dashboard
- Bookings, visit confirmation, ratings

**Phase 6 (Weeks 8-9):** Agent Portal
- Dashboard, listing creation, management, verification

**Phase 7 (Weeks 10-11):** Admin Portal
- Verification, moderation, strikes, disputes

**Phase 8 (Week 12):** Supporting Features
- Notifications, error handling, accessibility, optimization

**Timeline:** 12 weeks for MVP, can be parallelized to 8 weeks with larger team

---

## 📋 Pre-Launch Checklist

- [ ] All 16+ pages implemented and tested
- [ ] API integration complete (all endpoints)
- [ ] Mobile responsive (tested on 10+ devices)
- [ ] Dark mode theme working
- [ ] Accessibility: WCAG 2.1 AA compliance verified
- [ ] Performance: Lighthouse 80+ on all pages
- [ ] SEO: Meta tags, structured data, sitemap
- [ ] Error handling: All edge cases covered
- [ ] Analytics: Sentry + Mixpanel integrated
- [ ] Security: HTTPS, CSP headers, no console errors
- [ ] Testing: 80%+ coverage, all critical flows E2E tested
- [ ] CI/CD: Automated builds, tests, deployment

---

## 🎯 Success Metrics

**Launch Readiness:**
- 100% of critical pages implemented
- All APIs integrated & tested
- Zero critical bugs
- 95%+ test coverage
- Lighthouse 80+ desktop, 75+ mobile

**User Metrics (First Month):**
- 100+ user registrations
- 10+ property listings
- 5+ bookings completed
- Average session: 4+ minutes
- Bounce rate: < 30%

---

## 📞 Support & Questions

When implementing:

1. **Design question?** → Refer to DESIGN_SYSTEM.md
2. **Page layout question?** → Refer to PAGES_SPECIFICATION.md
3. **Component prop question?** → Refer to COMPONENT_LIBRARY.md
4. **API integration question?** → Refer to openapi.json + technical_design.md
5. **Implementation roadmap?** → Refer to FRONTEND_IMPLEMENTATION_GUIDE.md

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | June 8, 2026 | Initial release – Complete design system & specifications |

---

## 👥 Handoff Checklist

**Frontend development team receives:**

- ✅ This README.md (overview)
- ✅ AGENTS.md (complete UI/UX brief)
- ✅ DESIGN_SYSTEM.md (design tokens)
- ✅ PAGES_SPECIFICATION.md (page details)
- ✅ COMPONENT_LIBRARY.md (component specs)
- ✅ FRONTEND_IMPLEMENTATION_GUIDE.md (roadmap)
- ✅ openapi.json (API schema)
- ✅ technical_design.md (backend architecture)
- ✅ rating_design.md (rating system design)

**Optional Additions:**
- Figma design file (if available)
- Brand guidelines document
- Copywriting style guide
- Analytics event specification

---

**This documentation is production-ready. All design decisions are finalized. Proceed with implementation confidence.**

**Questions? Check the relevant documentation above before asking. 99% of specifications are already defined.**

