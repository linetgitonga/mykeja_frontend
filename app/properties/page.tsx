import { Suspense } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ListingsView } from '@/components/properties/listings-view'

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string; type?: string; q?: string }>
}) {
  const sp = await searchParams
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Suspense>
          <ListingsView
            initial={{
              location: sp.location,
              type: sp.type,
              query: sp.q,
            }}
          />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
