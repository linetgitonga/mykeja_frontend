'use client';

import React from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { useProperties } from '@/lib/hooks';
import type { Property } from '@/lib/types';
import { ShieldAlert, Check, X } from 'lucide-react';

export default function AdminPropertiesPage() {
  // Fetch all properties without filters to see everything
  const { data: properties, isLoading } = useProperties({});

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950 pb-12">
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-heading-2 font-bold text-text-primary dark:text-white flex items-center gap-2">
            <ShieldAlert className="text-brand-primary" />
            Property Moderation
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-12">Loading properties...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties?.map((property: Property) => (
              <Card key={property.id} padding="md" className="flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold truncate" title={property.title}>{property.title}</h3>
                  <Badge variant={property.status === 'AVAILABLE' ? 'success' : 'default'}>
                    {property.status}
                  </Badge>
                </div>
                <p className="text-sm text-text-secondary mb-1">Agent: {property.agent.businessName}</p>
                <p className="text-sm text-text-secondary mb-4">Location: {property.locationGeneral}</p>
                <div className="mt-auto pt-4 border-t border-border-default flex gap-2">
                  <Button variant="secondary" size="sm" className="flex-1" icon={<Check size={14} />}>Approve</Button>
                  <Button variant="secondary" size="sm" className="flex-1 text-state-error border-state-error/20 hover:bg-state-error/5" icon={<X size={14} />}>Reject</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
