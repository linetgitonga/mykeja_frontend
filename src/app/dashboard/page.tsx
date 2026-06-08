'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
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
    if (status === 'PAID') return 'success';
    if (status === 'LOCKED') return 'warning';
    return 'default';
  };

  const getConfirmationColor = (status: string | null) => {
    if (status === 'VIEWED') return 'success';
    if (status === 'NOT_VIEWED') return 'error';
    if (status === 'AGENT_ABSENT') return 'warning';
    return 'error';
  };

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-heading-2 font-bold text-text-primary dark:text-white">
              My Dashboard
            </h1>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
              Welcome back, John Doe
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" icon={<Settings size={16} />} size="md">
              Settings
            </Button>
            <Button variant="ghost" icon={<LogOut size={16} />} size="md">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border-default dark:border-dark-border-default">
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
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-text-secondary dark:text-dark-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-heading-2 font-bold mb-6 text-text-primary dark:text-white">
              My Bookings
            </h2>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card
                  key={booking.id}
                  variant="glass"
                  padding="lg"
                  className="flex flex-col md:flex-row gap-6"
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
                      <h3 className="text-heading-3 font-semibold text-text-primary dark:text-white">
                        {booking.propertyTitle}
                      </h3>
                      <Badge variant={getStatusColor(booking.status) as any}>
                        {booking.status === 'PAID' && '✓ Paid'}
                        {booking.status === 'LOCKED' && 'Locked (3 days)'}
                        {booking.status === 'PENDING' && 'Awaiting Payment'}
                      </Badge>
                    </div>

                    <p className="text-text-secondary dark:text-dark-text-secondary mb-3">
                      Visit Date: {formatDate(booking.visitDate)}
                    </p>

                    <p className="text-heading-3 font-bold text-brand-primary mb-4">
                      {formatCurrency(booking.price)}/month
                    </p>

                    {/* Confirmation Status */}
                    {booking.status === 'PAID' && booking.visitDate < new Date().toISOString() && !booking.confirmationStatus && (
                      <Button
                        size="md"
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
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            <h2 className="text-heading-2 font-bold mb-6 text-text-primary dark:text-white">
              Saved Properties
            </h2>

            {savedProperties.length === 0 ? (
              <Card variant="flat" padding="lg" className="text-center">
                <Heart size={48} className="mx-auto text-text-secondary mb-4" />
                <h3 className="text-heading-2 font-semibold mb-2">
                  No saved properties
                </h3>
                <p className="text-text-secondary mb-4">
                  Add listings to your favorites to save them for later
                </p>
                <Link href="/properties">
                  <Button>Browse Listings</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.map((property) => (
                  <Card
                    key={property.id}
                    variant="glass"
                    padding="none"
                    interactive
                    className="overflow-hidden"
                  >
                    <Image
                      src={property.image}
                      alt={property.title}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-text-primary dark:text-white mb-2 line-clamp-2">
                        {property.title}
                      </h4>
                      <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-2">
                        {property.location}
                      </p>
                      <p className="text-heading-3 font-bold text-brand-primary mb-3">
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
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <h2 className="text-heading-2 font-bold mb-6 text-text-primary dark:text-white">
              Profile Settings
            </h2>

            <Card variant="glass" padding="lg" className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-2 rounded-md border border-border-default dark:border-dark-border-default"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full px-4 py-2 rounded-md border border-border-default dark:border-dark-border-default"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue="+254712345678"
                  className="w-full px-4 py-2 rounded-md border border-border-default dark:border-dark-border-default"
                />
              </div>

              <Button className="w-full">Save Changes</Button>
            </Card>
          </div>
        )}
      </div>

      {/* Confirm Visit Modal */}
      {showConfirmModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card variant="glass" padding="lg" className="max-w-md w-full">
            <h3 className="text-heading-2 font-bold mb-4 text-white">
              Did you visit the property?
            </h3>

            <Image
              src={selectedBooking.propertyImage}
              alt={selectedBooking.propertyTitle}
              width={300}
              height={200}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            <p className="text-white mb-6">{selectedBooking.propertyTitle}</p>

            <div className="space-y-3">
              <Button
                className="w-full bg-state-success hover:bg-green-700"
                onClick={() => handleConfirmVisit(selectedBooking, 'VIEWED')}
              >
                Yes, I Visited
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => handleConfirmVisit(selectedBooking, 'NOT_VIEWED')}
              >
                No, I Didn't Visit
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
          </Card>
        </div>
      )}
    </div>
  );
}
