'use client';

import React from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import {
  Home,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const metrics = [
    {
      label: 'Active Listings',
      value: '342',
      icon: Home,
      color: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      label: 'Active Bookings',
      value: '156',
      icon: Calendar,
      color: 'bg-green-100 dark:bg-green-900',
    },
    {
      label: 'Pending Payments',
      value: 'KES 2.4M',
      icon: Clock,
      color: 'bg-yellow-100 dark:bg-yellow-900',
    },
    {
      label: 'Open Strikes',
      value: '8',
      icon: AlertTriangle,
      color: 'bg-red-100 dark:bg-red-900',
    },
    {
      label: 'Agents Awaiting Verification',
      value: '12',
      icon: Users,
      color: 'bg-purple-100 dark:bg-purple-900',
    },
    {
      label: 'Flagged Content',
      value: '3',
      icon: AlertTriangle,
      color: 'bg-orange-100 dark:bg-orange-900',
    },
  ];

  const alerts = [
    { type: 'critical', message: '2 agents suspended due to strikes' },
    { type: 'warning', message: '12 agents awaiting verification approval' },
    { type: 'info', message: '3 ratings awaiting moderation review' },
  ];

  const recentActivity = [
    {
      action: 'Agent verified',
      actor: 'Admin',
      entity: 'Skyline Realty',
      timestamp: '2 hours ago',
    },
    {
      action: 'Strike issued',
      actor: 'System',
      entity: 'Agent XYZ',
      timestamp: '5 hours ago',
    },
    {
      action: 'Booking completed',
      actor: 'User',
      entity: '2-Bed Apartment, Kahawa',
      timestamp: '1 day ago',
    },
  ];

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-heading-2 font-bold text-text-primary dark:text-white">
            Admin Dashboard
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        <div className="space-y-3 mb-8">
          {alerts.map((alert, index) => (
            <Card
              key={index}
              variant="elevated"
              padding="lg"
              className={`border-l-4 ${
                alert.type === 'critical'
                  ? 'border-state-error bg-red-50 dark:bg-red-900/20'
                  : alert.type === 'warning'
                  ? 'border-state-warning bg-yellow-50 dark:bg-yellow-900/20'
                  : 'border-brand-primary bg-blue-50 dark:bg-blue-900/20'
              }`}
            >
              <p
                className={`font-semibold ${
                  alert.type === 'critical'
                    ? 'text-red-900 dark:text-red-200'
                    : alert.type === 'warning'
                    ? 'text-yellow-900 dark:text-yellow-200'
                    : 'text-blue-900 dark:text-blue-200'
                }`}
              >
                {alert.message}
              </p>
            </Card>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label} variant="glass" padding="lg">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${metric.color} p-3 rounded-lg`}>
                    <Icon className="text-brand-primary" size={24} />
                  </div>
                </div>
                <p className="text-text-secondary dark:text-dark-text-secondary text-sm mb-1">
                  {metric.label}
                </p>
                <p className="text-heading-2 font-bold text-text-primary dark:text-white">
                  {metric.value}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Access */}
          <Card variant="glass" padding="lg">
            <h2 className="text-heading-2 font-bold mb-4 text-text-primary dark:text-white">
              Quick Access
            </h2>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="secondary">
                Verify Agents
              </Button>
              <Button className="w-full justify-start" variant="secondary">
                Review Ratings
              </Button>
              <Button className="w-full justify-start" variant="secondary">
                Manage Strikes
              </Button>
              <Button className="w-full justify-start" variant="secondary">
                View Disputes
              </Button>
              <Button className="w-full justify-start" variant="secondary">
                View Audit Log
              </Button>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card variant="glass" padding="lg">
            <h2 className="text-heading-2 font-bold mb-4 text-text-primary dark:text-white">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-4 border-b border-border-default dark:border-dark-border-default last:border-b-0"
                >
                  <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-text-primary dark:text-white font-medium">
                      {activity.action}: <span className="font-semibold">{activity.entity}</span>
                    </p>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                      {activity.actor} • {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
