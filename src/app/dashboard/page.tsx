'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Calendar, Settings, LogOut } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Booking {
  id: string;
  propertyTitle: string;
  propertyImage: string;
  price: number;
  visitDate: string;
  status: 'PENDING' | 'LOCKED' | 'PAID';
  confirmationStatus: null | 'VIEWED' | 'NOT_VIEWED' | 'AGENT_ABSENT';
}

interface SavedProperty {
  id: string;
  title: string;
  image: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'saved' | 'profile'>('bookings');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Mock data
  const bookings: Booking[] = [
    {
      id: '1',
      propertyTitle: '2-Bedroom Apartment in Kahawa Sukari',
      propertyImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop',
      price: 35000,
      visitDate: '2026-06-15',
      status: 'PAID',
      confirmationStatus: null,
    },
    {
      id: '2',
      propertyTitle: 'Modern Studio in Westlands',
      propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop',
      price: 38000,
      visitDate: '2026-06-10',
      status: 'PAID',
      confirmationStatus: 'VIEWED',
    },
  ];

  const savedProperties: SavedProperty[] = [
    {
      id: '1',
      title: '3-Bedroom Apartment in Kilimani',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop',
      price: 65000,
      location: 'Kilimani, Nairobi',
      beds: 3,
      baths: 2,
    },
    {
      id: '2',
      title: 'Spacious Townhouse in Lavington',
      image: 'https://images.unsplash.com/photo-1554224311-beee415c15cb?w=300&h=200&fit=crop',
      price: 145000,
      location: 'Lavington, Nairobi',
      beds: 4,
      baths: 3,
    },
  ];

  const handleConfirmVisit = (booking: Booking, status: string) => {
    console.log(`Confirming visit for booking ${booking.id} with status ${status}`);
    setShowConfirmModal(false);
    setSelectedBooking(null);
  };

  const getStatusColor = (status: string) => {
    if (status === 'PAID') return 'default';
    if (status === 'LOCKED') return 'secondary';
    return 'outline';
  };

  const getConfirmationColor = (status: string | null) => {
    if (status === 'VIEWED') return 'default';
    if (status === 'NOT_VIEWED') return 'destructive';
    if (status === 'AGENT_ABSENT') return 'secondary';
    return 'destructive';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground">
              My Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, John Doe
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <Settings size={16} />
              Settings
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          {[
            { id: 'bookings', label: 'My Bookings' },
            { id: 'saved', label: 'Saved Properties' },
            { id: 'profile', label: 'Profile' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-xl font-bold font-heading mb-6 text-foreground">
              My Bookings
            </h2>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="glass rounded-lg p-6 flex flex-col md:flex-row gap-6"
                >
                  {/* Image */}
                  <div className="md:w-40 flex-shrink-0">
                    <Image
                      src={booking.propertyImage}
                      alt={booking.propertyTitle}
                      width={300}
                      height={200}
                      className="rounded-lg w-full h-40 object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {booking.propertyTitle}
                      </h3>
                      <Badge variant={getStatusColor(booking.status) as any}>
                        {booking.status === 'PAID' && '✓ Paid'}
                        {booking.status === 'LOCKED' && 'Locked (3 days)'}
                        {booking.status === 'PENDING' && 'Awaiting Payment'}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground mb-3">
                      Visit Date: {formatDate(booking.visitDate)}
                    </p>

                    <p className="text-lg font-bold text-primary mb-4">
                      {formatCurrency(booking.price)}/month
                    </p>

                    {/* Confirmation Status */}
                    {booking.status === 'PAID' && booking.visitDate < new Date().toISOString() && !booking.confirmationStatus && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowConfirmModal(true);
                        }}
                      >
                        Confirm Your Visit
                      </Button>
                    )}

                    {booking.confirmationStatus && (
                      <Badge variant={getConfirmationColor(booking.confirmationStatus) as any}>
                        {booking.confirmationStatus === 'VIEWED' && '✓ Visited'}
                        {booking.confirmationStatus === 'NOT_VIEWED' && 'Did Not Visit'}
                        {booking.confirmationStatus === 'AGENT_ABSENT' && 'Agent Absent'}
                      </Badge>
                    )}

                    {booking.confirmationStatus === 'VIEWED' && (
                      <Button variant="secondary" size="sm">
                        Leave a Rating
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            <h2 className="text-xl font-bold font-heading mb-6 text-foreground">
              Saved Properties
            </h2>

            {savedProperties.length === 0 ? (
              <div className="glass rounded-lg p-8 text-center">
                <Heart size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold font-heading mb-2">
                  No saved properties
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add listings to your favorites to save them for later
                </p>
                <Link href="/properties">
                  <Button>Browse Listings</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.map((property) => (
                  <div
                    key={property.id}
                    className="glass rounded-lg overflow-hidden hover:shadow-glow-md transition-shadow"
                  >
                    <Image
                      src={property.image}
                      alt={property.title}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {property.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {property.location}
                      </p>
                      <p className="text-lg font-bold text-primary mb-3">
                        {formatCurrency(property.price)}/mo
                      </p>
                      <div className="flex gap-2 text-sm">
                        <span className="flex items-center gap-1">
                          🛏️ {property.beds} bed
                        </span>
                        <span className="flex items-center gap-1">
                          🚿 {property.baths} bath
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold font-heading mb-6 text-foreground">
              Profile Settings
            </h2>

            <div className="glass rounded-lg p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-2 rounded-md border border-border bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full px-4 py-2 rounded-md border border-border bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue="+254712345678"
                  className="w-full px-4 py-2 rounded-md border border-border bg-background"
                />
              </div>

              <Button className="w-full">Save Changes</Button>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Visit Modal */}
      {showConfirmModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass rounded-lg p-8 max-w-md w-full shadow-glow-lg">
            <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">
              Did you visit the property?
            </h3>

            <Image
              src={selectedBooking.propertyImage}
              alt={selectedBooking.propertyTitle}
              width={300}
              height={200}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            <p className="text-foreground mb-6">{selectedBooking.propertyTitle}</p>

            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => handleConfirmVisit(selectedBooking, 'VIEWED')}
              >
                Yes, I Visited
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => handleConfirmVisit(selectedBooking, 'NOT_VIEWED')}
              >
                No, I Didn&apos;t Visit
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => handleConfirmVisit(selectedBooking, 'AGENT_ABSENT')}
              >
                Agent Was Absent
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
