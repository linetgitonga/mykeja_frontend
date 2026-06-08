'use client'

import { useState } from 'react'
import {
  Bath,
  BedDouble,
  CalendarCheck,
  Check,
  Heart,
  Layers,
  MapPin,
  PawPrint,
  Share2,
  Sofa,
} from 'lucide-react'
import { notFound } from 'next/navigation'
import { PropertyGallery } from '@/components/properties/property-gallery'
import { BookingDialog } from '@/components/properties/booking-dialog'
import { PropertyCard } from '@/components/property-card'
import { StarRating } from '@/components/star-rating'
import { VerificationBadge } from '@/components/verification-badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useProperty, useRelatedProperties } from '@/lib/hooks'
import {
  formatDate,
  formatKes,
  FURNISHING_LABELS,
  PROPERTY_TYPE_LABELS,
} from '@/lib/format'

export function PropertyDetail({ id }: { id: string }) {
  const { data: property, isLoading } = useProperty(id)
  const { data: related } = useRelatedProperties(id)
  const [bookingOpen, setBookingOpen] = useState(false)

  if (isLoading) return <DetailSkeleton />
  if (!property) return notFound()

  const facts = [
    {
      icon: BedDouble,
      label: property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} Bedrooms`,
    },
    { icon: Bath, label: `${property.bathrooms} Bathrooms` },
    { icon: Layers, label: property.floor },
    { icon: Sofa, label: FURNISHING_LABELS[property.furnishing] },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">
      {/* Breadcrumb + actions */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 text-primary" />
          {property.locationGeneral}, {property.city}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="size-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button variant="outline" size="sm">
            <Heart className="size-4" />
            <span className="hidden sm:inline">Save</span>
          </Button>
        </div>
      </div>

      <PropertyGallery photos={property.photos} title={property.title} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Main column */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-600 text-primary">
              {PROPERTY_TYPE_LABELS[property.type]}
            </span>
            {property.status === 'AVAILABLE' && (
              <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-600 text-success">
                Available now
              </span>
            )}
          </div>
          <h1 className="mt-3 text-pretty font-heading text-2xl font-700 md:text-3xl">
            {property.title}
          </h1>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {facts.map((f) => (
              <div
                key={f.label}
                className="flex flex-col items-center gap-1.5 rounded-xl border bg-card p-4 text-center"
              >
                <f.icon className="size-5 text-primary" />
                <span className="text-sm font-600">{f.label}</span>
              </div>
            ))}
          </div>

          <Separator className="my-7" />

          <section>
            <h2 className="font-heading text-lg font-700">About this home</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {property.description}
            </p>
          </section>

          <Separator className="my-7" />

          <section>
            <h2 className="font-heading text-lg font-700">Amenities</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {property.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2 text-sm">
                  <span className="flex size-5 items-center justify-center rounded-full bg-success/15">
                    <Check className="size-3 text-success" />
                  </span>
                  {a}
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-7" />

          <section className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <span className="flex items-center gap-2">
              <CalendarCheck className="size-4 text-primary" />
              Available from {formatDate(property.availableDate)}
            </span>
            <span className="flex items-center gap-2">
              <PawPrint className="size-4 text-primary" />
              {property.petPolicy}
            </span>
          </section>
        </div>

        {/* Sticky booking sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-heading text-2xl font-700 text-primary">
                  {formatKes(property.price)}
                </p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
              {property.agent.avgRating && (
                <StarRating value={property.agent.avgRating} showValue size={14} />
              )}
            </div>

            <Button
              className="mt-4 w-full"
              size="lg"
              disabled={property.status !== 'AVAILABLE'}
              onClick={() => setBookingOpen(true)}
            >
              {property.status === 'AVAILABLE' ? 'Book a viewing' : 'Currently unavailable'}
            </Button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Refundable KES 200 booking fee · Secured by M-Pesa
            </p>

            <Separator className="my-5" />

            {/* Agent */}
            <div className="flex items-center gap-3">
              <Avatar className="size-12">
                <AvatarImage src={property.agent.avatarUrl} alt="" />
                <AvatarFallback>
                  {property.agent.fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="line-clamp-1 font-600">{property.agent.businessName}</p>
                <VerificationBadge agent={property.agent} />
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-muted/50 p-2.5 text-center">
                <dt className="text-xs text-muted-foreground">Rating</dt>
                <dd className="font-700">
                  {property.agent.avgRating?.toFixed(1) ?? '—'}
                </dd>
              </div>
              <div className="rounded-lg bg-muted/50 p-2.5 text-center">
                <dt className="text-xs text-muted-foreground">Completion</dt>
                <dd className="font-700">{property.agent.completionRate}%</dd>
              </div>
            </dl>
          </Card>
        </aside>
      </div>

      {related && related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-heading text-xl font-700">Similar homes nearby</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 3).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}

      <BookingDialog
        property={property}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
      />
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
      <div className="aspect-[16/9] w-full animate-pulse rounded-xl bg-muted" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-24 w-full animate-pulse rounded bg-muted" />
          <div className="h-40 w-full animate-pulse rounded bg-muted" />
        </div>
        <div className="h-64 w-full animate-pulse rounded-xl bg-muted" />
      </div>
    </div>
  )
}
