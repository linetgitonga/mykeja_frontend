'use client';

import React from 'react';
import { Card } from '@/components/Card';
import { Activity, Download } from 'lucide-react';
import { Button } from '@/components/Button';

export default function AdminAuditLogPage() {
  const logs = [
    { id: 'AL-901', action: 'CREATE_STRIKE', user: 'admin_1', target: 'agent_34', date: '2026-06-08 14:32:00' },
    { id: 'AL-902', action: 'APPROVE_PROPERTY', user: 'admin_2', target: 'prop_991', date: '2026-06-08 12:15:22' },
    { id: 'AL-903', action: 'RESOLVE_DISPUTE', user: 'admin_1', target: 'disp_102', date: '2026-06-07 09:45:10' },
    { id: 'AL-904', action: 'UPDATE_SETTINGS', user: 'superadmin', target: 'platform_fees', date: '2026-06-06 16:20:00' },
  ];

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950 pb-12">
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-heading-2 font-bold text-text-primary dark:text-white flex items-center gap-2">
            <Activity className="text-brand-primary" />
            System Audit Log
          </h1>
          <Button variant="secondary" icon={<Download size={16} />}>Export Logs</Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-border-default overflow-hidden font-mono text-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-secondary">
                <th className="p-4 font-semibold text-text-secondary">Timestamp</th>
                <th className="p-4 font-semibold text-text-secondary">Log ID</th>
                <th className="p-4 font-semibold text-text-secondary">Action</th>
                <th className="p-4 font-semibold text-text-secondary">User</th>
                <th className="p-4 font-semibold text-text-secondary">Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-secondary/50">
                  <td className="p-4 text-text-secondary">{log.date}</td>
                  <td className="p-4">{log.id}</td>
                  <td className="p-4 text-brand-primary">{log.action}</td>
                  <td className="p-4">{log.user}</td>
                  <td className="p-4">{log.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
