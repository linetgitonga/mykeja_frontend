'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import type { PropertyPhoto } from '@/lib/types'
import { cn } from '@/lib/utils'

export function PropertyGallery({
  photos,
  title,
}: {
  photos: PropertyPhoto[]
  title: string
}) {
  const ordered = [...photos].sort((a, b) => a.order - b.order)
  const [active, setActive] = useState(0)
  const main = ordered[active] ?? ordered[0]

  return (
    <div className="grid gap-3 md:grid-cols-[1fr_110px]">
      <Dialog>
        <DialogTrigger
          className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted md:aspect-[16/9]"
        >
            <Image
              src={main?.url || '/placeholder.svg'}
              alt={title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 70vw"
              className="object-cover"
            />
            <span className="absolute bottom-3 right-3 rounded-full bg-background/85 px-3 py-1 text-xs font-600 backdrop-blur">
              {ordered.length} photos
            </span>
        </DialogTrigger>
        <DialogContent className="max-w-4xl p-2">
          <DialogTitle className="sr-only">{title} photos</DialogTitle>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={main?.url || '/placeholder.svg'}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto p-1">
            {ordered.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  'relative size-16 shrink-0 overflow-hidden rounded-md border-2',
                  i === active ? 'border-primary' : 'border-transparent',
                )}
              >
                <Image src={p.url} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Thumbnail rail */}
      <div className="flex gap-3 md:flex-col">
        {ordered.slice(0, 4).map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              'relative aspect-square flex-1 overflow-hidden rounded-lg border-2 bg-muted md:aspect-[16/11]',
              i === active ? 'border-primary' : 'border-transparent',
            )}
          >
            <Image src={p.url} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
