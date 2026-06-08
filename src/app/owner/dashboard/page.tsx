'use client';

import React from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Home, Users, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useProperties } from '@/lib/hooks';

export default function OwnerDashboardPage() {
  const { data: properties, isLoading } = useProperties({});
  
  // For the sake of the mockup, we will just use all properties since there's no owner filter in mock
  // In reality this would be useProperties({ ownerId: currentUser.id })
  const ownerProperties = properties || [];
  
  const occupiedCount = ownerProperties.filter(p => p.status === 'OCCUPIED').length;
  const vacantCount = ownerProperties.filter(p => p.status === 'AVAILABLE').length;

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950 pb-12">
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-heading-2 font-bold text-text-primary dark:text-white flex items-center gap-2">
            Owner Dashboard
          </h1>
          <Button icon={<Home size={16} />}>Register Property</Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card padding="lg" className="flex items-center gap-4">
            <div className="p-4 bg-brand-primary/10 rounded-full text-brand-primary">
              <Home size={32} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Properties</p>
              <h2 className="text-3xl font-bold">{ownerProperties.length}</h2>
            </div>
          </Card>
          <Card padding="lg" className="flex items-center gap-4">
            <div className="p-4 bg-state-success/10 rounded-full text-state-success">
              <Users size={32} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Occupied</p>
              <h2 className="text-3xl font-bold">{occupiedCount}</h2>
            </div>
          </Card>
          <Card padding="lg" className="flex items-center gap-4">
            <div className="p-4 bg-state-warning/10 rounded-full text-state-warning">
              <DollarSign size={32} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Vacant</p>
              <h2 className="text-3xl font-bold">{vacantCount}</h2>
            </div>
          </Card>
        </div>

        {/* Properties List */}
        <div>
          <h2 className="text-heading-3 font-bold mb-4">My Properties</h2>
          
          {isLoading ? (
            <div className="text-center py-12">Loading properties...</div>
          ) : ownerProperties.length === 0 ? (
            <Card padding="lg" className="text-center py-12">
              <p className="text-text-secondary">You haven't registered any properties yet.</p>
              <Button className="mt-4">Register First Property</Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ownerProperties.map((property: any) => (
                <Card key={property.id} padding="lg" className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg line-clamp-1" title={property.title}>{property.title}</h3>
                    <Badge variant={property.status === 'OCCUPIED' ? 'success' : property.status === 'AVAILABLE' ? 'warning' : 'default'}>
                      {property.status}
                    </Badge>
                  </div>
                  <p className="text-text-secondary text-sm mb-4">{property.locationGeneral}</p>
                  
                  <div className="mt-auto pt-4 border-t border-border-default">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-text-secondary">Monthly Rent</span>
                      <span className="font-bold text-brand-primary">{formatCurrency(property.price)}</span>
                    </div>
                    {property.status === 'OCCUPIED' && (
                      <div className="bg-surface-secondary p-3 rounded-lg mb-4 text-sm">
                        <p className="font-medium">Current Tenant: Jane Doe</p>
                        <p className="text-text-secondary">Moved in: Jan 15, 2026</p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button variant="secondary" className="flex-1 text-sm">View Details</Button>
                      {property.status === 'OCCUPIED' && (
                        <Button variant="secondary" className="flex-1 text-sm">Message Tenant</Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
