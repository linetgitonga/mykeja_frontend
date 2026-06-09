'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { OwnerPortalLayout } from '@/components/owner-portal-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Home, Users, DollarSign, Plus, Edit2, Users2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function OwnerDashboardPage() {
  // Mock data
  const ownerData = {
    totalProperties: 3,
    occupiedCount: 2,
    vacantCount: 1,
    monthlyEarnings: 98000,
    totalEarnings: 588000,
  }

  const properties = [
    {
      id: 1,
      title: '2-Bedroom Apartment in Kahawa Sukari',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop',
      status: 'OCCUPIED',
      rent: 35000,
      tenant: 'John Doe',
    },
    {
      id: 2,
      title: 'Modern Studio in Westlands',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop',
      status: 'OCCUPIED',
      rent: 38000,
      tenant: 'Jane Smith',
    },
    {
      id: 3,
      title: '3-Bedroom Townhouse in Kilimani',
      image: 'https://images.unsplash.com/photo-1554224311-beee415c15cb?w=300&h=200&fit=crop',
      status: 'VACANT',
      rent: 65000,
      tenant: null,
    },
  ]

  const recentPayments = [
    { date: '2026-06-05', amount: 35000, tenant: 'John Doe', property: 'Kahawa Apartment' },
    { date: '2026-06-03', amount: 38000, tenant: 'Jane Smith', property: 'Westlands Studio' },
    { date: '2026-05-28', amount: 35000, tenant: 'John Doe', property: 'Kahawa Apartment' },
  ]

  return (
    <OwnerPortalLayout title="Dashboard" subtitle="Manage your properties and earnings">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Home className="text-primary" size={32} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Properties</p>
              <h3 className="text-3xl font-bold text-foreground">{ownerData.totalProperties}</h3>
            </div>
          </div>
        </div>

        <div className="glass rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Users className="text-green-600" size={32} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Occupied / Vacant</p>
              <h3 className="text-3xl font-bold text-foreground">
                {ownerData.occupiedCount} / {ownerData.vacantCount}
              </h3>
            </div>
          </div>
        </div>

        <div className="glass rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <DollarSign className="text-purple-600" size={32} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <h3 className="text-3xl font-bold text-primary">
                {formatCurrency(ownerData.monthlyEarnings)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action */}
      <div className="mb-8">
        <Link href="/owner/properties/new">
          <Button className="gap-2">
            <Plus size={20} />
            Register New Property
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Properties Section */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold font-heading text-foreground mb-6">My Properties</h3>

          {properties.length === 0 ? (
            <div className="glass rounded-lg p-12 text-center">
              <h4 className="text-lg font-semibold text-foreground mb-2">No properties yet</h4>
              <p className="text-muted-foreground mb-4">Register your first property to get started</p>
              <Link href="/owner/properties/new">
                <Button>Register Property</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="glass rounded-lg p-6 flex flex-col sm:flex-row gap-6 hover:shadow-glow-md transition-all"
                >
                  {/* Image */}
                  <div className="sm:w-32 flex-shrink-0">
                    <Image
                      src={property.image}
                      alt={property.title}
                      width={300}
                      height={200}
                      className="rounded-lg w-full h-32 object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{property.title}</h4>
                      <Badge
                        className={
                          property.status === 'OCCUPIED'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {property.status}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground text-sm mb-2">
                      {property.tenant ? `Tenant: ${property.tenant}` : 'No tenant currently'}
                    </p>

                    <p className="text-lg font-bold text-primary mb-4">
                      {formatCurrency(property.rent)}/month
                    </p>

                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="gap-2">
                        <Edit2 size={16} />
                        Edit
                      </Button>
                      <Button variant="secondary" size="sm" className="gap-2">
                        <Users2 size={16} />
                        Tenant Info
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Payments Section */}
        <div>
          <h3 className="text-xl font-bold font-heading text-foreground mb-6">Recent Payments</h3>

          <div className="glass rounded-lg p-6">
            <div className="space-y-4">
              {recentPayments.map((payment, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-4 border-b border-border last:border-b-0"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <DollarSign size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">
                      {payment.tenant}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(payment.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-bold text-primary flex-shrink-0">
                    +{formatCurrency(payment.amount)}
                  </p>
                </div>
              ))}
            </div>

            <Link href="/owner/payments">
              <Button variant="secondary" className="w-full mt-4">
                View All Payments
              </Button>
            </Link>
          </div>

          {/* Total Earnings */}
          <div className="glass rounded-lg p-6 mt-6">
            <p className="text-muted-foreground text-sm mb-2">Total Earnings</p>
            <p className="text-3xl font-bold text-primary">
              {formatCurrency(ownerData.totalEarnings)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">All time</p>
          </div>
        </div>
      </div>
    </OwnerPortalLayout>
  )
}

