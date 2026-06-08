'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { formatCurrency } from '@/lib/utils';
import { useBookings } from '@/lib/hooks';
import type { Booking } from '@/lib/types';

export default function AgentBookingsPage() {
  const [filter, setFilter] = useState('ALL');
  const { data: bookings, isLoading } = useBookings();

  const filteredBookings = (bookings || []).filter(
    (b) => filter === 'ALL' || b.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'default';
      case 'LOCKED': return 'warning';
      case 'PAID': return 'success';
      case 'FAILED': return 'error';
      case 'EXPIRED': return 'error';
      case 'CANCELLED': return 'error';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950 pb-12">
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-heading-2 font-bold text-text-primary dark:text-white">
            Bookings Management
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['ALL', 'PENDING', 'LOCKED', 'PAID'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                filter === status
                  ? 'bg-brand-primary text-white'
                  : 'bg-white dark:bg-surface-white text-text-primary border border-border-default'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading bookings...</div>
        ) : filteredBookings.length === 0 ? (
          <Card padding="lg" className="text-center py-12">
            <h3 className="text-heading-3 font-semibold mb-2">No bookings found</h3>
            <p className="text-text-secondary">There are no bookings matching your filter.</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredBookings.map((booking: Booking) => (
              <Card key={booking.id} padding="lg" className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{booking.property.title}</h3>
                    <Badge variant={getStatusColor(booking.status) as any}>{booking.status}</Badge>
                  </div>
                  <p className="text-sm text-text-secondary mb-1">
                    Tenant: {booking.tenantName}
                  </p>
                  <p className="text-sm text-text-secondary mb-1">
                    Visit Date: {new Date(booking.visitDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-brand-primary font-semibold">
                    Amount: {formatCurrency(booking.amount)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary">View Details</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
