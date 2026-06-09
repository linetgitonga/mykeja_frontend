'use client'

import { ReactNode } from 'react'
import { PortalNavigation } from '@/components/portal-navigation'
import { AGENT_PORTAL_NAV } from '@/lib/navigation'
import { Button } from '@/components/ui/button'
import { Bell, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'

interface AgentPortalLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
  status?: 'verified' | 'pending' | 'suspended'
}

export function AgentPortalLayout({
  children,
  title,
  subtitle,
  status,
}: AgentPortalLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and title */}
            <div>
              <h1 className="text-xl font-bold font-heading text-foreground">
                Agent Portal
              </h1>
              {status && (
                <div className="text-xs font-semibold mt-0.5">
                  {status === 'verified' && <span className="text-green-600">✓ Verified</span>}
                  {status === 'pending' && <span className="text-yellow-600">⏳ Pending Verification</span>}
                  {status === 'suspended' && <span className="text-red-600">⚠️ Suspended</span>}
                </div>
              )}
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>

              <Link href="/agent/profile">
                <Button variant="ghost" size="sm">
                  <Settings size={20} />
                </Button>
              </Link>

              <Button variant="destructive" size="sm" className="gap-2">
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="border-t border-border py-3 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <PortalNavigation items={AGENT_PORTAL_NAV} layout="horizontal" />
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {title && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold font-heading text-foreground mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </main>
    </div>
  )
}
