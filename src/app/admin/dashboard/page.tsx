'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold font-heading text-foreground">
            Admin Dashboard
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        <div className="space-y-3 mb-8">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`glass rounded-lg p-4 border-l-4 ${
                alert.type === 'critical'
                  ? 'border-destructive bg-destructive/10'
                  : alert.type === 'warning'
                  ? 'border-warning bg-warning/10'
                  : 'border-primary bg-primary/10'
              }`}
            >
              <p
                className={`font-semibold ${
                  alert.type === 'critical'
                    ? 'text-destructive'
                    : alert.type === 'warning'
                    ? 'text-warning'
                    : 'text-primary'
                }`}
              >
                {alert.message}
              </p>
            </div>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="glass rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${metric.color} p-3 rounded-lg`}>
                    <Icon className="text-primary" size={24} />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-1">
                  {metric.label}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {metric.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Access */}
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-bold font-heading mb-4 text-foreground">
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
          </div>

          {/* Recent Activity */}
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-bold font-heading mb-4 text-foreground">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-4 border-b border-border last:border-b-0"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-foreground font-medium">
                      {activity.action}: <span className="font-semibold">{activity.entity}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.actor} • {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
