'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AgentPortalLayout } from '@/components/agent-portal-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit2, Eye, Trash2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const MOCK_LISTINGS = [
  {
    id: 1,
    title: '2-Bedroom Apartment in Kahawa Sukari',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop',
    status: 'AVAILABLE',
    views: 234,
    bookings: 5,
  },
  {
    id: 2,
    title: 'Modern Studio in Westlands',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop',
    status: 'LOCKED',
    views: 156,
    bookings: 2,
  },
  {
    id: 3,
    title: '3-Bedroom Townhouse in Kilimani',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1554224311-beee415c15cb?w=300&h=200&fit=crop',
    status: 'AVAILABLE',
    views: 89,
    bookings: 1,
  },
]

export default function ListingsPage() {
  const [filterStatus, setFilterStatus] = useState<string>('ALL')

  const filteredListings = MOCK_LISTINGS.filter(
    (listing) => filterStatus === 'ALL' || listing.status === filterStatus
  )

  const getStatusColor = (status: string) => {
    if (status === 'AVAILABLE') return 'bg-green-100 text-green-800'
    if (status === 'LOCKED') return 'bg-yellow-100 text-yellow-800'
    if (status === 'BOOKED') return 'bg-blue-100 text-blue-800'
    if (status === 'OCCUPIED') return 'bg-purple-100 text-purple-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <AgentPortalLayout title="My Listings" subtitle={`${filteredListings.length} active`}>
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {['ALL', 'AVAILABLE', 'LOCKED', 'BOOKED', 'OCCUPIED'].map((status) => {
          const count = status === 'ALL' 
            ? MOCK_LISTINGS.length 
            : MOCK_LISTINGS.filter(l => l.status === status).length
          
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                filterStatus === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {status} ({count})
            </button>
          )
        })}
        <Link href="/agent/listings/new" className="ml-auto">
          <Button className="gap-2">
            <Plus size={16} />
            <span className="hidden sm:inline">New Listing</span>
          </Button>
        </Link>
      </div>

      {/* Listings Table/Grid */}
      {filteredListings.length === 0 ? (
        <div className="glass rounded-lg p-12 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">No listings found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your filters</p>
          <Link href="/agent/listings/new">
            <Button>Create Your First Listing</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="glass rounded-lg p-6 flex flex-col md:flex-row gap-6 hover:shadow-glow-md transition-all"
            >
              {/* Image */}
              <div className="md:w-40 flex-shrink-0">
                <Image
                  src={listing.image}
                  alt={listing.title}
                  width={300}
                  height={200}
                  className="rounded-lg w-full h-40 object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{listing.title}</h3>
                  <Badge className={getStatusColor(listing.status)}>
                    {listing.status}
                  </Badge>
                </div>

                <p className="text-2xl font-bold text-primary mb-4">
                  {formatCurrency(listing.price)}/month
                </p>

                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                  <span>👁️ {listing.views} views</span>
                  <span>📅 {listing.bookings} bookings</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Eye size={16} />
                    View
                  </Button>
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Edit2 size={16} />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" className="gap-2">
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AgentPortalLayout>
  )
}
