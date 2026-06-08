'use client'

import { useState } from 'react'
import { SlidersHorizontal, MapPin } from 'lucide-react'
import { useProperties, type PropertyFilters } from '@/lib/hooks'
import { PropertyCard, PropertyCardSkeleton } from '@/components/property-card'
import { FilterControls } from '@/components/properties/filter-controls'
import { Button, buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

export function ListingsView({ initial }: { initial: PropertyFilters }) {
  const [filters, setFilters] = useState<PropertyFilters>({
    sort: 'newest',
    ...initial,
  })
  const { data: properties, isLoading } = useProperties(filters)

  function update(patch: Partial<PropertyFilters>) {
    setFilters((f) => ({ ...f, ...patch }))
  }
  function reset() {
    setFilters({ location: filters.location, sort: 'newest' })
  }

  const list = properties ?? []

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-700 md:text-3xl">
          {filters.location ? (
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-6 text-primary" />
              Rentals in {filters.location}
            </span>
          ) : (
            'Explore verified rentals'
          )}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isLoading
            ? 'Searching listings…'
            : `${list.length} ${list.length === 1 ? 'home' : 'homes'} available`}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        {/* Desktop filter rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border bg-card p-5">
            <FilterControls filters={filters} onChange={update} onReset={reset} />
          </div>
        </aside>

        <div>
          {/* Mobile filter trigger */}
          <div className="mb-5 lg:hidden">
            <Sheet>
              <SheetTrigger className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                <SlidersHorizontal className="size-4" />
                Filters & sort
              </SheetTrigger>
              <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto p-5">
                <SheetTitle className="sr-only">Filters</SheetTitle>
                <FilterControls filters={filters} onChange={update} onReset={reset} />
              </SheetContent>
            </Sheet>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          ) : list.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
              <p className="font-heading text-lg font-600">
                No homes match your filters
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try widening your price range or clearing some filters.
              </p>
              <Button variant="outline" className="mt-4" onClick={reset}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
