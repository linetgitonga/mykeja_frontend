'use client'

import { Search } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { formatKes, PROPERTY_TYPE_LABELS } from '@/lib/format'

export function HeroSection() {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState([5000, 500000])

  function search() {
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (type) params.set('type', type)
    params.set('price_min', String(price[0]))
    params.set('price_max', String(price[1]))
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero-nairobi.png"
          alt="Aerial view of a Nairobi residential neighbourhood"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28">
        <div className="max-w-2xl text-balance">
          <span className="inline-flex rounded-full bg-background/20 px-3 py-1 text-sm font-600 text-white backdrop-blur">
            Trusted house hunting in Kenya
          </span>
          <h1 className="mt-4 font-heading text-4xl font-700 leading-tight text-white sm:text-5xl">
            Find your next home, with confidence.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-white/90">
            Browse verified listings, lock your choice for 3 days, and pay
            securely via M-Pesa. No scouts, no scams.
          </p>
        </div>

        <div className="glass-strong mt-8 max-w-4xl rounded-2xl p-4 shadow-glow-lg sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-1.5">
              <Label htmlFor="hero-location">Location</Label>
              <Input
                id="hero-location"
                placeholder="Nairobi, Mombasa, Kilimani..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Property type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Any type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PROPERTY_TYPE_LABELS).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <Label>Monthly budget</Label>
              <span className="text-sm font-600 text-primary">
                {formatKes(price[0])} – {formatKes(price[1])}
              </span>
            </div>
            <Slider
              value={price}
              min={5000}
              max={500000}
              step={5000}
              onValueChange={setPrice}
            />
          </div>

          <Button className="mt-5 w-full" size="lg" onClick={search}>
            <Search className="size-4" />
            Search homes
          </Button>
        </div>
      </div>
    </section>
  )
}
