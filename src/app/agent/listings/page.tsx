'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Plus, Edit2, Eye, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useMyListings } from '@/lib/hooks';
import type { Property } from '@/lib/types';

export default function ListingsPage() {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const { data: listings, isLoading } = useMyListings();

  const filteredListings = (listings || []).filter(
    (listing) => filterStatus === 'ALL' || listing.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    if (status === 'AVAILABLE') return 'success';
    if (status === 'LOCKED') return 'warning';
    if (status === 'BOOKED') return 'info';
    if (status === 'OCCUPIED') return 'default';
    return 'error';
  };

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-heading-2 font-bold text-text-primary dark:text-white">
              My Listings
            </h1>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
              {filteredListings.length} properties
            </p>
          </div>
          <Link href="/agent/listings/new">
            <Button icon={<Plus size={16} />}>New Listing</Button>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['ALL', 'AVAILABLE', 'LOCKED', 'BOOKED', 'OCCUPIED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                filterStatus === status
                  ? 'bg-brand-primary text-white'
                  : 'bg-white dark:bg-surface-white text-text-primary border border-border-default dark:border-dark-border-default'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-20">Loading listings...</div>
        ) : filteredListings.length === 0 ? (
          <Card variant="flat" padding="lg" className="text-center">
            <h3 className="text-heading-2 font-semibold mb-2">
              No listings found
            </h3>
            <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
              Try adjusting your filters
            </p>
            <Link href="/agent/listings/new">
              <Button>Create Your First Listing</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredListings.map((listing: Property) => {
              const mainPhoto = listing.photos?.find(p => p.order === 0) || listing.photos?.[0];
              const imageUrl = mainPhoto?.url || '/placeholder.svg';
              
              return (
              <Card
                key={listing.id}
                variant="glass"
                padding="lg"
                className="flex flex-col md:flex-row gap-6"
              >
                {/* Image */}
                <div className="md:w-40 flex-shrink-0">
                  <Image
                    src={imageUrl}
                    alt={listing.title}
                    width={300}
                    height={200}
                    className="rounded-lg w-full h-40 object-cover bg-muted"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-heading-3 font-semibold text-text-primary dark:text-white">
                      {listing.title}
                    </h3>
                    <Badge variant={getStatusColor(listing.status) as any}>
                      {listing.status}
                    </Badge>
                  </div>

                  <p className="text-text-secondary dark:text-dark-text-secondary text-sm mb-2">
                    {listing.locationGeneral}
                  </p>

                  <p className="text-heading-3 font-bold text-brand-primary mb-4">
                    {formatCurrency(listing.price)}/mo
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <span className="text-text-secondary dark:text-dark-text-secondary">
                      👀 {listing.views} views
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/properties/${listing.id}`}>
                      <Button size="sm" variant="secondary" icon={<Eye size={14} />}>
                        View
                      </Button>
                    </Link>
                    <Link href={`/agent/listings/${listing.id}/edit`}>
                      <Button size="sm" variant="secondary" icon={<Edit2 size={14} />}>
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="secondary"
                      icon={<Trash2 size={14} />}
                      className="text-state-error"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            )})}
          </div>
        )}
      </div>
    </div>
  );
}
