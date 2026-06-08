'use client';

import React from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Scale, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminDisputesPage() {
  // Mock data since we don't have a disputes hook yet
  const disputes = [
    {
      id: 'DISP-101',
      tenant: 'John Doe',
      agent: 'Skyline Realty',
      bookingId: 'BK-4552',
      reason: 'Agent did not show up for viewing',
      status: 'OPEN',
      date: '2026-06-08',
    },
    {
      id: 'DISP-102',
      tenant: 'Jane Smith',
      agent: 'Prime Properties',
      bookingId: 'BK-3392',
      reason: 'Property details did not match photos',
      status: 'RESOLVED',
      date: '2026-06-05',
    }
  ];

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950 pb-12">
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-heading-2 font-bold text-text-primary dark:text-white flex items-center gap-2">
            <Scale className="text-brand-primary" />
            Dispute Resolution
          </h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-border-default overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-secondary">
                <th className="p-4 font-semibold text-sm text-text-secondary">ID</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Date</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Parties Involved</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Reason</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Status</th>
                <th className="p-4 font-semibold text-sm text-text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {disputes.map((dispute) => (
                <tr key={dispute.id} className="hover:bg-surface-secondary/50">
                  <td className="p-4 text-sm font-mono">{dispute.id}</td>
                  <td className="p-4 text-sm">{dispute.date}</td>
                  <td className="p-4">
                    <p className="font-medium text-sm">T: {dispute.tenant}</p>
                    <p className="text-sm text-text-secondary">A: {dispute.agent}</p>
                  </td>
                  <td className="p-4 text-sm">{dispute.reason}</td>
                  <td className="p-4">
                    <Badge variant={dispute.status === 'OPEN' ? 'warning' : 'success'}>
                      {dispute.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button size="sm" variant="secondary">Review</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
