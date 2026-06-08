'use client'

import { Bath, BedDouble, Heart, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { StarRating } from '@/components/star-rating'
import { VerificationBadge } from '@/components/verification-badge'
import { Card } from '@/components/ui/card'
import type { Property } from '@/lib/types'
import { formatKes, PROPERTY_TYPE_LABELS } from '@/lib/format'
import { cn } from '@/lib/utils'

export function PropertyCard({
  property,
  className,
}: {
  property: Property
  className?: string
}) {
  const [saved, setSaved] = useState(false)
  const feature =
    property.photos.find((p) => p.isFeatured) ?? property.photos[0]

  return (
    <Card
      className={cn(
        'group overflow-hidden p-0 transition-all duration-300 hover:shadow-glow-lg hover:-translate-y-0.5',
        className,
      )}
    >
      <Link href={`/properties/${property.id}`} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          <Image
            src={feature?.url || '/placeholder.svg'}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            <span className="rounded-full bg-background/85 px-2.5 py-1 text-xs font-600 text-foreground backdrop-blur">
              {PROPERTY_TYPE_LABELS[property.type]}
            </span>
            {property.featured && (
              <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-600 text-primary-foreground">
                Featured
              </span>
            )}
          </div>
          <button
            type="button"
            aria-label={saved ? 'Remove from saved' : 'Save property'}
            onClick={(e) => {
              e.preventDefault()
              setSaved((s) => !s)
            }}
            className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur transition-colors hover:bg-background"
          >
            <Heart
              className={cn('size-4.5', saved && 'fill-destructive text-destructive')}
            />
          </button>
        </div>
      </Link>

      <div className="flex flex-col gap-2 p-4">
        <Link href={`/properties/${property.id}`}>
          <h3 className="line-clamp-1 font-heading text-base font-600 leading-snug">
            {property.title}
          </h3>
        </Link>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          <span className="line-clamp-1">{property.locationGeneral}</span>
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <BedDouble className="size-4" />
            {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} bd`}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="size-4" />
            {property.bathrooms} ba
          </span>
          {property.distanceKm != null && (
            <span className="ml-auto text-xs">{property.distanceKm} km away</span>
          )}
        </div>

        <div className="mt-1 flex items-end justify-between gap-2">
          <p className="font-heading text-lg font-700 text-primary">
            {formatKes(property.price)}
            <span className="text-xs font-400 text-muted-foreground">/mo</span>
          </p>
          {property.agent.verificationStatus === 'VERIFIED' ? (
            <VerificationBadge agent={property.agent} />
          ) : property.agent.avgRating ? (
            <StarRating value={property.agent.avgRating} showValue />
          ) : null}
        </div>
      </div>
    </Card>
  )
}

export function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="aspect-[16/10] w-full animate-pulse bg-muted" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
      </div>
    </Card>
  )
}
