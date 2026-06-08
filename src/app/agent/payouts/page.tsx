'use client';

import React from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { formatCurrency } from '@/lib/utils';
import { usePayouts } from '@/lib/hooks';
import type { Payout } from '@/lib/types';
import { Download } from 'lucide-react';

export default function PayoutsPage() {
  const { data: payouts, isLoading } = usePayouts();

  const totalEarnings = payouts?.reduce((sum, p) => sum + p.amount, 0) || 0;
  const pendingPayouts = payouts?.filter(p => p.status === 'PENDING').reduce((sum, p) => sum + p.amount, 0) || 0;

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950 pb-12">
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-heading-2 font-bold text-text-primary dark:text-white">
            Earnings & Payouts
          </h1>
          <Button variant="secondary" icon={<Download size={16} />}>Export CSV</Button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card padding="lg" className="bg-brand-primary text-white">
            <p className="text-blue-100 mb-2 font-medium">Total Earnings</p>
            <h2 className="text-4xl font-bold">{formatCurrency(totalEarnings)}</h2>
          </Card>
          <Card padding="lg" className="border-l-4 border-l-state-warning">
            <p className="text-text-secondary mb-2 font-medium">Pending Clearance</p>
            <h2 className="text-4xl font-bold text-state-warning">{formatCurrency(pendingPayouts)}</h2>
            <p className="text-sm text-text-secondary mt-2">Will be disbursed to M-Pesa within 24 hours</p>
          </Card>
        </div>

        <div>
          <h3 className="text-heading-3 font-bold mb-4">Payout History</h3>
          {isLoading ? (
            <div className="text-center py-12">Loading payouts...</div>
          ) : payouts?.length === 0 ? (
            <Card padding="lg" className="text-center py-12">
              <p className="text-text-secondary">No payouts recorded yet.</p>
            </Card>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-border-default overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-secondary">
                      <th className="p-4 font-semibold text-sm text-text-secondary">Date</th>
                      <th className="p-4 font-semibold text-sm text-text-secondary">Property</th>
                      <th className="p-4 font-semibold text-sm text-text-secondary">Amount</th>
                      <th className="p-4 font-semibold text-sm text-text-secondary">Status</th>
                      <th className="p-4 font-semibold text-sm text-text-secondary">Ref / M-Pesa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-default">
                    {payouts?.map((payout: Payout) => (
                      <tr key={payout.id} className="hover:bg-surface-secondary/50 transition-colors">
                        <td className="p-4 text-sm">{new Date(payout.createdAt).toLocaleDateString()}</td>
                        <td className="p-4 font-medium">{payout.propertyTitle}</td>
                        <td className="p-4 font-bold text-brand-primary">{formatCurrency(payout.amount)}</td>
                        <td className="p-4">
                          <Badge variant={payout.status === 'PAID' ? 'success' : 'warning'}>{payout.status}</Badge>
                        </td>
                        <td className="p-4 text-sm text-text-secondary font-mono">{payout.mpesaTransactionId || 'Pending'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
