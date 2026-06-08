export type UserRole = 'TENANT' | 'AGENT' | 'OWNER' | 'ADMIN' | 'SUPER_ADMIN'

export type PropertyType =
  | 'APARTMENT'
  | 'STUDIO'
  | 'BEDSITTER'
  | 'TOWNHOUSE'
  | 'MAISONETTE'
  | 'BUNGALOW'

export type PropertyStatus =
  | 'AVAILABLE'
  | 'LOCKED'
  | 'BOOKED'
  | 'VIEWED'
  | 'OCCUPIED'
  | 'REMOVED'

export type Furnishing = 'FURNISHED' | 'UNFURNISHED' | 'SEMI_FURNISHED'

export type VerificationStatus =
  | 'PENDING_VERIFICATION'
  | 'IN_PROGRESS'
  | 'VERIFIED'
  | 'SUSPENDED'

export type BookingStatus =
  | 'PENDING'
  | 'LOCKED'
  | 'PAID'
  | 'FAILED'
  | 'EXPIRED'
  | 'CANCELLED'

export type ConfirmationStatus = null | 'VIEWED' | 'NOT_VIEWED' | 'AGENT_ABSENT'

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'

export type RatingType = 'AGENT' | 'PROPERTY' | 'EXPERIENCE'

export type ModerationStatus = 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'REMOVED'

export type StrikeSeverity = 'WARNING' | 'MINOR' | 'MAJOR' | 'CRITICAL'

export interface Agent {
  id: string
  businessName: string
  fullName: string
  avatarUrl?: string
  role: string
  verificationStatus: VerificationStatus
  verifiedAt?: string
  strikeCount: number
  avgRating: number | null
  totalRatings: number
  completionRate: number
  joinedAt: string
}

export interface PropertyPhoto {
  id: string
  url: string
  type: 'INTERNAL' | 'EXTERNAL'
  isFeatured: boolean
  order: number
}

export interface Property {
  id: string
  title: string
  type: PropertyType
  status: PropertyStatus
  price: number
  bedrooms: number
  bathrooms: number
  floor: string
  furnishing: Furnishing
  locationGeneral: string
  city: string
  locationSpecific?: { lat: number; lng: number; address: string }
  description: string
  amenities: string[]
  petPolicy: string
  availableDate: string
  photos: PropertyPhoto[]
  agent: Agent
  featured: boolean
  views: number
  updatedAt: string
  distanceKm?: number
}

export interface Booking {
  id: string
  property: Property
  tenantName: string
  status: BookingStatus
  visitDate: string
  confirmationStatus: ConfirmationStatus
  lockExpiresAt?: string
  amount: number
  createdAt: string
  rated?: boolean
}

export interface Payment {
  id: string
  bookingId: string
  propertyTitle: string
  amount: number
  status: PaymentStatus
  mpesaReceipt?: string
  phone: string
  createdAt: string
}

export interface RatingMetric {
  name: string
  score: number
}

export interface Rating {
  id: string
  type: RatingType
  score: number
  comment: string
  metrics: RatingMetric[]
  status: ModerationStatus
  authorName: string
  targetName: string
  propertyTitle?: string
  isFlagged: boolean
  createdAt: string
}

export interface Strike {
  id: string
  agentName: string
  violationType: string
  severity: StrikeSeverity
  penaltyPoints: number
  reason: string
  status: 'ACTIVE' | 'DISMISSED' | 'UNDER_REVIEW'
  createdAt: string
}

export interface Suspension {
  id: string
  agentName: string
  reason: string
  suspendedUntil: string
  isPermanent: boolean
  status: 'ACTIVE' | 'REINSTATED'
  createdAt: string
}

export interface Payout {
  id: string
  propertyTitle: string
  amount: number
  status: 'PENDING' | 'PAID'
  mpesaTransactionId?: string
  createdAt: string
}

export interface PlatformStats {
  totalProperties: number
  verifiedAgents: number
  totalBookings: number
  ratingDistribution: Record<number, number>
  totalRatings: number
}

export interface AppNotification {
  id: string
  type: string
  title: string
  body: string
  read: boolean
  createdAt: string
}
