import Link from 'next/link'
import { Logo } from '@/components/logo'

const columns = [
  {
    title: 'Platform',
    links: [
      { href: '/properties', label: 'Browse listings' },
      { href: '/#how-it-works', label: 'How it works' },
      { href: '/register', label: 'List a property' },
      { href: '/agent/dashboard', label: 'Agent portal' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '#', label: 'About us' },
      { href: '#', label: 'Careers' },
      { href: '#', label: 'Blog' },
      { href: '#', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '#', label: 'Terms of Service' },
      { href: '#', label: 'Privacy Policy' },
      { href: '#', label: 'Compliance' },
      { href: '#', label: 'Cookie Policy' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-3">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Kenya&apos;s trusted house hunting platform. Verified agents, smart
              locking, and secure M-Pesa payments.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-600">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MyKeja. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Made for Kenya, with care.</p>
        </div>
      </div>
    </footer>
  )
}
