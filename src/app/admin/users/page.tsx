'use client';

import React from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Users, Search, Filter } from 'lucide-react';
import { Input } from '@/components/Input';
import { useAgents } from '@/lib/hooks';
import type { Agent } from '@/lib/types';

export default function AdminUsersPage() {
  const { data: agents, isLoading } = useAgents();

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950 pb-12">
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-heading-2 font-bold text-text-primary dark:text-white flex items-center gap-2">
            <Users className="text-brand-primary" />
            User Management
          </h1>
          <Button variant="secondary">Invite Admin</Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-text-secondary" size={18} />
            <Input className="pl-10" placeholder="Search users by name, email, or role..." />
          </div>
          <Button variant="secondary" icon={<Filter size={16} />}>Filter</Button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-border-default overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-secondary">
                <th className="p-4 font-semibold text-sm text-text-secondary">Name / Business</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Role</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Status</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Joined</th>
                <th className="p-4 font-semibold text-sm text-text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-text-secondary">Loading users...</td></tr>
              ) : (
                agents?.map((agent: Agent) => (
                  <tr key={agent.id} className="hover:bg-surface-secondary/50">
                    <td className="p-4">
                      <p className="font-medium">{agent.fullName}</p>
                      <p className="text-sm text-text-secondary">{agent.businessName}</p>
                    </td>
                    <td className="p-4">
                      <Badge variant="default">{agent.role}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={agent.verificationStatus === 'VERIFIED' ? 'success' : 'warning'}>
                        {agent.verificationStatus}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm">{new Date(agent.joinedAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <Button size="sm" variant="secondary">Edit</Button>
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
