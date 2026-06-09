'use client'

import React, { useState } from 'react'
import { AgentPortalLayout } from '@/components/agent-portal-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { Phone, MessageSquare, CheckCircle } from 'lucide-react'

export default function AgentBookingsPage() {
  const [filter, setFilter] = useState('ALL')

  // Mock data
  const bookings = [
    {
      id: 1,
      propertyTitle: '2-Bed Apartment in Kahawa Sukari',
      tenantName: 'Alice Johnson',
      tenantPhone: '+254712345678',
      visitDate: '2026-06-15',
      price: 35000,
      status: 'LOCKED',
      daysRemaining: 2,
    },
    {
      id: 2,
      propertyTitle: 'Modern Studio in Westlands',
      tenantName: 'Bob Smith',
      tenantPhone: '+254798765432',
      visitDate: '2026-06-10',
      price: 38000,
      status: 'PAID',
      daysRemaining: 0,
    },
    {
      id: 3,
      propertyTitle: '3-Bedroom Townhouse in Kilimani',
      tenantName: 'Carol White',
      tenantPhone: '+254701234567',
      visitDate: '2026-06-18',
      price: 65000,
      status: 'PENDING',
      daysRemaining: 5,
    },
  ]

  const filteredBookings = bookings.filter(
    (b) => filter === 'ALL' || b.status === filter
  )

  const getStatusColor = (status: string) => {
    if (status === 'PENDING') return 'bg-yellow-100 text-yellow-800'
    if (status === 'LOCKED') return 'bg-blue-100 text-blue-800'
    if (status === 'PAID') return 'bg-green-100 text-green-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <AgentPortalLayout title="Bookings Management" subtitle="Manage property bookings and tenant interactions">
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {['ALL', 'PENDING', 'LOCKED', 'PAID'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
              filter === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {status} ({bookings.filter(b => status === 'ALL' || b.status === status).length})
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="glass rounded-lg p-12 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">No bookings found</h3>
          <p className="text-muted-foreground">There are no bookings matching your filter.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="glass rounded-lg p-6 hover:shadow-glow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left: Booking Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bold text-lg text-foreground">{booking.propertyTitle}</h3>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                      {booking.status === 'LOCKED' && booking.daysRemaining > 0 && (
                        <span className="ml-1">({booking.daysRemaining}d)</span>
                      )}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Tenant</p>
                      <p className="font-semibold text-foreground">{booking.tenantName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Visit Date</p>
                      <p className="font-semibold text-foreground">
                        {new Date(booking.visitDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Monthly Rent</p>
                      <p className="font-semibold text-primary">{formatCurrency(booking.price)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Your Commission</p>
                      <p className="font-semibold text-green-600">
                        {formatCurrency(Math.round(booking.price * 0.05))}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex gap-2 md:flex-col md:justify-end">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="gap-2 flex-1 md:flex-none"
                    title={`Call ${booking.tenantName}`}
                  >
                    <Phone size={16} />
                    <span className="hidden sm:inline">Call</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="gap-2 flex-1 md:flex-none"
                  >
                    <MessageSquare size={16} />
                    <span className="hidden sm:inline">Message</span>
                  </Button>
                  {booking.status === 'PAID' && (
                    <Button
                      size="sm"
                      className="gap-2 flex-1 md:flex-none"
                    >
                      <CheckCircle size={16} />
                      <span className="hidden sm:inline">Confirm</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AgentPortalLayout>
  )
}

