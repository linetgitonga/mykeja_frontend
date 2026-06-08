'use client'

import { MapPin } from 'lucide-react'
import Link from 'next/link'
import { StarRating } from '@/components/star-rating'
import { Card } from '@/components/ui/card'
import { KENYAN_AREAS } from '@/lib/mock-data'
import { formatKes } from '@/lib/format'
import { usePlatformStats } from '@/lib/hooks'

const testimonials = [
  {
    quote:
      'I locked an apartment in Kilimani on a Friday and paid via M-Pesa in seconds. The exact location unlocked instantly — no more guessing games.',
    name: 'Aisha N.',
    role: 'Tenant, Nairobi',
  },
  {
    quote:
      'As an agent, the verification badge gives my listings instant credibility. My bookings have doubled since joining.',
    name: 'Brian O.',
    role: 'Agent, Westlands',
  },
  {
    quote:
      'Finally a platform that protects renters. Being able to confirm my visit and rate the agent makes the whole process feel safe.',
    name: 'Mercy W.',
    role: 'Tenant, Mombasa',
  },
]

export function NeighbourhoodsAndProof() {
  const { data: stats } = usePlatformStats()
  const total = stats?.totalRatings ?? 0
  const dist = stats?.ratingDistribution ?? {}

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div id="neighbourhoods" className="scroll-mt-20">
        <h2 className="font-heading text-2xl font-700 sm:text-3xl">
          Explore neighbourhoods
        </h2>
        <p className="mt-1 text-muted-foreground">
          Popular areas tenants are searching right now.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {KENYAN_AREAS.map((area) => (
            <Link key={area.name} href={`/properties?location=${encodeURIComponent(area.name)}`}>
              <Card className="flex items-center justify-between p-5 transition-all hover:shadow-glow-md hover:-translate-y-0.5">
                <div>
                  <h3 className="flex items-center gap-1.5 font-heading text-lg font-600">
                    <MapPin className="size-4 text-primary" />
                    {area.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {area.count} listings · {area.city}
                  </p>
                </div>
                <p className="text-right text-sm font-600 text-primary">
                  {formatKes(area.avgPrice)}
                  <span className="block text-xs font-400 text-muted-foreground">
                    avg / mo
                  </span>
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {total >= 5 && (
        <div className="mt-20 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Card className="p-6">
            <h3 className="font-heading text-xl font-700">Loved by the community</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {total.toLocaleString()} verified ratings and counting.
            </p>
            <div className="mt-5 space-y-2.5">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = dist[star] ?? 0
                const pct = total ? Math.round((count / total) * 100) : 0
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="w-3 text-sm text-muted-foreground">{star}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-warning"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-xs text-muted-foreground">
                      {pct}%
                    </span>
                  </div>
                )
              })}
            </div>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((t) => (
              <Card key={t.name} className="flex flex-col justify-between p-6">
                <div>
                  <StarRating value={5} />
                  <p className="mt-3 text-pretty leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                </div>
                <div className="mt-4">
                  <p className="font-600">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
