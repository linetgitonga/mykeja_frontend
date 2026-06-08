'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Home, Calendar, Star, AlertCircle, Plus, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useMyListings, useBookings, usePlatformStats } from '@/lib/hooks';

export default function AgentDashboardPage() {
  const { data: listings } = useMyListings();
  const { data: bookings } = useBookings();
  const { data: statsData } = usePlatformStats();

  const activeListingsCount = listings?.filter(l => l.status === 'AVAILABLE').length || 0;
  const pendingBookingsCount = bookings?.filter(b => ['PENDING', 'LOCKED', 'PAID'].includes(b.status)).length || 0;

  const stats = [
    {
      label: 'Active Listings',
      value: activeListingsCount.toString(),
      icon: Home,
      color: 'bg-blue-100 dark:bg-blue-900',
      href: '/agent/listings',
    },
    {
      label: 'Pending Bookings',
      value: pendingBookingsCount.toString(),
      icon: Calendar,
      color: 'bg-yellow-100 dark:bg-yellow-900',
      href: '/agent/bookings',
    },
    {
      label: 'Average Rating',
      value: '4.8 / 5', // Hardcoded for now until we have me endpoint
      icon: Star,
      color: 'bg-green-100 dark:bg-green-900',
      href: '/agent/ratings',
    },
    {
      label: 'Strike Status',
      value: '0', // Hardcoded for now
      icon: AlertCircle,
      color: 'bg-red-100 dark:bg-red-900',
      href: '/agent/verification',
    },
  ];

  const recentActivity = [
    { type: 'booking', message: 'New booking for 2-Bed Apartment, Kahawa', date: '2 hours ago' },
    { type: 'payment', message: 'Payment received - KES 5,000 commission', date: '1 day ago' },
    { type: 'rating', message: '5-star rating received for your property', date: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-heading-2 font-bold text-text-primary dark:text-white">
            Agent Dashboard
          </h1>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
            Welcome back
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Verification Status Banner */}
        <Card variant="elevated" padding="lg" className="mb-8 bg-green-50 dark:bg-green-900/20 border border-state-success">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-green-900 dark:text-green-200">
                ✓ Your account is verified
              </p>
              <p className="text-sm text-green-800 dark:text-green-300">
                You can list properties and receive bookings
              </p>
            </div>
            <Badge variant="success">Verified</Badge>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.label} href={stat.href}>
                <Card variant="glass" padding="lg" interactive>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="text-brand-primary" size={24} />
                    </div>
                  </div>
                  <p className="text-text-secondary dark:text-dark-text-secondary text-sm mb-1">
                    {stat.label}
                  </p>
                  <p className="text-heading-2 font-bold text-text-primary dark:text-white">
                    {stat.value}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/agent/listings/new" className="block w-full">
            <Button className="w-full h-14 text-base" icon={<Plus size={18} />}>
              New Listing
            </Button>
          </Link>
          <Link href="/agent/bookings" className="block w-full">
            <Button className="w-full h-14 text-base" variant="secondary">
              View Bookings
            </Button>
          </Link>
          <Link href="/agent/payouts" className="block w-full">
            <Button className="w-full h-14 text-base" variant="secondary">
              Payouts
            </Button>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card variant="glass" padding="lg">
          <h2 className="text-heading-2 font-bold mb-6 text-text-primary dark:text-white">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-border-default dark:border-dark-border-default last:border-b-0">
                <div className="w-3 h-3 rounded-full bg-brand-primary mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-text-primary dark:text-white font-medium">
                    {activity.message}
                  </p>
                  <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                    {activity.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
