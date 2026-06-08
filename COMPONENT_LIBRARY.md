# MyKeja Component Library
**Version**: 1.0 | **Date**: June 8, 2026 | **Status**: Ready for Implementation

This document specifies all reusable UI components with their variants, props, states, and accessibility requirements.

---

## Core Components

### 1. Button

**Purpose:** Primary call-to-action element

**Variants:**
- `primary` (default) – Blue background, white text
- `secondary` – Blue border, blue text, transparent background
- `ghost` – No border, blue text, underlined

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  onClick: () => void;
  children: ReactNode;
}
```

**States:**
- Default: Normal styling
- Hover: Elevated shadow + slight scale up
- Active: Pressed appearance
- Disabled: Grey background, no interaction
- Loading: Spinner, text opacity 50%

**Accessibility:**
- Min height: 44px
- Focus outline: 2px brand-primary
- Keyboard: Fully keyboard navigable (Tab, Enter, Space)

**Examples:**
```jsx
<Button variant="primary">Book Now</Button>
<Button variant="secondary" disabled>Unavailable</Button>
<Button variant="ghost" icon={<HeartIcon />}>Save</Button>
<Button size="sm" variant="primary">Submit</Button>
```

---

### 2. Input Field

**Purpose:** Text input for user data entry

**Props:**
```typescript
interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  required?: boolean;
  maxLength?: number;
}
```

**States:**
- Default: Light background, subtle border
- Focus: Brand-primary border + glow shadow
- Error: Red border + red error message
- Disabled: Grey background, no interaction
- Filled: Shows character counter if maxLength

**Validation:**
- Email: Format validation
- Phone: Kenyan format (+254XXXXXXXXX or 07XXXXXXXX)
- Number: Min/max constraints
- Real-time validation on blur

**Accessibility:**
- Associated label (for attribute)
- Error linked via aria-describedby
- Min height: 44px
- Focus outline visible

**Examples:**
```jsx
<Input label="Email" type="email" placeholder="your@email.com" />
<Input label="Phone" type="tel" placeholder="+254712345678" required />
<Input 
  label="Password" 
  type="password" 
  error="Password must be 8+ characters"
/>
```

---

### 3. Card

**Purpose:** Container for grouped content

**Props:**
```typescript
interface CardProps {
  variant?: 'glass' | 'elevated' | 'flat';
  padding?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}
```

**Variants:**
- `glass` – Glassmorphic background with blur + subtle border
- `elevated` – White background with shadow
- `flat` – Light blue background, no shadow

**States:**
- Default: Styled per variant
- Hover (if interactive): Shadow elevation + slight scale up
- Active: Pressed appearance

**Examples:**
```jsx
<Card variant="glass">
  <h3>Property Title</h3>
  <p>Property details...</p>
</Card>

<Card variant="elevated" interactive onClick={handleClick}>
  <img src={photo} alt="Property" />
</Card>
```

---

### 4. Modal

**Purpose:** Overlay dialog for critical content

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  closeButton?: boolean;
  children: ReactNode;
}
```

**Structure:**
- Backdrop: Semi-transparent overlay, blur
- Modal body: Glassmorphic card with animation (slideUp)
- Close button: Top-right (if enabled)
- Action buttons: Footer section

**States:**
- Closed: Display none
- Opening: SlideUp animation (350ms easing-smooth)
- Open: Full view
- Closing: SlideDown animation

**Accessibility:**
- Focus trap (Tab key stays within modal)
- ESC key closes modal
- Backdrop click closes modal (optional, configurable)
- aria-modal="true" on modal element

**Examples:**
```jsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm Action">
  <p>Are you sure?</p>
  <Button onClick={() => setIsOpen(false)}>Cancel</Button>
  <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
</Modal>
```

---

### 5. Badge

**Purpose:** Label status or category

**Props:**
```typescript
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  icon?: ReactNode;
  children: ReactNode;
}
```

**Variants:**
- `default` – Light blue background, blue text
- `success` – Green background, green text
- `warning` – Orange background, orange text
- `error` – Red background, red text
- `info` – Blue background, white text

**Examples:**
```jsx
<Badge variant="default">Featured</Badge>
<Badge variant="success">Verified</Badge>
<Badge variant="warning">2 Strikes</Badge>
<Badge variant="error">Suspended</Badge>
```

---

### 6. Skeleton

**Purpose:** Placeholder for loading content

**Props:**
```typescript
interface SkeletonProps {
  variant?: 'card' | 'text' | 'circle' | 'image';
  width?: string | number;
  height?: string | number;
  className?: string;
}
```

**Variants:**
- `card` – Full card placeholder (300px width)
- `text` – Text line placeholder (100% width, 16px height)
- `circle` – Circle placeholder (64px)
- `image` – Image placeholder (16:9 aspect)

**Animation:**
- Pulse effect (1600ms ease-in-out, continuous)
- Respects prefers-reduced-motion

**Examples:**
```jsx
{loading ? (
  <>
    <Skeleton variant="card" />
    <Skeleton variant="card" />
  </>
) : (
  <div>Content loaded</div>
)}
```

---

### 7. Toast Notification

**Purpose:** Non-blocking alert message

**Props:**
```typescript
interface ToastProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number; // ms, 0 = persistent
  action?: { label: string; onClick: () => void };
  onClose: () => void;
}
```

**Position:** Bottom-right (mobile: bottom-center)
**Max visible:** 3 toasts stacked

**Examples:**
```jsx
<Toast variant="success" message="Booking confirmed!" duration={3000} />
<Toast 
  variant="error" 
  message="Payment failed" 
  action={{ label: "Retry", onClick: retry }}
/>
```

---

### 8. Dropdown/Select

**Purpose:** Multi-option selection

**Props:**
```typescript
interface SelectProps {
  label?: string;
  options: Array<{ value: string; label: string; icon?: ReactNode }>;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  searchable?: boolean;
  multiSelect?: boolean;
}
```

**States:**
- Closed: Shows selected value
- Open: Dropdown menu visible (max-height 300px, scrollable)
- Disabled: Grey styling, no interaction

**Examples:**
```jsx
<Select 
  label="Property Type"
  options={[
    { value: 'apt', label: 'Apartment' },
    { value: 'studio', label: 'Studio' },
  ]}
  value={type}
  onChange={setType}
/>
```

---

### 9. Rating Stars

**Purpose:** Display or collect star ratings

**Props:**
```typescript
interface RatingProps {
  value: number; // 0-5
  max?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

**Interactive Mode:**
- Hover: Highlight upcoming stars
- Click: Set rating
- Color: Brand-primary when filled, light grey when empty

**Display Mode:**
- Shows decimal (e.g., 4.8 / 5)
- Half-stars supported

**Examples:**
```jsx
<Rating value={4.8} showLabel />
<Rating value={0} interactive onChange={setRating} />
```

---

### 10. Tabs

**Purpose:** Organize content into sections

**Props:**
```typescript
interface TabsProps {
  tabs: Array<{ id: string; label: string; content: ReactNode }>;
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}
```

**Structure:**
- Tab list: Horizontal bar with underline on active tab
- Tab content: Switches on click

**Examples:**
```jsx
<Tabs 
  tabs={[
    { id: 'agent', label: 'Rate Agent', content: <AgentRating /> },
    { id: 'property', label: 'Rate Property', content: <PropertyRating /> },
  ]}
/>
```

---

## Shared Components

### 11. PropertyCard

**Purpose:** Display property listing

**Props:**
```typescript
interface PropertyCardProps {
  property: Property;
  onFavouriteToggle?: (isFavourite: boolean) => void;
  isFavourite?: boolean;
  onCardClick?: () => void;
}
```

**Layout:**
```
┌─────────────────────┐
│ Feature Image (16:9)│ ♡ Heart
│                     │
├─────────────────────┤
│ Property Title      │
│ Location • Distance │
│ KES 35,000/month    │
│ 🛏️ 2 bed  🚿 2 bath  │
│ [Verified Badge]    │
└─────────────────────┘
```

**Interactive:**
- Card tap → Property detail page
- Heart toggle → Add/remove favourite

---

### 12. AgentCard

**Purpose:** Display agent profile info

**Props:**
```typescript
interface AgentCardProps {
  agent: Agent;
  showRating?: boolean;
  showContactButtons?: boolean;
  onMessage?: () => void;
  onBook?: () => void;
}
```

**Layout:**
```
┌──────────────────┐
│ [Avatar] ✓       │
│ Agent Business   │
│ Verified Realtor │
│ ⭐ 4.8 / 5       │
│ ⚠️ 0 strikes     │
│ [Message][Book]  │
└──────────────────┘
```

**Verification Badge:**
- Green checkmark + "Verified"
- Tooltip: Verification date

---

### 13. BookingCard

**Purpose:** Display booking summary

**Props:**
```typescript
interface BookingCardProps {
  booking: Booking;
  onViewDetails?: () => void;
  onConfirmVisit?: () => void;
  onRate?: () => void;
}
```

**Layout:**
```
┌─────────────────────┐
│ Feature Photo (8:9) │
│ Property Title      │
│ Status Badge        │
│ Visit: Jun 15, 2026 │
│ Confirmation Status │
│ [Action Button]     │
└─────────────────────┘
```

---

### 14. RatingDisplay

**Purpose:** Show submitted rating

**Props:**
```typescript
interface RatingDisplayProps {
  rating: Rating;
  showComments?: boolean;
  onFlag?: () => void;
}
```

**Layout:**
```
⭐⭐⭐⭐⭐ 4.8 / 5
"Great agent, very responsive!"
by John D. on Jun 5, 2026
[Report] [Helpful 👍]
```

---

### 15. StatusBadge

**Purpose:** Show entity status

**Props:**
```typescript
interface StatusBadgeProps {
  status: 'AVAILABLE' | 'LOCKED' | 'BOOKED' | 'VIEWED' | 'OCCUPIED' | 'REMOVED';
  subtext?: string;
}
```

**Color Mapping:**
- AVAILABLE: Green
- LOCKED: Blue
- BOOKED: Blue
- VIEWED: Green
- OCCUPIED: Grey
- REMOVED: Red

---

## Form Components

### 16. FormField

**Purpose:** Wrapper combining label + input + error

**Props:**
```typescript
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: ReactNode; // Input element
}
```

**Examples:**
```jsx
<FormField label="Email" required error={emailError}>
  <Input type="email" value={email} onChange={setEmail} />
</FormField>
```

---

### 17. FileUpload

**Purpose:** Drag-and-drop or click file upload

**Props:**
```typescript
interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // bytes
  onFilesSelected: (files: File[]) => void;
  onError?: (error: string) => void;
}
```

**States:**
- Default: Dashed border, upload icon
- Hover: Highlight, cursor pointer
- Uploading: Progress bar per file
- Error: Red border, error message

---

### 18. DatePicker

**Purpose:** Select single date

**Props:**
```typescript
interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  label?: string;
}
```

**Picker:** Calendar grid with month navigation

---

### 19. PriceRange Slider

**Purpose:** Dual-thumb price range selection

**Props:**
```typescript
interface PriceRangeSliderProps {
  min: number;
  max: number;
  minBound: number;
  maxBound: number;
  onChange: (min: number, max: number) => void;
  step?: number;
  currency?: string;
}
```

**Display:** "KES 20,000 – KES 50,000"

---

### 20. PhoneNumberInput

**Purpose:** Formatted phone number input with Kenyan validation

**Props:**
```typescript
interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}
```

**Format:** Accepts +254XXXXXXXXX or 07XXXXXXXXX
**Validation:** 10 digits after country code

---

## Layout Components

### 21. Container

**Purpose:** Constrain content width with responsive padding

**Props:**
```typescript
interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  children: ReactNode;
}
```

**Defaults:**
- Mobile: Full width, 16px padding
- Tablet: Full width, 24px padding
- Desktop: Max 1280px, 32px padding

---

### 22. Grid

**Purpose:** Responsive grid layout

**Props:**
```typescript
interface GridProps {
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  children: ReactNode[];
}
```

**Examples:**
```jsx
<Grid cols={{ sm: 1, md: 2, lg: 3 }} gap="md">
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</Grid>
```

---

### 23. Stack

**Purpose:** Flex layout (vertical or horizontal)

**Props:**
```typescript
interface StackProps {
  direction?: 'row' | 'column';
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'space-between' | 'end';
  children: ReactNode[];
}
```

---

### 24. BottomSheet

**Purpose:** Mobile-optimized modal (slides from bottom)

**Props:**
```typescript
interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}
```

**Behavior:**
- Slides up from bottom (300ms easing)
- Draggable handle at top
- Close on backdrop click or ESC

---

## Navigation Components

### 25. TopNavBar

**Purpose:** Desktop/tablet horizontal navigation

**Props:**
```typescript
interface TopNavBarProps {
  logo?: ReactNode;
  links?: Array<{ label: string; href: string }>;
  actions?: ReactNode;
  sticky?: boolean;
}
```

---

### 26. BottomTabBar

**Purpose:** Mobile bottom navigation

**Props:**
```typescript
interface BottomTabBarProps {
  tabs: Array<{ 
    id: string; 
    label: string; 
    icon: ReactNode; 
    href?: string;
  }>;
  activeTabId: string;
  onTabChange?: (tabId: string) => void;
}
```

**Structure:**
- 5 tabs (or fewer)
- Icons + labels
- Active tab: Highlighted in brand-primary
- Min height: 56px (safe area on notched phones)

---

## Implementation Guidelines

### TypeScript
All components exported with strict TypeScript interfaces.

### Styling
- CSS Modules or Tailwind CSS
- Design tokens from DESIGN_SYSTEM.md
- No inline styles (use CSS variables)

### Accessibility
- WCAG 2.1 Level AA compliant
- Min touch target: 44x44px
- All interactive elements keyboard-navigable
- ARIA labels for screen readers

### Testing
Each component should have:
- Snapshot tests
- Prop validation tests
- Interactive state tests
- Accessibility tests

### Documentation
Each component has:
- JSDoc comments
- Storybook story (optional but recommended)
- Usage examples
- Accessibility notes

---

## Storybook Example Structure

```typescript
// components/Button.stories.tsx
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = () => <Button variant="primary">Click Me</Button>;
export const Secondary = () => <Button variant="secondary">Secondary</Button>;
export const Disabled = () => <Button disabled>Disabled</Button>;
export const Loading = () => <Button loading>Loading...</Button>;
```

---

## Component Composition Examples

### Property Listing Card with Overlay

```jsx
<Card variant="glass" interactive onClick={goToDetail}>
  <div className="relative">
    <img src={photo} alt={property.title} />
    <button className="absolute top-4 right-4" onClick={toggleFavourite}>
      <HeartIcon filled={isFavourite} />
    </button>
  </div>
  <h3>{property.title}</h3>
  <p className="text-secondary">{property.location}</p>
  <p className="text-heading-2 text-brand">{property.price} / month</p>
  <div className="flex gap-2">
    <span>🛏️ {property.beds} bed</span>
    <span>🚿 {property.baths} bath</span>
  </div>
  {property.agent.verified && <Badge variant="success">Verified</Badge>}
</Card>
```

### Booking Flow Step

```jsx
<Modal isOpen={isBooking} onClose={closeBooking} title="Confirm Booking">
  <FormField label="Visit Date" required>
    <DatePicker value={visitDate} onChange={setVisitDate} />
  </FormField>
  
  <FormField label="I agree to terms">
    <input type="checkbox" />
  </FormField>
  
  <Stack direction="row" justify="space-between">
    <Button variant="ghost" onClick={closeBooking}>Cancel</Button>
    <Button variant="primary" onClick={confirmBooking}>Proceed</Button>
  </Stack>
</Modal>
```

---

**All components are ready for implementation. Reference DESIGN_SYSTEM.md for styling tokens and PAGES_SPECIFICATION.md for component usage context.**

