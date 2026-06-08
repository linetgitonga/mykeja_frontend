'use client';

import React from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { useStrikes } from '@/lib/hooks';
import type { Strike } from '@/lib/types';
import { AlertTriangle, ShieldOff } from 'lucide-react';

export default function AdminStrikesPage() {
  const { data: strikes, isLoading } = useStrikes();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'WARNING': return 'default';
      case 'MINOR': return 'info';
      case 'MAJOR': return 'warning';
      case 'CRITICAL': return 'error';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950 pb-12">
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-heading-2 font-bold text-text-primary dark:text-white flex items-center gap-2">
            <AlertTriangle className="text-state-warning" />
            Strike Engine
          </h1>
          <Button variant="secondary" icon={<ShieldOff size={16} />}>Suspend Agent</Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-border-default overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-secondary">
                <th className="p-4 font-semibold text-sm text-text-secondary">Date</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Agent</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Violation</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Severity</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Status</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {isLoading ? (
                <tr><td colSpan={6} className="p-8 text-center text-text-secondary">Loading...</td></tr>
              ) : strikes?.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-text-secondary">No strikes found.</td></tr>
              ) : (
                strikes?.map((strike: Strike) => (
                  <tr key={strike.id}>
                    <td className="p-4 text-sm">{new Date(strike.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 font-medium">{strike.agentName}</td>
                    <td className="p-4">{strike.violationType}</td>
                    <td className="p-4">
                      <Badge variant={getSeverityColor(strike.severity) as any}>{strike.severity}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={strike.status === 'ACTIVE' ? 'warning' : 'default'}>{strike.status}</Badge>
                    </td>
                    <td className="p-4">
                      <Button size="sm" variant="secondary">Review</Button>
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
