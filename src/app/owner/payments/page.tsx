'use client';

import React from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { formatCurrency } from '@/lib/utils';
import { useBookings } from '@/lib/hooks';

export default function OwnerPaymentsPage() {
  const { data: bookings, isLoading } = useBookings();
  
  // Filtering for PAID bookings to represent rent payments for the mockup
  const payments = bookings?.filter(b => b.status === 'PAID') || [];

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950 pb-12">
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-heading-2 font-bold text-text-primary dark:text-white">
            Rent Payments
          </h1>
          <Button variant="secondary">Download Statement</Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-border-default overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-secondary">
                <th className="p-4 font-semibold text-sm text-text-secondary">Date</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Property</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Tenant</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Amount</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Status</th>
                <th className="p-4 font-semibold text-sm text-text-secondary text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {isLoading ? (
                <tr><td colSpan={6} className="p-8 text-center text-text-secondary">Loading payments...</td></tr>
              ) : payments.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-text-secondary">No payments found.</td></tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-surface-secondary/50">
                    <td className="p-4 text-sm">{new Date(payment.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 font-medium">{payment.property.title}</td>
                    <td className="p-4">{payment.tenantName}</td>
                    <td className="p-4 font-bold text-state-success">{formatCurrency(payment.amount)}</td>
                    <td className="p-4">
                      <Badge variant="success">Cleared</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button size="sm" variant="secondary">View</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
