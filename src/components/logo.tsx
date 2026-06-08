import { Home } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  href = '/',
}: {
  className?: string
  href?: string
}) {
  return (
    <Link href={href} className={cn('flex items-center gap-2', className)}>
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-glow-sm">
        <Home className="size-4.5" />
      </span>
      <span className="font-heading text-xl font-700 tracking-tight">
        My<span className="text-primary">Keja</span>
      </span>
    </Link>
  )
}
