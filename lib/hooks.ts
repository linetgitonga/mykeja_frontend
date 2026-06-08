'use client'

import useSWR from 'swr'
import { apiFetch, mockDelay, USE_MOCK } from './api-client'
import {
  AGENTS,
  BOOKINGS,
  NOTIFICATIONS,
  PAYMENTS,
  PAYOUTS,
  PLATFORM_STATS,
  PROPERTIES,
  RATINGS,
  STRIKES,
  SUSPENSIONS,
} from './mock-data'
import type {
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

function filterProperties(filters: PropertyFilters): Property[] {
  let list = PROPERTIES.filter((p) => p.status !== 'REMOVED')
  if (filters.location) {
    const loc = filters.location.toLowerCase()
    list = list.filter(
      (p) =>
        p.locationGeneral.toLowerCase().includes(loc) ||
        p.city.toLowerCase().includes(loc),
    )
  }
  if (filters.query) {
    const q = filters.query.toLowerCase()
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.locationGeneral.toLowerCase().includes(q),
    )
  }
  if (filters.type) list = list.filter((p) => p.type === filters.type)
  if (filters.priceMin != null) list = list.filter((p) => p.price >= filters.priceMin!)
  if (filters.priceMax != null) list = list.filter((p) => p.price <= filters.priceMax!)
  if (filters.amenities?.length)
    list = list.filter((p) => filters.amenities!.every((a) => p.amenities.includes(a)))
  switch (filters.sort) {
    case 'price_asc':
      list = [...list].sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      list = [...list].sort((a, b) => b.price - a.price)
      break
    case 'popular':
      list = [...list].sort((a, b) => b.views - a.views)
      break
    default:
      list = [...list].sort(
        (a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt),
      )
  }
  return list
}

export function useFeaturedProperties() {
  return useSWR<Property[]>(['featured-properties'], async () => {
    if (USE_MOCK) return mockDelay(PROPERTIES.filter((p) => p.featured))
    return apiFetch<Property[]>('/api/v1/properties/?featured=true&limit=8')
  })
}

export function useProperties(filters: PropertyFilters) {
  return useSWR<Property[]>(['properties', filters], async () => {
    if (USE_MOCK) return mockDelay(filterProperties(filters))
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
    if (USE_MOCK) return mockDelay(PROPERTIES.find((p) => p.id === id))
    return apiFetch<Property>(`/api/v1/properties/${id}/`)
  })
}

export function useRelatedProperties(id: string | undefined) {
  return useSWR<Property[]>(id ? ['related', id] : null, async () => {
    if (USE_MOCK) {
      const current = PROPERTIES.find((p) => p.id === id)
      return mockDelay(
        PROPERTIES.filter((p) => p.id !== id && p.city === current?.city).slice(0, 6),
      )
    }
    return apiFetch<Property[]>(`/api/v1/properties/?related=true&property_id=${id}&limit=6`)
  })
}

export function useMyListings() {
  return useSWR<Property[]>(['my-listings'], async () => {
    if (USE_MOCK) return mockDelay(PROPERTIES.filter((p) => p.agent.id === 'agent-1'))
    return apiFetch<Property[]>('/api/v1/properties/my-listings/')
  })
}

export function useBookings(statuses?: string[]) {
  return useSWR<Booking[]>(['bookings', statuses], async () => {
    if (USE_MOCK) {
      const list = statuses?.length
        ? BOOKINGS.filter((b) => statuses.includes(b.status))
        : BOOKINGS
      return mockDelay(list)
    }
    return apiFetch<Booking[]>('/api/v1/bookings/')
  })
}

export function useBooking(id: string | undefined) {
  return useSWR<Booking | undefined>(id ? ['booking', id] : null, async () => {
    if (USE_MOCK) return mockDelay(BOOKINGS.find((b) => b.id === id))
    return apiFetch<Booking>(`/api/v1/bookings/${id}/`)
  })
}

export function usePayments() {
  return useSWR<Payment[]>(['payments'], async () => {
    if (USE_MOCK) return mockDelay(PAYMENTS)
    return apiFetch<Payment[]>('/api/v1/payments/')
  })
}

export function useRatings() {
  return useSWR<Rating[]>(['ratings'], async () => {
    if (USE_MOCK) return mockDelay(RATINGS)
    return apiFetch<Rating[]>('/api/v1/ratings/')
  })
}

export function usePayouts() {
  return useSWR<Payout[]>(['payouts'], async () => {
    if (USE_MOCK) return mockDelay(PAYOUTS)
    return apiFetch<Payout[]>('/api/v1/payments/?type=payout')
  })
}

export function useStrikes() {
  return useSWR<Strike[]>(['strikes'], async () => {
    if (USE_MOCK) return mockDelay(STRIKES)
    return apiFetch<Strike[]>('/api/v1/moderation/strikes/')
  })
}

export function useSuspensions() {
  return useSWR<Suspension[]>(['suspensions'], async () => {
    if (USE_MOCK) return mockDelay(SUSPENSIONS)
    return apiFetch<Suspension[]>('/api/v1/moderation/suspensions/')
  })
}

export function usePlatformStats() {
  return useSWR<PlatformStats>(['platform-stats'], async () => {
    if (USE_MOCK) return mockDelay(PLATFORM_STATS, 300)
    return apiFetch<PlatformStats>('/api/v1/agents/stats/')
  })
}

export function useNotifications() {
  return useSWR<AppNotification[]>(['notifications'], async () => {
    if (USE_MOCK) return mockDelay(NOTIFICATIONS, 300)
    return apiFetch<AppNotification[]>('/api/v1/notifications/')
  })
}

export function useAgents() {
  return useSWR(['agents'], async () => mockDelay(AGENTS, 300))
}
