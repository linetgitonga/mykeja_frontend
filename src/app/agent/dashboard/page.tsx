'use client'

import React from 'react'
import Link from 'next/link'
import { AgentPortalLayout } from '@/components/agent-portal-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Home, Calendar, Star, AlertCircle, Plus, TrendingUp, ArrowRight } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function AgentDashboardPage() {
  // Mock data - in production this would come from API
  const agentData = {
    name: 'John Smith',
    businessName: 'Skyline Realty',
    status: 'verified' as const,
    activeListings: 12,
    pendingBookings: 8,
    rating: 4.8,
    strikes: 0,
    earnings: 45000,
  }

  const stats = [
    {
      label: 'Active Listings',
      value: agentData.activeListings.toString(),
      icon: Home,
      color: 'bg-blue-100 dark:bg-blue-900',
      href: '/agent/listings',
    },
    {
      label: 'Pending Bookings',
      value: agentData.pendingBookings.toString(),
      icon: Calendar,
      color: 'bg-yellow-100 dark:bg-yellow-900',
      href: '/agent/bookings',
    },
    {
      label: 'Average Rating',
      value: `${agentData.rating} / 5`,
      icon: Star,
      color: 'bg-green-100 dark:bg-green-900',
      href: '/agent/ratings',
    },
    {
      label: 'Strike Status',
      value: agentData.strikes.toString(),
      icon: AlertCircle,
      color: 'bg-red-100 dark:bg-red-900',
      href: '/agent/verification',
    },
  ]

  const recentActivity = [
    { type: 'booking', message: 'New booking for 2-Bed Apartment, Kahawa', date: '2 hours ago', icon: '📅' },
    { type: 'payment', message: 'Payment received - KES 5,000 commission', date: '1 day ago', icon: '💰' },
    { type: 'rating', message: '5-star rating received for your property', date: '3 days ago', icon: '⭐' },
  ]

  const quickActions = [
    { label: 'New Listing', href: '/agent/listings/new', icon: Plus },
    { label: 'View Bookings', href: '/agent/bookings', icon: Calendar },
    { label: 'Check Earnings', href: '/agent/earnings', icon: TrendingUp },
  ]

  return (
    <AgentPortalLayout status={agentData.status}>
      {/* Verification Status Banner */}
      <div className="glass rounded-lg p-6 mb-8 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground mb-1">
              ✓ Your account is verified
            </h3>
            <p className="text-sm text-muted-foreground">
              You can list properties and receive bookings immediately
            </p>
          </div>
          <Badge className="bg-green-100 text-green-700">Verified</Badge>
        </div>
      </div>

      {/* Stats Grid - 4 Column */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.href}>
              <div className="glass rounded-lg p-6 hover:shadow-glow-md transition-all cursor-pointer h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="text-primary" size={24} />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Link key={action.href} href={action.href} className="block">
              <Button className="w-full h-14 text-base gap-2">
                <Icon size={20} />
                {action.label}
              </Button>
            </Link>
          )
        })}
      </div>

      {/* Earnings Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Earnings This Month</h3>
          <p className="text-3xl font-bold text-primary mb-2">{formatCurrency(agentData.earnings)}</p>
          <p className="text-sm text-muted-foreground">↑ 12% from last month</p>
        </div>

        <div className="glass rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Performance Score</h3>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-primary">92</p>
            <p className="text-sm text-muted-foreground mb-1">/100</p>
          </div>
          <p className="text-sm text-muted-foreground">Excellent performance</p>
        </div>
      </div>

      {/* Recent Activity Timeline */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h3>

        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0">
              <div className="text-2xl mt-1">{activity.icon}</div>
              <div className="flex-1">
                <p className="text-foreground font-medium">{activity.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
              </div>
              <ArrowRight size={16} className="text-muted-foreground mt-1 flex-shrink-0" />
            </div>
          ))}
        </div>

        <Link href="/agent/activity">
          <Button variant="secondary" className="w-full mt-4">
            View All Activity
          </Button>
        </Link>
      </div>
    </AgentPortalLayout>
  )
}
