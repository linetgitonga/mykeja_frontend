# MyKeja Frontend - Quick Start Guide

## ⚡ Get Running in 2 Minutes

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# http://localhost:3000
```

---

## 🗺️ Navigation Map

### Public Pages (No Auth Required)
- **Landing:** `/` - Homepage with search, featured listings, info
- **Search:** `/properties` - Browse & filter properties
- **Detail:** `/properties/123` - View property details
- **Book:** `/properties/123/book` - 4-step booking wizard

### Authentication
- **Register:** `/auth/register` - 5-step registration (role, contact, OTP, setup, success)
- **Login:** `/auth/login` - Email/phone login

### Tenant Pages (After Login)
- **Dashboard:** `/dashboard` - Bookings, saved properties, profile
- **Rate:** `/bookings/123/rate` - Leave ratings & feedback

### Agent Pages (After Login as Agent)
- **Dashboard:** `/agent/dashboard` - Stats, listings, bookings overview
- **Listings:** `/agent/listings` - Manage property listings

### Admin Pages (Admin Only)
- **Dashboard:** `/admin/dashboard` - Metrics, alerts, quick access
- **Verification:** `/admin/verifications` - Approve agent registrations

---

## 🎯 What's Built

### ✅ 14 Complete Pages
- Landing page (fully functional)
- Search & filter system
- Property detail view
- Complete booking flow
- Registration & login
- Tenant dashboard
- Rating submission
- Agent dashboard
- Listings management
- Admin dashboard
- Agent verification queue
- (+4 more utility pages)

### ✅ 5 Core Components
- `Button` - Primary, secondary, ghost variants
- `Card` - Glass, elevated, flat variants
- `Input` - Text, email, phone, password
- `Badge` - Status indicators
- `PropertyCard` - Listing cards

### ✅ Design System
- Color palette (light & dark mode)
- Typography scale (11 levels)
- Spacing system (8px base)
- Component styles
- Animations & transitions
- Responsive breakpoints

---

## 📖 Key Files to Understand

### Layout & Styling
- `src/app/layout.tsx` - Root layout
- `src/styles/globals.css` - Design tokens & base styles
- `tailwind.config.js` - Tailwind + custom tokens

### Components
- `src/components/Button.tsx` - Example component
- `src/components/Card.tsx` - Card component
- `src/components/PropertyCard.tsx` - Listing card

### Pages
- `src/app/page.tsx` - Landing page example
- `src/app/properties/page.tsx` - Search page example
- `src/app/auth/register/page.tsx` - Multi-step form example

### Utilities
- `src/lib/utils.ts` - Helper functions

---

## 🛠️ Common Tasks

### Adding a New Page

1. Create folder in `src/app/` following URL structure
2. Add `page.tsx` file:

```tsx
export default function MyPage() {
  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Your content */}
      </div>
    </div>
  );
}
```

3. Import components as needed:
```tsx
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
```

### Using Design Tokens

**Colors:**
```tsx
className="bg-brand-primary text-white"
className="text-state-success"
className="dark:bg-slate-900 dark:text-dark-text-primary"
```

**Typography:**
```tsx
<h1 className="text-display-lg font-display">Large Title</h1>
<h2 className="text-heading-2 font-bold">Section</h2>
<p className="text-body-regular">Content</p>
```

**Spacing:**
```tsx
className="p-md mb-lg gap-sm"
```

**Shadows:**
```tsx
className="shadow-md" // or shadow-lg, shadow-xl
```

### Creating a Button

```tsx
import { Button } from '@/components/Button';
import { Heart } from 'lucide-react';

// Default (primary)
<Button>Click Me</Button>

// With variant
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>

// With icon
<Button icon={<Heart size={16} />}>Save</Button>

// Loading state
<Button isLoading>Loading...</Button>

// Disabled
<Button disabled>Disabled</Button>
```

### Creating a Card

```tsx
import { Card } from '@/components/Card';

// Glass effect
<Card variant="glass" padding="lg" interactive>
  Content
</Card>

// Elevated
<Card variant="elevated" padding="md">
  Content
</Card>

// Flat
<Card variant="flat" padding="lg">
  Content
</Card>
```

### Using Input Component

```tsx
import { Input } from '@/components/Input';

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  helperText="We'll never share your email"
  required
/>
```

---

## 📱 Responsive Patterns

### Mobile-First Grid
```tsx
// 1 col mobile, 2 col tablet, 3 col desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>
```

### Hide/Show Elements
```tsx
{/* Visible only on desktop */}
<div className="hidden lg:block">Content</div>

{/* Visible only on mobile */}
<div className="md:hidden">Mobile Content</div>
```

### Responsive Padding
```tsx
<div className="px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
  Content
</div>
```

---

## 🎨 Dark Mode

All components auto-support dark mode:

```tsx
<div className="bg-white dark:bg-slate-900 text-text-primary dark:text-dark-text-primary">
  Content
</div>
```

Use these color classes:
- `text-text-primary` / `dark:text-dark-text-primary`
- `bg-white` / `dark:bg-surface-white`
- `bg-surface-primary` / `dark:bg-surface-primary`

---

## 🧪 Testing Pages

### Landing Page
- Visit `/`
- Test search form
- Scroll through sections
- Click featured listings

### Search Results
- Go to `/properties`
- Use filters
- Sort by price
- Click listing

### Property Detail
- View `/properties/1`
- Check photo gallery
- Scroll amenities
- Try "Book Now"

### Booking Flow
- Visit `/properties/1/book`
- Go through 4 steps
- Success page shows unlock animation

### Tenant Dashboard
- Visit `/dashboard`
- Switch tabs (bookings, saved, profile)
- Try confirm visit modal

### Agent Dashboard
- Visit `/agent/dashboard`
- View stats cards
- Check listings table

### Admin Dashboard
- Visit `/admin/dashboard`
- View metrics
- Check verification queue

---

## 🔗 API Integration (Next Steps)

When backend is ready:

1. **Setup API client** in `src/lib/axios-instance.ts`
2. **Create services** in `src/services/` (auth.ts, properties.ts, etc.)
3. **Create hooks** in `src/hooks/` (useAuth(), useProperty(), etc.)
4. **Replace mock data** with API calls

Example:
```tsx
import apiClient from '@/lib/axios-instance';

// In component
useEffect(() => {
  apiClient.get('/properties/').then(res => setProperties(res.data));
}, []);
```

---

## 📚 Documentation References

- **Design:** `DESIGN_SYSTEM.md` - All design tokens
- **Pages:** `PAGES_SPECIFICATION.md` - Page specs
- **Components:** `COMPONENT_LIBRARY.md` - 25+ component specs
- **Dev Guide:** `DEVELOPMENT.md` - Setup & common tasks
- **Built Pages:** `PAGES_BUILT.md` - What's implemented
- **Roadmap:** `FRONTEND_IMPLEMENTATION_GUIDE.md` - Phase plan

---

## ✨ Key Features

- ✅ Mobile-first responsive design
- ✅ Dark mode (system preference)
- ✅ Accessible (WCAG 2.1 AA baseline)
- ✅ Performance optimized
- ✅ SEO ready
- ✅ TypeScript strict mode
- ✅ Design tokens
- ✅ Reusable components

---

## 🚀 Ready For

- ✅ Team development
- ✅ API integration
- ✅ Component expansion
- ✅ Testing
- ✅ Deployment

---

## 💡 Tips

1. **Use components** instead of raw HTML
2. **Apply tokens** for consistency
3. **Test responsiveness** on mobile/tablet/desktop
4. **Check dark mode** with browser dev tools
5. **Reference examples** in built pages
6. **Read docs** before adding features

---

## 🎓 Learning Path

1. Start with landing page (`/`) - Basic layout
2. Check search page (`/properties`) - Filters & grid
3. Review property detail (`/properties/123`) - Complex layout
4. Study register page (`/auth/register`) - Multi-step form
5. Look at dashboard (`/dashboard`) - Tabs & modals
6. Review admin pages (`/admin/dashboard`) - Complex UI

---

**Happy coding! 🚀 The foundation is solid - you're ready to build!**

For questions, check the detailed docs or examine the built pages for examples.
