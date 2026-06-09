'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'

interface PortalNavItem {
  label: string
  href: string
  icon: string
  count?: number
}

interface PortalNavigationProps {
  items: PortalNavItem[]
  layout?: 'vertical' | 'horizontal'
}

export function PortalNavigation({ items, layout = 'vertical' }: PortalNavigationProps) {
  const pathname = usePathname()
  const safeItems = Array.isArray(items) ? items : []

  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ size: number; className: string }> | undefined
    return IconComponent ? <IconComponent size={20} className="flex-shrink-0" /> : null
  }

  if (layout === 'horizontal') {
    return (
      <nav className="flex gap-1 overflow-x-auto pb-2">
        {safeItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              {getIcon(item.icon)}
              {item.label}
              {item.count !== undefined && (
                <span className="ml-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-destructive text-xs font-semibold text-white">
                  {item.count}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    )
  }

  return (
    <nav className="space-y-1">
      {safeItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
              isActive
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            )}
          >
            {getIcon(item.icon)}
            <span className="flex-1">{item.label}</span>
            {item.count !== undefined && (
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-destructive text-xs font-semibold text-white">
                {item.count}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
