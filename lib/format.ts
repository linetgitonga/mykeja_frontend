import type {
  BookingStatus,
  ConfirmationStatus,
  Furnishing,
  PropertyType,
  StrikeSeverity,
} from './types'

export function formatKes(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.round(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  return `${days}d ago`
}

export function countdownTo(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now()
  if (diff <= 0) return 'Expired'
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  if (days > 0) return `${days}d ${hours}h left`
  const mins = Math.floor((diff % 3600000) / 60000)
  return `${hours}h ${mins}m left`
}

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  APARTMENT: 'Apartment',
  STUDIO: 'Studio',
  BEDSITTER: 'Bedsitter',
  TOWNHOUSE: 'Townhouse',
  MAISONETTE: 'Maisonette',
  BUNGALOW: 'Bungalow',
}

export const FURNISHING_LABELS: Record<Furnishing, string> = {
  FURNISHED: 'Furnished',
  UNFURNISHED: 'Unfurnished',
  SEMI_FURNISHED: 'Semi-furnished',
}

export const BOOKING_STATUS_META: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  PENDING: { label: 'Awaiting Payment', className: 'bg-muted text-muted-foreground' },
  LOCKED: { label: 'Locked', className: 'bg-primary/15 text-primary' },
  PAID: { label: 'Paid', className: 'bg-success/15 text-success' },
  FAILED: { label: 'Failed', className: 'bg-destructive/15 text-destructive' },
  EXPIRED: { label: 'Expired', className: 'bg-muted text-muted-foreground' },
  CANCELLED: { label: 'Cancelled', className: 'bg-muted text-muted-foreground' },
}

export const CONFIRMATION_META: Record<
  Exclude<ConfirmationStatus, null>,
  { label: string; className: string }
> = {
  VIEWED: { label: 'Visited', className: 'bg-success/15 text-success' },
  NOT_VIEWED: { label: 'Did Not Visit', className: 'bg-warning/20 text-warning-foreground' },
  AGENT_ABSENT: { label: 'Agent Absent', className: 'bg-warning/25 text-warning-foreground' },
}

export const STRIKE_SEVERITY_META: Record<
  StrikeSeverity,
  { label: string; className: string }
> = {
  WARNING: { label: 'Warning', className: 'bg-muted text-muted-foreground' },
  MINOR: { label: 'Minor', className: 'bg-warning/20 text-warning-foreground' },
  MAJOR: { label: 'Major', className: 'bg-warning/30 text-warning-foreground' },
  CRITICAL: { label: 'Critical', className: 'bg-destructive/15 text-destructive' },
}

export const AMENITIES = [
  'Wi-Fi',
  'Parking',
  'Security',
  'Gym',
  'Pool',
  'Garden / Green space',
  'Water Tank',
  'Balcony',
  'Air Conditioning',
  'Laundry Facility',
  'Pet-friendly',
]
