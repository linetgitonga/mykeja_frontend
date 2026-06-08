// Lightweight API client for the MyKeja backend.
// When NEXT_PUBLIC_API_BASE_URL is set, requests hit the real Django REST API
// (with the JWT stored in localStorage). Otherwise we serve local demo data so
// the UI renders fully in preview.

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''
export const USE_MOCK = !API_BASE_URL

const TOKEN_KEY = 'mykeja_access_token'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string | null) {
  if (typeof window === 'undefined') return
  if (token) window.localStorage.setItem(TOKEN_KEY, token)
  else window.localStorage.removeItem(TOKEN_KEY)
}

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers)
  headers.set('Content-Type', 'application/json')
  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const data = await res.json()
      message = data.detail ?? data.message ?? message
    } catch {
      /* ignore */
    }
    throw new ApiError(message, res.status)
  }
  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}

// Simulate network latency for the mock layer so loading states are visible.
export function mockDelay<T>(data: T, ms = 600): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}
