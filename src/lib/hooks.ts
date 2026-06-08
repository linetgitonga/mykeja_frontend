'use client'

import useSWR from 'swr'
import { apiFetch } from './api-client'
import type {
  Agent,
  AppNotification,
  Booking,
  Payment,
  Payout,
  PlatformStats,
  Property,
  Rating,
  Strike,
  Suspension,
} from './types'

export interface PropertyFilters {
  location?: string
  type?: string
  priceMin?: number
  priceMax?: number
  sort?: string
  amenities?: string[]
  query?: string
}

export function useFeaturedProperties() {
  return useSWR<Property[]>(['featured-properties'], async () => {
    return apiFetch<Property[]>('/api/v1/properties/?featured=true&limit=8')
  })
}

export function useProperties(filters: PropertyFilters) {
  return useSWR<Property[]>(['properties', filters], async () => {
    const params = new URLSearchParams()
    if (filters.location) params.set('location', filters.location)
    if (filters.type) params.set('type', filters.type)
    if (filters.priceMin != null) params.set('price_min', String(filters.priceMin))
    if (filters.priceMax != null) params.set('price_max', String(filters.priceMax))
    if (filters.sort) params.set('sort', filters.sort)
    return apiFetch<Property[]>(`/api/v1/properties/?${params.toString()}`)
  })
}

export function useProperty(id: string | undefined) {
  return useSWR<Property | undefined>(id ? ['property', id] : null, async () => {
    return apiFetch<Property>(`/api/v1/properties/${id}/`)
  })
}

export function useRelatedProperties(id: string | undefined) {
  return useSWR<Property[]>(id ? ['related', id] : null, async () => {
    return apiFetch<Property[]>(`/api/v1/properties/?related=true&property_id=${id}&limit=6`)
  })
}

export function useMyListings() {
  return useSWR<Property[]>(['my-listings'], async () => {
    return apiFetch<Property[]>('/api/v1/properties/my-listings/')
  })
}

export function useBookings(statuses?: string[]) {
  return useSWR<Booking[]>(['bookings', statuses], async () => {
    const query = statuses?.length ? `?status=${statuses.join(',')}` : ''
    return apiFetch<Booking[]>(`/api/v1/bookings/${query}`)
  })
}

export function useBooking(id: string | undefined) {
  return useSWR<Booking | undefined>(id ? ['booking', id] : null, async () => {
    return apiFetch<Booking>(`/api/v1/bookings/${id}/`)
  })
}

export function usePayments() {
  return useSWR<Payment[]>(['payments'], async () => {
    return apiFetch<Payment[]>('/api/v1/payments/')
  })
}

export function useRatings() {
  return useSWR<Rating[]>(['ratings'], async () => {
    return apiFetch<Rating[]>('/api/v1/ratings/')
  })
}

export function usePayouts() {
  return useSWR<Payout[]>(['payouts'], async () => {
    return apiFetch<Payout[]>('/api/v1/payments/?type=payout')
  })
}

export function useStrikes() {
  return useSWR<Strike[]>(['strikes'], async () => {
    return apiFetch<Strike[]>('/api/v1/moderation/strikes/')
  })
}

export function useSuspensions() {
  return useSWR<Suspension[]>(['suspensions'], async () => {
    return apiFetch<Suspension[]>('/api/v1/moderation/suspensions/')
  })
}

export function usePlatformStats() {
  return useSWR<PlatformStats>(['platform-stats'], async () => {
    return apiFetch<PlatformStats>('/api/v1/agents/stats/') // Note: This endpoint might need to be created on backend
  })
}

export function useNotifications() {
  return useSWR<AppNotification[]>(['notifications'], async () => {
    return apiFetch<AppNotification[]>('/api/v1/notifications/')
  })
}

export function useAgents() {
  return useSWR<Agent[]>(['agents'], async () => {
    return apiFetch<Agent[]>('/api/v1/agents/')
  })
}
