# MyKeja Frontend Development Guide

## Quick Start

### Prerequisites
- Node.js 18+ (check with `node --version`)
- npm or yarn package manager

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000`

---

## Project Structure

```
src/
├── app/                      # Next.js app router pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   ├── properties/
│   │   ├── page.tsx        # Search results
│   │   └── [id]/
│   │       └── page.tsx    # Property detail
│   └── api/                # API routes (webhooks, etc)
├── components/
│   ├── Button.tsx          # Core components
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Badge.tsx
│   └── PropertyCard.tsx    # Shared components
├── lib/
│   ├── utils.ts            # Utility functions
│   └── axios-instance.ts   # API client config
├── styles/
│   ├── globals.css         # Design tokens & base styles
│   └── variables.css       # CSS custom properties
├── types/
│   ├── models.ts           # Data model types
│   └── api.ts              # API request/response types
└── providers/
    └── ThemeProvider.tsx   # Theme context setup
```

---

## Available Scripts

### Development
```bash
npm run dev      # Start development server (hot reload)
```

### Building
```bash
npm run build    # Build for production
npm run start    # Start production server
```

### Linting
```bash
npm run lint     # Run ESLint
```

### Testing
```bash
npm run test     # Run Vitest (when configured)
```

---

## Key Technologies

- **Framework:** Next.js 16+ with React 19
- **Styling:** Tailwind CSS 4
- **Form Handling:** React Hook Form (future)
- **Validation:** Zod (future)
- **HTTP Client:** Axios (planned)
- **Component Library:** Custom (this repo)
- **Theme:** next-themes (light/dark mode)
- **Icons:** Lucide React

---

## Design System Integration

All components use Tailwind CSS classes extended with custom tokens. The design tokens are defined in:
- **tailwind.config.js** – Tailwind configuration with design tokens
- **src/styles/globals.css** – CSS custom properties and base styles
- **DESIGN_SYSTEM.md** – Complete design specification

### Using Design Tokens

```jsx
// Button with brand primary color
<Button className="bg-brand-primary text-white">Click me</Button>

// Card with glass effect
<Card variant="glass" padding="lg">Content</Card>

// Responsive text using type scale
<h1 className="text-display-lg">Large Heading</h1>
<p className="text-body-regular">Regular paragraph</p>

// Spacing using design tokens
<div className="p-lg gap-md">Content with consistent spacing</div>
```

### Dark Mode Support

Dark mode is automatically applied based on system preference (`prefers-color-scheme`) or user selection. All components include dark mode classes:

```jsx
<div className="bg-white dark:bg-slate-900 text-text-primary dark:text-dark-text-primary">
  Content
</div>
```

---

## Component Usage Examples

### Button Component
```jsx
import { Button } from '@/components/Button';
import { Heart } from 'lucide-react';

// Primary
<Button>Save Property</Button>

// Secondary
<Button variant="secondary">Cancel</Button>

// With Icon
<Button icon={<Heart size={16} />} iconPosition="left">Favourite</Button>

// Loading
<Button isLoading>Saving...</Button>

// Disabled
<Button disabled>Unavailable</Button>
```

### Input Component
```jsx
import { Input } from '@/components/Input';

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error={emailError}
  helperText="We'll never share your email"
  required
/>
```

### Card Component
```jsx
import { Card } from '@/components/Card';

// Glass effect
<Card variant="glass" padding="lg" interactive>
  Content
</Card>

// Elevated
<Card variant="elevated" padding="md">
  Content
</Card>
```

### PropertyCard Component
```jsx
import { PropertyCard } from '@/components/PropertyCard';

const property = {
  id: '1',
  title: '2-Bedroom Apartment',
  image: 'https://...',
  price: 35000,
  location: 'Kahawa Sukari',
  beds: 2,
  baths: 2,
  verified: true,
};

<PropertyCard 
  property={property}
  onFavouriteToggle={(isFavourite) => console.log(isFavourite)}
  isFavourite={false}
/>
```

---

## API Integration

### Setting Up API Client

The project uses Axios for HTTP requests (to be configured):

```typescript
// src/lib/axios-instance.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

### Making API Calls

```typescript
import apiClient from '@/lib/axios-instance';

// Fetch properties
const { data } = await apiClient.get('/properties/');

// Create booking
const { data } = await apiClient.post('/bookings/', {
  property_id: '123',
  visit_date: '2026-06-15',
});
```

---

## Responsive Design

The project uses mobile-first design with these breakpoints:
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

Example responsive classes:
```jsx
// Stack on mobile, grid on tablet+
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* Cards */}
</div>

// Full width on mobile, constrained on desktop
<div className="max-w-full lg:max-w-6xl">
  {/* Content */}
</div>
```

---

## SEO & Meta Tags

Use `next/head` or metadata in layout files for SEO:

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  title: 'MyKeja – Find Verified Homes in Kenya',
  description: '...',
  openGraph: {
    title: '...',
    description: '...',
    images: [{ url: '/og-image.jpg' }],
  },
};
```

---

## Accessibility

All components are built to WCAG 2.1 AA standards:
- Minimum touch target: 44x44 pixels
- Color contrast: 4.5:1 for body text
- Keyboard navigation: Tab, Enter, Space keys work
- Screen reader support: Semantic HTML + ARIA labels

Test with:
```bash
# Run accessibility audit (install axe-core devDependency)
npm install -D @axe-core/react
```

---

## Performance Optimization

### Image Optimization
```jsx
import Image from 'next/image';

// Automatically optimized, lazy-loaded
<Image 
  src="/property.jpg" 
  alt="Property"
  width={500}
  height={300}
  placeholder="blur"
/>
```

### Code Splitting
Next.js automatically code-splits at the route level. For lazy-loading components:

```typescript
import dynamic from 'next/dynamic';

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), {
  loading: () => <div>Loading map...</div>,
});
```

---

## Common Tasks

### Adding a New Page

1. Create file in `src/app/` following the route structure
2. Export a default React component
3. Add metadata for SEO

```typescript
// src/app/about/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About MyKeja',
};

export default function AboutPage() {
  return <div>About page content</div>;
}
```

### Adding a New Component

1. Create file in `src/components/`
2. Use CVA for variants and styling
3. Export with proper TypeScript types

```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const myComponentVariants = cva('base-styles', {
  variants: {
    variant: {
      default: 'default-variant',
      primary: 'primary-variant',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface MyComponentProps extends VariantProps<typeof myComponentVariants> {
  children: React.ReactNode;
}

export function MyComponent({ children, variant }: MyComponentProps) {
  return (
    <div className={myComponentVariants({ variant })}>
      {children}
    </div>
  );
}
```

---

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
# Then restart
npm run dev
```

### Module Not Found
1. Check file spelling and case sensitivity
2. Verify import path aliases in tsconfig.json
3. Clear `.next` folder: `rm -rf .next && npm run dev`

### Tailwind Styles Not Applied
1. Verify content paths in tailwind.config.js
2. Check class names are not dynamically generated
3. Clear cache: `npm run build --clean-cache`

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Design System Documentation](./DESIGN_SYSTEM.md)
- [Pages Specification](./PAGES_SPECIFICATION.md)
- [Component Library](./COMPONENT_LIBRARY.md)
- [Technical Design](./technical_design.md)

---

## Support

For questions or issues:
1. Check the documentation files referenced above
2. Review the component examples in this file
3. Check existing components for similar patterns
4. Create an issue with detailed information

---

**Happy coding! 🚀**
