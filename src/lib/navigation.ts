'use server'

// Navigation items for different user roles
export type UserRole = 'tenant' | 'agent' | 'owner' | 'admin'

export interface NavItem {
  label: string
  href: string
  icon: string
  description?: string
}

export const ROLE_NAVIGATION: Record<UserRole, NavItem[]> = {
  tenant: [
    { label: 'Dashboard', href: '/dashboard', icon: 'Home' },
    { label: 'Browse', href: '/properties', icon: 'Search' },
    { label: 'Bookings', href: '/dashboard', icon: 'Calendar' },
    { label: 'Saved', href: '/dashboard', icon: 'Heart' },
    { label: 'Profile', href: '/dashboard', icon: 'User' },
  ],
  agent: [
    { label: 'Dashboard', href: '/agent/dashboard', icon: 'Home' },
    { label: 'Listings', href: '/agent/listings', icon: 'Building2' },
    { label: 'Bookings', href: '/agent/bookings', icon: 'Calendar' },
    { label: 'Earnings', href: '/agent/earnings', icon: 'TrendingUp' },
    { label: 'Profile', href: '/agent/profile', icon: 'User' },
  ],
  owner: [
    { label: 'Dashboard', href: '/owner/dashboard', icon: 'Home' },
    { label: 'Properties', href: '/owner/properties', icon: 'Building' },
    { label: 'Payments', href: '/owner/payments', icon: 'CreditCard' },
    { label: 'Tenants', href: '/owner/tenants', icon: 'Users' },
    { label: 'Settings', href: '/owner/settings', icon: 'Settings' },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin/dashboard', icon: 'Home' },
    { label: 'Users', href: '/admin/users', icon: 'Users' },
    { label: 'Listings', href: '/admin/listings', icon: 'Building2' },
    { label: 'Disputes', href: '/admin/disputes', icon: 'AlertCircle' },
    { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
  ],
}

export const AGENT_PORTAL_NAV = [
  { label: 'Dashboard', href: '/agent/dashboard', icon: 'LayoutDashboard' },
  { label: 'Listings', href: '/agent/listings', icon: 'Building2', count: 12 },
  { label: 'Bookings', href: '/agent/bookings', icon: 'Calendar', count: 8 },
  { label: 'Earnings', href: '/agent/earnings', icon: 'TrendingUp' },
  { label: 'Ratings', href: '/agent/ratings', icon: 'Star', count: 2 },
]

export const OWNER_PORTAL_NAV = [
  { label: 'Dashboard', href: '/owner/dashboard', icon: 'LayoutDashboard' },
  { label: 'Properties', href: '/owner/properties', icon: 'Building' },
  { label: 'Payments', href: '/owner/payments', icon: 'CreditCard' },
  { label: 'Tenants', href: '/owner/tenants', icon: 'Users' },
  { label: 'Settings', href: '/owner/settings', icon: 'Settings' },
]

export const ADMIN_PORTAL_NAV = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
  { label: 'Agents', href: '/admin/agents', icon: 'User' },
  { label: 'Properties', href: '/admin/properties', icon: 'Building2' },
  { label: 'Disputes', href: '/admin/disputes', icon: 'AlertCircle' },
  { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
]
