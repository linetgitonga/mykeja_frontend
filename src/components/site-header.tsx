'use client'

import { Menu, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Logo } from '@/components/logo'
import { Button, buttonVariants } from '@/components/ui/button'

const links = [
  { href: '/properties', label: 'Browse' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#neighbourhoods', label: 'Neighbourhoods' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-500 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/properties" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
            <Search className="size-4" />
            Search
          </Link>
          <Link href="/auth/login" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
            Sign In
          </Link>
          <Link href="/auth/register" className={buttonVariants({ size: 'sm' })}>
            Register
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-500 text-foreground hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Link href="/login" className={buttonVariants({ variant: 'outline' })}>
                Sign In
              </Link>
              <Link href="/register" className={buttonVariants()}>
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
