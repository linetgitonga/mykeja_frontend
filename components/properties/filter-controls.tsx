'use client'

import { SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { AMENITIES, formatKes, PROPERTY_TYPE_LABELS } from '@/lib/format'
import type { PropertyFilters } from '@/lib/hooks'

export function FilterControls({
  filters,
  onChange,
  onReset,
}: {
  filters: PropertyFilters
  onChange: (f: Partial<PropertyFilters>) => void
  onReset: () => void
}) {
  const price = [filters.priceMin ?? 5000, filters.priceMax ?? 500000]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-heading text-lg font-600">
          <SlidersHorizontal className="size-4" />
          Filters
        </h3>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <X className="size-3.5" />
          Reset
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Property type</Label>
        <Select
          value={filters.type ?? 'ANY'}
          onValueChange={(v) => onChange({ type: v === 'ANY' ? undefined : v })}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ANY">Any type</SelectItem>
            {Object.entries(PROPERTY_TYPE_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Monthly budget</Label>
          <span className="text-xs font-600 text-primary">
            {formatKes(price[0])} – {formatKes(price[1])}
          </span>
        </div>
        <Slider
          value={price}
          min={5000}
          max={500000}
          step={5000}
          onValueChange={([min, max]) => onChange({ priceMin: min, priceMax: max })}
        />
      </div>

      <div className="space-y-2">
        <Label>Sort by</Label>
        <Select
          value={filters.sort ?? 'newest'}
          onValueChange={(v) => onChange({ sort: v })}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price_asc">Lowest price</SelectItem>
            <SelectItem value="price_desc">Highest price</SelectItem>
            <SelectItem value="popular">Most popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Amenities</Label>
        <div className="grid grid-cols-1 gap-2.5">
          {AMENITIES.map((a) => {
            const checked = filters.amenities?.includes(a) ?? false
            return (
              <label key={a} className="flex items-center gap-2.5 text-sm">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(c) => {
                    const set = new Set(filters.amenities ?? [])
                    if (c) set.add(a)
                    else set.delete(a)
                    onChange({ amenities: Array.from(set) })
                  }}
                />
                {a}
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}
