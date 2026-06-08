'use client'

import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { PropertyCard, PropertyCardSkeleton } from '@/components/property-card'
import { Button } from '@/components/ui/button'
import { useFeaturedProperties } from '@/lib/hooks'

export function FeaturedRail() {
  const { data, isLoading } = useFeaturedProperties()
  const railRef = useRef<HTMLDivElement>(null)

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-700 sm:text-3xl">
            Featured listings
          </h2>
          <p className="mt-1 text-muted-foreground">
            Handpicked homes from verified agents across Kenya.
          </p>
        </div>
        <Button variant="ghost" asChild className="shrink-0">
          <a href="/properties">
            View all
            <ArrowRight className="size-4" />
          </a>
        </Button>
      </div>

      <div
        ref={railRef}
        className="no-scrollbar mt-6 flex snap-x gap-5 overflow-x-auto pb-2"
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-[300px] shrink-0 snap-start">
                <PropertyCardSkeleton />
              </div>
            ))
          : data?.map((p) => (
              <div key={p.id} className="w-[300px] shrink-0 snap-start">
                <PropertyCard property={p} />
              </div>
            ))}
      </div>
    </section>
  )
}
